import PageHero from '@/components/PageHero';
import { allParishioners } from '@/libs/actions';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import ParishionersSearch from './search';

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function ViewParishioners(props: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const searchParams = await props.searchParams;
  const page = typeof searchParams.page === 'string' ? Number(searchParams.page) : 1;
  const limit = typeof searchParams.limit === 'string' ? Number(searchParams.limit) : 40;
  const search = typeof searchParams.search === 'string' ? searchParams.search : undefined;
  const { data: parishioners, totalItems } = await allParishioners(page, limit, search);
  const totalPages = Math.max(1, Math.ceil(totalItems / limit));

  return (
    <main className="bg-[#f1eeea] text-[#211d19]">
      <PageHero eyebrow="Parish administration" title="Parishioner register." description="Search and review the people currently recorded in the parish register." compact />

      <section className="px-4 py-12 sm:px-6 lg:px-10 lg:py-16">
        <div className="mx-auto max-w-[1500px]">
          <div className="mb-7 flex flex-col gap-5 border-b border-[#c9a760] pb-7 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#6f2633]">Current records</p>
              <h2 className="mt-2 font-ecclesial text-3xl sm:text-4xl">{totalItems} parishioners</h2>
            </div>
            <ParishionersSearch search={search} />
          </div>

          <Suspense fallback={<p className="border border-[#d8cdbd] bg-[#fffdf9] p-8 text-[#6f6254]">Loading parishioners…</p>}>
            <div className="overflow-x-auto border border-[#d8cdbd] bg-[#fffdf9] shadow-[0_16px_40px_rgba(55,43,30,0.07)]">
              <table className="min-w-[1180px] w-full text-left text-sm">
                <caption className="sr-only">Registered parishioners</caption>
                <thead className="bg-[#211d19] text-[#f2ece2]">
                  <tr>
                    {['ID', 'Name', 'Contact', 'Address', 'Occupation', 'Date of birth', 'Baptized', 'Confirmed', 'Communicant', 'Married'].map((heading) => (
                      <th key={heading} scope="col" className="px-4 py-4 text-xs font-bold uppercase tracking-[0.12em]">{heading}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {parishioners?.map((parishioner, index) => (
                    <tr key={parishioner.parishionerId} className={`border-b border-[#e3dbd1] ${index % 2 === 0 ? 'bg-[#fffdf9]' : 'bg-[#f6f2ed]'}`}>
                      <td className="px-4 py-4 font-semibold text-[#6f2633]">{parishioner.parishionerId}</td>
                      <td className="px-4 py-4 font-semibold">{parishioner.firstName} {parishioner.lastName}</td>
                      <td className="px-4 py-4 text-[#5f5449]">{parishioner.email}<br />{parishioner.phone}</td>
                      <td className="px-4 py-4">{parishioner.address}</td>
                      <td className="px-4 py-4">{parishioner.occupation}</td>
                      <td className="px-4 py-4">{parishioner.dateOfBirth}</td>
                      <td className="px-4 py-4">{parishioner.baptized ? 'Yes' : 'No'}</td>
                      <td className="px-4 py-4">{parishioner.confirmed ? 'Yes' : 'No'}</td>
                      <td className="px-4 py-4">{parishioner.communicant ? 'Yes' : 'No'}</td>
                      <td className="px-4 py-4">{parishioner.married ? 'Yes' : 'No'}</td>
                    </tr>
                  ))}
                  {!parishioners?.length && <tr><td colSpan={10} className="px-6 py-14 text-center text-[#6f6254]">No parishioners match this search.</td></tr>}
                </tbody>
              </table>
            </div>

            <nav aria-label="Parishioner pages" className="mt-7 flex items-center justify-between gap-4">
              <p className="text-sm text-[#6f6254]">Page {Math.min(page, totalPages)} of {totalPages}</p>
              <div className="flex gap-3">
                <Link href={{ pathname: '/admin/parishioners', query: { ...(search ? { search } : {}), page: Math.max(1, page - 1) } }} aria-disabled={page <= 1} className={`inline-flex min-h-[44px] items-center border border-[#6f2633] px-5 py-2 text-sm font-semibold text-[#6f2633] ${page <= 1 ? 'pointer-events-none opacity-45' : 'hover:bg-[#6f2633] hover:text-white'}`}>Previous</Link>
                <Link href={{ pathname: '/admin/parishioners', query: { ...(search ? { search } : {}), page: Math.min(totalPages, page + 1) } }} aria-disabled={page >= totalPages} className={`inline-flex min-h-[44px] items-center bg-[#6f2633] px-5 py-2 text-sm font-semibold text-white ${page >= totalPages ? 'pointer-events-none opacity-45' : 'hover:bg-[#4c1822]'}`}>Next</Link>
              </div>
            </nav>
          </Suspense>
        </div>
      </section>
    </main>
  );
}
