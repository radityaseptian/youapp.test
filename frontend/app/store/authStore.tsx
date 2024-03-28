import { create } from 'zustand'

type UserRequired = {
  email: string
  setEmail: (email: string) => void
  password: string
  setPassword: (password: string) => void

  typeInputPassword: boolean
  setTypeInputPassword: () => void

  loading: boolean
  setLoading: (loading: boolean) => void

  clear: () => void
}

type LoginState = UserRequired & {}

type RegisterState = UserRequired & {
  username: string
  setUsername: (username: string) => void

  confirmPassword: string
  setConfirmPassword: (password: string) => void

  typeConfirmInputPassword: boolean
  setConfirmTypeInputPassword: () => void
}

const useLoginStore = create<LoginState>((set) => ({
  email: '',
  setEmail: (email) => set({ email }),

  password: '',
  setPassword: (password) => set({ password }),

  typeInputPassword: false,
  setTypeInputPassword: () => set((state) => ({ typeInputPassword: !state.typeInputPassword })),

  loading: false,
  setLoading: (loading: boolean) => set({ loading }),

  clear: () => set({ email: '', password: '', typeInputPassword: false }),
}))

const useRegisterStore = create<RegisterState>((set) => ({
  email: '',
  setEmail: (email) => set({ email }),

  username: '',
  setUsername: (username) => set({ username }),

  password: '',
  setPassword: (password) => set({ password }),

  confirmPassword: '',
  setConfirmPassword: (password) => set({ confirmPassword: password }),

  typeInputPassword: false,
  setTypeInputPassword: () => set((state) => ({ typeInputPassword: !state.typeInputPassword })),

  typeConfirmInputPassword: false,
  setConfirmTypeInputPassword: () =>
    set((state) => ({ typeConfirmInputPassword: !state.typeConfirmInputPassword })),

  loading: false,
  setLoading: (loading: boolean) => set({ loading }),

  clear: () =>
    set({
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
      typeInputPassword: false,
      typeConfirmInputPassword: false,
    }),
}))

export { useLoginStore, useRegisterStore }
