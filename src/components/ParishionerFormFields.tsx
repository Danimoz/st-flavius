import type { ParishionerRegistrationErrors } from '@/libs/validations';
import type { IParishioner } from '@/types';
import { FieldError, formInputClass, formLabelClass } from './FormField';

export default function ParishionerFormFields({ errors, defaultValues = {} }: { errors: ParishionerRegistrationErrors; defaultValues?: Partial<IParishioner> }) {
  function errorProps(name: keyof ParishionerRegistrationErrors) {
    return {
      'aria-invalid': Boolean(errors[name]?.length),
      'aria-describedby': errors[name]?.length ? `${name}-error` : undefined,
    };
  }

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className={formLabelClass}>First name <span className="text-[#9e1f32]">*</span></label>
          <input id="firstName" type="text" placeholder="First name" name="firstName" autoComplete="given-name" defaultValue={defaultValues.firstName} maxLength={100} {...errorProps('firstName')} className={formInputClass} required />
          <FieldError id="firstName-error" errors={errors.firstName} />
        </div>
        <div>
          <label htmlFor="lastName" className={formLabelClass}>Last name <span className="text-[#9e1f32]">*</span></label>
          <input id="lastName" type="text" placeholder="Last name" name="lastName" autoComplete="family-name" defaultValue={defaultValues.lastName} maxLength={100} {...errorProps('lastName')} className={formInputClass} required />
          <FieldError id="lastName-error" errors={errors.lastName} />
        </div>
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="dateOfBirth" className={formLabelClass}>Date of birth <span className="text-[#9e1f32]">*</span></label>
          <input id="dateOfBirth" type="date" name="dateOfBirth" autoComplete="bday" defaultValue={defaultValues.dateOfBirth} {...errorProps('dateOfBirth')} className={formInputClass} required />
          <FieldError id="dateOfBirth-error" errors={errors.dateOfBirth} />
        </div>
        <div>
          <label htmlFor="occupation" className={formLabelClass}>Occupation <span className="text-[#9e1f32]">*</span></label>
          <input id="occupation" type="text" placeholder="Occupation" name="occupation" defaultValue={defaultValues.occupation} {...errorProps('occupation')} className={formInputClass} required />
          <FieldError id="occupation-error" errors={errors.occupation} />
        </div>
      </div>

      <div className="mt-6">
        <label htmlFor="address" className={formLabelClass}>Address <span className="text-[#9e1f32]">*</span></label>
        <input id="address" type="text" placeholder="Home address" name="address" autoComplete="street-address" defaultValue={defaultValues.address} maxLength={255} {...errorProps('address')} className={formInputClass} required />
        <FieldError id="address-error" errors={errors.address} />
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className={formLabelClass}>Email address</label>
          <input id="email" type="email" placeholder="you@example.com" name="email" autoComplete="email" defaultValue={defaultValues.email} {...errorProps('email')} className={formInputClass} />
          <FieldError id="email-error" errors={errors.email} />
        </div>
        <div>
          <label htmlFor="phone" className={formLabelClass}>Phone number</label>
          <input id="phone" type="tel" placeholder="Phone or WhatsApp number" name="phone" autoComplete="tel" defaultValue={defaultValues.phone} {...errorProps('phone')} className={formInputClass} />
          <FieldError id="phone-error" errors={errors.phone} />
        </div>
      </div>

      <p className="mt-3 text-sm leading-6 text-[#6f6254]">Provide at least an email address or a phone number.</p>

      <fieldset className="mt-9 border-t border-[#d8cdbd] pt-7">
        <legend className="font-ecclesial text-2xl text-[#211d19]">Sacramental record</legend>
        <p className="mt-2 text-sm leading-6 text-[#6f6254]">Select every sacrament or status that applies.</p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {([
            ['baptized', 'Baptized'],
            ['communicant', 'First Eucharist / Communion'],
            ['confirmed', 'Confirmed'],
            ['married', 'Wedded in the Church'],
          ] as const).map(([name, label]) => (
            <label key={name} className="flex min-h-[52px] cursor-pointer items-center gap-3 border border-[#d8cdbd] bg-white px-4 py-3 has-[:checked]:border-[#6f2633] has-[:checked]:bg-[#f8eef0]">
              <input type="checkbox" name={name} defaultChecked={defaultValues[name]} className="h-5 w-5 accent-[#6f2633]" />
              <span className="text-sm font-semibold text-[#342d27]">{label}</span>
            </label>
          ))}
        </div>
      </fieldset>
    </>
  );
}
