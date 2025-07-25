// src/services/api.js
// Core API service that handles content saving/loading with dual storage support
// Supports both localStorage (development) and Firebase (production)

import { defaultData, defaultSettings } from '../data/defaultData';

// Storage configuration
const STORAGE_KEY = 'coworking_data';
const DRAFT_KEY = 'coworking_drafts';
const SETTINGS_KEY = 'coworking_settings';

// Firebase imports (will be undefined if not configured)
let db, storage;
try {
  const firebase = require('./firebase');
  db = firebase.db;
  storage = firebase.storage;
} catch (error) {
  console.log('Firebase not configured, using localStorage only');
}

// Determine if we should use Firebase
const useFirebase = () => {
  return process.env.REACT_APP_USE_FIREBASE === 'true' && db && storage;
};

// Initialize with default data if nothing exists
function initializeData() {
  if (!localStorage.getItem(STORAGE_KEY)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData));
  }
  if (!localStorage.getItem(SETTINGS_KEY)) {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(defaultSettings));
  }
}

// Initialize on module load
initializeData();

// Storage size monitoring
function checkStorageSize() {
  let totalSize = 0;
  for (let key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
      totalSize += localStorage[key].length + key.length;
    }
  }
  
  const sizeInMB = (totalSize / 1024 / 1024).toFixed(2);
  const percentUsed = (totalSize / (5 * 1024 * 1024) * 100).toFixed(0);
  
  if (percentUsed > 80) {
    return { 
      warning: true, 
      message: `Storage ${percentUsed}% full (${sizeInMB}MB used). Consider removing old images.` 
    };
  }
  
  return { 
    warning: false, 
    sizeInMB, 
    percentUsed 
  };
}

// ============================================================================
// FIREBASE OPERATIONS
// ============================================================================

async function saveToFirebase(pageId, content, isDraft = false) {
  if (!useFirebase()) throw new Error('Firebase not configured');
  
  const collection = isDraft ? 'drafts' : 'pages';
  const docRef = db.collection(collection).doc(pageId);
  
  await docRef.set({
    ...content,
    lastModified: new Date(),
    version: Date.now()
  });
  
  return { success: true };
}

async function loadFromFirebase(pageId, isDraft = false) {
  if (!useFirebase()) throw new Error('Firebase not configured');
  
  const collection = isDraft ? 'drafts' : 'pages';
  const docRef = db.collection(collection).doc(pageId);
  const doc = await docRef.get();
  
  if (doc.exists) {
    const data = doc.data();
    delete data.lastModified;
    delete data.version;
    return data;
  }
  
  return null;
}

async function publishFromFirebase(pageId) {
  if (!useFirebase()) throw new Error('Firebase not configured');
  
  // Get draft content
  const draftDoc = await db.collection('drafts').doc(pageId).get();
  if (!draftDoc.exists) {
    throw new Error('No draft content to publish');
  }
  
  const draftContent = draftDoc.data();
  delete draftContent.lastModified;
  delete draftContent.version;
  
  // Save to published collection
  await db.collection('pages').doc(pageId).set({
    ...draftContent,
    publishedAt: new Date(),
    version: Date.now()
  });
  
  // Delete draft
  await db.collection('drafts').doc(pageId).delete();
  
  return { success: true };
}

// ============================================================================
// LOCALSTORAGE OPERATIONS
// ============================================================================

function saveToLocalStorage(pageId, content, isDraft = false) {
  const storageCheck = checkStorageSize();
  if (storageCheck.warning) {
    throw new Error(storageCheck.message);
  }
  
  if (isDraft) {
    const drafts = JSON.parse(localStorage.getItem(DRAFT_KEY) || '{}');
    drafts[pageId] = content;
    localStorage.setItem(DRAFT_KEY, JSON.stringify(drafts));
  } else {
    const publishedData = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    publishedData[pageId] = content;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(publishedData));
  }
  
  return { success: true };
}

