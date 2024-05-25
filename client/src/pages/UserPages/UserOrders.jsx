import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import EventIcon from '@mui/icons-material/Event';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const UserOrders = () => {
    const [groupedOrders, setGroupedOrders] = useState({});
    const [loading, setLoading] = useState(false);
    // const [activeButton, setActiveButton] = useState('new');

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`${process.env.SERVER_BASE_URL}/order/user/`, {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                setGroupedOrders(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    return (
        <div className="flex justify-center">
            <div className="">
                {loading && <div>Loading...</div>}
            </div>
            <div className="my-12 flex flex-col justify-center items-center">
                {Object.keys(groupedOrders).reverse().map(groupId => (
                    <div key={groupId} className="border-2 m-4 rounded-md">
                        <div className="flex flex-row gap-6 p-4 text-gray-700">
                            <div className="flex flex-row gap-4">
                                <h3 className="text-lg font-bold text-left flex items-center">{groupedOrders[groupId][0].service.name}</h3>
                                <h3 className="text-sm font-bold text-left flex items-center"><EventIcon /> {groupedOrders[groupId][0].date}</h3>
                                <h3 className="text-sm font-bold text-left flex items-center"><AccessTimeIcon /> {groupedOrders[groupId][0].time}</h3>
                            </div>

                            <NavLink to={`/order/${groupId}`} className="flex items-center">
                                <button className="text-sm bg-slate-100 rounded-lg p-2 border-2 border-slate-300 hover:bg-slate-200"> <ReadMoreIcon /></button>
                            </NavLink>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

};

export default UserOrders;
