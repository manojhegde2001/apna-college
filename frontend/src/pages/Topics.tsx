import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface Problem {
    id: string;
    name: string;
    topic: string;
    leetcodeLink: string;
    youtubeLink: string;
    articleLink: string;
    level: string;
}

const Topics: React.FC = () => {
    const [groupedProblems, setGroupedProblems] = useState<{ [key: string]: Problem[] }>({});
    const [expandedTopics, setExpandedTopics] = useState<string[]>([]);
    const { user, token, login } = useAuth();

    useEffect(() => {
        const fetchProblems = async () => {
            try {
                const res = await axios.get('/api/problems');
                setGroupedProblems(res.data);
            } catch (err) {
                console.error('Failed to fetch problems', err);
            }
        };
        fetchProblems();
    }, []);

    const toggleTopic = (topic: string) => {
        setExpandedTopics((prev) =>
            prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
        );
    };

    const handleToggleProgress = async (problemId: string) => {
        try {
            const res = await axios.post(
                '/api/problems/toggle',
                { problemId },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            // Update local user state
            const updatedUser = { ...user, completedProblems: res.data.completedProblems };
            login(updatedUser, token!);
        } catch (err) {
            console.error('Failed to toggle progress', err);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Topics</h1>
                    <p className="text-gray-500">Explore these exciting topics!</p>
                </div>

                <div className="space-y-4">
                    {Object.entries(groupedProblems).map(([topic, problems]) => (
                        <div key={topic} className="bg-white rounded-lg shadow-sm border-none overflow-hidden">
                            <button
                                onClick={() => toggleTopic(topic)}
                                className="w-full flex items-center justify-between p-4 px-6 bg-[#00c5e4] text-white hover:bg-[#00b2ce] transition-all"
                            >
                                <div className="flex items-center space-x-3">
                                    <span className="text-xl font-bold">{topic}</span>
                                    <span className="bg-[#ff4d4d] text-white px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider">
                                        Pending
                                    </span>
                                </div>
                                {expandedTopics.includes(topic) ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
                            </button>

                            {expandedTopics.includes(topic) && (
                                <div className="p-10 px-12 bg-[#f8fbff]">
                                    <h3 className="text-3xl font-bold mb-6 text-gray-800">Sub Topics</h3>
                                    <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
                                        <table className="w-full text-left border-collapse">
                                            <thead className="bg-[#f1f5f9] text-gray-600 text-sm font-bold border-b border-gray-200">
                                                <tr>
                                                    <th className="px-6 py-4 w-12 text-center"></th>
                                                    <th className="px-6 py-4 min-w-[200px]">Name</th>
                                                    <th className="px-6 py-4">LeetCode Link</th>
                                                    <th className="px-6 py-4">YouTube Link</th>
                                                    <th className="px-6 py-4">Article Link</th>
                                                    <th className="px-6 py-4">Level</th>
                                                    <th className="px-6 py-4">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-100">
                                                {problems.map((p) => (
                                                    <tr key={p.id} className="hover:bg-blue-50/30 transition-all font-medium">
                                                        <td className="px-6 py-4 text-center">
                                                            <input
                                                                type="checkbox"
                                                                checked={user?.completedProblems?.includes(p.id)}
                                                                onChange={() => handleToggleProgress(p.id)}
                                                                className="w-4 h-4 rounded border-gray-300 text-[#0052cc] focus:ring-[#0052cc] cursor-pointer"
                                                            />
                                                        </td>
                                                        <td className="px-6 py-4 text-gray-800">{p.name}</td>
                                                        <td className="px-6 py-4">
                                                            <a href={p.leetcodeLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Practise</a>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <a href={p.youtubeLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Watch</a>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <a href={p.articleLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Read</a>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <span className={`text-xs font-bold ${p.level === 'EASY' ? 'text-gray-800' : p.level === 'MEDIUM' ? 'text-gray-800' : 'text-gray-800'}`}>
                                                                {p.level}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <span className={`text-sm font-medium ${user?.completedProblems?.includes(p.id) ? 'text-gray-800' : 'text-gray-800'}`}>
                                                                {user?.completedProblems?.includes(p.id) ? 'Done' : 'Pending'}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default Topics;
