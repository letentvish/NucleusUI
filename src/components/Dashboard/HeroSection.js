"use client";
import React from 'react';
import { Cloud, Mic, Camera } from 'lucide-react';
import styles from './HeroSection.module.css';

const HeroSection = () => {
    return (
        <section className={styles.hero}>
            <div className={styles.content}>
                <div className={styles.greetingGroup}>
                    <div className={styles.avatarWrapper}>
                        <img
                            src="https://ui-avatars.com/api/?name=Vishal&background=8B5CF6&color=fff&size=128"
                            alt="Vishal"
                            className={styles.heroAvatar}
                        />
                        <div className={styles.onlineStatus}></div>
                        <button className={styles.cameraBtn}>
                            <Camera size={16} />
                        </button>
                    </div>

                    <div className={styles.greetingText}>
                        <h1>Good Morning, Vishal! 🌅</h1>
                        <p>Ready to make today productive?</p>

                        <div className={`${styles.aiInsight} glass-card`}>
                            <span className={styles.aiIcon}>✨</span>
                            <p>AI Insight: You're 20% more productive on Wednesdays! Keep the momentum going.</p>
                        </div>
                    </div>
                </div>

                <div className={styles.infoGroup}>
                    <div className={`${styles.dateCard} glass-card`}>
                        <h2>Wednesday</h2>
                        <p>January 29, 2026</p>
                        <div className={styles.timeLocation}>
                            <span>10:15 AM</span>
                            <span className={styles.separator}>•</span>
                            <span>📍 Kesharipur, UP</span>
                        </div>
                        <div className={styles.weather}>
                            <Cloud size={20} />
                            <span>24°C Cloudy</span>
                        </div>
                    </div>
                </div>
            </div>

            <button className={`${styles.voiceBtn} animate-pulse-glow`}>
                <Mic size={32} color="white" />
            </button>
        </section>
    );
};

export default HeroSection;
