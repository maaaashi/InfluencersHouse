'use client'

import React, { ReactNode } from 'react'
import { RecoilRoot as Recoil } from 'recoil'

const RecoilRoot = ({ children }: { children: ReactNode }) => {
  return <Recoil>{children}</Recoil>
}

export default RecoilRoot
