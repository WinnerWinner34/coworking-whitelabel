// src/services/auth.js
// Authentication service with support for both simple auth and Firebase Auth
// Person A's admin pages will use this to protect routes and manage login

const AUTH_KEY = 'coworking_auth';
const SESSION_TIMEOUT = 24 * 60 * 60 * 1000; // 24 hours

// Firebase auth (optional)
let firebaseAuth;
try {
  const firebase = require('./firebase');
  firebaseAuth = firebase.auth;
} catch (error) {
  console.log('Firebase Auth not configured, using simple auth');
}

// Simple auth credentials (for development/demo)
const DEMO_CREDENTIALS = {
  'admin@coworking.com': {
    password: 'admin123',
    id: 'admin-001',
    name: 'Admin User',
    role: 'admin',
    permissions: ['read', 'write', 'publish', 'settings']
  },
  'manager@coworking.com': {
    password: 'manager123', 
    id: 'manager-001',
    name: 'Manager User',
    role: 'manager',
    permissions: ['read', 'write', 'publish']
  },
  'editor@coworking.com': {
    password: 'editor123',
    id: 'editor-001', 
    name: 'Editor User',
    role: 'editor',
    permissions: ['read', 'write']
  }
};

// ============================================================================
// AUTHENTICATION METHODS
// ============================================================================

/**
 * Authenticate user with email and password
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<Object>} User object if successful
 */
async function login(email, password) {
  try {
    // Try Firebase Auth first if available
    if (firebaseAuth && process.env.REACT_APP_USE_FIREBASE === 'true') {
      const userCredential = await firebaseAuth.signInWithEmailAndPassword(email, password);
      const firebaseUser = userCredential.user;
      
      const user = {
        id: firebaseUser.uid,
        email: firebaseUser.email,
        name: firebaseUser.displayName || 'User',
        role: 'admin', // In production, get from Firestore user profile
        permissions: ['read', 'write', 'publish', 'settings'],
        provider: 'firebase',
        lastLogin: new Date().toISOString()
      };
      
      // Store session
      localStorage.setItem(AUTH_KEY, JSON.stringify({
        user,
        timestamp: Date.now(),
        expiresAt: Date.now() + SESSION_TIMEOUT
      }));
      
      return user;
    }
    
    // Fallback to simple auth
    const credential = DEMO_CREDENTIALS[email];
    if (credential && credential.password === password) {
      const user = {
        id: credential.id,
        email,
        name: credential.name,
        role: credential.role,
        permissions: credential.permissions,
        provider: 'simple',
        lastLogin: new Date().toISOString()
      };
      
      // Store session
      localStorage.setItem(AUTH_KEY, JSON.stringify({
        user,
        timestamp: Date.now(),
        expiresAt: Date.now() + SESSION_TIMEOUT
      }));
      
      return user;
    }
    
    throw new Error('Invalid email or password');
    
  } catch (error) {
    console.error('Login error:', error);
    throw new Error(error.message || 'Login failed');
  }
}

/**
 * Log out current user
 * @returns {Promise<void>}
 */
async function logout() {
  try {
    // Sign out from Firebase if using it
    if (firebaseAuth && process.env.REACT_APP_USE_FIREBASE === 'true') {
      await firebaseAuth.signOut();
    }
    
    // Clear local session
    localStorage.removeItem(AUTH_KEY);
    
  } catch (error) {
    console.error('Logout error:', error);
    // Still clear local session even if Firebase logout fails
    localStorage.removeItem(AUTH_KEY);
  }
}

/**
 * Get current authenticated user
 * @returns {Promise<Object|null>} User object or null if not authenticated
 */
async function getCurrentUser() {
  try {
    // Check local session first
    const stored = localStorage.getItem(AUTH_KEY);
    if (!stored) return null;
    
    const session = JSON.parse(stored);
    
    // Check if session expired
    if (Date.now() > session.expiresAt) {
      localStorage.removeItem(AUTH_KEY);
      return null;
    }
    
    // If using Firebase, verify the Firebase session too
    if (firebaseAuth && session.user.provider === 'firebase') {
      return new Promise((resolve) => {
        firebaseAuth.onAuthStateChanged((firebaseUser) => {
          if (firebaseUser) {
            // Update session timestamp
            session.timestamp = Date.now();
            localStorage.setItem(AUTH_KEY, JSON.stringify(session));
            resolve(session.user);
          } else {
            localStorage.removeItem(AUTH_KEY);
            resolve(null);
          }
        });
      });
    }
    
    // For simple auth, just return the stored user
    return session.user;
    
  } catch (error) {
    console.error('Error getting current user:', error);
    localStorage.removeItem(AUTH_KEY);
    return null;
  }
}

