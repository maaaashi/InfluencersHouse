import React, { FC, InputHTMLAttributes } from 'react'
import { Hissu } from './Hissu'

interface Props {
  label: string
  name: string
  type?: InputHTMLAttributes<HTMLInputElement>['type']
  required?: boolean
  placeholder?: string
}

export const TextInput: FC<Props> = ({
  label,
  type,
  required,
  name,
  placeholder,
}) => {
  return (
    <label className='form-control w-full'>
      <div className='label'>
        <span className='label-text flex'>
          {label}
          <Hissu />
        </span>
      </div>
      <input
        type={type || 'text'}
        name={name}
        className='input input-bordered w-full'
        required={required || false}
        placeholder={placeholder}
      />
    </label>
  )
}
