import React, { useEffect } from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';
import styles from './Toast.module.css';

const Toast = ({ id, type = 'info', title, message, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose(id);
        }, 3000); // Auto close after 3s
        return () => clearTimeout(timer);
    }, [id, onClose]);

    const icons = {
        success: <CheckCircle size={20} color="#22c55e" />,
        error: <AlertCircle size={20} color="#ef4444" />,
        info: <Info size={20} color="#3b82f6" />
    };

    return (
        <div className={`${styles.toast} ${styles[type]}`}>
            <div className={styles.icon}>{icons[type]}</div>
            <div className={styles.content}>
                <span className={styles.title}>{title}</span>
                {message && <span className={styles.message}>{message}</span>}
            </div>
            <button onClick={() => onClose(id)} style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={16} color="#94a3b8" />
            </button>
        </div>
    );
};

export default Toast;
