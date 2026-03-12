import React from 'react';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';

const Dashboard: React.FC = () => {
    const { user } = useAuth();

    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <main className="max-w-7xl mx-auto py-12 px-8 text-left">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                    Welcome <span className="">{user?.name}</span>
                </h1>
                <p className="text-gray-600 mb-12">Email: {user?.email}</p>
            </main>

            <footer className="mt-20 py-8 border-t border-gray-100 bg-gray-50/50 text-center text-gray-500 text-sm">
                © 2026 Dashboard. All Rights Reserved.
            </footer>
        </div>
    );
};

export default Dashboard;
