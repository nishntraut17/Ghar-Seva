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
        <div className="mx-auto max-w-7xl">
            <div className="flex flex-col md:flex-row items-center justify-between px-4 md:px-20 py-10">
                <div className="md:w-1/2">
                    <h1 className="font-bold text-gray-800 text-5xl mb-6 text-left">
                        Home services at your doorstep.
                    </h1>
                    <div className="w-full md:w-96 border border-gray-200 rounded-lg">
                        <p className="text-gray-800 text-lg py-6 px-4">
                            What are you looking for today?
                        </p>
                        <div className="grid grid-cols-2 gap-4 p-4">
                            <div className="text-center bg-gray-100 rounded-lg hover:shadow-md">
                                <img src={Painting} alt="painting" className="mx-auto my-2 h-20" />
                                <p className="text-gray-800 font-semibold">Painter</p>
                            </div>
                            <div className="text-center bg-gray-100 rounded-lg hover:shadow-md">
                                <img src={AC} alt="ac-repair" className="mx-auto my-2 h-20" />
                                <p className="text-gray-800 font-semibold">Electrician</p>
                            </div>
                            <div className="text-center bg-gray-100 rounded-lg hover:shadow-md">
                                <img src={Repair} alt="repair" className="mx-auto my-2 h-20" />
                                <p className="text-gray-800 font-semibold">Carpenter</p>
                            </div>
                            <div className="text-center bg-gray-100 rounded-lg hover:shadow-md">
                                <img src={Cleaning} alt="cleaning" className="mx-auto my-2 h-20" />
                                <p className="text-gray-800 font-semibold">House Help</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="md:w-1/2 mt-10 md:mt-0">
                    <img src={HomeBanner} alt="home" className="w-full h-auto rounded-lg" />
                </div>
            </div>
            <ListOfCards />
            <div className="px-4 md:px-20 py-10">
                <h2 className="font-bold text-gray-800 text-4xl mb-6">About Us</h2>
                <p className="text-gray-700 leading-relaxed text-left md:text-center">
                    Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.
                    Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.
                    Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance.
                    The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in s
                </p>
            </div>
            <HomeCircles />
        </div>
    );

}

export default Home