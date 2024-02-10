import { supabase } from '@/lib/SupabaseClient'
import { NextRequest, NextResponse } from 'next/server'

interface Params {
  params: {
    id: string
  }
}

const arrayToString = (arr: string[]) => {
  const joined = arr.map((e) => `"${e}"`).join(',')
  return `(${joined})`
}

export const GET = async (_req: NextRequest, { params }: Params) => {
  const houseToUsers = await supabase
    .from('housetouser')
    .select('*')
    .eq('house_id', params.id)
  const userIds = houseToUsers.data!.map((h) => h.user_id)
  const users = await supabase
    .from('users')
    .select('*')
    .filter('id', 'in', arrayToString(userIds))
  return NextResponse.json({ users: users.data })
}
