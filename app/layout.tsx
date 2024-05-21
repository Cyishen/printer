import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

import { ClerkProvider } from '@clerk/nextjs'
import { zhTW } from "@/lib/zh-TW";
import { zhCN } from "@clerk/localizations";

import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "phone case design",
  description: "phone case design",
  icons: {
    icon: "/snake-1.png"
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider localization={zhTW}>
      <html lang="en">
        <body className={inter.className}>
          <Navbar />

          <main className='flex flex-col min-h-[calc(100vh-3.5rem-1px)]'>
            <div className='flex-1 flex flex-col h-full'>
              {children}
            </div>
          </main>

          <Footer />

          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
