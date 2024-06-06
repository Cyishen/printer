"use client"

import Phone from "@/components/Phone"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CheckCheck, Truck } from 'lucide-react'
import { Progress } from '@/components/ui/progress'

import { Order, Configuration, User} from "@/db/schema";
import { deleteOrder } from "@/actions/user.actions"
import { useMutation } from '@tanstack/react-query';


type OrderWithRelations = (typeof Order.$inferSelect & {
  configuration: typeof Configuration.$inferSelect;
  user: typeof User.$inferSelect;
});

type Props = {
  order: OrderWithRelations[]
}

const OrdersClient = ({ order }: Props) => {
  const { mutate: removeOrder } = useMutation({
    mutationKey: ['delete'],
    mutationFn: deleteOrder,
    onError: () => {
      console.error("Error deleting order")
    },
    onSuccess: () => {
      console.log("Success to delete")
    },
  })

  const handleDelete = (configurationId: string) => {
    removeOrder(configurationId);
  };

  const statusProgressMap = {
    awaiting_shipment: 33,
    shipped: 66,
    delivered: 100,
  };

  return (
    <div className="flex justify-center mx-auto max-w-6xl w-full">
      <div className="flex flex-col w-full sm:p-16">
        <h1 className="p-5 font-medium text-2xl">訂單 <span>({order?.length})</span></h1>

        {order.length > 0 ? (
          order.map((order) => {
            const { id, amount, status, configuration, isPaid, configurationId } = order;
            const { color, model, material, finish, croppedImageUrl } = configuration;

            return (
              <div key={id} className="mb-10 border sm:rounded-2xl p-5 shadow-lg">
                <div className="flex justify-between">
                  <p>訂單ID: {id}</p>
                  <p>金額 ${amount.slice(0,-3)}</p>
                </div>
                
                <div className='h-px w-full bg-black mb-10' />

                <div className="flex flex-col sm:justify-between">
                  <div className="flex items-center gap-10">
                    <div className="min-w-40">
                      <p>顏色: {color}</p>
                      <p>型號: {model}</p>
                      <p>材質: {material}</p>
                      <p>表面處理: {finish}</p>
                    </div>

                    <div className="w-20" 
                      style={{ backgroundColor: color! }}
                    >
                      <Phone imgSrc={croppedImageUrl!}/>
                    </div>
                  </div>

                  <div className="flex flex-col items-start sm:items-end mt-5">
                    <p>商品進度</p>

                    <div className="flex">
                      {isPaid ? (
                        status === "awaiting_shipment" ? (
                          <p>物流處理中...</p>
                        ) : status === "shipped" ? (
                          <p className="flex gap-2"><span><Truck /></span>商品運送中...</p>
                        ) : status === "delivered" ? (
                          <p>商品已送達</p>
                        ) : null
                      ) : (
                        <p>等待付款</p>
                      )}
                    </div>

                    {isPaid && (
                      <div>
                        <Progress
                          value={statusProgressMap[status] ?? 33}
                          className='mt-2 w-40 h-2 bg-gray-300'
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-end gap-5 mt-5">
                  {!isPaid && (
                    <Button 
                      variant="destructive" 
                      onClick={() => handleDelete(configurationId)}
                    >
                      刪除訂單
                    </Button>
                  )}

                  {isPaid === true ?(
                    <Button variant="ghost" className="gap-3">
                      <span>
                        <CheckCheck className='h-5 w-5 shrink-0 text-green-600' />
                      </span>
                      已付款
                    </Button>
                  ):(
                    <Link href={`/configure/preview?id=${configurationId}`}>
                      <Button variant="outline">
                        付款 GO
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="border rounded-xl bg-gray-100 p-5">
            <p>目前沒有訂單</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default OrdersClient