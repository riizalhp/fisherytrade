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
  if (typeof username !== 'string' || typeof password !== 'string' || !safeEqual(username, credentials.username) || !safeEqual(password, credentials.password)) {
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
