import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('accessToken');

  if (!token && req.nextUrl.pathname !== '/signin') {
    return NextResponse.redirect(new URL('/signin', req.nextUrl.origin));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/another-protected-route/:path*'], // Adjust these paths as necessary
};
