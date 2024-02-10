'use client'
import { loginAtom } from '@/atoms/loginAtoms'
import { House } from '@/domain/house'
import { User } from '@/domain/user'
import { formatDateString } from '@/lib/date'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'

export default function Page() {
  const [houses, setHouses] = useState<House[]>([])
  const [owners, setOwners] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const login = useRecoilValue(loginAtom)
  const navigate = useRouter()

  useEffect(() => {
    if (!login) {
      navigate.push('/admin/login')
      return
    }
    const fetchHouses = async () => {
      const response = await fetch('/api/houses')
      const data = await response.json()
      const houses = data.house.map((house: House) => {
        return House.create(house)
      })
      setHouses(houses)
    }

    const fetchOwner = async () => {
      const response = await fetch('/api/users')
      const data = await response.json()
      const users = data.users.map((user: User) => {
        return User.create(user)
      })
      setOwners(users)
    }

    fetchHouses()
    fetchOwner()
    setIsLoading(false)
  }, [])

  const onDeleteHouse = async (id: string) => {
    const confirm = window.confirm('本当に削除しますか？')
    if (!confirm) return
    await fetch(`/api/houses/${id}`, {
      method: 'DELETE',
    })

    const response = await fetch('/api/houses')
    const data = await response.json()
    const houses = data.house.map((house: House) => {
      return House.create(house)
    })
    setHouses(houses)
  }

  if (isLoading) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <span className='loading loading-spinner loading-lg'></span>
      </div>
    )
  }

  return (
    <div className='container mx-auto px-4 mt-4 md:mt-10'>
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-xl font-semibold'>ハウス一覧</h2>
        <button
          className='btn btn-primary font-bold py-2 px-4 rounded'
          onClick={() => navigate.push('/admin/dashboard/house')}
        >
          新規作成
        </button>
      </div>
      <div className='overflow-x-auto'>
        <table className='min-w-full table-auto'>
          <thead className='bg-gray-50'>
            <tr>
              <th className='px-6 py-2 text-xs text-gray-500'>ハウス名</th>
              <th className='px-6 py-2 text-xs text-gray-500'>日付</th>
              <th className='px-6 py-2 text-xs text-gray-500'>場所</th>
              <th className='px-6 py-2 text-xs text-gray-500'>主催者</th>
              <th className='px-6 py-2 text-xs text-gray-500'>操作</th>
            </tr>
          </thead>
          <tbody className='bg-white'>
            {houses.map((house) => (
              <tr key={house.id} className='border-b'>
                <td className='px-6 py-4 text-sm text-gray-500 text-center'>
                  {house.name}
                </td>
                <td className='px-6 py-4 text-sm text-gray-500 text-center'>
                  {formatDateString(house.event_date)}
                </td>
                <td className='px-6 py-4 text-sm text-gray-500 text-center'>
                  {house.place}
                </td>
                <td className='px-6 py-4 text-sm text-gray-500 text-center'>
                  {
                    owners.find((owner) => owner.id === house.owner_id)
                      ?.firstName
                  }
                </td>
                <td className='px-6 py-4 text-center'>
                  <button
                    className='btn btn-secondary font-bold py-2 px-4 rounded'
                    onClick={() =>
                      navigate.push(`/admin/dashboard/house/${house.id}`)
                    }
                  >
                    編集
                  </button>
                  <button
                    className='btn btn-error font-bold py-2 px-4 rounded'
                    onClick={() => onDeleteHouse(house.id)}
                  >
                    削除
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
