import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import RateReview from '../components/RateReview';

const UserOrders = () => {
    const [orders, setOrders] = useState([]);
    const [newOrders, setNewOrders] = useState([]);
    const [completedOrders, setCompletedOrders] = useState([]);
    const [cancelledOrders, setCancelledOrders] = useState([]);
    const [serviceProviderAcceptedOrders, setServiceProviderAcceptedOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [status, setStatus] = useState("");
    const [activeButton, setActiveButton] = useState('new');
    const [modelOpen, setModelOpen] = useState(false);

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/order/user/`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            if (response.status !== 200) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            console.log(response.data);
            setOrders(response.data);
        } catch (error) {
            console.error('Axios error:', error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const setActive = (button) => {
        setActiveButton(button);
    }

    const handleReject = async () => {
        try {
            console.log(selectedOrder);
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("Token not found in localStorage.");
            }
            await axios.put(`http://localhost:5000/api/order/cancel/${selectedOrder._id}`,
                { status: status },
                {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                }
            );
            toast.success('Success')
            fetchData();
        } catch (err) {
            console.error('Accepting order error:', err);
            toast.error("Failed to accept/reject order.");
        }
    }

    const handleAccept = async (req, res) => {
        try {
            console.log(selectedOrder);
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("Token not found in localStorage.");
            }
            await axios.put(`http://localhost:5000/api/order/complete/${selectedOrder._id}`,
                { status: status },
                {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                }
            );
            toast.success('Success')
            fetchData();
        } catch (error) {
            console.error('Accepting order error:', error);
            toast.error("Failed to accept/reject order.");
        }
    }

    useEffect(() => {
        setNewOrders(orders.filter(order => order.status === 'user requests'));
        setCompletedOrders(orders.filter(order => order.status === 'completed'));
        setCancelledOrders(orders.filter(order => order.status === 'cancelled'));
        setServiceProviderAcceptedOrders(orders.filter(order => order.status === 'service-provider-accepted'));
    }, [orders]);

    const handleAcceptOrReject = (order, status, i) => {
        setStatus(status);
        setSelectedOrder(order);
        if (i === 1) handleReject();
        else handleAccept();
    }

    return (
        <div className="flex">
            <div className="w-1/6 bg-gray-200 p-4 h-screen">
                {loading && <div>Loading...</div>}
                {!loading &&
                    <div className='mt-10 flex flex-col'>
                        <button onClick={() => setActive('new')} className={`mr-2 mb-2 px-4 py-2 rounded ${activeButton === 'new' ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-700"}`}>Newly Placed Orders</button>
                        <button onClick={() => setActive('accepted')} className={`mr-2 mb-2 px-4 py-2 rounded ${activeButton === 'accepted' ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-700"}`}>Orders Accepted by Service Provider</button>
                        <button onClick={() => setActive('completed')} className={`mr-2 mb-2 px-4 py-2 rounded ${activeButton === 'completed' ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-700"}`}>Completed Orders</button>
                        <button onClick={() => setActive('cancelled')} className={`mr-2 mb-2 px-4 py-2 rounded ${activeButton === 'cancelled' ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-700"}`}>Cancelled Orders</button>
                    </div>
                }
            </div>
            <div className="w-5/6 p-4 h-screen">
                {!loading && activeButton === 'new' &&
                    newOrders?.map((order, i) => (
                        <div key={order._id} className='mt-10 flex gap-10 hover:cursor-pointer items-center justify-center'>
                            <img src={order.serviceProvider.profileImage} alt="profile" className='h-20 w-20 rounded' />
                            <p className='text-left ml-2'>{order.service.name}</p>
                            <p className='text-left ml-2'>{order.serviceProvider.name}</p>
                            <button onClick={() => handleAcceptOrReject(order, "cancelled", 1)} className="bg-red-400 h-10 w-20 rounded hover:bg-red-500">Cancel</button>
                        </div>
                    ))
                }
                {!loading && activeButton === 'accepted' &&
                    serviceProviderAcceptedOrders?.map((order, i) => (
                        <div key={order._id} className='mt-10 flex gap-10 hover:cursor-pointer items-center justify-center'>
                            <img src={order.serviceProvider.profileImage} alt="profile" className='h-20 w-20 rounded' />
                            <p className='text-left ml-2'>{order.service.name}</p>
                            <p className='text-left ml-2'>{order.serviceProvider.name}</p>
                            {/* <p className='text-left ml-2'>{order.serviceProvider.email}</p> */}
                            <p className='text-left ml-2'>{order.fees}</p>
                            <button onClick={() => handleAcceptOrReject(order, "cancelled", 1)} className="bg-red-400 h-10 w-20 rounded hover:bg-red-500">Reject</button>
                            <button onClick={() => handleAcceptOrReject(order, "completed", 1)} className="bg-blue-400 h-10 w-20 rounded hover:bg-blue-500">Accept</button>
                        </div>
                    ))
                }
                {!loading && activeButton === 'completed' &&
                    completedOrders?.map((order) => (
                        <div key={order._id} className='mt-10 flex gap-10 hover:cursor-pointer items-center justify-center'>
                            <img src={order.serviceProvider.profileImage} alt="profile" className='h-20 w-20 rounded' />
                            <p className='text-left ml-2'>{order.service.name}</p>
                            <p className='text-left ml-2'>{order.serviceProvider.name}</p>
                            {
                                // order.disableReview ? (
                                <button onClick={() => {
                                    setModelOpen(true);
                                }} className='mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300'>Rate user</button>

                                // ) : (<span>already rated </span>)
                            }
                            {modelOpen && (
                                <RateReview
                                    order={order._id} setModelOpen={setModelOpen} serviceProvider={order.serviceProvider._id}
                                />)}
                        </div>
                    ))
                }
                {!loading && activeButton === 'cancelled' &&
                    cancelledOrders?.map((order, i) => (
                        <div key={order._id} className='mt-10 flex gap-10 hover:cursor-pointer items-center justify-center'>
                            <img src={order.serviceProvider.profileImage} alt="profile" className='h-20 w-20 rounded' />
                            <p className='text-left ml-2'>{order.service.name}</p>
                            <p className='text-left ml-2'>{order.serviceProvider.name}</p>
                            {/* <p className='text-left ml-2'>{order.serviceProvider.email}</p> */}
                        </div>
                    ))
                }
            </div>
        </div>
    )

}

export default UserOrders;
