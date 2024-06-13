import { cn } from '@/lib/utils'
import { HTMLAttributes } from 'react'

interface PhoneProps extends HTMLAttributes<HTMLDivElement> {
  imgSrc: string
  dark?: boolean
}

const TShirt = ({ imgSrc, dark = false, className, ...props }: PhoneProps) => {
  return (
    <div
      className={cn(
        'relative pointer-events-none z-50 overflow-hidden',
        className
      )}
      {...props}
    >
      <img
        src={
          dark
            ? '/t-shirt-template.png'
            : '/t-shirt-template.png'
        }
        className='pointer-events-none z-50 select-none'
        alt='phone frame'
      />

      <div className='absolute -z-10 inset-0'>
        <img
          className='object-cover min-w-full min-h-full' 
          src={imgSrc}
          alt='display image'
        />
      </div>
    </div>
  )
}

export default TShirt
