'use client'

import { TextArea } from '@/components/form/TextArea'
import { TextInput } from '@/components/form/TextInput'
import { User } from '@/domain/user'
import { useRouter } from 'next/navigation'
import { FormEvent, useEffect, useRef, useState } from 'react'
import { FaArrowCircleRight } from 'react-icons/fa'

interface Params {
  params: {
    id: string
  }
}

export default function Page({ params }: Params) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [questions, setQuestions] = useState<{ id: string; title: string }[]>(
    []
  )

  const getQuestions = async () => {
    const response = await fetch('/api/questions')
    const { questions } = (await response.json()) as {
      questions: { title: string; id: string }[]
    }
    setIsLoading(false)
    setQuestions(questions.sort().map((q) => ({ id: q.id, title: q.title })))
  }

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    type UserKey = 'secondName' | 'firstName' | 'email' | 'sns' | 'job'
    let user: { [key in UserKey]: string } = {
      secondName: '',
      firstName: '',
      email: '',
      sns: '',
      job: '',
    }
    let answers: { questionId: string; answer: string }[] = []

    form.querySelectorAll('input, textarea').forEach((input) => {
      const name = ((input as HTMLInputElement) || HTMLTextAreaElement).name

      if (['secondName', 'firstName', 'email', 'sns', 'job'].includes(name)) {
        user[name as UserKey] = (input as HTMLInputElement).value
      } else {
        answers.push({
          questionId: name,
          answer: (input as HTMLTextAreaElement).value,
        })
      }
    })
    await fetch('/api/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user, answers }),
    })
    router.push(`/${params.id}/house`)
  }

  useEffect(() => {
    getQuestions()
  }, [])

  if (isLoading)
    return <span className='loading loading-ring loading-lg'></span>

  return (
    <form className='flex flex-col items-center gap-4' onSubmit={submitHandler}>
      <div>
        <div className='flex gap-2 px-4'>
          <label className='form-control w-1/2'>
            <div className='label'>
              <span className='label-text'>苗字</span>
            </div>
            <input
              type='text'
              className='input input-bordered'
              required
              name='secondName'
            />
          </label>
          <label className='form-control w-1/2'>
            <div className='label'>
              <span className='label-text'>名前</span>
            </div>
            <input
              type='text'
              className='input input-bordered'
              required
              name='firstName'
            />
          </label>
        </div>
        <TextInput
          label='メールアドレス'
          type='email'
          required={true}
          name='email'
        />
        <TextInput label='SNS' required={true} name='sns' />
        <TextInput label='職業' required={true} name='job' />
        {questions.map((question, index) => (
          <TextArea
            key={index}
            label={question.title}
            required={true}
            name={question.id}
          />
        ))}
      </div>
      <button className='btn w-52' type='submit'>
        登録
        <FaArrowCircleRight />
      </button>
    </form>
  )
}
