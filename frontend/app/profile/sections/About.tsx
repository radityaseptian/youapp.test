import Box from '../components/Box'
import useUserStore from '@/app/store/userStore'
import Label from '../components/Label'
import { BsPlusLg } from 'react-icons/bs'
import Image from 'next/image'
import axios from 'axios'
import { calculateAge } from '@/app/helper/misc'

const zodiacs = [
  'aries',
  'taurus',
  'gemini',
  'cancer',
  'leo',
  'virgo',
  'libra',
  'scorpius',
  'sagittarius',
  'copricornus',
  'aquarius',
  'pisces',
]

export default function About() {
  const userStore = useUserStore()

  const baseUrl = process.env.NEXT_PUBLIC_API_URL

  const requiredClass =
    'w-48 border border-white/[.06] placeholder:text-white/30 text-white bg-[#D9D9D90F] text-right px-4 py-1.5 rounded-lg'

  const saveAndUpdate = async () => {
    if (userStore.loading) return
    userStore.setLoading(true)

    const { name, birthday, zodiac, gender, height, image, weight } = userStore.copyBasic
    const payload = {
      name,
      birthday,
      height: parseInt(height) || 0,
      weight: parseInt(weight) || 0,
      interests: userStore.interests,
    }

    const headers = { headers: { 'x-access-token': userStore.token } }

    try {
      if (!userStore.name) {
        const { data, status } = await axios.post(baseUrl + '/createProfile', payload, headers)
      } else {
        const { data, status } = await axios.put(baseUrl + '/updateProfile', payload, headers)
      }

      const { data, status } = await axios.get(baseUrl + '/getProfile', headers)
      if (status === 200) {
        const newImage = image && typeof image === 'object' ? URL.createObjectURL(image) : image
        const age = calculateAge(data.data?.birthday || '')

        userStore.saveUser({ zodiac, gender, age, image: newImage, ...data.data })
      }

      userStore.saveUser({ openAboutUpdate: false })
    } catch (error: any) {
      alert(error.message!)
    } finally {
      userStore.setLoading(false)
    }
  }

  const isFilled = userStore.name || userStore.birthday || userStore.height || userStore.weight

  return (
    <Box
      title='About'
      onClick={() => {
        if (!userStore.openAboutUpdate) {
          userStore.saveUser({ openAboutUpdate: !userStore.openAboutUpdate })
        } else {
          saveAndUpdate()
        }
      }}
      openUpdate={userStore.openAboutUpdate}
    >
      <div className='text-sm text-[#FFFFFF85]'>
        {!isFilled && !userStore.openAboutUpdate && (
          <span>Add in your your to help others know you better</span>
        )}

        {isFilled && !userStore.openAboutUpdate && (
          <div className='space-y-2.5'>
            {userStore.birthday && <AboutList title='Birthday' value={userStore.birthday} />}
            {userStore.zodiac && <AboutList title='Zodiac' value={userStore.zodiac} />}
            {userStore.height && <AboutList title='Height' value={`${userStore.height} cm`} />}
            {userStore.weight && <AboutList title='Weight' value={`${userStore.weight} kg`} />}
          </div>
        )}

        {userStore.openAboutUpdate && (
          <form onSubmit={(e) => e.preventDefault()}>
            <label className='cursor-pointer flex items-center gap-4 mt-2 mb-5'>
              <div className='grid place-content-center w-14 h-14 rounded-2xl bg-white/[.08]'>
                <input
                  onChange={(e: any) =>
                    userStore.saveUser({
                      copyBasic: { ...userStore.copyBasic, image: e.target.files[0] },
                    })
                  }
                  accept='image/*'
                  type='file'
                  className='hidden'
                />
                {!userStore.copyBasic.image ? (
                  <BsPlusLg className='w-7 h-7' />
                ) : (
                  <Image
                    height={56}
                    width={56}
                    layout='fixed'
                    className='rounded-2xl w-14 h-14'
                    src={
                      typeof userStore.copyBasic.image === 'string'
                        ? userStore.copyBasic.image
                        : URL.createObjectURL(userStore.copyBasic.image)
                    }
                    alt='Profile'
                  />
                )}
              </div>
              <span className='text-white'>Add image</span>
            </label>
            <form className='flex flex-col gap-4'>
              <Label id='name' title='Display name'>
                <input
                  id='name'
                  type='text'
                  className={requiredClass}
                  minLength={6}
                  value={userStore.copyBasic.name}
                  onChange={(e) =>
                    userStore.saveUser({
                      copyBasic: { ...userStore.copyBasic, name: e.target.value },
                    })
                  }
                  placeholder='Enter name'
                />
              </Label>
              <Label id='gender' title='Gender'>
                <select
                  id='gender'
                  value={userStore.copyBasic.gender}
                  onChange={(e) =>
                    userStore.saveUser({
                      copyBasic: { ...userStore.copyBasic, gender: e.target.value },
                    })
                  }
                  className={`${requiredClass}
                   ${!userStore.copyBasic.gender && 'text-white/30'} py-2 px-0`}
                >
                  <option value='' className='hidden' disabled selected>
                    Select Gender
                  </option>
                  {['male', 'female'].map((gender) => (
                    <option
                      key={gender}
                      className='font-medium capitalize font-sans text-black'
                      value={gender}
                    >
                      {gender}
                    </option>
                  ))}
                </select>
              </Label>
              <Label id='birthday' title='Birthday'>
                <input
                  id='birthday'
                  type='text'
                  className={requiredClass}
                  minLength={10}
                  maxLength={10}
                  value={userStore.copyBasic.birthday}
                  onChange={(e) =>
                    userStore.saveUser({
                      copyBasic: { ...userStore.copyBasic, birthday: e.target.value },
                    })
                  }
                  placeholder='DD MM YYYY'
                />
              </Label>
              <Label id='zodiac' title='Zodiac'>
                <select
                  id='zodiac'
                  value={userStore.copyBasic.zodiac}
                  onChange={(e) =>
                    userStore.saveUser({
                      copyBasic: { ...userStore.copyBasic, zodiac: e.target.value },
                    })
                  }
                  className={`${requiredClass} 
                  ${!userStore.copyBasic.zodiac && 'text-white/30'} py-2 px-0`}
                >
                  <option value='' className='hidden' disabled selected>
                    Select Zodiac
                  </option>
                  {zodiacs.map((zodiac) => (
                    <option
                      key={zodiac}
                      className='font-medium capitalize font-sans text-black'
                      value={zodiac}
                    >
                      {zodiac}
                    </option>
                  ))}
                </select>
              </Label>
              <Label id='height' title='Height'>
                <input
                  id='height'
                  type='text'
                  className={requiredClass}
                  value={userStore.copyBasic.height ? `${userStore.copyBasic.height} cm` : ''}
                  placeholder='Add Height'
                  onChange={(e) => {
                    const value = e.target.value

                    const isDeleting = !value.includes('cm')
                    const replace = value.replace(/\D/g, '')

                    const newValue =
                      !isDeleting || value.length === 1 ? replace : replace.slice(0, -1)

                    userStore.saveUser({ copyBasic: { ...userStore.copyBasic, height: newValue } })
                  }}
                />
              </Label>
              <Label id='weight' title='Weight'>
                <input
                  id='weight'
                  type='text'
                  className={requiredClass}
                  value={userStore.copyBasic.weight ? `${userStore.copyBasic.weight} kg` : ''}
                  placeholder='Add Weight'
                  onChange={(e) => {
                    const value = e.target.value

                    const isDeleting = !value.includes('kg')
                    const replace = value.replace(/\D/g, '')

                    const newValue =
                      !isDeleting || value.length === 1 ? replace : replace.slice(0, -1)

                    userStore.saveUser({ copyBasic: { ...userStore.copyBasic, weight: newValue } })
                  }}
                />
              </Label>
            </form>
          </form>
        )}
      </div>
    </Box>
  )
}

const AboutList = ({ title, value }: { title: string; value: string }) => {
  return (
    <div>
      <span className='text-white/30 pr-1.5'>{title}:</span>
      <span className='text-white'>{value}</span>
    </div>
  )
}
