import { isAdminSessionValid } from '@/libs/admin-auth';
import { redirect } from 'next/navigation';
import AdminLoginForm from './AdminLoginForm';

export default async function AdminLoginPage() {
  if (await isAdminSessionValid()) redirect('/admin');

  return (
    <main className="relative isolate flex min-h-[70vh] items-center justify-center overflow-hidden bg-[#f1eeea] px-6 py-16">
      <div aria-hidden="true" className="absolute left-1/2 top-10 h-[520px] w-[310px] -translate-x-1/2 rounded-t-full border border-[#c9a760]/70 sm:w-[390px]" />
      <div aria-hidden="true" className="absolute left-1/2 top-24 h-[430px] w-[230px] -translate-x-1/2 rounded-t-full border border-[#c9a760]/45 sm:w-[300px]" />
      <section className="relative w-full max-w-md border border-[#d8cdbd] bg-[#fffdf9] p-8 shadow-[0_18px_50px_rgba(55,43,30,0.10)] sm:p-10">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#6f2633]">Restricted access</p>
        <h1 className="mt-3 font-ecclesial text-4xl">Parish administration</h1>
        <p className="mb-7 mt-3 text-sm leading-6 text-[#6f6254]">Sign in once to use the admin pages for the next eight hours on this device.</p>
        <AdminLoginForm />
      </section>
    </main>
  );
}
