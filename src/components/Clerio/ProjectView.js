"use client";
import React from 'react';
import {
    Briefcase, Plus, MoreHorizontal, Clock, Calendar, MessageSquare, Paperclip, CheckCircle
} from 'lucide-react';
import styles from './ProjectView.module.css';
import { useHRMS } from '@/context/HRMSContext';

const ProjectView = () => {
    const { kanbanTasks, moveTask } = useHRMS();

    return (
        <div className={styles.projectContainer}>

            {/* HEADER */}
            <div className={styles.headerRow}>
                <div className={styles.titleBlock}>
                    <h2>Project Workspace</h2>
                    <p>Manage projects, track tasks, and collaborate with your team.</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button className={styles.btnPrimary} style={{ background: 'white', color: '#3b82f6', border: '1px solid #e2e8f0' }}>
                        My Tasks
                    </button>
                    <button className={styles.btnPrimary}>
                        <Plus size={18} style={{ marginRight: '0.5rem' }} /> New Project
                    </button>
                </div>
            </div>

            <div className={styles.mainLayout}>

                {/* PROJECT OVERVIEW */}
                <div className={styles.projectGrid}>
                    {/* Project 1 */}
                    <div className={styles.projectCard}>
                        <div className={styles.projHeader}>
                            <div className={styles.projTitle}>Website Redesign</div>
                            <MoreHorizontal size={18} color="#94a3b8" />
                        </div>
                        <div className={styles.projDesc}>Revamping the corporate website with new branding and improved UX.</div>
                        <div className={styles.progressWrapper}>
                            <div className={styles.progressBar} style={{ width: '75%', background: '#3b82f6' }}></div>
                        </div>
                        <div className={styles.projMeta}>
                            <div className={styles.projMembers}>
                                <img src="https://ui-avatars.com/api/?name=Vishal&background=random" className={styles.memberAvatar} />
                                <img src="https://ui-avatars.com/api/?name=Sarah&background=random" className={styles.memberAvatar} />
                                <img src="https://ui-avatars.com/api/?name=Priya&background=random" className={styles.memberAvatar} />
                            </div>
                            <span>Due Feb 15</span>
                        </div>
                    </div>

                    {/* Project 2 */}
                    <div className={styles.projectCard}>
                        <div className={styles.projHeader}>
                            <div className={styles.projTitle}>Mobile App Launch</div>
                            <MoreHorizontal size={18} color="#94a3b8" />
                        </div>
                        <div className={styles.projDesc}>Native iOS and Android app development for the client portal.</div>
                        <div className={styles.progressWrapper}>
                            <div className={styles.progressBar} style={{ width: '40%', background: '#f59e0b' }}></div>
                        </div>
                        <div className={styles.projMeta}>
                            <div className={styles.projMembers}>
                                <img src="https://ui-avatars.com/api/?name=Rahul&background=random" className={styles.memberAvatar} />
                                <img src="https://ui-avatars.com/api/?name=David&background=random" className={styles.memberAvatar} />
                            </div>
                            <span>Due Mar 01</span>
                        </div>
                    </div>

                    {/* Project 3 */}
                    <div className={styles.projectCard} style={{ borderStyle: 'dashed', borderColor: '#cbd5e1', boxShadow: 'none', background: 'transparent', justifyContent: 'center', alignItems: 'center' }}>
                        <Plus size={32} color="#cbd5e1" />
                        <span style={{ color: '#94a3b8', fontWeight: '600' }}>Create New Project</span>
                    </div>
                </div>

                {/* KANBAN BOARD */}
                <div className={styles.kanbanSection}>
                    <div className={styles.sectionTitle}>
                        <Briefcase size={20} color="#2563ea" /> Active Tasks (Website Redesign)
                    </div>

                    <div className={styles.kanbanBoard}>

                        {/* COLUMN: TO DO */}
                        <div className={styles.kanbanColumn}>
                            <div className={styles.colHeader}>
                                <span className={styles.colTitle}>To Do</span>
                                <span className={styles.colCount}>{kanbanTasks.todo.length}</span>
                            </div>
                            {kanbanTasks.todo.map(task => (
                                <div key={task.id} className={styles.taskCard} onClick={() => moveTask(task.id, 'todo', 'inprogress')} style={{ cursor: 'pointer' }}>
                                    <div className={styles.taskTags}>
                                        <span className={`${styles.tag} ${styles.tagResearch}`}>{task.tag}</span>
                                    </div>
                                    <div className={styles.taskTitle}>{task.title}</div>
                                    <div className={styles.taskFooter}>
                                        <img src={`https://ui-avatars.com/api/?name=${task.assignee}&background=random`} className={styles.taskAssignee} />
                                        <div className={styles.taskDue}><Clock size={12} /> 2d</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* COLUMN: IN PROGRESS */}
                        <div className={styles.kanbanColumn}>
                            <div className={styles.colHeader}>
                                <span className={styles.colTitle}>In Progress</span>
                                <span className={styles.colCount}>{kanbanTasks.inprogress.length}</span>
                            </div>
                            {kanbanTasks.inprogress.map(task => (
                                <div key={task.id} className={styles.taskCard} style={{ borderLeft: '4px solid #3b82f6', cursor: 'pointer' }} onClick={() => moveTask(task.id, 'inprogress', 'review')}>
                                    <div className={styles.taskTags}>
                                        <span className={`${styles.tag} ${styles.tagDev}`}>{task.tag}</span>
                                    </div>
                                    <div className={styles.taskTitle}>{task.title}</div>
                                    <div className={styles.taskFooter}>
                                        <img src={`https://ui-avatars.com/api/?name=${task.assignee}&background=random`} className={styles.taskAssignee} />
                                        <div className={styles.taskDue}><Clock size={12} /> Today</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* COLUMN: REVIEW */}
                        <div className={styles.kanbanColumn}>
                            <div className={styles.colHeader}>
                                <span className={styles.colTitle}>Review</span>
                                <span className={styles.colCount}>{kanbanTasks.review.length}</span>
                            </div>
                            {kanbanTasks.review.map(task => (
                                <div key={task.id} className={styles.taskCard} onClick={() => moveTask(task.id, 'review', 'done')} style={{ cursor: 'pointer' }}>
                                    <div className={styles.taskTags}>
                                        <span className={`${styles.tag} ${styles.tagDev}`}>{task.tag}</span>
                                    </div>
                                    <div className={styles.taskTitle}>{task.title}</div>
                                    <div className={styles.taskFooter}>
                                        <img src={`https://ui-avatars.com/api/?name=${task.assignee}&background=random`} className={styles.taskAssignee} />
                                        <div className={styles.taskDue} style={{ color: '#16a34a' }}><CheckCircle size={12} /> Ready</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* COLUMN: DONE */}
                        <div className={styles.kanbanColumn}>
                            <div className={styles.colHeader}>
                                <span className={styles.colTitle}>Done</span>
                                <span className={styles.colCount}>{kanbanTasks.done.length}</span>
                            </div>
                            {kanbanTasks.done.map(task => (
                                <div key={task.id} className={styles.taskCard} style={{ opacity: 0.75 }}>
                                    <div className={styles.taskTags}>
                                        <span className={`${styles.tag} ${styles.tagResearch}`}>{task.tag}</span>
                                    </div>
                                    <div className={styles.taskTitle} style={{ textDecoration: 'line-through', color: '#94a3b8' }}>{task.title}</div>
                                    <div className={styles.taskFooter}>
                                        <img src={`https://ui-avatars.com/api/?name=${task.assignee}&background=random`} className={styles.taskAssignee} />
                                        <div className={styles.taskDue} style={{ color: '#94a3b8' }}>Completed</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};


export default ProjectView;
