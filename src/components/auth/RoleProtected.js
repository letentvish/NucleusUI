'use client';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function RoleProtected({ children, allowedRoles = [], fallback = null }) {
    const { user, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !user) {
            // Redirect to login if not authenticated
            // router.push('/login'); 
            // For now, we might not have a login page at /login, so maybe just do nothing or show fallback
        }
    }, [user, isLoading, router]);

    if (isLoading) {
        return <div>Loading...</div>; // Or a spinner
    }

    if (!user) {
        return fallback || <div className="p-4 text-red-500">Please log in to view this content.</div>;
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
        return fallback || <div className="p-4 text-red-500">Access Denied: You do not have permission to view this content.</div>;
    }

    return children;
}
