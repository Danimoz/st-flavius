import getParishioner from "@/libs/fetch"
import { notFound } from "next/navigation"
import CardImage from "./CardImage"

export default async function CardDetails({ params }: { params: { id: string }}) {
  const result = await getParishioner(params.id)
  if (!result) {
    return notFound()
  }

  return (
    <main className="h-screen flex justify-center items-center p-6">
      <CardImage parishioner={result.parishioner} />
    </main>
  )
}