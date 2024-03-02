import { Metadata } from "next";
import Link from "next/link";
import Password from "./password";

export const metadata: Metadata = {
  robots: { index: false, follow: false }
}

export default function AdminPage(){
  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-center mt-12">Admin Dashboard</h1>
      
      <Password />

      <div className="flex justify-center space-x-4 mt-8">
        <Link href="/admin/register" className="bg-[#847561] text-white p-4 rounded-lg">Register</Link>
        <Link href="/admin/parishioners" className="bg-[#847561] text-white p-4 rounded-lg">Parishioners</Link>
      </div>
    </main>
  )
}