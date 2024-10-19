import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { route } from 'ziggy-js';

export default function Login() {
    const [emailSubmitted, setEmailSubmitted] = useState(false);
    const { data, setData, post, errors } = useForm({
        email: '',
        otp: ''
    });

    const handleEmailSubmit = (e) => {
        e.preventDefault();
        post(route('auth.login'), {
            onSuccess: (page) => {
                console.log("Response from the server:", page);
                
                if (page.props.flash && page.props.flash.success) {
                    setEmailSubmitted(true);
                }
            },
            onError: (error) => {
                console.log('Error during email submission', error);
            }
        });
    };
    
    const handleOtpSubmit = (e) => {
        e.preventDefault();
        post(route('auth.login'), {
            onSuccess: () => {
                window.location.href = route('welcome');
            },
            onError: (error) => {
                console.log('Error during OTP submission', error);
            }
        });
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Login</h1>

            {/* Email Form */}
            {!emailSubmitted && (
                <form onSubmit={handleEmailSubmit} className="bg-white p-8 rounded-lg shadow-md w-96">
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            id="email"
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            required
                            className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:border-blue-500"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email}</p>}
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300">
                        Submit Email
                    </button>
                </form>
            )}

            {/* OTP Form */}
            {emailSubmitted && (
                <form onSubmit={handleOtpSubmit} className="bg-white p-8 rounded-lg shadow-md w-96">
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            value={data.email}
                            disabled
                            className="mt-1 p-2 w-full bg-gray-100 border border-gray-300 rounded-lg"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="otp" className="block text-sm font-medium text-gray-700">OTP</label>
                        <input
                            id="otp"
                            type="text"
                            value={data.otp}
                            onChange={(e) => setData('otp', e.target.value)}
                            required
                            className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:ring focus:ring-green-200 focus:border-green-500"
                        />
                        {errors.otp && <p className="text-red-500 text-sm mt-2">{errors.otp}</p>}
                    </div>
                    <button type="submit" className="w-full bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300">
                        Submit OTP
                    </button>
                </form>
            )}
        </div>
    );
}
