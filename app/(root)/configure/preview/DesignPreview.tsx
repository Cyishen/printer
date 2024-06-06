"use client"

import { Configuration } from "@/db/schema"
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

import { cn, CurrencyProps, getPriceWithLocale } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ArrowRight, Check, Truck } from 'lucide-react'
import Phone from "@/components/Phone";

import { COLORS, MODELS } from "@/validators/option-validator";
import { BASE_PRICE, PRODUCT_PRICES } from "@/config/products";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useUser, SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";

import { useMutation } from '@tanstack/react-query'
import { createCheckoutSession } from "@/actions/user.actions";


type Props = {
  configuration: typeof Configuration.$inferSelect
}

const DesignPreview = ({ configuration }: Props) => {
  const existingUser = useUser()

  const router = useRouter()
  const { toast } = useToast()

  const { width, height } = useWindowSize();

  // 顯示不同幣別
  const [userLocale, setUserLocale] = useState<string>('en-US');
  const [userCurrency, setUserCurrency] = useState<CurrencyProps>('USD');

  useEffect(() => {
    const locale = navigator.language || 'en-US';
    setUserLocale(locale);

    if (locale === 'zh-TW') {
      setUserCurrency('TWD');
    } else if (locale === 'en-US') {
      setUserCurrency('USD');
    }
  }, []);

  const { id } = configuration

  const color = COLORS.find(c => c.value === configuration.color)
  const { label } = MODELS.options.find(({ value }) => value === configuration.model) || {}

  // PRICE
  let totalPrice = BASE_PRICE

  if (configuration.material === 'polycarbonate') 
    totalPrice += PRODUCT_PRICES.material.polycarbonate

  if (configuration.finish === 'textured') totalPrice += PRODUCT_PRICES.finish.textured

  // CHECKOUT 
  const { mutate: createPaymentSession, isPending } = useMutation({
    mutationKey: ['get-checkout-session'],
    mutationFn: createCheckoutSession,
    onSuccess: ({ url }) => {
      if (url) router.push(url)
      else throw new Error('Unable to retrieve payment URL')
    },
    onError: () => {
      toast({
        title: 'Payment failed',
        description: 'There was an error. Please try again',
        variant: 'destructive',
      })
    },
  })

  const handleCheckout = () => {
    if (existingUser.user) {
      createPaymentSession({ configId: id })
    } else {
      localStorage.setItem('configurationId', id)
    }
  }

  return (
    <>
      <Confetti
        width={width}
        height={height}
        recycle={false}
        numberOfPieces={500}
        tweenDuration={10000}
      />

      <div className='mt-20 flex flex-col items-center md:grid text-sm sm:grid-cols-12 sm:grid-rows-1 sm:gap-x-6 md:gap-x-8 lg:gap-x-12'>
        <div className='md:col-span-4 lg:col-span-3 md:row-span-2 md:row-end-2'>
          <Phone
            style={{ backgroundColor: color?.color }}
            className="max-w-[150px] md:max-w-full"
            imgSrc={configuration.croppedImageUrl!}
          />
        </div>

        <div className='sm:col-span-9 md:row-end-1 mt-6'>
          <h3 className='text-3xl font-bold'>
            Your <span style={{ color: color?.color }}>{label}</span> Case
          </h3>
          <div className='mt-3 flex items-center gap-1.5 text-base'>
            <Truck className='h-4 w-4 text-green-500' />
            In stock and ready to ship
          </div>
        </div>

        <div className='sm:col-span-12 md:col-span-9 text-base'>
          <div className='grid grid-cols-1 gap-y-8 border-b border-gray-200 py-8 sm:grid-cols-2 sm:gap-x-6 sm:py-6 md:py-10'>
            <div>
              <p className='font-medium text-zinc-950'>Highlights</p>
              <ol className='mt-3 text-zinc-700 list-disc list-inside'>
                <li>Packaging made from recycled materials</li>
                <li>5 year print warranty</li>
              </ol>
            </div>
            <div>
              <p className='font-medium text-zinc-950'>Materials</p>
              <ol className='mt-3 text-zinc-700 list-disc list-inside'>
                <li>High-quality, durable material</li>
                <li>Scratch and fingerprint resistant coating</li>
              </ol>
            </div>
          </div>

          <div className='mt-8'>
            <div className='bg-gray-50 p-6 sm:rounded-lg sm:p-8'>
              <div className='flow-root text-sm'>
                <div>
                  <p className="text-xl">商品詳細 Detail</p>
                </div>

                <div className='my-2 h-px bg-gray-200' />

                <div className='preview-check'>
                  <p>保護殼</p>
                  <p className='font-medium text-gray-900'>
                    {BASE_PRICE}
                  </p>
                </div>

                {configuration.material === 'polycarbonate' ? (
                  <div className='preview-check'>
                    <p>材質/ PC</p>
                    <p className='font-medium'>
                      + {PRODUCT_PRICES.material.polycarbonate}
                    </p>
                  </div>
                ) : (
                  <div className='preview-check'>
                    <p>材質: 矽膠</p>
                  </div>
                )}

                {configuration.finish === 'textured' ? (
                  <div className='preview-check'>
                    <p>表面/ 磨砂 Textured</p>
                    <p className='font-medium'>
                      + {PRODUCT_PRICES.finish.textured}
                    </p>
                  </div>
                ) : (
                  <div className='preview-check'>
                    <p>表面: 光滑 Smooth</p>
                  </div>
                )}

                <div className='my-2 h-px bg-gray-200' />

                <div className='flex items-center justify-between py-2'>
                  <p className='font-semibold'>金額 Total</p>
                  <p className='font-semibold'>
                    {getPriceWithLocale(totalPrice, userLocale, userCurrency)}
                  </p>
                </div>
              </div>
            </div>

            <div className='mt-8 flex flex-col gap-6 sm:flex-row justify-between pb-12'>
              <Button 
                variant="outline" 
                onClick={()=>router.push(`/configure/design?id=${id}`)}
              >
                修改
              </Button>

              <SignedIn>
                <Button
                  disabled={isPending}
                  onClick={() => handleCheckout()}
                >
                  Check out 
                  <ArrowRight className='h-4 w-4 ml-1.5 inline' />
                </Button>
              </SignedIn>

              <SignedOut>
                <SignInButton
                  mode="modal"
                >
                  <Button 
                    variant="secondary" 
                    onClick={() => handleCheckout()}
                  >
                    Check out 
                    <ArrowRight className='h-4 w-4 ml-1.5 inline' />
                  </Button>
                </SignInButton>
              </SignedOut>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DesignPreview