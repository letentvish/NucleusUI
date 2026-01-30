"use client";
import React from 'react';
import { CheckCircle, Calendar, Clock, Award } from 'lucide-react';
import styles from './StatsCards.module.css';

const StatsCards = () => {
    const cards = [
        {
            title: "Attendance Status",
            value: "✅ Done",
            subtext: "In: 09:55 AM",
            progress: 85,
            color: "green",
            icon: <CheckCircle size={24} className="text-green-400" />
        },
        {
            title: "Leave Balance",
            value: "12 days",
            subtext: "8 used of 20",
            progress: 40,
            color: "orange",
            icon: <Calendar size={24} className="text-orange-400" />
        },
        {
            title: "Hours Today",
            value: "2h 30m",
            subtext: "On track ✓",
            progress: 28,
            color: "blue",
            icon: <Clock size={24} className="text-blue-400" />
        },
        {
            title: "Recognition",
            value: "0 badges",
            subtext: "3rd in team",
            progress: 0,
            color: "purple",
            icon: <Award size={24} className="text-purple-400" />
        }
    ];

    return (
        <div className={styles.grid}>
            {cards.map((card, index) => (
                <div key={index} className={`${styles.card} glass-card`}>
                    <div className={styles.header}>
                        <span className={styles.iconWrapper}>{card.icon}</span>
                        <span className={styles.title}>{card.title}</span>
                    </div>

                    <div className={styles.content}>
                        <h3>{card.value}</h3>
                        <p>{card.subtext}</p>
                    </div>

                    <div className={styles.progressWrapper}>
                        <div className={styles.progressBg}>
                            <div
                                className={`${styles.progressBar} ${styles[card.color]}`}
                                style={{ width: `${card.progress}%` }}
                            ></div>
                        </div>
                    </div>

                    <div className={styles.footer}>
                        <button className={styles.aiBtn}>💬 Ask AI ✨</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default StatsCards;
