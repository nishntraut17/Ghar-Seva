import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true)
        const getUser = async () => {
            try {
                const { data } = await axios.get(`http://localhost:5000/api/user/${id}`, {
                    headers: {
                        'authorization': `Bearer ${localStorage.getItem("token")}`
                    }
                })
                console.log(data);
                setUser(data);
            } catch (error) {
                console.log(error);
            }
            finally {
                setLoading(false);
            }
        }
        getUser();
    }, [id]);

    if (loading) {
        return <p>loading...</p>
    }
    return (
        <div className="flex flex-col gap-16 items-center pb-10">
            <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
                <div className="flex flex-col text-2xl text-gray-700 gap-4 mt-16">
                    <div className='flex flex-row gap-4'>
                        <div className="font-bold">User name:</div>
                        <div>{user?.name}</div>
                    </div>
                    <div className='flex flex-row gap-4'>
                        <div className="font-bold">Email:</div>
                        <div>{user?.email}</div> </div>
                    <div className='flex flex-row gap-4'>
                        <div className="font-bold">Mobile Number:</div>
                        <div>{user?.mobile}</div> </div>
                    <div className='flex flex-row gap-4'>
                        <div className="font-bold">Street address:</div>
                        <div>{user?.address}</div> </div>
                    <div className='flex flex-row gap-4'>
                        <div className="font-bold">City:</div>
                        <div>{user?.city}</div> </div>
                </div>
                <div className="w-56 h-56 mt-20">
                    <img src={user?.profileImage} alt="profile" className="rounded-lg w-full h-full object-cover" />
                </div>
            </div>
            <Link to={`/profile/updateprofile/${id}`} className="flex justify-center">
                <button className="bg-blue-500 text-white hover:bg-blue-700 rounded-md p-2 border border-blue-500 hover:border-blue-700">
                    Update Profile
                </button>
            </Link>
        </div>
    );


}

export default Profile