import { NextResponse } from 'next/server';

// MOCK USERS FOR DEMO (Since no DB on Netlify)
const MOCK_USERS = [
    { email: 'admin@nucleus.com', name: 'Super Admin', role: 'SUPER_ADMIN', dept: 'Administration', password: 'password123' },
    { email: 'hr@nucleus.com', name: 'HR Manager', role: 'HR_MANAGER', dept: 'Human Resources', password: 'password123' },
    { email: 'pm@nucleus.com', name: 'Project Manager', role: 'PROJECT_MANAGER', dept: 'Engineering', password: 'password123' },
    { email: 'lead@nucleus.com', name: 'Team Lead', role: 'TEAM_LEAD', dept: 'Engineering', password: 'password123' },
    { email: 'finance@nucleus.com', name: 'Finance Manager', role: 'FINANCE_MANAGER', dept: 'Finance', password: 'password123' },
    { email: 'employee@nucleus.com', name: 'Employee', role: 'EMPLOYEE', dept: 'Engineering', password: 'password123' },
];

export async function POST(req) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ error: 'Email and password required' }, { status: 400 });
        }

        // FIND USER IN MOCK DATA
        const user = MOCK_USERS.find(u => u.email === email);

        if (!user) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        // CHECK PASSWORD
        if (user.password !== password) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        // Return user without password
        const { password: _, ...userWithoutPassword } = user;
        return NextResponse.json({ user: userWithoutPassword });

    } catch (error) {
        console.error('Login Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
