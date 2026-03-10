import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const Login: React.FC = () => {
    const [email, setEmail] = useState('vipin@example.com');
    const [password, setPassword] = useState('password123');
    const [error, setError] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            const endpoint = isRegistering ? '/api/auth/register' : '/api/auth/login';
            const response = await axios.post(endpoint, {
                name: isRegistering ? email.split('@')[0] : undefined,
                email,
                password,
            });
            login(response.data.user, response.data.token);
            navigate('/');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Authentication failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="w-full max-w-[400px] bg-white rounded-lg shadow-[0_2px_10px_rgba(0,0,0,0.1)] p-10 border border-gray-200">
                <h1 className="text-4xl font-bold text-center text-slate-800 mb-10">
                    {isRegistering ? 'Sign Up' : 'Login'}
                </h1>

                {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-6 border border-red-100">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-600 mb-2">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2.5 rounded border border-gray-300 bg-blue-50/30 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                            placeholder="name@example.com"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-600 mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2.5 rounded border border-gray-300 bg-blue-50/30 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                            placeholder="••••••••"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-[#0052cc] hover:bg-[#0047b3] text-white font-bold py-3.5 rounded-lg shadow-md transition-all active:scale-[0.99]"
                    >
                        {isRegistering ? 'Sign Up' : 'Login'}
                    </button>
                </form>

                <div className="mt-8 text-center text-sm text-gray-500">
                    {isRegistering ? 'Already have an account?' : "Don't have an account?"}{' '}
                    <button
                        onClick={() => setIsRegistering(!isRegistering)}
                        className="text-primary font-semibold hover:underline"
                    >
                        {isRegistering ? 'Login' : 'Register now'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
