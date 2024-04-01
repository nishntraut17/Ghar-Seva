import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Card from './Card';

const ListOfCards = () => {
    const [loading, setLoading] = useState(true);
    const [services, setServices] = useState([]);
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('http://localhost:5000/api/service');
                if (response.status !== 200) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                // console.log(response.data);
                setServices(response.data);
            } catch (error) {
                console.error('Axios error:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    if (loading) {
        return <p>loading...</p>
    }
    console.log(services[0]);

    return (
        <div className='m-4 md:m-20'>
            <div className='text-4xl font-bold text-gray-800 text-left my-20'>
                Our best services....
            </div>
            <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
                {services.map((item, index) => (
                    <Card image={item.image} name={item.name} id={item._id} key={index} />
                ))}
            </div>
        </div>
    )
}

export default ListOfCards