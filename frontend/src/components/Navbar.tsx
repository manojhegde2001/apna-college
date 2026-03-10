import React from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const navLinkClass = ({ isActive }: { isActive: boolean }) =>
        `text-sm font-medium transition-colors ${isActive ? 'text-white font-bold underline underline-offset-4' : 'text-blue-100 hover:text-white'}`;

    return (
        <nav className="bg-primary text-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex items-center">
                        <Link to="/" className="text-2xl font-bold tracking-tight">Dashboard</Link>
                    </div>

                    <div className="flex items-center space-x-8">
                        <NavLink to="/" className={navLinkClass}>
                            Profile
                        </NavLink>
                        <NavLink to="/topics" className={navLinkClass}>
                            Topics
                        </NavLink>
                        <NavLink to="/progress" className={navLinkClass}>
                            Progress
                        </NavLink>
                        {user && (
                            <button
                                onClick={handleLogout}
                                className="bg-transparent hover:bg-white/10 border border-white/50 px-4 py-1.5 rounded text-sm font-medium transition-all"
                            >
                                Logout
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
