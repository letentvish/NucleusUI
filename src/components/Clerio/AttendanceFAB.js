"use client";
import React, { useState } from 'react';
import { Clock, CheckCircle, XCircle, Fingerprint } from 'lucide-react';
import styles from './AttendanceFAB.module.css';
import { useHRMS } from '@/context/HRMSContext';

const AttendanceFAB = () => {
    const { attendance, punchIn, punchOut } = useHRMS();
    const [isExpanded, setIsExpanded] = useState(false);
    const [logText, setLogText] = useState('');

    // Determine Color Class
    const getFabClass = () => {
        if (attendance.status !== 'present') return styles.fabBlue;

        // Parsing PunchIn Time for "Late" logic (Mock: Current Time vs 9:10 AM)
        // In a real app, we'd parse `attendance.punchInTime`. 
        // Here, let's assume if punched in, we check if it was late.
        // For demo: Randomize or check current hour? 
        // Let's implement strict logic: if punchInTime > '09:10', it's Red.

        try {
            const [time, period] = attendance.punchInTime.split(' ');
            let [hours, minutes] = time.split(':').map(Number);
            if (period === 'PM' && hours !== 12) hours += 12;
            if (period === 'AM' && hours === 12) hours = 0;

            // Late boundary: 09:10
            if (hours > 9 || (hours === 9 && minutes > 10)) {
                return styles.fabRed;
            }
            return styles.fabGreen;
        } catch (e) {
            return styles.fabGreen; // Fallback
        }
    };

    return (
        <div
            className={`${styles.fabContainer} ${getFabClass()} ${isExpanded ? styles.expanded : ''}`}
            onMouseEnter={() => setIsExpanded(true)}
            onMouseLeave={() => setIsExpanded(false)}
        >
            {/* COLLAPSED STATE ICON */}
            <div className={styles.fabIcon}>
                <Fingerprint size={24} color="#fff" />
                {attendance.status === 'present' && <span className={styles.statusDot}></span>}
            </div>

            {/* EXPANDED CONTENT */}
            {isExpanded && (
                <div className={styles.fabContent}>
                    <div className={styles.fabHeader}>
                        <span className={styles.fabTitle}>ATTENDANCE</span>
                        <span className={styles.fabDate}>
                            {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </span>
                    </div>

                    <div className={styles.statsGrid}>
                        <div className={styles.statItem}>
                            <span className={styles.statLabel}>SESSION START</span>
                            <span className={styles.statValue}>{attendance.punchInTime || '--:--'}</span>
                        </div>
                        <div className={styles.statItem}>
                            <span className={styles.statLabel}>TOTAL HRS</span>
                            <span className={styles.statValue}>{attendance.totalHours || '0h 0m'}</span>
                        </div>
                    </div>

                    <div className={styles.locationTag}>
                        <span>📍 {attendance.status === 'present' ? 'Office Layer 4' : 'Remote'}</span>
                    </div>

                    <div className={styles.divider}></div>

                    <textarea
                        className={styles.logInput}
                        placeholder={attendance.status === 'present' ? "Work summary or notes..." : "Plan for the day..."}
                        value={logText}
                        onChange={(e) => setLogText(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                    />

                    {attendance.status === 'present' ? (
                        <button className={styles.actionBtnOut} onClick={(e) => {
                            e.stopPropagation();
                            punchOut(logText);
                            setLogText('');
                        }}>
                            <XCircle size={16} /> Punch Out
                        </button>
                    ) : (
                        <button className={styles.actionBtnIn} onClick={(e) => {
                            e.stopPropagation();
                            punchIn(logText);
                            setLogText('');
                        }}>
                            <CheckCircle size={16} /> Punch In
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default AttendanceFAB;
