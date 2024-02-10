'use client'
import { loginAtom } from '@/atoms/loginAtoms'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useRecoilValue } from 'recoil'

export default function Page() {
  const login = useRecoilValue(loginAtom)
  const navigate = useRouter()

  useEffect(() => {
    if (!login) {
      navigate.push('/admin/login')
    }
  }, [login, navigate])

  return (
    <div className='overflow-x-auto'>
      <section className='bg-white rounded m-2 md:m-20'>
        <div className='overflow-x-auto'>
          <table className='min-w-full table-auto'>
            <thead className='bg-gray-50'>
              <tr>
                <th className='text-sm font-medium text-gray-500 px-4 py-2'>
                  Name
                </th>
                <th className='text-sm font-medium text-gray-500 px-4 py-2'>
                  Job
                </th>
                <th className='text-sm font-medium text-gray-500 px-4 py-2'>
                  Favorite Color
                </th>
              </tr>
            </thead>
            <tbody className='bg-white'>
              <tr>
                <td className='text-sm text-gray-900 font-light px-4 py-2'>
                  Cy Ganderton
                </td>
                <td className='text-sm text-gray-900 font-light px-4 py-2'>
                  Quality Control Specialist
                </td>
                <td className='text-sm text-gray-900 font-light px-4 py-2'>
                  Blue
                </td>
              </tr>
              <tr>
                <td className='text-sm text-gray-900 font-light px-4 py-2'>
                  Hart Hagerty
                </td>
                <td className='text-sm text-gray-900 font-light px-4 py-2'>
                  Desktop Support Technician
                </td>
                <td className='text-sm text-gray-900 font-light px-4 py-2'>
                  Purple
                </td>
              </tr>
              <tr>
                <td className='text-sm text-gray-900 font-light px-4 py-2'>
                  Brice Swyre
                </td>
                <td className='text-sm text-gray-900 font-light px-4 py-2'>
                  Tax Accountant
                </td>
                <td className='text-sm text-gray-900 font-light px-4 py-2'>
                  Red
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
