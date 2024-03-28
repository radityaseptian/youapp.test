import { LiaEyeSolid, LiaEyeSlashSolid } from 'react-icons/lia'

interface InputProps {
  value: string
  onChange: (newValue: string) => void
  placeholder: string
  type?: string
  autuFocus?: boolean
  changeInputType?: () => void
}

const Input: React.FC<InputProps> = ({
  value,
  onChange,
  placeholder = '',
  type = 'text',
  autuFocus = false,
  changeInputType,
}) => {
  return (
    <div className='relative'>
      <input
        autoFocus={autuFocus}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full rounded-md px-4 py-2.5 bg-white/[0.06] placeholder:text-white/40 text-white 
        ${changeInputType && 'pr-12'}`}
      />

      {changeInputType && (
        <button onClick={changeInputType} type='button' className='absolute text-xl right-4 top-3'>
          {type === 'text' ? <LiaEyeSolid /> : <LiaEyeSlashSolid />}
        </button>
      )}
    </div>
  )
}

export default Input
