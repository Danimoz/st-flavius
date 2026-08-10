import type { ParishionerRegistrationErrors } from '@/libs/validations';

const inputClass = 'mt-2 min-h-12 w-full border border-[#b9aa96] bg-white px-4 py-3 text-[#211d19] outline-none transition-colors placeholder:text-[#8a7b69] focus:border-[#6f2633] focus:ring-2 focus:ring-[#6f2633]/20';
const labelClass = 'text-sm font-semibold text-[#342d27]';

function FieldError({ errors }: { errors?: string[] }) {
  if (!errors?.length) return null;
  return <p className="mt-2 text-sm font-medium text-[#9e1f32]" role="alert">{errors.join(', ')}</p>;
}

export default function ParishionerFormFields({ errors }: { errors: ParishionerRegistrationErrors }) {
  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className={labelClass}>First name <span className="text-[#9e1f32]">*</span></label>
          <input id="firstName" type="text" placeholder="First name" name="firstName" autoComplete="given-name" className={inputClass} required />
          <FieldError errors={errors.firstName} />
        </div>
        <div>
          <label htmlFor="lastName" className={labelClass}>Last name <span className="text-[#9e1f32]">*</span></label>
          <input id="lastName" type="text" placeholder="Last name" name="lastName" autoComplete="family-name" className={inputClass} required />
          <FieldError errors={errors.lastName} />
        </div>
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="dateOfBirth" className={labelClass}>Date of birth <span className="text-[#9e1f32]">*</span></label>
          <input id="dateOfBirth" type="date" name="dateOfBirth" autoComplete="bday" className={inputClass} required />
          <FieldError errors={errors.dateOfBirth} />
        </div>
        <div>
          <label htmlFor="occupation" className={labelClass}>Occupation <span className="text-[#9e1f32]">*</span></label>
          <input id="occupation" type="text" placeholder="Occupation" name="occupation" className={inputClass} required />
          <FieldError errors={errors.occupation} />
        </div>
      </div>

      <div className="mt-6">
        <label htmlFor="address" className={labelClass}>Address <span className="text-[#9e1f32]">*</span></label>
        <input id="address" type="text" placeholder="Home address" name="address" autoComplete="street-address" className={inputClass} required />
        <FieldError errors={errors.address} />
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className={labelClass}>Email address</label>
          <input id="email" type="email" placeholder="you@example.com" name="email" autoComplete="email" className={inputClass} />
          <FieldError errors={errors.email} />
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>Phone number</label>
          <input id="phone" type="tel" placeholder="Phone or WhatsApp number" name="phone" autoComplete="tel" className={inputClass} />
          <FieldError errors={errors.phone} />
        </div>
      </div>

      <fieldset className="mt-9 border-t border-[#d8cdbd] pt-7">
        <legend className="font-ecclesial text-2xl text-[#211d19]">Sacramental record</legend>
        <p className="mt-2 text-sm leading-6 text-[#6f6254]">Select every sacrament or status that applies.</p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {[
            ['baptized', 'Baptized'],
            ['communicant', 'First Eucharist / Communion'],
            ['confirmed', 'Confirmed'],
            ['married', 'Wedded in the Church'],
          ].map(([name, label]) => (
            <label key={name} className="flex min-h-[52px] cursor-pointer items-center gap-3 border border-[#d8cdbd] bg-white px-4 py-3 has-[:checked]:border-[#6f2633] has-[:checked]:bg-[#f8eef0]">
              <input type="checkbox" name={name} className="h-5 w-5 accent-[#6f2633]" />
              <span className="text-sm font-semibold text-[#342d27]">{label}</span>
            </label>
          ))}
        </div>
      </fieldset>
    </>
  );
}
