"use client";
import React from 'react';
import { Mail, MessageSquare, Phone, Plus } from 'lucide-react';
import styles from './TeamView.module.css';

import { useHRMS } from '@/context/HRMSContext';

const TeamView = () => {
    const { teamMembers, showToast } = useHRMS();

    const handleContact = (method, name) => {
        showToast(`${method} Initiated`, `Opening ${method} with ${name}...`, 'info');
    };

    return (
        <div className={styles.teamContainer}>
            <div className={styles.headerRow}>
                <div className={styles.titleBlock}>
                    <h2>My Team</h2>
                    <p>Connect with your colleagues and view team structure.</p>
                </div>
                <button className={styles.btnPrimary} onClick={() => alert('Add Member modal would open here')}>
                    <Plus size={18} style={{ marginRight: '0.5rem' }} /> Add Member
                </button>
            </div>

            <div className={styles.teamGrid}>
                {teamMembers.map((member) => (
                    <div key={member.id} className={styles.teamCard}>
                        <div className={styles.avatarWrapper}>
                            <img
                                src={`https://ui-avatars.com/api/?name=${member.name}&background=${member.bg}&color=fff`}
                                className={styles.avatar}
                                alt={member.name}
                            />
                            <div className={`${styles.statusDot} ${member.status === 'online' ? styles.statusOnline :
                                member.status === 'busy' ? styles.statusBusy : styles.statusAway
                                }`}></div>
                        </div>
                        <div className={styles.memberInfo}>
                            <h3>{member.name}</h3>
                            <div className={styles.memberRole}>{member.role}</div>
                            <div className={styles.memberDept}>{member.dept}</div>
                        </div>
                        <div className={styles.contactRow}>
                            <button className={styles.iconBtn} onClick={() => handleContact('Chat', member.name)} title="Message"><MessageSquare size={16} /></button>
                            <button className={styles.iconBtn} onClick={() => handleContact('Email', member.name)} title="Email"><Mail size={16} /></button>
                            <button className={styles.iconBtn} onClick={() => handleContact('Call', member.name)} title="Call"><Phone size={16} /></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TeamView;
