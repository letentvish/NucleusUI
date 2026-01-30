"use client";
import React from 'react';
import { MoreVertical, RefreshCw, Play, Clock, Calendar, AlertCircle } from 'lucide-react';
import styles from './TodaysFocus.module.css';

const TodaysFocus = () => {
    return (
        <div className={`${styles.container} glass-card`}>
            <div className={styles.header}>
                <div className={styles.titleGroup}>
                    <span className={styles.sparkles}>✨</span>
                    <h2>TODAY'S FOCUS</h2>
                    <span className={styles.subtitle}>(AI-Generated Priority List)</span>
                </div>
                <div className={styles.actions}>
                    <button className={styles.iconBtn}><RefreshCw size={18} /></button>
                    <button className={styles.iconBtn}><MoreVertical size={18} /></button>
                </div>
            </div>

            <div className={styles.taskList}>
                {/* High Priority Task */}
                <div className={`${styles.taskItem} ${styles.highPriority}`}>
                    <div className={styles.taskHeader}>
                        <div className={styles.checkboxWrapper}>
                            <input type="checkbox" className={styles.checkbox} />
                            <span className={styles.priorityLabel}>🔴 HIGH</span>
                            <h3>Complete Performance Review for Q4</h3>
                        </div>
                        <span className={styles.dueDate}>⏰ Due: Today, 5:00 PM</span>
                    </div>

                    <div className={styles.aiSuggestion}>
                        <AlertCircle size={16} className={styles.aiIcon} />
                        <p><strong>AI Suggestion:</strong> This blocks team reviews. Complete before stand-up.</p>
                    </div>

                    <div className={styles.impact}>
                        📊 Impact: High - Affects 5 team members
                    </div>

                    <div className={styles.taskActions}>
                        <button className={styles.primaryBtn}><Play size={14} /> Start Now</button>
                        <button className={styles.secondaryBtn}><Clock size={14} /> Remind in 1h</button>
                        <button className={styles.secondaryBtn}><Calendar size={14} /> Reschedule</button>
                    </div>
                </div>

                {/* Medium Priority Task */}
                <div className={styles.taskItem}>
                    <div className={styles.taskHeader}>
                        <div className={styles.checkboxWrapper}>
                            <input type="checkbox" className={styles.checkbox} />
                            <span className={`${styles.priorityLabel} ${styles.medium}`}>🟡 MEDIUM</span>
                            <h3>Team Standup Meeting</h3>
                        </div>
                        <span className={styles.dueDate}>⏰ Today, 11:00 AM</span>
                    </div>
                    <div className={styles.metaInfo}>
                        <span>📍 Conference Room A</span>
                        <span>👥 5 attendees</span>
                        <span>⏱️ 30 minutes</span>
                    </div>
                </div>

                {/* Add more tasks button */}
                <div className={styles.footer}>
                    <button className={styles.addBtn}>+ Add Custom Task</button>
                    <button className={styles.viewAllBtn}>View All →</button>
                </div>
            </div>
        </div>
    );
};

export default TodaysFocus;
