'use client'

import Back from '../components/Back'

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className='bg-gradient h-screen overflow-hidden text-white'>
      <div className='fixed top-16 left-[18px]'>
        <Back onClick={() => {}} />
      </div>
      <div className='h-screen overflow-auto no-scroll'>
        <div className='h-36' />
        <div className='h-screen px-[23px]'>{children}</div>
      </div>
    </main>
  )
}
