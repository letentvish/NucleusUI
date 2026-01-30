"use client";
import React from 'react';
import { Video } from 'lucide-react';
import styles from './UpcomingEvents.module.css';

const UpcomingEvents = () => {
    return (
        <div className={`${styles.card} glass-card`}>
            <h3 className={styles.title}>UPCOMING EVENTS TIMELINE</h3>

            <div className={styles.timeline}>
                {/* Event 1 */}
                <div className={styles.eventItem}>
                    <div className={styles.timeIndicator}>
                        <div className={styles.dot}></div>
                        <div className={styles.line}></div>
                    </div>
                    <div className={styles.eventContent}>
                        <span className={styles.time}>Today, 11:00 AM</span>
                        <h4>Team Standup Meeting</h4>
                        <p>Conference Room A • 30 min</p>
                        <button className={styles.joinBtn}>Join Meeting →</button>
                    </div>
                </div>

                {/* Event 2 */}
                <div className={styles.eventItem}>
                    <div className={styles.timeIndicator}>
                        <div className={styles.dot}></div>
                    </div>
                    <div className={styles.eventContent}>
                        <span className={styles.time}>Today, 2:00 PM</span>
                        <h4>Client Demo Presentation</h4>
                        <p>Zoom Meeting • 1 hour</p>
                        <div className={styles.links}>
                            <a href="#" className={styles.link}>Prep: View Slides →</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpcomingEvents;
