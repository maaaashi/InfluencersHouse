'use client'
import { loginAtom } from '@/atoms/loginAtoms'
import { House } from '@/domain/house'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useRecoilValue } from 'recoil'

export default function Page() {
  const login = useRecoilValue(loginAtom)
  const navigate = useRouter()
  const houses = [
    House.create({
      id: '1',
      name: 'House 1',
      description: 'This is a house',
      place: 'place1',
      event_date: new Date(),
      owner_id: '1',
    }),
    House.create({
      id: '2',
      name: 'House 2',
      description: 'This is a house',
      place: 'place2',
      event_date: new Date(),
      owner_id: '2',
    }),
    House.create({
      id: '3',
      name: 'House 3',
      description: 'This is a house',
      place: 'place3',
      event_date: new Date(),
      owner_id: '3',
    }),
  ]

  // useEffect(() => {
  //   if (!login) {
  //     navigate.push('/admin/login')
  //   }
  // }, [login, navigate])

  return (
    <div className='container mx-auto px-4 md:px-40 mt-4 md:mt-10'>
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-xl font-semibold'>ハウス一覧</h2>
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          onClick={() => {
						navigate.push('/admin/dashboard/house')
          }}
        >
          新規作成
        </button>
      </div>
      <div className='overflow-x-auto'>
        <table className='min-w-full table-auto'>
          <thead className='bg-gray-50'>
            <tr>
              <th className='text-sm font-medium text-gray-500 px-6 py-2 min-w-[120px]'>
                ハウス名
              </th>
              <th className='text-sm font-medium text-gray-500 px-6 py-2 min-w-[120px]'>
                日付
              </th>
              <th className='text-sm font-medium text-gray-500 px-6 py-2 min-w-[120px]'>
                場所
              </th>
              <th className='text-sm font-medium text-gray-500 px-6 py-2 min-w-[120px]'>
                オーナー
              </th>
              <th className='text-sm font-medium text-gray-500 px-6 py-2 min-w-[120px]'>
                編集
              </th>
              <th className='text-sm font-medium text-gray-500 px-6 py-2 min-w-[120px]'>
                削除
              </th>
            </tr>
          </thead>
          <tbody className='bg-white'>
            {houses.map((house) => (
              <tr key={house.id}>
                <td className='text-sm px-4 py-2 text-center'>{house.name}</td>
                <td className='text-sm px-4 py-2 text-center'>
                  {house.event_date.toDateString()}
                </td>
                <td className='text-sm px-4 py-2 text-center'>{house.place}</td>
                <td className='text-sm px-4 py-2 text-center'>
                  {house.owner_id}
                </td>
                <td className='text-sm px-4 py-2'>
                  <div className='flex justify-center'>
                    <button
                      className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                      onClick={() => {
                        console.log('編集ボタンがクリックされました')
                      }}
                    >
                      編集
                    </button>
                  </div>
                </td>
                <td className='text-sm px-4 py-2'>
                  <div className='flex justify-center'>
                    <button
                      className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
                      onClick={() => navigate.push('/admin/dashboard/house')}
                    >
                      削除
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
