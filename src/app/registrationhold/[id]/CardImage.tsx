'use client';

import { IParishioner } from '@/types';
import { toPng } from 'html-to-image';
import { useRef } from 'react';
import { FaChurch, FaDownload } from 'react-icons/fa6';

export default function CardImage({ parishioner }: { parishioner: IParishioner }) {
  const elementRef = useRef<HTMLDivElement>(null);

  const convertToImage = () => {
    toPng(elementRef.current as HTMLDivElement, { cacheBust: false })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = 'st-flavius-membership-card.png';
        link.href = dataUrl;
        link.click();
      })
      .catch((error) => console.error('Error converting membership card to an image:', error));
  };

  const getExpiryDate = (date: Date) => {
    const expiryDate = new Date(date.getFullYear() + 5, date.getMonth(), date.getDate());
    return expiryDate.toLocaleDateString('default', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <div className="mx-auto max-w-3xl">
      <div ref={elementRef} className="relative overflow-hidden border border-[#c9a760] bg-[#fffdf9] p-7 shadow-[0_22px_60px_rgba(55,43,30,0.12)] sm:p-12">
        <div aria-hidden="true" className="absolute left-1/2 top-5 h-48 w-36 -translate-x-1/2 rounded-t-full border border-[#c9a760]/35" />
        <header className="relative border-b border-[#c9a760] pb-8 text-center">
          <span className="mx-auto flex h-14 w-12 items-center justify-center rounded-t-full bg-[#211d19] text-[#e3c77f]"><FaChurch aria-hidden="true" size={23} /></span>
          <p className="mt-5 text-xs font-bold uppercase tracking-[0.24em] text-[#6f2633]">St. Flavius Catholic Church</p>
          <h2 className="mt-2 font-ecclesial text-3xl sm:text-4xl">Parish membership card</h2>
          <p className="mt-3 text-sm text-[#6f6254]">Valid until {getExpiryDate(parishioner.createdAt as Date)}</p>
        </header>

        <dl className="relative mt-8 grid gap-x-8 gap-y-5 sm:grid-cols-2">
          {[
            ['Name', `${parishioner.firstName} ${parishioner.lastName}`],
            ['Parishioner ID', parishioner.parishionerId],
            ['Occupation', parishioner.occupation],
            ['Phone', parishioner.phone],
            ['Email', parishioner.email],
          ].map(([label, value]) => (
            <div key={label} className="border-b border-[#e3dbd1] pb-4">
              <dt className="text-xs font-bold uppercase tracking-[0.14em] text-[#6f2633]">{label}</dt>
              <dd className="mt-1 break-words text-base text-[#342d27]">{value || 'Not provided'}</dd>
            </div>
          ))}
        </dl>

        <div className="relative mt-9 border-l-2 border-[#c9a760] bg-[#f6f2ed] p-6 text-sm leading-6 text-[#4f453b]">
          <p>This person is a registered member of the parish and may:</p>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>Share in Holy Masses offered annually for the intentions of parishioners.</li>
            <li>Request Infant Baptism, Confession, Marriage, Burial, and other parish services.</li>
          </ul>
          <p className="mt-4">Please present this card when requesting a service from St. Flavius Catholic Church.</p>
        </div>
      </div>

      <div className="mt-7 flex justify-center">
        <button type="button" onClick={convertToImage} className="inline-flex min-h-12 items-center justify-center gap-3 bg-[#6f2633] px-7 py-3 font-semibold text-white hover:bg-[#4c1822] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6f2633]">
          <FaDownload aria-hidden="true" /> Download card
        </button>
      </div>
    </div>
  );
}
