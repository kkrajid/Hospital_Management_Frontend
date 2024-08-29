import { Link, useNavigate, Navigate } from "react-router-dom";
import { loginRequest } from "../../api/user";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useAuthStore } from "../../Store/auth";
import LoadingSpinner from "../../Components/LoadingSpinner";
import { useSelector } from 'react-redux';


const LoginPage = () => {
  const navigate = useNavigate();
  const { isAuth } = useAuthStore();
  const setToken = useAuthStore((state) => state.setToken);


  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });


  const handleInputChange = (e) => {
    const { name, value} = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const loginMutation = useMutation({
    mutationFn: () => loginRequest(formData),
    onSuccess: (response) => {
      setToken(response.data.token);
      toast.success(
        <div>
          Login Successfull!
        </div>,
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          style: {
            backgroundColor: "#4CAF50",
            color: "white",
            fontSize: "16px",
            fontWeight: "bold",
            border: "none",
            width: "100%",
            textAlign: "center",
          },
        }
      );
      navigate("/");
    },
    onError: (error) => {
      const firstErrorMessage = error.response.data.message
      console.log(error);

      toast.error(
        <div>
          {firstErrorMessage}
        </div>,
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          style: {
            backgroundColor: "#ff4d4f",
            color: "white",
            fontSize: "16px",
            fontWeight: "bold",
            border: "none",
            width: "100%",
            textAlign: "center",
          },
        }
      );
    },
  });

  

  const handleSubmit = (event) => {
    event.preventDefault();
    loginMutation.mutate();
  };

  if (loginMutation.isLoading) {
    return <LoadingSpinner />;
  }
  if (isAuth) return <Navigate to="/" />;

  return (
    <>
    <div className="min-h-screen flex justify-center items-center bg-gray-200 ">
      <div className="box-area w-100 p-6 bg-white rounded-lg shadow-xl border-2 ">
        <div className="flex flex-col md:flex-row space-y-6 md:space-x-6">
          <div className="md:w-1/2 bg-[#4CAEC8] rounded-lg p-6">
            <div className="mb-3">
              <img src="Hospital Image" placeholder="Hospital Image" alt="Hospital Logo" className="w-48 mx-auto" />
            </div>
          </div>

          <form className="md:w-1/2 p-6" onSubmit={handleSubmit}>
            <div className="mb-4">
              <h2 className="text-2xl font-semibold">Patient Login</h2>
              <p>Welcome back! Please sign in to access your account.</p>
            </div>
            <input
              type="text"
              className="form-input mb-2 w-full py-3 px-4 text-sm bg-gray-100"
              placeholder="Email Address"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <input
              type="password"
              className="form-input mb-2 w-full py-3 px-4 text-sm bg-gray-100"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
            <div className="flex justify-between items-center mb-5">
              <label htmlFor="formCheck" className="text-secondary text-sm">
                {/* <input
                  type="checkbox"
                  className="form-checkbox"
                  id="formCheck"
                />
                <span className="ml-1">Remember Me</span> */}
              </label>
              <div className="forgot">
                <small>
                  {/* <a href="#">Forgot Password?</a> */}
                </small>
              </div>
            </div>
            <button className="bg-[#4CAEC8] text-white w-full py-3 text-sm">Login</button>
            <div className="mt-2">
              <small>Don't have an account? <Link to={'/register'}>Register</Link></small>
            </div>
          </form>
        </div>
      </div>
    </div>
 
    {/* <div className="min-h-screen flex justify-center items-center">
      <div className="box-area w-100 p-6 bg-white rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row space-y-6 md:space-x-6">
          <div className="md:w-1/2 bg-blue-600 rounded-lg p-6">
            <div className="mb-3">
              <img src="images/1.png" alt="Logo" className="w-48 mx-auto" />
            </div>
          </div>

          <div className="md:w-1/2 p-6">
            <div className="mb-4">
              <h2 className="text-2xl font-semibold">Hello, Again</h2>
              <p>We are happy to have you back.</p>
            </div>
            <input
              type="text"
              className="form-input mb-2 w-full py-3 px-4 text-sm bg-gray-100"
              placeholder="Email address"
            />
            <input
              type="password"
              className="form-input mb-2 w-full py-3 px-4 text-sm bg-gray-100"
              placeholder="Password"
            />
            <div className="flex justify-between items-center mb-5">
              <label htmlFor="formCheck" className="text-secondary text-sm">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  id="formCheck"
                />
                <span className="ml-1">Remember Me</span>
              </label>
              <div className="forgot">
                <small>
                  <a href="#">Forgot Password?</a>
                </small>
              </div>
            </div>
            <button className="bg-blue-500 text-white w-full py-3 text-sm">Login</button>
            <div className="mt-2">
              <small>Don't have an account? <a href="#">Sign Up</a></small>
            </div>
          </div>
        </div>
      </div>
    </div>
 */}


    {/* <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-[800px] lg:py-0">
      <Link
        to="/"
        className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
      >
        <img
          className="w-8 h-8 mr-2"
          src=""
          alt=""
        />
        <span></span>
      </Link>
      <div className="w-full md:w-[400px] lg:w-[500px] bg-slate-300 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Log In to Shop Zone
          </h1>
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your email
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Sign in
            </button>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Dont have an account?{" "}
              <Link
                to={"/register"}
                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div> */}
    </>
  );
};

export default LoginPage;
