'use client'


import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'

import { useMutation } from '@tanstack/react-query'
import { Check, ChevronsUpDown } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { changeOrderStatus, ChangeOrderStatusProps } from '@/actions/user.actions'


const OrderStatusEnum = {
  AwaitingShipment: "awaiting_shipment",
  Shipped: "shipped",
  Delivered: "delivered",
} as const;
// OrderStatusValue 的值 = 從 OrderStatusEnum [所有鍵keyof提供]
type OrderStatusValue = typeof OrderStatusEnum[keyof typeof OrderStatusEnum];
// 建立obj, 把OrderStatusEnum 值當作鍵
const LABEL_MAP: Record<OrderStatusValue, string> = {
  [OrderStatusEnum.AwaitingShipment]: '物流處理中',
  [OrderStatusEnum.Shipped]: '運送中',
  [OrderStatusEnum.Delivered]: '已送達',
};
console.log(LABEL_MAP)

const StatusDropdown = ({ config, newStatus }: ChangeOrderStatusProps ) => {
  const router = useRouter()

  const { mutate } = useMutation({
    mutationKey: ['change-order-status'],
    mutationFn: changeOrderStatus,
    onSuccess: () => router.refresh(),
  })

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='outline'
          className='w-52 flex justify-between items-center'
        >
          {LABEL_MAP[newStatus]}
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0' />
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent className='p-0'>
        {Object.values(OrderStatusEnum).map((status) => (
          <DropdownMenuItem
            key={status}
            className={cn(
              'flex text-sm gap-1 items-center p-2.5 cursor-default hover:bg-zinc-100',
              {
                'bg-zinc-200': newStatus === status,
              }
            )}
            onClick={() => mutate({ config, newStatus: status as OrderStatusValue })}>
            
            <Check
              className={cn(
                'mr-2 h-4 w-4 text-green-600',
                newStatus === status ? 'opacity-100' : 'opacity-0'
              )}
            />
            {LABEL_MAP[status as OrderStatusValue]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default StatusDropdown
