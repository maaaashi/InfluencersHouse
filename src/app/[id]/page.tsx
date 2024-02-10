'use client'

import { House } from '@/domain/house'
import { supabase } from '@/lib/SupabaseClient'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FaArrowCircleRight } from 'react-icons/fa'

interface Params {
  id: string
}

export default function Page({ params }: { params: Params }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [house, setHouse] = useState<House | null>(null)

  const getHouseById = async () => {
    const response = await fetch(`/api/houses/${params.id}`)
    const { house } = await response.json()

    setIsLoading(false)

    if (!house) return

    setHouse(
      House.create({
        ...house,
        event_date: new Date(house.event_date),
      })
    )
  }
  useEffect(() => {
    getHouseById()
  }, [])

  const moveToRegisterPage = () => {
    router.push(`/${params.id}/register`)
  }

  if (isLoading) {
    return <span className='loading loading-ring loading-lg'></span>
  } else if (!house) {
    return (
      <div className='flex flex-col items-center gap-5'>
        あなたは招待されたお客様ではありません。
        <img
          src='https://http.cat/images/404.jpg'
          alt='インフルエンサーズハウス'
        />
      </div>
    )
  } else {
    return (
      <div className='flex flex-col items-center gap-5'>
        おめでとうございます。
        <span className='font-bold'>ハウス名: {house.name}</span>
        にあなたは招待されました。
        <img src={house.thumbnail} alt='インフルエンサーズハウス' />
        <button className='btn w-52' onClick={moveToRegisterPage}>
          次へ
          <FaArrowCircleRight />
        </button>
      </div>
    )
  }
}
