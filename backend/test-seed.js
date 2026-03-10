const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('Testing Prisma connection...');
    try {
        const problemCount = await prisma.problem.count();
        console.log('Current problem count:', problemCount);

        if (problemCount === 0) {
            console.log('Seeding initial data...');
            await prisma.problem.create({
                data: {
                    name: 'Sort an Array',
                    topic: 'Algorithms',
                    leetcodeLink: 'https://leetcode.com/problems/sort-an-array/',
                    level: 'EASY',
                }
            });
            console.log('Seed successful!');
        }
    } catch (err) {
        console.error('Prisma connection failed:', err);
    } finally {
        await prisma.$disconnect();
    }
}

main();
