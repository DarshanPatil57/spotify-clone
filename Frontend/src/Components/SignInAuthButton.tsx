import { useSignIn } from '@clerk/clerk-react'
import React from 'react'

const SignInAuthButton = () => {
    const {signIn,isLoaded} = useSignIn()

    const signInWithGoogle = ()=>{
        signIn?.authenticateWithRedirect({
            strategy:"oauth_google",
            redirectUrl:"/sso-callback",
            redirectUrlComplete:"/auth"
        })
    }

    if(!isLoaded){
        return null
    }
  return (
    <div>
        <button onClick={signInWithGoogle} className='w-full text-white border-zinc-200 h-11 px-4 py-2 bg-zinc-800 rounded-2xl cursor-pointer'>
            Continue with Google
        </button>
    </div>
  )
}

export default SignInAuthButton