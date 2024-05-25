import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { IoMdClose } from "react-icons/io";
import SendIcon from '@mui/icons-material/Send';

const BookService = ({ setModalOpen, service, subServices, cityServiceProviders }) => {
    const [formDetails, setFormDetails] = useState({
        date: "",
        time: "",
    });

    const inputChange = (e) => {
        const { name, value } = e.target;
        setFormDetails({
            ...formDetails,
            [name]: value,
        });
    };

    const bookService = async (e) => {
        e.preventDefault();
        console.log({
            date: formDetails.date,
            time: formDetails.time,
            service: service,
            subServices: subServices,
            cityServiceProviders: cityServiceProviders
        });
        console.log(localStorage.getItem("token"));
        try {
            await toast.promise(
                axios.post(
                    `${process.env.SERVER_BASE_URL}/order/`,
                    {
                        date: formDetails.date,
                        time: formDetails.time,
                        service: service,
                        subServices: subServices,
                        cityServiceProviders: cityServiceProviders
                    },
                    {
                        headers: {
                            authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                ),
                {
                    success: "Service booked successfully",
                    error: "Unable to book Service",
                    loading: "Booking Service...",
                }
            );
            setModalOpen(false);
        } catch (error) {
            return error;
        }
    };

    useEffect(() => {
        console.log(subServices);
    }, [subServices]);

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-300 bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded-lg w-full max-w-md">
                <div className="flex justify-end">
                    <IoMdClose
                        onClick={() => {
                            setModalOpen(false);
                        }}
                        className="cursor-pointer text-gray-500 hover:text-gray-700"
                    />
                </div>
                <div className="text-lg font-semibold mb-2 text-left">Following are the selected services</div>
                <div className="font-semibold text-gray-500 text-left mb-6">
                    {
                        subServices.map((service) => {
                            return <p>{service}</p>
                        })
                    }
                </div>
                <h2 className="text-lg font-semibold mb-6">Select Date and Time of your convenience</h2>
                <form className="mb-4">
                    <div className="flex flex-col mb-4">
                        <label htmlFor="date" className="text-gray-600 mb-1">Date</label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            className="border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500"
                            value={formDetails.date}
                            onChange={inputChange}
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="time" className="text-gray-600 mb-1">Time</label>
                        <input
                            type="time"
                            id="time"
                            name="time"
                            className="border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500"
                            value={formDetails.time}
                            onChange={inputChange}
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                        onClick={bookService}
                    >
                        Send {"  "}
                        <SendIcon className="" />
                    </button>
                </form>
            </div>
        </div>
    );

};

export default BookService;
