// app/api/auth/verify-sms-otp/route.js
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(request) {
  try {
    const { token, otp } = await request.json();

    if (!token || !otp) {
      return NextResponse.json({ 
        success: false,
        error: 'Token and OTP are required' 
      }, { status: 400 });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    
    if (decoded.type !== 'sms_otp') {
      return NextResponse.json({ 
        success: false,
        error: 'Invalid token type' 
      }, { status: 400 });
    }

    if (decoded.otp !== otp) {
      return NextResponse.json({ 
        success: false,
        error: 'Invalid OTP' 
      }, { status: 400 });
    }

    if (Date.now() > decoded.expires) {
      return NextResponse.json({ 
        success: false,
        error: 'OTP has expired' 
      }, { status: 400 });
    }

    console.log('✅ OTP verified successfully for:', decoded.phoneNumber);

    const resetToken = jwt.sign({ 
      phoneNumber: decoded.phoneNumber,
      userId: decoded.userId,
      type: 'password_reset'
    }, JWT_SECRET, { expiresIn: '10m' });

    return NextResponse.json({ 
      success: true,
      message: 'OTP verified successfully',
      resetToken: resetToken
    });

  } catch (error) {
    console.error('Verify OTP error:', error);
    
    if (error.name === 'TokenExpiredError') {
      return NextResponse.json({ 
        success: false,
        error: 'OTP has expired' 
      }, { status: 400 });
    } else if (error.name === 'JsonWebTokenError') {
      return NextResponse.json({ 
        success: false,
        error: 'Invalid token' 
      }, { status: 400 });
    }

    return NextResponse.json({ 
      success: false,
      error: 'OTP verification failed' 
    }, { status: 500 });
  }
}