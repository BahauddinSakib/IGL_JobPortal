// app/api/auth/reset-password/route.js
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import pool from '@/lib/db';

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(request) {
  let connection;
  try {
    const { resetToken, newPassword } = await request.json();

    if (!resetToken || !newPassword) {
      return NextResponse.json({ 
        success: false,
        error: 'Reset token and new password are required' 
      }, { status: 400 });
    }

    const decoded = jwt.verify(resetToken, JWT_SECRET);

    if (decoded.type !== 'password_reset') {
      return NextResponse.json({ 
        success: false,
        error: 'Invalid reset token' 
      }, { status: 400 });
    }

    connection = await pool.getConnection();

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const [result] = await connection.execute(
      'UPDATE admin_user SET au_password = ? WHERE au_id = ?',
      [hashedPassword, decoded.userId]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json({ 
        success: false,
        error: 'Failed to update password' 
      }, { status: 404 });
    }

    console.log('✅ Password updated successfully for user:', decoded.userId);

    return NextResponse.json({ 
      success: true,
      message: 'Password updated successfully!' 
    });

  } catch (error) {
    console.error('Reset password error:', error);
    
    if (error.name === 'TokenExpiredError') {
      return NextResponse.json({ 
        success: false,
        error: 'Reset token has expired' 
      }, { status: 400 });
    }

    return NextResponse.json({ 
      success: false,
      error: 'Failed to reset password' 
    }, { status: 500 });
  } finally {
    if (connection) {
      connection.release();
    }
  }
}