"use client";
import React, { useState } from 'react';
import { Mic, Camera, Lock, ArrowRight, User } from 'lucide-react';
import styles from './LoginView.module.css';

import { useAuth } from '@/context/AuthContext';

const LoginView = () => {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        const success = await login(email, password);
        if (!success) {
            setError('Invalid email or password');
            setIsLoading(false);
        }
        // If success, AuthContext updates user, triggering re-render in parent
    };

    const handleBiometricLogin = () => {
        alert("Biometric login coming soon! Please use email and password.");
    };

    return (
        <div className={styles.loginWrapper}>
            <div className={`${styles.orb} ${styles.orb1}`}></div>
            <div className={`${styles.orb} ${styles.orb2}`}></div>

            <div className={styles.loginCard}>
                <div className={styles.brand}>
                    <div className={styles.logo}>N</div>
                    <div className={styles.title}>Welcome Back</div>
                    <div className={styles.subtitle}>Enter your credentials to access Nucleus AI</div>
                </div>

                {/* Error Message */}
                {error && <div style={{ color: 'red', textAlign: 'center', marginBottom: '1rem' }}>{error}</div>}

                <form className={styles.inputGroup} onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Email Address"
                        className={styles.inputField}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className={styles.inputField}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit" className={styles.loginBtn}>
                        {isLoading ? 'Authenticating...' : 'Sign In'}
                    </button>
                </form>

                <div className={styles.divider}>
                    <div className={styles.line}></div>
                    <span>OR CONTINUE WITH AI</span>
                    <div className={styles.line}></div>
                </div>

                <div className={styles.biometricRow}>
                    <button type="button" className={styles.bioBtn} onClick={handleBiometricLogin}>
                        <Mic size={24} color="#a855f7" />
                        <span className={styles.bioLabel}>Voice ID</span>
                    </button>
                    <button type="button" className={styles.bioBtn} onClick={handleBiometricLogin}>
                        <Camera size={24} color="#3b82f6" />
                        <span className={styles.bioLabel}>Face Match</span>
                    </button>
                </div>

                <div style={{ textAlign: 'center', fontSize: '0.85rem', color: '#64748b', marginTop: '1rem' }}>
                    Forgot password? <span style={{ color: '#3b82f6', cursor: 'pointer', fontWeight: '500' }}>Reset here</span>
                </div>
            </div>
        </div>
    );
};

export default LoginView;
