import Phone from "@/components/Phone";
import { Reviews } from "@/components/Reviews";
import { Button } from "@/components/ui/button";
import Wrapper from "@/components/Wrapper";

import { Star, CheckCheck, Check } from 'lucide-react'
import Link from "next/link";


export default function Home() {

  return (
    <>
      <section>
        <Wrapper className='pb-24 pt-10 lg:grid lg:grid-cols-3 sm:pb-32 lg:pt-24 xl:pt-32 lg:pb-52'>
          <div className='col-span-2 px-6 lg:px-0 lg:pt-4'>
            <div className='relative mx-auto text-center lg:text-left flex flex-col items-center lg:items-start'>
              <div className='absolute w-28 right-0 top-20 hidden lg:block'>
                <img src='/magic.png' className='w-full ' alt="" />
              </div>
              <h1 className='relative w-fit tracking-tight text-balance mt-16 font-bold !leading-tight text-5xl md:text-6xl lg:text-7xl'>
                Transform Your Photos into Unique Products
              </h1>

              <p className='mt-8 text-lg lg:pr-10 max-w-prose text-center lg:text-left text-balance md:text-wrap'>
                Print Your Personality onto Products, Each One Unique
              </p>

              <ul className='mt-8 space-y-2 text-left font-medium flex flex-col items-center sm:items-start'>
                <div className='space-y-2'>
                  <li className='flex gap-1.5 items-center text-left'>
                    <CheckCheck className='h-5 w-5 shrink-0 text-green-600' />
                    High-quality, durable material
                  </li>
                  <li className='flex gap-1.5 items-center text-left'>
                    <CheckCheck className='h-5 w-5 shrink-0 text-green-600' />
                    5 year print guarantee
                  </li>
                  <li className='flex gap-1.5 items-center text-left'>
                    <CheckCheck className='h-5 w-5 shrink-0 text-green-600' />
                    Modern iPhone models supported
                  </li>
                </div>
              </ul>

              <div className='mt-12 flex flex-col sm:flex-row items-center sm:items-start gap-5'>
                <div className='flex -space-x-4'>
                  <img
                    className='inline-block h-10 w-10 rounded-full ring-2 ring-slate-100'
                    src='/users/user-1.jpeg'
                    alt='user image'
                  />
                  <img
                    className='inline-block h-10 w-10 rounded-full ring-2 ring-slate-100'
                    src='/users/user-2.jpeg'
                    alt='user image'
                  />
                  <img
                    className='inline-block h-10 w-10 rounded-full ring-2 ring-slate-100'
                    src='/users/user-3.jpeg'
                    alt='user image'
                  />
                  <img
                    className='inline-block h-10 w-10 rounded-full ring-2 ring-slate-100'
                    src='/users/user-4.jpeg'
                    alt='user image'
                  />
                  <img
                    className='inline-block object-cover h-10 w-10 rounded-full ring-2 ring-slate-100'
                    src='/users/user-5.jpeg'
                    alt='user image'
                  />
                </div>

                <div className='flex flex-col justify-between items-center sm:items-start'>
                  <div className='flex gap-0.5'>
                    <Star className='h-4 w-4 text-star-2 fill-star-2' />
                    <Star className='h-4 w-4 text-star-2 fill-star-2' />
                    <Star className='h-4 w-4 text-star-2 fill-star-2' />
                    <Star className='h-4 w-4 text-star-2 fill-star-2' />
                    <Star className='h-4 w-4 text-star-2 fill-star-2' />
                  </div>

                  <p>
                    <span className='font-semibold'>614</span> happy customers
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className='col-span-full lg:col-span-1 w-full flex justify-center px-8 sm:px-16 md:px-0 mt-32 lg:mx-0 lg:mt-20 h-fit'>
            <div className='relative md:max-w-xl sm:rotate-12 '>
              <img
                src='/your-image.png'
                alt=""
                className='absolute w-24 sm:w-36 lg:w-48 left-44 -top-20 sm:left-32 sm:-top-32 select-none sm:-rotate-12'
              />
              <img
                src='/line.png'
                alt=""
                className='absolute w-20 -left-6 -bottom-6 select-none'
              />

              <Phone className='w-56' imgSrc='/template/mc_phone.jpg'/>
            </div>
          </div>
        </Wrapper>
      </section>

      <section className='bg-slate-100 grainy-dark py-24'>
        <Wrapper className='flex flex-col items-center gap-16 sm:gap-32'>
          <div className='flex flex-col lg:flex-row items-center gap-4 sm:gap-6'>
            <h2 className='order-1 mt-2 tracking-tight text-center text-balance !leading-tight font-bold text-5xl md:text-6xl text-gray-900'>
              What our customers say
            </h2>

            <img src='/say.png' className='w-24 order-0 lg:order-2' alt="none" />
          </div>

          <div className='mx-auto grid max-w-2xl grid-cols-1 px-4 lg:mx-0 lg:max-w-none lg:grid-cols-2 gap-y-16'>
            <div className='flex flex-auto flex-col gap-4 lg:pr-8 xl:pr-20'>
              <div className='flex gap-0.5 mb-2'>
                <Star className='h-5 w-5 text-star-2 fill-star-2' />
                <Star className='h-5 w-5 text-star-2 fill-star-2' />
                <Star className='h-5 w-5 text-star-2 fill-star-2' />
                <Star className='h-5 w-5 text-star-2 fill-star-2' />
                <Star className='h-5 w-5 text-star-2 fill-star-2' />
              </div>
              <div className='text-lg leading-8'>
                <p>
                  "The quality is amazing! I uploaded my favorite photo and it looks stunning on the product. The colors are vibrant, and the image is crystal clear. It's been a few months now and the print still looks perfect. Absolutely love it! 🥰"
                </p>
              </div>
              <div className='flex gap-4 mt-2'>
                <img
                  className='rounded-full h-12 w-12 object-cover'
                  src='/users/user-7.jpeg'
                  alt='user'
                />
                <div className='flex flex-col'>
                  <p className='font-semibold'>haein</p>
                  <div className='flex gap-1.5 items-center text-zinc-600'>
                    <CheckCheck className='h-4 w-4 stroke-[3px] text-green-600' />
                    <p className='text-sm'>Verified Purchase</p>
                  </div>
                </div>
              </div>
            </div>

            {/* second user review */}
            <div className='flex flex-auto flex-col gap-4 lg:pr-8 xl:pr-20'>
              <div className='flex gap-0.5 mb-2'>
                <Star className='h-5 w-5 text-star-2 fill-star-2' />
                <Star className='h-5 w-5 text-star-2 fill-star-2' />
                <Star className='h-5 w-5 text-star-2 fill-star-2' />
                <Star className='h-5 w-5 text-star-2 fill-star-2' />
                <Star className='h-5 w-5 text-star-2 fill-star-2' />
              </div>
              <div className='text-lg leading-8'>
                <p>
                  "The custom print came out fantastic! The image quality is sharp and the colors really pop. I've been using it for a few months and the print still looks as good as new. Really impressed with the durability and detail. Highly recommend it! 👍"
                </p>
              </div>
              <div className='flex gap-4 mt-2'>
                <img
                  className='rounded-full h-12 w-12 object-cover'
                  src='/users/user-6.jpeg'
                  alt='user'
                />
                <div className='flex flex-col'>
                  <p className='font-semibold'>hyunwoo</p>
                  <div className='flex gap-1.5 items-center text-zinc-600'>
                    <CheckCheck className='h-4 w-4 stroke-[3px] text-green-600' />
                    <p className='text-sm'>Verified Purchase</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Wrapper>

        <div className='pt-16'>
          <Reviews />
        </div>
      </section>

      <section>
        <Wrapper className='py-24'>
          <div className='mb-12 px-6 lg:px-8'>
            <div className='mx-auto max-w-2xl sm:text-center'>
              <h2 className='order-1 mt-2 tracking-tight text-center text-balance !leading-tight font-bold text-5xl md:text-6xl text-gray-900'>
                Upload your photo and get&nbsp;
                <span className='relative px-2 bg-green-600 text-white'>
                  your own
                </span>
                &nbsp;now
              </h2>
            </div>
          </div>

          <div className='mx-auto max-w-6xl px-6 lg:px-8'>
            <div className='relative flex flex-col items-center md:grid grid-cols-2 gap-40'>
              <img
                src='/arrow.png'
                className='absolute top-[25rem] md:top-1/2 -translate-y-1/2 z-10 left-1/2 -translate-x-1/2 rotate-90 md:rotate-0'
                alt=""
              />

              <div className='relative h-80 md:h-full w-full md:justify-self-end max-w-sm rounded-xl bg-gray-900/5 ring-inset ring-gray-900/10 lg:rounded-2xl'>
                <img
                  src='/users/user-7.jpeg'
                  className='rounded-md object-cover bg-white shadow-2xl ring-1 ring-gray-900/10 h-full w-full'
                  alt=""
                />
              </div>

              <Phone className='w-60' imgSrc='/template/haein_phone.jpg' />
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between space-x-8">
            <ul className='mt-12 max-w-prose sm:text-lg space-y-2 w-fit'>
              <li className='w-fit'>
                <Check className='h-5 w-5 text-green-600 inline mr-1.5' />
                High-quality silicone material
              </li>
              <li className='w-fit'>
                <Check className='h-5 w-5 text-green-600 inline mr-1.5' />
                Scratch and fingerprint resistant coating
              </li>
              <li className='w-fit'>
                <Check className='h-5 w-5 text-green-600 inline mr-1.5' />
                5 year print warranty
              </li>
            </ul>

            <div className='mt-12'>
              <Link href='/configure/upload'>
                <Button size="lg">
                  Create now
                </Button>
              </Link>
            </div>
          </div>
        </Wrapper>
      </section>
    </>
  );
}
