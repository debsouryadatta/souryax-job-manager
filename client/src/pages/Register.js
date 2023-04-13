import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

const Register = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    const handleSubmit = async (e)=>{
        // console.log(name);
        e.preventDefault();
        try {
            const { data } = await axios.post('https://souryax-job-manager-dse2.vercel.app/api/v1/auth/register', {
                name: name,
                email: email,
                password: password
            })
            localStorage.setItem('token', data.token)
            // console.log(data.token);
            navigate('/home')
        } catch (error) {
            // console.log(error);
        }
    }

    return (
        <div className=''>
            <div className="flex items-center justify-center">
                <div
                    className="flex items-center justify-center px-4 py-10 sm:px-6 lg:px-8 sm:py-16 lg:py-24">
                    <div className="xl:w-full xl:max-w-sm 2xl:max-w-md xl:mx-auto">
                        <h2
                            className="text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl">
                            Register
                        </h2>
                        <p className="mt-2 text-base text-gray-600 dark:text-gray-300">
                            Already have an account?
                            <Link to='/login'  style={{cursor:"pointer"}}
                                title=""
                                className="font-medium text-indigo-600 transition-all duration-200 hover:text-indigo-700 hover:underline focus:text-indigo-700">
                                Log In
                            </Link>
                        </p>
                        <form onSubmit={handleSubmit} className="mt-8" >
                            <div className="space-y-5">
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="text-base font-medium text-gray-900 dark:text-gray-200">
                                        Full Name
                                    </label>
                                    <div className="mt-2.5">
                                        <input
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                                            type="text"
                                            placeholder="Enter You Full Name"
                                            id="name" onChange={(e)=>setName(e.target.value)}/>
                                    </div>
                                </div>
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="text-base font-medium text-gray-900 dark:text-gray-200">
                                        Email address
                                    </label>
                                    <div className="mt-2.5">
                                        <input
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                                            type="email"
                                            placeholder="Enter Your Email"
                                            id="email" onChange={(e)=>setEmail(e.target.value)}/>
                                    </div>
                                </div>
                                <div>
                                    <label
                                        htmlFor="password"
                                        className="text-base font-medium text-gray-900 dark:text-gray-200">
                                        Password
                                    </label>
                                    <div className="mt-2.5">
                                        <input
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                                            type="password"
                                            placeholder="Enter Your Password"
                                            id="password" onChange={(e)=>setPassword(e.target.value)}/>
                                    </div>
                                </div>
                                <div>
                                    <button type='button' onClick={handleSubmit}
                                        className="w-full inline-flex items-center justify-center rounded-md bg-indigo-600 px-3.5 py-2.5 text-base font-semibold leading-7 text-white hover:bg-indigo-500">
                                        Get started
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke-width="1.5"
                                            stroke="currentColor"
                                            className="w-4 h-4 ml-2">
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </form>
                        <div className="mt-3 space-y-3">
                            <p>
                                <span className="text-gray-500 dark:text-gray-400 text-sm">
                                    Read our
                                    <span className="capitalize text-indigo-600">privacy policy</span>
                                    and
                                    <span className="capitalize text-indigo-600">terms of service</span>
                                    to learn more
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register