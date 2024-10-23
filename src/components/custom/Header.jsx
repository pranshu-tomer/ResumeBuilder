import React from 'react'
import { Link } from 'react-router-dom'
import { UserButton, useUser } from '@clerk/clerk-react'

function Header() {

    const { isSignedIn } = useUser();

    return (
        <div className='p-3 px-5 flex justify-between shadow-md'>
                <Link to={'/'}>
                    <img src='/logo.svg' className='cursor-pointer' width={100} height={100} />
                </Link>
                {isSignedIn ?
                    <UserButton />
                :
                    null
                }
        </div>
    )
}

export default Header