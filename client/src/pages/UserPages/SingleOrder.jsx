/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import RateReview from '../../components/RateReview';
import EventIcon from '@mui/icons-material/Event';
import AccessTimeIcon from '@mui/icons-material/AccessTime';


const SingleOrder = () => {
    const [orders, setOrders] = useState([]);
    const [newOrders, setNewOrders] = useState([]);
    const [completedOrders, setCompletedOrders] = useState([]);
    const [cancelledOrders, setCancelledOrders] = useState([]);
    const [serviceProviderAcceptedOrders, setServiceProviderAcceptedOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [status, setStatus] = useState("");
    const [modelOpen, setModelOpen] = useState(false);
    const { id } = useParams();
    const [orderComplete, setOrderComplete] = useState(false);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${process.env.SERVER_BASE_URL}/order/user/${id}`, {
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


    const handleReject = async () => {
        try {
            console.log(selectedOrder);
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("Token not found in localStorage.");
            }
            await axios.put(`${process.env.SERVER_BASE_URL}/order/cancel/${selectedOrder._id}`,
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

    const handleAccept = async (fees) => {
        try {
            console.log(selectedOrder);
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("Token not found in localStorage.");
            }
            const response = await axios.put(`${process.env.SERVER_BASE_URL}/order/complete/${selectedOrder._id}`,
                { groupId: selectedOrder.groupId, fees: fees },
                {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                }
            );
            window.location = response.data.url;

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
        if (completedOrders.length > 0) setOrderComplete(true);
        setServiceProviderAcceptedOrders(orders.filter(order => order.status === 'service-provider-accepted'));
    }, [orders]);

    const handleAcceptOrReject = (order, status, i, fees) => {
        setStatus(status);
        setSelectedOrder(order);
        if (i === 1) handleReject();
        else handleAccept(fees);
    }

    return (
        <div className="flex flex-col">
            <div className="">
                {loading && <div>Loading...</div>}
            </div>
            <div className="flex flex-col md:flex-row">
                {completedOrders.length === 0 && !loading && !orderComplete && (
                    <div className="md:w-1/3 bg-slate-50 md:h-svh border-r-2">
                        <p className="font-extrabold text-2xl p-2 text-left ">Order is not viewed</p>
                        {newOrders?.map((order, i) => (
                            <div key={order._id} className="mt-10 flex flex-row p-4 m-2 rounded-sm bg-white border-2 gap-2 hover:cursor-pointer items-center justify-center">
                                <img src={order.serviceProvider.profileImage} alt="profile" className="h-20 w-20 rounded" />
                                <p className="text-left ml-2">{order.service.name}</p>
                                <p className="text-left ml-2">{order.serviceProvider.name}</p>
                                <button onClick={() => handleAcceptOrReject(order, "cancelled", 1, 0)} className="bg-red-400 h-10 w-20 rounded hover:bg-red-500">Cancel</button>
                            </div>
                        ))}
                    </div>
                )}
                {completedOrders.length === 0 && !loading && !orderComplete && (
                    <div className="md:w-1/3 bg-slate-50 md:h-svh border-r-2">
                        <p className="font-extrabold text-2xl p-2 text-left ">Order Accepted</p>
                        {serviceProviderAcceptedOrders?.map((order, i) => (
                            <div key={order._id} className="mt-10 flex gap-2 bg-white border-2 hover:cursor-pointer items-center justify-center">
                                <img src={order.serviceProvider.profileImage} alt="profile" className="h-20 w-20 rounded" />
                                <p className="text-left ml-2">{order.service.name}</p>
                                <p className="text-left ml-2">{order.serviceProvider.name}</p>
                                <p className="text-left ml-2">{order.fees}</p>
                                <button onClick={() => handleAcceptOrReject(order, "cancelled", 1, order.fees)} className="bg-red-400 h-10 w-20 rounded hover:bg-red-500">Reject</button>
                                <button onClick={() => handleAcceptOrReject(order, "completed", 0, order.fees)} className="bg-blue-400 h-10 w-20 rounded hover:bg-blue-500">Accept</button>
                            </div>
                        ))}
                    </div>
                )}
                {completedOrders.length > 0 && !loading && (
                    <div className="w-full flex flex-col items-center bg-slate-50 md:h-svh border-r-2">
                        <p className="text-3xl text-gray-700 font-bold mt-10 ">Order Completed by</p>
                        {completedOrders?.map((order) => (
                            <div key={order._id} className="mt-10 flex gap-4 items-center p-2 max-w-max bg-white border">
                                <div className='flex flex-col gap-1 rounded-sm bg-slate-50 border p-2 items-center'>
                                    <img src={order.serviceProvider.profileImage} alt="profile" className="h-32 w-32 rounded" />
                                    <p className="text-left ml-2">{order.service.name}</p>
                                    <p className="text-left text-lg ml-2">{order.serviceProvider.name}</p>
                                </div>
                                <div className='p-1 border bg-gray-50 rounded-sm'>
                                    {
                                        order?.subServices.map((subservice, i) => (
                                            <p key={i}>{subservice}</p>
                                        ))
                                    }
                                </div>
                                <p className="text-left ml-2 text-lg">Rs. {order.fees}</p>
                                <p className="text-left ml-2 text-lg"><EventIcon /> {order.date}</p>
                                <p className="text-left ml-2 text-lg"><AccessTimeIcon /> {order.time}</p>

                                {order.disableReview === false && (
                                    <button onClick={() => setModelOpen(true)} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300">Rate user</button>
                                )}
                                {modelOpen && (
                                    <RateReview
                                        order={order._id} setModelOpen={setModelOpen} serviceProvider={order.serviceProvider._id} fetchData={fetchData}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                )}
                {completedOrders.length === 0 && !loading && !orderComplete && (
                    <div className="md:w-1/3 bg-slate-50 md:h-svh border-r-2">
                        <p className="font-extrabold text-2xl p-2 text-left">Request cancelled</p>
                        {cancelledOrders?.map((order, i) => (
                            <div key={order._id} className="mt-10 flex gap-10 bg-white border-2 hover:cursor-pointer items-center justify-center">
                                <img src={order.serviceProvider.profileImage} alt="profile" className="h-20 w-20 rounded" />
                                <p className="text-left ml-2">{order.service.name}</p>
                                <p className="text-left ml-2">{order.serviceProvider.name}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );

}

export default SingleOrder