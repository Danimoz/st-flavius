'use client';

import { SubmitButton } from '@/components/SubmitButton';
import { FieldError, formInputClass, formLabelClass } from '@/components/FormField';
import ask from '@/images/question.jpg';
import contactPrayer from '@/images/contactprayer.jpg';
import { handleContact } from '@/libs/actions';
import { ContactFormErrors } from '@/libs/validations';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { FaClock, FaEnvelope, FaLocationDot } from 'react-icons/fa6';

export default function Contact() {
  const [validationError, setValidationError] = useState<ContactFormErrors>({});
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const formRef = useRef<HTMLFormElement>(null);

  async function action(data: FormData) {
    const result = await handleContact(data);
    if (result?.error?.fieldErrors) {
      setValidationError(result.error.fieldErrors);
      setSubmissionStatus('idle');
      return;
    }
    setValidationError({});
    if (result?.success) {
      setSubmissionStatus('success');
      formRef.current?.reset();
    } else {
      setSubmissionStatus('error');
    }
  }

  return (
    <main className="bg-[#f1eeea] text-[#211d19]">
      <section className="relative isolate min-h-[520px] overflow-hidden px-6 py-24 text-white sm:py-32 lg:px-10">
        <Image src={contactPrayer} alt="Parishioners raising their hands in prayer" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-[#181613]/75" />
        <div aria-hidden="true" className="absolute left-1/2 top-12 h-[420px] w-[260px] -translate-x-1/2 rounded-t-full border border-[#c9a760]/35 sm:w-[340px]" />
        <div className="relative mx-auto flex max-w-7xl flex-col items-start justify-center">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#e3c77f]">The parish office is here to help</p>
          <h1 className="mt-5 max-w-3xl font-ecclesial text-5xl leading-[1.04] sm:text-6xl lg:text-7xl">Let&apos;s begin a conversation.</h1>
          <p className="mt-7 max-w-2xl text-base leading-7 text-[#f2ece2] sm:text-lg">Ask about parish life, sacrament preparation, or practical arrangements. We will direct your message to the right person.</p>
        </div>
      </section>

      <section className="border-b border-[#d8cdbd] bg-[#fffdf9] px-6 py-14 lg:px-10 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-stretch">
          <div className="flex flex-col justify-between border-l-2 border-[#c9a760] py-2 pl-7 sm:pl-9">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#6f2633]">Visit us</p>
              <h2 className="mt-3 font-ecclesial text-4xl sm:text-5xl">At the heart of Oworonshoki.</h2>
              <p className="mt-5 max-w-md leading-7 text-[#6f6254]">The church and parish office are on Akerele Street. Come for Mass, speak with the parish team, or leave a message below.</p>
            </div>
            <div className="mt-9 space-y-5 text-sm leading-6 text-[#4f453b]">
              <p className="flex items-start gap-3"><FaLocationDot aria-hidden="true" className="mt-1 shrink-0 text-[#6f2633]" /><span><strong className="block text-[#211d19]">St. Flavius Catholic Church</strong>2 Akerele Street, Oworonshoki, Lagos</span></p>
              <p className="flex items-start gap-3"><FaClock aria-hidden="true" className="mt-1 shrink-0 text-[#6f2633]" /><span><strong className="block text-[#211d19]">Parish office</strong>Monday, Tuesday, Wednesday &amp; Friday<br />9:00 AM–2:00 PM</span></p>
              <a className="inline-flex min-h-[44px] items-center gap-3 font-semibold text-[#6f2633] underline decoration-[#c9a760] underline-offset-4" href="mailto:stflavius9@gmail.com"><FaEnvelope aria-hidden="true" />stflavius9@gmail.com</a>
            </div>
          </div>

          <div className="overflow-hidden border border-[#d8cdbd] bg-[#e7e0d7] shadow-[0_18px_45px_rgba(55,43,30,0.10)]">
            <iframe
              title="Map showing St. Flavius Catholic Church in Oworonshoki"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1981.877675555534!2d3.4011965388192835!3d6.552540498360125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8d43f803a28b%3A0xcd8742791e86e7f6!2sSt.%20Flavius%20Catholic%20Church!5e0!3m2!1sen!2sng!4v1700304377121!5m2!1sen!2sng"
              className="min-h-[360px] w-full lg:h-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <section className="px-6 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div className="relative min-h-[430px] overflow-hidden rounded-t-[10rem] bg-[#211d19] lg:sticky lg:top-28">
            <Image src={ask} alt="A person preparing to ask a question" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
            <div className="absolute inset-0 bg-[#181613]/25" />
          </div>

          <form ref={formRef} action={action} className="border border-[#d8cdbd] bg-[#fffdf9] p-6 shadow-[0_18px_50px_rgba(55,43,30,0.08)] sm:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#6f2633]">Send a message</p>
            <h2 className="mt-3 font-ecclesial text-4xl sm:text-5xl">Ask a question.</h2>
            <p className="mb-8 mt-4 max-w-2xl leading-7 text-[#6f6254]">Share enough detail for the parish office to understand what you need. Fields marked with an asterisk are required.</p>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className={formLabelClass}>Name <span className="text-[#9e1f32]">*</span></label>
                <input id="name" type="text" placeholder="Your full name" name="name" autoComplete="name" className={formInputClass} required />
                <FieldError errors={validationError.name} />
              </div>
              <div>
                <label htmlFor="email" className={formLabelClass}>Email address</label>
                <input id="email" type="email" name="email" placeholder="you@example.com" autoComplete="email" className={formInputClass} />
                <FieldError errors={validationError.email} />
              </div>
            </div>

            <div className="mt-6">
              <label htmlFor="phone" className={formLabelClass}>Phone number</label>
              <input id="phone" type="tel" name="phone" placeholder="Your phone or WhatsApp number" autoComplete="tel" className={formInputClass} />
              <FieldError errors={validationError.phone} />
            </div>

            <div className="mt-6">
              <label htmlFor="message" className={formLabelClass}>Message <span className="text-[#9e1f32]">*</span></label>
              <textarea id="message" rows={7} name="message" placeholder="How can the parish team help?" className={formInputClass} required />
              <FieldError errors={validationError.message} />
            </div>

            {submissionStatus === 'success' && <p className="mt-7 border border-[#527052] bg-[#edf5ea] px-5 py-4 text-sm font-medium text-[#244224]" role="status">Your message has been sent to the parish office. Thank you—we will respond using the contact details you provided.</p>}
            {submissionStatus === 'error' && <p className="mt-7 border border-[#b75966] bg-[#fff0f2] px-5 py-4 text-sm font-medium text-[#7f1728]" role="alert">Your message could not be sent. Please try again, or email stflavius9@gmail.com directly.</p>}

            <div className="mt-8"><SubmitButton buttonText="Send message" /></div>
          </form>
        </div>
      </section>
    </main>
  );
}
