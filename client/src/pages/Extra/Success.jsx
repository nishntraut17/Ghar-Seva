import React from 'react';
import { Link } from 'react-router-dom';
import SuccessImg from "../../assets/success.gif"

const Success = () => {
    return (
        <div className='flex flex-col gap-10 items-center py-10'>
            <p className='text-slate-400 text-xl font-semibold hover:cursor-pointer'>Fees paid successfully</p>
            <img src={SuccessImg} alt="success-img" className='w-auto h-60' />
            <Link to={`/`} className='bg-gray-400 text-white p-2 rounded-lg'>Back to Home</Link>
        </div>
    )
}

export default Success
