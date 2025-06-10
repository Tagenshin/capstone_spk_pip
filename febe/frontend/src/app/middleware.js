// middleware.js
import { NextResponse } from 'next/server'
import { verify } from 'jsonwebtoken'

const PUBLIC_PATHS = ['/', '/login', '/register']

export async function middleware(request) {
  // 1. Skip pengecekan untuk path public
  if (PUBLIC_PATHS.includes(request.nextUrl.pathname)) {
    return NextResponse.next()
  }

  // 2. Ambil token dari cookies (bukan localStorage)
  const token = request.cookies.get('token')?.value

  // 3. Verifikasi token
  try {
    if (!token) throw new Error('No token')
    
    // Gunakan env variable untuk secret key
    await verify(token, 'supersecretkey123')
    
    return NextResponse.next()
  } catch (error) {
    // 4. Redirect ke login jika token invalid
    const loginUrl = new URL('/', request.url)
    loginUrl.searchParams.set('from', request.nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}