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
  invitations?: string
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
          invitations: data.invitations,
        },
      }),
    })
    reset()
    navigate.push('/admin/dashboard')
  }

  return (
    <div className='flex flex-col justify-center py-8 px-4 container mx-auto gap-4'>
      <h2 className='font-bold self-start text-lg'>ハウス新規登録</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='w-full space-y-6 bg-white shadow-lg rounded-lg p-6 sm:p-8'
      >
        <div>
          <label className='form-control'>
            <div className='label'>
              <span className='label-text flex'>
                ハウス名
                <Hissu />
              </span>
            </div>
            <input
              {...register('name', { required: true })}
              className='input input-bordered'
              placeholder='美容で日本を変えるハウス'
            />
          </label>
          {errors.name && (
            <span className='text-xs text-red-500'>ハウス名は必須です</span>
          )}
        </div>

        <div>
          <label className='form-control'>
            <div className='label'>
              <span className='label-text flex'>
                概要
                <Hissu />
              </span>
            </div>
            <textarea
              {...register('description', { required: true })}
              className='textarea textarea-bordered h-24'
              rows={8}
              placeholder='美容で日本を変えるハウスです。本気で美容に取り組む方に声をかけています。'
            />
          </label>
          {errors.description && (
            <span className='text-xs text-red-500'>概要は必須です</span>
          )}
        </div>

        <div>
          <label className='form-control'>
            <div className='label'>
              <span className='label-text flex'>
                場所
                <Hissu />
              </span>
            </div>
            <input
              {...register('place', { required: true })}
              className='input input-bordered'
              placeholder='東京都渋谷区 〇〇ビル 3F'
            />
          </label>
          {errors.place && (
            <span className='text-xs text-red-500'>場所は必須です</span>
          )}
        </div>
        <div>
          <label className='form-control'>
            <div className='label'>
              <span className='label-text flex'>
                開催日
                <Hissu />
              </span>
            </div>
            <input
              type='date'
              {...register('event_date', { required: true })}
              className='input input-bordered'
            />
          </label>
          {errors.event_date && (
            <span className='text-xs text-red-500'>開催日は必須です</span>
          )}
        </div>
        <div>
          <label className='form-control'>
            <div className='label'>
              <span className='label-text flex'>
                主催者
                <Hissu />
              </span>
            </div>
            <select
              {...register('owner_id', { required: true })}
              className='input input-bordered'
            >
              <option value=''>選択してください</option>
              {owners.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.firstName}
                </option>
              ))}
            </select>
          </label>
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
        <div>
          <label className='form-control'>
            <div className='label'>
              <span className='label-text flex'>
                招待
                <Hissu />
              </span>
            </div>
            <textarea
              {...register('invitations')}
              className='textarea textarea-bordered h-24'
              rows={8}
              placeholder={`suzuki@example.com
tanaka@example.com
endo@example.com`}
            />
          </label>
          {errors.description && (
            <span className='text-xs text-red-500'>概要は必須です</span>
          )}
        </div>

        <div className='flex justify-center'>
          <button
            type='button'
            onClick={() => navigate.push('/admin/dashboard')}
            className='btn btn-outline flex-1'
          >
            戻る
          </button>
          <button type='submit' className='btn btn-primary btn-outline flex-1'>
            登録
          </button>
        </div>
      </form>
    </div>
  )
}
