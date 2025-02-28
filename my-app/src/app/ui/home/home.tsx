import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import './home.css'

import { MdArrowOutward } from "react-icons/md";
import { useSession } from "next-auth/react";

import AuthModel from '@/app/components/authModel/authModel';

interface handlers {
    openSignModel: boolean;
    setOpenSignModel: (openSignModel: boolean) => void;
}

const Home = ({ openSignModel, setOpenSignModel}: handlers) => {
  const [hoverEffect, setHoverEffect] = useState('bend-right');

  const {status, data: session} = useSession();

  const handleMouseEnter = () => {
    // Cycle through all four directions
    setHoverEffect(prev => {
      switch(prev) {
        case 'bend-right': return 'bend-left';
        case 'bend-left': return 'bend-top';
        case 'bend-top': return 'bend-bottom';
        default: return 'bend-right';
      }
    });
  };

  const router = useRouter();

  const handleChat = () => {
    if (status !== 'authenticated') {
        setOpenSignModel(!openSignModel);
    }
    else {
        router.push('/chat')
    }
  }

  return (
    <div className="HomeComponent">
        <div className="HomeComponent-in">
            <div className="home-one">
                <div className="home-one-one">
                    <h1 className='home-one-h1-one'>Natural Language Queries to</h1>
                    <h1 className='home-one-h1-two'>SQL <span>Queries</span></h1>
                </div>
                <div className="home-one-two">
                    <p onClick={handleChat}>Try Now <MdArrowOutward /></p>
                </div>
            </div>
            <div className="home-two">
                <div className="home-two-in">

                <div className={`home-card-one ${hoverEffect}`} onMouseEnter={handleMouseEnter}>
                    <div className="home-card-one-in">
                        <div className="home-tab-one">
                            <div className="home-tab-one-one">
                                <div className="home-close"></div>
                                <div className="home-minimize"></div>
                                <div className="home-maximize"></div>
                            </div>
                            <div className="home-tab-one-two">
                                <p>https://openqueryai.vercel.app</p>
                            </div>
                        </div>
                        <div className="home-tab-two">
                            <Image 
                                src='/home.png'
                                alt='home'
                                width={1000}
                                height={1000}
                            />
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Home;