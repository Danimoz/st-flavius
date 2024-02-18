import mcjoe from '@/images/mcjoe.jpeg';
import tobias from '@/images/toby.jpg'
import kenneth from '@/images/ken.jpg'
import paul from '@/images/paul.jpg';
import Image from 'next/image';

const staffs = [
  {img: mcjoe, name: 'Fr. EnimAbasi MacJoe Akpan, MSP', designation: 'Parish Priest'},
  {img: tobias, name: 'Fr. Tobias Nwafor', designation: 'Priest in Residence'},
  {img: kenneth, name: 'Mr. Kenneth Unamba', designation: 'Administrative Secretary'},
  {img: paul, name: 'Mr. Paul Azubuine', designation: 'Parish Catechist'},
]


export default function Team(){
  return (
    <main>
      <section className="py-12 bg-[#847561]">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-6xl italic text-white">Our Team</h1>
        </div>
      </section>
      <section className='py-12 container mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-2 md:space-x-6 p-2'>
          {staffs.map((staff) => (
            <div key={staff.name} className='md:flex items-center space-x-9 mb-6'>
              <Image src={staff.img} alt={staff.name} className='rounded-full shadow-lg w-[300px] h-[400px]' width={300} height={300} />
              <div className='my-4'>
                <h1 className='text-2xl leading-9 font-semibold hover:text-[#847561]'>{staff.name}</h1>
                <p className='text-[#847561] text-base mt-4'>{staff.designation}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}