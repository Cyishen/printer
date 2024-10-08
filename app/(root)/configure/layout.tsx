import Steps from "@/components/Steps";
import Wrapper from "@/components/Wrapper";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Printer design",
  description: "Printer design",
  icons: {
    icon: "/say.png"
  },
};

type Props = {
  children: React.ReactNode
}

const layout = ({ children }: Props ) => {
  return (
    <Wrapper className='flex-1 flex flex-col'>
      <Steps />
      {children}
    </Wrapper>
  )
}

export default layout
