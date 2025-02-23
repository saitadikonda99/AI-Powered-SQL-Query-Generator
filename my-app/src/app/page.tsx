'use client'
import React from 'react';

import Navbar from './components/navbar'

import Home from './ui/home/home'
import About from './ui/about/about'

export default function Layout() {
  return (
        <div className="LayoutComponent">
            <div className="LayoutComponent-in">
                <Navbar />
                <Home />
                <About />
            </div>
        </div>
  );
}
