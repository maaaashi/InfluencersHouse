import React, { FC, InputHTMLAttributes } from 'react'

interface Props {
  label: string
  type?: InputHTMLAttributes<HTMLInputElement>['type']
  required?: boolean
}

export const TextInput: FC<Props> = ({ label, type, required }) => {
  return (
    <label className='form-control w-full px-4'>
      <div className='label'>
        <span className='label-text'>{label}</span>
      </div>
      <input
        type={type || 'text'}
        className='input input-bordered w-full'
        required={required || false}
      />
    </label>
  )
}
