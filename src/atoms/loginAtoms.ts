import { atom } from 'recoil'

export const loginAtom = atom<Boolean>({
  key: 'login',
  default: false,
})
