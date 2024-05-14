import React, { useState, useEffect } from 'react'
import HomeBanner from '../assets/home.jpg';
import Painting from '../assets/painting.jpeg';
import AC from '../assets/ac.jpeg';
import Repair from '../assets/repair.png';
import Cleaning from '../assets/cleaning.jpeg';
import ListOfCards from '../components/ListOfCards';
import HomeCircles from '../components/HomeCircles';
import { useDispatch } from "react-redux";
import { setUserInfo } from "../redux/reducers/authSlice";
import { jwtDecode } from "jwt-decode";
import axios from 'axios';

const Home = () => {
    const dispatch = useDispatch();
    const token = localStorage.getItem('token');
    const user = jwtDecode(token);
    const [totalEarned, setTotalEarned] = useState(0);
    const [services, setServices] = useState([]);
    const [testimonials, setTestimonials] = useState([]);
    if (token) {
        dispatch(setUserInfo(jwtDecode(token)));
        console.log(jwtDecode(token));
    }

    useEffect(() => {
        const getEarnings = async () => {
            if (user.role === 'service_provider') {
                const response = await axios.get(`http://localhost:5000/api/order/total-earning/${user._id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                console.log(response.data);
                setTotalEarned(response.data.totalEarnings)
            }
        }
        getEarnings();

        const getServices = async () => {
            if (user.role === 'service_provider') {
                const response = await axios.get(`http://localhost:5000/api/service/service-provided/${user._id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setServices(response.data.services);
            }
        }
        getServices();

        const getTestimonials = async () => {
            if (user.role === 'service_provider') {
                const response = await axios.get(`http://localhost:5000/api/user/testimonials/${user._id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                console.log(response.data);
                setTestimonials(response.data);
            }
        }
        getTestimonials();
    }, [user._id, token, user.role]);

    return (token && user.role === 'service_provider') ? (
        <div className="px-20 py-8 text-left flex flex-col">
            <div>
                <h1 className="text-4xl font-bold text-gray-800">Welcome back, {user.name}</h1>
            </div>
            <div className='flex flex-row'>
                {totalEarned ? (
                    <div className="w-1/2">
                        <h1 className="text-2xl font-bold text-gray-800">Total earning from all services</h1>
                        <h1 className="text-xl text-gray-800">Rs. {totalEarned}</h1>
                    </div>
                ) : (
                    <div className="w-1/2">
                        <h1 className="text-2xl font-bold text-gray-800">Total Earned</h1>
                        <h1 className="text-xl text-gray-800">$0</h1>
                    </div>
                )}
                {services && services.length > 0 ? (
                    <div className="w-1/2">
                        <h1 className="text-2xl font-bold text-gray-800">Services you provide</h1>
                        <div className="flex flex-row flex-wrap">
                            {services.map((service) => (
                                <div key={service._id} className="bg-gray-100 p-2 m-2 rounded-lg">
                                    <p className="text-gray-800 font-semibold">{service.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="w-1/2">
                        <h1 className="text-4xl font-bold text-gray-800">Services Provided</h1>
                        <h1 className="text-4xl font-bold text-gray-800">0</h1>
                    </div>
                )}
            </div>
            <div>
                <h1 className="text-4xl font-bold text-gray-800">Testimonials</h1>
                <div className="flex flex-row flex-wrap">
                    {testimonials && testimonials.length > 0 ? (
                        testimonials.map((testimonial) => (
                            <div key={testimonial._id} className="bg-gray-100 p-2 m-2 rounded-lg">
                                <img src={testimonial?.customer?.profileImage} alt="customer" className="h-20 w-20 rounded-full mx-auto" />
                                <p className="text-gray-800 font-semibold">{testimonial?.customer?.name}</p>
                                <div>
                                    <p className="text-gray-800">{testimonial.review}</p>
                                    <p className="text-gray-800">{testimonial.rating}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <h1 className="text-4xl font-bold text-gray-800">No Testimonials</h1>
                    )}
                </div>
            </div>
        </div>
    ) : (
        <div className="mx-auto max-w-7xl pb-10">
            <div className="flex flex-col md:flex-row items-center justify-between px-4 md:px-20 py-10">
                <div className="md:w-1/2">
                    <h1 className="font-bold text-gray-800 text-5xl mb-6 text-left">
                        Home services at your doorstep.
                    </h1>
                    <div className="w-full md:w-96 border border-gray-200 rounded-lg">
                        <p className="text-gray-800 text-lg py-6 px-4">
                            What are you looking for today?
                        </p>
                        <div className="grid grid-cols-2 gap-4 p-4">
                            <div className="text-center bg-gray-100 rounded-lg hover:shadow-md">
                                <img src={Painting} alt="painting" className="mx-auto my-2 h-20" />
                                <p className="text-gray-800 font-semibold">Painter</p>
                            </div>
                            <div className="text-center bg-gray-100 rounded-lg hover:shadow-md">
                                <img src={AC} alt="ac-repair" className="mx-auto my-2 h-20" />
                                <p className="text-gray-800 font-semibold">Electrician</p>
                            </div>
                            <div className="text-center bg-gray-100 rounded-lg hover:shadow-md">
                                <img src={Repair} alt="repair" className="mx-auto my-2 h-20" />
                                <p className="text-gray-800 font-semibold">Carpenter</p>
                            </div>
                            <div className="text-center bg-gray-100 rounded-lg hover:shadow-md">
                                <img src={Cleaning} alt="cleaning" className="mx-auto my-2 h-20" />
                                <p className="text-gray-800 font-semibold">House Help</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="md:w-1/2 mt-10 md:mt-0">
                    <img src={HomeBanner} alt="home" className="w-full h-auto rounded-lg" />
                </div>
            </div>
            <ListOfCards />
            <div className="px-4 md:px-20 py-10">
                <h2 className="font-bold text-gray-800 text-4xl mb-6">About Us</h2>
                <p className="text-gray-700 leading-relaxed text-left md:text-center">
                    Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.
                    Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.
                    Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance.
                    The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in s
                </p>
            </div>
            <HomeCircles />
        </div>
    );
}

export default Home;

