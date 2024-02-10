'use client'
import { useForm } from 'react-hook-form'

// 仮定しているHouse型を定義（実際のプロジェクトに合わせて調整してください）
interface House {
  name: string
  description: string
  place: string
  event_date: string
  owner_id: string
  thumbnail?: string
}

export default function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<House>()

  const onSubmit = (data: House) => {
    console.log(data)
    // ここでデータ送信のロジックを実装します
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
            className='block text-sm font-medium text-gray-700'
          >
            ハウス名
          </label>
          <input
            {...register('name', { required: true })}
            className='input input-rounded mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50'
          />
          {errors.name && (
            <span className='text-xs text-red-500'>This field is required</span>
          )}
        </div>

        <div>
          <label
            htmlFor='description'
            className='block text-sm font-medium text-gray-700 rows-4'
          >
            概要
          </label>
          <textarea
            {...register('description', { required: true })}
            className='input input-rounded mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50'
            rows={8}
          />
          {errors.description && (
            <span className='text-xs text-red-500'>This field is required</span>
          )}
        </div>

        <div>
          <label
            htmlFor='place'
            className='block text-sm font-medium text-gray-700'
          >
            場所
          </label>
          <input
            {...register('place', { required: true })}
            className='input input-rounded mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50'
            placeholder='Location'
          />
          {errors.place && (
            <span className='text-xs text-red-500'>This field is required</span>
          )}
        </div>
        <div>
          <label
            htmlFor='event_date'
            className='block text-sm font-medium text-gray-700'
          >
            開催日
          </label>
          <input
            type='date'
            {...register('event_date', { required: true })}
            className='input input-rounded mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50'
          />
          {errors.event_date && (
            <span className='text-xs text-red-500'>This field is required</span>
          )}
        </div>
        <div>
          <label
            htmlFor='owner_id'
            className='block text-sm font-medium text-gray-700'
          >
            主催者
          </label>
          <input
            {...register('owner_id', { required: true })}
            className='input input-rounded mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50'
            placeholder="Owner's ID"
          />
          {errors.owner_id && (
            <span className='text-xs text-red-500'>This field is required</span>
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
            className='input input-rounded mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50'
            placeholder='http://example.com/thumbnail.jpg'
          />
        </div>

        <div className='flex justify-center'>
          <button
            type='submit'
            className='inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out'
          >
            登録
          </button>
        </div>
      </form>
    </div>
  )
}
