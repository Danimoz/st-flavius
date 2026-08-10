import PageHero from '@/components/PageHero';
import kenneth from '@/images/ken.jpg';
import mcjoe from '@/images/mcjoe.jpeg';
import paul from '@/images/paul.jpg';
import tobias from '@/images/toby.jpg';
import Image from 'next/image';

const staff = [
  { img: mcjoe, name: 'Fr. EnimAbasi MacJoe Akpan, MSP', designation: 'Parish Priest' },
  { img: tobias, name: 'Fr. Tobias Nwafor', designation: 'Priest in Residence' },
  { img: kenneth, name: 'Mr. Kenneth Unamba', designation: 'Administrative Secretary' },
  { img: paul, name: 'Mr. Paul Azubuine', designation: 'Parish Catechist' },
];

export default function Team() {
  return (
    <main className="bg-[#f1eeea] text-[#211d19]">
      <PageHero
        eyebrow="Those who serve"
        title="Meet the parish team."
        description="Clergy and lay leaders serve together so that worship, formation, and the daily life of the parish can flourish."
      />

      <section className="px-6 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-x-8 gap-y-14 md:grid-cols-2">
            {staff.map((member, index) => (
              <article key={member.name} className="grid gap-6 border-t border-[#c9a760] pt-6 sm:grid-cols-[190px_1fr] sm:items-center">
                <div className="relative aspect-[4/5] overflow-hidden rounded-t-[6rem] bg-[#d8cdbd]">
                  <Image src={member.img} alt={member.name} fill sizes="(min-width: 768px) 190px, 100vw" className="object-cover object-top" priority={index < 2} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#6f2633]">{member.designation}</p>
                  <h2 className="mt-3 font-ecclesial text-3xl leading-tight sm:text-4xl">{member.name}</h2>
                  <div aria-hidden="true" className="mt-6 h-px w-16 bg-[#c9a760]" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
