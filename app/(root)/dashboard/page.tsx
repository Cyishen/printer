import { getAdminOrders } from "@/actions/user.actions"
import Admin from "./Admin"


const Dashboard = async () => {
  const orders = await getAdminOrders()

  return (
    <Admin orders={orders}/>
  )
}

export default Dashboard