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

        const [users] = await connection.execute(
            'SELECT au_id, au_first_name, au_last_name, au_email, au_phone, au_pass, au_type, au_permission, au_companyName, au_cv, au_createdAt FROM admin_user WHERE au_email = ?',
            [email]
        );

        if (users.length === 0) {
            return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
        }

        const user = users[0];
        const validPassword = await bcrypt.compare(password, user.au_pass);
        
        if (!validPassword) {
            return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
        }

        const token = jwt.sign(
            { userId: user.au_id, email: user.au_email },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        const { au_pass, ...userWithoutPassword } = user;

        return NextResponse.json({
            token,
            user: userWithoutPassword,
            message: 'Login successful'
        });

    } catch (error) {
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    } finally {
        if (connection) connection.release();
    }
}