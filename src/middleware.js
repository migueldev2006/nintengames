import { NextResponse } from 'next/server';
import { verifyToken } from './app/lib/auth/verifyToken';

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  const publicPaths = ['/api/users', '/api/users/login', '/api/document'];

  if (publicPaths.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  const authHeader = req.headers.get('Authorization');
  const token = authHeader?.split(' ')[1];

  try {
    const payload = await verifyToken(token); 
    console.log("Payload verificado:", payload);
    return NextResponse.next();
  } catch (err) {
    console.error('Error al verificar token:', err.message);
    return NextResponse.json(
      { message: 'Usuario no autorizado' },
      { status: 403 }
    );
  }
}

export const config = {
  matcher: ['/api/:path*'],
};
