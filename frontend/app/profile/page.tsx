'use client'

import Back from '../components/Back'

import Profile from './sections/Profile'
import About from './sections/About'
import Interest from './sections/Interest'
import useUserStore from '@/app/store/userStore'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { calculateAge } from '../helper/misc'

export default function EditUser() {
  const userStore = useUserStore()
  const router = useRouter()

  const baseUrl = process.env.NEXT_PUBLIC_API_URL

  const getProfile = async () => {
    try {
      const { data, status } = await axios.get(baseUrl + '/getProfile', {
        headers: { 'x-access-token': userStore.token },
      })
      if (status === 200) {
        const age = calculateAge(data.data?.birthday || '')

        userStore.saveUser({ age, ...data.data })
      }
    } catch (error) {
      userStore.saveUser({ isLogin: false, token: '' })
      router.push('/auth/login')
    }
  }

  useEffect(() => {
    if (!userStore.isLogin) {
      router.push('/auth/login')
    } else {
      getProfile()
    }
  }, [])

  return (
    <main className='bg-[#09141A] min-h-screen text-white pt-16'>
      <div className='relative px-[18px]'>
        <div className='absolute'>
          <Back onClick={() => {}} />
        </div>
        <div className='text-center'>{userStore.username ? `@${userStore.username}` : ''}</div>
        <span />
      </div>
      <div className='pt-6 pb-10 space-y-5 px-2'>
        <Profile />
        <About />
        <Interest />
      </div>
    </main>
  )
}
