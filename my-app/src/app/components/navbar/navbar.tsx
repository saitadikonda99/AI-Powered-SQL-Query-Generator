'use client';

import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { useSession, signOut } from "next-auth/react";

import './navbar.css';

interface UserData {
    name: string;
    email: string;
    password: string;
}

interface handlers {
    openSignModel: boolean;
    setOpenSignModel: (openSignModel: boolean) => void;
}

const Navbar = ({ openSignModel, setOpenSignModel}: handlers) => {

    const [userData, setUserData] = useState<UserData | null>(null);

    const { data: session } = useSession();

    useEffect(() => {
        if (typeof window !== "undefined") {
          const storedData = localStorage.getItem("userData");
          setUserData(storedData ? JSON.parse(storedData) : null);
        }
      }, []);

      const handleAuth = () => {
        setOpenSignModel(!openSignModel);
      }

  return (
    <div className="NavbarComponent">
        <div className="NavbarComponent-in">
            <div className="navbar-one">
                <h1>OpenQuery <span>AI</span> </h1>
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