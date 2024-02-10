import { supabase } from '@/lib/SupabaseClient'
import { NextRequest, NextResponse } from 'next/server'

interface Params {
  params: {
    id: string
  }
}

export const GET = async (_req: NextRequest, { params }: Params) => {
  const houses = await supabase
    .from('houses')
    .select('*')
    .eq('id', params.id)
    .single()
  return NextResponse.json({ house: houses.data })
}

export const DELETE = async (_req: NextRequest, { params }: Params) => {
  await supabase.from('housetouser').delete().eq('house_id', params.id)
  await supabase.from('houses').delete().eq('id', params.id)

  return NextResponse.json({ status: 'success' })
}
