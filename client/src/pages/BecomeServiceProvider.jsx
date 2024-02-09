import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const BecomeServiceProvider = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedService, setSelectedService] = useState("");
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
            const response = await axios.put(
                `http://localhost:5000/api/service/${selectedService}`,
                { user },
                {
                    headers: {
                        'authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );
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


    if (loading) {
        return <p>Loading...</p>
    }
    return (
        <div>
            <div>Choose service</div>
            {services.length && services.map((service) => (
                <button onClick={() => {
                    setSelectedService(service._id)
                    console.log(selectedService);
                    console.log(user);
                    handleSubmit();
                }}>
                    {service.name}
                </button>
            ))}
        </div>
    )
}

export default BecomeServiceProvider