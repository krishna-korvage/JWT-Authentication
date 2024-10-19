// resources/js/Pages/Auth/VerifyOtpRegister.jsx
import React from 'react';
import { useForm } from '@inertiajs/react';
import { route } from 'ziggy-js';

export default function VerifyOtpRegister() {
    const { data, setData, post, processing, errors } = useForm({
        otp: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route('auth.verify-otp-register'), {
            onSuccess: () => {
                // The success message will be handled by redirect in the controller
            },
            onError: () => {
                console.log('Verification failed. Please try again.');
            }
        });
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold text-center mb-6">Verify OTP</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Enter OTP</label>
                        <input
                            type="text"
                            className={`w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.otp ? 'border-red-500' : ''}`}
                            value={data.otp}
                            onChange={(e) => setData('otp', e.target.value)}
                        />
                        {errors.otp && <p className="text-red-500 text-xs mt-1">{errors.otp}</p>}
                    </div>
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition duration-300"
                    >
                        {processing ? 'Verifying...' : 'Verify OTP'}
                    </button>
                </form>
            </div>
        </div>
    );
}
