import { allParishioners } from "@/libs/actions"
import { Lato } from "next/font/google";
import { Suspense } from "react";
import ParishionersSearch from "./search";
import Link from "next/link";
import { type Metadata } from "next";
import Password from "../password";

const lato = Lato({ 
  subsets: ['latin'],
  weight: ['400', '700'] 
})

export const metadata: Metadata = {
  robots: { index: false, follow: false }
}

export default async function ViewParishioners({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined}}){
  const page = typeof searchParams.page === 'string' ? Number(searchParams.page) : 1
  const limit = typeof searchParams.limit === 'string' ? Number(searchParams.limit) : 40
  const search = typeof searchParams.search === 'string' ? searchParams.search : undefined

  const {data: parishioners, totalItems} = await allParishioners(page, limit, search);
  return (
    <main>
      <Password />
      <section className="bg-[#847561] py-8">
        <div className="container mx-auto">
          <h1 className="italic text-white text-4xl md:text-6xl">Parishioners</h1>
        </div>
      </section>

      <ParishionersSearch search={search} />

      <Suspense fallback='Parishioners Loading..'>
        <section className={`${lato.className} container mx-auto overflow-x-auto`}>
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">ID</th>
              <th className="p-2">Name</th>
              <th className="p-2">Contact</th>
              <th className="p-2">Address</th>
              <th className="p-2">Occupation</th>
              <th className="p-2">Date of Birth</th>
              <th className="p-2">Baptized</th>
              <th className="p-2">Confirmed</th>
              <th className="p-2">Communicant</th>
              <th className="p-2">Married</th>
            </tr>
          </thead>
          <tbody>
            {parishioners?.map((parishioner, idx) => (
              <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="p-2">{parishioner.parishionerId}</td>
                <td className="p-2">{parishioner.firstName} {parishioner.lastName}</td>
                <td className="p-2">{parishioner.email} &nbsp; {parishioner.phone}</td>
                <td className="p-2">{parishioner.address}</td>
                <td className="p-2">{parishioner.occupation}</td>
                <td className="p-2">{parishioner.dateOfBirth}</td>
                <td className="p-2">{parishioner.baptized ? 'Baptized' : 'Not Baptized'}</td>
                <td className="p-2">{parishioner.confirmed ? 'Confirmed' : 'Not Confirmed'}</td>
                <td className="p-2">{parishioner.communicant ? 'Communicant': 'Not a Communicant'}</td>
                <td className="p-2">{parishioner.married ? 'Married' : 'Not Married'}</td>
              </tr>
            ))}
          </tbody>
        </table>

          <div className="flex justify-center space-x-6 my-6">
            <Link
              href={{ pathname: '/admin/parishioners', query: {
                ...(search ? { search } : {}),
                page: page > 1 ? page - 1 : 1
              }}} 
              className={`rounded-xl px-6 py-3 bg-[#847561] text-white ${page <= 1 && 'pointer-events-none opacity-50' } `}
            >
              Previous
            </Link>
            <Link
              href={{ pathname: '/admin/parishioners', query: {
                ...(search ? { search } : {}),
                page: page < Math.ceil(totalItems/limit) ? page + 1 : Math.ceil(totalItems/limit)
              }}} 
              className={`rounded-xl px-6 py-3 bg-[#847561] text-white ${page === (Math.ceil(totalItems/limit)) && 'pointer-events-none opacity-50'} `}
            >
              Next
            </Link>
          </div>
        </section>
      </Suspense>
    </main>
  )
}