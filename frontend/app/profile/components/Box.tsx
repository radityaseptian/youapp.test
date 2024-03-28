import { BiEditAlt } from 'react-icons/bi'

interface BoxProps {
  children: React.ReactNode
  title: string
  onClick: () => void
  openUpdate?: boolean
}

const Box: React.FC<BoxProps> = ({ children, onClick, title, openUpdate = false }) => {
  return (
    <div className='bg-[#0E191F] text-white relative rounded-[14px] pb-5 pt-[.815rem] pl-[1.6875rem] pr-4'>
      <div className='pb-4'>{title}</div>

      <button
        type='button'
        onClick={onClick}
        className={`${!openUpdate ? 'top-2 right-3' : 'top-3 right-4'} absolute`}
      >
        {!openUpdate ? (
          <BiEditAlt className='text-xl' />
        ) : (
          <span className='text-gradient-custom text-sm'>Save & Update</span>
        )}
      </button>

      {children}
    </div>
  )
}

export default Box
