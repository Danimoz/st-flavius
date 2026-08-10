import Link from "next/link";
import { FaArrowRight, FaChurch, FaClock, FaEnvelope, FaLocationDot } from "react-icons/fa6";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-[#181613] text-[#f2ece2]">
      <div aria-hidden="true" className="absolute left-1/2 top-0 h-28 w-40 -translate-x-1/2 -translate-y-20 rounded-b-full border-2 border-[#c9a760]/40" />

      <div className="relative mx-auto max-w-7xl px-6 pb-8 pt-16 lg:px-10 lg:pt-20">
        <div className="grid gap-12 border-b border-[#d8cdbd]/20 pb-14 lg:grid-cols-[1.4fr_0.7fr_1fr_1fr] lg:gap-10">
          <div className="max-w-md">
            <div className="mb-6 flex items-center gap-4">
              <span className="flex h-14 w-12 items-center justify-center rounded-t-full border border-[#c9a760]/60 text-[#c9a760]">
                <FaChurch aria-hidden="true" size={25} />
              </span>
              <p className="font-ecclesial text-2xl leading-tight text-white">St. Flavius<br />Catholic Church</p>
            </div>
            <p className="max-w-sm leading-7 text-[#d8cdbd]">
              A community of God&apos;s people, united in heart and soul—welcoming all to worship, grow, and serve.
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <h2 className="mb-5 font-ecclesial text-lg text-[#c9a760]">Explore</h2>
            <ul className="text-sm">
              <li><Link className="inline-flex min-h-[44px] min-w-[44px] items-center hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c9a760]" href="/">Home</Link></li>
              <li><Link className="inline-flex min-h-[44px] min-w-[44px] items-center hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c9a760]" href="/team">Our Team</Link></li>
              <li><Link className="inline-flex min-h-[44px] min-w-[44px] items-center hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c9a760]" href="/contact">Contact Us</Link></li>
              <li><Link className="inline-flex min-h-[44px] min-w-[44px] items-center gap-2 text-[#e3c77f] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c9a760]" href="/fault-reporting">Report a fault <FaArrowRight aria-hidden="true" size={11} /></Link></li>
            </ul>
          </nav>

          <div>
            <h2 className="mb-5 font-ecclesial text-lg text-[#c9a760]">Visit the parish</h2>
            <p className="flex items-start gap-3 text-sm leading-6 text-[#d8cdbd]">
              <FaLocationDot aria-hidden="true" className="mt-1 shrink-0 text-[#c9a760]" />
              <span>2 Akerele Street,<br />Oworonshoki, Lagos</span>
            </p>
            <p className="mt-4 flex items-start gap-3 text-sm leading-6 text-[#d8cdbd]">
              <FaClock aria-hidden="true" className="mt-1 shrink-0 text-[#c9a760]" />
              <span>Parish office<br />Mon, Tue, Wed &amp; Fri<br />9:00 AM–2:00 PM</span>
            </p>
          </div>

          <div>
            <h2 className="mb-5 font-ecclesial text-lg text-[#c9a760]">Stay connected</h2>
            <Link className="flex min-h-[44px] items-center gap-3 break-all text-sm leading-6 text-[#d8cdbd] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c9a760]" href="mailto:stflavius9@gmail.com">
              <FaEnvelope aria-hidden="true" className="mt-1 shrink-0 text-[#c9a760]" />
              stflavius9@gmail.com
            </Link>
            <Link href="/fault-reporting" className="mt-7 inline-flex min-h-11 items-center justify-center border border-[#c9a760] px-5 py-3 text-sm font-semibold text-[#f5e5b9] transition-colors hover:bg-[#c9a760] hover:text-[#181613] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
              Facility fault reporting
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-7 text-xs text-[#a99b89] sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} St. Flavius Catholic Church. All rights reserved.</p>
          <p>Oworonshoki, Lagos</p>
        </div>
      </div>
    </footer>
  );
}
