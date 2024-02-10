import { supabase } from '@/lib/SupabaseClient'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async () => {
  const houses = await supabase.from('houses').select('*')
  return NextResponse.json({ house: houses.data })
}

export const POST = async (req: NextRequest) => {
  const data = await req.json()
  const thumbnailImage =
    data.thumbnail ?? '5877d812-454b-4fa5-bed9-cae3a137a1ff.webp'
  const result = await supabase.from('houses').insert({
    name: data.house.name,
    description: data.house.description,
    place: data.house.place,
    event_date: data.house.event_date,
    owner_id: data.house.owner_id,
    thumbnail: thumbnailImage,
    invitations: data.house.invitations,
  })
  console.log(result)
  return NextResponse.json({ status: 'success' })
}
