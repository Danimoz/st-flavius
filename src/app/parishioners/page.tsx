import { allParishioners } from "@/libs/actions"
import { Lato } from "next/font/google";
import { Suspense } from "react";
import ParishionersSearch from "./search";
import Link from "next/link";

const lato = Lato({ 
  subsets: ['latin'],
  weight: ['400', '700'] 
})

export default async function ViewParishioners({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined}}){
  const page = typeof searchParams.page === 'string' ? Number(searchParams.page) : 1
  const limit = typeof searchParams.limit === 'string' ? Number(searchParams.limit) : 30
  const search = typeof searchParams.search === 'string' ? searchParams.search : undefined

  const {data: parishioners, totalItems} = await allParishioners(page, limit, search);
  return (
    <main>
      <section className="bg-[#847561] py-8">
        <div className="container mx-auto">
          <h1 className="italic text-white text-4xl md:text-6xl">Parishioners</h1>
        </div>
      </section>

      <ParishionersSearch search={search} />

      <Suspense fallback='Parishioner Loading..'>
        <section className={`${lato.className} container mx-auto overflow-x-auto`}>
          {parishioners?.map((parishioner, idx) => (
            <div key={idx} className="text-xl p-2 flex space-x-6 border-b-2">
              <h2>{parishioner.parishionerId}</h2>
              <h2>{parishioner.firstName} {parishioner.lastName}</h2>
              <h2>{parishioner.email} &nbsp; {parishioner.phoneNumber}</h2>
              <h2>{parishioner.address}</h2>
              <h2>{parishioner.occupation}</h2>
              <h2>{parishioner.dateOfBirth}</h2>
              <h2>{parishioner.baptized === true ? 'Baptized' : 'Not Baptized'}</h2>
              <h2>{parishioner.confirmed === true ? 'Confirmed' : 'Not Confirmed'}</h2>
              <h2>{parishioner.communicant === true ? 'Communicant': 'Not a Communicant'}</h2>
            </div>
          ))}

          <div className="flex justify-center space-x-6 my-6">
            <Link
              href={{ pathname: '/parishioners', query: {
                ...(search ? { search } : {}),
                page: page > 1 ? page - 1 : 1
              }}} 
              className={`rounded-xl px-6 py-3 bg-[#847561] text-white ${page <= 1 && 'pointer-events-none opacity-50' } `}
            >
              Previous
            </Link>
            <Link
              href={{ pathname: '/parishioners', query: {
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