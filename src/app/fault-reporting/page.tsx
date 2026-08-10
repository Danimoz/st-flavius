import type { Metadata } from 'next';
import { FaCamera, FaEnvelope, FaShieldHeart, FaTriangleExclamation } from 'react-icons/fa6';
import FaultReportForm from './FaultReportForm';

export const metadata: Metadata = {
  title: 'Report a Facility Fault | St. Flavius Catholic Church',
  description: 'Report damage, equipment faults, safety concerns, or maintenance needs at St. Flavius Catholic Church, Oworonshoki.',
};

export default function FaultReportingPage() {
  return (
    <main className="bg-[#f2ece2]">
      <section className="relative isolate overflow-hidden bg-[#181613] px-6 py-20 text-white sm:py-28 lg:px-10">
        <div aria-hidden="true" className="absolute left-1/2 top-8 h-[420px] w-[270px] -translate-x-1/2 rounded-t-full border border-[#c9a760]/30 sm:w-[360px]" />
        <div aria-hidden="true" className="absolute left-1/2 top-20 h-[360px] w-[210px] -translate-x-1/2 rounded-t-full border border-[#c9a760]/20 sm:w-[290px]" />

        <div className="relative mx-auto max-w-4xl text-center">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.28em] text-[#e3c77f]">Care for our common home</p>
          <h1 className="font-ecclesial text-5xl leading-[1.05] sm:text-6xl lg:text-7xl">Facility &amp; equipment<br />fault reporting</h1>
          <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-[#d8cdbd] sm:text-lg">
            Report damage, breakdowns, safety concerns, or maintenance needs across the church premises. Prompt reporting helps preserve a safe and reverent place of worship.
          </p>
        </div>
      </section>

      <section className="border-b border-[#d8cdbd] bg-[#fffdf9] px-6 lg:px-10">
        <div className="mx-auto grid max-w-6xl divide-y divide-[#d8cdbd] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          <div className="flex items-start gap-4 py-6 sm:px-6">
            <FaShieldHeart aria-hidden="true" className="mt-1 shrink-0 text-[#6f2633]" />
            <div><p className="font-semibold">Safety first</p><p className="mt-1 text-sm leading-5 text-[#6f6254]">Keep clear of immediate hazards.</p></div>
          </div>
          <div className="flex items-start gap-4 py-6 sm:px-6">
            <FaCamera aria-hidden="true" className="mt-1 shrink-0 text-[#6f2633]" />
            <div><p className="font-semibold">Evidence helps</p><p className="mt-1 text-sm leading-5 text-[#6f6254]">Attach up to three files.</p></div>
          </div>
          <div className="flex items-start gap-4 py-6 sm:px-6">
            <FaEnvelope aria-hidden="true" className="mt-1 shrink-0 text-[#6f2633]" />
            <div><p className="font-semibold">Sent privately</p><p className="mt-1 text-sm leading-5 text-[#6f6254]">Delivered to the parish team.</p></div>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-10 lg:py-20">
        <div className="mx-auto grid max-w-7xl items-start gap-10 lg:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="lg:sticky lg:top-28">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#6f2633]">Before you begin</p>
            <h2 className="mt-3 font-ecclesial text-3xl leading-tight">A clear report helps us respond well.</h2>
            <p className="mt-4 text-sm leading-6 text-[#6f6254]">Fields marked with an asterisk are required. Your phone number is used only if the team needs clarification or wants to provide an update.</p>
            <div className="mt-7 border-l-2 border-[#c9a760] bg-[#fffdf9] p-5">
              <div className="flex items-start gap-3">
                <FaTriangleExclamation aria-hidden="true" className="mt-1 shrink-0 text-[#9e1f32]" />
                <p className="text-sm leading-6 text-[#4e443a]"><strong>Immediate danger?</strong><br />Move to a safe place and alert parish staff or security before completing this form.</p>
              </div>
            </div>
          </aside>

          <div>
            <FaultReportForm />
          </div>
        </div>
      </section>
    </main>
  );
}
