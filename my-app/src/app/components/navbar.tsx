import React from 'react'
import Link from 'next/link';

import './navbar.css';

const Navbar = () => {

    const userData = localStorage.getItem('userData');
    const userDataObject = JSON.parse(userData || '{}');

  return (
    <div className="NavbarComponent">
        <div className="NavbarComponent-in">
            <div className="navbar-one">
                <h1>OpenQuery <span>AI</span> </h1>
            </div>
            <div className="navbar-two">
                {userData ? (
                    <div className="navbar-two-user">
                        <p>{userDataObject.name}</p>
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