import React, { FC, InputHTMLAttributes } from 'react'

interface Props {
  label: string
  name: string
  required?: boolean
}

export const TextArea: FC<Props> = ({ label, required, name }) => {
  return (
    <label className='form-control w-full px-4'>
      <div className='label'>
        <span className='label-text'>{label}</span>
      </div>
      <textarea
        name={name}
        className='textarea textarea-bordered h-24'
        required={required || false}
      ></textarea>
    </label>
  )
}
