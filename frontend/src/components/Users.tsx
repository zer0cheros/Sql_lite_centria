import React from 'react';

export default function Users() {
    const [users, setUsers] = React.useState([]);
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    React.useEffect(() => {
        fetch('http://localhost:3000/users')
            .then(response => response.json())
            .then(data => setUsers(data));
    }, []);

    const addUsers = (event: React.FormEvent) => {
        event.preventDefault();
        const data = { name, email, password };

        fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json()) // Fix: returning JSON response correctly
        .then(data => setUsers([...users, data]))
        .catch(error => console.error("Error:", error));
    };

    return (
        <div className="flex flex-col items-center w-full max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">User List</h1>
            
            {/* User List */}
            <ul className="w-full mb-6">
                {users.length > 0 ? (
                    users.map((user: any) => (
                        <li key={user.id} className="bg-gray-200 p-3 rounded-lg mb-2 text-gray-700 text-lg text-center">
                            {user.name} - <span className="text-gray-500">{user.email}</span>
                        </li>
                    ))
                ) : (
                    <p className="text-gray-500 text-center">No users found.</p>
                )}
            </ul>

            {/* User Form */}
            <form onSubmit={addUsers} className="w-full flex flex-col gap-4">
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="p-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="p-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="p-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
                >
                    Add User
                </button>
            </form>
        </div>
    );
}
