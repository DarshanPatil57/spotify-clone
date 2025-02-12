import { SignedOut,  UserButton } from '@clerk/clerk-react'
import { LayoutDashboardIcon } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'
import SignInAuthButton from './SignInAuthButton'
import { useAuthStore } from '../store/useAuthStore'

const TopBar = () => {
    const {isAdmin} = useAuthStore()
    // console.log(isAdmin);
    
  return (
    <div className='flex items-center justify-between p-4 sticky top-0 bg-zinc-900/90 backdrop-blur-md z-10 text-white rounded-md'>
        <div className='flex gap-2 items-center'>
            <img src="/spotify.png" alt="spotify logo" className='size-8' />
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

            
            <SignedOut>
                <SignInAuthButton/>
            </SignedOut>
            <UserButton />
        </div>
    </div>
  )
}

export default TopBar