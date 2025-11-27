import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import pool from '@/lib/db';

export async function POST(request) {
    let connection;
    try {
        console.log('🔍 Recruiter Signup API called');
        const { firstName, lastName, email, password, type = '3', phone, companyName } = await request.json();
        console.log('📝 Recruiter Signup data:', { firstName, lastName, email, type, phone, companyName });

        if (!firstName || !lastName || !email || !password || !companyName) {
            return NextResponse.json({ message: 'All fields including company name are required' }, { status: 400 });
        }

        connection = await pool.getConnection();
        console.log('✅ Database connected');

        const [existing] = await connection.execute(
            'SELECT au_id FROM admin_user WHERE au_email = ?',
            [email]
        );

        if (existing.length > 0) {
            return NextResponse.json({ message: 'User already exists' }, { status: 400 });
        }

        console.log('🔐 Hashing password...');
        const hashedPassword = await bcrypt.hash(password, 12);
        console.log('✅ Password hashed');

        console.log('💾 Inserting recruiter user...');
        const [result] = await connection.execute(
            'INSERT INTO admin_user (au_first_name, au_last_name, au_email, au_phone, au_pass, au_type, au_companyName) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [firstName, lastName, email, phone || null, hashedPassword, type, companyName]
        );
        console.log('✅ Recruiter user inserted, ID:', result.insertId);

        const [users] = await connection.execute(
            'SELECT au_id, au_first_name, au_last_name, au_email, au_phone, au_type, au_companyName FROM admin_user WHERE au_id = ?',
            [result.insertId]
        );

        console.log('🔑 Generating token...');
        const token = jwt.sign(
            { userId: result.insertId, email: email },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );
        console.log('✅ Token generated');

        return NextResponse.json({
            token,
            user: users[0],
            message: 'Recruiter signup successful'
        }, { status: 201 });

    } catch (error) {
        console.error('❌ Recruiter Signup error:', error);
        console.error('❌ Error stack:', error.stack);
        return NextResponse.json({ message: 'Server error: ' + error.message }, { status: 500 });
    } finally {
        if (connection) {
            connection.release();
            console.log('🔌 Database connection released');
        }
    }
}