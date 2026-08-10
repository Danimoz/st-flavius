'use client';

import {
  faultCategories,
  faultLocations,
  faultRoles,
  faultSeverities,
  safetyRisks,
} from '@/libs/validations';
import { useActionState, useEffect, useRef, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { FaCamera, FaCheck, FaFileVideo, FaTrashCan, FaTriangleExclamation } from 'react-icons/fa6';
import { initialFaultReportState, submitFaultReport } from './actions';

const inputClass = 'mt-2 min-h-12 w-full border border-[#b9aa96] bg-white px-4 py-3 text-[#211d19] outline-none transition-colors placeholder:text-[#8a7b69] focus:border-[#6f2633] focus:ring-2 focus:ring-[#6f2633]/20';
const labelClass = 'text-sm font-semibold text-[#342d27]';

type Preview = {
  file: File;
  url: string;
};

function FieldError({ errors }: { errors?: string[] }) {
  if (!errors?.length) return null;
  return <p className="mt-2 text-sm font-medium text-[#9e1f32]" role="alert">{errors.join(' ')}</p>;
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex min-h-14 w-full items-center justify-center bg-[#6f2633] px-8 py-4 text-base font-bold text-white transition-colors hover:bg-[#4c1822] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6f2633] disabled:cursor-wait disabled:opacity-70 sm:w-auto"
    >
      {pending ? 'Delivering report…' : 'Send fault report'}
    </button>
  );
}

function SectionHeading({ number, title, note }: { number: string; title: string; note: string }) {
  return (
    <div className="mb-8 flex items-start gap-4 border-b border-[#d8cdbd] pb-6">
      <span aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-t-full bg-[#211d19] font-ecclesial text-[#e3c77f]">{number}</span>
      <div>
        <h2 className="font-ecclesial text-2xl text-[#211d19] sm:text-3xl">{title}</h2>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-[#6f6254]">{note}</p>
      </div>
    </div>
  );
}

export default function FaultReportForm() {
  const [state, formAction] = useActionState(submitFaultReport, initialFaultReportState);
  const [previews, setPreviews] = useState<Preview[]>([]);
  const [clientFileError, setClientFileError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => () => {
    previews.forEach((preview) => URL.revokeObjectURL(preview.url));
  }, [previews]);

  function updateFiles(files: File[]) {
    const accepted = files.slice(0, 3);
    const tooLarge = accepted.find((file) => file.size > 10 * 1024 * 1024);
    setClientFileError(
      files.length > 3
        ? 'Choose no more than 3 files.'
        : tooLarge
          ? `${tooLarge.name} is larger than 10 MB.`
          : '',
    );

    setPreviews(accepted.map((file) => ({ file, url: URL.createObjectURL(file) })));

    if (fileInputRef.current) {
      const transfer = new DataTransfer();
      accepted.forEach((file) => transfer.items.add(file));
      fileInputRef.current.files = transfer.files;
    }
  }

  function removeFile(index: number) {
    updateFiles(previews.filter((_, previewIndex) => previewIndex !== index).map((preview) => preview.file));
  }

  const errors = state.errors;

  if (state.status === 'success') {
    return (
      <section className="border border-[#527052] bg-[#edf5ea] px-6 py-12 text-center text-[#244224] sm:px-10">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#527052]">
          <FaCheck aria-hidden="true" size={22} />
        </span>
        <h2 className="mt-6 font-ecclesial text-3xl">Report delivered</h2>
        <p className="mx-auto mt-3 max-w-xl leading-7">{state.message}</p>
        <a href="/fault-reporting" className="mt-7 inline-flex min-h-11 items-center justify-center border border-[#527052] px-5 py-3 text-sm font-semibold hover:bg-[#527052] hover:text-white">
          Submit another report
        </a>
      </section>
    );
  }

  return (
    <form action={formAction} className="space-y-7">
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <section id="reporter" className="border border-[#d8cdbd] bg-[#fffdf9] p-6 shadow-[0_14px_38px_rgba(55,43,30,0.07)] sm:p-9">
        <SectionHeading number="I" title="Reporter information" note="These details help the parish maintenance team contact you for clarification or an update." />
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className={labelClass} htmlFor="fullName">Full name <span className="text-[#9e1f32]">*</span></label>
            <input className={inputClass} id="fullName" name="fullName" autoComplete="name" placeholder="Your first and last name" required />
            <FieldError errors={errors?.fullName} />
          </div>
          <div>
            <label className={labelClass} htmlFor="phone">Phone number <span className="text-[#9e1f32]">*</span></label>
            <input className={inputClass} id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="WhatsApp preferred" required />
            <FieldError errors={errors?.phone} />
          </div>
          <div>
            <label className={labelClass} htmlFor="role">Role / affiliation <span className="text-[#9e1f32]">*</span></label>
            <select className={inputClass} id="role" name="role" defaultValue="" required>
              <option value="" disabled>Select one</option>
              {faultRoles.map((role) => <option key={role}>{role}</option>)}
            </select>
            <FieldError errors={errors?.role} />
          </div>
          <div>
            <label className={labelClass} htmlFor="organisation">Society / organisation name <span className="font-normal text-[#6f6254]">(optional)</span></label>
            <input className={inputClass} id="organisation" name="organisation" placeholder="e.g. CWO, CMO, CYON, Choir" />
            <FieldError errors={errors?.organisation} />
          </div>
        </div>
      </section>

      <section id="location" className="border border-[#d8cdbd] bg-[#fffdf9] p-6 shadow-[0_14px_38px_rgba(55,43,30,0.07)] sm:p-9">
        <SectionHeading number="II" title="Location & asset" note="Tell us where the problem is and what equipment or part of the building is affected." />
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className={labelClass} htmlFor="observedAt">Date &amp; time observed <span className="text-[#9e1f32]">*</span></label>
            <input className={inputClass} id="observedAt" name="observedAt" type="datetime-local" required />
            <FieldError errors={errors?.observedAt} />
          </div>
          <div>
            <label className={labelClass} htmlFor="location">Fault location <span className="text-[#9e1f32]">*</span></label>
            <select className={inputClass} id="location" name="location" defaultValue="" required>
              <option value="" disabled>Select the area</option>
              {faultLocations.map((location) => <option key={location}>{location}</option>)}
            </select>
            <FieldError errors={errors?.location} />
          </div>
          <div>
            <label className={labelClass} htmlFor="category">Category of fault <span className="text-[#9e1f32]">*</span></label>
            <select className={inputClass} id="category" name="category" defaultValue="" required>
              <option value="" disabled>Select a category</option>
              {faultCategories.map((category) => <option key={category}>{category}</option>)}
            </select>
            <FieldError errors={errors?.category} />
          </div>
          <div>
            <label className={labelClass} htmlFor="equipment">Specific equipment / item <span className="font-normal text-[#6f6254]">(optional)</span></label>
            <input className={inputClass} id="equipment" name="equipment" placeholder="e.g. Altar wireless mic 2" />
            <FieldError errors={errors?.equipment} />
          </div>
        </div>
      </section>

      <section id="details" className="border border-[#d8cdbd] bg-[#fffdf9] p-6 shadow-[0_14px_38px_rgba(55,43,30,0.07)] sm:p-9">
        <SectionHeading number="III" title="Description & urgency" note="Describe what you observed and help us understand how quickly the fault needs attention." />
        <div className="space-y-6">
          <div>
            <label className={labelClass} htmlFor="briefSummary">Brief summary <span className="text-[#9e1f32]">*</span></label>
            <input className={inputClass} id="briefSummary" name="briefSummary" maxLength={160} placeholder="e.g. Roof leak above the choir gallery" required />
            <FieldError errors={errors?.briefSummary} />
          </div>
          <div>
            <label className={labelClass} htmlFor="description">Detailed fault description <span className="text-[#9e1f32]">*</span></label>
            <textarea className={inputClass} id="description" name="description" rows={6} maxLength={4000} placeholder="What went wrong? Include any noise, smell, spark, leak, or when the problem first started." required />
            <FieldError errors={errors?.description} />
          </div>

          <fieldset>
            <legend className={labelClass}>Severity / urgency level <span className="text-[#9e1f32]">*</span></legend>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              {faultSeverities.map((severity) => (
                <label key={severity} className="flex cursor-pointer items-start gap-3 border border-[#d8cdbd] bg-white p-4 has-[:checked]:border-[#6f2633] has-[:checked]:bg-[#f8eef0]">
                  <input className="mt-1 h-4 w-4 accent-[#6f2633]" type="radio" name="severity" value={severity} required />
                  <span>
                    <span className="block font-semibold text-[#342d27]">{severity}</span>
                    <span className="mt-1 block text-sm leading-5 text-[#6f6254]">
                      {severity === 'Low' && 'Minor; parish worship and operations can continue.'}
                      {severity === 'Medium' && 'Needs attention before the next major Mass or event.'}
                      {severity === 'High' && 'Disrupting Masses, meetings, or parish activities.'}
                      {severity === 'Critical / Urgent' && 'Immediate safety hazard, fire threat, or major power failure.'}
                    </span>
                  </span>
                </label>
              ))}
            </div>
            <FieldError errors={errors?.severity} />
          </fieldset>

          <fieldset>
            <legend className={labelClass}>Immediate safety risk present? <span className="text-[#9e1f32]">*</span></legend>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              {safetyRisks.map((risk) => (
                <label key={risk} className="flex cursor-pointer items-center gap-3 border border-[#d8cdbd] bg-white px-4 py-3 has-[:checked]:border-[#6f2633] has-[:checked]:bg-[#f8eef0]">
                  <input className="h-4 w-4 accent-[#6f2633]" type="checkbox" name="safetyRisks" value={risk} />
                  <span className="text-sm font-medium text-[#342d27]">{risk}</span>
                </label>
              ))}
            </div>
            <FieldError errors={errors?.safetyRisks} />
          </fieldset>
        </div>
      </section>

      <section id="evidence" className="border border-[#d8cdbd] bg-[#fffdf9] p-6 shadow-[0_14px_38px_rgba(55,43,30,0.07)] sm:p-9">
        <SectionHeading number="IV" title="Photo / video evidence" note="Evidence is optional, but a clear photo can help the team assess the fault before arriving." />
        <label htmlFor="evidence" className="flex cursor-pointer flex-col items-center justify-center border border-dashed border-[#8a7b69] bg-[#faf7f1] px-6 py-10 text-center transition-colors hover:border-[#6f2633] hover:bg-[#f8eef0] focus-within:border-[#6f2633] focus-within:ring-2 focus-within:ring-[#6f2633]/20">
          <FaCamera aria-hidden="true" className="mb-4 text-[#6f2633]" size={30} />
          <span className="font-semibold text-[#342d27]">Choose up to 3 photos or short videos</span>
          <span className="mt-2 text-sm text-[#6f6254]">JPG, PNG, WebP, HEIC, MP4, MOV, or WebM · 10 MB each</span>
          <input
            ref={fileInputRef}
            id="evidence"
            name="evidence"
            type="file"
            accept="image/jpeg,image/png,image/webp,image/heic,image/heif,video/mp4,video/quicktime,video/webm"
            multiple
            className="sr-only"
            onChange={(event) => updateFiles(Array.from(event.currentTarget.files || []))}
          />
        </label>

        {previews.length > 0 && (
          <ul className="mt-5 grid gap-4 sm:grid-cols-3" aria-label="Selected evidence">
            {previews.map((preview, index) => (
              <li key={`${preview.file.name}-${preview.file.lastModified}`} className="relative overflow-hidden border border-[#d8cdbd] bg-white">
                {preview.file.type.startsWith('image/') ? (
                  // Blob previews are local-only and do not need Next Image optimisation.
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={preview.url} alt="" className="h-32 w-full object-cover" />
                ) : (
                  <div className="flex h-32 items-center justify-center bg-[#211d19] text-[#e3c77f]"><FaFileVideo aria-hidden="true" size={30} /></div>
                )}
                <div className="flex items-center justify-between gap-2 p-3">
                  <span className="min-w-0 truncate text-xs text-[#4e443a]">{preview.file.name}</span>
                  <button type="button" onClick={() => removeFile(index)} className="shrink-0 p-2 text-[#6f2633] hover:bg-[#f8eef0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#6f2633]" aria-label={`Remove ${preview.file.name}`}>
                    <FaTrashCan aria-hidden="true" size={13} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
        {clientFileError && <p className="mt-3 text-sm font-medium text-[#9e1f32]" role="alert">{clientFileError}</p>}
        <FieldError errors={errors?.evidence} />
      </section>

      {state.status === 'error' && (
        <div
          className="flex items-start gap-3 border border-[#b75966] bg-[#fff0f2] px-5 py-4 text-[#7f1728]"
          role="alert"
          aria-live="polite"
        >
          <FaTriangleExclamation aria-hidden="true" className="mt-1 shrink-0" />
          <p className="font-medium leading-6">{state.message}</p>
        </div>
      )}

      <div className="flex flex-col items-start justify-between gap-5 border-t border-[#d8cdbd] pt-7 sm:flex-row sm:items-center">
        <p className="max-w-xl text-sm leading-6 text-[#6f6254]">
          By submitting, you confirm that the report is accurate to the best of your knowledge. Please do not approach exposed wires, fire, or unstable structures.
        </p>
        <SubmitButton />
      </div>
    </form>
  );
}
