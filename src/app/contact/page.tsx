'use client';

import Image from "next/image";
import contactPrayer from '@/images/contactprayer.jpg'
import ask from '@/images/question.jpg'
import { SubmitButton } from "@/components/SubmitButton";
import { handleContact } from "@/libs/actions";
import { useState } from "react";
import { ContactFormErrors } from "@/libs/validations";

export default function Contact(){
  const [validationError, setValidationError] = useState<ContactFormErrors>({})

  async function action(data: FormData){
    const result = await handleContact(data)
    if (result && result.error.fieldErrors) setValidationError(result.error.fieldErrors);
  }

  return (
    <main>
      <section className="relative h-[60vh]">
        <Image src={contactPrayer} alt='People Praying' className='h-[60vh]' style={{ objectFit: 'cover' }} quality={100} fill priority />

        <div className='absolute top-0 left-0 w-full h-full flex items-center justify-center'>
          <h1 className="text-white text-4xl md:text-7xl font-black">Contact Us</h1>
        </div>
      </section>

      <section className="py-12 container mx-auto flex flex-col justify-around items-center md:flex-row gap-x-6">
        <div>
          <h2 className="text-4xl font-bold mb-6">Contact Information</h2>
          <h4 className="font-bold text-2xl leading-relaxed">Address</h4>
          <p className="text-xl">2, Akerele Street Oworonshoki Lagos</p>
        </div>

        <div className="">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1981.877675555534!2d3.4011965388192835!3d6.552540498360125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8d43f803a28b%3A0xcd8742791e86e7f6!2sSt.%20Flavius%20Catholic%20Church!5e0!3m2!1sen!2sng!4v1700304377121!5m2!1sen!2sng" 
            className="rounded-2xl w-full md:w-[600px] h-full md:h-[450px] shadow"
            loading="lazy"
          />
        </div>
      </section>

      <section className="container mx-auto flex flex-col gap-y-6 md:gap-y-0 md:flex-row px-3 justify-around items-center py-12">
        <Image src={ask} alt='Ask Quesions' className='rounded-2xl shadow-md' width={560} height={200} />

        <form action={action}>
          <h1 className="text-4xl md:text-6xl font-black mb-4">Ask a Question</h1>
          <p className="text-xl leading-relaxed mb-6">If you have any questions, you can contact us. Please fill out the form below.</p>

          <div className="mb-6">
            <label htmlFor="name" className="block font-bold">Name</label>
            <input type='text' placeholder="Enter your name" name="name" className="p-3 w-full border-2 border-[#847561] rounded-xl" required />
            <p className="text-red-600">{validationError?.name?.join(', ')}</p>
          </div>

          <div className="mb-6">
            <label htmlFor="email" className="block font-bold">Email</label>
            <input type='email' name="email" placeholder='Enter your email' className="p-3 w-full border-2 border-[#847561] rounded-xl" />
            <p aria-live='polite' className="text-red-600">{validationError?.email?.join(', ')}</p>
          </div>

          <div className="mb-6">
            <label htmlFor="phone" className="block font-bold">Phone Number</label>
            <input type='text' name="phone" placeholder='Enter your Phone Number' className="p-3 w-full border-2 border-[#847561] rounded-xl" />
            <p className="text-red-600">{validationError?.phone?.join(', ')}</p>
          </div>

          <div className="mb-6">
            <label htmlFor="message" className="block font-bold">Message</label>
            <textarea rows={6} name='message' className="p-3 w-full border-2 border-[#847561] rounded-xl" required aria-required/>
            <p className="text-red-600">{validationError?.message?.join(', ')}</p>
          </div>

          <SubmitButton buttonText="Send Message"/>
        </form>
      </section>
    </main>
  )
}