import React from 'react';
import { usePage, Link } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { Inertia } from '@inertiajs/inertia';

export default function Welcome() {
    const { auth } = usePage().props;

    // Log the entire props to see what's being passed
    console.log('Page Props:', usePage().props);

    // Safe fallback for user name in case it's undefined
    const userName = auth && auth.user ? auth.user.name : 'Guest';
    
    // Log the userName to check its value
    console.log('Authenticated User Name:', userName);

    const handleLogout = (e) => {
        e.preventDefault();
        // Use Inertia to perform a POST request to the logout route
        Inertia.post(route('auth.logout'));
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome, {userName}!</h1>
                <p className="text-lg text-gray-700 mb-8">You've successfully logged into the Dashboard!</p>

                {/* View Users Link */}
                <Link
                    href={route('users.index')} // Ensure this route is correctly set up
                    className="block w-full bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300 mb-4"
                >
                    View Users
                </Link>

                {/* Logout Button */}
                <form onSubmit={handleLogout}>
                    <button
                        type="submit"
                        className="w-full bg-red-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
                    >
                        Logout
                    </button>
                </form>
            </div>
        </div>
    );
}
