import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-8 px-4 md:px-8">
            <div className="max-w-screen-lg mx-auto flex flex-col md:flex-row justify-between items-center">
                <div className="text-lg font-semibold">Hospital Logo</div>
                <ul className="flex flex-col md:flex-row mt-4 md:mt-0">
                    <li className="mx-2 mb-2 md:mb-0">Home</li>
                    <li className="mx-2 mb-2 md:mb-0">Services</li>
                    <li className="mx-2 mb-2 md:mb-0">About Us</li>
                    <li className="mx-2 mb-2 md:mb-0">Contact</li>
                </ul>
            </div>
            <div className="text-center mt-4">
                <p>&copy; 2024 Hospital Name. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;
