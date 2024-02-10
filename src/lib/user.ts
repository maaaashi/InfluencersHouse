import { User } from '@/domain/user'
import { supabase } from './SupabaseClient'

export async function getUserByIdAndToken(
  userId: string,
  token: string
): Promise<User | null> {
  const response = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .eq('token', token)
    .single()

  return response.data ? User.create(response.data) : null
}

export function activationUserByIdAndToken(userId: string, token: string) {
  supabase.from('users').update({ activatedAt: new Date() }).eq('id', userId)
}
