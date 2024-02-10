'use client'
import { useShowData } from '@/hooks/useShowData'
import Image from 'next/image'
import React from 'react'

export const LP = () => {
  const [textToShow] = useShowData(
    'インフルエンサーズハウスは、新しい創造を生み出したい人に向けた、インフルエンサー同士をつなげるプラットフォームです。  これは、思いがけないコラボレーションを生みだすための場所です。コミュニティに参加することと違い、適切な人同士を少人数でマッチさせることで、新しい体験を生み出すことができます。'
  )
  return (
    <div className='px-4 flex flex-col gap-4'>
      <h2 className='font-bold text-2xl'>インフルエンサーズハウス</h2>
      <div className='flex flex-col-reverse md:flex-row gap-4'>
        <p className='w-full md:w-96 self-start md:self-end'>{textToShow}</p>
        <div className='animate-slideInUp'>
          <Image src='/LP_Image.webp' alt='' width={500} height={500} />
        </div>
      </div>
    </div>
  )
}
