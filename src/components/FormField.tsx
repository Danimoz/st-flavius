export const formInputClass = 'mt-2 min-h-12 w-full border border-[#b9aa96] bg-white px-4 py-3 text-[#211d19] outline-none transition-colors placeholder:text-[#6f6254] focus:border-[#6f2633] focus:ring-2 focus:ring-[#6f2633]/20';
export const formLabelClass = 'text-sm font-semibold text-[#342d27]';

export function FieldError({ errors }: { errors?: string[] }) {
  if (!errors?.length) return null;
  return <p className="mt-2 text-sm font-medium text-[#9e1f32]" role="alert">{errors.join(' ')}</p>;
}
