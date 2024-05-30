'use client'

import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import { ImagePlus, WandSparkles, Truck } from 'lucide-react';

const STEPS = [
  {
    name: 'Step 1: Add image',
    description: 'Choose an image',
    url: '/upload',
  },
  {
    name: 'Step 2: Customize design',
    description: 'Mockup',
    url: '/design',
  },
  {
    name: 'Step 3: Preview',
    description: 'Review your final design',
    url: '/preview',
  },
]

const Steps = () => {
  const pathname = usePathname()
  const icons = [ImagePlus, WandSparkles, Truck];

  return (
    <ol className='lg:flex bg-white'>
      {STEPS.map((step, i) => {
        
        const isCurrent = pathname.endsWith(step.url)

        const isCompleted = STEPS.slice(i + 1).some((step) =>
          pathname.endsWith(step.url)
        )

        const IconComponent = icons[i];

        return (
          <li key={step.name} className='relative overflow-hidden lg:flex-1'>
            <div>
              <span
                className={cn(
                  'absolute left-0 top-0 h-full w-1 bg-zinc-400 lg:bottom-0 lg:top-auto lg:h-1 lg:w-full',
                  {
                    'bg-green-300': isCurrent,
                    'bg-gray-100': isCompleted,
                  }
                )}
                aria-hidden='true'
              />

              <span
                className={cn(
                  i !== 0 ? 'lg:pl-9' : '',
                  'flex items-center px-6 py-4 text-sm font-medium',
                )}
              >
                <span className='flex-shrink-0'>
                  <span
                    className={cn(
                      'flex h-20 w-20 object-contain items-center justify-center',
                      {
                        'bg-gray-100': isCurrent,
                      }
                    )}
                  >
                    <IconComponent className='w-full h-full p-5'/>
                  </span>
                </span>

                <span className='ml-4 h-full mt-0.5 flex min-w-0 flex-col justify-center'>
                  <span
                    className={cn('text-sm font-semibold text-zinc-700', {
                      'text-primary': isCompleted,
                      'text-green-600': isCurrent,
                    })}>
                    {step.name}
                  </span>
                  
                  <span className='text-sm text-zinc-500 font-extralight'>
                    {step.description}
                  </span>
                </span>
              </span>

              {/* separator */}
              {i !== 0 ? (
                <div className='absolute inset-0 hidden w-3 lg:block'>
                  <svg
                    className='h-full w-full text-gray-300'
                    viewBox='0 0 12 82'
                    fill='none'
                    preserveAspectRatio='none'>
                    <path
                      d='M0.5 0V31L10.5 41L0.5 51V82'
                      stroke='currentcolor'
                      vectorEffect='non-scaling-stroke'
                    />
                  </svg>
                </div>
              ) : null}
            </div>
          </li>
        )
      })}
    </ol>
  )
}

export default Steps
