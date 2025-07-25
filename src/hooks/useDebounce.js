
// ============================================================================
// src/hooks/useDebounce.js - Debounce Hook for Auto-save
// ============================================================================

import { useState, useEffect } from 'react';

export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  
  return debouncedValue;
}

// Auto-save hook that combines debounce with save function
export function useAutoSave(data, saveFunction, delay = 2000) {
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const debouncedData = useDebounce(data, delay);
  
  useEffect(() => {
    if (debouncedData && lastSaved !== null) {
      const save = async () => {
        try {
          setIsSaving(true);
          await saveFunction(debouncedData);
          setLastSaved(new Date());
        } catch (error) {
          console.error('Auto-save failed:', error);
        } finally {
          setIsSaving(false);
        }
      };
      
      save();
    } else if (lastSaved === null) {
      // Set initial save time without saving
      setLastSaved(new Date());
    }
  }, [debouncedData, saveFunction, lastSaved]);
  
  return { isSaving, lastSaved };
}
