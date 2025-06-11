import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

// Definisikan path publik
const PUBLIC_PATHS = ['', '/login', '/register', '/images'];

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const cleanedPath = pathname.replace(/\/$/, '');

  // Skip middleware untuk path publik
  if (PUBLIC_PATHS.includes(cleanedPath)) {
    return NextResponse.next();
  }

  const token = request.cookies.get('token')?.value;

  try {
    if (!token) throw new Error('No token provided');

    const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY);

    // Verifikasi token menggunakan jose
    await jwtVerify(token, secret);

    return NextResponse.next();
  } catch (error) {
    console.error('Token verification error:', error.message);

    // Hindari infinite redirect loop
    if (cleanedPath === '/login') return NextResponse.next();

    const response = NextResponse.redirect(new URL('/login', request.url));
    response.cookies.delete('token');
    return response;
  }
}

// Matcher middleware
export const config = {
  matcher: [
    // Jalankan middleware hanya jika tidak mengarah ke resource publik
    '/((?!api|_next/static|_next/image|favicon.ico|images|fonts|css|js).*)',
  ],
};

