/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import BookService from '../components/BookService';
import { jwtDecode } from 'jwt-decode';
import QS from '../assets/QS2.png';
import HelpIcon from '@mui/icons-material/Help';
import CloseIcon from '@mui/icons-material/Close';

const SingleService = () => {
    const user = jwtDecode(localStorage.getItem('token'));
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [service, setService] = useState({});
    const [modelOpen, setModelOpen] = useState(false);
    const [subServices, setSubServices] = useState([]);
    const [selectedSubServices, setSelectedSubServices] = useState([]);
    const [cityServiceProviders, setCityServiceProviders] = useState([]);
    const [infoToggle, setInfoToggle] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`http://localhost:5000/api/service/${id}`);
                if (response.status !== 200) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                console.log(response.data);
                setSubServices(response.data.subServices);
                setService(response.data);
                const temp = response.data.serviceProviders.filter(serviceProvider => serviceProvider.city === user.city);
                setCityServiceProviders(temp);
                console.log('City Service Provider', cityServiceProviders);
            } catch (error) {
                console.error('Axios error:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    const toggleSubService = (subService) => {
        setSelectedSubServices(prevSelectedSubServices => {
            const isSelected = prevSelectedSubServices.includes(subService);
            if (isSelected) {
                return prevSelectedSubServices.filter(item => item !== subService);
            } else {
                console.log(subService);
                return [...prevSelectedSubServices, subService];
            }
        });
    };

    useEffect(() => {
        console.log(selectedSubServices);
    }, [selectedSubServices]);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className='flex flex-col'>
            <div className='w-full h-80 overflow-hidden'>
                <img src={service.image} alt='service' className='rounded-lg w-full' />
            </div>
            <div className='m-12'>
                <h1 className='font-bold text-gray-800 text-4xl text-left my-5'>{service.name}</h1>
                <div className="flex flex-col md:flex-row gap-4 md:gap-20 text-gray-900 justify-between">
                    <div className='md:w-1/4 border-2 border-gray-200 p-4 rounded-md shadow-md'>
                        {infoToggle ? (
                            <div>
                                <button onClick={() => setInfoToggle(false)} className='flex justify-end'><CloseIcon /></button>
                                <p className='text-gray-700 text-left'>Instructions:
                                    <br /> Choose from given options of service
                                    <br /> Click on Request service
                                    <br /> Select time and date
                                    <br /> Request will be sent to all service provider</p>
                            </div>) : (
                            <div>
                                <div className='flex flex-row justify-between'>
                                    <div className='text-left mb-3 text-gray-600'>Select services </div>
                                    <button onClick={() => setInfoToggle(true)}>
                                        <HelpIcon />
                                    </button>
                                </div>
                                <div className='flex flex-wrap'>
                                    {subServices.map((service, index) => (
                                        <span
                                            key={index}
                                            className={`rounded-md m-1 p-2 cursor-pointer hover:scale-105 hover:bg-gray-200 transition duration-300 ${selectedSubServices.includes(service) ? 'bg-blue-400' : 'bg-gray-100'}`}
                                            onClick={() => toggleSubService(service)}
                                        >
                                            {service}
                                        </span>
                                    ))}
                                </div>
                                <button onClick={() => setModelOpen(true)} className='mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300'>Request Service</button>
                            </div>
                        )}

                    </div>
                    <div className='flex flex-row md:w-3/4'>
                        <div className='w-80 md:w-72 h-44'>
                            <img src={QS} alt="" className='w-full h-full' />
                        </div>
                    </div>
                    {modelOpen && (
                        <BookService
                            user={user}
                            service={id}
                            setModalOpen={setModelOpen}
                            subServices={selectedSubServices}
                            cityServiceProviders={cityServiceProviders}
                        />
                    )}
                </div>
                <p className='font-bold text-gray-800 text-2xl text-left my-10'> Available service providers</p>
                <div className='my-10 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
                    {cityServiceProviders.length > 0 && (cityServiceProviders
                        .map((serviceProvider, i) => (
                            <div key={i} className='rounded-lg shadow-xl hover:shadow-2xl transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 overflow-hidden'>
                                <Link to={`/service-providers/${serviceProvider._id}`} key={i}>
                                    <div className='relative overflow-hidden'>
                                        <img src={serviceProvider?.profileImage} className='w-full h-40 object-cover object-center' alt='profile' />
                                        <div className='absolute inset-0 bg-black opacity-50'></div>
                                        <div className='absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition duration-300'>
                                            <p className='text-white text-lg font-semibold'>View Profile &#x276F;</p>
                                        </div>
                                    </div>
                                </Link>
                                <div className='p-4'>
                                    <p className='text-lg font-semibold'>{serviceProvider.name}</p>
                                    <p className='text-gray-600'>{serviceProvider.email}</p>
                                </div>
                            </div>
                        )))
                    }
                </div>
                {cityServiceProviders.length === 0 && (<p className='text-4xl font-bold text-slate-200'>No Service Providers Available for {user.city}</p>)}
            </div>
        </div>
    );
};

export default SingleService;
