import { TbZodiacVirgo } from 'react-icons/tb'
import useUserStore from '@/app/store/userStore'

export default function Profile() {
  const userStore = useUserStore()

  const name = userStore.name
    ? `@${userStore.name.replace(/\s/g, '')}`
    : `@${userStore.username.replace(/\s/g, '') || 'unknown'}`

  const backgroundImage = userStore.image ? `url('${userStore.image}')` : 'none'

  return (
    <div
      style={{ backgroundImage }}
      className='h-[11.875rem] overflow-hidden bg-cover bg-center rounded-3xl bg-[#162329]'
    >
      <div className={`h-full w-full p-4 flex items-end ${userStore.image && 'bg-darken-custom'}`}>
        <div>
          <div>
            {name} {userStore.age ? `, ${userStore.age}` : ''}
          </div>
          {userStore.gender && <span className='text-sm'>{userStore.gender}</span>}
          {userStore.zodiac && (
            <div className='flex items-center gap-1 w-min px-4 py-1.5 mt-2 bg-white/[.06] rounded-full'>
              <TbZodiacVirgo className='w-5 h-5' />
              <span>{userStore.zodiac}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
