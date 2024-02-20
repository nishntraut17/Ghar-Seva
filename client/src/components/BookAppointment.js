import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { IoMdClose } from "react-icons/io";

const BookAppointment = ({ setModalOpen, selectedServiceProvider, setSelectedServiceProvider, service, subServices }) => {
    const [formDetails, setFormDetails] = useState({
        date: "",
        time: "",
        selectedSubServices: [],
    });

    const inputChange = (e) => {
        const { name, value } = e.target;
        setFormDetails({
            ...formDetails,
            [name]: value,
        });
    };

    const handleSubServiceSelection = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setFormDetails(prevState => ({
                ...prevState,
                selectedSubServices: [...prevState.selectedSubServices, value],
            }));
        } else {
            setFormDetails(prevState => ({
                ...prevState,
                selectedSubServices: prevState.selectedSubServices.filter(subService => subService !== value),
            }));
        }
    };

    const bookAppointment = async (e) => {
        e.preventDefault();
        console.log({
            date: formDetails.date,
            time: formDetails.time,
            serviceProvider: selectedServiceProvider,
            service: service,
            subServices: formDetails.selectedSubServices
        });
        console.log(localStorage.getItem("token"));
        try {
            await toast.promise(
                axios.post(
                    "http://localhost:5000/api/order/",
                    {
                        date: formDetails.date,
                        time: formDetails.time,
                        serviceProvider: selectedServiceProvider,
                        service: service,
                        subServices: formDetails.selectedSubServices
                    },
                    {
                        headers: {
                            authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                ),
                {
                    success: "Appointment booked successfully",
                    error: "Unable to book appointment",
                    loading: "Booking appointment...",
                }
            );
            setModalOpen(false);
            setSelectedServiceProvider(null);
        } catch (error) {
            return error;
        }
    };

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-300 bg-opacity-50">
            <div className="bg-white p-8 rounded-lg w-full max-w-md">
                <div className="flex justify-end">
                    <IoMdClose
                        onClick={() => {
                            setModalOpen(false);
                        }}
                        className="cursor-pointer text-gray-500 hover:text-gray-700"
                    />
                </div>
                <h2 className="text-2xl font-semibold mb-6">Book Appointment</h2>
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
                    <div className="mb-4">
                        {subServices.map(subService => (
                            <label key={subService} className="inline-flex items-center text-gray-700">
                                <input
                                    type="checkbox"
                                    name={subService}
                                    value={subService}
                                    onChange={handleSubServiceSelection}
                                    checked={formDetails.selectedSubServices.includes(subService)}
                                    className="mr-2"
                                />
                                <span>{subService}</span>
                            </label>
                        ))}
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                        onClick={bookAppointment}
                    >
                        Book
                    </button>
                </form>
            </div>
        </div>
    );

};

export default BookAppointment;
