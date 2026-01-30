"use client";
import React from 'react';
import styles from './AttendanceWidget.module.css';

const AttendanceWidget = () => {
    return (
        <div className={`${styles.card} glass-card`}>
            <h3 className={styles.title}>ATTENDANCE WIDGET</h3>

            <div className={styles.sessionGrid}>
                <div className={styles.sessionItem}>
                    <span className={styles.label}>START</span>
                    <span className={styles.value}>09:55 AM</span>
                    <span className={styles.status}>✅ Checked In</span>
                </div>

                <div className={styles.sessionItem}>
                    <span className={styles.label}>DURATION</span>
                    <span className={styles.value}>2h 30m</span>
                    <div className={styles.durationBar}>
                        <div className={styles.durationProgress} style={{ width: '28%' }}></div>
                    </div>
                    <span className={styles.subtext}>28%</span>
                </div>

                <div className={styles.sessionItem}>
                    <span className={styles.label}>END</span>
                    <button className={styles.punchBtn}>Punch Out</button>
                </div>
            </div>

            <div className={styles.workingHours}>
                <div className={styles.whHeader}>
                    <span>Working Hours:</span>
                    <span>2h 30m / 9h</span>
                </div>
                <div className={styles.whBar}>
                    <div className={styles.whProgress} style={{ width: '28%' }}></div>
                </div>
                <div className={styles.statusFooter}>
                    Status: <span className={styles.onTime}>🟢 On Time</span>
                </div>
            </div>
        </div>
    );
};

export default AttendanceWidget;
