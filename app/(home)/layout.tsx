import Wrapper from "@/components/Wrapper";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "phone case design",
  description: "phone case design",
  icons: {
    icon: "/say.png"
  },
};

type Props = {
  children: React.ReactNode
}

const layout = ({ children }: Props ) => {
  return (
    <>
      {children}
    </>
  )
}

export default layout