"use client"
import React, { useState } from 'react'

import './page.css'

import Sidebar from '../../components/sidebar/sidebar'

import { FaCircleArrowUp } from "react-icons/fa6";

const Page = () => {

  const [isOpen, setIsOpen] = useState(true);

  return (
        <div className="ChatComponent ">
            <div className="ChatComponent-in">
                <div className={`chat-one ${isOpen ? 'open' : 'closed'}`}>
                  <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
                </div>
                <div className={`chat-two ${isOpen ? 'open' : 'closed'}`}>
                  <div className="chat-two-in">
                    <div className="chat-two-one">
                      <h1>OpenQuery AI</h1>
                      <p>Username</p>
                    </div>
                    <div className="chat-two-two">
                        <div className="chat-two-two-one">
                            <h1>What can I help with?</h1>
                        </div>
                        <div className="chat-two-two-two">
                            <div className="chat-two-two-two-one">
                                <input 
                                    type="text"
                                    placeholder='Ask anything'
                                />
                            </div>
                            <div className="chat-two-two-two-two">
                                <FaCircleArrowUp />
                            </div>
                        </div>

                    </div>
                  </div>
                </div>
            </div>
        </div>
  )
}

export default Page