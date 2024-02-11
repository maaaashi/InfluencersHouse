'use client'

import { House } from '@/domain/house'
import { supabase } from '@/lib/SupabaseClient'
import Image from 'next/image'
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
      <div className='flex flex-col items-center gap-5 py-4 container mx-auto'>
        <div>
          <Image src='/invite.svg' alt='hoge' width={10000} height={10000} />
        </div>
        <button className='btn w-52 self-end' onClick={moveToRegisterPage}>
          Next
          <FaArrowCircleRight />
        </button>
      </div>
    )
  }
}
