"use client";
import React, { useState } from 'react';
import {
    Clock, Calendar as CalIcon, MapPin, ChevronLeft, ChevronRight,
    FileText, CheckCircle, AlertCircle, TrendingUp
} from 'lucide-react';
import styles from './AttendanceView.module.css';
import { useHRMS } from '@/context/HRMSContext';

const AttendanceView = () => {
    const { attendance, punchIn, punchOut, showToast } = useHRMS();

    // ...

    const handleManualLog = () => {
        showToast('Daily Log Submitted', 'Your work log has been recorded successfully.', 'success');
    };
    const [currentMonth, setCurrentMonth] = useState('January 2026');

    // Mock Calendar Data
    const days = Array.from({ length: 31 }, (_, i) => {
        const day = i + 1;
        // Simple mock logic for status
        let status = 'present';
        if (day % 7 === 0 || day % 7 === 6) status = 'weekend';
        else if (day === 14 || day === 28) status = 'absent';
        else if (day === 5 || day === 20) status = 'late';
        return { day, status };
    });

    return (
        <div className={styles.attendanceContainer}>

            {/* HEADER */}
            <div className={styles.headerRow}>
                <div className={styles.titleBlock}>
                    <h2>Attendance Overview</h2>
                    <p>Track your work hours and daily logs.</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    {attendance.status === 'present' ? (
                        <button className={styles.btnPrimary} style={{ background: '#ef4444', gap: '0.5rem', display: 'flex', alignItems: 'center' }} onClick={punchOut}>
                            <Clock size={16} /> Punch Out
                        </button>
                    ) : (
                        <button className={styles.btnPrimary} style={{ background: '#1e293b', gap: '0.5rem', display: 'flex', alignItems: 'center' }} onClick={punchIn}>
                            <Clock size={16} /> Biometric Check-in
                        </button>
                    )}
                    <button className={styles.btnPrimary} style={{ background: 'white', color: '#3b82f6', border: '1px solid #e2e8f0' }}>
                        <ChevronLeft size={20} />
                    </button>
                    <span style={{ fontWeight: '700', fontSize: '1.1rem' }}>{currentMonth}</span>
                    <button className={styles.btnPrimary} style={{ background: 'white', color: '#3b82f6', border: '1px solid #e2e8f0' }}>
                        <ChevronRight size={20} />
                    </button>
                    <button className={styles.btnPrimary} style={{ marginLeft: '1rem' }}>
                        Download Report
                    </button>
                </div>
            </div>

            {/* STATS ROW */}
            <div className={styles.statsRow}>
                <div className={styles.statCard}>
                    <span className={styles.statLabel}>Avg. Hours</span>
                    <span className={styles.statValue}>8h 45m</span>
                    <span className={styles.statSub}><TrendingUp size={14} className={styles.trendUp} /> +2% vs last month</span>
                </div>
                <div className={styles.statCard}>
                    <span className={styles.statLabel}>On Time</span>
                    <span className={styles.statValue}>18 Days</span>
                    <span className={styles.statSub}>90% Punctuality</span>
                </div>
                <div className={styles.statCard}>
                    <span className={styles.statLabel}>Late Arrivals</span>
                    <span className={styles.statValue} style={{ color: '#f97316' }}>2 Days</span>
                    <span className={styles.statSub}>Avg. 15m delay</span>
                </div>
                <div className={styles.statCard}>
                    <span className={styles.statLabel}>Absences (Paid)</span>
                    <span className={styles.statValue}>1 Day</span>
                    <span className={styles.statSub}>Leave Balance: 12</span>
                </div>
            </div>

            {/* MAIN GRID */}
            <div className={styles.mainGrid}>
                {/* LEFT: CALENDAR */}
                <div className={styles.leftCol}>
                    <div className={styles.card}>
                        <div className={styles.cardHeader}>
                            <h3>Monthly View</h3>
                            <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.8rem' }}>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><div className={styles.statusDot} style={{ background: '#16a34a' }}></div> Present</span>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><div className={styles.statusDot} style={{ background: '#f97316' }}></div> Late</span>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><div className={styles.statusDot} style={{ background: '#ef4444' }}></div> Absent</span>
                            </div>
                        </div>
                        <div className={styles.calendarGrid}>
                            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                                <div key={d} className={styles.dayName}>{d}</div>
                            ))}
                            {days.map(({ day, status }) => (
                                <div key={day} className={`${styles.dateCell} ${styles[status]}`}>
                                    {day}
                                    {status !== 'weekend' && <div className={styles.statusDot}></div>}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* RIGHT: DAILY LOG */}
                <div className={styles.rightCol}>
                    <div className={styles.card}>
                        <div className={styles.cardHeader}>
                            <h3>Daily Log</h3>
                            <span style={{ fontSize: '0.9rem', color: '#64748b' }}>Today, Jan 29</span>
                        </div>
                        <div className={styles.logForm}>
                            <label className={styles.formLabel}>What did you work on today?</label>
                            <textarea
                                className={styles.textarea}
                                placeholder="- Completed UI specs for Dashboard&#10;- Fixed bug in authentication flow&#10;- Team meeting with Design"
                            ></textarea>
                            <button className={styles.btnPrimary}>Submit Log</button>
                        </div>
                    </div>

                    <div className={styles.card}>
                        <div className={styles.cardHeader}>
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                <h3 style={{ cursor: 'pointer', color: '#1e293b' }}>My Logs</h3>
                                <h3 style={{ cursor: 'pointer', color: '#94a3b8' }}>Team Feed</h3>
                            </div>
                        </div>
                        <div className={styles.historyList}>
                            {/* Live History from Context */}
                            {attendance.history.map((log, idx) => (
                                <div key={idx} className={styles.historyItem} style={{ borderLeftColor: '#3b82f6' }}>
                                    <div className={styles.histDate} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <span>You • {log.in}</span>
                                        <span>📍 Office</span>
                                    </div>
                                    <div className={styles.histContent}>Punched In: {log.status}</div>
                                </div>
                            ))}

                            {/* Old Mock Data below... */}
                            <div className={styles.historyItem} style={{ borderLeftColor: '#f472b6' }}>
                                <div className={styles.histDate} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span>Sarah J. • 10m ago</span>
                                    <span>📍 Office</span>
                                </div>
                                <div className={styles.histContent}>Submitted Q3 Financial Reports.</div>
                            </div>
                            <div className={styles.historyItem}>
                                <div className={styles.histDate}>Yesterday, Jan 28</div>
                                <div className={styles.histContent}>Worked on API integration for the new user profile module.</div>
                            </div>
                            <div className={styles.historyItem}>
                                <div className={styles.histDate}>Monday, Jan 27</div>
                                <div className={styles.histContent}>Weekly planning and backlog grooming. Resolved 3 Jira tickets.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default AttendanceView;
