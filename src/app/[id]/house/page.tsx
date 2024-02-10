'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import Avatar from 'boring-avatars'
import { House } from '@/domain/house'
import Image from 'next/image'

interface Params {
  id: string
}

export default function Page({ params }: { params: Params }) {
  const [cookies] = useCookies([params.id])
  const [isLoading, setIsLoading] = useState(true)
  const [users, setUsers] = useState([])
  const [house, setHouse] = useState<House>()
  const router = useRouter()

  const getHouseUsers = async () => {
    const resposne = await fetch(`/api/houses/${params.id}/users`)
    const { users } = await resposne.json()
    setUsers(users)
  }

  const getHouse = async () => {
    const response = await fetch(`/api/houses/${params.id}`)
    const { house } = await response.json()
    setHouse(
      House.create({
        ...house,
        event_date: new Date(house.event_date),
      })
    )
  }

  const getDataHandler = async () => {
    await getHouseUsers()
    await getHouse()
    setIsLoading(false)
  }

  useEffect(() => {
    // !cookies[params.id] && router.push(`/${params.id}/`)
    getHouseUsers()
    getHouse()
    getDataHandler()
  }, [])

  if (isLoading || !house)
    return <span className='loading loading-ring loading-lg'></span>

  return (
    <div className='flex flex-col items-center container mx-auto gap-4'>
      <div
        className='card w-full shadow-xl image-full rounded-none'
        style={{ borderRadius: '0' }}
      >
        <figure>
          <img src={house.thumbnail} alt='' />
        </figure>
        <div className='card-body self-end'>
          <h2 className='card-title text-2xl'>{house.name}</h2>
        </div>
      </div>
      <div className='bg-stone-100 rounded-lg p-4 flex flex-col gap-2 w-full'>
        <h3 className='font-bold'>ハウス概要</h3>
        <section>
          <p
            dangerouslySetInnerHTML={{
              __html: house.description,
            }}
          />
        </section>

        <section>
          <h4 className='font-bold'>開催日時</h4>
          <p>{house.event_date.toLocaleDateString()}</p>
        </section>

        <section>
          <h4 className='font-bold'>場所</h4>
          <p>{house.place}</p>
        </section>
      </div>

      <section className='w-full bg-stone-300 p-4 rounded-lg mb-10'>
        <h3 className='font-bold self-start'>参加者</h3>
        <div className='overflow-x-auto w-full'>
          <table className='table'>
            <thead>
              <tr>
                <th></th>
                <th></th>
                <th>First Name</th>
                <th>Job</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user: any, index) => {
                return (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <td>
                      <Avatar
                        size={40}
                        name={user.id}
                        variant='beam'
                        colors={[
                          '#92A1C6',
                          '#146A7C',
                          '#F0AB3D',
                          '#C271B4',
                          '#C20D90',
                        ]}
                      />
                    </td>
                    <td>{user.firstname}</td>
                    <td>{user.job}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
