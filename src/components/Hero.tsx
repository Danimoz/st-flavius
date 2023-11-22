'use client';

import Slide1 from '@/images/hero1.jpg'
import Slide2 from '@/images/hero2.jpg'
import Image, { StaticImageData } from 'next/image';
import { useEffect, useState } from 'react';
import { Lato } from 'next/font/google'

const lato = Lato({ 
  subsets: ['latin'],
  weight: '700' 
})

interface Slide {
  image: StaticImageData;
  text: string;
}

const slides: Slide[] = [
  {
    image: Slide1,
    text: 'Welcome to St. Flavius Catholic Church!',
  },
  {
    image: Slide2,
    text: 'Join us for worship and community events.',
  },
]

export default function Hero(){
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide === slides.length - 1 ? 0: prevSlide + 1))
    }, 6543);

    return () => clearInterval(interval)
  }, [])

  return (
    <section className={`relative h-[75vh] ${lato.className}`}>
      <Image src={slides[currentSlide].image} alt='Slideshow' className='opacity-40 h-[75vh]' fill priority style={{ objectFit: 'cover' }} quality={100} />
      <div className='absolute top-0 left-0 w-full h-full flex items-center justify-center'>
        <h1 className='text-[#333232] text-center px-2 text-5xl md:text-8xl font-black'>{slides[currentSlide].text}</h1>
      </div>
    </section>
  )
}