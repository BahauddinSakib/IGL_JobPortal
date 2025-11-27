import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import pool from '@/../../lib/db';

export async function POST(request) {
    let connection;
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json({ message: 'Email and password required' }, { status: 400 });
        }

        connection = await pool.getConnection();

        // Only allow admin users (au_type = '1')
        const [users] = await connection.execute(
            'SELECT au_id, au_first_name, au_last_name, au_email, au_phone, au_pass, au_type, au_permission, au_companyName, au_cv, au_createdAt FROM admin_user WHERE au_email = ? AND au_type = ?',
            [email, '1']
        );

        if (users.length === 0) {
            return NextResponse.json({ message: 'Admin not found' }, { status: 401 });
        }

        const user = users[0];
        const validPassword = await bcrypt.compare(password, user.au_pass);
        
        if (!validPassword) {
            return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
        }

        const token = jwt.sign(
            { 
                userId: user.au_id, 
                email: user.au_email,
                au_type: user.au_type // ADD THIS to include user type in token
            },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        const { au_pass, ...userWithoutPassword } = user;

        // CREATE RESPONSE AND SET COOKIE
        const response = NextResponse.json({
            token,
            user: userWithoutPassword,
            message: 'Admin login successful'
        });

        // SET THE TOKEN IN COOKIES
        response.cookies.set('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: '/',
        });

        return response;

    } catch (error) {
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    } finally {
        if (connection) connection.release();
    }
}