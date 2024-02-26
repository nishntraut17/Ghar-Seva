import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Card from "../components/Card"

const AllServices = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState(services);

    useEffect(() => {
        const newFilteredData = services?.filter((element) =>
            element.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setFilteredData(newFilteredData);
    }, [services, searchTerm]);

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

    if (loading) {
        return <p>Loading...</p>
    }

    return (
        <div className="">
            <div className="">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900 py-4">All services</h2>
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


                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8 m-10">
                    {filteredData.length ? filteredData.map((service, id) => (
                        <Link to={`/service/${service._id}`} id={id} key={id}>
                            <Card name={service.name} image={service.images[0]} id={service._id} description={service.description} />
                        </Link>
                    )) : <p>No Data...</p>}
                </div>

            </div>
        </div>
    )
}

export default AllServices