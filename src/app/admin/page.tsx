import PageHero from '@/components/PageHero';
import { logoutAdmin } from '@/app/admin-login/actions';
import type { Metadata } from 'next';
import Link from 'next/link';
import { FaArrowRight, FaIdCard, FaUsers } from 'react-icons/fa6';

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

const actions = [
  { href: '/admin/register', icon: FaIdCard, title: 'Register a parishioner', description: 'Create a new parish record for an in-person registration.' },
  { href: '/admin/parishioners', icon: FaUsers, title: 'View parishioners', description: 'Search and review the current parish membership register.' },
];

export default function AdminPage() {
  return (
    <main className="min-h-[70vh] bg-[#f1eeea] text-[#211d19]">
      <PageHero eyebrow="Restricted parish workspace" title="Administration." description="Manage parish registration records from one clear, secure workspace." compact />
      <section className="px-6 py-14 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-6 md:grid-cols-2">
            {actions.map(({ href, icon: Icon, title, description }) => (
              <Link key={href} href={href} className="group border border-[#d8cdbd] bg-[#fffdf9] p-7 shadow-[0_16px_40px_rgba(55,43,30,0.07)] transition-colors hover:border-[#c9a760] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6f2633] sm:p-9">
                <span className="flex h-14 w-12 items-center justify-center rounded-t-full bg-[#211d19] text-[#e3c77f]"><Icon aria-hidden="true" size={22} /></span>
                <h2 className="mt-7 font-ecclesial text-3xl">{title}</h2>
                <p className="mt-3 leading-7 text-[#6f6254]">{description}</p>
                <span className="mt-7 inline-flex min-h-[44px] items-center gap-2 font-semibold text-[#6f2633]">Open <FaArrowRight aria-hidden="true" size={12} /></span>
              </Link>
            ))}
          </div>
          <form action={logoutAdmin} className="mt-8 flex justify-end">
            <button type="submit" className="inline-flex min-h-[44px] items-center font-semibold text-[#6f2633] underline decoration-[#c9a760] underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6f2633]">Sign out</button>
          </form>
        </div>
      </section>
    </main>
  );
}
