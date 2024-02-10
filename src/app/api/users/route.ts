import { supabase } from '@/lib/SupabaseClient'
import { NextResponse } from 'next/server'

export const GET = async () => {
  const usersData = await supabase.from('users').select('*')
  if (!usersData.data) {
    return NextResponse.json({ users: [] })
  }

  const users = usersData.data.map((user) => {
    return {
      id: user.id,
      secondName: user.secondname,
      firstName: user.firstname,
      email: user.email,
      job: user.job,
    }
  })
  return NextResponse.json({ users: users })
}
