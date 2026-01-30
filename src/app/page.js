"use client";
import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import TopNav from '@/components/Clerio/TopNav';
import MainWorkspace from '@/components/Clerio/MainWorkspace';
import AIPanel from '@/components/Clerio/AIPanel';
import LoginView from '@/components/Clerio/LoginView';
import { HRMSProvider, useHRMS } from '@/context/HRMSContext';
import { useAuth } from '@/context/AuthContext';
import styles from './page.module.css';
import Toast from '@/components/Clerio/Toast';
import toastStyles from '@/components/Clerio/Toast.module.css'; // Import for container

// Inner component to consume context for Toasts and Auth
const AppContent = () => {
  const { user, isLoading } = useAuth();
  const [isAIPanelOpen, setIsAIPanelOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  const { toasts, removeToast } = useHRMS();

  if (isLoading) return <div className={styles.loading}>Loading...</div>;

  if (!user) {
    return <LoginView />;
  }

  return (
    <main className={styles.mainContainer}>
      <TopNav activeTab={activeTab} onTabChange={setActiveTab} />

      <div className={styles.contentArea}>
        {/* Workspace takes full width */}
        <div className={styles.workspaceZone}>
          <MainWorkspace activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        {/* AI Panel - Floating Drawer */}
        <div className={`${styles.assistantZoneWrapper} ${isAIPanelOpen ? styles.open : ''}`}>
          <AIPanel onClose={() => setIsAIPanelOpen(false)} onNavigate={setActiveTab} />
        </div>

        {/* FAB to Open AI Panel (only visible when closed) */}
        <button
          className={`${styles.aiFab} ${isAIPanelOpen ? styles.hidden : ''}`}
          onClick={() => setIsAIPanelOpen(true)}
          title="Open AI Assistant"
        >
          <Sparkles size={24} />
        </button>
      </div>

      {/* GLOBAL TOAST CONTAINER */}
      <div className={toastStyles.toastContainer}>
        {toasts.map(t => (
          <Toast key={t.id} {...t} onClose={removeToast} />
        ))}
      </div>
    </main>
  );
};

export default function Home() {
  return (
    <HRMSProvider>
      <AppContent />
    </HRMSProvider>
  );
}
