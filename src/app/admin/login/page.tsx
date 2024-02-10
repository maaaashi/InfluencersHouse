'use client'
import { loginAtom } from '@/atoms/loginAtoms'
import { User } from '@/domain/user'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { FaArrowCircleRight } from 'react-icons/fa'
import { useSetRecoilState } from 'recoil'

export default function Page() {
  const [userId, setUserId] = useState('')
  const [isError, setIsError] = useState('')
  const setLogin = useSetRecoilState(loginAtom)
  const navigate = useRouter()

  const login = async () => {
    const token = new URLSearchParams(window.location.search).get('token')
    const response = await fetch(`/api/users/${userId}/activate?token=${token}`)
    if (response.status !== 200) {
      setIsError('認証に失敗しました')
      return
    }

    const json = await response.json()

    setIsError('')
    setUserId('')

    console.log(json.user)
    setLogin(User.create(json.user))
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
          <div className='flex items-center'>
            <input
              type='text'
              name='userId'
              className='mt-1 block w-full border-gray-300 shadow-sm input input-bordered sm:text-sm'
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
            <button className='btn btn-primary' onClick={login}>
              GO
              <FaArrowCircleRight />
            </button>
          </div>
        </div>

        {isError && (
          <div className='text-red-500 mt-4 text-center'>ERROR : {isError}</div>
        )}
      </section>
    </div>
  )
}
