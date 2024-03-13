import React, { useState } from "react";
import Avatar from "./Avatar";
import { Link, NavLink } from "react-router-dom";
import { FiLogIn, FiMenu } from "react-icons/fi";
import Menu from "./Menu";
import Logo from '../assets/logo.png';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { selectCurrentUser } from "../redux/reducers/authSlice";
import { useSelector } from "react-redux";
// import toast from 'react-hot-toast';
import { Alert } from '@mui/material';


const Header = () => {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [showAlert, setShowAlert] = useState(false);
    const token = localStorage.getItem("token");
    const user = useSelector(selectCurrentUser);
    const handleClick = () => {
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
        }, 2000);
    };

    return (
        <>
            {showAlert && <Alert className="text-center">
                You can view service providers of {user.city} city
            </Alert>}

            <header className="shadow-sm sticky top-0 backdrop-blur-sm bg-[#fffefc80] z-20 px-12">
                <div className="box flex justify-between items-center py-3">
                    <NavLink to='/'>
                        <img src={Logo} alt="logo" className="h-14 w-22" />
                    </NavLink>
                    <button onClick={handleClick} className="flex text-gray-600 font-bold text-sm gap-2">
                        <LocationOnIcon />
                        <span>{user.city}</span>
                    </button>
                    {/* Desktop navbar */}
                    <nav className="hidden md:block">
                        {/* Navbar links */}
                        <ul className="flex gap-10">
                            <li>
                                <NavLink
                                    to={"/"}
                                    className="relative w-fit block after:block after:content-[''] after:absolute after:h-[2px] after:bg-primary after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center font-semibold text-gray-600"
                                >
                                    Home
                                </NavLink>
                            </li>
                            {token && user?.role === 'consumer' && (
                                <li>
                                    <NavLink
                                        to={"/service"}
                                        className="relative w-fit block after:block after:content-[''] after:absolute after:h-[2px] after:bg-primary after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center font-semibold text-gray-600"
                                    >
                                        All Services
                                    </NavLink>
                                </li>
                            )}
                            {token && user?.role === 'service_provider' && (
                                <li>
                                    <NavLink
                                        to={"/order/service-provider-orders"}
                                        className="relative w-fit block after:block after:content-[''] after:absolute after:h-[2px] after:bg-primary after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center font-semibold text-gray-600"
                                    >
                                        Orders
                                    </NavLink>
                                </li>
                            )}
                            {token && user?.role === 'service_provider' && (
                                <li>
                                    <NavLink
                                        to={"/service/provide-a-service"}
                                        className="relative w-fit block after:block after:content-[''] after:absolute after:h-[2px] after:bg-primary after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center font-semibold text-gray-600"
                                    >
                                        Offer a service
                                    </NavLink>
                                </li>
                            )}
                            {token && user?.role === 'consumer' && (
                                <li>
                                    <NavLink
                                        to={"/order/user-orders"}
                                        className="relative w-fit block after:block after:content-[''] after:absolute after:h-[2px] after:bg-primary after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center font-semibold text-gray-600"
                                    >
                                        Orders
                                    </NavLink>
                                </li>
                            )}
                        </ul>
                    </nav>
                    {/* Sign in button */}
                    {token && token !== "" ? (
                        <div >
                            <div className="z-10 flex flex-row gap-2 text-gray-600 item-center justify-center">
                                <Avatar />
                            </div>
                        </div>
                    ) : (
                        <Link
                            to={"/auth/login"}
                            className="hidden md:block"
                        >
                            <div className="flex flex-row items-center justify-center gap-1 hover:scale-105">
                                <button>Login</button>
                                <FiLogIn />
                            </div>
                        </Link>
                    )}
                    {/* Menu button */}
                    <FiMenu
                        className="block md:hidden text-xl cursor-pointer"
                        onClick={() => setIsCollapsed(!isCollapsed)}
                    />
                    {/* Mobile navbar */}
                    <Menu
                        setIsCollapsed={setIsCollapsed}
                        isCollapsed={isCollapsed}
                    />
                </div>
            </header>
        </>
    );
};

export default Header;
