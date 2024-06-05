"use client"

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
  useAuth,
} from "@clerk/nextjs";
import { upsertUser } from '@/actions/user.actions';
import { useEffect, useState } from 'react';

import { isAdmin } from '@/lib/admin'

const Navbar = () => {
  const { isSignedIn } = useAuth();

  useEffect(() => {
    if (isSignedIn) {
      upsertUser();
    }
  }, [isSignedIn]);

  const [isAdminState, setIsAdminState] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const result = await isAdmin();
        setIsAdminState(result);
      } catch (error) {
        console.error("Error checking admin status:", error);
      }
    };

    checkAdmin();
  }, [isSignedIn]);

  return (
    <nav className='sticky z-[100] h-14 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all'>
      <Wrapper>
        <div className='flex h-14 items-center justify-between border-b border-zinc-200'>
          <Link href='/' className='flex z-40 font-semibold'>
            Print<span className='text-green-600'>er</span>
          </Link>



          <div className='flex items-center space-x-4'>
            <ClerkLoading>
              <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
            </ClerkLoading>

            <ClerkLoaded>
              <SignedIn>
                {isAdminState ? (
                  <Link href='/dashboard'>
                    <Button variant="ghost" size="sm">
                      管理
                    </Button>
                  </Link>
                ) : null }

                <UserButton
                  afterSignOutUrl="/"
                />

                <Link href='/order'>
                  <Button variant="outline" size="sm">
                    訂單
                  </Button>
                </Link>
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
