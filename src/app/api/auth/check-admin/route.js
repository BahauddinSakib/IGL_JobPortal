// app/api/auth/check-admin/route.js
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function GET(request) {
  try {
    // Get token from cookies
    const cookieHeader = request.headers.get('cookie');
    
    let token = null;
    
    if (cookieHeader) {
      const cookies = cookieHeader.split(';');
      const tokenCookie = cookies.find(cookie => 
        cookie.trim().startsWith('token=')
      );
      
      if (tokenCookie) {
        token = tokenCookie.split('=')[1]?.trim();
      }
    }
    
    if (!token) {
      return NextResponse.json({ isAdmin: false }, { status: 401 });
    }

    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // BEST APPROACH: Handle both string and number types
    const userType = decoded.au_type;
    const isAdmin = userType == 1; // Loose comparison handles both "1" and 1
    
    return NextResponse.json({ 
      isAdmin,
      userType: userType,
      user: decoded
    });
    
  } catch (error) {
    return NextResponse.json({ 
      isAdmin: false,
      error: 'Token verification failed' 
    }, { status: 401 });
  }
}