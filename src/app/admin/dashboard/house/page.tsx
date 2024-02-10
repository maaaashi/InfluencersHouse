'use client'
import { Hissu } from '@/components/form/Hissu'
import { User } from '@/domain/user'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

interface House {
  name: string
  description: string
  place: string
  event_date: string
  owner_id: string
  thumbnail?: FileList
}

export default function Page() {
  const [owners, setOwners] = useState<User[]>([])
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<House>()
  const navigate = useRouter()

  useEffect(() => {
    const fetchOwner = async () => {
      const response = await fetch('/api/users')
      const data = await response.json()
      const users = data.users.map((user: User) => {
        return User.create(user)
      })
      setOwners(users)
    }

    fetchOwner()
  }, [])

  const onSubmit = async (data: House) => {
    await fetch('/api/houses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        house: {
          name: data.name,
          description: data.description,
          place: data.place,
          event_date: data.event_date,
          owner_id: data.owner_id,
          thumbnail: '',
        },
      }),
    })
    reset()
    navigate.push('/admin/dashboard')
  }

  return (
    <div className='flex flex-col items-center justify-center py-12 px-4'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='w-full max-w-lg space-y-6 bg-white shadow-lg rounded-lg p-6 sm:p-8'
      >
        <div>
          <label
            htmlFor='name'
            className='text-sm font-medium text-gray-700 flex'
          >
            ハウス名
            <Hissu />
          </label>
          <input
            {...register('name', { required: true })}
            className='input input-rounded mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50'
          />
          {errors.name && (
            <span className='text-xs text-red-500'>ハウス名は必須です</span>
          )}
        </div>

        <div>
          <label
            htmlFor='description'
            className='flex text-sm font-medium text-gray-700 rows-4'
          >
            概要
            <Hissu />
          </label>
          <textarea
            {...register('description', { required: true })}
            className='input input-rounded mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50'
            rows={8}
          />
          {errors.description && (
            <span className='text-xs text-red-500'>概要は必須です</span>
          )}
        </div>

        <div>
          <label
            htmlFor='place'
            className='flex text-sm font-medium text-gray-700'
          >
            場所
            <Hissu />
          </label>
          <input
            {...register('place', { required: true })}
            className='input input-rounded mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50'
          />
          {errors.place && (
            <span className='text-xs text-red-500'>場所は必須です</span>
          )}
        </div>
        <div>
          <label
            htmlFor='event_date'
            className='flex text-sm font-medium text-gray-700'
          >
            開催日
            <Hissu />
          </label>
          <input
            type='date'
            {...register('event_date', { required: true })}
            className='input input-rounded mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50'
          />
          {errors.event_date && (
            <span className='text-xs text-red-500'>開催日は必須です</span>
          )}
        </div>
        <div>
          <label
            htmlFor='owner_id'
            className='flex text-sm font-medium text-gray-700'
          >
            主催者
            <Hissu />
          </label>
          <select
            {...register('owner_id', { required: true })}
            className='input input-rounded mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50'
          >
            <option value=''>選択してください</option>
            {owners.map((o) => (
              <option key={o.id} value={o.id}>
                {o.firstName}
              </option>
            ))}
          </select>
          {errors.owner_id && (
            <span className='text-xs text-red-500'>主催者は必須です</span>
          )}
        </div>
        <div>
          <label
            htmlFor='thumbnail'
            className='block text-sm font-medium text-gray-700'
          >
            サムネイル
          </label>
          <input
            {...register('thumbnail')}
            type='file'
            className='file-input file-input-bordered w-full'
          />
        </div>

        <div className='flex justify-center'>
          <button type='submit' className='btn btn-primary btn-outline flex-1'>
            登録
          </button>
          <button
            type='button'
            onClick={() => navigate.push('/admin/dashboard')}
            className='btn btn-outline flex-1'
          >
            戻る
          </button>
        </div>
      </form>
    </div>
  )
}
