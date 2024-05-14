import React from "react";
import {
    AiFillGithub,
    AiFillLinkedin,
    AiFillTwitterCircle,
} from "react-icons/ai";
import { motion } from "framer-motion";
import Logo from '../assets/logo.png';


const Footer = () => {
    return (
        <footer className="border-b-4 border-primary bg-gray-50 pt-12 px-4">
            {/* Footer top */}
            <div className="box flex flex-col md:flex-row  justify-between border-b-2 border-gray-100 pb-10 gap-8">
                {/* Footer top left */}
                <div className="basis-1/2 flex flex-col gap-6 items-center md:items-start text-center md:text-start">
                    <img src={Logo} alt="logo" className="h-12 w-auto" />
                    <p>
                        Carpenter to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC,
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </p>
                </div>
                <div className="flex gap-10 basis-1/2 justify-center md:justify-end flex-wrap md:flex-nowrap">
                    <ul className="flex flex-col gap-2 font-semibold mx-8 items-center md:items-start">
                        <li className="text-gray-700 text-sm text-bold mb-2">Services</li>
                        <motion.li whileHover={{ x: 5 }}>
                            <p>House Hold</p>
                        </motion.li>
                        <motion.li whileHover={{ x: 5 }}>
                            <p>Plumbing</p>
                        </motion.li>
                        <motion.li whileHover={{ x: 5 }}>
                            <p>Electrician</p>
                        </motion.li>
                        <motion.li whileHover={{ x: 5 }}>
                            <p>Carpenter</p>
                        </motion.li>
                    </ul>
                    <ul className="flex flex-col gap-2 font-semibold mx-8 items-center md:items-start">
                        <li className="text-gray-700 text-sm text-bold mb-2">Company</li>
                        <motion.li whileHover={{ x: 5 }}>
                            <p>About</p>
                        </motion.li>
                        <motion.li whileHover={{ x: 5 }}>
                            <p>Careers</p>
                        </motion.li>
                        <motion.li whileHover={{ x: 5 }}>
                            <p>News</p>
                        </motion.li>
                        <motion.li whileHover={{ x: 5 }}>
                            <p>Newsletter</p>
                        </motion.li>
                    </ul>
                    <ul className="flex flex-col gap-2 font-semibold mx-8 items-center md:items-start">
                        <li className="text-gray-700 text-sm text-bold mb-2">Legal</li>
                        <motion.li whileHover={{ x: 5 }}>
                            <p>Terms</p>
                        </motion.li>
                        <motion.li whileHover={{ x: 5 }}>
                            <p>Privacy</p>
                        </motion.li>
                        <motion.li whileHover={{ x: 5 }}>
                            <p>Licenses</p>
                        </motion.li>
                        <motion.li whileHover={{ x: 5 }}>
                            <p>Cookies</p>
                        </motion.li>
                    </ul>
                </div>
            </div>
            {/* Footer bottom */}
            <div className="box flex justify-center sm:justify-between flex-col sm:flex-row w-full gap-4">
                <p className="text-sm text-center">
                    &copy; {new Date().getFullYear()} Gharseva. All rights reserved
                </p>
                {/* Footer social links */}
                <ul className="flex justify-center gap-6 text-xl">
                    <motion.li
                        className="border border-primary p-1 rounded-full hover:text-gray-500"
                        whileHover={{ y: -4 }}
                    >
                        <a
                            href="https://github.com/nishntraut17/Shopkart"
                            aria-label="Follow me on github"
                        >
                            <AiFillGithub />
                        </a>
                    </motion.li>
                    <motion.li
                        className="border border-primary p-1 rounded-full hover:text-blue-400"
                        whileHover={{ y: -4 }}
                    >
                        <a
                            href="https://twitter.com/_raut_nishant"
                            aria-label="Follow me on twitter"
                        >
                            <AiFillTwitterCircle />
                        </a>
                    </motion.li>
                    <motion.li
                        className="border border-primary p-1 rounded-full hover:text-blue-600"
                        whileHover={{ y: -4 }}
                    >
                        <a
                            href="https://www.linkedin.com/in/nishntraut17/"
                            aria-label="Follow me on linkedin"
                        >
                            <AiFillLinkedin />
                        </a>
                    </motion.li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;
