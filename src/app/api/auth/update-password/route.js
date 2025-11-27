// app/api/auth/update-password/route.js
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import pool from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function POST(request) {
    let connection;
    try {
        const { token, newPassword } = await request.json();
        console.log('🔧 Update password API called');

        if (!token || !newPassword) {
            return NextResponse.json({ 
                success: false,
                message: 'Token and new password are required' 
            }, { status: 400 });
        }

        // Verify JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret-for-development');
        
        if (decoded.type !== 'password_reset') {
            return NextResponse.json({ 
                success: false,
                message: 'Invalid token' 
            }, { status: 400 });
        }

        console.log('🔧 Decoded token:', decoded);

        // Get database connection
        connection = await pool.getConnection();

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 12);

        // Update password - using the correct column name au_pass
        const [result] = await connection.execute(
            'UPDATE admin_user SET au_pass = ? WHERE au_id = ?', // Changed au_password to au_pass
            [hashedPassword, decoded.userId]
        );

        if (result.affectedRows === 0) {
            return NextResponse.json({ 
                success: false,
                message: 'Failed to update password. User not found.' 
            }, { status: 404 });
        }

        console.log(' Password updated successfully for user ID:', decoded.userId);

        return NextResponse.json({
            success: true,
            message: 'Password updated successfully'
        });

    } catch (error) {
        console.error(' Update password error:', error);
        
        if (error.name === 'TokenExpiredError') {
            return NextResponse.json({ 
                success: false,
                message: 'Session expired. Please start over.' 
            }, { status: 400 });
        } else if (error.name === 'JsonWebTokenError') {
            return NextResponse.json({ 
                success: false,
                message: 'Invalid token' 
            }, { status: 400 });
        }

        return NextResponse.json({ 
            success: false,
            message: 'Failed to update password' 
        }, { status: 500 });
    } finally {
        if (connection) {
            connection.release();
        }
    }
}