import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { formatDistanceToNow } from "date-fns";
import { Rating } from '@mui/material';

const SingleServiceProvider = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState({});
    const [averageRating, setAverageRating] = useState(0);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`http://localhost:5000/api/user/${id}`);
                if (response.status !== 200) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                setUser(response.data);

                const totalRating = response.data.testimonials.reduce((acc, curr) => acc + curr.rating, 0);
                const avgRating = totalRating / response.data.testimonials.length;
                setAverageRating(avgRating);

            } catch (error) {
                console.error('Axios error:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [id]);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <div className='flex flex-row gap-10 p-20'>
                <div className='w-72 h-72'>
                    <img src={user.profileImage} alt="user" className='border-2 border-slate-200 rounded-md' />
                </div>
                <div className='flex flex-col gap-6 px-10'>
                    <p className='text-gray-800 font-bold text-2xl text-left'>{user.name}</p>
                    <Rating
                        value={averageRating}
                        size={"small"}
                        className='p-3'
                        readOnly
                    />
                    <div className='flex flex-col gap-4'>
                        <div className='flex flex-row items-center'>
                            <span className='text-gray-700 font-semibold'>Mobile:</span>
                            <p className='text-lg text-left ml-2'>{user?.mobile}</p>
                        </div>
                        <div className='flex flex-row items-center'>
                            <span className='text-gray-700 font-semibold'>Email:</span>
                            <p className='text-lg text-left ml-2'>{user?.email}</p>
                        </div>
                        <div className='flex flex-row items-center'>
                            <span className='text-gray-700 font-semibold'>City:</span>
                            <p className='text-lg text-left ml-2'>{user?.city}</p>
                        </div>
                    </div>
                    <div className='text-gray-700 text-lg font-bold text-left'>Services Offered:</div>
                    <div className='flex flex-row gap-6'>
                        {user.services.length ? (user.services.map((service) => (
                            <div key={service._id} className='border-2 border-slate-200 rounded-md hover:shadow-md'>
                                <div className='w-40 h-24 overflow-hidden rounded-t-md'>
                                    <img src={service.images[0]} alt="ok" className='w-full h-full object-cover' />
                                </div>
                                <p className='text-center p-2'>{service.name}</p>
                            </div>
                        ))) : <p>No Service Provided</p>}
                    </div>
                    <div className='text-gray-700 text-lg font-bold text-left'>Testimonials</div>
                    <div>
                        {user.testimonials.length ? (user.testimonials.map((testimonial, i) => (
                            <div key={i} className='border-2 border-slate-200 rounded-md hover:shadow-md p-4'>
                                <div className='flex items-center'>
                                    <img src={testimonial.customer.profileImage} alt='profile' className='h-16 w-16 rounded-full' />
                                    <div className='ml-4'>
                                        <span className='text-sm text-gray-700'>{testimonial?.customer?.name}</span>
                                        <Rating
                                            value={testimonial.rating}
                                            size={"small"}
                                            className='mt-1'
                                            readOnly
                                        />
                                    </div>
                                </div>
                                <div className='mt-2 text-gray-700'>{testimonial.review}</div>
                                <div className='text-gray-500 text-sm mt-2'>{formatDistanceToNow(testimonial.date, { addSuffix: true })}</div>
                            </div>
                        ))) : <p>No Testimonials Available</p>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SingleServiceProvider;
