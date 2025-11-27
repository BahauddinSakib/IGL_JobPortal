import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(req) {
  const token = req.cookies.get('token')?.value;
  const url = req.nextUrl.clone();
  const pathname = req.nextUrl.pathname;

  if (!token) {
    if (pathname.startsWith('/admin') || pathname.startsWith('/vendor') || pathname.startsWith('/became-vendor')) {
      console.log('No token found FROM middleware NEW');
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  try {
    const decoded = jwt.decode(token);
    const role = decoded?.role;

    if (pathname === '/login') {
      if (role === 0) url.pathname = '/admin';
      else if (role === 2) url.pathname = '/vendor';
      else url.pathname = '/';
      return NextResponse.redirect(url);
    }

    if (pathname.startsWith('/admin') && role !== 0) {
      url.pathname = '/';
      return NextResponse.redirect(url);
    }

    if (pathname.startsWith('/vendor') && role !== 2) {
      url.pathname = '/';
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  } catch {
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: ['/admin/:path*', '/vendor/:path*', '/login'],
};
