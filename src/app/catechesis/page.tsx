import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Bible from '@/images/bible.jpg';
import {
  FaArrowRight,
  FaArrowRightArrowLeft,
  FaArrowUpRightFromSquare,
  FaChartLine,
  FaCircleCheck,
  FaUserPlus,
} from 'react-icons/fa6';

const portalUrl = 'https://ionstech.com.ng/ccmd/';

const formationSteps = [
  {
    title: 'Register',
    description: 'Register catechumens and parishioners through a streamlined digital intake process.',
    icon: FaUserPlus,
  },
  {
    title: 'Track',
    description: 'Keep attendance, formation progress, and important milestones together in one place.',
    icon: FaChartLine,
  },
  {
    title: 'Transfer',
    description: 'Move records between parishes, classes, or programmes when a formation journey changes.',
    icon: FaArrowRightArrowLeft,
  },
  {
    title: 'Progress',
    description: 'Follow each person from inquiry through preparation and full initiation into the Church.',
    icon: FaCircleCheck,
  },
];

export const metadata: Metadata = {
  title: 'Catechesis | St. Flavius Catholic Church',
  description: 'Begin or continue your faith formation journey through the St. Flavius catechesis portal.',
  alternates: { canonical: 'https://stflaviusoworonshoki.com/catechesis' },
};

export default function CatechesisPage() {
  return (
    <main className="bg-[#f1eeea] text-[#211d19]">
      <section className="relative isolate overflow-hidden bg-[#181613] text-white">
        <div aria-hidden="true" className="absolute -left-20 top-20 h-[34rem] w-[23rem] rounded-t-full border border-[#c9a760]/20" />
        <div aria-hidden="true" className="absolute -left-8 top-32 h-[29rem] w-[18rem] rounded-t-full border border-[#c9a760]/15" />

        <div className="relative mx-auto grid min-h-[680px] max-w-7xl lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
          <div className="flex flex-col justify-center px-6 py-20 sm:px-10 sm:py-24 lg:py-28">
            <p className="text-xs font-bold uppercase tracking-[0.26em] text-[#e3c77f]">St. Flavius catechesis</p>
            <h1 className="mt-5 max-w-3xl font-ecclesial text-[clamp(3.5rem,7vw,5.75rem)] leading-[0.98] tracking-[-0.03em]">
              Go forth.<br />Make disciples<br />of all nations.
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-[#d8cdbd]">
              Begin or continue your journey of faith formation with a digital portal that helps our parish register, accompany, and support every catechumen.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href={portalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-press inline-flex min-h-12 items-center justify-center gap-3 bg-[#c9a760] px-6 py-3 font-bold text-[#181613] hover:bg-[#e3c77f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                Open the catechesis portal
                <FaArrowUpRightFromSquare aria-hidden="true" size={13} />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              <a
                href="#formation-journey"
                className="btn-press inline-flex min-h-12 items-center justify-center border border-white/50 px-6 py-3 font-semibold text-white hover:border-white hover:bg-white hover:text-[#181613] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                See how it helps
              </a>
            </div>

            <p className="mt-7 max-w-xl text-sm leading-6 text-[#a99b89]">
              The portal is an external service created and managed by Ions Tech Limited.
            </p>
          </div>

          <div className="relative min-h-[460px] px-6 pb-8 sm:px-10 lg:min-h-full lg:px-0 lg:pb-0 lg:pr-10 lg:pt-12">
            <div className="relative h-full min-h-[460px] overflow-hidden rounded-t-[12rem] bg-[#342d27] lg:min-h-[620px]">
              <Image
                src={Bible}
                alt="A Bible and rosary held during prayer"
                fill
                priority
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover object-[58%_center]"
              />
              <div className="absolute inset-0 bg-[#2b1220]/20" />
              <blockquote className="absolute inset-x-0 bottom-0 bg-[#181613]/90 px-7 py-7 font-ecclesial text-2xl leading-tight sm:px-9 sm:py-8 sm:text-3xl">
                “Go, therefore, and make disciples of all nations.”
                <cite className="mt-3 block font-sans text-xs font-semibold not-italic text-[#e3c77f]">Matthew 28:19</cite>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      <section id="formation-journey" className="scroll-mt-24 bg-[#fffdf9] px-6 py-16 sm:py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <header className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <h2 className="max-w-2xl font-ecclesial text-[clamp(2.8rem,5vw,4.8rem)] leading-none tracking-[-0.025em]">
              One journey, clearly accompanied.
            </h2>
            <p className="max-w-2xl text-lg leading-8 text-[#5d5147] lg:justify-self-end">
              The portal brings the practical parts of catechesis into one dependable flow, so more time can be given to teaching, prayer, and personal accompaniment.
            </p>
          </header>

          <ol className="mt-12 grid overflow-hidden border border-[#b9aa96] bg-[#b9aa96] gap-px sm:grid-cols-2 lg:grid-cols-4">
            {formationSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <li key={step.title} className="bg-[#f8f7f5] px-6 py-8 sm:px-7 sm:py-10">
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-ecclesial text-3xl text-[#6f2633]">{String(index + 1).padStart(2, '0')}</span>
                    <Icon aria-hidden="true" className="text-[#8f7132]" size={24} />
                  </div>
                  <h3 className="mt-9 font-ecclesial text-3xl text-[#211d19]">{step.title}</h3>
                  <p className="mt-4 text-sm leading-6 text-[#5d5147]">{step.description}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section className="bg-[#211d19] px-6 py-16 text-white sm:py-20 lg:px-10 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-20">
          <div>
            <p className="font-ecclesial text-3xl leading-tight text-[#e3c77f] sm:text-4xl">Faith is formed in community.</p>
            <p className="mt-5 max-w-xl leading-7 text-[#d8cdbd]">
              The portal supports the records and milestones. Our catechists, families, sponsors, and parish community continue to provide the human care at the heart of formation.
            </p>
          </div>

          <div className="border-y border-white/20 py-8 sm:py-10">
            <h2 className="font-ecclesial text-4xl sm:text-5xl">Ready to take the next step?</h2>
            <p className="mt-5 max-w-2xl leading-7 text-[#d8cdbd]">
              Open the catechesis portal to register or sign in. If you need help choosing a programme or understanding the parish process, contact the St. Flavius parish office.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={portalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-press inline-flex min-h-12 items-center justify-center gap-3 bg-[#c9a760] px-6 py-3 font-bold text-[#181613] hover:bg-[#e3c77f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                Continue to the portal
                <FaArrowUpRightFromSquare aria-hidden="true" size={13} />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              <Link
                href="/contact"
                className="btn-press inline-flex min-h-12 items-center justify-center gap-3 border border-white/50 px-6 py-3 font-semibold text-white hover:border-white hover:bg-white hover:text-[#181613] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                Ask the parish office <FaArrowRight aria-hidden="true" size={12} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
