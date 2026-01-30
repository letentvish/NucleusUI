"use client";
import React from 'react';
import { Search, Bell, Monitor, Plus } from 'lucide-react';
import styles from './Header.module.css';

const Header = () => {
    return (
        <header className={`${styles.header} glass-card`}>
            <div className={styles.logo}>
                <div className={styles.logoIcon}>N</div>
                <span>Nucleus</span>
            </div>

            <div className={styles.searchBar}>
                <Search className={styles.searchIcon} size={20} />
                <input
                    type="text"
                    placeholder="Search or ask AI..."
                    className={styles.searchInput}
                />
                <div className={styles.shortcut}>Ctrl+K</div>
            </div>

            <div className={styles.actions}>
                <button className={styles.actionBtn}>
                    <Plus size={20} />
                    <span>Quick</span>
                </button>

                <button className={styles.iconBtn}>
                    <Bell size={20} />
                    <span className={styles.badge}>3</span>
                </button>

                <button className={styles.iconBtn}>
                    <Monitor size={20} />
                </button>

                <div className={styles.profile}>
                    <img
                        src="https://ui-avatars.com/api/?name=Vishal&background=8B5CF6&color=fff"
                        alt="Profile"
                        className={styles.avatar}
                    />
                    <span className={styles.profileName}>Vishal</span>
                </div>
            </div>
        </header>
    );
};

export default Header;
