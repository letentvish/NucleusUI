"use client";
import React from 'react';
import {
    Target, Award, TrendingUp, CheckCircle, Clock, Zap, MessageSquare
} from 'lucide-react';
import styles from './PerformanceView.module.css';

import { useHRMS } from '@/context/HRMSContext';

const PerformanceView = () => {
    const { okrs, addGoal, showToast } = useHRMS();

    return (
        <div className={styles.perfContainer}>

            {/* HEADER */}
            <div className={styles.headerRow}>
                <div className={styles.titleBlock}>
                    <h2>Performance & OKRs</h2>
                    <p>Track your goals, reviews, and continuous feedback.</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button className={styles.btnPrimary} style={{ background: 'white', color: '#3b82f6', border: '1px solid #e2e8f0' }} onClick={() => showToast('Feedback Requested', 'Request sent to manager.', 'success')}>
                        Request Feedback
                    </button>
                    <button className={styles.btnPrimary} onClick={() => { addGoal(); showToast('Goal Added', 'New OKR created.', 'success'); }}>
                        + New Goal
                    </button>
                </div>
            </div>

            <div className={styles.mainGrid}>

                {/* LEFT: OKR DASHBOARD */}
                <div className={styles.leftCol}>
                    <div className={styles.card}>
                        <div className={styles.cardHeader}>
                            <h3><Target size={20} color="#2563ea" /> Current OKRs (Q1 2026)</h3>
                            <span style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: '600' }}>Overall: 68%</span>
                        </div>

                        <div className={styles.okrContainer}>

                            {okrs.map((goal) => (
                                <div key={goal.id} className={styles.okrItem}>
                                    <div className={styles.objectiveRow}>
                                        <div>
                                            <div className={styles.objTitle}>{goal.title}</div>
                                            <div className={styles.objMeta}>Weight: {goal.weight}% • Owner: You</div>
                                        </div>
                                        <div className={styles.objProgress}>{goal.progress}%</div>
                                    </div>
                                    {goal.keyResults.map((kr, idx) => (
                                        <div key={idx} className={styles.keyResult}>
                                            <span className={styles.krLabel}>{kr.label}</span>
                                            <div className={styles.progressTrack}>
                                                <div className={`${styles.progressBar} ${styles.barBlue}`} style={{ width: `${kr.progress}%` }}></div>
                                            </div>
                                            <span className={styles.krVal}>{kr.progress}%</span>
                                        </div>
                                    ))}
                                </div>
                            ))}

                        </div>
                    </div>
                </div>

                {/* RIGHT: REVIEWS & FEEDBACK */}
                <div className={styles.rightCol}>

                    {/* REVIEW CYCLE */}
                    <div className={styles.card}>
                        <div className={styles.cardHeader}>
                            <h3><Clock size={20} /> Review Cycle</h3>
                        </div>
                        <div className={styles.timeline}>
                            <div className={styles.timelineStep}>
                                <div className={`${styles.stepDot} ${styles.dotDone}`}></div>
                                <div className={styles.stepContent}>
                                    <h4>Self Assessment</h4>
                                    <p>Submitted on Jan 15</p>
                                    <div className={styles.stepDate}>COMPLETED</div>
                                </div>
                            </div>
                            <div className={styles.timelineStep}>
                                <div className={`${styles.stepDot} ${styles.dotActive}`}></div>
                                <div className={styles.stepContent}>
                                    <h4>Manager Review</h4>
                                    <p>Sarah is reviewing your input.</p>
                                    <div className={styles.stepDate} style={{ color: '#2563ea' }}>IN PROGRESS</div>
                                </div>
                            </div>
                            <div className={styles.timelineStep}>
                                <div className={styles.stepDot}></div>
                                <div className={styles.stepContent}>
                                    <h4>1:1 Discussion</h4>
                                    <p>Scheduled for Feb 5</p>
                                    <div className={styles.stepDate}>UPCOMING</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* FEEDBACK WALL */}
                    <div className={styles.card}>
                        <div className={styles.cardHeader}>
                            <h3><Award size={20} color="#f59e0b" /> Recent Praise</h3>
                        </div>
                        <div className={styles.feedbackList}>
                            <div className={styles.feedbackCard}>
                                <img src="https://ui-avatars.com/api/?name=Priya&background=random" className={styles.fbAvatar} />
                                <div className={styles.fbContent}>
                                    <div className={styles.fbHeader}>
                                        <span className={styles.fbAuthor}>Priya M.</span>
                                        <span className={styles.fbDate}>2d ago</span>
                                    </div>
                                    <div className={styles.fbText}>Thanks for helping debug that tricky auth issue! You're a lifesaver.</div>
                                    <div className={styles.fbTags}>
                                        <span className={styles.fbTag}>Problem Solver</span>
                                        <span className={styles.fbTag}>Team Player</span>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.feedbackCard}>
                                <img src="https://ui-avatars.com/api/?name=Rahul&background=random" className={styles.fbAvatar} />
                                <div className={styles.fbContent}>
                                    <div className={styles.fbHeader}>
                                        <span className={styles.fbAuthor}>Rahul S.</span>
                                        <span className={styles.fbDate}>1w ago</span>
                                    </div>
                                    <div className={styles.fbText}>Great presentation on the new architecture. Very clear!</div>
                                    <div className={styles.fbTags}>
                                        <span className={styles.fbTag}>Communication</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button className={styles.btnPrimary} style={{ background: 'white', color: '#3b82f6', border: '1px solid #e2e8f0', marginTop: '1rem', width: '100%' }}>
                            View All Feedback
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default PerformanceView;
