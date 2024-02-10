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
  })

  return <div>hello</div>
}
