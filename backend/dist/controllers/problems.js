import { getCollection } from '../mongoClient.js';
import { ObjectId } from 'mongodb';
export const getProblems = async (req, res) => {
    try {
        const problemCol = await getCollection('Problem');
        const problems = await problemCol.find().toArray();
        // Group problems by topic
        const grouped = problems.reduce((acc, problem) => {
            const topic = problem.topic;
            if (!acc[topic])
                acc[topic] = [];
            acc[topic].push({ ...problem, id: problem._id });
            return acc;
        }, {});
        res.json(grouped);
    }
    catch (error) {
        res.status(500).json({ message: 'Fetch problems failed', error });
    }
};
export const toggleProgress = async (req, res) => {
    const { problemId } = req.body;
    const userId = req.user.userId;
    try {
        const users = await getCollection('User');
        const user = await users.findOne({ _id: new ObjectId(userId) });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        let completedProblems = user.completedProblems || [];
        if (completedProblems.includes(problemId)) {
            completedProblems = completedProblems.filter((id) => id !== problemId);
        }
        else {
            completedProblems.push(problemId);
        }
        await users.updateOne({ _id: new ObjectId(userId) }, { $set: { completedProblems, updatedAt: new Date() } });
        res.json({ completedProblems });
    }
    catch (error) {
        res.status(500).json({ message: 'Toggle progress failed', error });
    }
};
//# sourceMappingURL=problems.js.map