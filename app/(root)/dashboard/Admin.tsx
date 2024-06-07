"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from '@/components/ui/table'
import { Order, Configuration, User} from "@/db/schema";

import { useEffect, useState } from 'react';
import { CurrencyProps, getPriceWithLocale } from "@/lib/utils";
import StatusDropdown from './StatusDropdown';


type OrderWithRelations = (typeof Order.$inferSelect & {
  configuration: typeof Configuration.$inferSelect;
  user: typeof User.$inferSelect;
});

type Props = {
  orders: OrderWithRelations[]
}

const Admin = ({ orders }: Props) => {
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

  return (
    <div className="flex justify-center mx-auto max-w-6xl w-full">
      <div className="flex flex-col w-full sm:p-16">
        <h1 className='p-5 font-medium text-2xl'>Orders</h1>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Purchase date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Pay</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id} 
                className={order.status === "delivered" ? "bg-gray-200 text-gray-400" : ""}>
                <TableCell>
                  {order.user.email}
                </TableCell>

                <TableCell>
                  <StatusDropdown 
                    config={order.configurationId} 
                    newStatus={order.status} 
                  />
                </TableCell>
                
                <TableCell className='flex flex-col'>
                  <p>
                    {order.createdAt?.toLocaleDateString()}
                  </p>
                  <p>
                    {order.createdAt?.toLocaleTimeString()}
                  </p>
                </TableCell>
                <TableCell>
                  {getPriceWithLocale(parseFloat(order.amount), userLocale, userCurrency)}
                </TableCell>

                <TableCell>
                  {order.isPaid === true ? "已付款" : "等待付款"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default Admin