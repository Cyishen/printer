import { getAllOrders } from "@/actions/user.actions"
import Admin from "./Admin"


const Dashboard = async () => {
  const orders = await getAllOrders()

  return (
    <Admin orders={orders}/>
  )
}

export default Dashboard