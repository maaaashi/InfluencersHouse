'use client'
import Image from 'next/image'
import React from 'react'
import { Shippori_Mincho } from 'next/font/google'

const ShipporiMincho = Shippori_Mincho({
  weight: '400',
  subsets: ['latin'],
})

export const LP = () => {
  return (
    <div
      className={`${ShipporiMincho.className} p-4 flex flex-col items-center gap-10`}
    >
      <section className='w-full flex flex-col gap-5 items-center'>
        <h2 className='font-bold text-2xl min-h-14'>
          インフルエンサーズハウスへようこそ
        </h2>
        <div className='w-full md:w-[500px] font-bold flex items-center flex-col'>
          <p>インフルエンサーズハウスは、</p>
          <p>新しい創造を生み出したい人に向けた、</p>
          <p>インフルエンサー同士をつなげるプラットフォームです。</p>
        </div>
      </section>

      <Image
        src='/InfluencersConnect.webp'
        alt=''
        width={500}
        height={500}
        priority
      />

      <p className='animate-slideInUp'>
        インフルエンサーたちを集めるのはインフルエンサーである必要はない
      </p>

      <section className='w-screen flex flex-col gap-5 items-center bg-stone-300 py-6'>
        <h2 className='font-bold text-2xl min-h-14'>
          インフルエンサーズ ディナーとは？
        </h2>
        <Image src='/jon.jpg' alt='' width={200} height={200} priority />
        <div className='w-full md:w-[500px] font-bold flex items-center flex-col'>
          <p>
            Influencers Dinnerは、Jon
            Levyによって10年以上前に始められた革新的なコンセプトで、様々な業界のリーダーを集め、つながりとコミュニティを育むことを目的としています。このユニークなディナー体験では、異なる分野からの12人のゲストがプライベートディナーのために集まります。これらのディナーを特別なものにしているのは、出席者が食事中に自分の職業について話すことが許されないことです。代わりに、このイベントは共同調理と、参加者が個人の話や交流に基づいて互いの職業を推測するゲームを通じて、個人的なつながりを築くことに焦点を当てています。この形式は、食事後に他の参加者の印象的な実績を学ぶときの驚きとともに、本物のつながりを促進します
          </p>
        </div>
      </section>

      <section className='w-full flex flex-col gap-5 items-center'>
        <h2 className='font-bold text-2xl min-h-14'>
          インフルエンサーズハウスができること
        </h2>
        <Image
          src='/InfluencersHouse.svg'
          alt=''
          width={500}
          height={500}
          priority
        />
        <div className='w-full md:w-[500px] font-bold flex items-center flex-col'>
          <p>
            インフルエンサーズハウスでは、インフルエンサーズディナーを簡単に誰でも開催できるようになります。
          </p>
        </div>
      </section>
    </div>
  )
}
