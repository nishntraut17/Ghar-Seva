import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import toast from 'react-hot-toast';

const BecomeServiceProvider = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedService, setSelectedService] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const user = jwtDecode(localStorage.getItem('token'));

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('http://localhost:5000/api/service/');
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
    }, []);

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
        }
    }

    if (loading) {
        return <p>Loading...</p>
    }

    return (
        <div>
            <div className='text-xl font-bold m-5'>Choose service</div>
            <div className='flex flex-col items-center gap-2'>
                {services.length && services.map((service) => (
                    <button
                        onClick={() => setSelectedService(service._id)}
                        className={`flex border-2 border-blue-800 rounded-md bg-blue-500 gap-2 p-1 hover:scale-105 ${selectedService === service._id ? 'bg-blue-700' : ''}`}
                        key={service._id}
                    >
                        {service.name}
                    </button>
                ))}
            </div>
            <button onClick={handleSubmit} disabled={submitting} className='border-2 bg-slate-50 border-slate-200 hover:scale-105 rounded-lg mt-10 p-2'>Submit</button>
        </div>
    )
}

export default BecomeServiceProvider
