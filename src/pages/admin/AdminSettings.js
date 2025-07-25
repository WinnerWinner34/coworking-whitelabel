import React, { useState } from 'react';
import { useSettings } from '../../hooks/useSettings';
import ImageUpload from '../../components/shared/ImageUpload';
import toast from 'react-hot-toast';

export default function AdminSettings() {
  const { settings, loading, saving, updateSetting, saveSettings } = useSettings();
  const [activeTab, setActiveTab] = useState('branding');
  
  if (loading) return <div className="flex justify-center py-16">Loading...</div>;
  
  const tabs = [
    { id: 'branding', label: 'Branding', icon: '🎨' },
    { id: 'layout', label: 'Layout', icon: '📐' },
    { id: 'content', label: 'Content', icon: '📝' },
    { id: 'features', label: 'Features', icon: '⚡' },
    { id: 'export', label: 'Export/Import', icon: '💾' }
  ];
  
  return (
    <div className="py-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-8">Site Settings</h1>
        
        {/* Tabs */}
        <div className="flex space-x-4 mb-8 border-b">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 font-medium transition ${
                activeTab === tab.id
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
        
        <div className="bg-white p-8 rounded-lg shadow-md">
          {/* Branding Tab */}
          {activeTab === 'branding' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold mb-4">Branding Settings</h2>
              
              <div>
                <label className="block text-sm font-medium mb-2">Site Name</label>
                <input
                  type="text"
                  value={settings?.branding?.siteName || ''}
                  onChange={(e) => updateSetting('branding.siteName', e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Tagline</label>
                <input
                  type="text"
                  value={settings?.branding?.tagline || ''}
                  onChange={(e) => updateSetting('branding.tagline', e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Primary Color</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={settings?.branding?.primaryColor || '#2563eb'}
                      onChange={(e) => updateSetting('branding.primaryColor', e.target.value)}
                      className="h-10 w-20"
                    />
                    <input
                      type="text"
                      value={settings?.branding?.primaryColor || '#2563eb'}
                      onChange={(e) => updateSetting('branding.primaryColor', e.target.value)}
                      className="flex-1 p-2 border rounded"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Secondary Color</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={settings?.branding?.secondaryColor || '#9333ea'}
                      onChange={(e) => updateSetting('branding.secondaryColor', e.target.value)}
                      className="h-10 w-20"
                    />
                    <input
                      type="text"
                      value={settings?.branding?.secondaryColor || '#9333ea'}
                      onChange={(e) => updateSetting('branding.secondaryColor', e.target.value)}
                      className="flex-1 p-2 border rounded"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Accent Color</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={settings?.branding?.accentColor || '#10b981'}
                      onChange={(e) => updateSetting('branding.accentColor', e.target.value)}
                      className="h-10 w-20"
                    />
                    <input
                      type="text"
                      value={settings?.branding?.accentColor || '#10b981'}
                      onChange={(e) => updateSetting('branding.accentColor', e.target.value)}
                      className="flex-1 p-2 border rounded"
                    />
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <ImageUpload
                  currentImage={settings?.branding?.logo}
                  onImageSelect={(url) => updateSetting('branding.logo', url)}
                  label="Logo"
                />
                <ImageUpload
                  currentImage={settings?.branding?.favicon}
                  onImageSelect={(url) => updateSetting('branding.favicon', url)}
                  label="Favicon"
                />
              </div>
            </div>
          )}
          
          {/* Layout Tab */}
          {activeTab === 'layout' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold mb-4">Layout Settings</h2>
              
              <div>
                <label className="block text-sm font-medium mb-2">Team Grid Columns</label>
                <select
                  value={settings?.layout?.maxTeamColumns || 3}
                  onChange={(e) => updateSetting('layout.maxTeamColumns', parseInt(e.target.value))}
                  className="w-full p-2 border rounded"
                >
                  <option value={2}>2 Columns</option>
                  <option value={3}>3 Columns</option>
                  <option value={4}>4 Columns</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">News Layout</label>
                <select
                  value={settings?.layout?.newsLayout || 'cards'}
                  onChange={(e) => updateSetting('layout.newsLayout', e.target.value)}
                  className="w-full p-2 border rounded"
                >
                  <option value="cards">Cards</option>
                  <option value="list">List</option>
                  <option value="masonry">Masonry</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Events Layout</label>
                <select
                  value={settings?.layout?.eventsLayout || 'list'}
                  onChange={(e) => updateSetting('layout.eventsLayout', e.target.value)}
                  className="w-full p-2 border rounded"
                >
                  <option value="list">List</option>
                  <option value="calendar">Calendar</option>
                  <option value="grid">Grid</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings?.layout?.showFooterLinks || false}
                    onChange={(e) => updateSetting('layout.showFooterLinks', e.target.checked)}
                    className="mr-2"
                  />
                  Show Footer Links
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings?.layout?.showSocialMedia || false}
                    onChange={(e) => updateSetting('layout.showSocialMedia', e.target.checked)}
                    className="mr-2"
                  />
                  Show Social Media Icons
                </label>
              </div>
            </div>
          )}
          
          {/* Features Tab */}
          {activeTab === 'features' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold mb-4">Feature Toggles</h2>
              
              <div className="space-y-3">
                {Object.entries(settings?.features || {}).map(([key, value]) => (
                  <label key={key} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={(e) => updateSetting(`features.${key}`, e.target.checked)}
                      className="mr-3"
                    />
                    <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
          
          {/* Export/Import Tab */}
          {activeTab === 'export' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold mb-4">Export/Import Data</h2>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold mb-3">Export Site Data</h3>
                <p className="text-gray-600 mb-4">
                  Download all your site content and settings as a JSON file for backup or migration.
                </p>
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                  Export All Data
                </button>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold mb-3">Import Site Data</h3>
                <p className="text-gray-600 mb-4">
                  Upload a previously exported JSON file to restore your site data.
                </p>
                <input
                  type="file"
                  accept=".json"
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>
            </div>
          )}
        </div>
        
        {/* Save Button */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={saveSettings}
            disabled={saving}
            className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </div>
    </div>
  );
}