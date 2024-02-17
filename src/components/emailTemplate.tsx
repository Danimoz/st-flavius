import { FC } from "react";
import { Tailwind } from "@react-email/components";

interface EmailTemplateProps {
  name: string;
  phone: string;
  email: string;
  message: string;
}

export const EmailTemplate: FC<Readonly<EmailTemplateProps>> = ({ name, email, phone, message }) => (
  <Tailwind>
    <div className="bg-gray-800 p-3">
      <h1 className="text-xl font-bold text-white">St. Flavius Catholic Church</h1>
    </div>

    <div className="p-4">
      <h2 className="text-lg font-bold">New Message from St. Flavius Catholic Church Website</h2>
      <p className="text-lg font-semibold">Name: {name}</p>
      <p className="text-lg font-semibold">Email: {email}</p>
      <p className="text-lg font-semibold">Phone: {phone}</p>
      <p className="text-lg font-semibold">Message: {message}</p>
    </div>
  </Tailwind>  
);