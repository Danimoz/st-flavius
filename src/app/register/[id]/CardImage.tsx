'use client';

import { IParishioner } from "@/types";
import { toPng } from "html-to-image";
import { useRef } from "react";

export default function CardImage({ parishioner }: { parishioner: IParishioner }) {
  const elementRef = useRef<HTMLDivElement>(null);

  const convertToImage = () => {
    toPng(elementRef.current as HTMLDivElement, { cacheBust: false})
      .then(function (dataUrl) {
        const link = document.createElement('a');
        link.download = 'st-flavius-membershipcard.png';
        link.href = dataUrl;
        link.click();
      }).catch(function (error) {
        console.error('Error converting HTML to image:', error);
      });
  };

  const getExpiryDate = (date: Date) => {
    const expiryDate = new Date(date.getFullYear() + 5, date.getMonth(), date.getDate());
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    //@ts-expect-error
    return expiryDate.toLocaleDateString('default', options);
  };

  return (
    <> 
      <div ref={elementRef} className="rounded-xl bg-white shadow-xl w-full flex flex-col p-6 border-t-2 border-gray-600">
        <h2 className="uppercase font-bold text-2xl mb-4 text-center">Membership Card</h2>
        <p className="font-semibold"> Expires on: {getExpiryDate(parishioner.createdAt as Date)}</p>
        <p className="text-xl mt-6 leading-loose mb-2"><span className="font-bold uppercase">Name: </span>{parishioner.firstName} {parishioner.lastName}</p>          
        <p className="text-xl leading-loose mb-2"><span className="font-bold uppercase">Occupation: </span>{parishioner.occupation}</p>          
        <p className="text-xl leading-loose mb-2"><span className="font-bold uppercase">ParishionerID: </span>{parishioner.parishionerId}</p>          
        <p className="text-xl leading-loose mb-2"><span className="font-bold uppercase">Email: </span>{parishioner.email}</p>          
        <p className="text-xl leading-loose mb-2"><span className="font-bold uppercase">Phone: </span>{parishioner.phoneNumber}</p>          
        <br /><br />
        <p>
          The above named person is a registered member of the church and is entitled to the following benefits.
          <ul className="list-disc pl-6">
            <li>Sharing in the benefits of holy Massess offerred annually for the intentions of all parishioners</li>
            <li>To request from this Parish, Infant Baptism, Coinfessions, Marriage, Burial</li>
          </ul>
          Please bring this card to St. Flavius Catholic Church when requesting any service. Thank you
        </p>

        <div className="flex justify-center">
          <button onClick={convertToImage} className="mt-6 px-6 py-3 bg-amber-600 text-white">Download Card</button>
        </div>
      </div>

      
    </>

  )
}