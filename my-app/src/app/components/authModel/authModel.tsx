import React from 'react'
import Image from 'next/image'
import { signIn } from "next-auth/react";

import './authModel.css'

interface AuthModelProps {
    setOpenSignModel: (open: boolean) => void;
}

const AuthModel = ({ setOpenSignModel }: AuthModelProps) => {
    
    const handleBackgroundClick = (e: React.MouseEvent) => {
        setOpenSignModel(false);
    };
    const handleAuth = () => {
        signIn('google');
    }

    return (
        <div className="AuthComponent" onClick={handleBackgroundClick}>
            <div className="AuthComponent-in" onClick={handleAuth}>
                <div className="auth-one">
                    <Image 
                        src='/Google.png'
                        alt='Google'
                        width={30}
                        height={30}
                    />
                    <p>Continue with Google</p>
                </div>
            </div>
        </div>
    )
}

export default AuthModel;