"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useSearchParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { getReceipt } from "@/actions/user.actions"

const ReceiptPage = () => {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('orderId') || ''

  const { data } = useQuery({
    queryKey: ['get-payment-status'],
    queryFn: async () => await getReceipt({ orderId }),
    retry: true,
    retryDelay: 500,
  })

  if (data === undefined) {
    return (
      <div className='w-full mt-24 flex justify-center'>
        <div className='flex flex-col items-center gap-2'>
          <h3 className='font-semibold text-xl'>Loading your Order Receipt</h3>
          <p>This won't take long.</p>
        </div>
      </div>
    )
  }

  if (data === null) {
    return (
      <div className='w-full mt-24 flex justify-center'>
        <div className='flex flex-col items-center gap-2'>
          <h3 className='font-semibold text-xl'>Verifying your payment...</h3>
          <p>This might take a moment.</p>
        </div>
      </div>
    )
  }


  return (
    <div className="flex justify-center mx-auto max-w-xl w-full">
      <div className="flex flex-col w-full p-4 sm:p-16">
        <div className="flex flex-col justify-center w-full border rounded-xl mt-20">
          <h1 className="font-medium text-lg flex justify-center bg-gray-100 text-gray-400 rounded-t-xl p-3">付款完成</h1>

          <h2 className="flex mx-auto font-bold text-4xl mt-10">NT$ {data.amount}</h2>

          <div className="flex flex-col p-5 mt-10 gap-3">
            <div className="flex justify-between">
              <p className="text-gray-400">付款日期</p>
              <p>{data.createdAt?.toLocaleDateString()} {data.createdAt?.toLocaleTimeString()}</p>
            </div>

            <div className="flex justify-between">
              <p className="text-gray-400">商品</p>
              <p>{data.configuration?.model}</p>
            </div>
          </div>

          <Link href="/" className="p-5 w-full">
            <Button className="bg-green-500 w-full">
              確認
            </Button>
          </Link>
        </div>
      </div>

    </div>
  )
}

export default ReceiptPage