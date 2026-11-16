import { createHmac, timingSafeEqual } from 'node:crypto';
import { cookies } from 'next/headers';

export const ADMIN_SESSION_COOKIE = 'fisherytrade_admin_session';
const SESSION_TTL_SECONDS = 60 * 60 * 8;

export function getAdminCredentials() {
  const isDev = process.env.NODE_ENV !== 'production';
  return {
    username: process.env.ADMIN_USERNAME || (isDev ? 'admin' : ''),
    password: process.env.ADMIN_PASSWORD || (isDev ? 'fisherytrade-demo' : ''),
  };
}

export function getSessionSecret() {
  if (process.env.ADMIN_SESSION_SECRET) return process.env.ADMIN_SESSION_SECRET;
  if (process.env.NODE_ENV !== 'production') return 'fisherytrade-local-development-session-secret';
  return '';
}

export function safeEqual(value: string, expected: string) {
  const left = Buffer.from(value);
  const right = Buffer.from(expected);
  return left.length === right.length && timingSafeEqual(left, right);
}

export function createAdminSession(username: string) {
  const secret = getSessionSecret();
  if (!secret) throw new Error('ADMIN_SESSION_SECRET belum dikonfigurasi.');
  const payload = Buffer.from(JSON.stringify({ username, exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS })).toString('base64url');
  const signature = createHmac('sha256', secret).update(payload).digest('base64url');
  return { token: `${payload}.${signature}`, maxAge: SESSION_TTL_SECONDS };
}

export function verifyAdminSession(token?: string | null) {
  if (!token) return false;
  const secret = getSessionSecret();
  if (!secret) return false;
  const [payload, signature, extra] = token.split('.');
  if (!payload || !signature || extra) return false;
  const expected = createHmac('sha256', secret).update(payload).digest();
  let supplied: Buffer;
  try {
    supplied = Buffer.from(signature, 'base64url');
  } catch {
    return false;
  }
  if (expected.length !== supplied.length || !timingSafeEqual(expected, supplied)) return false;
  try {
    const decoded = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as { username?: string; exp?: number };
    return Boolean(decoded.username && decoded.exp && decoded.exp > Math.floor(Date.now() / 1000));
  } catch {
    return false;
  }
}

export async function hasAdminSession() {
  const cookieStore = await cookies();
  return verifyAdminSession(cookieStore.get(ADMIN_SESSION_COOKIE)?.value);
}
