import React from 'react';
import { useForm } from '@inertiajs/react';
import { route } from 'ziggy-js'; // Ensure Ziggy's route helper is imported

export default function Register() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        mobile: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
    
        post(route('auth.register'), {
            onSuccess: (response) => {
                console.log('Response:', response); // Log the response
                Inertia.visit(route('auth.show-verify-otp-register'));
            },
            onError: () => {
                console.log('Registration failed. Please try again.');
            }
        });
    };
    

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold text-center mb-6">Register</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Name</label>
                        <input
                            type="text"
                            className={`w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.name ? 'border-red-500' : ''}`}
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input
                            type="email"
                            className={`w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email ? 'border-red-500' : ''}`}
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Mobile</label>
                        <input
                            type="text"
                            className={`w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.mobile ? 'border-red-500' : ''}`}
                            value={data.mobile}
                            onChange={(e) => setData('mobile', e.target.value)}
                        />
                        {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>}
                    </div>
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition duration-300"
                    >
                        {processing ? 'Submitting...' : 'Register'}
                    </button>
                </form>
            </div>
        </div>
    );
}
