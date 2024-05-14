import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Card from "../../components/Card"

const AllServiceProviders = () => {
    const [serviceProviders, setServiceProviders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState(serviceProviders);

    useEffect(() => {
        const newFilteredData = serviceProviders?.filter((element) =>
            element.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setFilteredData(newFilteredData);
    }, [serviceProviders, searchTerm]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('http://localhost:5000/api/user/');
                if (response.status !== 200) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                setServiceProviders(response.data);
            } catch (error) {
                console.error('Axios error:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    if (loading) {
        return <p>Loading...</p>
    }
    return (
        <div className="">
            <div className="">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900 py-4">All Service Providers</h2>
                <div className='flex flex-col items-center gap-8 justify-center'>
                    <div className="rounded-xl w-96">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="custom-input-outline focus:outline-none focus:ring focus:border-slate-100 border-1 rounded p-2 w-full"
                            placeholder={`Search services...`}
                        />
                    </div>
                </div>


                <div className="flex flex-col gap-20 m-10">
                    {filteredData.length ? filteredData.map((serviceProvider, id) => (
                        <Link to={`/service/${serviceProvider._id}`} id={id}>
                            <Card name={serviceProvider.name} image={serviceProvider.profileImage} id={serviceProvider._id} />
                        </Link>
                    )) : <p>No Data...</p>}
                </div>
            </div>
        </div>
    )
}

export default AllServiceProviders