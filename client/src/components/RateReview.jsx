import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { IoMdClose } from "react-icons/io";
import { selectCurrentUser } from "../redux/reducers/authSlice";
import { useSelector } from 'react-redux';
import { Rating } from '@mui/material';

const RateReview = ({ setModelOpen, order, serviceProvider }) => {
    const [formDetails, setFormDetails] = useState({
        rating: 0,
        review: "",
    });
    const user = useSelector(selectCurrentUser);



    const inputChange = (e) => {
        const { name, value } = e.target;
        setFormDetails({
            ...formDetails,
            [name]: value,
        });
    };

    const bookService = async (e) => {
        e.preventDefault();
        try {
            await toast.promise(
                axios.put(
                    `http://localhost:5000/api/user/rate-review/${serviceProvider}`,
                    {
                        rating: formDetails.rating,
                        review: formDetails.review,
                        order: order,
                        user: user._id,
                    },
                    {
                        headers: {
                            authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                ),
                {
                    success: "Rating and Review sent successfully",
                    error: "Unable to Rate or Review",
                    loading: "loading ...",
                }
            );
            setModelOpen(false);
        } catch (error) {
            console.error('Error while submitting review:', error);
            toast.error("Failed to rate or review.");
        }
    };

    const handleClose = () => {
        setModelOpen(false);
    }

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-300 bg-opacity-50">
            <div className="bg-white p-8 rounded-lg w-full max-w-md">
                <div className="flex justify-end">
                    <IoMdClose
                        onClick={handleClose}
                        className="cursor-pointer text-gray-500 hover:text-gray-700"
                    />
                </div>
                <h2 className="text-2xl font-semibold mb-6">Rate and Review</h2>
                <form className="mb-4">
                    <div className="flex flex-col mb-4">
                        <label htmlFor="rating" className="text-gray-600 mb-1">Rate</label>
                        <label>
                            Rate:
                            <Rating
                                size={"medium"}
                                precision={0.25}
                                name="rating"
                                value={formDetails.rating}
                                onChange={inputChange}
                            />
                        </label>
                    </div>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="review" className="text-gray-600 mb-1">Review</label>
                        <input
                            type="text"
                            id="review"
                            name="review"
                            className="border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500"
                            value={formDetails.review}
                            onChange={inputChange}
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                        onClick={bookService}
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RateReview;
