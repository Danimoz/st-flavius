'use client';

import ParishionerFormFields from '@/components/ParishionerFormFields';
import { SubmitButton } from '@/components/SubmitButton';
import { newParishioner } from '@/libs/actions';
import Loader from '@/libs/loader';
import { ParishionerRegistrationErrors, ParishionerRegistrationSchema, REGISTRATION_FEE_KOBO } from '@/libs/validations';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function RegistrationForm({ totalParishioners }: { totalParishioners: number }) {
  const [validationError, setValidationError] = useState<ParishionerRegistrationErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function action(data: FormData) {
    const validated = ParishionerRegistrationSchema.safeParse(Object.fromEntries(data));
    if (!validated.success) {
      setValidationError(validated.error.flatten().fieldErrors);
      return;
    }

    // @ts-ignore Paystack injects this browser API from its hosted script.
    const handler = PaystackPop.setup({
      key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY as string,
      email: data.get('email') as string || data.get('phone') as string + '@stflaviusoworonshoki.com',
      amount: REGISTRATION_FEE_KOBO,
      currency: 'NGN',
      ref: new Date().getTime().toString(),
      callback: function (response: any) {
        setIsLoading(true);
        // Verification happens server-side; the browser never sees the Paystack secret key.
        newParishioner(data, response.reference).then((res: any) => {
          setIsLoading(false);
          if (res.success) {
            router.push('/registrationhold/' + res.parishionerId);
          } else {
            alert(res.error || 'Payment complete, but there was an error saving your details. Please contact the parish office.');
          }
        });
      },
      onClose: function () {
        alert('Transaction was not completed.');
      },
    });
    handler.openIframe();
  }

  return (
    <section className="px-6 py-14 lg:px-10 lg:py-20">
      <div className="mx-auto grid max-w-6xl items-start gap-10 lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="border-l-2 border-[#c9a760] pl-6 lg:sticky lg:top-28">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#6f2633]">Parish register</p>
          <h2 className="mt-3 font-ecclesial text-3xl">A record of belonging.</h2>
          <p className="mt-4 text-sm leading-6 text-[#6f6254]">Registration helps the parish keep accurate records and care for members through the sacramental life of the Church.</p>
          <p className="mt-7 border-t border-[#d8cdbd] pt-5 text-sm text-[#4f453b]"><strong className="block font-ecclesial text-3xl text-[#6f2633]">{totalParishioners}</strong> parishioners registered</p>
        </aside>

        <form action={action} className="border border-[#d8cdbd] bg-[#fffdf9] p-6 shadow-[0_18px_50px_rgba(55,43,30,0.08)] sm:p-9">
          <div className="mb-8 border-b border-[#d8cdbd] pb-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#6f2633]">Membership details</p>
            <h2 className="mt-3 font-ecclesial text-3xl sm:text-4xl">Parishioner registration</h2>
            <p className="mt-3 text-sm leading-6 text-[#6f6254]">Fields marked with an asterisk are required.</p>
          </div>

          {isLoading && <div className="mb-6 flex justify-center" aria-live="polite"><Loader /></div>}
          <ParishionerFormFields errors={validationError} />
          <div className="mt-9 flex justify-end border-t border-[#d8cdbd] pt-7"><SubmitButton buttonText="Proceed to payment" /></div>
          <script src="https://js.paystack.co/v1/inline.js" async />
        </form>
      </div>
    </section>
  );
}
