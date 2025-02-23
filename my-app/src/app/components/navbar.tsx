'use client';

import React, { useEffect, useState } from 'react'
import Link from 'next/link';

import './navbar.css';

interface UserData {
    name: string;
    email: string;
    password: string;
}

const Navbar = () => {

    const [userData, setUserData] = useState<UserData | null>(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
          const storedData = localStorage.getItem("userData");
          setUserData(storedData ? JSON.parse(storedData) : null);
        }
      }, []);

  return (
    <div className="NavbarComponent">
        <div className="NavbarComponent-in">
            <div className="navbar-one">
                <h1>OpenQuery <span>AI</span> </h1>
            </div>
            <div className="navbar-two">
                {userData ? (
                    <div className="navbar-two-user">
                        <p>{userData.name}</p>
                    </div>
                ) : (
                    <Link href='/auth/login' className='navbar-two-login'>Login</Link>
                )}
            </div>
        </div>
    </div>
  )
}

export default Navbar;