'use client';

import React from 'react'
import Image from 'next/image';
import { useSession, signOut } from "next-auth/react";

import './navbar.css';

interface handlers {
    openSignModel: boolean;
    setOpenSignModel: (openSignModel: boolean) => void;
}

const Navbar = ({ openSignModel, setOpenSignModel}: handlers) => {

    const { data: session } = useSession();

      const handleAuth = () => {
        setOpenSignModel(!openSignModel);
      }

  return (
    <div className="NavbarComponent">
        <div className="NavbarComponent-in">
            <div className="navbar-one">
                <h1>OpenQuery <span>AI</span> </h1>
                <p>{process.env.NEXT_AUTH_URL}</p>
            </div>
            <div className="navbar-two">
                {session ? (
                    <div className="navbar-two-one">
                        <Image 
                            src={session.user?.image || '/user.png'}
                            alt='user'
                            width={30}
                            height={30}
                        />
                        <p>{session.user?.name}</p>
                        <p className='navbar-two-logout' onClick={() => signOut()}>Logout</p>
                    </div>
                ) : (
                    <div className="navbar-two-two">
                        <p className='navbar-two-login' onClick={handleAuth} >Login</p>
                    </div>
                )}
            </div>
        </div>
    </div>
  )
}

export default Navbar;