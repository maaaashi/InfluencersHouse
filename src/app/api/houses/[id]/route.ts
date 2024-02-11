import { supabase } from '@/lib/SupabaseClient'
import { NextRequest, NextResponse } from 'next/server'

interface Params {
  params: {
    id: string
  }
}

export const GET = async (_req: NextRequest, { params }: Params) => {
  const house = await supabase
    .from('houses')
    .select('*')
    .eq('id', params.id)
    .single()

  if (!house.data) return NextResponse.json({ house: null })

  const image = await supabase.storage
    .from('image')
    .createSignedUrl(`house_thumbnail/${house.data.thumbnail}`, 10)

  const url = image.data?.signedUrl
  return NextResponse.json({
    house: {
      ...house.data,
      thumbnail: url,
    },
  })
}

export const POST = async (req: NextRequest, { params }: Params) => {
  const data = await req.json()
  const thumbnailImage =
    data.thumbnail ?? '5877d812-454b-4fa5-bed9-cae3a137a1ff.webp'
  const result = await supabase
    .from('houses')
    .update({
      name: data.house.name,
      description: data.house.description,
      place: data.house.place,
      event_date: data.house.event_date,
      owner_id: data.house.owner_id,
      thumbnail: thumbnailImage,
      invitations: data.house.invitations,
    })
    .eq('id', params.id)
  console.log(result)
  return NextResponse.json({ status: 'success' })
}

export const DELETE = async (_req: NextRequest, { params }: Params) => {
  await supabase.from('housetouser').delete().eq('house_id', params.id)
  await supabase.from('houses').delete().eq('id', params.id)

  return NextResponse.json({ status: 'success' })
}
