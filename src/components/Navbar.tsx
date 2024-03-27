'use client';

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { FaCaretDown } from 'react-icons/fa';
import { FaCross } from "react-icons/fa";

interface DropdownItems {
  name: string;
  link: string
}

interface NavbarLinks {
  name: string;
  link?: string;
  dropdown?: DropdownItems[]
}

const navbarSections: NavbarLinks[] = [
  { name:'Home', link: '/' },
  { name: 'Welcome', 
    dropdown: [
      { name: 'Contact Us', link: '/contact' },
      { name: 'Team', link: '/team' },
    ]
  },
]

export default function Navbar(){
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setopenDropdown] = useState<string | null>(null);
  const navbarRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = (name: string) => {
    setopenDropdown((prev) => (prev === name ? null : name ))
  }

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (navbarRef.current && !navbarRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false)
      }
    }
    document.addEventListener('click', handleOutsideClick)
    return () => document.removeEventListener('click', handleOutsideClick)
  }, [])

  return (
    <header className="w-full px-9 top-0 sticky z-50 border-b-[3px] border-[#847561] bg-white">
      <nav className="container mx-auto flex h-20 items-center justify-between">
        <div className="md:px-8 flex items-center space-x-4">
          <FaCross size={40} />
          <h1 className="text-2xl md:text-4xl font-bold text-[#333232]">St. Flavius Catholic Church</h1>
        </div>

        <div className="hidden md:flex space-x-10">
          {navbarSections.map((section) => (
            <div key={section.name} className="relative">
              {section.dropdown ? (
                <button className='px-6 flex' onClick={() => toggleDropdown(section.name)}>{section.name} <FaCaretDown /> </button>
              ): (
                <Link className='hover:text-white hover:bg-[#847561] px-6 py-3 rounded-full' href={section.link as string}>{section.name}</Link>
              )}
              {openDropdown === section.name && (
                <div className="absolute z-10 bg-white shadow-md py-2 mt-2 min-w-max rounded border-2 border-[#cdc2b6]">
                  {section.dropdown?.map((item) => (
                    <Link href={item.link} key={item.name} className="block hover:bg-[#847561] hover:text-white px-4 py-2">{item.name}</Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Image src='/menu.svg' alt='Menubar Toggle' width={30} height={30} priority />
          </button>
        </div>
      </nav>

      <div className={isMenuOpen ? 'w-full' : 'hidden'}>
        {navbarSections.map((section) => (
          <div key={section.name} className="mb-4">
            {section.dropdown ? (
              <button onClick={() => toggleDropdown(section.name)}>{section.name}</button>
            ): (
              <Link onClick={() => isMenuOpen && setIsMenuOpen(false)} href={section.link as string}>{section.name}</Link>
            )}
            {openDropdown === section.name && (
              <div className="bg-white py-2">
                {section.dropdown?.map((item) => (
                  <Link onClick={() => isMenuOpen && setIsMenuOpen(false)} href={item.link} key={item.name} className="block px-4 py-2">{item.name}</Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </header>
  )
}
