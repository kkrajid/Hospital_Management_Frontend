import React, { useState } from "react";
// import doctorimg2 from "./../../assets/doctor2 (1).png";

const HeroSection = () => {
  const [showDoctorLogin, setShowDoctorLogin] = useState(false);

  const toggleLoginForm = () => {
    setShowDoctorLogin(!showDoctorLogin);
  };

  return (
    <section className="hero-section relative text-white py-0 px-4 md:px-8">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0452CE] to-[#061E40] transform -skew-y-6"></div>
      </div>
      <div className="hero-content max-w-screen-lg mx-auto flex flex-col md:flex-row relative z-10 ">
        <div className="w-full md:w-[50%] h-full flex flex-col text-center md:text-left justify-center md:py-44 my-4 md:my-0">
          <div className="">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Book Your Doctor Appointment Online.
            </h1>
            <p className="text-lg md:text-sm mb-6 md:whitespace-normal">
              A Healthier Tomorrow Starts Today: Schedule Your Appointment!
              <br />
              Your Wellness, Our Expertise: Set Up Your Appointment Today.
            </p>
            <div className="hidden md:flex flex-col md:flex-row space-y-4 md:space-x-4 md:space-y-0">
              <button className="bg-white text-black py-2 px-6 rounded-lg shadow-md hover:bg-opacity-70 transition duration-300">
                BOOK APPOINTMENT
              </button>
              <button className="bg-transparent border-2 border-white  text-white py-2 px-6 rounded-lg shadow-md hover:bg-opacity-70 transition duration-300">
                CALL NOW
              </button>
            </div>
          </div>
        </div>
        <div className="w-full md:w-[50%] h-full flex items-center justify-center my-6 md:my-0 md:py-52">
          <div className=" w-[100%] md:w-[60%] h-[90%] bg-white sample2 p-5 rounded-lg">
            <div
              className={showDoctorLogin ? "hidden" : "admin-login text-center"}
            >
              <h2 className="text-black text-xl mb-4">Admin Login</h2>
              <form className="flex flex-col">
                <input
                  type="text"
                  placeholder="Username"
                  className="bg-gray-200 border-2 rounded-md border-black text-white mb-2 py-2 px-1"
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="bg-gray-200 border-2 rounded-md border-black text-white mb-2 py-2 px-1"
                />
                <button
                  type="submit"
                  className="bg-orange-500 text-white    py-1 px-4 rounded-lg shadow-md hover:bg-opacity-70 transition duration-300"
                >
                  Login
                </button>
              </form>
              <button onClick={toggleLoginForm} className="text-blue-500 mt-4">
                Switch to Doctor Login
              </button>
            </div>
            <div
              className={
                showDoctorLogin ? "doctor-login text-center" : "hidden"
              }
            >
              <h2 className="text-black text-xl mb-4">Doctor Login</h2>
              <form className="flex flex-col">
                <input
                  type="text"
                  placeholder="Username"
                  className="bg-gray-200 border-2 rounded-md border-black text-white mb-2 py-2 px-1"
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="bg-gray-200 border-2 rounded-md border-black text-white mb-2 py-2 px-1"
                />
                <button
                  type="submit"
                  className="bg-orange-500 text-white    py-1 px-4 rounded-lg shadow-md hover:bg-opacity-70 transition duration-300"
                >
                  Login
                </button>
              </form>
              <button onClick={toggleLoginForm} className="text-blue-500 mt-4">
                Switch to Admin Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
