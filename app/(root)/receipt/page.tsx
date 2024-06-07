import ReceiptPage from "./receipt"
import { Suspense } from 'react'

const Page = () => {

  return (
    <Suspense fallback={<div>Loading...</div>}>    
      <ReceiptPage />
    </Suspense>
  )
}

export default Page