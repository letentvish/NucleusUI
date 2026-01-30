"use client";
import React from 'react';
import {
    CreditCard, LayoutGrid, Users, Settings, Bell, MessageSquare,
    Calendar, TrendingUp, Plus, Clock, Briefcase
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { ROLES } from '@/utils/permissions';
import styles from './TopNav.module.css';
// ... icons imports ...

const TopNav = ({ activeTab, onTabChange }) => {
    const { user } = useAuth();
    const userRole = user?.role;

    const navItems = [
        { id: 'dashboard', icon: LayoutGrid, label: 'Dashboard' },
        {
            id: 'projects',
            icon: Briefcase,
            label: 'Projects',
            allowedRoles: [ROLES.SUPER_ADMIN, ROLES.PROJECT_MANAGER, ROLES.TEAM_LEAD, ROLES.EMPLOYEE, ROLES.TRAINEE]
        },
        { id: 'attendance', icon: Clock, label: 'Attendance' },
        {
            id: 'team',
            icon: Users,
            label: 'My Team',
            allowedRoles: [ROLES.SUPER_ADMIN, ROLES.HR_MANAGER, ROLES.TEAM_LEAD]
        },
        { id: 'leaves', icon: Calendar, label: 'Leaves' },
        {
            id: 'payroll',
            icon: CreditCard,
            label: 'My Pay',
            allowedRoles: [ROLES.SUPER_ADMIN, ROLES.FINANCE_MANAGER, ROLES.HR_MANAGER, ROLES.EMPLOYEE, ROLES.PROJECT_MANAGER, ROLES.TEAM_LEAD]
        },
        { id: 'performance', icon: TrendingUp, label: 'Performance' },
        {
            id: 'settings',
            icon: Settings,
            label: 'Settings',
            allowedRoles: [ROLES.SUPER_ADMIN, ROLES.HR_MANAGER]
        }
    ];

    const visibleItems = navItems.filter(item =>
        !item.allowedRoles || (userRole && item.allowedRoles.includes(userRole))
    );

    const [showNotifications, setShowNotifications] = React.useState(false);
    const [showQuickActions, setShowQuickActions] = React.useState(false);

    const toggleNotifications = () => setShowNotifications(!showNotifications);
    const toggleQuickActions = () => setShowQuickActions(!showQuickActions);

    const handleQuickAction = (action) => {
        // In a real app, this would open a modal or navigate
        console.log(`Triggered action: ${action}`);
        setShowQuickActions(false);
        // Special case for navigation
        if (action === 'log_time') onTabChange('attendance');
        if (action === 'new_project') onTabChange('projects');
    };

    return (
        <nav className={styles.navbar}>
            <div className={styles.brand}>
                <div className={styles.logoMark}>
                    <div className={styles.logoInner}>N</div>
                </div>
                <span className={styles.brandName}>Nucleus</span>
            </div>

            {/* SEARCH BAR */}
            <div className={styles.searchBarWrapper}>
                <div className={styles.searchIcon}>🔍</div>
                <input
                    type="text"
                    placeholder="Search commands, pages or ask AI..."
                    className={styles.searchInput}
                />
                <div className={styles.cmdShortcut}>Ctrl+K</div>
            </div>

            <div className={`${styles.centerMenu} glass-panel`}>
                {visibleItems.map((item) => (
                    <button
                        key={item.id}
                        className={`${styles.navItem} ${activeTab === item.id ? styles.active : ''}`}
                        onClick={() => onTabChange(item.id)}
                        title={item.label}
                    >
                        <item.icon size={24} strokeWidth={1.5} />
                        {activeTab === item.id && <span className={styles.activeDot} />}
                    </button>
                ))}
            </div>

            <div className={styles.actions}>
                {/* QUICK ACTION */}
                <div style={{ position: 'relative' }}>
                    <button
                        className={`${styles.iconBtn} ${styles.primaryBtn}`}
                        title="Quick Action"
                        onClick={toggleQuickActions}
                    >
                        <Plus size={24} strokeWidth={2.5} />
                    </button>
                    {showQuickActions && (
                        <div className={styles.dropdownMenu}>
                            <div className={styles.dropdownHeader}>Quick Actions</div>
                            <button className={styles.dropdownItem} onClick={() => handleQuickAction('new_project')}>New Project</button>
                            <button className={styles.dropdownItem} onClick={() => handleQuickAction('new_task')}>New Task</button>
                            <button className={styles.dropdownItem} onClick={() => handleQuickAction('log_time')}>Log Time</button>
                            <button className={styles.dropdownItem} onClick={() => handleQuickAction('request_leave')}>Request Leave</button>
                        </div>
                    )}
                </div>

                {/* NOTIFICATIONS */}
                <div style={{ position: 'relative' }}>
                    <button
                        className={styles.iconBtn}
                        title="Notifications"
                        onClick={toggleNotifications}
                    >
                        <Bell size={24} className={styles.icon} strokeWidth={1.5} />
                        <span className={styles.badge} />
                    </button>
                    {showNotifications && (
                        <div className={styles.dropdownMenu} style={{ right: '-50px', width: '280px' }}>
                            <div className={styles.dropdownHeader}>Notifications</div>
                            <div className={styles.notificationItem}>
                                <strong>System Update</strong>
                                <p>Nucleus AI v2.0 is live!</p>
                            </div>
                            <div className={styles.notificationItem}>
                                <strong>HR Policy</strong>
                                <p>Updated leave policy available.</p>
                            </div>
                            <div className={styles.notificationItem}>
                                <strong>Meeting</strong>
                                <p>Team sync at 3:00 PM.</p>
                            </div>
                        </div>
                    )}
                </div>

                <div className={`${styles.messageBadge} glass-panel`} onClick={() => alert("Opening AI Chat...")}>
                    <img
                        src="https://ui-avatars.com/api/?name=System&background=2563ea&color=fff"
                        className={styles.msgAvatar}
                        alt="System"
                    />
                    <span className={styles.msgText}>New Message</span>
                </div>

                <div className={styles.profile}>
                    <div className={styles.roleBadge} title="Current Role">
                        {userRole?.replace('_', ' ') || 'GUEST'}
                    </div>
                    <img
                        src={`https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=2563ea&color=fff`}
                        alt="Profile"
                        className={styles.avatar}
                    />
                </div>
            </div>
        </nav>
    );
};

export default TopNav;
