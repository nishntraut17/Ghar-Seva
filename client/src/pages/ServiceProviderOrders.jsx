import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from "react-hot-toast";
import Fee from '../components/Fee';

const ServiceProviderOrders = () => {
    const [orders, setOrders] = useState([]);
    const [newOrders, setNewOrders] = useState([]);
    const [completedOrders, setCompletedOrders] = useState([]);
    const [cancelledOrders, setCancelledOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(false);
    const [activeButton, setActiveButton] = useState('new');
    const [modelOpen, setModelOpen] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("Token not found in localStorage.");
            }
            const response = await axios.get(`http://localhost:5000/api/order/`, {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            });

            if (response.status !== 200) {
                toast.error(`HTTP error! Status: ${response.status}`);
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            toast.success("");
            console.log(response.data);
            setOrders(response.data);

        } catch (error) {
            console.error('Fetch data error:', error);
            toast.error("Failed to fetch orders.");
        } finally {
            setLoading(false);
            // setShowFeesInput(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

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

    const handleRejectOrAccept = (order, status, i) => {
        setStatus(status);
        setSelectedOrder(order);
        if (i === 1) handleReject();
    }

    useEffect(() => {
        setNewOrders(orders.filter(order => order.status === 'user requests'));
        setCompletedOrders(orders.filter(order => order.status === 'completed'));
        setCancelledOrders(orders.filter(order => order.status === 'cancelled'));
    }, [orders]);

    const setActive = (button) => {
        setActiveButton(button);
    }

    return (
        <div className="flex">
            <div className="bg-gray-200 p-4 h-screen w-1/6">
                {loading && <div>Loading...</div>}
                {!loading && (
                    <div className='mt-10 flex flex-col'>
                        <button onClick={() => setActive('new')} className={`mr-2 mb-2 px-4 py-2 rounded ${activeButton === 'new' ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-700"}`}>New Orders</button>
                        <button onClick={() => setActive('completed')} className={`mr-2 mb-2 px-4 py-2 rounded ${activeButton === 'completed' ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-700"}`}>Completed Orders</button>
                        <button onClick={() => setActive('cancelled')} className={`mr-2 mb-2 px-4 py-2 rounded ${activeButton === 'cancelled' ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-700"}`}>Cancelled Orders</button>
                    </div>
                )}
            </div>
            <div className="w-5/6 p-4 h-screen">
                {!loading && activeButton === 'new' &&
                    newOrders?.map((order, i) => (
                        <div key={order._id} className='mt-10 flex gap-10 hover:cursor-pointer items-center justify-center'>
                            <img src={order.user.profileImage} alt="profile" className='h-20 w-20 rounded' />
                            <p className='text-left ml-2'>{order.status}</p>
                            <p className='text-left ml-2'>{order.service.name}</p>
                            <p className='text-left ml-2'>{order.user.name}</p>
                            <p className='text-left ml-2'>{order.user.email}</p>
                            <button onClick={() => handleRejectOrAccept(order, "cancelled", 1)} className="bg-red-400 h-10 w-20 rounded hover:bg-red-500">Cancel</button>
                            <button onClick={() => setModelOpen(true)} className="bg-red-400 h-10 w-20 rounded hover:bg-red-500">Accept & Enter Fees</button>

                            {modelOpen && (
                                <Fee
                                    order={order} setModelOpen={setModelOpen} fetchData={fetchData}
                                />)
                            }
                        </div>
                    ))
                }
                {!loading && activeButton === 'completed' &&
                    completedOrders?.map((order, i) => (
                        <div key={order._id} className='mt-10 flex gap-10 hover:cursor-pointer items-center justify-center'>
                            <img src={order.user.profileImage} alt="profile" className='h-20 w-20 rounded' />
                            <p className='text-left ml-2'>{order.status}</p>
                            <p className='text-left ml-2'>{order.service.name}</p>
                            <p className='text-left ml-2'>{order.user.name}</p>
                            <p className='text-left ml-2'>{order.user.email}</p>
                        </div>
                    ))
                }
                {!loading && activeButton === 'cancelled' &&
                    cancelledOrders?.map((order, i) => (
                        <div key={order._id} className='mt-10 flex gap-10 hover:cursor-pointer items-center justify-center'>
                            <img src={order.user.profileImage} alt="profile" className='h-20 w-20 rounded' />
                            <p className='text-left ml-2'>{order.status}</p>
                            <p className='text-left ml-2'>{order.service.name}</p>
                            <p className='text-left ml-2'>{order.user.name}</p>
                            <p className='text-left ml-2'>{order.user.email}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )

}

export default ServiceProviderOrders
