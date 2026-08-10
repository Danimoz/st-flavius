'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { loginAdmin, type AdminLoginState } from './actions';

const initialState: AdminLoginState = { error: '' };

function LoginButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="mt-6 min-h-12 w-full bg-[#6f2633] px-5 py-3 font-semibold text-white hover:bg-[#4c1822] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6f2633] disabled:opacity-70">
      {pending ? 'Checking…' : 'Enter admin area'}
    </button>
  );
}

export default function AdminLoginForm() {
  const [state, action] = useActionState(loginAdmin, initialState);

  return (
    <form action={action}>
      <label htmlFor="password" className="text-sm font-semibold text-[#342d27]">Administrator password</label>
      <input id="password" name="password" type="password" autoComplete="current-password" required autoFocus className="mt-2 min-h-12 w-full border border-[#b9aa96] bg-white px-4 py-3 outline-none focus:border-[#6f2633] focus:ring-2 focus:ring-[#6f2633]/20" />
      {state.error && <p className="mt-3 text-sm font-medium text-[#9e1f32]" role="alert">{state.error}</p>}
      <LoginButton />
    </form>
  );
}
