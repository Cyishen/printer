import { useUser } from '@clerk/nextjs';

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL!

export const IsAdmin = () => {
  const { user } = useUser()

  if (!user || !user.emailAddresses || user.emailAddresses.length === 0) {
    return false;
  }

  const userEmail = user?.emailAddresses[0].emailAddress;

  const isAdmin = userEmail === ADMIN_EMAIL;

  return isAdmin
};

// import { useAuth } from "@clerk/nextjs"

// const adminIds = [
//   "user_2h5pH1FmAj77EDlTeB5kNbx9FfV",
// ];

// export const IsAdmin = () => {
//   const { userId } = useAuth();

//   if (!userId) {
//     return false;
//   }

//   return adminIds.indexOf(userId) !== -1;
// };
