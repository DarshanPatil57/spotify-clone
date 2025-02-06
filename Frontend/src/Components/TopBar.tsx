import { SignedIn, SignedOut, SignIn, SignOutButton } from '@clerk/clerk-react'
import { LayoutDashboardIcon } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'
import SignInAuthButton from './SignInAuthButton'

const TopBar = () => {
    const isAdmin = false
  return (
    <div className='flex items-center justify-between p-4 sticky top-0 bg-zinc-900/75 backdrop-blur-md z-10 text-white '>
        <div className='flex gap-2 items-center'>
            Spotify
        </div>
        <div className='flex gap-4 items-center'>
            {
                isAdmin && (
                    <Link to={"/admin"}>
                        <LayoutDashboardIcon className='size-4 mr-2' />
                        Admin Dashboard
                    </Link>
                )
            }

            <SignedIn>
                <SignOutButton/>
            </SignedIn>
            
            <SignedOut>
                <SignInAuthButton/>
            </SignedOut>
        </div>
    </div>
  )
}

export default TopBar