import Hero from '@/components/Hero';
import Homily from '@/images/homily.jpeg';
import Bible from '@/images/bible.jpg';
import Worship from '@/images/contactprayer.jpg';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRight, FaChevronDown, FaClock, FaEnvelope, FaLocationDot } from 'react-icons/fa6';

const sundayMasses = ['7:00 AM', '9:00 AM', '10:30 AM', '6:00 PM'];

const weekdayMasses = [
  { days: 'Monday, Wednesday, Thursday & Friday', times: '6:30 AM · 6:30 PM' },
  { days: 'Tuesday', times: '6:30 AM' },
  { days: 'Saturday', times: '7:00 AM' },
];

const additionalSchedules = [
  {
    title: 'Confession',
    detail: 'Wednesdays and Saturdays after the morning Mass.',
  },
  {
    title: 'Adoration',
    detail: 'The last Friday of every month.',
  },
  {
    title: 'Infant Baptism',
    detail: 'The second Saturday of every month.',
  },
  {
    title: 'Catechism & Christian initiation',
    detail: 'Baptism, Holy Communion, and prayer classes: Saturdays, 3:00–5:00 PM. Confirmation and the Rite of Christian Initiation of Adults (RCIA): Sundays, 3:00–5:00 PM.',
  },
];

const pathways = [
  { label: 'Worship', href: '/#mass-times', text: 'Mass and sacrament times' },
  { label: 'Visit', href: '/#visit', text: 'Address and parish office' },
  { label: 'Belong', href: '/#parish-life', text: 'Meet the parish community' },
  { label: 'Serve', href: '/fault-reporting', text: 'Help us care for the church' },
];

