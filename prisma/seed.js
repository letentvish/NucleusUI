const { PrismaClient } = require('@prisma/client')
require('dotenv').config()

const prisma = new PrismaClient()

async function main() {
    const users = [
        { email: 'admin@nucleus.com', name: 'Super Admin', role: 'SUPER_ADMIN', dept: 'Administration' },
        { email: 'hr@nucleus.com', name: 'HR Manager', role: 'HR_MANAGER', dept: 'Human Resources' },
        { email: 'pm@nucleus.com', name: 'Project Manager', role: 'PROJECT_MANAGER', dept: 'Engineering' },
        { email: 'lead@nucleus.com', name: 'Team Lead', role: 'TEAM_LEAD', dept: 'Engineering' },
        { email: 'finance@nucleus.com', name: 'Finance Manager', role: 'FINANCE_MANAGER', dept: 'Finance' },
        { email: 'employee@nucleus.com', name: 'Employee', role: 'EMPLOYEE', dept: 'Engineering' },
    ];

    for (const u of users) {
        const user = await prisma.user.upsert({
            where: { email: u.email },
            update: { role: u.role }, // Update role if exists to ensure it matches new schema
            create: {
                email: u.email,
                name: u.name,
                password: 'password123',
                role: u.role,
                department: u.dept,
            },
        });
        console.log(`Seeded: ${user.email} as ${user.role}`);
    }
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
