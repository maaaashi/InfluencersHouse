import React, { FC } from 'react'
import { Hissu } from './Hissu'

interface Props {
  label: string
  name: string
  required?: boolean
  placeholder?: string
}

export const TextArea: FC<Props> = ({ label, required, name, placeholder }) => {
  return (
    <label className='form-control w-full'>
      <div className='label'>
        <span className='label-text flex'>
          {label}
          <Hissu />
        </span>
      </div>
      <textarea
        name={name}
        className='textarea textarea-bordered h-24'
        required={required || false}
        placeholder={placeholder}
      ></textarea>
    </label>
  )
}
