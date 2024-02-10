import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

export const metadata: Metadata = {
  title: 'インフルエンサーズハウス',
  description: 'インフルエンサーズハウス',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='ja' data-theme='light'>
      <body className='min-h-screen bg-stone-200 text-stone-700 flex flex-col overflow-hidden'>
        <header className='p-4 border-stone-300 border-b-2'>
          <h1 className='font-bold text-lg'>インフルエンサーズハウス</h1>
        </header>
        {children}
      </body>
    </html>
  )
}
