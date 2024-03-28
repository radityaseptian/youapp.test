'use client'

import Button from '../components/Button'
import Input from '../components/Input'
import LinkAuth from '../components/Link'
import { useLoginStore } from '../../store/authStore'
import { useEffect, useState } from 'react'
import axios from 'axios'
import useUserStore from '@/app/store/userStore'
import { useRouter } from 'next/navigation'

export default function Login() {
  const loginStore = useLoginStore()
  const userStore = useUserStore()

  const [filled, setFilled] = useState(false)
  const baseUrl = process.env.NEXT_PUBLIC_API_URL
  const router = useRouter()

  useEffect(() => {
    if (loginStore.email.length >= 6 && loginStore.password.length >= 6) {
      setFilled(true)
    } else {
      setFilled(false)
    }
  }, [loginStore.email, loginStore.password])

  const submit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    if (loginStore.loading) return
    loginStore.setLoading(true)
    try {
      const { data, status } = await axios.post(baseUrl + '/login', {
        email: loginStore.email,
        username: loginStore.email,
        password: loginStore.password,
      })
      if (status === 201 && data.message !== 'User not found') {
        userStore.saveUser({ isLogin: true, token: data.access_token })

        loginStore.clear()
        router.push('/profile')
      } else if (data.message) {
        alert(data.message)
      }
    } catch (error: any) {
      alert(error.message)
    } finally {
      loginStore.setLoading(false)
    }
  }

  return (
    <div>
      <h3 className='mb-6 ml-4 text-2xl font-semibold'>Login</h3>
      <form onSubmit={submit}>
        <div className='space-y-4 pb-6'>
          <Input
            type='text'
            placeholder='Enter Username/Email'
            onChange={loginStore.setEmail}
            value={loginStore.email}
            autuFocus={true}
          />
          <Input
            type={loginStore.typeInputPassword ? 'text' : 'password'}
            placeholder='Enter Password'
            onChange={loginStore.setPassword}
            value={loginStore.password}
            changeInputType={loginStore.setTypeInputPassword}
          />
        </div>
        <Button text='Login' isFilled={filled && !loginStore.loading} />
      </form>
      <div className='text-center mt-12 text-sm'>
        <span>No account? </span>
        <LinkAuth href='register' text='Register here' />
      </div>
    </div>
  )
}
