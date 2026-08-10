import Image from 'next/image';
import Link from 'next/link';
import HeroImage from '@/images/hero1.jpg';
import { FaArrowRight, FaLocationDot } from 'react-icons/fa6';

export default function Hero() {
  return (
    <section className="relative isolate flex min-h-[640px] items-end overflow-hidden bg-[#181613] text-white sm:min-h-[680px] lg:min-h-[720px]">
      <Image
        src={HeroImage}
        alt="Stained-glass scenes of Christ inside a Catholic church"
        fill
        priority
        quality={100}
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-[#18130f]/70" />

      <div className="relative mx-auto w-full max-w-7xl px-6 pb-16 pt-28 sm:pb-20 lg:px-10 lg:pb-24">
        <div className="max-w-4xl">
          <p className="mb-5 flex items-center gap-2 text-sm font-semibold text-[#e3c77f]">
            <FaLocationDot aria-hidden="true" />
            Oworonshoki, Lagos
          </p>
          <h1 className="font-ecclesial text-[clamp(3.4rem,8vw,5.7rem)] leading-[0.98] tracking-[-0.025em] text-balance">
            Come worship<br className="hidden sm:block" /> with us.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-[#f2ece2] sm:text-xl">
            Join us for Sunday Mass at 7:00 AM, 9:00 AM, 10:30 AM, or 6:00 PM. Whether you are visiting for the first time or returning home, you are welcome here.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="/#mass-times" className="inline-flex min-h-12 items-center justify-center gap-3 bg-[#c9a760] px-6 py-3 font-bold text-[#181613] transition-colors hover:bg-[#e3c77f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
              View Mass times <FaArrowRight aria-hidden="true" size={13} />
            </Link>
            <Link href="/#visit" className="inline-flex min-h-12 items-center justify-center border border-white/60 px-6 py-3 font-semibold text-white transition-colors hover:border-white hover:bg-white hover:text-[#181613] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
              Plan your visit
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
