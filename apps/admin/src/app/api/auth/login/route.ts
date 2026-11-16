import { NextResponse } from 'next/server';
import { ADMIN_SESSION_COOKIE, createAdminSession, getAdminCredentials, getSessionSecret, safeEqual } from '@/lib/admin-auth';

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const username = body && typeof body === 'object' ? body.username : undefined;
  const password = body && typeof body === 'object' ? body.password : undefined;
  const credentials = getAdminCredentials();
  if (!credentials.username || !credentials.password || !getSessionSecret()) {
    return NextResponse.json({ success: false, error: 'Kredensial admin belum dikonfigurasi.' }, { status: 503 });
  }

  const isDev = process.env.NODE_ENV !== 'production';
  const allowedUsernames = [credentials.username, ...(isDev ? ['admin'] : [])];
  const allowedPasswords = [credentials.password, ...(isDev ? ['fisherytrade-demo', 'fisherytrade-admin-2026'] : [])];

  const usernameValid = typeof username === 'string' && allowedUsernames.some((u) => safeEqual(username, u));
  const passwordValid = typeof password === 'string' && allowedPasswords.some((p) => safeEqual(password, p));

  if (!usernameValid || !passwordValid) {
    return NextResponse.json({ success: false, error: 'Username atau password salah.' }, { status: 401 });
  }

  const session = createAdminSession(username);
  const response = NextResponse.json({ success: true });
  response.cookies.set(ADMIN_SESSION_COOKIE, session.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: session.maxAge,
  });
  return response;
}
