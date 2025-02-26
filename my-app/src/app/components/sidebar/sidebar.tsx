"use client"
import React from 'react'
import './sidebar.css'
import { LuPanelLeftClose } from "react-icons/lu";
import { LuPanelRightClose } from "react-icons/lu";
import { PiNotePencilBold } from "react-icons/pi";

type handlers = {
    isOpen: boolean,
    setIsOpen: (isOpen: boolean) => void
}

const Sidebar = ({isOpen, setIsOpen}: handlers) => {

    const handleSidebar = () => {
        setIsOpen(!isOpen);
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
                    </div>
                )}
            </div>
        </div>
    )
}

export default Sidebar