import React, { FC, InputHTMLAttributes } from 'react'

interface Props {
  label: string
  required?: boolean
}

export const TextArea: FC<Props> = ({ label, required }) => {
  return (
    <label className='form-control w-full px-4'>
      <div className='label'>
        <span className='label-text'>{label}</span>
      </div>
      <textarea
        className='textarea textarea-bordered h-24'
        required={required || false}
      ></textarea>
    </label>
  )
}
