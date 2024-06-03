import { getPaymentStatus } from "@/actions/user.actions"
import OrdersClient from "./OrdersClient"

const OrderPage = async () => {

  const orders = await getPaymentStatus()


  return (
    <OrdersClient order={orders}/>
  )
}

export default OrderPage