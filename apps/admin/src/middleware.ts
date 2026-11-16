import { NextRequest, NextResponse } from 'next/server';

const COOKIE_NAME = 'fisherytrade_admin_session';

function decodeBase64Url(value: string) {
  const normalized = value.replace(/-/g, '+').replace(/_/g, '/');
  const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, '=');
  return Uint8Array.from(atob(padded), (char) => char.charCodeAt(0));
}

async function isValidSession(token?: string) {
  const secret = process.env.ADMIN_SESSION_SECRET || (process.env.NODE_ENV !== 'production' ? 'fisherytrade-local-development-session-secret' : '');
  if (!token || !secret) return false;
  const [payload, signature, extra] = token.split('.');
  if (!payload || !signature || extra) return false;
  try {
    const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['verify']);
    const valid = await crypto.subtle.verify('HMAC', key, decodeBase64Url(signature), new TextEncoder().encode(payload));
    if (!valid) return false;
    const content = JSON.parse(new TextDecoder().decode(decodeBase64Url(payload))) as { exp?: number; username?: string };
    return Boolean(content.username && content.exp && content.exp > Math.floor(Date.now() / 1000));
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname.startsWith('/_next/') || pathname === '/icon.png' || pathname === '/favicon.ico' || pathname === '/logo.png') return NextResponse.next();
  const isLoginRoute = pathname === '/login' || pathname === '/api/auth/login' || pathname === '/api/auth/logout';
  const isPublicCatalogRead = pathname === '/api/catalog' && request.method === 'GET';
  const isPublicRfq = pathname === '/api/rfq';
  if (isLoginRoute || isPublicCatalogRead || isPublicRfq) return NextResponse.next();

  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (await isValidSession(token)) return NextResponse.next();

  if (pathname.startsWith('/api/')) {
    return NextResponse.json({ success: false, error: 'Sesi admin tidak valid.' }, { status: 401 });
  }
  const loginUrl = new URL('/login', request.url);
  loginUrl.searchParams.set('next', `${pathname}${request.nextUrl.search}`);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|logo.png).*)'],
};
