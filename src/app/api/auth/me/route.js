import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import pool from '@/../../lib/db';

export async function GET(request) {
    let connection;
    try {
        const authHeader = request.headers.get('authorization');
        
        if (!authHeader?.startsWith('Bearer ')) {
            return NextResponse.json({ message: 'No token provided' }, { status: 401 });
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        connection = await pool.getConnection();

        const [users] = await connection.execute(
            'SELECT au_id, au_first_name, au_last_name, au_email, au_phone, au_type FROM admin_user WHERE au_id = ?',
            [decoded.userId]
        );

        if (users.length === 0) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        return NextResponse.json(users[0]);

    } catch (error) {
        return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    } finally {
        if (connection) connection.release();
    }
}