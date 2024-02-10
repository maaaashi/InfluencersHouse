import { supabase } from '@/lib/SupabaseClient'
import { NextRequest, NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'

export const POST = async (req: NextRequest) => {
  const data = await req.json()
  const userId = uuidv4()
  await supabase.from('users').insert({
    id: userId,
    secondname: data.user.secondName,
    firstname: data.user.firstName,
    email: data.user.email,
    job: data.user.job,
  })

  console.log(data.answers)

  data.answers.map(
    async ({ questionId, answer }: { questionId: string; answer: string }) => {
      const answerId = uuidv4()
      await supabase.from('answers').insert({
        id: answerId,
        answer: answer,
      })

      await supabase.from('usertoquestion').insert({
        user_id: userId,
        question_id: questionId,
        answer_id: answerId,
      })
    }
  )
  return NextResponse.json({ status: 'success' })
}
