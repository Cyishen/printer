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
    <>
      {children}
    </>
  )
}

export default layout