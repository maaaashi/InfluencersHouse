'use client'

import { useRouter } from 'next/navigation'
import { FaArrowCircleRight } from 'react-icons/fa'

export default function Page({ params }) {
  const router = useRouter()

  const moveToHouse = () => {
    router.push(`/${params.id}/house`)
  }

  return (
    <div className='flex flex-col items-center gap-4'>
      <div>
        <label className='form-control w-full px-4'>
          <div className='label'>
            <span className='label-text'>名前</span>
          </div>
          <input type='text' className='input input-bordered w-full max-w-xs' />
        </label>
        <label className='form-control w-full px-4'>
          <div className='label'>
            <span className='label-text'>メールアドレス</span>
          </div>
          <input type='text' className='input input-bordered w-full max-w-xs' />
        </label>
        <label className='form-control w-full px-4'>
          <div className='label'>
            <span className='label-text'>SNS</span>
          </div>
          <input type='text' className='input input-bordered w-full max-w-xs' />
        </label>
        <label className='form-control w-full px-4'>
          <div className='label'>
            <span className='label-text'>実績</span>
          </div>
          <textarea className='textarea textarea-bordered h-24'></textarea>
        </label>
        <label className='form-control w-full px-4'>
          <div className='label'>
            <span className='label-text'>
              1. あなたが相手に提供できるものはなんですか？
            </span>
          </div>
          <textarea className='textarea textarea-bordered h-24'></textarea>
        </label>
        <label className='form-control w-full px-4'>
          <div className='label'>
            <span className='label-text'>
              2. あなたはどんな人を紹介できますか？
            </span>
          </div>
          <textarea className='textarea textarea-bordered h-24'></textarea>
        </label>
        <label className='form-control w-full px-4'>
          <div className='label'>
            <span className='label-text'>
              3. あなたはどんな人と繋がりたいですか？
            </span>
          </div>
          <textarea className='textarea textarea-bordered h-24'></textarea>
        </label>
      </div>
      <button className='btn w-52' onClick={moveToHouse}>
        登録
        <FaArrowCircleRight />
      </button>
    </div>
  )
}
