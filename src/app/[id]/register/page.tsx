'use client'

import { TextArea } from '@/components/form/TextArea'
import { TextInput } from '@/components/form/TextInput'
import { useRouter } from 'next/navigation'
import { FormEvent, useEffect, useState } from 'react'
import { FaArrowCircleRight } from 'react-icons/fa'
import { useCookies } from 'react-cookie'
import { Hissu } from '@/components/form/Hissu'

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
  const [cookies, setCookie] = useCookies([params.id])

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
      body: JSON.stringify({ user, answers, house: { id: params.id } }),
    })

    setCookie(params.id, 'registered', { path: '/' })
    router.push(`/${params.id}/house`)
  }

  useEffect(() => {
    cookies[params.id] && router.push(`/${params.id}/house`)

    getQuestions()
  }, [])

  if (isLoading)
    return <span className='loading loading-ring loading-lg'></span>

  return (
    <div className='p-4'>
      <h2 className='font-bold'>情報を入力してください。</h2>
      <form
        className='flex flex-col items-center gap-4'
        onSubmit={submitHandler}
      >
        <div>
          <div className='sm:flex gap-2'>
            <label className='form-control w-full sm:w-1/2'>
              <div className='label'>
                <span className='label-text flex'>
                  苗字
                  <Hissu />
                </span>
              </div>
              <input
                type='text'
                className='input input-bordered'
                required
                name='secondName'
                placeholder='山田'
              />
            </label>
            <label className='form-control w-full sm:w-1/2'>
              <div className='label'>
                <span className='label-text flex'>
                  名前
                  <Hissu />
                </span>
              </div>
              <input
                type='text'
                className='input input-bordered'
                required
                name='firstName'
                placeholder='太郎'
              />
            </label>
          </div>
          <TextInput
            label='メールアドレス'
            type='email'
            required={true}
            name='email'
            placeholder='abc@exaple.com'
          />
          <TextInput
            label='SNS'
            required={true}
            name='sns'
            placeholder='https://twitter.com/example'
          />
          <TextInput
            label='職業'
            required={true}
            name='job'
            placeholder='〇〇社取締役'
          />
          {questions.map((question, index) => (
            <TextArea
              key={index}
              label={question.title}
              required={true}
              name={question.id}
              placeholder='回答を入力してください'
            />
          ))}
        </div>
        <button className='btn w-52' type='submit'>
          登録
          <FaArrowCircleRight />
        </button>
      </form>
    </div>
  )
}
