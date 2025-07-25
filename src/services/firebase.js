// src/services/firebase.js
// Firebase configuration and initialization
// This file handles the connection between your app and Firebase services

import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getStorage, connectStorageEmulator } from 'firebase/storage';
import { getAuth, connectAuthEmulator } from 'firebase/auth';

// ============================================================================
// FIREBASE CONFIGURATION
// ============================================================================

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

// Check if Firebase is properly configured
const isFirebaseConfigured = () => {
  return !!(
    firebaseConfig.apiKey &&
    firebaseConfig.authDomain &&
    firebaseConfig.projectId &&
    firebaseConfig.storageBucket &&
    firebaseConfig.messagingSenderId &&
    firebaseConfig.appId
  );
};

// ============================================================================
// FIREBASE INITIALIZATION
// ============================================================================

let app = null;
let db = null;
let storage = null;
let auth = null;

if (isFirebaseConfigured()) {
  try {
    // Initialize Firebase
    app = initializeApp(firebaseConfig);
    
    // Initialize Firestore
    db = getFirestore(app);
    
    // Initialize Storage
    storage = getStorage(app);
    
    // Initialize Auth
    auth = getAuth(app);
    
    // Connect to emulators in development (optional)
    if (process.env.NODE_ENV === 'development' && process.env.REACT_APP_USE_EMULATORS === 'true') {
      try {
        connectFirestoreEmulator(db, 'localhost', 8080);
        connectStorageEmulator(storage, 'localhost', 9199);
        connectAuthEmulator(auth, 'http://localhost:9099');
        console.log('🔧 Connected to Firebase emulators');
      } catch (error) {
        console.log('Emulators already connected or not available');
      }
    }
    
    console.log('🔥 Firebase initialized successfully');
    console.log('- Project ID:', firebaseConfig.projectId);
    console.log('- Region:', firebaseConfig.storageBucket?.split('.')[0]);
    
  } catch (error) {
    console.error('❌ Firebase initialization failed:', error);
  }
} else {
  console.log('⚠️ Firebase not configured - using localStorage only');
  console.log('Missing environment variables:');
  
  const requiredVars = [
    'REACT_APP_FIREBASE_API_KEY',
    'REACT_APP_FIREBASE_AUTH_DOMAIN', 
    'REACT_APP_FIREBASE_PROJECT_ID',
    'REACT_APP_FIREBASE_STORAGE_BUCKET',
    'REACT_APP_FIREBASE_MESSAGING_SENDER_ID',
    'REACT_APP_FIREBASE_APP_ID'
  ];
  
  requiredVars.forEach(varName => {
    if (!process.env[varName]) {
      console.log(`- ${varName}`);
    }
  });
}

// ============================================================================
// FIREBASE UTILITIES
// ============================================================================

/**
 * Upload image to Firebase Storage
 * @param {File} file - The image file to upload
 * @param {string} path - Storage path (e.g., 'images/team/photo.jpg')
 * @param {Function} onProgress - Progress callback
 * @returns {Promise<string>} Download URL
 */
export async function uploadImageToFirebase(file, path, onProgress = null) {
  if (!storage) {
    throw new Error('Firebase Storage not configured');
  }
  
  const { ref, uploadBytesResumable, getDownloadURL } = await import('firebase/storage');
  
  return new Promise((resolve, reject) => {
    const storageRef = ref(storage, path);
    const uploadTask = uploadBytesResumable(storageRef, file);
    
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        if (onProgress) {
          onProgress(progress);
        }
      },
      (error) => {
        console.error('Upload failed:', error);
        reject(error);
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
        } catch (error) {
          reject(error);
        }
      }
    );
  });
}

/**
 * Delete image from Firebase Storage
 * @param {string} url - The download URL of the image to delete
 * @returns {Promise<void>}
 */
export async function deleteImageFromFirebase(url) {
  if (!storage) {
    throw new Error('Firebase Storage not configured');
  }
  
  const { ref, deleteObject } = await import('firebase/storage');
  
  try {
    // Extract path from URL
    const baseUrl = `https://storage.googleapis.com/${firebaseConfig.storageBucket}/`;
    if (url.startsWith(baseUrl)) {
      const path = decodeURIComponent(url.replace(baseUrl, '').split('?')[0]);
      const imageRef = ref(storage, path);
      await deleteObject(imageRef);
    }
  } catch (error) {
    console.error('Error deleting image:', error);
    // Don't throw - image might already be deleted
  }
}

/**
 * Get Firestore document with error handling
 * @param {string} collection - Collection name
 * @param {string} docId - Document ID
 * @returns {Promise<Object|null>} Document data or null
 */
export async function getFirestoreDoc(collection, docId) {
  if (!db) {
    throw new Error('Firestore not configured');
  }
  
  const { doc, getDoc } = await import('firebase/firestore');
  
  try {
    const docRef = doc(db, collection, docId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return null;
    }
  } catch (error) {
    console.error(`Error getting document ${collection}/${docId}:`, error);
    throw error;
  }
}

