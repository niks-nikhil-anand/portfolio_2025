import { clerkMiddleware , createRouteMatcher } from '@clerk/nextjs/server';


const isPrivateRoute = createRouteMatcher(['/admin(.*)'])


export default clerkMiddleware(async (auth, req) => {
  if (isPrivateRoute(req)) {
    await auth.protect(); 
  }

})

export const config = {
  matcher: [
   '/admin(.*)',
    '/(api|trpc)(.*)',
  ],
};