'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { FaBars, FaCross, FaXmark } from 'react-icons/fa6';

const navigation = [
  { name: 'Mass & Sacraments', href: '/#mass-times' },
  { name: 'Parish Life', href: '/#parish-life' },
  { name: 'Plan a Visit', href: '/#visit' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setIsMenuOpen(false);
    }

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <header ref={headerRef} className="sticky top-0 z-50 border-b border-[#d8cdbd] bg-[#fffdf9]">
      <nav aria-label="Primary navigation" className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-10">
        <Link href="/" className="flex min-h-12 items-center gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6f2633]">
          <span className="flex h-11 w-9 items-center justify-center rounded-t-full border border-[#8a7b69] text-[#6f2633]">
            <FaCross aria-hidden="true" size={21} />
          </span>
          <span className="font-ecclesial text-lg leading-tight text-[#211d19] sm:text-xl">St. Flavius<br className="sm:hidden" /> Catholic Church</span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {navigation.map((item) => (
            <Link key={item.name} href={item.href} className="inline-flex min-h-11 items-center px-4 text-sm font-semibold text-[#4e443a] transition-colors hover:text-[#6f2633] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6f2633]">
              {item.name}
            </Link>
          ))}
          <Link href="/fault-reporting" className="btn-press ml-3 inline-flex min-h-11 items-center border border-[#6f2633] px-4 text-sm font-bold text-[#6f2633] hover:bg-[#6f2633] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6f2633]">
            Report a fault
          </Link>
        </div>

        <button
          type="button"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          onClick={() => setIsMenuOpen((open) => !open)}
          className="inline-flex h-11 w-11 items-center justify-center text-[#211d19] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6f2633] lg:hidden"
        >
          {isMenuOpen ? <FaXmark aria-hidden="true" size={24} /> : <FaBars aria-hidden="true" size={22} />}
        </button>
      </nav>

      <div id="mobile-navigation" data-open={isMenuOpen} inert={!isMenuOpen} className="mobile-nav-panel grid bg-[#fffdf9] lg:hidden">
        <nav aria-label="Mobile navigation" className="mx-auto w-full max-w-7xl border-t border-[#d8cdbd] px-4 py-4 sm:px-6">
          {navigation.map((item) => (
            <Link key={item.name} href={item.href} onClick={() => setIsMenuOpen(false)} className="flex min-h-12 items-center border-b border-[#e6ded3] py-3 font-semibold text-[#342d27] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#6f2633]">
              {item.name}
            </Link>
          ))}
          <Link href="/fault-reporting" onClick={() => setIsMenuOpen(false)} className="btn-press mt-4 flex min-h-12 items-center justify-center bg-[#6f2633] px-5 py-3 font-bold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6f2633]">
            Report a facility fault
          </Link>
        </nav>
      </div>
    </header>
  );
}
