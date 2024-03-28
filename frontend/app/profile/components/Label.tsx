type LabelProps = {
  title: string
  id: string
  children: React.ReactNode
}

const Label: React.FC<LabelProps> = ({ id, title, children }) => {
  return (
    <label htmlFor={id} className='flex items-center placeholder:text-white/30'>
      <div className='flex-1'>{title}:</div>
      {children}
    </label>
  )
}

export default Label
