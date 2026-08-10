import 'server-only';

import { createHmac, timingSafeEqual } from 'node:crypto';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const ADMIN_COOKIE = 'st-flavius-admin-session';
const SESSION_DURATION_SECONDS = 8 * 60 * 60;

function getAdminPassword() {
  // NEXT_PUBLIC_ADMIN_PASSWORD is kept as a compatibility fallback. New
  // deployments should use the server-only ADMIN_PASSWORD variable.
  return process.env.ADMIN_PASSWORD || process.env.NEXT_PUBLIC_ADMIN_PASSWORD || '';
}

function createSessionToken(password: string) {
  return createHmac('sha256', password).update('st-flavius-admin-session-v1').digest('hex');
}

function safeEqual(left: string, right: string) {
  const leftBuffer = new Uint8Array(Buffer.from(left));
  const rightBuffer = new Uint8Array(Buffer.from(right));
  return leftBuffer.length === rightBuffer.length && timingSafeEqual(leftBuffer, rightBuffer);
}

export async function isAdminSessionValid() {
  const password = getAdminPassword();
  if (!password) return false;

  const suppliedToken = (await cookies()).get(ADMIN_COOKIE)?.value;
  return Boolean(suppliedToken && safeEqual(suppliedToken, createSessionToken(password)));
}

export async function requireAdminSession() {
  if (!(await isAdminSessionValid())) redirect('/admin-login');
}

export async function createAdminSession(passwordAttempt: string) {
  const password = getAdminPassword();
  if (!password) return { success: false as const, reason: 'missing' as const };
  if (!safeEqual(passwordAttempt, password)) return { success: false as const, reason: 'invalid' as const };

  (await cookies()).set(ADMIN_COOKIE, createSessionToken(password), {
    httpOnly: true,
    maxAge: SESSION_DURATION_SECONDS,
    path: '/',
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
  });

  return { success: true as const };
}

export async function clearAdminSession() {
  (await cookies()).delete(ADMIN_COOKIE);
}
