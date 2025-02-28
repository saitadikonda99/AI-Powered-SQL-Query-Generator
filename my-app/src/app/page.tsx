'use client'
import React, { useState} from 'react';

import Navbar from './components/navbar/navbar'
import Home from './ui/home/home'
import About from './ui/about/about'
import Footer from './components/footer/footer'
import AuthModel from './components/authModel/authModel';

export default function Layout() {
  const [openSignModel, setOpenSignModel] = useState(false);

  return (
        <div className="LayoutComponent">
            <div className="LayoutComponent-in">
                <Navbar 
                    openSignModel={openSignModel}
                    setOpenSignModel={setOpenSignModel}
                />
                <Home 
                  openSignModel={openSignModel}
                  setOpenSignModel={setOpenSignModel}
                />
                <About />
                <Footer />
                {openSignModel && (
                    <AuthModel setOpenSignModel={setOpenSignModel} />
                )}
            </div>
        </div>
  );
}
