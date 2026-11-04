'use client';

import ParishionerFormFields from '@/components/ParishionerFormFields';
import { updateParishionerByAdmin } from '@/libs/actions';
import type { ParishionerRegistrationErrors } from '@/libs/validations';
import type { IParishioner } from '@/types';
import Link from 'next/link';
import { useEffect, useRef, useState, useTransition, type FormEvent } from 'react';

export default function EditParishionerForm({ id, details }: { id: string; details: IParishioner }) {
  const [errors, setErrors] = useState<ParishionerRegistrationErrors>({});
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);
  const [pending, startTransition] = useTransition();
  const errorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (error) errorRef.current?.focus();
  }, [error, errors]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    const data = new FormData(event.currentTarget);
    setError('');
    setErrors({});
    setSaved(false);

    startTransition(async () => {
      try {
        const result = await updateParishionerByAdmin(id, data);
        if (result.success) {
          setSaved(true);
        } else {
          setErrors(result.fieldErrors ?? {});
          setError(result.error ?? 'The details could not be saved. Please try again.');
        }
      } catch {
        setError('We could not save your changes. Check your connection and try again.');
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} onChange={() => setSaved(false)} aria-busy={pending} className="mx-auto max-w-4xl border border-[#d8cdbd] bg-[#fffdf9] p-6 shadow-[0_18px_50px_rgba(55,43,30,0.08)] sm:p-10">
      <div className="mb-8 border-b border-[#d8cdbd] pb-6">
        <Link href="/admin/parishioners" className="inline-flex min-h-11 items-center text-sm font-semibold text-[#6f2633] underline decoration-[#c9a760] underline-offset-4 hover:text-[#4c1822] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6f2633]">Back to parishioner register</Link>
        <h2 className="mt-3 font-ecclesial text-3xl sm:text-4xl">{details.firstName} {details.lastName}</h2>
        <p className="mt-2 text-sm text-[#6f6254]">Parishioner ID: <strong className="tabular-nums text-[#342d27]">{details.parishionerId}</strong></p>
        <p className="mt-3 text-sm leading-6 text-[#6f6254]">Fields marked with an asterisk are required.</p>
      </div>

      <fieldset disabled={pending}>
        <legend className="sr-only">Parishioner details</legend>
        <ParishionerFormFields errors={errors} defaultValues={details} />
      </fieldset>

      {error && (
        <div ref={errorRef} tabIndex={-1} role="alert" className="mt-7 border border-[#b75966] bg-[#fff0f2] px-5 py-4 text-sm font-medium leading-6 text-[#7f1728] focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-[#6f2633]">
          {error}
        </div>
      )}
      <div role="status" aria-live="polite" aria-atomic="true">
        {saved && <p className="mt-7 border border-[#527052] bg-[#edf5ea] px-5 py-4 text-sm font-medium leading-6 text-[#244224]">Changes saved. The parish register and membership card now show the updated details.</p>}
      </div>

      <div className="mt-9 flex flex-col-reverse gap-3 border-t border-[#d8cdbd] pt-7 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/admin/parishioners" className="inline-flex min-h-12 items-center justify-center border border-[#6f2633] px-6 py-3 font-semibold text-[#6f2633] hover:bg-[#f8eef0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6f2633]">{saved ? 'Return to register' : 'Cancel'}</Link>
        <button type="submit" disabled={pending} className="btn-press inline-flex min-h-12 items-center justify-center bg-[#6f2633] px-8 py-3 font-semibold text-white hover:bg-[#4c1822] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6f2633] disabled:cursor-wait disabled:opacity-70">{pending ? 'Saving changes…' : 'Save changes'}</button>
      </div>
    </form>
  );
}
