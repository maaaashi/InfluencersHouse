'use client'
import { useShowData } from '@/hooks/useShowData'
import Image from 'next/image'
import React from 'react'

export const LP = () => {
  const [textToShow] = useShowData('インフルエンサーズハウスへようこそ')
  return (
    <div className='p-4 flex flex-col gap-14'>
      <section>
        <h2 className='font-bold text-2xl h-14'>{textToShow}</h2>
        <div className='flex flex-col-reverse md:flex-row gap-4 lg:justify-evenly'>
          <p className='w-full md:w-96 self-start md:self-end'>
            インフルエンサーズハウスは、新しい創造を生み出したい人に向けた、インフルエンサー同士をつなげるプラットフォームです。
            これは、思いがけないコラボレーションを生みだすための場所です。コミュニティに参加することと違い、適切な人同士を少人数でマッチさせることで、新しい体験を生み出すことができます。
          </p>
          <div className='animate-slideInUp'>
            <Image src='/LP_Image.webp' alt='' width={500} height={500} />
          </div>
        </div>
      </section>
      <section>
        <h2 className='font-bold text-2xl h-14'>
          インフルエンサーズ ディナーとは？
        </h2>
        <div className='flex flex-col md:flex-row gap-4 lg:justify-evenly'>
          <div className='animate-slideInUp'>
            <Image src='/LP_Image.webp' alt='' width={500} height={500} />
          </div>
          <p className='w-full md:w-96 self-start md:self-end'>
            インフルエンサーズディナーの説明。インフルエンサーズディナーの説明。インフルエンサーズディナーの説明。インフルエンサーズディナーの説明。インフルエンサーズディナーの説明。インフルエンサーズディナーの説明。
          </p>
        </div>
      </section>
    </div>
  )
}
