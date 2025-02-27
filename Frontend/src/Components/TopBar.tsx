import { SignedOut, UserButton } from '@clerk/clerk-react'
import { LayoutDashboardIcon } from 'lucide-react'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import SignInAuthButton from './SignInAuthButton'
import { useAuthStore } from '../store/useAuthStore'

const TopBar = () => {
    const { isAdmin, isLoading, checkIsAdminStatus } = useAuthStore()

    useEffect(() => {
        checkIsAdminStatus();
    }, [checkIsAdminStatus]);

    return (
        <div className='flex items-center justify-between p-4  sticky top-0 bg-zinc-900/90 backdrop-blur-md z-10 text-white rounded-md'>
            
            <div className='flex gap-2 items-center'>
                <img src="/spotify.png" alt="Spotify logo" className='size-8' />
                <span className="text-lg font-semibold">Spotify</span>
            </div>

           
            <div className='flex gap-4 items-center'>
                
                {!isLoading && isAdmin && (
                    <Link to="/admin" className="flex items-center gap-2 text-sm font-medium hover:text-zinc-300 transition">
                        <LayoutDashboardIcon className="size-5" />
                        <span className="whitespace-nowrap">Admin Dashboard</span>
                    </Link>
                )}

                {/* User Profile */}
                <SignedOut>
                    <SignInAuthButton />
                </SignedOut>
                <UserButton />
            </div>
        </div>
    )
}

export default TopBar