function loadFromLocalStorage(pageId, isDraft = false) {
  if (isDraft) {
    const drafts = JSON.parse(localStorage.getItem(DRAFT_KEY) || '{}');
    return drafts[pageId] || null;
  } else {
    const publishedData = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    return publishedData[pageId] || defaultData[pageId] || {};
  }
}

function publishFromLocalStorage(pageId) {
  const drafts = JSON.parse(localStorage.getItem(DRAFT_KEY) || '{}');
  const draftContent = drafts[pageId];
  
  if (!draftContent) {
    throw new Error('No draft content to publish');
  }
  
  // Move draft to published
  const publishedData = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  publishedData[pageId] = draftContent;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(publishedData));
  
  // Remove draft
  delete drafts[pageId];  
  localStorage.setItem(DRAFT_KEY, JSON.stringify(drafts));
  
  return { success: true };
}

// ============================================================================
// PUBLIC API METHODS
// ============================================================================

/**
 * Get page content - checks for draft version first if isDraft=true
 * @param {string} pageId - The page identifier (home, about, team, etc.)
 * @param {boolean} isDraft - Whether to look for draft content first
 * @returns {Promise<Object>} Page content object
 */
export async function getPageContent(pageId, isDraft = false) {
  try {
    let content = null;
    
    // Try Firebase first if available
    if (useFirebase()) {
      if (isDraft) {
        // Check for draft first, fallback to published
        content = await loadFromFirebase(pageId, true);
        if (!content) {
          content = await loadFromFirebase(pageId, false);
        }
      } else {
        content = await loadFromFirebase(pageId, false);
      }
    }
    
    // Fallback to localStorage
    if (!content) {
      if (isDraft) {
        content = loadFromLocalStorage(pageId, true);
        if (!content) {
          content = loadFromLocalStorage(pageId, false);
        }
      } else {
        content = loadFromLocalStorage(pageId, false);
      }
    }
    
    // Final fallback to default data
    return content || defaultData[pageId] || {};
    
  } catch (error) {
    console.error('Error loading page content:', error);
    return defaultData[pageId] || {};
  }
}

/**
 * Save page content as draft
 * @param {string} pageId - The page identifier
 * @param {Object} content - The content to save
 * @returns {Promise<Object>} Success response
 */
export async function savePageContent(pageId, content) {
  try {
    if (useFirebase()) {
      return await saveToFirebase(pageId, content, true);
    } else {
      return saveToLocalStorage(pageId, content, true);
    }
  } catch (error) {
    console.error('Error saving page content:', error);
    throw error;
  }
}

/**
 * Publish page - move draft to published version
 * @param {string} pageId - The page identifier
 * @returns {Promise<Object>} Success response
 */
export async function publishPage(pageId) {
  try {
    if (useFirebase()) {
      return await publishFromFirebase(pageId);
    } else {
      return publishFromLocalStorage(pageId);
    }
  } catch (error) {
    console.error('Error publishing page:', error);
    throw error;
  }
}

/**
 * Get all drafts that exist
 * @returns {Promise<Array>} List of page IDs that have drafts
 */
export async function getDraftList() {
  try {
    if (useFirebase()) {
      const snapshot = await db.collection('drafts').get();
      return snapshot.docs.map(doc => doc.id);
    } else {
      const drafts = JSON.parse(localStorage.getItem(DRAFT_KEY) || '{}');
      return Object.keys(drafts);
    }
  } catch (error) {
    console.error('Error getting draft list:', error);
    return [];
  }
}

/**
 * Delete a draft
 * @param {string} pageId - The page identifier
 * @returns {Promise<Object>} Success response
 */
export async function deleteDraft(pageId) {
  try {
    if (useFirebase()) {
      await db.collection('drafts').doc(pageId).delete();
    } else {
      const drafts = JSON.parse(localStorage.getItem(DRAFT_KEY) || '{}');
      delete drafts[pageId];
      localStorage.setItem(DRAFT_KEY, JSON.stringify(drafts));
    }
    return { success: true };
  } catch (error) {
    console.error('Error deleting draft:', error);
    throw error;
  }
}

