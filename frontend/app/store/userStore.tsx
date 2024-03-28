import { create } from 'zustand'
import axios from 'axios'

type BasicUser = {
  username: string
  name?: string
  image?: any
  birthday?: string
  gender?: string
  height?: string
  weight?: string
  zodiac?: string
  interests: string[]
}

type User = BasicUser & {
  isLogin: boolean
  token: string
  loading: boolean
  setLoading: (loading: boolean) => void

  age: number

  copyBasic: any

  addInterest: (interest: string) => void
  deleteInterest: (interest: string) => void
  cancelInterest: () => void
  saveInterest: () => void
  copyInterest: string[]

  openAboutUpdate: boolean
  openInterestUpdate: boolean

  saveUser: (payload: Partial<Pick<User, keyof User>>) => void
}

const useUserStore = create<User>((set) => ({
  isLogin: true,
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MDRkNTY0NDkwNzMxMGU3NDVmNzE1MSIsInVzZXJuYW1lIjoiZ3VuYXdhbiIsImVtYWlsIjoiZ3VndW5AZ21haWwuY29tIiwiaWF0IjoxNzExNTkzMjM4LCJleHAiOjE3MTE1OTY4Mzh9.6QVsktbm8CvyDaF0uBkruDkSxytHZnOOvcE5EziaKGo',
  loading: false,
  setLoading: (loading: boolean) => set({ loading }),

  username: '',
  name: '',
  gender: '',
  image: null,
  birthday: '',
  height: '',
  weight: '',
  zodiac: '',
  interests: [],

  age: 0,

  copyBasic: null,

  addInterest: (interest: string) => {
    set((state) => {
      const isExist = state.copyInterest.find((i) => i === interest)
      if (!isExist) return { copyInterest: [...state.copyInterest, interest] }
      return { copyInterest: state.copyInterest }
    })
  },
  deleteInterest: (interest: string) => {
    set((state) => ({ copyInterest: state.copyInterest.filter((i) => i !== interest) }))
  },
  cancelInterest: () => set({ openInterestUpdate: false, copyInterest: [] }),
  saveInterest: () =>
    set((state) => ({ openInterestUpdate: false, interests: state.copyInterest })),
  copyInterest: [],

  openAboutUpdate: false,
  openInterestUpdate: false,

  saveUser: (payload) => {
    if (payload.openAboutUpdate) {
      set((state) => ({
        copyBasic: {
          name: state.name,
          gender: state.gender,
          image: state.image,
          birthday: state.birthday,
          zodiac: state.zodiac,
          height: state.height,
          weight: state.weight,
        },
      }))
    }

    if (payload.openInterestUpdate) {
      set((state) => ({ copyInterest: state.interests }))
    }

    set(payload)
  },
}))

export default useUserStore
