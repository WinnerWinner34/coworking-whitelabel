import { storage } from '../../utils/migration/storageUtils';
import { templatePresets } from './defaultPresets';

export class PresetManager {
  
  async applyPreset(presetId) {
    const preset = templatePresets[presetId];
    if (!preset) {
      throw new Error(`Preset "${presetId}" not found`);
    }
    
    try {
      console.log(`🎨 Applying preset: ${preset.name}`);
      
      // Get current settings (using the same structure as useSettings)
      const currentSettings = await storage.getData('settings') || {};
      
      // Update template selections
      const updatedSettings = {
        ...currentSettings,
        pages: {
          ...currentSettings.pages,
          ...Object.entries(preset.templates).reduce((acc, [pageId, templateId]) => {
            acc[pageId] = {
              ...currentSettings.pages?.[pageId],
              template: templateId
            };
            return acc;
          }, {})
        },
        lastAppliedPreset: presetId,
        lastPresetAppliedAt: new Date().toISOString()
      };
      
      // Save updated settings
      await storage.setData('settings', updatedSettings);
      
      console.log(`✅ Successfully applied preset: ${preset.name}`);
      return true;
      
    } catch (error) {
      console.error(`❌ Failed to apply preset ${presetId}:`, error);
      throw error;
    }
  }
  
  async getCurrentPreset() {
    try {
      const settings = await storage.getData('settings');
      return settings?.lastAppliedPreset || null;
    } catch (error) {
      console.error('Error getting current preset:', error);
      return null;
    }
  }
  
  getAvailablePresets() {
    return Object.values(templatePresets);
  }
  
  getPresetById(presetId) {
    return templatePresets[presetId] || null;
  }
}

export const presetManager = new PresetManager();