
// ============================================================================
// src/hooks/useImageUpload.js - Image Upload Hook
// ============================================================================

import { useState } from 'react';

export function useImageUpload() {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const uploadImage = async (file, onProgress = null) => {
    try {
      setUploading(true);
      setProgress(0);
      
      // This would integrate with your ImageUpload component
      // For now, create a simple file reader for demo
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        
        reader.onload = (e) => {
          setProgress(100);
          resolve(e.target.result);
        };
        
        reader.onerror = () => {
          reject(new Error('Failed to read file'));
        };
        
        // Simulate progress
        let currentProgress = 0;
        const interval = setInterval(() => {
          currentProgress += 10;
          setProgress(currentProgress);
          if (onProgress) onProgress(currentProgress);
          
          if (currentProgress >= 90) {
            clearInterval(interval);
          }
        }, 100);
        
        reader.readAsDataURL(file);
      });
      
    } catch (error) {
      console.error('Upload failed:', error);
      throw error;
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };
  
  return {
    uploadImage,
    uploading,
    progress
  };
}