export default function Home() {
  return (
    <main>
      <Hero />

      <nav aria-label="Homepage sections" className="border-b border-[#d8cdbd] bg-[#fffdf9]">
        <div className="mx-auto grid max-w-7xl grid-cols-2 px-4 sm:px-6 lg:grid-cols-4 lg:px-10">
          {pathways.map((pathway, index) => (
            <Link
              key={pathway.label}
              href={pathway.href}
              className={`group flex min-h-24 flex-col justify-center px-4 py-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#6f2633] sm:px-6 ${index % 2 === 0 ? 'border-r border-[#d8cdbd]' : ''} ${index < 2 ? 'border-b border-[#d8cdbd] lg:border-b-0' : ''} ${index === 1 ? 'lg:border-r' : ''}`}
            >
              <span className="font-ecclesial text-xl text-[#211d19] transition-colors group-hover:text-[#6f2633]">{pathway.label}</span>
              <span className="mt-1 text-xs leading-5 text-[#65594d] sm:text-sm">{pathway.text}</span>
            </Link>
          ))}
        </div>
      </nav>

      <section id="mass-times" className="scroll-mt-24 bg-[#f8f7f5] px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <header className="mb-10 grid gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <h2 className="font-ecclesial text-[clamp(2.8rem,6vw,5rem)] leading-none tracking-[-0.025em] text-[#211d19]">Worship with us.</h2>
            <p className="max-w-2xl text-base leading-7 text-[#5d5147] lg:justify-self-end lg:text-lg">
              The Eucharist is at the heart of parish life. Start with the Sunday schedule below, then open the other sacrament and devotion times only when you need them.
            </p>
          </header>

          <div className="grid overflow-hidden border border-[#b9aa96] lg:grid-cols-[1.08fr_0.92fr]">
            <div className="bg-[#6f2633] p-7 text-white sm:p-10 lg:p-12">
              <p className="font-semibold text-[#f0dca8]">Sunday Mass</p>
              <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                {sundayMasses.map((time) => (
                  <time key={time} className="font-ecclesial text-3xl leading-none sm:text-4xl">{time}</time>
                ))}
              </div>
              <p className="mt-9 border-t border-white/25 pt-5 text-sm leading-6 text-[#f2ece2]">
                The 9:00 AM celebration is the Children and Youth Mass.
              </p>
            </div>

            <div className="bg-[#fffdf9] p-7 sm:p-10 lg:p-12">
              <h3 className="font-ecclesial text-2xl text-[#211d19]">Weekday Mass</h3>
              <dl className="mt-6 divide-y divide-[#d8cdbd]">
                {weekdayMasses.map((schedule) => (
                  <div key={schedule.days} className="py-5 first:pt-0 sm:flex sm:items-baseline sm:justify-between sm:gap-6">
                    <dt className="font-semibold leading-6 text-[#342d27]">{schedule.days}</dt>
                    <dd className="mt-1 shrink-0 text-sm font-bold text-[#6f2633] sm:mt-0">{schedule.times}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <div className="mt-8 grid gap-px overflow-hidden border border-[#b9aa96] bg-[#b9aa96] md:grid-cols-2">
            {additionalSchedules.map((schedule) => (
              <details key={schedule.title} className="group bg-[#fffdf9] open:bg-white">
                <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 px-6 py-4 font-semibold text-[#342d27] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#6f2633] [&::-webkit-details-marker]:hidden">
                  {schedule.title}
                  <FaChevronDown aria-hidden="true" className="shrink-0 text-[#6f2633] transition-transform duration-200 group-open:rotate-180" />
                </summary>
                <p className="px-6 pb-6 text-sm leading-6 text-[#5d5147]">{schedule.detail}</p>
              </details>
            ))}
          </div>

          <p className="mt-7 max-w-3xl text-sm leading-6 text-[#5d5147]">
            Schedules may change for solemnities and special parish events. If you are travelling a long distance, please <Link href="/contact" className="inline-flex min-h-[44px] items-center font-semibold text-[#6f2633] underline decoration-[#c9a760] underline-offset-4">contact the parish office</Link> to confirm.
          </p>
        </div>
      </section>

      <section id="visit" className="scroll-mt-24 bg-[#211d19] text-white">
        <div className="mx-auto grid max-w-7xl lg:grid-cols-[0.95fr_1.05fr]">
          <div className="relative min-h-[420px] overflow-hidden lg:min-h-[640px]">
            <Image src={Worship} alt="Parishioners raising their hands in prayer during worship" fill sizes="(min-width: 1024px) 48vw, 100vw" className="object-cover object-center" />
            <div className="absolute inset-0 bg-[#2b1220]/20" />
          </div>

          <div className="flex flex-col justify-center px-6 py-14 sm:px-10 lg:px-16 lg:py-20">
            <h2 className="font-ecclesial text-[clamp(2.8rem,5vw,4.8rem)] leading-none tracking-[-0.025em]">Your first visit.</h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-[#d8cdbd]">
              Come as you are. Our church is on Akerele Street in Oworonshoki, and parishioners are available to help you find a seat or answer questions before Mass.
            </p>

            <div className="mt-9 space-y-5 border-y border-white/20 py-7 text-sm text-[#f2ece2]">
              <p className="flex items-start gap-4"><FaLocationDot aria-hidden="true" className="mt-1 shrink-0 text-[#c9a760]" /><span><strong className="block text-white">St. Flavius Catholic Church</strong>2 Akerele Street, Oworonshoki, Lagos</span></p>
              <p className="flex items-start gap-4"><FaClock aria-hidden="true" className="mt-1 shrink-0 text-[#c9a760]" /><span><strong className="block text-white">Parish office</strong>Monday, Tuesday, Wednesday &amp; Friday · 9:00 AM–2:00 PM</span></p>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="https://www.google.com/maps/search/?api=1&query=St.+Flavius+Catholic+Church+Oworonshoki" target="_blank" rel="noopener noreferrer" className="btn-press inline-flex min-h-12 items-center justify-center gap-3 bg-[#c9a760] px-6 py-3 font-bold text-[#181613] hover:bg-[#e3c77f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
                Get directions <FaArrowRight aria-hidden="true" size={13} /><span className="sr-only"> (opens in a new tab)</span>
              </a>
              <Link href="/contact" className="btn-press inline-flex min-h-12 items-center justify-center border border-white/50 px-6 py-3 font-semibold text-white hover:border-white hover:bg-white hover:text-[#181613] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">Contact the parish</Link>
            </div>
          </div>
        </div>
      </section>

      <section id="parish-life" className="scroll-mt-24 bg-[#fffdf9] px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <h2 className="font-ecclesial text-[clamp(2.8rem,5vw,4.8rem)] leading-none tracking-[-0.025em] text-[#211d19]">Belong. Grow. Serve.</h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-[#5d5147]">
                Parish life continues beyond Sunday. Meet the people who serve the community, speak with the parish office, or help us care for the church premises.
              </p>
              <div className="mt-8 flex flex-wrap gap-x-7 gap-y-4">
                <Link href="/team" className="inline-flex min-h-[44px] items-center gap-2 font-bold text-[#6f2633] underline decoration-[#c9a760] underline-offset-4">Meet our parish team <FaArrowRight aria-hidden="true" size={12} /></Link>
                <Link href="/fault-reporting" className="inline-flex min-h-[44px] items-center gap-2 font-bold text-[#6f2633] underline decoration-[#c9a760] underline-offset-4">Report a facility fault <FaArrowRight aria-hidden="true" size={12} /></Link>
              </div>
            </div>

            <blockquote className="border-y border-[#c9a760] py-8 font-ecclesial text-3xl leading-tight text-[#342d27] sm:py-10 sm:text-4xl">
              “Preach the Gospel while practising the corporal works of mercy.”
              <cite className="mt-5 block font-sans text-sm font-semibold not-italic text-[#6f2633]">Our parish mission</cite>
            </blockquote>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
            <a href="https://frenimabasimacjoemsp.podbean.com/" target="_blank" rel="noopener noreferrer" className="group relative min-h-[380px] overflow-hidden bg-[#211d19] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6f2633]">
              <Image src={Homily} alt="" fill sizes="(min-width: 768px) 60vw, 100vw" className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.025]" />
              <div className="absolute inset-0 bg-[#f1eeea]/35" />
              <div className="absolute inset-x-0 bottom-0 bg-[#f1eeea]/95 p-7 text-[#211d19] sm:p-9">
                <p className="text-sm font-semibold text-[#6f2633]">Listen</p>
                <h3 className="mt-2 font-ecclesial text-4xl">Daily homilies</h3>
                <p className="mt-3 max-w-md text-sm leading-6 text-[#4f453b]">Reflect on the Word with homilies from the parish.</p>
                <span className="mt-5 inline-flex items-center gap-2 font-bold text-[#6f2633]">Open homilies <FaArrowRight aria-hidden="true" size={12} /><span className="sr-only"> (opens in a new tab)</span></span>
              </div>
            </a>

            <a href="https://universalis.com/mass.htm" target="_blank" rel="noopener noreferrer" className="group relative min-h-[380px] overflow-hidden bg-[#6f2633] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6f2633]">
              <Image src={Bible} alt="" fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.025]" />
              <div className="absolute inset-0 bg-[#2b1220]/60" />
              <div className="absolute inset-x-0 bottom-0 p-7 text-white sm:p-9">
                <p className="text-sm font-semibold text-[#f0dca8]">Read</p>
                <h3 className="mt-2 font-ecclesial text-4xl">Daily readings</h3>
                <p className="mt-3 text-sm leading-6 text-[#f2ece2]">Follow the readings and prayers of the Church.</p>
                <span className="mt-5 inline-flex items-center gap-2 font-bold">Open readings <FaArrowRight aria-hidden="true" size={12} /><span className="sr-only"> (opens in a new tab)</span></span>
              </div>
            </a>
          </div>
        </div>
      </section>

      <section className="bg-[#6f2633] px-6 py-14 text-white lg:px-10 lg:py-16">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="font-ecclesial text-3xl sm:text-4xl">Need help finding your place here?</h2>
            <p className="mt-3 max-w-2xl leading-7 text-[#f2ece2]">The parish office can help with sacrament preparation, joining a society, or arranging a conversation with the parish team.</p>
          </div>
          <Link href="/contact" className="btn-press inline-flex min-h-12 shrink-0 items-center justify-center gap-3 bg-white px-6 py-3 font-bold text-[#6f2633] hover:bg-[#f2ece2] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
            Contact the parish <FaEnvelope aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
