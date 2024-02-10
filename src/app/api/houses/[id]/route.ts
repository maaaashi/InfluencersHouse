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
