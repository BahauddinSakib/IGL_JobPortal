import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import pool from '@/../../lib/db';

export async function POST(request) {
    let connection;
    try {
        const { firstName, lastName, email, password, phone } = await request.json();

        if (!firstName || !lastName || !email || !password) {
            return NextResponse.json({ message: 'All fields required' }, { status: 400 });
        }

        connection = await pool.getConnection();

        const [existing] = await connection.execute(
            'SELECT au_id FROM admin_user WHERE au_email = ?',
            [email]
        );

        if (existing.length > 0) {
            return NextResponse.json({ message: 'Admin already exists' }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const [result] = await connection.execute(
            'INSERT INTO admin_user (au_first_name, au_last_name, au_email, au_phone, au_pass, au_type) VALUES (?, ?, ?, ?, ?, ?)',
            [firstName, lastName, email, phone || null, hashedPassword, '1']
        );

        const [users] = await connection.execute(
            'SELECT au_id, au_first_name, au_last_name, au_email, au_phone, au_type, au_permission, au_companyName, au_cv, au_createdAt FROM admin_user WHERE au_id = ?',
            [result.insertId]
        );

        const user = users[0];

        const token = jwt.sign(
            { userId: user.au_id, email: user.au_email },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        const { au_pass, ...userWithoutPassword } = user;

        return NextResponse.json({
            token,
            user: userWithoutPassword,
            message: 'Admin signup successful'
        }, { status: 201 });

    } catch (error) {
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    } finally {
        if (connection) connection.release();
    }
}