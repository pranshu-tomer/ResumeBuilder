import { SignIn } from '@clerk/clerk-react'

function SignInPage() {
  return (
    <div className='flex justify-center items-center h-screen w-screen'>
      <SignIn/>
    </div>
  )
}

export default SignInPage