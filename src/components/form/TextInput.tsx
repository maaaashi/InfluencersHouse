import React, { FC, InputHTMLAttributes } from 'react'

interface Props {
  label: string
  name: string
  type?: InputHTMLAttributes<HTMLInputElement>['type']
  required?: boolean
}

export const TextInput: FC<Props> = ({ label, type, required, name }) => {
  return (
    <label className='form-control w-full px-4'>
      <div className='label'>
        <span className='label-text'>{label}</span>
      </div>
      <input
        type={type || 'text'}
        name={name}
        className='input input-bordered w-full'
        required={required || false}
      />
    </label>
  )
}
