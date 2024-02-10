import { activationUserByIdAndToken, getUserByIdAndToken } from '@/lib/user'
import { NextRequest } from 'next/server'

type Params = {
  params: {
    id: string
  }
}

export const POST = async (req: NextRequest, { params }: Params) => {
  const userId = params.id
  const url = new URL(req.url)
  const token = url.searchParams.get('token')

  if (!token) {
    return new Response('Token not found.', { status: 400 })
  }

  const user = await getUserByIdAndToken(userId, token)

  if (!user) {
    return new Response('User not found.', { status: 404 })
  }

  await activationUserByIdAndToken(userId, token)
  return new Response('User activated successfully.', { status: 200 })
}
