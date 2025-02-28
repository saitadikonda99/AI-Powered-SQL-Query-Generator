"use client"
import React from 'react'
import './sidebar.css'
import { LuPanelLeftClose } from "react-icons/lu";
import { LuPanelRightClose } from "react-icons/lu";
import { PiNotePencilBold } from "react-icons/pi";
import { IoLogOutOutline } from "react-icons/io5";

import { signOut } from "next-auth/react";
import ApiModel from '../apiModel/apiModel';

type handlers = {
    isOpen: boolean,
    setIsOpen: (isOpen: boolean) => void
}

const Sidebar = ({isOpen, setIsOpen}: handlers) => {

    const [isApiModelOpen, setOpenApiModel] = React.useState(false);

    const handleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const handleApiKey = () => {
        setIsOpen(false);
        setOpenApiModel(true);
    };

    return (
        <div className={`SidebarComponent ${isOpen ? 'open' : 'closed'}`}>
            <div className="SidebarComponent-in">
                <div className={`sidebar-one ${isOpen ? 'open' : 'closed'}`}>
                    {isOpen ? (
                        <LuPanelLeftClose onClick={handleSidebar} />
                    ) : (
                        <LuPanelRightClose onClick={handleSidebar} />
                    )}
                    <PiNotePencilBold />
                </div>
                {isOpen && (
                    <div className="sidebar-two">
                        
                        <div className="sidebar-one" onClick={handleApiKey}>
                            <p>Update Gemini API key</p>
                        </div>

                        <div className="sidebar-logout">
                            <p onClick={() => signOut()}>Logout <IoLogOutOutline className='sidebar-logout-icon' /></p>
                        </div>
                    </div>
                )}
                {isApiModelOpen && (
                    <ApiModel setOpenApiModel={setOpenApiModel} />
                )}
            </div>
        </div>
    )
}

export default Sidebar