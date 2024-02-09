import React from 'react'
import { Link } from 'react-router-dom'

const Card = ({ name, image, id }) => {
    return (
        <div>
            <Link to={`/service/${id}`}>
                <div className='flex flex-col rounded-md gap-2 hover:z-10 hover:shadow-md transition-shadow hover:cursor-pointer hover:scale-110'>
                    <div className='h-40 w-40 rounded-md p-1'>
                        <img src={image} alt='service' className='h-full w-full rounded-md' />
                    </div>
                    <p>{name}</p>
                </div>
            </Link>
        </div>
    )
}

export default Card