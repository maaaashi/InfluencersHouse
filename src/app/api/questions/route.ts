import { supabase } from '@/lib/SupabaseClient'
import { NextResponse } from 'next/server'

export const GET = async () => {
  const questions = await supabase.from('questions').select('*')
  return NextResponse.json({ questions: questions.data })
}
