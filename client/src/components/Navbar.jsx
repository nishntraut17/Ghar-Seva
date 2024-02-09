import React, { useState } from "react";
import Avatar from "./Avatar";
import { Link, NavLink } from "react-router-dom";
import { FiLogIn, FiMenu } from "react-icons/fi";
import { useSelector } from 'react-redux';
import { selectCurrentUser } from "../redux/reducers/authSlice";
import Menu from "./Menu";
import Logo from '../assets/logo.png';

const Header = () => {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const token = localStorage.getItem("token");
    const user = useSelector(selectCurrentUser);

    return (
        <header className="shadow-sm sticky top-0 backdrop-blur-sm bg-[#fffefc80] z-20 px-12">
            <div className="box flex justify-between items-center py-3">
                {/* <Logo /> */}
                <NavLink to='/'>
                    <img src={Logo} alt="logo" className="h-14 w-22" />
                </NavLink>
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
                        <li>
                            <NavLink
                                to={"/services"}
                                className="relative w-fit block after:block after:content-[''] after:absolute after:h-[2px] after:bg-primary after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center font-semibold text-gray-600"
                            >
                                All Services
                            </NavLink>
                        </li>
                        {token && (
                            <li>
                                <NavLink
                                    to={"/history"}
                                    className="relative w-fit block after:block after:content-[''] after:absolute after:h-[2px] after:bg-primary after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center font-semibold text-gray-600"
                                >
                                    Service Providers
                                </NavLink>
                            </li>
                        )}
                        {token && (
                            <li>
                                <NavLink
                                    to={"/history"}
                                    className="relative w-fit block after:block after:content-[''] after:absolute after:h-[2px] after:bg-primary after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center font-semibold text-gray-600"
                                >
                                    Contact Us
                                </NavLink>
                            </li>
                        )}
                        {token && user.role === 'consumer' && (
                            <li>
                                <NavLink
                                    to={"/service-provider"}
                                    className="relative w-fit block after:block after:content-[''] after:absolute after:h-[2px] after:bg-primary after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center font-semibold text-gray-600"
                                >
                                    Become a Service Provider
                                </NavLink>
                            </li>
                        )}
                        {token && user.role === 'admin' && (
                            <li>
                                <NavLink
                                    to={"/admin/allusers"}
                                    className="relative w-fit block after:block after:content-[''] after:absolute after:h-[2px] after:bg-primary after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center font-semibold text-gray-600"
                                >
                                    Admin Dashboard
                                </NavLink>
                            </li>
                        )}
                    </ul>
                </nav>
                {/* Sign in button */}
                {token && token !== "" ? (
                    <div >
                        <Avatar />
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
    );
};

export default Header;
