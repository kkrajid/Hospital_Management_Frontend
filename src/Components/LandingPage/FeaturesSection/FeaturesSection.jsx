import React from 'react';

const FeaturesSection = () => {
    return (
        <section className="features-section bg-gray-300 py-20 px-4 md:px-8">
            <div className="max-w-screen-lg mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="feature bg-white rounded-lg p-6">
                        <h2 className="text-xl font-bold mb-2">Advanced Technology</h2>
                        <p className="text-lg">We use cutting-edge technology for diagnosis and treatment.</p>
                    </div>
                    <div className="feature bg-white rounded-lg p-6">
                        <h2 className="text-xl font-bold mb-2">Experienced Staff</h2>
                        <p className="text-lg">Our team consists of highly skilled and experienced medical professionals.</p>
                    </div>
                    <div className="feature bg-white rounded-lg p-6">
                        <h2 className="text-xl font-bold mb-2">Personalized Care</h2>
                        <p className="text-lg">We provide personalized care tailored to each patient's needs.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default FeaturesSection;
