'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { useDebounce } from 'use-debounce';

export default function ParishionersSearch({ search }: { search?: string }) {
  const router = useRouter();
  const [searchText, setSearchText] = useState(search ?? '');
  const initialRender = useRef(true);
  const [query] = useDebounce(searchText, 750);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
    if (!query) router.push('/admin/parishioners');
    else router.push(`/admin/parishioners?search=${encodeURIComponent(query)}`);
  }, [query, router]);

  return (
    <div className="w-full md:max-w-md">
      <label htmlFor="parishioner-search" className="sr-only">Search parishioners</label>
      <div className="relative">
        <FaMagnifyingGlass aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#6f2633]" />
        <input
          id="parishioner-search"
          type="search"
          placeholder="Search by parishioner details"
          className="min-h-12 w-full border border-[#b9aa96] bg-[#fffdf9] py-3 pl-11 pr-4 outline-none placeholder:text-[#6f6254] focus:border-[#6f2633] focus:ring-2 focus:ring-[#6f2633]/20"
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
        />
      </div>
    </div>
  );
}
