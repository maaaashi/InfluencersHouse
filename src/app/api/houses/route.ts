import { supabase } from '@/lib/SupabaseClient'
import { NextResponse } from 'next/server'

export const GET = async () => {
  const houses = await supabase.from('houses').select('*')
  return NextResponse.json({ house: houses.data })
}
