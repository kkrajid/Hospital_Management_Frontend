import React from 'react';

const ServicesSection = () => {
    return (
        <section className="services-section bg-gray-200 py-20 px-4 md:px-8">
            <div className="max-w-screen-lg mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Our Services</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="service bg-white rounded-lg p-6 flex flex-col justify-between">
                        <div>
                            <h3 className="text-xl font-semibold mb-4">Service 1</h3>
                            <p className="text-lg">Description of Service 1 goes here.</p>
                        </div>
                        <button className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 hover:bg-blue-600 transition duration-300">Learn More</button>
                    </div>
                    <div className="service bg-white rounded-lg p-6 flex flex-col justify-between">
                        <div>
                            <h3 className="text-xl font-semibold mb-4">Service 2</h3>
                            <p className="text-lg">Description of Service 2 goes here.</p>
                        </div>
                        <button className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 hover:bg-blue-600 transition duration-300">Learn More</button>
                    </div>
                    <div className="service bg-white rounded-lg p-6 flex flex-col justify-between">
                        <div>
                            <h3 className="text-xl font-semibold mb-4">Service 3</h3>
                            <p className="text-lg">Description of Service 3 goes here.</p>
                        </div>
                        <button className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 hover:bg-blue-600 transition duration-300">Learn More</button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ServicesSection;
