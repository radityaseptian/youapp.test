import useUserStore from '@/app/store/userStore'
import Box from '../components/Box'
import Back from '@/app/components/Back'
import { useState } from 'react'

export default function Interest() {
  const userStore = useUserStore()
  const [interest, setInterest] = useState('')

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (interest.length >= 3) {
      userStore.addInterest(interest)
      setInterest('')
    }
  }

  return (
    <Box
      title='Interest'
      onClick={() => userStore.saveUser({ openInterestUpdate: !userStore.openInterestUpdate })}
    >
      <div className='text-sm text-[#FFFFFF85]'>
        {!userStore.interests.length && !userStore.openInterestUpdate ? (
          <span>Add in your interest to find a better match</span>
        ) : (
          <ul className='text-white flex gap-[10px]'>
            {userStore.interests.map((interest) => {
              return (
                <li key={interest} className='bg-white/[.06] rounded-full py-2 px-4'>
                  {interest}
                </li>
              )
            })}
          </ul>
        )}
        {userStore.openInterestUpdate && (
          <main className='bg-gradient fixed inset-0 h-screen overflow-hidden text-white'>
            <div className='fixed flex items-center justify-between top-[75px] left-[18px] right-[18px]'>
              <Back onClick={userStore.cancelInterest} />
              <button
                onClick={userStore.saveInterest}
                className='px-2 py-1 save-button font-semibold'
              >
                Save
              </button>
            </div>
            <div className='h-screen overflow-auto no-scroll'>
              <div className='h-40' />
              <div className='h-screen px-[23px]'>
                <div className='text-gradient-custom text-sm'>Tell everyone about yourself</div>
                <h4 className='text-xl font-semibold pt-3 pb-8'>What interest you?</h4>
                <form onSubmit={submit}>
                  <label
                    htmlFor='interest'
                    className='px-4 py-2.5 bg-white/[0.06] flex items-center gap-2 flex-wrap rounded-md'
                  >
                    {userStore.copyInterest.map((interest) => {
                      return (
                        <div
                          key={interest}
                          className='bg-white/10 flex items-center pl-2.5 rounded'
                        >
                          <div>{interest}</div>
                          <button
                            type='button'
                            onClick={() => userStore.deleteInterest(interest)}
                            className='py-1.5 px-2 cursor-pointer'
                          >
                            &#10006;
                          </button>
                        </div>
                      )
                    })}
                    <input
                      value={interest}
                      onChange={(e) => setInterest(e.target.value)}
                      id='interest'
                      type='text'
                      className='w-36 bg-transparent'
                    />
                  </label>
                </form>
              </div>
            </div>
          </main>
        )}
      </div>
    </Box>
  )
}
