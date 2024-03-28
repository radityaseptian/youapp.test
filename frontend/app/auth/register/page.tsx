'use client'

import Button from '../components/Button'
import Input from '../components/Input'
import LinkAuth from '../components/Link'
import { useRegisterStore } from '../../store/authStore'
import { useEffect, useState } from 'react'
import axios from 'axios'
import useUserStore from '@/app/store/userStore'
import { useRouter } from 'next/navigation'

export default function Register() {
  const registerStore = useRegisterStore()
  const userStore = useUserStore()

  const [filled, setFilled] = useState(false)

  const router = useRouter()
  const baseUrl = process.env.NEXT_PUBLIC_API_URL

  useEffect(() => {
    if (
      registerStore.email.includes('@') &&
      registerStore.email.length >= 6 &&
      registerStore.username.length >= 6 &&
      registerStore.password.length >= 6 &&
      registerStore.confirmPassword === registerStore.password
    ) {
      setFilled(true)
    } else {
      setFilled(false)
    }
  }, [
    registerStore.email,
    registerStore.username,
    registerStore.password,
    registerStore.confirmPassword,
  ])

  const submit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    if (registerStore.loading) return
    try {
      registerStore.setLoading(true)

      const { email, username, password } = registerStore
      const payload = { email, username, password }

      const { data } = await axios.post(baseUrl + '/register', payload)

      if (data.message === 'User has been created successfully') {
        const { data } = await axios.post(baseUrl + '/login', payload)
        if (data.access_token) {
          userStore.saveUser({ isLogin: true, token: data.access_token })
          router.push('/profile')
          registerStore.clear()
        } else if (data.message) {
          alert(data.message)
        }
      } else if (data.message) {
        alert(typeof data.message === 'string' ? data.message : data.message.join('\n'))
      }
    } catch (error: any) {
      alert(error.message)
    } finally {
      registerStore.setLoading(false)
    }
  }

  return (
    <div>
      <h3 className='mb-6 ml-4 text-2xl font-semibold'>Register</h3>
      <form onSubmit={submit}>
        <div className='space-y-4 pb-6'>
          <Input
            type='text'
            placeholder='Enter Email'
            onChange={registerStore.setEmail}
            value={registerStore.email}
            autuFocus={true}
          />
          <Input
            type='text'
            placeholder='Create Username'
            onChange={registerStore.setUsername}
            value={registerStore.username}
          />
          <Input
            type={registerStore.typeInputPassword ? 'text' : 'password'}
            placeholder='Create Password'
            onChange={registerStore.setPassword}
            value={registerStore.password}
            changeInputType={registerStore.setTypeInputPassword}
          />
          <Input
            type={registerStore.typeConfirmInputPassword ? 'text' : 'password'}
            placeholder='Confirm Password'
            onChange={registerStore.setConfirmPassword}
            value={registerStore.confirmPassword}
            changeInputType={registerStore.setConfirmTypeInputPassword}
          />
        </div>
        <Button text='Register' isFilled={filled && !registerStore.loading} />
      </form>
      <div className='text-center mt-12 text-sm'>
        <span>Have an account? </span>
        <LinkAuth href='login' text='Login here' />
      </div>
    </div>
  )
}
