'use client'
 
import Loader from '@/libs/loader';
import { useFormStatus } from 'react-dom'
 
interface SubmitButtonProps {
  buttonText: string;
}

export function SubmitButton({ buttonText }: SubmitButtonProps) {
  const { pending } = useFormStatus()
 
  return (
    <button type="submit" disabled={pending} aria-disabled={pending} className='btn-press inline-flex min-h-12 items-center justify-center bg-[#6f2633] px-8 py-3 font-semibold text-white hover:bg-[#4c1822] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6f2633] disabled:cursor-wait disabled:opacity-70'>
      {pending? <Loader /> : buttonText}
    </button>
  )
}
