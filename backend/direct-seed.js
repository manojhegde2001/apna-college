const { MongoClient, ObjectId } = require('mongodb');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const url = process.env.DATABASE_URL || "mongodb+srv://manojhegde2001_db_user:10052001@cluster0.wtprzk3.mongodb.net/dsa-sheet?appName=Cluster0";
const client = new MongoClient(url);

const topics = [
    {
        name: 'Algorithms',
        problems: [
            { name: 'Sorting Algorithms', level: 'EASY', leetcode: 'sort-an-array', youtube: 'kYIthS_9V3w', article: 'sorting-algorithms' },
            { name: 'Searching Algorithms', level: 'EASY', leetcode: 'binary-search', youtube: 'fDKIpRe8GW4', article: 'binary-search' },
            { name: 'Dynamic Programming', level: 'MEDIUM', leetcode: 'climbing-stairs', youtube: 'FffuK-Y3_T0', article: 'dynamic-programming' },
            { name: 'Greedy Algorithms', level: 'MEDIUM', leetcode: 'assign-cookies', youtube: 'ARvQitsh4LQ', article: 'greedy-algorithms' },
            { name: 'Divide and Conquer', level: 'MEDIUM', leetcode: 'merge-sorted-array', youtube: 'mB5HXBAMZ6w', article: 'divide-and-conquer' },
            { name: 'Backtracking', level: 'HARD', leetcode: 'n-queens', youtube: 'Ph95IHmRp5M', article: 'backtracking' },
        ]
    },
    {
        name: 'Data Structures',
        problems: [
            { name: 'Arrays Basics', level: 'EASY', leetcode: 'two-sum', youtube: 'UXDSeD9mN-k', article: 'array-data-structure' },
            { name: 'Linked List', level: 'MEDIUM', leetcode: 'reverse-linked-list', youtube: 'G0_I-ZF0S38', article: 'linked-list-data-structure' },
            { name: 'Stacks & Queues', level: 'MEDIUM', leetcode: 'implement-stack-using-queues', youtube: 'wjI1WNcIntg', article: 'stack-data-structure' },
            { name: 'Trees & BST', level: 'MEDIUM', leetcode: 'validate-binary-search-tree', youtube: 'f-uKNo_8fO0', article: 'binary-search-tree' },
            { name: 'Graphs', level: 'HARD', leetcode: 'number-of-islands', youtube: 'pV2kpPD66nE', article: 'graph-data-structure' },
            { name: 'Heaps', level: 'HARD', leetcode: 'kth-largest-element-in-an-array', youtube: 'HqPJF2L5h9U', article: 'heap-data-structure' },
        ]
    },
    {
        name: 'Databases',
        problems: [
            { name: 'SQL Injection Basics', level: 'MEDIUM', leetcode: 'tag/database', youtube: '1nVGXidp7G0', article: 'sql-injection' },
            { name: 'Normalization', level: 'EASY', leetcode: 'tag/database', youtube: 'ur1pPrVClZA', article: 'database-normalization' },
            { name: 'Indexing', level: 'MEDIUM', leetcode: 'tag/database', youtube: 'aZjYBA7pX9A', article: 'database-index' },
            { name: 'Transactions', level: 'HARD', leetcode: 'tag/database', youtube: 'T7mQidp96aE', article: 'database-transaction' },
            { name: 'NoSQL vs SQL', level: 'EASY', leetcode: 'tag/database', youtube: 'ZS_kXvOeQ5Y', article: 'nosql-vs-sql' },
        ]
    },
    {
        name: 'Machine Learning',
        problems: [
            { name: 'Linear Regression', level: 'EASY', leetcode: 'tag/machine-learning', youtube: 'PaFPbb66DxQ', article: 'linear-regression' },
            { name: 'Neural Networks', level: 'HARD', leetcode: 'tag/machine-learning', youtube: 'aircAruvnKk', article: 'artificial-neural-network' },
            { name: 'Clustering', level: 'MEDIUM', leetcode: 'tag/machine-learning', youtube: '4b5d3muPQmA', article: 'cluster-analysis' },
            { name: 'Decision Trees', level: 'MEDIUM', leetcode: 'tag/machine-learning', youtube: '7VeUPuFGJHk', article: 'decision-tree' },
        ]
    },
    {
        name: 'Operating Systems',
        problems: [
            { name: 'Process Scheduling', level: 'MEDIUM', leetcode: 'tag/operating-system', youtube: 'zF_T_p3O8Cg', article: 'scheduling-computing' },
            { name: 'Memory Management', level: 'HARD', leetcode: 'tag/operating-system', youtube: 'r-j6uX6S3y4', article: 'memory-management' },
            { name: 'Deadlocks', level: 'HARD', leetcode: 'tag/operating-system', youtube: '2i2S_O37C1s', article: 'deadlock' },
            { name: 'Virtualization', level: 'MEDIUM', leetcode: 'tag/operating-system', youtube: 'w7_Y-uO0q0', article: 'virtualization' },
        ]
    },
    {
        name: 'Networks',
        problems: [
            { name: 'TCP/IP Model', level: 'MEDIUM', leetcode: 'tag/networking', youtube: 'nOn_YI6S_q0', article: 'internet-protocol-suite' },
            { name: 'DNS Resolution', level: 'EASY', leetcode: 'tag/networking', youtube: '27r46hps6pA', article: 'domain-name-system' },
            { name: 'HTTP/HTTPS', level: 'EASY', leetcode: 'tag/networking', youtube: 'h_6_E_R6G9A', article: 'https' },
            { name: 'Load Balancing', level: 'MEDIUM', leetcode: 'tag/networking', youtube: 'K0697Y4z5zM', article: 'load-balancing-computing' },
        ]
    }
];

async function run() {
    try {
        await client.connect();
        const database = client.db("dsa-sheet");
        const problemCol = database.collection("Problem");
        const userCol = database.collection("User");

        console.log("Cleaning up...");
        await problemCol.deleteMany({});
        // We might not want to delete ALL users if the user has accounts, 
        // but for seeding "credentials" we will.
        console.log("Cleaning up users...");
        await userCol.deleteMany({ email: 'vipin@example.com' });

        console.log("Seeding user...");
        const hashedPassword = await bcrypt.hash('password123', 10);
        await userCol.insertOne({
            name: 'Vipin Hegde',
            email: 'vipin@example.com',
            password: hashedPassword,
            completedProblems: [],
            createdAt: new Date(),
            updatedAt: new Date()
        });

        console.log("Seeding problems...");
        const problemsToInsert = [];
        topics.forEach(topic => {
            topic.problems.forEach(p => {
                problemsToInsert.push({
                    name: p.name,
                    topic: topic.name,
                    leetcodeLink: `https://leetcode.com/problems/${p.leetcode}/`,
                    youtubeLink: `https://www.youtube.com/watch?v=${p.youtube}`,
                    articleLink: `https://www.geeksforgeeks.org/${p.article}/`,
                    level: p.level,
                    createdAt: new Date(),
                    updatedAt: new Date()
                });
            });
        });

        const result = await problemCol.insertMany(problemsToInsert);
        console.log(`${result.insertedCount} problems were inserted`);
        console.log("Seeding complete. Use vipin@example.com / password123 to login.");

    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
}
run();
