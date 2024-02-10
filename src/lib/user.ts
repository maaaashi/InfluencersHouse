import { User } from '@/domain/user'
import { supabase } from './SupabaseClient'

export async function getUserById(userId: string): Promise<User | null> {
  const userResponse = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single()
  const user = userResponse.data

  if (!user) {
    return null
  }

  return User.create(user)
}

export async function checkUserByIdAndToken(
  userId: string,
  token: string
): Promise<boolean> {
  const user = await getUserById(userId)
  if (!user) {
    return false
  }

  const userToken = await supabase
    .from('tokens')
    .select('*')
    .eq('user_id', user.id)
    .eq('token', token)
    .single()

  return userToken.data !== null
}

export async function activationUserByIdAndToken(
  userId: string,
  token: string
) {
  await supabase
    .from('users')
    .update({ activated_at: new Date() })
    .eq('id', userId)
}
