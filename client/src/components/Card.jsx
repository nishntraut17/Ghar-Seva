import React from 'react'
import { Link } from 'react-router-dom'

// const truncateDescription = (description, maxLength) => {
//     const words = description.split(' ');
//     if (words.length > maxLength) {
//         return words.slice(0, maxLength).join(' ') + '...';
//     }
//     return description;
// }

const Card = ({ name, image, id }) => {
    // const truncatedDescription = truncateDescription(description, 30);

    return (
        <div>
            <Link to={`/service/${id}`}>
                <div className="flex flex-col rounded-md gap-2 cursor-pointer hover:scale-105 border-2 border-gray-200 p-2 hover:shadow-md">
                    <div className="h-40 w-full rounded-md overflow-hidden">
                        <img src={image} alt="service" className="h-full w-full object-cover" />
                    </div>
                    <p className="text-gray-900 font-bold text-xl text-left">{name}</p>
                </div>
            </Link>
        </div>
    );
}

export default Card