/**
 * Check if user has specific permission
 * @param {string} permission - Permission to check
 * @param {Object} user - User object (optional, will get current user if not provided)
 * @returns {Promise<boolean>} True if user has permission
 */
async function hasPermission(permission, user = null) {
  try {
    const currentUser = user || await getCurrentUser();
    if (!currentUser) return false;
    
    return currentUser.permissions && currentUser.permissions.includes(permission);
  } catch (error) {
    console.error('Error checking permission:', error);
    return false;
  }
}

/**
 * Check if user has specific role
 * @param {string} role - Role to check
 * @param {Object} user - User object (optional)
 * @returns {Promise<boolean>} True if user has role
 */
async function hasRole(role, user = null) {
  try {
    const currentUser = user || await getCurrentUser();
    if (!currentUser) return false;
    
    return currentUser.role === role;
  } catch (error) {
    console.error('Error checking role:', error);
    return false;
  }
}

/**
 * Refresh session timestamp
 * @returns {Promise<boolean>} True if session refreshed
 */
async function refreshSession() {
  try {
    const stored = localStorage.getItem(AUTH_KEY);
    if (!stored) return false;
    
    const session = JSON.parse(stored);
    
    // Check if session expired
    if (Date.now() > session.expiresAt) {
      localStorage.removeItem(AUTH_KEY);
      return false;
    }
    
    // Update timestamps
    session.timestamp = Date.now();
    session.expiresAt = Date.now() + SESSION_TIMEOUT;
    
    localStorage.setItem(AUTH_KEY, JSON.stringify(session));
    return true;
    
  } catch (error) {
    console.error('Error refreshing session:', error);
    return false;
  }
}

// ============================================================================
// PASSWORD MANAGEMENT (for demo purposes)
// ============================================================================

/**
 * Change password (simple auth only)
 * @param {string} currentPassword - Current password
 * @param {string} newPassword - New password
 * @returns {Promise<boolean>} True if password changed
 */
async function changePassword(currentPassword, newPassword) {
  try {
    const user = await getCurrentUser();
    if (!user) throw new Error('Not authenticated');
    
    if (user.provider === 'firebase') {
      throw new Error('Password changes must be done through Firebase Console');
    }
    
    // For simple auth, this would typically update a database
    // For demo purposes, we'll just validate current password
    const credential = DEMO_CREDENTIALS[user.email];
    if (!credential || credential.password !== currentPassword) {
      throw new Error('Current password is incorrect');
    }
    
    console.log('Password change requested for:', user.email);
    console.log('In production, this would update the database');
    
    return true;
    
  } catch (error) {
    console.error('Error changing password:', error);
    throw error;
  }
}

// ============================================================================
// SESSION MONITORING
// ============================================================================

/**
 * Get session info for debugging
 * @returns {Object} Session information
 */
function getSessionInfo() {
  const stored = localStorage.getItem(AUTH_KEY);
  if (!stored) {
    return { authenticated: false };
  }
  
  const session = JSON.parse(stored);
  const now = Date.now();
  const timeRemaining = session.expiresAt - now;
  
  return {
    authenticated: true,
    user: session.user,
    loginTime: new Date(session.timestamp).toLocaleString(),
    expiresAt: new Date(session.expiresAt).toLocaleString(),
    timeRemaining: Math.max(0, Math.floor(timeRemaining / 1000 / 60)), // minutes
    expired: timeRemaining <= 0
  };
}

/**
 * Set up automatic session refresh
 * Call this in your main App component
 */
function setupSessionMonitoring() {
  // Refresh session every 30 minutes
  const refreshInterval = setInterval(async () => {
    const refreshed = await refreshSession();
    if (!refreshed) {
      clearInterval(refreshInterval);
      // Could trigger a logout or session expired notification here
    }
  }, 30 * 60 * 1000);
  
  // Clean up on page unload
  window.addEventListener('beforeunload', () => {
    clearInterval(refreshInterval);
  });
  
  return refreshInterval;
}

// ============================================================================
// EXPORTS
// ============================================================================

export const auth = {
  login,
  logout,
  getCurrentUser,
  hasPermission,
  hasRole,
  refreshSession,
  changePassword,
  getSessionInfo,
  setupSessionMonitoring
};

// Default export for backward compatibility
export default auth;

// Demo credentials for testing (remove in production)
export const DEMO_USERS = Object.keys(DEMO_CREDENTIALS).map(email => ({
  email,
  role: DEMO_CREDENTIALS[email].role,
  name: DEMO_CREDENTIALS[email].name,
  password: '(hidden)' // Don't expose passwords in production
}));