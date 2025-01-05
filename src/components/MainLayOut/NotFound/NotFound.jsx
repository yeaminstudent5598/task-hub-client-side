import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div
            className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center"
            style={{
                backgroundImage: `url('https://i.ibb.co.com/G3dk6fr/404-background-img.png')`,
            }}
        >
            {/* Subject Image */}
            <div className="mb-8">
                <img
                    src="https://i.ibb.co.com/cx5LNww/404-img.png"
                    alt="404 Bear"
                    className="max-w-xs md:max-w-sm"
                />
            </div>

            {/* Error Message */}
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Uh Oh...</h1>
            <p className="text-xl text-gray-600 mb-6">This page can't be found.</p>

            {/* Buttons */}
            <div className="flex space-x-4">
                <button
                    onClick={() => navigate(-1)}
                    className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition"
                >
                    GO BACK
                </button>
                <button
                    onClick={() => navigate('/')}
                    className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition"
                >
                    GO HOME
                </button>
            </div>
        </div>
    );
};

export default NotFound;
