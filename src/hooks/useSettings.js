// ============================================================================
// src/hooks/useSettings.js - Site Settings Management Hook
// ============================================================================

import { useState, useEffect, useCallback } from 'react';
import { getSettings, saveSettings } from '../services/api';
import { applyThemeColors } from '../utils/applyTheme';

export function useSettings() {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [originalSettings, setOriginalSettings] = useState(null);
  
  const loadSettings = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const settingsData = await getSettings();
      setSettings(settingsData);
      setOriginalSettings(JSON.parse(JSON.stringify(settingsData))); // Deep copy
      
      // Apply theme colors to CSS
      if (settingsData.branding) {
        applyThemeColors(settingsData.branding);
      }
      
    } catch (err) {
      setError(err.message);
      console.error('Error loading settings:', err);
    } finally {
      setLoading(false);
    }
  }, []);
  
  useEffect(() => {
    loadSettings();
  }, [loadSettings]);
  
  const updateSetting = useCallback((path, value) => {
    setSettings(prev => {
      const updated = { ...prev };
      const keys = path.split('.');
      let current = updated;
      
      // Navigate to the parent of the target key
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) {
          current[keys[i]] = {};
        }
        current = current[keys[i]];
      }
      
      // Set the value
      current[keys[keys.length - 1]] = value;
      
      // Check if there are changes
      setHasChanges(JSON.stringify(updated) !== JSON.stringify(originalSettings));
      
      return updated;
    });
  }, [originalSettings]);
  
  const saveCurrentSettings = useCallback(async () => {
    try {
      await saveSettings(settings);
      setOriginalSettings(JSON.parse(JSON.stringify(settings)));
      setHasChanges(false);
      
      // Apply theme changes
      if (settings.branding) {
        applyThemeColors(settings.branding);
      }
      
      return { success: true };
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [settings]);
  
  const resetSettings = useCallback(() => {
    setSettings(JSON.parse(JSON.stringify(originalSettings)));
    setHasChanges(false);
  }, [originalSettings]);
  
  const getSetting = useCallback((path, defaultValue = null) => {
    if (!settings) return defaultValue;
    
    const keys = path.split('.');
    let current = settings;
    
    for (const key of keys) {
      if (current[key] === undefined) {
        return defaultValue;
      }
      current = current[key];
    }
    
    return current;
  }, [settings]);
  
  return {
    settings,
    loading,
    error,
    hasChanges,
    updateSetting,
    saveSettings: saveCurrentSettings,
    resetSettings,
    refetch: loadSettings,
    getSetting,
    
    // Shortcut getters for common settings
    branding: settings?.branding || {},
    theme: settings?.theme || {},
    layout: settings?.layout || {},
    features: settings?.features || {},
    images: settings?.images || {}
  };
}