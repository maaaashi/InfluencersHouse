'use client'

import { TextArea } from '@/components/form/TextArea'
import { TextInput } from '@/components/form/TextInput'
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
  const [questions, setQuestions] = useState<string[]>([])
  const [data, setData] = useState({
    secondName: '',
    firstName: '',
    email: '',
    sns: '',
    job: '',
    questions: questions,
  })

  const getQuestions = async () => {
    const response = await fetch('/api/questions')
    const { questions } = (await response.json()) as {
      questions: { title: string }[]
    }
    setIsLoading(false)
    setQuestions(questions.sort().map((q) => q.title))
  }

  const submitHandler = (e: FormEvent) => {
    e.preventDefault()
    const form = e.target
    // router.push(`/${params.id}/house`)
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
            <input type='text' className='input input-bordered' required />
          </label>
          <label className='form-control w-1/2'>
            <div className='label'>
              <span className='label-text'>名前</span>
            </div>
            <input type='text' className='input input-bordered' required />
          </label>
        </div>
        <TextInput label='メールアドレス' type='email' required={true} />
        <TextInput label='SNS' required={true} />
        <TextInput label='職業' required={true} />
        {questions.map((question, index) => (
          <TextArea key={index} label={question} required={true} />
        ))}
      </div>
      <button className='btn w-52' type='submit'>
        登録
        <FaArrowCircleRight />
      </button>
    </form>
  )
}
