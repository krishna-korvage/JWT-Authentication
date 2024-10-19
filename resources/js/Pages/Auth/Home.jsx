// resources/js/Pages/Auth/Home.jsx
import { Link } from '@inertiajs/react';

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-5xl font-bold text-gray-800 mb-8">
                Welcome to <span className="text-blue-500">Korvage</span>
            </h1>
            <div className="space-x-4">
                <Link 
                    href="/login" 
                    className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
                >
                    Login
                </Link>
                <Link 
                    href="/register" 
                    className="px-6 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition duration-300"
                >
                    Register
                </Link>
            </div>
        </div>
    );
}
