import React from "react";
import CountUp from "react-countup";

const HomeCircles = () => {
    return (
        <section className="flex flex-row gap-20 justify-center">
            <div className="z-10 rounded-full shadow-lg p-12">
                <CountUp
                    start={0}
                    end={5000}
                    delay={0}
                    enableScrollSpy={true}
                    scrollSpyDelay={500}
                >
                    {({ countUpRef }) => (
                        <div className="text-blue-400 font-bold">
                            <span ref={countUpRef} />+
                        </div>
                    )}
                </CountUp>
                <span className="font-bold text-gray-800">
                    Satisfied
                    <br />
                    Customers
                </span>
            </div>
            <div className="z-10 rounded-full shadow-lg p-12">
                <CountUp
                    start={0}
                    end={250}
                    delay={0}
                    enableScrollSpy={true}
                    scrollSpyDelay={500}
                >
                    {({ countUpRef }) => (
                        <div className="text-blue-400 font-bold">
                            <span ref={countUpRef} />+
                        </div>
                    )}
                </CountUp>
                <span className="font-bold text-gray-800">
                    Service
                    <br />
                    Providers
                </span>
            </div>
            <div className="z-10 rounded-full shadow-lg p-12">
                <span className="font-bold text-gray-800">Available in </span>
                <CountUp
                    start={0}
                    end={75}
                    delay={0}
                    enableScrollSpy={true}
                    scrollSpyDelay={500}
                >
                    {({ countUpRef }) => (
                        <div className="text-blue-400 font-bold">
                            <span ref={countUpRef} />+
                        </div>
                    )}
                </CountUp>
                <span className="font-bold text-gray-800">
                    Cities
                </span>
            </div>
        </section>
    );
};

export default HomeCircles;