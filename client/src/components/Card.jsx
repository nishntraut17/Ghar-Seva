import React from 'react'
import { Link } from 'react-router-dom'


const Card = ({ name, image, id }) => {
    return (
        <div>
            <Link to={`/service/${id}`} className='col-span-1'>
                <div className="rounded-md cursor-pointer duration-300 ease-in-out transform hover:-translate-y-1">
                    <div className="h-full w-full overflow-hidden rounded-md">
                        <img src={image} alt="service" className="object-cover w-full h-full transition duration-300 ease-in-out transform hover:scale-105 z-20" />
                    </div>
                    <p className="text-gray-900 font-bold text-xl mt-2">{name}</p>
                </div>
            </Link>
        </div>
    );

}

export default Card
