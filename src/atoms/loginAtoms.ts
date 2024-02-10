import { User } from '@/domain/user'
import { atom } from 'recoil'

export const loginAtom = atom<User | null>({
  key: 'login',
  default: null,
})
