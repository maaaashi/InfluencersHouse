import { supabase } from '@/lib/SupabaseClient'
import { NextRequest, NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'

export const POST = async (req: NextRequest) => {
  const data = await req.json()
  const user = await supabase
    .from('users')
    .select('*')
    .eq('email', data.user.email)
    .single()
  if (user.data) {
    await supabase
      .from('users')
      .update({
        secondname: data.user.secondName,
        firstname: data.user.firstName,
        email: data.user.email,
        job: data.user.job,
      })
      .eq('email', data.user.email)

    data.answers.map(
      async ({
        questionId,
        answer,
      }: {
        questionId: string
        answer: string
      }) => {
        const answerId = uuidv4()
        await supabase
          .from('usertoquestion')
          .delete()
          .match({ user_id: user.data.id, question_id: questionId })

        await supabase.from('answers').insert({
          id: answerId,
          answer: answer,
        })

        await supabase.from('usertoquestion').insert({
          user_id: user.data.id,
          question_id: questionId,
          answer_id: answerId,
        })
      }
    )

    const houseToUser = await supabase
      .from('housetouser')
      .select('*')
      .match({
        user_id: user.data.id,
        house_id: data.house.id,
      })
      .single()

    if (!houseToUser.data) {
      await supabase.from('housetouser').insert({
        user_id: user.data.id,
        house_id: data.house.id,
      })
    }
  } else {
    const userId = uuidv4()

    await supabase.from('users').insert({
      id: userId,
      secondname: data.user.secondName,
      firstname: data.user.firstName,
      email: data.user.email,
      job: data.user.job,
    })

    data.answers.map(
      async ({
        questionId,
        answer,
      }: {
        questionId: string
        answer: string
      }) => {
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

    const houseToUser = await supabase
      .from('housetouser')
      .select('*')
      .match({
        user_id: userId,
        house_id: data.house.id,
      })
      .single()

    if (!houseToUser.data) {
      await supabase.from('housetouser').insert({
        user_id: userId,
        house_id: data.house.id,
      })
    }
  }

  return NextResponse.json({ status: 'success' })
}
