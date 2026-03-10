const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const problems = [
    {
        name: 'Sorting Algorithms',
        topic: 'Algorithms',
        leetcodeLink: 'https://leetcode.com/problems/sort-an-array/',
        youtubeLink: 'https://www.youtube.com/watch?v=kYIthS_9V3w',
        articleLink: 'https://www.geeksforgeeks.org/sorting-algorithms/',
        level: 'EASY',
    },
    {
        name: 'Searching Algorithms',
        topic: 'Algorithms',
        leetcodeLink: 'https://leetcode.com/problems/binary-search/',
        youtubeLink: 'https://www.youtube.com/watch?v=fDKIpRe8GW4',
        articleLink: 'https://www.geeksforgeeks.org/searching-algorithms/',
        level: 'EASY',
    },
    {
        name: 'Dynamic Programming',
        topic: 'Algorithms',
        leetcodeLink: 'https://leetcode.com/problems/climbing-stairs/',
        youtubeLink: 'https://www.youtube.com/watch?v=FffuK-Y3_T0',
        articleLink: 'https://www.geeksforgeeks.org/dynamic-programming/',
        level: 'MEDIUM',
    },
    {
        name: 'Greedy Algorithms',
        topic: 'Algorithms',
        leetcodeLink: 'https://leetcode.com/problems/assign-cookies/',
        youtubeLink: 'https://www.youtube.com/watch?v=ARvQitsh4LQ',
        articleLink: 'https://www.geeksforgeeks.org/greedy-algorithms/',
        level: 'MEDIUM',
    },
    {
        name: 'Divide and Conquer',
        topic: 'Algorithms',
        leetcodeLink: 'https://leetcode.com/problems/merge-sorted-array/',
        youtubeLink: 'https://www.youtube.com/watch?v=mB5HXBAMZ6w',
        articleLink: 'https://www.geeksforgeeks.org/divide-and-conquer-algorithm-introduction/',
        level: 'MEDIUM',
    },
    {
        name: 'Backtracking',
        topic: 'Algorithms',
        leetcodeLink: 'https://leetcode.com/problems/n-queens/',
        youtubeLink: 'https://www.youtube.com/watch?v=Ph95IHmRp5M',
        articleLink: 'https://www.geeksforgeeks.org/backtracking-algorithms/',
        level: 'HARD',
    },
    {
        name: 'Arrays',
        topic: 'Data Structures',
        leetcodeLink: 'https://leetcode.com/problems/two-sum/',
        youtubeLink: 'https://www.youtube.com/watch?v=UXDSeD9mN-k',
        articleLink: 'https://www.geeksforgeeks.org/array-data-structure/',
        level: 'EASY',
    },
    {
        name: 'Linked List',
        topic: 'Data Structures',
        leetcodeLink: 'https://leetcode.com/problems/reverse-linked-list/',
        youtubeLink: 'https://www.youtube.com/watch?v=G0_I-ZF0S38',
        articleLink: 'https://www.geeksforgeeks.org/linked-list-data-structure/',
        level: 'MEDIUM',
    },
];

async function main() {
    console.log('Seeding DSA problems...');
    for (const p of problems) {
        await prisma.problem.create({
            data: p,
        });
    }
    console.log('Seed successful!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
