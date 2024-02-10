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
  const [isHouse, setHouse] = useState<House | null>(null)

  const getHouseById = async () => {
    const response = await fetch(`/api/houses/${params.id}`)
    const { house } = await response.json()
    setIsLoading(false)
    setHouse(house)
  }
  useEffect(() => {
    getHouseById()
  }, [])

  const moveToRegisterPage = () => {
    router.push(`/${params.id}/register`)
  }

  if (isLoading) {
    return <span className='loading loading-ring loading-lg'></span>
  } else if (!isHouse) {
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
        おめでとうございます。 あなたは招待されました。
        <img
          src='https://images.dog.ceo/breeds/schnauzer-miniature/n02097047_5989.jpg'
          alt='インフルエンサーズハウス'
        />
        <button className='btn w-52' onClick={moveToRegisterPage}>
          入力へ進む
          <FaArrowCircleRight />
        </button>
      </div>
    )
  }
}
