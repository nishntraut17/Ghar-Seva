import React from 'react'
import HomeBanner from '../assets/home.jpeg';
import Painting from '../assets/painting.jpeg';
import AC from '../assets/ac.jpeg';
import Repair from '../assets/repair.png';
import Cleaning from '../assets/cleaning.jpeg';
import ListOfCards from '../components/ListOfCards';
import HomeCircles from '../components/HomeCircles';

const Home = () => {
    // const cardItems = [{ ''}]
    return (
        <div className='m-10'>
            <div className='flex gap-20 px-20'>
                <div>

                    <h1 className='font-bold text-gray-800 text-left text-5xl'>
                        Home services at your doorstep.
                    </h1>
                    <div className='h-72 w-96 m-6 border-slate-50 rounded-lg'>
                        <p className='text-left py-6 px-2 text-2xl'>What are you looking for today?</p>
                        <div className='border-2 rounded-xl border-gray-200 h-64 p-9 px-12'>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="text-center bg-gray-100 rounded w-32 hover:cursor-pointer hover:scale-105">
                                    <img src={Painting} alt="painting" className="mx-auto mb-2" />
                                    <p>Painter</p>
                                </div>

                                <div className="text-center bg-gray-100 rounded w-32 hover:cursor-pointer hover:scale-105">
                                    <img src={AC} alt="ac-repair" className="mx-auto mb-2" />
                                    <p>Electrician</p>
                                </div>

                                <div className="text-center bg-gray-100 rounded w-32 hover:cursor-pointer hover:scale-105">
                                    <img src={Repair} alt="repair" className="mx-auto mb-2" />
                                    <p>Carpenter</p>
                                </div>

                                <div className="text-center bg-gray-100 rounded w-32 hover:cursor-pointer hover:scale-105">
                                    <img src={Cleaning} alt="cleaning" className="mx-auto mb-2" />
                                    <p>House Help</p>
                                </div>
                            </div>
                        </div>


                    </div>

                </div>

                <div className='h-96 mt-10'>
                    <img src={HomeBanner} alt='home' className='h-full' />
                </div>

            </div>
            <ListOfCards />
            <p className='mx-20 my-10 font-bold text-gray-800 text-left text-4xl'>About Us</p>
            <p className='mx-20 mb-20 font-bold text-gray-700 text-left '>Carpenter to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in s</p>
            <HomeCircles />
        </div>
    )
}

export default Home