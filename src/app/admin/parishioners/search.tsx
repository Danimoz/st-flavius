'use client'

import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { FaSearch } from "react-icons/fa"
import { useDebounce } from "use-debounce"

export default function ParishionersSearch({ search }: { search?: string}) {
  const router = useRouter()
  const [searchText, setSearchText] = useState(search)

  const initialRender = useRef(true)
  const [query] = useDebounce(searchText, 750)
  
  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false
      return
    }

    if (!query) router.push('/admin/parishioners')
    else router.push(`/admin/parishioners?search=${query}`)
  }, [query])

  return (
    <div className="relative container mx-auto my-8 rounded-lg shadow-lg">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
        <FaSearch size={20} />
      </div>
      <input 
        placeholder="Search ..." 
        className="w-full rounded-xl p-3 pl-12"
        value={searchText}
        onChange={e => setSearchText(e.target.value)}
      />
    </div>
  )
}