import { getUserOrders } from "@/actions/user.actions"
import OrdersClient from "./OrdersClient"

const OrderPage = async () => {

  const orders = await getUserOrders()


  return (
    <OrdersClient order={orders}/>
  )
}

export default OrderPage