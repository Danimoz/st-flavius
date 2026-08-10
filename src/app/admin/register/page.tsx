'use client';

import PageHero from '@/components/PageHero';
import ParishionerFormFields from '@/components/ParishionerFormFields';
import { SubmitButton } from '@/components/SubmitButton';
import { newParishioner } from '@/libs/actions';
import { ParishionerRegistrationErrors, ParishionerRegistrationSchema } from '@/libs/validations';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function CashRegistration() {
  const [validationError, setValidationError] = useState<ParishionerRegistrationErrors>({});
  const router = useRouter();

  async function action(data: FormData) {
    const validated = ParishionerRegistrationSchema.safeParse(Object.fromEntries(data));
    if (!validated.success) {
      setValidationError(validated.error.flatten().fieldErrors);
      return;
    }

    const result = await newParishioner(data);
    if (result.success) {
      alert('The parishioner has been registered.');
      router.push('/registrationhold/' + result.parishionerId);
    } else {
      alert('There was an error saving these details. Please try again.');
    }
  }

  return (
    <main className="bg-[#f1eeea] text-[#211d19]">
      <PageHero eyebrow="Parish administration" title="Register a parishioner." description="Add an in-person registration to the parish record." compact />
      <section className="px-6 py-14 lg:px-10 lg:py-20">
        <form action={action} className="mx-auto max-w-4xl border border-[#d8cdbd] bg-[#fffdf9] p-6 shadow-[0_18px_50px_rgba(55,43,30,0.08)] sm:p-10">
          <div className="mb-8 border-b border-[#d8cdbd] pb-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#6f2633]">Office registration</p>
            <h2 className="mt-3 font-ecclesial text-3xl sm:text-4xl">Membership details</h2>
            <p className="mt-3 text-sm leading-6 text-[#6f6254]">Fields marked with an asterisk are required.</p>
          </div>
          <ParishionerFormFields errors={validationError} />
          <div className="mt-9 flex justify-end border-t border-[#d8cdbd] pt-7"><SubmitButton buttonText="Register parishioner" /></div>
        </form>
      </section>
    </main>
  );
}
