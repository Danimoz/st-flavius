import Link from "next/link";
import { FaLocationDot } from "react-icons/fa6";

export default function Footer(){
  const year = new Date().getFullYear(); 
  return (
    <footer className="py-12 text-white bg-gradient-to-r from-[#847561] to-[#cdc2b6]">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-around space-x-12">
          <h1 className="font-black text-4xl">Saint Flavius Catholic Church</h1>
          <div>
            <h1 className="font-bold text-3xl mb-2">Address</h1>
            <p className="text-xl flex gap-x-3 items-center"><FaLocationDot size={30} />2, Akerele Street, Oworonshoki Lagos</p>
          </div>
          <div>
            <h1 className="font-bold text-3xl">Connect</h1>
            <p className="text-xl">Email: <Link href='mailto:stflavius9@gmail.com'>stflavius9@gmail.com</Link></p>
          </div>
        </div>
        <p className="text-xl mt-6 text-center">Copyright © {year} All rights reserved</p>
      </div>
    </footer>
  )
}