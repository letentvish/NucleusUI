"use client";
import React, { useState } from 'react';
import { User, Bell, Shield, Lock } from 'lucide-react';
import styles from './SettingsView.module.css';

import { useHRMS } from '@/context/HRMSContext';

const SettingsView = () => {
    const { settings, updateSettings } = useHRMS();

    return (
        <div className={styles.settingsContainer}>
            <div className={styles.headerRow}>
                <h2>Settings & Preferences</h2>
            </div>

            {/* PROFILE SECTION */}
            <div className={styles.sectionCard}>
                <div className={styles.sectionHeader}>
                    <User size={20} color="#3b82f6" />
                    <h3>Profile Information</h3>
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Full Name</label>
                    <input type="text" defaultValue="Trisha Khanna" className={styles.input} />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Email Address</label>
                    <input type="email" defaultValue="trisha.khanna@nucleus.ai" className={styles.input} />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Job Title</label>
                    <input type="text" defaultValue="Senior Developer" className={styles.input} disabled style={{ background: '#f8fafc', color: '#94a3b8' }} />
                </div>
            </div>

            {/* NOTIFICATIONS SECTION */}
            <div className={styles.sectionCard}>
                <div className={styles.sectionHeader}>
                    <Bell size={20} color="#f59e0b" />
                    <h3>Notifications</h3>
                </div>

                <div className={styles.toggleRow}>
                    <div className={styles.toggleLabel}>
                        <h4>Email Notifications</h4>
                        <p>Receive weekly summaries and important alerts.</p>
                    </div>
                    <div className={`${styles.toggleSwitch} ${settings.emailNotif ? styles.toggleActive : ''}`} onClick={() => updateSettings('emailNotif', !settings.emailNotif)}>
                        <div className={`${styles.switchKnob} ${settings.emailNotif ? styles.thumbActive : ''}`}></div>
                    </div>
                </div>

                <div className={styles.toggleRow}>
                    <div className={styles.toggleLabel}>
                        <h4>Push Notifications</h4>
                        <p>Get real-time updates on your browser.</p>
                    </div>
                    <div className={`${styles.toggleSwitch} ${settings.pushNotif ? styles.toggleActive : ''}`} onClick={() => updateSettings('pushNotif', !settings.pushNotif)}>
                        <div className={`${styles.switchKnob} ${settings.pushNotif ? styles.thumbActive : ''}`}></div>
                    </div>
                </div>
            </div>

            {/* SECURITY & AUDIT SECTION */}
            <div className={styles.sectionCard}>
                <div className={styles.sectionHeader}>
                    <Shield size={20} color="#ef4444" />
                    <h3>Security & Audit</h3>
                </div>

                <div className={styles.toggleRow}>
                    <div className={styles.toggleLabel}>
                        <h4>Two-Factor Authentication (2FA)</h4>
                        <p>Secure your account with OTP.</p>
                    </div>
                    <button className={styles.btnDanger} style={{ background: settings.twoFactor ? '#dcfce7' : '#fee2e2', color: settings.twoFactor ? '#166534' : '#ef4444' }} onClick={() => updateSettings('twoFactor', !settings.twoFactor)}>
                        {settings.twoFactor ? 'Enabled' : 'Enable 2FA'}
                    </button>
                </div>

                <div className={styles.toggleRow}>
                    <div className={styles.toggleLabel}>
                        <h4>End-to-End Encryption</h4>
                        <p>Encrypt data at rest.</p>
                    </div>
                    <div className={`${styles.toggleSwitch} ${styles.toggleActive}`}>
                        <div className={`${styles.switchKnob} ${styles.thumbActive}`}></div>
                    </div>
                </div>

                {/* AUDIT LOGS */}
                <div style={{ marginTop: '1.5rem' }}>
                    <h4 style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '0.5rem' }}>RECENT AUDIT LOGS</h4>
                    <div style={{ background: '#f8fafc', borderRadius: '8px', padding: '0.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem', borderBottom: '1px solid #e2e8f0', fontSize: '0.85rem' }}>
                            <span><strong>Login</strong> • Chrome / Windows</span>
                            <span style={{ color: '#16a34a' }}>Success • Just now</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem', borderBottom: '1px solid #e2e8f0', fontSize: '0.85rem' }}>
                            <span><strong>Password Change</strong></span>
                            <span style={{ color: '#16a34a' }}>Success • 2 days ago</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem', fontSize: '0.85rem' }}>
                            <span><strong>Failed Login</strong> • Unknown IP</span>
                            <span style={{ color: '#ef4444' }}>Blocked • 5 days ago</span>
                        </div>
                    </div>
                </div>

                <div className={styles.toggleRow} style={{ marginTop: '1rem' }}>
                    <div className={styles.toggleLabel}>
                        <h4>Active Sessions</h4>
                        <p>2 Active Devices</p>
                    </div>
                    <button className={styles.btnDanger} style={{ background: '#fef2f2', color: '#ef4444' }} onClick={() => alert('All other sessions terminated.')}>Revoke All</button>
                </div>
            </div>

        </div>
    );
};

export default SettingsView;
