import { useState, useEffect, useContext, createContext } from 'react';
import { getSettings, saveSettings as apiSaveSettings } from '../services/api';

const SettingsContext = createContext();

// Default settings structure
const defaultSettings = {
  general: {
    siteName: 'The Coworking Space',
    siteDescription: 'Your creative workspace in the heart of the city',
    contactEmail: 'contact@coworkingspace.com'
  },
  pages: {
    home: { enabled: true, template: 'modern', order: 0 },
    about: { enabled: true, template: 'story', order: 1 },
    team: { enabled: true, template: 'grid', order: 2 },
    news: { enabled: true, template: 'blog', order: 3 },
    events: { enabled: true, template: 'calendar', order: 4 },
    services: { enabled: false, template: 'default', order: 5 },
    pricing: { enabled: false, template: 'default', order: 6 },
    contact: { enabled: false, template: 'default', order: 7 },
    register: { enabled: true, template: 'default', order: 8 }
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
  },
  advanced: {
    customCSS: '',
    googleAnalyticsId: ''
  }
};

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Load settings on mount
  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setLoading(true);
      const savedSettings = await getSettings();
      
      // Merge with defaults to ensure all properties exist
      const mergedSettings = mergeWithDefaults(savedSettings, defaultSettings);
      setSettings(mergedSettings);
    } catch (error) {
      console.error('Failed to load settings:', error);
      setSettings(defaultSettings);
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
      await apiSaveSettings(settings);
      setHasUnsavedChanges(false);
      return { success: true };
    } catch (error) {
      console.error('Failed to save settings:', error);
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
    return settings.pages?.[pageId]?.template || 'default';
  };

  // Reset to defaults
  const resetToDefaults = () => {
    setSettings(defaultSettings);
    setHasUnsavedChanges(true);
  };

  const value = {
    settings,
    loading,
    hasUnsavedChanges,
    updateSetting,
    saveSettings,
    loadSettings,
    resetToDefaults,
    getEnabledPages,
    isPageEnabled,
    getPageTemplate
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}

// Hook for components that need to know current page template
export function usePageTemplate(pageId) {
  const { getPageTemplate, isPageEnabled } = useSettings();
  
  return {
    template: getPageTemplate(pageId),
    isEnabled: isPageEnabled(pageId)
  };
}