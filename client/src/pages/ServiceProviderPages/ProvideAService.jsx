import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const ProvideAService = () => {
    const navigate = useNavigate();
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedService, setSelectedService] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const user = jwtDecode(localStorage.getItem('token'));

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`http://localhost:5000/api/service/not-in-user/${user?._id}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                if (response.status !== 200) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                setServices(response.data);
            } catch (error) {
                console.error('Axios error:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [user?._id]);

    const handleSubmit = async () => {
        if (!selectedService) {
            console.error('No service selected');
            return;
        }

        try {
            setSubmitting(true);
            const response = await axios.put(
                `http://localhost:5000/api/service/${selectedService}`,
                { user },
                {
                    headers: {
                        'authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );
            if (response.status === 200) {
                toast.success("Request Successfully Sent");
            }
            if (response.status !== 200) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            setSelectedService("");
        } catch (error) {
            console.error('Axios error:', error);
        } finally {
            setSubmitting(false);
            navigate('/');
        }
    }

    if (loading) {
        return <p>Loading...</p>
    }

    return (
        <div className='min-h-screen'>
            {services.length === 0 &&
                <p className='text-3xl font-extrabold text-gray-400 pt-40'>No services available</p>}
            {services.length > 0 &&
                <div>
                    <div className='text-xl font-bold m-5'>Choose service</div>
                    <div className='flex flex-row items-center gap-2 mx-20'>
                        {services.length > 0 && services.map((service) => (
                            <button
                                onClick={() => setSelectedService(service._id)}
                                className={`flex border-2 border-gray-400 rounded-md bg-gray-100 gap-2 p-1 hover:scale-105 ${selectedService === service._id ? 'bg-slate-200' : ''}`}
                                key={service._id}
                            >
                                <div>
                                    <div className='h-32 w-32'>
                                        <img src={service.image} alt="service" />
                                    </div>
                                    <span>{service.name}</span>
                                </div>

                            </button>
                        ))}
                    </div>
                    <button onClick={handleSubmit} disabled={submitting} className='border-2 bg-slate-50 border-slate-300 hover:scale-105 rounded-lg mt-10 p-2'>Submit</button>
                </div>
            }
        </div >
    )
}

export default ProvideAService