/**
 * Set Firestore document with error handling
 * @param {string} collection - Collection name
 * @param {string} docId - Document ID
 * @param {Object} data - Document data
 * @returns {Promise<void>}
 */
export async function setFirestoreDoc(collection, docId, data) {
  if (!db) {
    throw new Error('Firestore not configured');
  }
  
  const { doc, setDoc, serverTimestamp } = await import('firebase/firestore');
  
  try {
    const docRef = doc(db, collection, docId);
    await setDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error(`Error setting document ${collection}/${docId}:`, error);
    throw error;
  }
}

/**
 * Delete Firestore document with error handling
 * @param {string} collection - Collection name
 * @param {string} docId - Document ID
 * @returns {Promise<void>}
 */
export async function deleteFirestoreDoc(collection, docId) {
  if (!db) {
    throw new Error('Firestore not configured');
  }
  
  const { doc, deleteDoc } = await import('firebase/firestore');
  
  try {
    const docRef = doc(db, collection, docId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error(`Error deleting document ${collection}/${docId}:`, error);
    throw error;
  }
}

/**
 * Get multiple documents from a collection
 * @param {string} collection - Collection name
 * @returns {Promise<Array>} Array of documents
 */
export async function getFirestoreCollection(collection) {
  if (!db) {
    throw new Error('Firestore not configured');
  }
  
  const { collection: firestoreCollection, getDocs } = await import('firebase/firestore');
  
  try {
    const querySnapshot = await getDocs(firestoreCollection(db, collection));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error(`Error getting collection ${collection}:`, error);
    throw error;
  }
}

// ============================================================================
// FIREBASE RULES TEMPLATES
// ============================================================================

/**
 * Generate Firestore security rules for this project
 * Copy this to your firestore.rules file
 */
export const FIRESTORE_RULES = `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Pages collection - readable by all, writable by authenticated users
    match /pages/{pageId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Drafts collection - readable and writable by authenticated users only
    match /drafts/{pageId} {
      allow read, write: if request.auth != null;
    }
    
    // Settings collection - readable by all, writable by authenticated users
    match /settings/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // User profiles (future expansion)
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}`;

/**
 * Generate Storage security rules for this project
 * Copy this to your storage.rules file
 */
export const STORAGE_RULES = `rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Images folder - readable by all, writable by authenticated users
    match /images/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null 
                  && request.resource.size < 10 * 1024 * 1024 // 10MB limit
                  && request.resource.contentType.matches('image/.*');
    }
    
    // Uploads folder - same rules as images
    match /uploads/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null 
                  && request.resource.size < 10 * 1024 * 1024
                  && request.resource.contentType.matches('image/.*');
    }
  }
}`;

// ============================================================================
// DEBUGGING AND MONITORING
// ============================================================================

/**
 * Get Firebase connection status
 * @returns {Object} Status information
 */
export function getFirebaseStatus() {
  return {
    configured: isFirebaseConfigured(),
    connected: !!(app && db && storage && auth),
    projectId: firebaseConfig.projectId,
    environment: process.env.NODE_ENV,
    usingEmulators: process.env.REACT_APP_USE_EMULATORS === 'true',
    services: {
      app: !!app,
      firestore: !!db,
      storage: !!storage,
      auth: !!auth
    }
  };
}

/**
 * Test Firebase connection
 * @returns {Promise<Object>} Test results
 */
export async function testFirebaseConnection() {
  const results = {
    firestore: false,
    storage: false,
    auth: false,
    errors: []
  };
  
  // Test Firestore
  if (db) {
    try {
      const { doc, getDoc } = await import('firebase/firestore');
      const testDoc = doc(db, 'test', 'connection');
      await getDoc(testDoc);
      results.firestore = true;
    } catch (error) {
      results.errors.push(`Firestore: ${error.message}`);
    }
  }
  
  // Test Storage
  if (storage) {
    try {
      const { ref, listAll } = await import('firebase/storage');
      const testRef = ref(storage, 'test');
      await listAll(testRef);
      results.storage = true;
    } catch (error) {
      results.errors.push(`Storage: ${error.message}`);
    }
  }
  
  // Test Auth
  if (auth) {
    try {
      // Just check if auth object is working
      const user = auth.currentUser;
      results.auth = true;
    } catch (error) {
      results.errors.push(`Auth: ${error.message}`);
    }
  }
  
  return results;
}

// ============================================================================
// EXPORTS
// ============================================================================

export { 
  app, 
  db, 
  storage, 
  auth,
  isFirebaseConfigured,
  firebaseConfig 
};

export default {
  app,
  db, 
  storage,
  auth,
  uploadImageToFirebase,
  deleteImageFromFirebase,
  getFirestoreDoc,
  setFirestoreDoc,
  deleteFirestoreDoc,
  getFirestoreCollection,
  getFirebaseStatus,
  testFirebaseConnection,
  isConfigured: isFirebaseConfigured
};