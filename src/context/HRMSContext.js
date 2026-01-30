"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

const HRMSContext = createContext();

export const useHRMS = () => useContext(HRMSContext);

export const HRMSProvider = ({ children }) => {
    // --- USER PROFILE ---
    const [user, setUser] = useState({
        name: 'Trisha Khanna',
        role: 'Senior Developer',
        avatar: 'https://ui-avatars.com/api/?name=Trisha+Khanna&background=fff&color=2563ea'
    });

    // --- ATTENDANCE STATE ---
    const [attendance, setAttendance] = useState({
        status: 'absent', // 'absent', 'present', 'punched_out'
        punchInTime: null,
        punchOutTime: null,
        totalHours: '0h 0m',
        history: []
    });

    const punchIn = (log = '') => {
        const now = new Date();
        const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        setAttendance(prev => ({
            ...prev,
            status: 'present',
            punchInTime: timeStr,
            history: [{ date: 'Today', in: timeStr, out: '-', status: 'Present', log }, ...prev.history]
        }));
    };

    const punchOut = (log = '') => {
        const now = new Date();
        const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        setAttendance(prev => ({
            ...prev,
            status: 'punched_out',
            punchOutTime: timeStr,
            history: prev.history.map((h, i) => i === 0 ? { ...h, out: timeStr, log: log || h.log } : h)
        }));
    };

    // --- LEAVES STATE ---
    const [leaves, setLeaves] = useState({
        sick: { available: 6, total: 10 },
        casual: { available: 4, total: 12 },
        privilege: { available: 15, total: 25 },
        history: [
            { type: 'Sick Leave', date: 'Jan 15, 2026', duration: '1 Day', status: 'Approved' },
            { type: 'Casual Leave', date: 'Feb 20, 2026', duration: '2 Days', status: 'Pending' }
        ]
    });

    const applyLeave = (type, date, duration, reason) => {
        // Find key based on type label
        let key = 'sick';
        if (type.includes('Casual')) key = 'casual';
        if (type.includes('Privilege')) key = 'privilege';

        // Update balance
        setLeaves(prev => ({
            ...prev,
            [key]: { ...prev[key], available: Math.max(0, prev[key].available - 1) }, // Mock deduction
            history: [{ type, date, duration, status: 'Pending' }, ...prev.history]
        }));
    };

    // --- PROJECTS / TASKS STATE ---
    const [projects, setProjects] = useState([
        { id: 1, title: 'Website Redesign', progress: 75, due: 'Feb 15' },
        { id: 2, title: 'Mobile App Launch', progress: 40, due: 'Mar 01' }
    ]);

    const [kanbanTasks, setKanbanTasks] = useState({
        todo: [
            { id: 't1', title: 'Competitor Analysis', tag: 'Research', assignee: 'Priya' },
            { id: 't2', title: 'Create Icon Set', tag: 'Design', assignee: 'Sarah' }
        ],
        inprogress: [
            { id: 't3', title: 'Homepage Hero Implementation', tag: 'Dev', assignee: 'Trisha' },
            { id: 't4', title: 'Dark Mode Palette', tag: 'Design', assignee: 'Sarah' }
        ],
        review: [
            { id: 't5', title: 'Auth API Integration', tag: 'Dev', assignee: 'David' }
        ],
        done: [
            { id: 't6', title: 'Kickoff Meeting', tag: 'Planning', assignee: 'Trisha' }
        ]
    });

    const moveTask = (taskId, fromCol, toCol) => {
        // Find task
        const task = kanbanTasks[fromCol].find(t => t.id === taskId);
        if (!task) return;

        // Remove from source, Add to dest
        setKanbanTasks(prev => ({
            ...prev,
            [fromCol]: prev[fromCol].filter(t => t.id !== taskId),
            [toCol]: [task, ...prev[toCol]]
        }));
    };

    // --- FOCUS TASKS (DASHBOARD) ---
    const [focusTasks, setFocusTasks] = useState([
        { id: 1, title: '[HIGH] Complete Performance Review', time: '5:00 PM', urgency: 'high', done: false },
        { id: 2, title: '[MEDIUM] Team Standup', time: '11:00 AM', urgency: 'med', done: false }
    ]);

    const completeFocusTask = (id) => {
        setFocusTasks(prev => prev.map(t => t.id === id ? { ...t, done: true } : t));
    };

    // --- 5. TEAM STATE ---
    const [teamMembers] = useState([
        { id: 1, name: 'Trisha', role: 'Senior Developer', dept: 'Engineering', status: 'online', bg: '2563ea' },
        { id: 2, name: 'Sarah', role: 'Product Manager', dept: 'Product', status: 'busy', bg: 'db2777' },
        { id: 3, name: 'Rahul', role: 'UX Designer', dept: 'Design', status: 'away', bg: 'ea580c' },
        { id: 4, name: 'Priya', role: 'Frontend Dev', dept: 'Engineering', status: 'online', bg: '16a34a' },
        { id: 5, name: 'David', role: 'QA Engineer', dept: 'Engineering', status: 'online', bg: '7c3aed' },
        { id: 6, name: 'Amit', role: 'Backend Lead', dept: 'Engineering', status: 'busy', bg: 'ca8a04' },
    ]);

    // --- 6. PERFORMANCE & OKR STATE ---
    const [okrs, setOkrs] = useState([
        {
            id: 1,
            title: 'Enhance Platform Stability',
            weight: 40,
            progress: 75,
            keyResults: [
                { label: 'Reduce API latency by 20%', progress: 90 },
                { label: 'Achieve 99.9% Uptime', progress: 60 }
            ]
        },
        {
            id: 2,
            title: 'Deliver V2 Design System',
            weight: 60,
            progress: 40,
            keyResults: [
                { label: 'Component Library Migration', progress: 40 }
            ]
        }
    ]);

    const addGoal = () => {
        const newGoal = {
            id: Date.now(),
            title: 'New Performance Goal',
            weight: 20,
            progress: 0,
            keyResults: [{ label: 'Key Result 1', progress: 0 }]
        };
        setOkrs([...okrs, newGoal]);
    };

    // --- 7. SETTINGS STATE ---
    const [settings, setSettings] = useState({
        emailNotif: true,
        pushNotif: true,
        twoFactor: false
    });

    const updateSettings = (key, value) => {
        setSettings(prev => ({ ...prev, [key]: value }));
    };

    // --- 8. TOAST NOTIFICATIONS ---
    const [toasts, setToasts] = useState([]);

    const showToast = (title, message, type = 'info') => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, title, message, type }]);
    };

    const removeToast = (id) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    };

    return (
        <HRMSContext.Provider value={{
            user,
            attendance, punchIn, punchOut,
            leaves, applyLeave,
            projects, kanbanTasks, moveTask,
            focusTasks, completeFocusTask,
            teamMembers,
            okrs, addGoal,
            settings, updateSettings,
            toasts, showToast, removeToast
        }}>
            {children}
        </HRMSContext.Provider>
    );
};
