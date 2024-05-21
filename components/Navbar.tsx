import Link from 'next/link'
import { Button } from './ui/button'
import Wrapper from './Wrapper'

import { Loader } from "lucide-react";
import { 
  ClerkLoaded, 
  ClerkLoading,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";

const Navbar = async () => {

  // const isAdmin = user?.email === process.env.ADMIN_EMAIL

  return (
    <nav className='sticky z-[100] h-14 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all'>
      <Wrapper>
        <div className='flex h-14 items-center justify-between border-b border-zinc-200'>
          <Link href='/' className='flex z-40 font-semibold'>
            Phone<span className='text-green-600'>Case</span>
          </Link>

          <div className='flex items-center space-x-4'>
            <ClerkLoading>
              <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
            </ClerkLoading>

            <ClerkLoaded>
              <SignedIn>
                <UserButton
                  afterSignOutUrl="/"
                />
              </SignedIn>

              <SignedOut>
                <SignInButton
                  mode="modal"
                  forceRedirectUrl="/"
                >
                  <Button size="sm" variant="ghost">
                    登入
                  </Button>
                </SignInButton>
              </SignedOut>

              <Link href='/configure/upload'>
                <Button variant="secondary" size="sm">
                  Create
                </Button>
              </Link>
            </ClerkLoaded>
          </div>
        </div>
      </Wrapper>
    </nav>
  )
}

export default Navbar
