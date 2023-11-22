'use client'
 
import Loader from '@/libs/loader';
import { useFormStatus } from 'react-dom'
 
interface SubmitButtonProps {
  buttonText: string;
}

export function SubmitButton({ buttonText }: SubmitButtonProps) {
  const { pending } = useFormStatus()
 
  return (
    <button type="submit" aria-disabled={pending} className='px-8 py-4 rounded-xl bg-[#847561] hover:bg-[#4E3D31] text-white text-xl'>
      {pending? <Loader /> : buttonText}
    </button>
  )
}