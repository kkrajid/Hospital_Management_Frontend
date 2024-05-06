import React from 'react';

const Header = () => {
    return (
        <header className="bg-[#FFFFFF] text-black p-4 flex justify-between items-center">
            <div className="text-lg font-semibold">Hospital Logo</div>
            <nav className="hidden md:flex">
                <ul className="flex">
                    <li className="mx-2">Home</li>
                    <li className="mx-2">Services</li>
                    <li className="mx-2">About Us</li>
                    <li className="mx-2">Contact</li>
                </ul>
            </nav>
            <div className='hidden md:flex gap-5'>
                <div className='bg-white text-black px-2 rounded-[5px]'>
                    Patient login
                </div>
            </div>
            <button className="md:hidden focus:outline-none">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
            </button>
        </header>
    );
}

export default Header;
