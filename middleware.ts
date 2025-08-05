import { NextResponse, NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request as any });
  const { pathname } = request.nextUrl;

  const isAuth = !!token;

  const isPublicPath =
    pathname === '/' ||
    pathname.startsWith('/sign-in') ||
    pathname.startsWith('/sign-up') ||
    pathname.startsWith('/verify');

  if (isAuth && isPublicPath) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if (!isAuth && !isPublicPath) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/sign-in', '/sign-up', '/verify/:path*', '/dashboard/:path*'],
};
