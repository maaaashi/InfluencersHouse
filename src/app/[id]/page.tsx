'use client'

import { useRouter } from 'next/navigation'
import { FaArrowCircleRight } from 'react-icons/fa'

interface Params {
  id: string
}

export default function Page({ params }: { params: Params }) {
  const router = useRouter()

  const moveToRegisterPage = () => {
    router.push(`/${params.id}/register`)
  }

  return (
    <div className='flex flex-col items-center gap-5'>
      おめでとうございます。 あなたは招待されました。
      <img
        src='https://images.dog.ceo/breeds/schnauzer-miniature/n02097047_5989.jpg'
        alt=''
      />
      <button className='btn w-52' onClick={moveToRegisterPage}>
        入力へ進む
        <FaArrowCircleRight />
      </button>
    </div>
  )
}
