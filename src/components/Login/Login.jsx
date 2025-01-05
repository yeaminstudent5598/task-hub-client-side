import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import auth from '../../Firebaseinit/Firebase.init';
import { toast } from 'react-toastify';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const provider = new GoogleAuthProvider();

    const handleEmailLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password)
            toast.success("Successfully logged in!");
              
            navigate('/');

        




        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await signInWithPopup(auth, provider)
            toast.success('Successfully logged in with Google!');
            navigate('/');
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="flex flex-wrap min-h-screen bg-gray-100 dark:bg-gray-900">
        {/* Image Section */}
        <div className="w-full md:w-1/2 flex items-center justify-center relative p-4 md:p-0">
            <img
                className="max-w-full dark:brightness-75 h-auto"
                src="https://i.ibb.co.com/ZgnxZyh/QZ-Auth-Light-V2-d6b0ba3d.png"
                alt="Auth Image"
            />
            <div className="absolute bottom-20 md:bottom-96 left-4 md:left-20 bg-white bg-opacity-80 dark:bg-gray-800 hidden lg:block p-4 rounded-lg shadow-md">
                <h1 className="text-lg md:text-xl font-bold text-gray-800 dark:text-white">
                    "Unlock Your Potential with TaskHub"
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                    Collaborate, learn, and succeed—together.
                </p>
            </div>
        </div>
    
        {/* Login Form Section */}
        <div className="w-full md:w-1/2 min-h-screen flex items-center justify-center p-6">
            <div className="w-full max-w-md p-6">
                <h2 className="text-2xl font-bold text-center text-gray-700 dark:text-gray-200">
                    Login to TaskHub
                </h2>
                <form onSubmit={handleEmailLogin} className="mt-6">
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-600 dark:text-gray-300"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="w-full px-4 py-2 mt-2 border rounded-lg focus:ring focus:ring-blue-200 dark:focus:ring-blue-800 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-600 dark:text-gray-300"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="w-full px-4 py-2 mt-2 border rounded-lg focus:ring focus:ring-blue-200 dark:focus:ring-blue-800 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 dark:focus:ring-blue-800"
                    >
                        Login
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-300">Or login with</p>
                    <button
                        onClick={handleGoogleLogin}
                        className="w-full px-4 py-2 mt-2 text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300 dark:focus:ring-red-800"
                    >
                        Google
                    </button>
                </div>
                <p className="mt-4 text-sm text-center text-gray-600 dark:text-gray-300">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-blue-500 hover:underline dark:text-blue-400">
                        Register here
                    </Link>
                </p>
            </div>
        </div>
    </div>
    
    
    );
};

export default Login;