// ============================================================================
// SETTINGS MANAGEMENT
// ============================================================================

/**
 * Get site settings
 * @returns {Promise<Object>} Settings object
 */
export async function getSettings() {
  try {
    if (useFirebase()) {
      const doc = await db.collection('settings').doc('site').get();
      if (doc.exists) {
        return doc.data();
      }
    }
    
    // Fallback to localStorage
    const stored = localStorage.getItem(SETTINGS_KEY);
    return stored ? JSON.parse(stored) : defaultSettings;
    
  } catch (error) {
    console.error('Error loading settings:', error);
    return defaultSettings;
  }
}

/**
 * Save site settings
 * @param {Object} settings - Settings object
 * @returns {Promise<Object>} Success response
 */
export async function saveSettings(settings) {
  try {
    if (useFirebase()) {
      await db.collection('settings').doc('site').set({
        ...settings,
        lastModified: new Date()
      });
    } else {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    }
    
    return { success: true };
  } catch (error) {
    console.error('Error saving settings:', error);
    throw error;
  }
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Export all data for backup
 * @returns {Promise<Object>} Complete data export
 */
export async function exportData() {
  try {
    const pages = {};
    const pageIds = ['home', 'about', 'team', 'news', 'events'];
    
    for (const pageId of pageIds) {
      pages[pageId] = await getPageContent(pageId);
    }
    
    const settings = await getSettings();
    
    return {
      pages,
      settings,
      exportDate: new Date().toISOString(),
      version: '1.0'
    };
  } catch (error) {
    console.error('Error exporting data:', error);
    throw error;
  }
}

/**
 * Import data from backup
 * @param {Object} backupData - Data to import
 * @returns {Promise<Object>} Success response
 */
export async function importData(backupData) {
  try {
    // Import pages
    for (const [pageId, content] of Object.entries(backupData.pages)) {
      await savePageContent(pageId, content);
      await publishPage(pageId);
    }
    
    // Import settings
    if (backupData.settings) {
      await saveSettings(backupData.settings);
    }
    
    return { success: true, message: 'Data imported successfully' };
  } catch (error) {
    console.error('Error importing data:', error);
    throw error;
  }
}

/**
 * Debug function to inspect storage contents
 */
export function debugStorage() {
  console.group('🔍 Storage Debug Info');
  
  // Check storage type
  console.log('Storage type:', useFirebase() ? 'Firebase' : 'localStorage');
  
  // Local storage contents
  console.log('Published data:', JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'));
  console.log('Draft data:', JSON.parse(localStorage.getItem(DRAFT_KEY) || '{}'));
  console.log('Settings:', JSON.parse(localStorage.getItem(SETTINGS_KEY) || '{}'));
  
  // Storage size info
  const storageInfo = checkStorageSize();
  console.log('Storage info:', storageInfo);
  
  // Environment variables
  console.log('Environment:');
  console.log('- USE_FIREBASE:', process.env.REACT_APP_USE_FIREBASE);
  console.log('- PROJECT_ID:', process.env.REACT_APP_FIREBASE_PROJECT_ID);
  
  console.groupEnd();
}

/**
 * Clear all data (use with caution!)
 */
export async function clearAllData() {
  if (window.confirm('Are you sure? This will delete ALL content and settings!')) {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(DRAFT_KEY);
    localStorage.removeItem(SETTINGS_KEY);
    
    if (useFirebase()) {
      // Note: This would need admin permissions in production
      console.warn('Firebase data clearing not implemented for safety');
    }
    
    // Reinitialize with defaults
    initializeData();
    
    return { success: true, message: 'All data cleared and reset to defaults' };
  }
  
  return { success: false, message: 'Operation cancelled' };
}

// Export storage info for monitoring
export { checkStorageSize, useFirebase };