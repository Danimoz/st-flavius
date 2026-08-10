'use server';

import { clearAdminSession, createAdminSession } from '@/libs/admin-auth';
import { redirect } from 'next/navigation';

export type AdminLoginState = { error: string };

export async function loginAdmin(_state: AdminLoginState, formData: FormData): Promise<AdminLoginState> {
  const password = formData.get('password');
  if (typeof password !== 'string' || !password) return { error: 'Enter the administrator password.' };

  const result = await createAdminSession(password);
  if (!result.success) {
    return {
      error: result.reason === 'missing'
        ? 'Admin access is not configured. Set ADMIN_PASSWORD on the server.'
        : 'That password is not correct.',
    };
  }

  redirect('/admin');
}

export async function logoutAdmin() {
  await clearAdminSession();
  redirect('/admin-login');
}
