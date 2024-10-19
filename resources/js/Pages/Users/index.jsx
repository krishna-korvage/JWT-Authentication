// resources/js/Pages/Users/Index.jsx
import React from 'react';
import { Link } from '@inertiajs/react'; // Ensure Link is imported
import { route } from 'ziggy-js';

const UserIndex = ({ users }) => {
    return (
        <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold mb-6">User List</h1>
            {/* Link to Add User Page */}
            <Link
                href={route('users.create')} // Ensure this route exists
                className="inline-block bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition mb-4"
            >
                Add User
            </Link>
            <table className="min-w-full bg-white border border-gray-300 mt-4">
                <thead>
                    <tr>
                        <th className="border-b-2 border-gray-300 px-4 py-2">ID</th>
                        <th className="border-b-2 border-gray-300 px-4 py-2">Name</th>
                        <th className="border-b-2 border-gray-300 px-4 py-2">Email</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td className="border-b border-gray-200 px-4 py-2">{user.id}</td>
                            <td className="border-b border-gray-200 px-4 py-2">{user.name}</td>
                            <td className="border-b border-gray-200 px-4 py-2">{user.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserIndex;
