import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Alert } from '@mui/material';
import { Image } from '@mui/icons-material';

export default function Signup() {
    const [alert, setAlert] = useState(false);
    const [file, setFile] = useState("");
    const [loading, setLoading] = useState(false);

    const [formDetails, setFormDetails] = useState({
        name: "",
        email: "",
        password: "",
        address: "",
        city: "",
        mobile: "",
        role: "",
        confirmPassword: "",
    });

    const inputChange = (e) => {
        const { name, value } = e.target;
        return setFormDetails({
            ...formDetails,
            [name]: value
        });
    };

    const onUpload = async (element) => {
        setLoading(true);
        if (element.type === "image/jpeg" || element.type === "image/png") {
            const data = new FormData();
            data.append("file", element);
            data.append("upload_preset", process.env.REACT_APP_CLOUDINARY_PRESET);
            data.append("cloud_name", process.env.REACT_APP_CLOUDINARY_CLOUD_NAME);
            fetch(process.env.REACT_APP_CLOUDINARY_BASE_URL, {
                method: "POST",
                body: data,
            })
                .then((res) => res.json())
                .then((data) => setFile(data.url.toString()));
            setLoading(false);
        } else {
            setLoading(false);
        }
    };

    const formSubmit = async (e) => {
        try {
            e.preventDefault();

            const { name, email, password, confirmPassword, city, address, role, mobile } = formDetails;
            if (!email || !password || !name || !confirmPassword || !role) {
                return toast.error("Input field should not be empty");
            } else if (password.length < 8) {
                return toast.error("Password must be at least 8 characters long");
            } else if (password !== confirmPassword) {
                return toast.error("Your password does match");
            }

            await toast.promise(
                axios.post("http://localhost:5000/api/user/register", {
                    name, email, password, city, address, role, mobile, profileImage: file
                }),
                {
                    error: "Unable to Register",
                    loading: "Signing up user...",
                }
            );

            setFormDetails({
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
            })
            setAlert(true);


        } catch (error) {
            console.log('Error', error);
        }
    }

    if (loading) {
        <p>loading</p>
    }

    return (
        <>
            {alert ? (
                <Alert severity="success">
                    Email successfully Send, please check your Inbox for email verification...
                </Alert>
            ) : (

                <div className="flex flex-1 flex-col justify-center px-2 py-12 lg:px-4">
                    <div className="">
                        <h2 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                            Create new account
                        </h2>
                    </div>

                    <div className="mt-10 flex justify-center">
                        <form className="space-y-6" onSubmit={formSubmit}>
                            <div className='flex flex-row gap-10'>

                                <div className="flex flex-col items-center justify-start gap-2">

                                    <div>
                                        <label htmlFor="profile-pic" className="text-lg font-medium cursor-pointer" for="profile-pic">Upload Profile: <Image /></label>
                                        <input type="file" onChange={(e) => onUpload(e.target.files[0])} name="profile-pic" id="profile-pic" className="hidden" />
                                        {file && <img src={file} alt="profile" className="h-40 w-40 mt-4 rounded-md" />}
                                    </div>

                                </div>

                                <div>
                                    <div>
                                        <label className="block text-sm font-medium leading-6 text-gray-900 text-left">
                                            Full Name
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="name"
                                                name="name"
                                                type="text"
                                                required
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6"
                                                value={formDetails.name}
                                                onChange={inputChange}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 text-left">
                                            Email address
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                autoComplete="email"
                                                required
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6"
                                                value={formDetails.email}
                                                onChange={inputChange}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium leading-6 text-gray-900 text-left">
                                            Mobile Number
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="mobile"
                                                name="mobile"
                                                type="text"
                                                required
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6"
                                                value={formDetails.mobile}
                                                onChange={inputChange}
                                            />
                                        </div>
                                    </div>





                                    <div>
                                        <div className="flex items-center justify-between">
                                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                                Password
                                            </label>
                                        </div>
                                        <div className="mt-2">
                                            <input
                                                id="password"
                                                name="password"
                                                type="password"
                                                autoComplete="current-password"
                                                required
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6"
                                                value={formDetails.password}
                                                onChange={inputChange}
                                            />
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                                Confirm Password
                                            </label>
                                        </div>
                                        <div className="mt-2">
                                            <input
                                                id="confirmPassword"
                                                name="confirmPassword"
                                                type="password"
                                                required
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6"
                                                value={formDetails.confirmPassword}
                                                onChange={inputChange}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <button
                                            type="submit"
                                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-10"
                                        >
                                            Sign up
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <div>
                                        <label htmlFor="role" className="block text-sm font-medium leading-6 text-gray-900 text-left">
                                            Role
                                        </label>
                                        <select
                                            id="role"
                                            name="role"
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg sm:leading-6"
                                            value={formDetails.role}
                                            onChange={inputChange}
                                            required
                                        >
                                            <option value="">Select Role</option>
                                            <option value="consumer">Consumer</option>
                                            <option value="service_provider">Service Provider</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900 text-left">
                                            City
                                        </label>
                                        <select
                                            id="city"
                                            name="city"
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg sm:leading-6"
                                            value={formDetails.city}
                                            onChange={inputChange}
                                            required
                                        >
                                            <option value="">Select City</option>
                                            <option value="Pune">Pune</option>
                                            <option value="Mumbai">Mumbai</option>
                                            <option value="Surat">Surat</option>
                                            <option value="Delhi">Delhi</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium leading-6 text-gray-900 text-left">
                                            Street Address
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="address"
                                                name="address"
                                                type="text"
                                                required
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6"
                                                value={formDetails.address}
                                                onChange={inputChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </form>

                    </div>
                    <p className='mt-6'>
                        Already a user?{" "}
                        <NavLink
                            className=""
                            to={"/auth/login"}
                        >
                            Login
                        </NavLink>
                    </p>
                </div>
            )}
        </>
    )
}