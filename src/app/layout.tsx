import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Toaster } from 'sonner'

const geomanist = localFont({
  src: '../../public/fonts/Geomanist-Regular.woff2',
  display: 'swap'
})

export const metadata: Metadata = {
  title: 'St. Flavius Catholic Church Oworonshoki',
  description: "Join our vibrant Catholic community at St. Flavius Catholic Church. Discover our Mass schedules, ministries, sacraments, and upcoming events. All are welcome!",
  alternates: { canonical: "https://stflaviusoworonshoki.com" }
}

export default function RootLayout({ children, }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={geomanist.className}>
        <Toaster position="top-right" richColors closeButton />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
