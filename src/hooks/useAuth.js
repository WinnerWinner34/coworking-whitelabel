//===========================================================================
// src/hooks/useAuth.js - Authentication Hook and Context Provider
// ============================================================================

import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../services/auth';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Check for existing session on mount
    auth.getCurrentUser()
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
    
    // Set up session monitoring
    const sessionInterval = auth.setupSessionMonitoring();
    
    return () => {
      if (sessionInterval) {
        clearInterval(sessionInterval);
      }
    };
  }, []);
  
  const login = async (email, password) => {
    try {
      setLoading(true);
      const user = await auth.login(email, password);
      setUser(user);
      return user;
    } catch (error) {
      setUser(null);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  
  const logout = async () => {
    try {
      setLoading(true);
      await auth.logout();
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
      // Force logout on error
      setUser(null);
    } finally {
      setLoading(false);
    }
  };
  
  const hasPermission = async (permission) => {
    return await auth.hasPermission(permission, user);
  };
  
  const hasRole = async (role) => {
    return await auth.hasRole(role, user);
  };
  
  const value = {
    user,
    login,
    logout,
    loading,
    hasPermission,
    hasRole,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    canPublish: user?.permissions?.includes('publish'),
    canEdit: user?.permissions?.includes('write')
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}