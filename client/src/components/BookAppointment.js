import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { IoMdClose } from "react-icons/io";

const BookAppointment = ({ setModalOpen, selectedServiceProvider, setSelectedServiceProvider }) => {
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

    const bookAppointment = async (e) => {
        e.preventDefault();
        try {
            await toast.promise(
                axios.post(
                    "http://localhost:5000/api/order",
                    {
                        date: formDetails.date,
                        time: formDetails.time,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
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
        <div className="flex justify-center items-center bg-gray-300 bg-opacity-50">
            <div className="bg-white p-8 rounded-lg w-3/4">
                <h2 className="text-xl mb-4">Book Appointment</h2>
                <IoMdClose
                    onClick={() => {
                        setModalOpen(false);
                    }}
                    className="cursor-pointer"
                />
                <div className="mb-4">
                    <form>
                        <input
                            type="date"
                            name="date"
                            className="border border-gray-300 rounded p-2 mr-2"
                            value={formDetails.date}
                            onChange={inputChange}
                        />
                        <input
                            type="time"
                            name="time"
                            className="border border-gray-300 rounded p-2"
                            value={formDetails.time}
                            onChange={inputChange}
                        />
                        <button
                            type="submit"
                            className="bg-blue-500 text-white rounded px-4 py-2 ml-2"
                            onClick={bookAppointment}
                        >
                            Book
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookAppointment;
