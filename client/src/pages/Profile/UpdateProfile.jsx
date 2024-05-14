import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Image } from '@mui/icons-material';
import { setUserInfo, selectCurrentUser } from '../../redux/reducers/authSlice';

const UpdateProfile = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const user = useSelector(selectCurrentUser);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [file, setFile] = useState("");
    const [info, setInfo] = useState({});

    useEffect(() => {
        setLoading(true);
        const getUser = async () => {
            try {
                const { data } = await axios.get(`http://localhost:5000/api/user/${id}`, {
                    headers: {
                        'authorization': `Bearer ${localStorage.getItem("token")}`
                    }
                });
                setInfo({
                    name: data.name,
                    email: data.email,
                    mobile: data.mobile,
                    address: data.address,
                    city: data.city,
                    password: "",
                });
                setFile(data.profileImage);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        getUser();
    }, [id, setInfo]);

    const onUpload = async (element) => {
        setLoading(true);
        if (element.type === "image/jpeg" || element.type === "image/png") {
            const data = new FormData();
            data.append("file", element);
            data.append("upload_preset", process.env.REACT_APP_CLOUDINARY_PRESET);
            data.append("cloud_name", process.env.REACT_APP_CLOUDINARY_CLOUD_NAME);
            fetch(process.env.REACT_APP_CLOUDINARY_BASE_URL, {
                method: "POST",
                body: data,
            })
                .then((res) => res.json())
                .then((data) => setFile(data.url.toString()));
            setLoading(false);
        } else {
            setLoading(false);
        }
    };

    const formSubmit = async (e) => {
        try {
            e.preventDefault();
            if (loading) return;
            if (file === "") return;

            const { name, email, password, address, mobile, city } = info;
            if (!email || !password || !name) {
                return toast.error("Input field should not be empty");
            } else if (password.length < 5) {
                return toast.error("Password must be at least 5 characters long");
            }

            await toast.promise(
                axios.put(`http://localhost:5000/api/user/${id}`, {
                    city, name, email, password, address, mobile, profileImage: file
                }, {
                    headers: {
                        'authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                }),
                {
                    success: "Updated Successfully",
                    error: "Unable to Update",
                    loading: "updating user details...",
                }
            );
            dispatch(setUserInfo({ _id: id, name: info.name, email: info.email, profileImage: file, role: user.role, city: info.city }));
            return navigate(`/profile/${id}`);
        } catch (error) {
            console.log('Error', error);
        }
    };

    const handleChange = (e) => {
        setInfo({ ...info, [e.target.name]: e.target.value });
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="flex flex-col items-center text-gray-700 pb-10">
            <h1 className="text-3xl font-bold my-6 text-center">Update Profile</h1>
            <form onSubmit={formSubmit} className="flex flex-col items-center gap-4">
                <div>
                    <div className="flex flex-col items-start gap-2">
                        <label htmlFor="name" className="text-lg font-medium">Name</label>
                        <input type="text" id="name" name="name" value={info.name} onChange={handleChange} className="w-96 border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300" />
                    </div>
                    <div className="flex flex-col items-start gap-2">
                        <label htmlFor="email" className="text-lg font-medium">Email</label>
                        <input type="email" id="email" name="email" value={info.email} onChange={handleChange} className="w-96 border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300" disabled />
                    </div>
                    <div className="flex flex-col items-start gap-2">
                        <label htmlFor="mobile" className="text-lg font-medium">Mobile</label>
                        <input type="number" id="mobile" name="mobile" value={info.mobile} onChange={handleChange} className="w-96 border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300" />
                    </div>
                    <div className="flex flex-col items-start gap-2">
                        <label htmlFor="address" className="text-lg font-medium">Address</label>
                        <input type="text" id="address" name="address" value={info.address} onChange={handleChange} className="w-96 border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300" />
                    </div>
                    <div className="flex flex-col items-start gap-2">
                        <label htmlFor="address" className="text-lg font-medium">City</label>
                        <select
                            id="city"
                            name="city"
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg sm:leading-6"
                            value={info.city}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select City</option>
                            <option value="Pune">Pune</option>
                            <option value="Mumbai">Mumbai</option>
                            <option value="Surat">Surat</option>
                            <option value="Delhi">Delhi</option>
                        </select>
                    </div>
                    <div className="flex flex-col items-start gap-2">
                        <label htmlFor="password" className="text-lg font-medium">Password</label>
                        <input type="password" id="password" name="password" value={info.password} onChange={handleChange} className="w-96 border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300" />
                    </div>
                </div>
                <div className="flex flex-col items-start gap-2">
                    <label htmlFor="profile-pic" className="text-lg font-medium cursor-pointer" for="profile-pic">Upload Image: <Image /></label>
                    <input type="file" onChange={(e) => onUpload(e.target.files[0])} name="profile-pic" id="profile-pic" className="hidden" />
                    <img src={file} alt="profile" className="h-40 w-40 mt-4 rounded-md" />
                </div>
                <button type="submit" className="text-white font-bold bg-blue-500 w-32 border-blue-500 rounded-md py-2 hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">
                    Update
                </button>
            </form>
        </div>
    );
};

export default UpdateProfile;
