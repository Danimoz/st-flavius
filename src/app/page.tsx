import Hero from '@/components/Hero'
import { Lato } from 'next/font/google'
import Homily from '@/images/homily.jpeg';
import Bible from '@/images/bible.jpg';
import Eucharist from '@/images/eucharist.jpg';
import Image from 'next/image';
import Link from 'next/link';

const lato = Lato({ 
  subsets: ['latin'],
  weight: ['400', '700'] 
})


export default function Home() {
  const resources = [
    { img: Homily, text: 'Daily Homilies', link: 'https://frenimabasimacjoemsp.podbean.com/' },
    { img: Bible, text: 'Daily Readings', link: 'https://universalis.com/mass.htm' }
  ]

  return (
    <main>
      <Hero />
      <section className='relative z-10 p-8 -mt-24 w-full'>
        <div className="grid grid-cols-1 md:grid-cols-2 p-8 container mx-auto shadow-2xl rounded-3xl bg-white">
          <div className='w-full'>
            <h1 className='text-3xl font-semibold'>Holy Sacrifice of the Mass</h1>
            <div className={`${lato.className} text-[#333232] mb-8`}>
              <p className='text-[#D94C12] font-bold mt-2 leading-relaxed text-2xl'>MASS SCHEDULE</p>
              <p className='mt-2 leading-relaxed text-xl'>
                <span className='font-bold'>SUNDAY: &nbsp;</span>
                7:00 AM | 9:00 AM (Children and Youth Mass) | 10:30 AM | 6:00 PM
              </p>
              <p className='mt-2 leading-relaxed text-xl'><span className='font-bold'>MON, WED, THUR, FRI: &nbsp;</span>6:30 AM | 6:30 PM </p>
              <p className='mt-2 leading-relaxed text-xl'><span className='font-bold'>TUESDAY: &nbsp;</span>6:30 AM </p>
              <p className='mt-2 leading-relaxed text-xl'><span className='font-bold'>SATURDAY: &nbsp;</span>7:00 AM </p>
            </div>

            <h1 className='text-3xl font-semibold'>Adoration</h1>
            <div className={`${lato.className} text-[#333232] mb-8`}>
              <p className='text-[#D94C12] font-bold mt-2 leading-relaxed text-2xl'>ADORATION SCHEDULE</p>
              <p className='mt-2 leading-relaxed text-xl'>Every Last Friday of the Month</p>
            </div>

            <h1 className='text-3xl font-semibold'>Office Hours</h1>
            <div className={`${lato.className} text-[#333232] mb-8`}>
              <p className='text-[#D94C12] font-bold mt-2 leading-relaxed text-2xl'>OFFICE HOUR SCHEDULE</p>
              <p className='mt-2 leading-relaxed text-xl'><span className='font-bold'>MON, TUE, WED, FRI: &nbsp;</span> 9AM - 2PM </p>
              <p className='text-[#D94C12] font-bold mt-2 leading-relaxed text-2xl'>DAYS WITH THE PARISH PRIEST</p>
              <p className='mt-2 leading-relaxed text-xl'><span className='font-bold'>TUE, WED, FRI: &nbsp;</span> 9AM - 12PM </p>
            </div>
          </div>

          <div className='w-full'>
            <h1 className='text-3xl font-semibold'>Sacrament of Penance and Reconciliation</h1>
            <div className={`${lato.className} text-[#333232] mb-8`}>
              <p className='text-[#D94C12] font-bold mt-2 leading-relaxed text-2xl'>CONFESSION SCHEDULE</p>
              <p className='mt-2 leading-relaxed text-xl'><span className='font-bold'>WEDNESDAYS & SATURDAYS: &nbsp;</span>After the Morning Mass</p>
            </div>
            <h1 className='text-3xl font-semibold'>Sacrament of Initiation</h1>
            <div className={`${lato.className} text-[#333232] mb-8`}>
              <p className='text-[#D94C12] font-bold mt-2 leading-relaxed text-2xl'>BAPTISM SCHEDULE</p>
              <p className='mt-2 leading-relaxed text-xl'><span className='font-bold'>INFANT BAPTISM: &nbsp;</span>Every Second Saturday of the Month</p>
            </div>
            <h1 className='text-3xl font-semibold'>Catechesim Classes</h1>
            <div className={`${lato.className} text-[#333232] mb-8`}>
              <p className='text-[#D94C12] font-bold mt-2 leading-relaxed text-2xl'>CATECHISM CLASS SCHEDULE</p>
              <p className='mt-2 leading-relaxed text-xl'><span className='font-bold'>BAPTISM | HOLY COMMUNION | PRAYER CLASS: &nbsp;</span> SATURDAYS 3PM - 5PM </p>
              <p className='mt-2 leading-relaxed text-xl'><span className='font-bold'>CONFIRMATION | RCIA: &nbsp;</span> SUNDAYS 3PM - 5PM </p>
            </div>
          </div>
        </div> 
      </section>

      <section className='container mx-auto py-12 mt-4'>
        <h1 className='text-center text-4xl font-bold'>Connections</h1>
        <p className={`${lato.className} text-center text-xl mb-8 italic`}>Resources for the daily walk of faith.</p>
        <div className='flex flex-col md:flex-row space-y-6 md:space-x-12 md:space-y-0 items-center justify-center'>
          {resources.map((resource) => (
            <Link target='_blank' href={resource.link} key={resource.text} className='group rounded-xl relative hover:text-white hover:bg-[#e7a837]'>
              <Image src={resource.img} alt={resource.text} width={350} height={306} className='rounded-xl transition-transform duration-300 hover:scale-105 hover:opacity-20'/>
              <p className='absolute bottom-0 left-0 right-0 text-center text-[#333232] group-hover:text-white group-hover:text-2xl text-xl px-6 font-bold'>{resource.text}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className='bg-gradient-to-r from-[#847561] to-[#cdc2b6] py-12 text-white'>
        <div className='container mx-auto'>
          <h1 className='text-3xl md:text-5xl mb-4 text-center leading-loose tracking-widest'><span className='font-bold '>S.F.C.C</span>... &nbsp; &nbsp; &nbsp; ST. FLAVIUS CATHOLIC CHURCH</h1>
          <p className='text-2xl text-center leading-relaxed tracking-wide'><span className='font-semibold'>COMMUNITY OF GOD&apos;S PEOPLE: </span>UNITED IN HEART AND SOUL</p>
        </div>
      </section>

      <section className='py-12 container mx-auto flex flex-col md:flex-row space-y-6 md:space-x-12 items-center'>
        <Image src={Eucharist} alt='Eucharist' className='rounded-[50%]' />
        <div>
          <h1 className='font-black text-3xl text-center mb-4 leading-relaxed'>Our Mission</h1>
          <p className={`${lato.className} text-2xl mb-10 text-center`}>Preaching the Gospel While Practicing the Corporal Works of Mercy</p>
          <h1 className='font-black text-3xl text-center mb-4 leading-relaxed'>Our Vision</h1>
          <p className={`${lato.className} text-2xl mb-6 text-center`}>Win Souls for Christ and build a community rooted in Faith and Love</p>
        </div>
      </section>
    </main>
  )
}
