import React, { useState } from "react";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Image } from "@mui/icons-material";

function AddService() {
    const navigate = useNavigate();
    const [file, setFile] = useState("");
    const [loading, setLoading] = useState(false);
    const [formDetails, setFormDetails] = useState({
        name: "",
        description: "",
        subServices: [],
    });
    const [service, setService] = useState("");


    const addSubServices = () => {
        if (!service) {
            return toast.error("Sub service cannot be empty");
        }
        const updatedFormDetails = { ...formDetails };
        updatedFormDetails.subServices.push(service);
        setFormDetails(updatedFormDetails);
        setService("");
    };

    const inputChange = (e) => {
        const { name, value } = e.target;
        console.log(formDetails);
        return setFormDetails({
            ...formDetails,
            [name]: value,
        });

    };

    const onUpload = async (elements) => {
        setLoading(true);

        const uploadPromises = Array.from(elements).map(async (element) => {
            if (element.type === "image/jpeg" || element.type === "image/png") {
                const data = new FormData();
                data.append("file", element);
                data.append("upload_preset", 'pntmkvdu');
                data.append("cloud_name", 'dwiqk6e6a');
                const res = await fetch('https://api.cloudinary.com/v1_1/dwiqk6e6a/image/upload', {
                    method: "POST",
                    body: data,
                });
                const data_1 = await res.json();
                return data_1.url.toString();
            } else {
                return Promise.resolve(null);
            }
        });

        const uploadedFiles = await Promise.all(uploadPromises);

        setFile(uploadedFiles[0]);
        console.log(file);
        setLoading(false);
    };

    const formSubmit = async (e) => {
        try {
            e.preventDefault();

            if (loading) return;
            if (file === "") return toast.error("Please upload an image");

            const { name, description, subServices } = formDetails;
            console.log(formDetails);
            const response = await toast.promise(
                axios.post('http://localhost:5000/api/service', {
                    name,
                    description,
                    image: file,
                    subServices: subServices
                }, {
                    headers: {
                        'authorization': `Bearer ${localStorage.getItem("token")}`
                    }
                }),
                {
                    loading: "loading...",
                    success: "successful",
                    error: "failed",
                }
            );
            navigate('/');
            console.log(response);
        } catch (error) { }
    };

    return (
        <div className="">
            <h2 className="px-10 text-bold text-2xl">Add New Service</h2>
            <form
                onSubmit={formSubmit}
                className="flex flex-col p-10 gap-4 justify-center"
            >
                <div className="flex flex-col lg:flex-row gap-4">
                    <label>Enter Service Name:</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter product name"
                        value={formDetails.name}
                        onChange={inputChange}
                        className="h-10 focus:outline-none focus:ring focus:border-slate-100 border-1 rounded p-2 w-auto"
                    />

                </div>

                <div className="flex gap-1">
                    <label>Add services</label>
                    <input
                        type="text"
                        onChange={(e) => setService(e.target.value)}
                        value={service}
                        name="service"
                        placeholder="service"
                        className="p-1.5 border bg-gray-100 rounded focus:outline outline-primary"
                    />
                    <button
                        className="rounded bg-blue-50 text-sm px-4 py-1"
                        onClick={addSubServices}
                    >Add</button>
                </div>
                <p className="flex flex-col gap-2 w-32">
                    {formDetails.subServices.map((ele) => (
                        <p
                            className="rounded p-2 gap-2 hover:z-10 hover:shadow-md"
                            key={ele}
                        >
                            {ele}
                        </p>
                    ))}
                </p>

                <div className="flex flex-col gap-4 w-96 text-left">

                    <label>Enter Description:</label>

                    <textarea
                        type="text"
                        name="description"
                        placeholder="Enter description"
                        value={formDetails.description}
                        onChange={inputChange}
                        className="h-72 w-3/4 focus:outline-none focus:ring focus:border-slate-100 border-1 rounded p-2"
                    />
                </div>
                <div className="flex">
                    <input
                        type="file"
                        onChange={(e) => onUpload(e.target.files)}
                        name="profile-pic"
                        id="profile-pic"
                        className="hidden"
                    />
                    <label htmlFor="profile-pic" className='block font-medium mb-2 hover:cursor-pointer' for='profile-pic'>Upload Image: <Image /></label>
                </div>


                <button
                    type="submit"
                    className="bg-slate-200 border-2 rounded-lg p-2 w-24 hover:border-3 hover:bg-slate-300"
                >
                    Upload
                </button>
            </form>
        </div>
    );
}

export default AddService;
