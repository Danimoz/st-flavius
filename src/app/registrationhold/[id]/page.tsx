import { getParishioner }from "@/libs/fetch"
import { notFound } from "next/navigation"
import CardImage from "./CardImage"
import PageHero from "@/components/PageHero"

export default async function CardDetails(props: { params: Promise<{ id: string }>}) {
  const params = await props.params;
  const result = await getParishioner(params.id)
  if (!result) {
    return notFound()
  }

  return (
    <main className="bg-[#f1eeea] text-[#211d19]">
      <PageHero eyebrow="Parish membership" title="Your membership card." description="Keep this record and present it when requesting parish services." compact />
      <section className="px-6 py-14 lg:px-10 lg:py-20">
        <CardImage parishioner={result.parishioner} />
      </section>
    </main>
  )
}
