'use client';

import { SubmitButton } from "@/components/SubmitButton";
import { newParishioner } from "@/libs/actions";
import { ParishionerRegistrationErrors, ParishionerRegistrationSchema } from "@/libs/validations";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { set } from "mongoose";
import Loader from "@/libs/loader";

export default function Registration(){
  const [validationError, setValidationError] = useState<ParishionerRegistrationErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter()

  async function action(data: FormData) {
    const validata = ParishionerRegistrationSchema.safeParse(Object.fromEntries(data)) 
    if (!validata.success) {
      setValidationError(validata.error.flatten().fieldErrors)
      return
    }

    //@ts-ignore
    const handler = PaystackPop.setup({
      key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY as string,
      email: data.get('email') as string || data.get('phone') as string + "@stflaviusoworonshoki.com",
      amount: 1000 * 100,
      currency: 'NGN',
      ref: (new Date()).getTime().toString(),
      callback: function(response: any) {
        const reference = response.reference;
        fetch('https://api.paystack.co/transaction/verify/'+ reference, {
          headers: {
            Authorization: "Bearer " + process.env.NEXT_PUBLIC_PAYSTACK_SECRET_KEY as string
          }
        }).then((res: any) => res.json()).then((json: any) => {
          if(json.status === true){
            setIsLoading(true);
            newParishioner(data).then((res: any) => {
              if(res.success) {
                alert('Payment complete! You have been Registered')
                router.push('/register/' + res.parishionerId)
                setIsLoading(false);
              } else alert('Payment complete! You have been Registered but there was an error sending your details to the server. Please contact the admin');
            })
          }
        })
      },
      onClose: function() {
        alert('Transaction was not completed, window closed.');
      },   
    });
    handler.openIframe();
  }

  return (
    <main>
      <section className="py-12 bg-[#847561]">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-6xl italic text-white">Become a Member</h1>
        </div>
      </section>
      <section className="container mx-auto py-12 px-2">
        <h1>Registration</h1>

        <div className="flex justify-center">
          {isLoading && <Loader />}
        </div>

        <form action={action} >
          <div className="md:flex md:space-x-6">
            <div className="mb-4 w-full">
              <label htmlFor='firstName' className="block font-semibold">First Name *</label>
              <input type='text' placeholder="Enter your First Name" name="firstName" className="p-3 w-full border-2 border-[#847561] rounded-xl" required />
              <p className="text-red-600">{validationError?.firstName?.join(', ')}</p>

            </div>
            <div className="mb-4 w-full">
              <label htmlFor='lastName' className="block font-semibold">Last Name *</label>
              <input type='text' placeholder="Enter your Last Name" name="lastName" className="p-3 w-full border-2 border-[#847561] rounded-xl" required />
              <p className="text-red-600">{validationError?.lastName?.join(', ')}</p>

            </div>
          </div>
          <div className="mb-4 w-full">
            <label htmlFor='dateOfBirth' className="block font-semibold">Date of Birth *</label>
            <input type='date' placeholder="Enter your Date of Birth" name="dateOfBirth" className="p-3 w-full border-2 border-[#847561] rounded-xl" required />
            <p className="text-red-600">{validationError?.dateOfBirth?.join(', ')}</p>
          </div>
          <div className="mb-4 w-full">
            <label htmlFor='address' className="block font-semibold">Address *</label>
            <input type='text' placeholder="Enter your Address" name="address" className="p-3 w-full border-2 border-[#847561] rounded-xl" required />
            <p className="text-red-600">{validationError?.address?.join(', ')}</p>
          </div>
          <div className="mb-4 w-full">
            <label htmlFor='occupation' className="block font-semibold">Occupation</label>
            <input type='text' placeholder="Enter your Occupation" name="occupation" className="p-3 w-full border-2 border-[#847561] rounded-xl"  />
            <p className="text-red-600">{validationError?.occupation?.join(', ')}</p>
          </div>
          <div className="md:flex md:space-x-6">
            <div className="mb-4 w-full">
              <label htmlFor='email' className="block font-semibold">Email</label>
              <input type='email' placeholder="Enter your Email" name="email" className="p-3 w-full border-2 border-[#847561] rounded-xl" />
              <p className="text-red-600">{validationError?.email?.join(', ')}</p>
            </div>
            <div className="mb-4 w-full">
              <label htmlFor='phone' className="block font-semibold">Phone Number</label>
              <input type='text' placeholder="Enter your Phone Number" name="phone" className="p-3 w-full border-2 border-[#847561] rounded-xl"  />
              <p className="text-red-600">{validationError?.phone?.join(', ')}</p>
            </div>
          </div>
          <div className="md:flex justify-around space-x-8">
            <div className="flex mb-4 justify-center space-x-4">
              <input type="checkbox" name="baptized" className="p-3 h-6 w-6 border-2 border-[#847561] rounded-xl"/>
              <label htmlFor='baptized' className="font-semibold">Baptized</label>
            </div>
            <div className="flex mb-4 justify-center space-x-4">
              <input type="checkbox" name="confirmed" className="p-3 h-6 w-6 border-2 border-[#847561] rounded-xl"/>
              <label htmlFor='confirmed' className="font-semibold">Confirmation</label>
            </div>
            <div className="flex mb-4 justify-center space-x-4">
              <input type="checkbox" name="communicant" className="p-3 h-6 w-6 border-2 border-[#847561] rounded-xl"/>
              <label htmlFor='communicant' className="font-semibold">First Eucharist/Communion</label>
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <SubmitButton buttonText="Proceed to Payment"/>
          </div>
          
          <script src="https://js.paystack.co/v1/inline.js" defer />
        </form>
      </section>
    </main>
  )
}