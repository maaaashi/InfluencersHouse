'use client'
import { activationUserByIdAndToken, getUserById } from '@/lib/user'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

export default function Page() {
  const [userId, setUserId] = useState('')
  const [isError, setIsError] = useState('')
  const navigate = useRouter()

  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const login = async () => {
    if (!token) {
      setIsError('トークンがありません')
      return
    }

    const user = await getUserById(userId)
    if (!user) {
      setIsError('ユーザーが見つかりません')
      return
    }

    const response = await fetch(
      `/api/users/${user.id}/activate?token=${token}`
    )
    if (response.status !== 200) {
      setIsError('認証に失敗しました')
      return
    }

    setIsError('')
    setUserId('')
    navigate.push('/admin/dashboard')
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <section className='rounded-xl shadow-lg p-8 m-4 w-full max-w-xs sm:max-w-md bg-white mx-auto px-4'>
        <div className='text-lg mb-4'>管理者ログイン</div>
        <div className='mb-4'>
          <label className='block text-sm font-medium text-gray-700'>
            ユーザーID
          </label>
          <input
            type='text'
            className='mt-1 block w-full border-gray-300 shadow-sm input input-bordered sm:text-sm'
          />
        </div>
        <button className='btn btn-primary' onClick={login}>
          登録
        </button>
      </section>
    </div>
  )
}
