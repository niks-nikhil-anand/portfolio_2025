import { SignIn } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
``

export default function Page() {
  return (
   <div className='min-h-[93vh] w-full flex justify-center items-center'>
    <SignIn appearance={{
        baseTheme: dark,
      }} />
   </div>
  )
}