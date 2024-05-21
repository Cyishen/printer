import { clerkMiddleware } from "@clerk/nextjs/server";

// const isPublicRoute = createRouteMatcher([
//   '/(.*)', 
//   '/configure(.*)',
// ]);

// export default clerkMiddleware((auth, request) => {
//   if(!isPublicRoute(request)) {
//     auth().protect();
//   }
// });

export default clerkMiddleware()


export const config = {
  matcher: [
    "/((?!.*\..*|_next).*)", 
    "/", 
    "/(api|trpc)(.*)", 
    '/:path*',
  ],
};