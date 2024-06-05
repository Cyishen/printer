'use server'

import { currentUser } from '@clerk/nextjs/server';


const ADMIN_EMAIL = process.env.ADMIN_EMAIL!

export const isAdmin = async () => {
  const user = await currentUser()

  if (!user || !user.emailAddresses || user.emailAddresses.length === 0) {
    return false;
  }

  const userEmail = user.emailAddresses[0].emailAddress;

  const isAdmin = userEmail === ADMIN_EMAIL;

  return isAdmin
};