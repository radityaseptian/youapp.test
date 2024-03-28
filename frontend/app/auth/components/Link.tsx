import Link from 'next/link'

const LinkAuth = ({ text, href }: { text: string; href: string }) => {
  return (
    <Link
      href={`/auth/${href}`}
      className='text-gradient-custom underline'
    >
      {text}
    </Link>
  )
}

export default LinkAuth
