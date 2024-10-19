// resources/js/Pages/Users/UserManagement.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [editUserId, setEditUserId] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('/api/users'); // Replace with your API endpoint
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleCreateUser = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/users', { name, email, mobile }); // Replace with your API endpoint
            setUsers([...users, response.data]); // Add the new user to the list
            setName('');
            setEmail('');
            setMobile('');
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    const handleEditUser = (user) => {
        setName(user.name);
        setEmail(user.email);
        setMobile(user.mobile);
        setEditUserId(user.id);
    };

    const handleUpdateUser = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`/api/users/${editUserId}`, { name, email, mobile }); // Replace with your API endpoint
            setUsers(users.map((user) => (user.id === editUserId ? response.data : user))); // Update the user in the list
            setName('');
            setEmail('');
            setMobile('');
            setEditUserId(null);
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const handleDeleteUser = async (id) => {
        try {
            await axios.delete(`/api/users/${id}`); // Replace with your API endpoint
            setUsers(users.filter((user) => user.id !== id)); // Remove the user from the list
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold mb-6">User Management</h1>
            <form onSubmit={editUserId ? handleUpdateUser : handleCreateUser}>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border border-gray-300 rounded-md p-2"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border border-gray-300 rounded-md p-2"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Mobile</label>
                    <input
                        type="text"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        className="w-full border border-gray-300 rounded-md p-2"
                        required
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md">
                    {editUserId ? 'Update User' : 'Add User'}
                </button>
            </form>
            <table className="min-w-full bg-white border border-gray-300 mt-4">
                <thead>
                    <tr>
                        <th className="border-b-2 border-gray-300 px-4 py-2">ID</th>
                        <th className="border-b-2 border-gray-300 px-4 py-2">Name</th>
                        <th className="border-b-2 border-gray-300 px-4 py-2">Email</th>
                        <th className="border-b-2 border-gray-300 px-4 py-2">Mobile</th>
                        <th className="border-b-2 border-gray-300 px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td className="border-b border-gray-200 px-4 py-2">{user.id}</td>
                            <td className="border-b border-gray-200 px-4 py-2">{user.name}</td>
                            <td className="border-b border-gray-200 px-4 py-2">{user.email}</td>
                            <td className="border-b border-gray-200 px-4 py-2">{user.mobile}</td>
                            <td className="border-b border-gray-200 px-4 py-2">
                                <button
                                    onClick={() => handleEditUser(user)}
                                    className="bg-yellow-500 text-white px-2 py-1 rounded-md"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDeleteUser(user.id)}
                                    className="bg-red-500 text-white px-2 py-1 rounded-md ml-2"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserManagement;
