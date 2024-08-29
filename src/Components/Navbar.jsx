import React, { useState } from 'react'
import { lock, hamburgerMenu, close } from '../assets'
import { useAuthStore } from ".././Store/auth";
import { useSelector } from 'react-redux';
import { useNavigate,Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
    const [toggle, setToggle] = useState(false)
    const { isAuth, role } = useAuthStore();
    console.log(role)
    const navigate = useNavigate();
    console.log(isAuth);
    const setToken = useAuthStore((state) => state.setToken);

    const handleLogout = () => {
        useAuthStore.getState().logout();
    };
    const handleLogin = () => {
        navigate("/login");
    }

    const handleRegister = () => {
        navigate("/register");
    }


    return (
        <div className="w-full h-[96px] bg-white border-b">
            <div className="md:max-w-[1480px] max-w-[600px] w-full h-full  m-auto flex justify-between items-center">
                <img src='' alt="logo" className='h-[25px]' />
                <div className="hidden md:flex items-center ">
                    <ul className='flex gap-4 '>
                        <li >Home</li>
                        <li >About</li>
                        <li >Doctors</li>
                        <li >Contact</li>
                        <li >Pricing</li>
                    </ul>
                </div>
                {role !== 'patient'? (
                    <div className='hidden md:flex '>

                        <button className='flex gap-2 justify-between items-center bg-transparent px-6' onClick={handleLogin}>
                            <img src={lock} alt="" />
                            Login</button>
                        <button className='px-8 py-3 bg-[#355FCF] rounded-md text-white font-bold' onClick={handleRegister}>Sign Up</button>
                    </div>
                ):(
                    <div className='hidden md:flex '>
                        <Link className='flex gap-2 justify-between items-center bg-gray-100  rounded-full p-4 ' to={`/patient/profile`}>
                        <FontAwesomeIcon icon={faUser} className='text-gray-600' />
                            </Link>
                    </div>
                )}

                <div className='md:hidden' onClick={() => setToggle(!toggle)}>
                    <img src={toggle ? close : hamburgerMenu} alt="hamburgerMenu" />
                </div>
            </div>
            <div className={toggle ? 'absolute z-10 p-4 bg-white w-full px-8 md:hidden' : 'hidden'}>
                <ul>
                    <li className='p-4 hover:bg-gray-100' >Home</li>
                    <li className='p-4 hover:bg-gray-100'>About</li>
                    <li className='p-4 hover:bg-gray-100'>Doctors</li>
                    <li className='p-4 hover:bg-gray-100'>Contact</li>
                    <li className='p-4 hover:bg-gray-100'>Pricing</li>
                    {role === "patient" ? (
                        <div className='flex flex-col my-4 gap-4'>
                            <button className='flex gap-2 justify-center border border-[208486] items-center bg-transparent px-6 py-4' onClick={handleLogout}>
                                <img src={lock} alt="" />
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className='flex flex-col my-4 gap-4'>
                            <button className='flex gap-2 justify-center border border-[208486] items-center bg-transparent px-6 py-4' onClick={handleLogin}>
                                <img src={lock} alt="" />
                                Login
                            </button>
                            <button className='px-8 py-5 bg-[#355FCF] rounded-md text-white font-bold' onClick={handleRegister}>Sign Up</button>
                        </div>
                    )}


                </ul>


            </div>



        </div>
    )
}

export default Navbar