// src/hooks/useTemplateSettings.js
// NEW settings system for templates - separate from existing useSettings

import { useState, useEffect, useContext, createContext } from 'react';
import { getSettings, saveSettings as apiSaveSettings } from '../services/api';

const TemplateSettingsContext = createContext();

// Default settings structure for templates
const defaultTemplateSettings = {
  general: {
    siteName: 'The Coworking Space',
    siteDescription: 'Your creative workspace in the heart of the city',
    contactEmail: 'contact@coworkingspace.com'
  },
  pages: {
    home: { enabled: true, template: 'modern', order: 0, heroSize: 'medium' },
    about: { enabled: true, template: 'story', order: 1, heroSize: 'medium' },
    team: { enabled: true, template: 'grid', order: 2, heroSize: 'medium' },
    news: { enabled: true, template: 'blog', order: 3, heroSize: 'medium' },
    events: { enabled: true, template: 'calendar', order: 4, heroSize: 'medium' },
    services: { enabled: false, template: 'default', order: 5, heroSize: 'medium' },
    pricing: { enabled: false, template: 'default', order: 6, heroSize: 'medium' },
    contact: { enabled: false, template: 'default', order: 7, heroSize: 'medium' },
    register: { enabled: true, template: 'default', order: 8, heroSize: 'medium' }
  },
  branding: {
    primaryColor: '#2563eb',
    secondaryColor: '#9333ea',
    logoUrl: '',
    fontFamily: 'Inter'
  },
  features: {
    showSocialMedia: true,
    enableComments: false,
    showTestimonials: true,
    enableBooking: false,
    showPricing: false,
    enableNewsletter: true
  }
};

export function TemplateSettingsProvider({ children }) {
  const [settings, setSettings] = useState(defaultTemplateSettings);
  const [loading, setLoading] = useState(true);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Load settings on mount
  useEffect(() => {
    loadTemplateSettings();
  }, []);

  const loadTemplateSettings = async () => {
    try {
      setLoading(true);
      
      // Try to load from localStorage first (for now)
      const stored = localStorage.getItem('template_settings');
      if (stored) {
        const savedSettings = JSON.parse(stored);
        const mergedSettings = mergeWithDefaults(savedSettings, defaultTemplateSettings);
        setSettings(mergedSettings);
      } else {
        setSettings(defaultTemplateSettings);
      }
    } catch (error) {
      console.error('Failed to load template settings:', error);
      setSettings(defaultTemplateSettings);
    } finally {
      setLoading(false);
    }
  };

  // Deep merge function to combine saved settings with defaults
  const mergeWithDefaults = (saved, defaults) => {
    const result = { ...defaults };
    
    for (const key in saved) {
      if (saved[key] && typeof saved[key] === 'object' && !Array.isArray(saved[key])) {
        result[key] = { ...defaults[key], ...saved[key] };
      } else {
        result[key] = saved[key];
      }
    }
    
    return result;
  };

  // Update a specific setting using dot notation (e.g., 'general.siteName')
  const updateSetting = (path, value) => {
    setSettings(prevSettings => {
      const newSettings = { ...prevSettings };
      const keys = path.split('.');
      let current = newSettings;
      
      // Navigate to the parent of the target property
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) {
          current[keys[i]] = {};
        }
        current = current[keys[i]];
      }
      
      // Set the final value
      current[keys[keys.length - 1]] = value;
      
      setHasUnsavedChanges(true);
      return newSettings;
    });
  };

  // Save settings to storage
  const saveSettings = async () => {
    try {
      // For now, save to localStorage
      localStorage.setItem('template_settings', JSON.stringify(settings));
      setHasUnsavedChanges(false);
      return { success: true };
    } catch (error) {
      console.error('Failed to save template settings:', error);
      throw error;
    }
  };

  // Get enabled pages in navigation order
  const getEnabledPages = () => {
    const pages = settings.pages || {};
    return Object.entries(pages)
      .filter(([_, pageSettings]) => pageSettings.enabled)
      .sort(([_, a], [__, b]) => (a.order || 0) - (b.order || 0))
      .map(([pageId, pageSettings]) => ({ id: pageId, ...pageSettings }));
  };

  // Check if a specific page is enabled
  const isPageEnabled = (pageId) => {
    return settings.pages?.[pageId]?.enabled || false;
  };

  // Get template for a specific page
  const getPageTemplate = (pageId) => {
    return settings.pages?.[pageId]?.template || 'modern';
  };

  const value = {
    settings,
    loading,
    hasUnsavedChanges,
    updateSetting,
    saveSettings,
    getEnabledPages,
    isPageEnabled,
    getPageTemplate
  };

  return (
    <TemplateSettingsContext.Provider value={value}>
      {children}
    </TemplateSettingsContext.Provider>
  );
}

export function useTemplateSettings() {
  const context = useContext(TemplateSettingsContext);
  if (!context) {
    throw new Error('useTemplateSettings must be used within TemplateSettingsProvider');
  }
  return context;
}

// Hook for components that need to know current page template
export function usePageTemplate(pageId) {
  const { getPageTemplate, isPageEnabled } = useTemplateSettings();
  
  return {
    template: getPageTemplate(pageId),
    isEnabled: isPageEnabled(pageId)
  };
}