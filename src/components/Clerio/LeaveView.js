"use client";
import React from 'react';
import {
    Calendar, CheckCircle, AlertCircle, Clock, FileText, ChevronRight
} from 'lucide-react';
import styles from './LeaveView.module.css';
import { useHRMS } from '@/context/HRMSContext';
import { useState } from 'react';

const LeaveView = () => {
    const { leaves, applyLeave, showToast } = useHRMS();
    const [leaveType, setLeaveType] = useState('Sick Leave');
    const [startDate, setStartDate] = useState('');
    const [duration, setDuration] = useState('1 Day');

    const handleApply = () => {
        applyLeave(leaveType, startDate || 'Feb 10, 2026', duration, 'Reason');
        showToast('Leave Request Submitted', `Application for ${leaveType} sent.`, 'success');
    };

    return (
        <div className={styles.leaveContainer}>

            {/* HEADER */}
            <div className={styles.headerRow}>
                <div className={styles.titleBlock}>
                    <h2>Leave Management</h2>
                    <p>Apply for leave, track balances, and view history.</p>
                </div>
                <button className={styles.btnPrimary} style={{ width: 'auto' }}>
                    Policy Document
                </button>
            </div>

            {/* BALANCE CARDS */}
            <div className={styles.balanceRow}>
                <div className={styles.balanceCard}>
                    <div className={styles.balInfo}>
                        <div className={styles.balLabel}>Sick Leave</div>
                        <div className={styles.balValue}>{leaves.sick.available}</div>
                        <div className={styles.balTotal}>Available of {leaves.sick.total}</div>
                    </div>
                    <div className={`${styles.balIcon} ${styles.cardSick}`}>🏥</div>
                </div>
                <div className={styles.balanceCard}>
                    <div className={styles.balInfo}>
                        <div className={styles.balLabel}>Casual Leave</div>
                        <div className={styles.balValue}>{leaves.casual.available}</div>
                        <div className={styles.balTotal}>Available of {leaves.casual.total}</div>
                    </div>
                    <div className={`${styles.balIcon} ${styles.cardCasual}`}>🌴</div>
                </div>
                <div className={styles.balanceCard}>
                    <div className={styles.balInfo}>
                        <div className={styles.balLabel}>Privilege Leave</div>
                        <div className={styles.balValue}>{leaves.privilege.available}</div>
                        <div className={styles.balTotal}>Available of {leaves.privilege.total}</div>
                    </div>
                    <div className={`${styles.balIcon} ${styles.cardPrivilege}`}>✈️</div>
                </div>
            </div>

            {/* MAIN CONTENT */}
            <div className={styles.mainGrid}>

                {/* LEFT: APPLY FORM */}
                <div className={styles.leftCol}>
                    <div className={styles.card}>
                        <div className={styles.cardHeader}>
                            <h3>Apply for Leave</h3>
                        </div>

                        <div className={styles.alertBox}>
                            <AlertCircle size={20} />
                            <div>
                                <strong>AI Suggestion:</strong> Based on project timelines, avoiding <strong>Feb 12-14</strong> (Product Launch) increases approval chance by 40%.
                            </div>
                        </div>

                        <div className={styles.formGrid}>
                            <div className={styles.formGroup}>
                                <label className={styles.formLabel}>Leave Type</label>
                                <select className={styles.formSelect} onChange={(e) => setLeaveType(e.target.value)} value={leaveType}>
                                    <option>Sick Leave</option>
                                    <option>Casual Leave</option>
                                    <option>Privilege Leave</option>
                                    <option>Unpaid Leave</option>
                                </select>
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.formLabel}>Duration</label>
                                <select className={styles.formSelect} onChange={(e) => setDuration(e.target.value)}>
                                    <option>Full Day</option>
                                    <option>Half Day (Morning)</option>
                                    <option>Half Day (Afternoon)</option>
                                </select>
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.formLabel}>Start Date</label>
                                <input type="date" className={styles.formInput} onChange={(e) => setStartDate(e.target.value)} />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.formLabel}>End Date</label>
                                <input type="date" className={styles.formInput} />
                            </div>
                        </div>

                        <div className={styles.formGroup} style={{ marginBottom: '1.5rem' }}>
                            <label className={styles.formLabel}>Reason</label>
                            <textarea
                                className={styles.formTextarea}
                                placeholder="E.g., Feeling unwell / attending a family function..."
                            ></textarea>
                        </div>

                        <button className={styles.btnPrimary} onClick={handleApply}>Submit Application</button>
                    </div>
                </div>

                {/* RIGHT: HISTORY & UPCOMING */}
                <div className={styles.rightCol}>
                    <div className={styles.card}>
                        <div className={styles.cardHeader}>
                            <h3>Upcoming Leaves</h3>
                        </div>
                        <div style={{ textAlign: 'center', padding: '2rem', color: '#94a3b8', fontStyle: 'italic' }}>
                            No upcoming leaves scheduled.
                        </div>
                    </div>

                    <div className={styles.card}>
                        <div className={styles.cardHeader}>
                            <h3>Recent History</h3>
                        </div>

                        {leaves.history.map((item, idx) => (
                            <div key={idx} className={styles.historyItem} style={{ borderLeftColor: item.status === 'Approved' ? '#16a34a' : '#f59e0b' }}>
                                <div>
                                    <div className={styles.histType}>{item.type}</div>
                                    <div className={styles.histDate}>{item.date} ({item.duration})</div>
                                </div>
                                <span className={`${styles.histBadge} ${item.status === 'Approved' ? styles.badgeApproved : styles.badgePending}`}>{item.status}</span>
                            </div>
                        ))}

                        <button className={styles.btnPrimary} style={{ background: 'white', color: '#3b82f6', border: '1px solid #e2e8f0', marginTop: '1rem' }}>
                            View All History
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default LeaveView;
