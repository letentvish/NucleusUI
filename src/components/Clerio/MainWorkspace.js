"use client";
import React from 'react';
import {
    MoreHorizontal, Clock, Calendar, CheckCircle, AlertCircle, DollarSign,
    Users, TrendingUp, Sun, Cloud, Mic, Sparkles, MapPin, Play, Bell,
    ChevronRight, Megaphone, FileText, Target
} from 'lucide-react';
import styles from './MainWorkspace.module.css';
import AttendanceView from './AttendanceView';
import LeaveView from './LeaveView';
import PerformanceView from './PerformanceView';
import PayrollView from './PayrollView';
import ProjectView from './ProjectView';
import TeamView from './TeamView';
import SettingsView from './SettingsView';
import AttendanceFAB from './AttendanceFAB';
import { useHRMS } from '@/context/HRMSContext';
import RoleProtected from '../auth/RoleProtected';
import { ROLES } from '@/utils/permissions';

const MainWorkspace = ({ activeTab, onTabChange }) => {
    const {
        user, attendance, punchIn, punchOut,
        leaves, projects, focusTasks, completeFocusTask
    } = useHRMS();


    // --- DASHBOARD RENDERER ---
    const renderDashboard = () => (
        <div className={styles.dashboardContainer}>

            {/* 1. HERO SECTION */}
            <div className={styles.heroSection}>
                {/* Background Particles would go here if using distinct elements */}
                <div className={styles.heroContent}>
                    <div className={styles.heroLeft}>
                        <div className={styles.heroAvatarWrapper}>
                            <img
                                src="https://ui-avatars.com/api/?name=Vishal&background=fff&color=2563ea"
                                className={styles.heroAvatar}
                                alt="Vishal"
                            />
                            <div className={styles.heroOnline}></div>
                        </div>
                        <div className={styles.heroText}>
                            <h1>Good Morning, Vishal!</h1>
                            <p>Ready to make today productive?</p>
                            <div className={styles.aiInsight}>
                                <Sparkles size={18} color="#fbbf24" fill="#fbbf24" />
                                <span><strong>AI Insight:</strong> You're 20% more productive on Wednesdays! Keep the momentum going.</span>
                            </div>
                        </div>
                    </div>

                    <div className={styles.cardRight}>
                        <div className={styles.timeBig}>10:15 AM</div>
                        <div className={styles.dateSmall}>Wednesday, January 29, 2026</div>
                        <div className={styles.locWeather}>
                            <span>📍 Kesharipur, UP</span>
                            <span>☁️ 24°C Cloudy</span>
                        </div>
                    </div>
                </div>

                <button className={styles.voiceBtn}>
                    <Mic size={32} />
                </button>
            </div>

            {/* 2. METRICS ROW */}
            <div className={styles.metricsRow}>
                {/* Attendance */}
                <div className={styles.glassCard} onClick={() => onTabChange('attendance')} style={{ cursor: 'pointer' }}>
                    <div className={`${styles.cardIcon} ${attendance.status === 'present' ? styles.iconGreen : styles.iconOrange}`}>
                        <CheckCircle size={24} />
                    </div>
                    <div className={styles.cardTitle}>Attendance Status</div>
                    <div className={styles.cardValue}>
                        {attendance.status === 'present' ? '✅ In' : attendance.status === 'punched_out' ? '🛑 Out' : '⚠️ Absent'}
                    </div>
                    <span className={styles.cardSub}>
                        {attendance.status === 'present' ? `In: ${attendance.punchInTime}` : 'Not punched in'}
                    </span>
                    <div className={styles.progressBarWrapper}>
                        <div className={`${styles.progressBar} ${styles.fillGreen}`} style={{ width: attendance.status === 'present' ? '100%' : '0%' }}></div>
                    </div>
                    {attendance.status === 'absent' && (
                        <button className={styles.askAiBtn} onClick={(e) => { e.stopPropagation(); punchIn(); }} style={{ background: '#dcfce7', color: '#166534' }}>Punch In</button>
                    )}
                </div>

                {/* Leave Balance */}
                <div className={styles.glassCard} onClick={() => onTabChange('leaves')} style={{ cursor: 'pointer' }}>
                    <div className={`${styles.cardIcon} ${styles.iconOrange}`}><Sun size={24} /></div>
                    <div className={styles.cardTitle}>Privilege Leave</div>
                    <div className={styles.cardValue}>{leaves.privilege.available} days</div>
                    <span className={styles.cardSub}>{leaves.privilege.total - leaves.privilege.available} used of {leaves.privilege.total}</span>
                    <div className={styles.progressBarWrapper}>
                        <div className={`${styles.progressBar} ${styles.fillOrange}`} style={{ width: `${(leaves.privilege.available / leaves.privilege.total) * 100}%` }}></div>
                    </div>
                    <button className={styles.askAiBtn} onClick={(e) => { e.stopPropagation(); onTabChange('leaves'); }}><Sparkles size={14} /> Plan Leave</button>
                </div>

                {/* Hours Today */}
                <div className={styles.glassCard} onClick={() => onTabChange('attendance')} style={{ cursor: 'pointer' }}>
                    <div className={`${styles.cardIcon} ${styles.iconBlue}`}><Clock size={24} /></div>
                    <div className={styles.cardTitle}>Hours Today</div>
                    <div className={styles.cardValue}>{attendance.totalHours || '0h 0m'}</div>
                    <span className={styles.cardSub}>Target: 9h/day</span>
                    <div className={styles.progressBarWrapper}>
                        <div className={`${styles.progressBar} ${styles.fillBlue}`} style={{ width: '28%' }}></div>
                    </div>
                    <button className={styles.askAiBtn} onClick={(e) => { e.stopPropagation(); onTabChange('attendance'); }}><Sparkles size={14} /> View Logs</button>
                </div>

                {/* Recognition */}
                <div className={styles.glassCard} onClick={() => onTabChange('performance')} style={{ cursor: 'pointer' }}>
                    <div className={`${styles.cardIcon} ${styles.iconPurple}`}><TrendingUp size={24} /></div>
                    <div className={styles.cardTitle}>Recognition</div>
                    <div className={styles.cardValue}>0 badges</div>
                    <span className={styles.cardSub}>3rd in team</span>
                    <div className={styles.miniChart}>▁▃▅▇▅▃▁</div>
                    <button className={styles.askAiBtn} onClick={(e) => { e.stopPropagation(); onTabChange('performance'); }}>View Wall →</button>
                </div>
            </div>

            {/* 3. DASHBOARD GRID (Phase 1, 2, 3) */}
            <div className={styles.dashboardGrid}>

                {/* --- LEFT COLUMN (COMMUNICATION & TASKS) --- */}
                <div className={styles.leftCol}>

                    {/* MOOD TRACKER (Phase 3) */}
                    <div className={`${styles.widgetContainer} ${styles.moodWidget}`}>
                        <div className={styles.cardHeaderSimple}>
                            <h4><Sparkles size={16} color="#8b5cf6" /> How are you feeling today?</h4>
                        </div>
                        <div className={styles.moodRow}>
                            <button className={styles.moodBtn}>😊</button>
                            <button className={styles.moodBtn}>😐</button>
                            <button className={styles.moodBtn}>😔</button>
                            <button className={styles.moodBtn}>😫</button>
                            <button className={styles.moodBtn}>🤩</button>
                        </div>
                        <div className={styles.moodMeta}>Team Average: 😊 Positive (78%)</div>
                    </div>

                    {/* ANNOUNCEMENTS */}
                    <div className={styles.announcementCard}>
                        <div className={styles.sectionHeaderSimple}>
                            <h3><Megaphone size={18} color="#f59e0b" /> Recent Announcements</h3>
                            <button className={styles.textBtn}>View All</button>
                        </div>
                        <div className={`${styles.announceItem} ${styles.pinned}`}>
                            <div className={styles.announceBadge}>PINNED</div>
                            <div className={styles.announceContent}>
                                <h4>Welcome to Nucleus Platform</h4>
                                <span className={styles.announceMeta}>Posted by HR • Yesterday</span>
                            </div>
                        </div>
                        <div className={styles.announceItem}>
                            <div className={styles.announceIcon}>📢</div>
                            <div className={styles.announceContent}>
                                <h4>Policy Update: Remote Work Guidelines</h4>
                                <span className={styles.announceMeta}>Posted by Diksha • 2 days ago</span>
                            </div>
                        </div>
                    </div>

                    {/* TODAY'S FOCUS */}
                    <div className={styles.focusSection}>
                        <div className={styles.sectionHeader}>
                            <h3><Sparkles size={18} color="#6366f1" /> TODAY'S FOCUS</h3>
                            <button className={styles.textBtn}>🔄 Refresh</button>
                        </div>
                        <div className={styles.focusList}>
                            {focusTasks.map(task => (
                                <div key={task.id} className={`${styles.focusItem} ${task.urgency === 'high' ? styles.highPrio : styles.medPrio}`} style={{ opacity: task.done ? 0.5 : 1 }}>
                                    <div className={styles.taskHeader}>
                                        <span className={styles.taskTitle} style={{ textDecoration: task.done ? 'line-through' : 'none' }}>
                                            {task.urgency === 'high' ? <AlertCircle size={16} color="#ef4444" /> : <Users size={16} color="#f59e0b" />}
                                            {task.title}
                                        </span>
                                        <span className={styles.taskMeta}>⏰ {task.time}</span>
                                    </div>
                                    {!task.done && (
                                        <div className={styles.actionRow}>
                                            <button className={`${styles.btnAction} ${styles.btnPrimary}`} onClick={() => completeFocusTask(task.id)}>Mark Done</button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ACTIVITY LOG (Phase 2) */}
                    <div className={styles.widgetContainer}>
                        <div className={styles.cardHeader}><h4><FileText size={16} /> Recent Activity</h4></div>
                        <div className={styles.activityList}>
                            <div className={styles.activityItem}>
                                <div className={styles.activityDot}></div>
                                <div><span className={styles.activityTime}>10:15 AM</span> Submitted daily log</div>
                            </div>
                            <div className={styles.activityItem}>
                                <div className={styles.activityDot}></div>
                                <div><span className={styles.activityTime}>09:55 AM</span> Punched In</div>
                            </div>
                        </div>
                        <button className={styles.viewAllLink} onClick={() => onTabChange('attendance')}>View Full History →</button>
                    </div>
                </div>

                {/* --- RIGHT COLUMN (WIDGETS) --- */}
                <div className={styles.rightCol}>

                    {/* TEAM STATUS (Phase 2 - Manager) */}
                    <div className={styles.widgetContainer}>
                        <div className={styles.cardHeader}>
                            <h4><Users size={16} /> My Team Status</h4>
                            <span className={styles.countBadge} style={{ background: '#22c55e' }}>12/15 Present</span>
                        </div>
                        <div className={styles.teamAvatars}>
                            <img src="https://ui-avatars.com/api/?name=Sarah&background=random" className={styles.teamAvatar} alt="Sarah" title="Sarah - On Leave" />
                            <img src="https://ui-avatars.com/api/?name=Rahul&background=random" className={styles.teamAvatar} alt="Rahul" title="Rahul - WFH" />
                            <img src="https://ui-avatars.com/api/?name=Priya&background=random" className={styles.teamAvatar} alt="Priya" title="Priya - Present" />
                            <div className={styles.teamMore}>+9</div>
                        </div>
                        <button className={styles.viewAllLink} onClick={() => onTabChange('team')}>View Team Dashboard →</button>
                    </div>

                    {/* CELEBRATIONS (Phase 2) */}
                    <div className={`${styles.widgetContainer} ${styles.celebrationCard}`}>
                        <div className={styles.cardHeaderSimple}>
                            <h4>🎉 Celebrations</h4>
                        </div>
                        <div className={styles.celebrationItem}>
                            <div className={styles.celIcon}>🎂</div>
                            <div>
                                <div className={styles.celTitle}>Rahul's Birthday</div>
                                <div className={styles.celMeta}>Today</div>
                            </div>
                            <button className={styles.btnSm}>Wish</button>
                        </div>
                    </div>

                    {/* PROJECT STATUS (Phase 2) */}
                    <div className={styles.widgetContainer}>
                        <div className={styles.cardHeader}><h4><MoreHorizontal size={16} /> Active Projects</h4></div>
                        <div className={styles.projectItem} onClick={() => onTabChange('projects')} style={{ cursor: 'pointer' }}>
                            <div className={styles.projectTitle}>Website Redesign</div>
                            <div className={styles.progressBarWrapper}>
                                <div className={`${styles.progressBar} ${styles.fillBlue}`} style={{ width: '85%' }}></div>
                            </div>
                            <div className={styles.projectMeta}>3 tasks pending • Due in 5d</div>
                        </div>
                        <div className={styles.projectItem} onClick={() => onTabChange('projects')} style={{ cursor: 'pointer' }}>
                            <div className={styles.projectTitle}>Mobile App Launch</div>
                            <div className={styles.progressBarWrapper}>
                                <div className={`${styles.progressBar} ${styles.fillOrange}`} style={{ width: '65%' }}></div>
                            </div>
                            <div className={styles.projectMeta}>7 tasks pending • Due in 12d</div>
                        </div>
                    </div>

                    {/* PAYROLL SNAPSHOT (Phase 2) */}
                    <div className={styles.widgetContainer}>
                        <div className={styles.cardHeader}><h4><DollarSign size={16} /> Payroll</h4></div>
                        <div className={styles.payrollRow}>
                            <span className={styles.payLabel}>Next Salary</span>
                            <span className={styles.payValue}>Feb 1</span>
                        </div>
                        <div className={styles.payrollRow}>
                            <span className={styles.payLabel}>Last Net Pay</span>
                            <span className={styles.payValue}>₹72,500</span>
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                            <button className={styles.btnSm} style={{ width: '100%' }} onClick={() => onTabChange('payroll')}>View Slip</button>
                        </div>
                    </div>

                    {/* LEARNING (Phase 3) */}
                    <div className={styles.widgetContainer}>
                        <div className={styles.cardHeader}><h4><Play size={16} /> My Learning</h4></div>
                        <div style={{ marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '600' }}>Advanced React Patterns</div>
                        <div className={styles.progressBarWrapper}>
                            <div className={`${styles.progressBar} ${styles.fillPurple}`} style={{ width: '75%', background: '#a855f7' }}></div>
                        </div>
                        <div style={{ fontSize: '0.8rem', color: '#64748b' }}>2 hours remaining</div>
                    </div>

                    {/* PENDING APPROVALS */}
                    <div className={styles.widgetContainer}>
                        <div className={styles.cardHeader}>
                            <h4><Clock size={16} /> Approvals</h4>
                            <span className={styles.countBadge}>3</span>
                        </div>
                        <div className={styles.approvalList}>
                            <div className={styles.approvalRow}>
                                <div className={styles.approvalInfo}>
                                    <span className={styles.appType}>Leave</span>
                                    <strong>Rahul S.</strong>
                                </div>
                                <button className={styles.btnSm} onClick={() => onTabChange('leaves')}>Review</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 4. BOTTOM WIDGETS (Attendance & Events) */}
            <div className={styles.bottomRow}>
                {/* Attendance Widget */}
                <div className={styles.widgetContainer}>
                    <div className={styles.cardHeader}><h4>ATTENDANCE</h4></div>
                    <div className={styles.timelineSession}>
                        <div className={styles.sessionBlock}>
                            <div className={styles.sessionLabel}>START</div>
                            <div className={styles.sessionValue}>{attendance.punchInTime || '--:--'}</div>
                        </div>
                        <div className={styles.sessionBlock}>
                            <div className={styles.sessionLabel}>STATUS</div>
                            <div className={styles.sessionStatus}>
                                {attendance.status === 'present' ? '✅ In' : '❌ Out'}
                            </div>
                        </div>
                        <div className={styles.sessionBlock}>
                            <div className={styles.sessionLabel}>ACTION</div>
                            {attendance.status === 'present' ? (
                                <button className={`${styles.btnAction} ${styles.btnPrimary}`} style={{ background: '#ef4444', color: 'white' }} onClick={punchOut}>Punch Out</button>
                            ) : (
                                <button className={`${styles.btnAction} ${styles.btnPrimary}`} onClick={punchIn}>Punch In</button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Upcoming Events */}
                <div className={styles.widgetContainer}>
                    <div className={styles.cardHeader}><h4>TIMELINE</h4></div>
                    <div className={styles.timelineList}>
                        <div className={styles.eventItem}>
                            <div className={styles.eventTime}>11:00</div>
                            <div className={styles.eventInfo}>
                                <div className={styles.eventTitle}>Team Standup</div>
                                <div className={styles.eventDetail}>Conf Room A • 30m</div>
                            </div>
                        </div>
                        <div className={styles.eventItem}>
                            <div className={styles.eventTime}>14:00</div>
                            <div className={styles.eventInfo}>
                                <div className={styles.eventTitle}>Client Demo</div>
                                <div className={styles.eventDetail}>Zoom • 1h</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    // --- OTHER TABS (Placeholders) ---
    const renderTeam = () => (
        <div style={{ padding: '2rem' }}><h2>My Team Content (Placeholder)</h2></div>
    );
    const renderLeaves = () => (
        <div style={{ padding: '2rem' }}><h2>Leaves Content (Placeholder)</h2></div>
    );
    const renderPayroll = () => (
        <div style={{ padding: '2rem' }}><h2>Payroll Content (Placeholder)</h2></div>
    );
    const renderPerformance = () => (
        <div style={{ padding: '2rem' }}><h2>Performance Content (Placeholder)</h2></div>
    );

    return (
        <div className={styles.workspace}>
            {/* Header stays persistent only for non-dashboard tabs if needed */}
            {activeTab !== 'dashboard' && (
                <div className={styles.headerContext}>
                    <div className={styles.titleBlock}>
                        <span className={styles.subtitle}>Welcome back, Vishal</span>
                        <h1>{activeTab.replace(/^\w/, (c) => c.toUpperCase())}</h1>
                    </div>
                </div>
            )}

            {/* Display Content based on Active Tab */}
            {activeTab === 'dashboard' && renderDashboard()}

            {activeTab === 'projects' && (
                <RoleProtected allowedRoles={[ROLES.SUPER_ADMIN, ROLES.PROJECT_MANAGER, ROLES.TEAM_LEAD, ROLES.EMPLOYEE, ROLES.TRAINEE]}>
                    <ProjectView />
                </RoleProtected>
            )}

            {activeTab === 'attendance' && <AttendanceView />}

            {activeTab === 'team' && (
                <RoleProtected allowedRoles={[ROLES.SUPER_ADMIN, ROLES.HR_MANAGER, ROLES.TEAM_LEAD]}>
                    <TeamView />
                </RoleProtected>
            )}

            {activeTab === 'leaves' && <LeaveView />}

            {activeTab === 'payroll' && (
                <RoleProtected allowedRoles={[ROLES.SUPER_ADMIN, ROLES.FINANCE_MANAGER, ROLES.HR_MANAGER, ROLES.EMPLOYEE, ROLES.PROJECT_MANAGER, ROLES.TEAM_LEAD]}>
                    <PayrollView />
                </RoleProtected>
            )}

            {activeTab === 'performance' && <PerformanceView />}

            {activeTab === 'settings' && (
                <RoleProtected allowedRoles={[ROLES.SUPER_ADMIN, ROLES.HR_MANAGER]}>
                    <SettingsView />
                </RoleProtected>
            )}

            {/* FLOATING ACTION BUTTON */}
            <AttendanceFAB />
        </div>
    );
};

export default MainWorkspace;
