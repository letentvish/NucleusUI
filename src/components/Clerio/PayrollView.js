"use client";
import React from 'react';
import {
    DollarSign, Download, PieChart, FileText, TrendingUp, Shield
} from 'lucide-react';
import styles from './PayrollView.module.css';
import { useHRMS } from '@/context/HRMSContext';

const PayrollView = () => {
    const { showToast } = useHRMS();

    return (
        <div className={styles.payrollContainer}>

            {/* HEADER */}
            <div className={styles.headerRow}>
                <div className={styles.titleBlock}>
                    <h2>My Pay & Compensation</h2>
                    <p>Manage your salary, tax declarations, and payslips.</p>
                </div>
                <button className={styles.btnPrimary}>
                    Investment Declaration
                </button>
            </div>

            {/* ... stats ... */}

            {/* ... main grid ... */}

            {/* RIGHT: PAYSLIPS & TAX */}
            <div className={styles.rightCol}>

                {/* PAYSLIPS */}
                <div className={styles.card}>
                    <div className={styles.cardHeader}>
                        <h3><FileText size={20} /> Recent Payslips</h3>
                    </div>
                    <div className={styles.payslipList}>
                        <div className={styles.payslipItem}>
                            <div className={styles.slipInfo}>
                                <span className={styles.slipMonth}>January 2026</span>
                                <span className={styles.slipDate}>Paid Jan 31</span>
                            </div>
                            <button className={styles.btnSm} onClick={() => showToast('Downloading Payslip', 'Jan 2026 slip downloaded.', 'success')}><Download size={16} /> PDF</button>
                        </div>
                        <div className={styles.payslipItem}>
                            <div className={styles.slipInfo}>
                                <span className={styles.slipMonth}>December 2025</span>
                                <span className={styles.slipDate}>Paid Dec 31</span>
                            </div>
                            <button className={styles.btnSm} onClick={() => showToast('Downloading Payslip', 'Dec 2025 slip downloaded.', 'success')}><Download size={16} /> PDF</button>
                        </div>
                        <div className={styles.payslipItem}>
                            <div className={styles.slipInfo}>
                                <span className={styles.slipMonth}>November 2025</span>
                                <span className={styles.slipDate}>Paid Nov 30</span>
                            </div>
                            <button className={styles.btnSm} onClick={() => showToast('Downloading Payslip', 'Nov 2025 slip downloaded.', 'success')}><Download size={16} /> PDF</button>
                        </div>
                    </div>
                </div>

                {/* TAX SUMMARY */}
                <div className={styles.card}>
                    <div className={styles.cardHeader}>
                        <h3><Shield size={20} color="#f59e0b" /> Tax Summary</h3>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                            <span style={{ color: '#64748b' }}>Regime</span>
                            <span style={{ fontWeight: '600' }}>New Regime</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                            <span style={{ color: '#64748b' }}>Projected Tax</span>
                            <span style={{ fontWeight: '600' }}>₹1,12,500</span>
                        </div>
                        <div style={{ padding: '0.75rem', background: '#f0f9ff', borderRadius: '8px', fontSize: '0.85rem', color: '#0369a1' }}>
                            💡 <strong>Tip:</strong> Declarations are open till Feb 20.
                        </div>
                        <button className={styles.btnSm} style={{ width: '100%' }}>Manage Tax</button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default PayrollView;
