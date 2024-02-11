'use client'
import { loginAtom } from '@/atoms/loginAtoms'
import { House } from '@/domain/house'
import { User } from '@/domain/user'
import { formatDateString } from '@/lib/date'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { IoIosSend } from 'react-icons/io'
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

  const onSendEmail = async (_invitations: string) => {
    setTimeout(() => {
      alert('招待メールを送信しました')
    }, 1000)
  }

  const onClosedHouse = async () => {
    const confirm = window.confirm('本当に閉会しますか？')
    if (!confirm) return
    setTimeout(() => {
      alert('ハウスを閉じました。')
    }, 1000)
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
          className='btn btn-primary'
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
              <th className='px-6 py-2 text-xs text-gray-500'>招待ゲスト</th>
              <th className='px-6 py-2 text-xs text-gray-500'>操作</th>
            </tr>
          </thead>
          <tbody className='bg-white'>
            {houses.map((house, index) => (
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
                <td
                  className='px-6 py-4 text-sm text-gray-500 text-center'
                  dangerouslySetInnerHTML={{
                    __html: house.invitations?.replace(/\s/, '<br>'),
                  }}
                ></td>

                <td className='px-6 py-4 lg:hidden'>
                  <div
                    className={`dropdown ${
                      houses.length < index + 3
                        ? 'dropdown-top dropdown-end'
                        : 'dropdown-end'
                    }`}
                  >
                    <div tabIndex={0} role='button' className='btn'>
                      Action
                    </div>
                    <ul
                      tabIndex={0}
                      className='dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52'
                    >
                      <li>
                        <a
                          onClick={() =>
                            navigate.push(`/admin/dashboard/house/${house.id}`)
                          }
                        >
                          編集
                        </a>
                      </li>
                      <li>
                        <a onClick={() => onDeleteHouse(house.id)}>削除</a>
                      </li>
                      <li>
                        <a
                          onClick={() => onSendEmail(house.invitations)}
                          className={`${
                            !house.invitations &&
                            'pointer-events-none bg-stone-400'
                          }`}
                        >
                          招待メール送信
                          <IoIosSend size={20} />
                        </a>
                      </li>
                      <li>
                        <a
                          className='text-error'
                          onClick={() => onClosedHouse()}
                        >
                          閉会
                        </a>
                      </li>
                    </ul>
                  </div>
                </td>

                <td className='px-6 py-4 text-center hidden lg:block'>
                  <div className='join join-vertical lg:join-horizontal'>
                    <button
                      className='btn font-normal join-item'
                      onClick={() =>
                        navigate.push(`/admin/dashboard/house/${house.id}`)
                      }
                    >
                      編集
                    </button>
                    <button
                      className='btn font-normal join-item'
                      onClick={() => onDeleteHouse(house.id)}
                    >
                      削除
                    </button>
                    <button
                      className='btn btn-primary btn-outline font-normal join-item'
                      onClick={() => onSendEmail(house.invitations)}
                      disabled={!house.invitations}
                    >
                      招待メール送信
                      <IoIosSend size={20} />
                    </button>
                    <button
                      className='btn btn-error btn-outline font-normal join-item'
                      onClick={() => onClosedHouse()}
                    >
                      閉会
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
