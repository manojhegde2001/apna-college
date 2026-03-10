import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';

interface Problem {
    id: string;
    name: string;
    level: 'EASY' | 'MEDIUM' | 'HARD';
}

const Progress: React.FC = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState({
        easy: 0,
        medium: 0,
        hard: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProgress = async () => {
            try {
                // Fetch all problems to categorize by level
                const problemsRes = await axios.get('/api/problems');
                const groupedProblems = problemsRes.data;

                // Extract all problems into a flat list
                const allProblems: Problem[] = [];
                Object.values(groupedProblems).forEach((problems: any) => {
                    allProblems.push(...problems);
                });

                // Get completed problems from user profile (refetched or from context)
                // Using the user object from context which should have completedProblems
                const completedIds = user?.completedProblems || [];

                const totalEasy = allProblems.filter(p => p.level === 'EASY').length;
                const totalMedium = allProblems.filter(p => p.level === 'MEDIUM').length;
                const totalHard = allProblems.filter(p => p.level === 'HARD').length;

                const doneEasy = allProblems.filter(p => p.level === 'EASY' && completedIds.includes(p.id)).length;
                const doneMedium = allProblems.filter(p => p.level === 'MEDIUM' && completedIds.includes(p.id)).length;
                const doneHard = allProblems.filter(p => p.level === 'HARD' && completedIds.includes(p.id)).length;

                setStats({
                    easy: totalEasy > 0 ? Math.round((doneEasy / totalEasy) * 100) : 0,
                    medium: totalMedium > 0 ? Math.round((doneMedium / totalMedium) * 100) : 0,
                    hard: totalHard > 0 ? Math.round((doneHard / totalHard) * 100) : 0
                });
            } catch (error) {
                console.error('Error fetching progress stats:', error);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchProgress();
        }
    }, [user]);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
                <div className="max-w-3xl">
                    <h1 className="text-3xl font-bold text-gray-900 mb-6">Progress Reports</h1>

                    {loading ? (
                        <div className="animate-pulse space-y-4">
                            <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                            <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                            <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                        </div>
                    ) : (
                        <div className="space-y-4 text-xl font-semibold text-gray-800">
                            <p>Easy: <span className="text-gray-900">{stats.easy}%</span></p>
                            <p>Medium: <span className="text-gray-900">{stats.medium}%</span></p>
                            <p>Hard: <span className="text-gray-900">{stats.hard}%</span></p>
                        </div>
                    )}
                </div>
            </main>

            <footer className="bg-white border-t border-gray-200 py-8">
                <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
                    © 2024 Dashboard. All Rights Reserved.
                </div>
            </footer>
        </div>
    );
};

export default Progress;
