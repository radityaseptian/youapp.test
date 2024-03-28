export default function Button({ text, isFilled }: { text: string; isFilled: boolean }) {
  return (
    <button
      type={!isFilled ? 'button' : 'submit'}
      className={`w-full rounded-md py-2.5 bg-gradient-to-r from-[#62CDCB] to-[#4599DB] 
      ${isFilled ? 'shadow-lg shadow-[#62CDCB]/40 ' : 'opacity-30'} `}
    >
      {text}
    </button>
  )
}
