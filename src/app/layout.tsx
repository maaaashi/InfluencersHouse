import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import RecoilRoot from '@/components/RecoilRoot'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'インフルエンサーズハウス',
  description: 'インフルエンサーズハウス',
  openGraph: {
    title: 'インフルエンサーズハウス',
    url: 'https://influencers-house.mss-rep.com/',
    siteName: 'インフルエンサーズハウス',
    locale: 'ja_JP',
    type: 'website',
    images: '/InfluencersHouse.svg',
  },
  twitter: {
    card: 'summary_large_image',
    images: '/InfluencersHouse.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='ja' data-theme='light'>
      <body className='min-h-screen h-screen bg-stone-200 text-stone-700 flex flex-col overflow-hidden'>
        <RecoilRoot>
          <header className='px-4 py-2 border-stone-300 border-b-2'>
            <h1 className='font-bold text-lg flex items-center gap-2'>
              <div className='avatar'>
                <div className='w-10 rounded-full'>
                  <Image src='/logo.svg' alt='' width={30} height={30} />
                </div>
              </div>
              <span>インフルエンサーズハウス</span>
            </h1>
          </header>
          <div className='flex-1 overflow-y-auto'>{children}</div>
        </RecoilRoot>
      </body>
    </html>
  )
}
