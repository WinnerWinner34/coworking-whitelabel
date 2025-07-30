import React, { useState } from 'react';
import { useTemplateSettings } from '../../hooks/useTemplateSettings';
import toast from 'react-hot-toast';

export default function AdminSettings() {
  const { settings, loading, updateSetting, saveSettings } = useTemplateSettings();
  const [activeTab, setActiveTab] = useState('general');
  const [saving, setSaving] = useState(false);

  // Available page templates
  const availableTemplates = {
    home: [
      { id: 'modern', name: 'Motive Style', description: 'Alternating sections with professional layout' },
      { id: 'gradient', name: 'Gradient Hero', description: 'Clean, modern design with gradient background' },
      { id: 'classic', name: 'Classic Business', description: 'Traditional business layout' },
      { id: 'startup', name: 'Startup', description: 'Dynamic startup-focused design' },
      { id: 'minimal', name: 'Minimal', description: 'Clean, minimalist approach' }
    ],
    about: [
      { id: 'story', name: 'Our Story', description: 'Narrative-focused about page' },
      { id: 'mission', name: 'Mission Driven', description: 'Mission and values focused' },
      { id: 'team-first', name: 'Team First', description: 'Team-centric about page' }
    ],
    team: [
      { id: 'grid', name: 'Grid Layout', description: 'Team members in a grid' },
      { id: 'cards', name: 'Card Layout', description: 'Individual cards for each member' },
      { id: 'list', name: 'List View', description: 'List format with photos' },
      { id: 'hierarchy', name: 'Org Chart', description: 'Organizational hierarchy' }
    ],
    news: [
      { id: 'blog', name: 'Blog Style', description: 'Traditional blog layout' },
      { id: 'magazine', name: 'Magazine', description: 'Magazine-style layout' },
      { id: 'timeline', name: 'Timeline', description: 'Chronological timeline view' }
    ],
    events: [
      { id: 'calendar', name: 'Calendar View', description: 'Monthly calendar display' },
      { id: 'list', name: 'Event List', description: 'Simple list of events' },
      { id: 'cards', name: 'Event Cards', description: 'Card-based event display' }
    ]
  };

  // Available pages that can be enabled/disabled
  const availablePages = [
    { id: 'home', name: 'Home', required: true, description: 'Main landing page' },
    { id: 'about', name: 'About Us', required: false, description: 'Company information and story' },
    { id: 'team', name: 'Team', required: false, description: 'Team member profiles' },
    { id: 'news', name: 'News & Blog', required: false, description: 'Company news and blog posts' },
    { id: 'events', name: 'Events', required: false, description: 'Upcoming events and workshops' },
    { id: 'services', name: 'Services', required: false, description: 'Services offered (coming soon)' },
    { id: 'pricing', name: 'Pricing', required: false, description: 'Pricing plans (coming soon)' },
    { id: 'contact', name: 'Contact', required: false, description: 'Contact information and form' },
    { id: 'register', name: 'Register', required: false, description: 'Membership registration' }
  ];

  const handleSave = async () => {
    setSaving(true);
    try {
      await saveSettings();
      toast.success('Settings saved successfully!');
    } catch (error) {
      toast.error('Failed to save settings');
      console.error('Settings save error:', error);
    } finally {
      setSaving(false);
    }
  };

  const handlePageToggle = (pageId, enabled) => {
    const currentPages = settings?.pages || {};
    updateSetting('pages', {
      ...currentPages,
      [pageId]: {
        ...currentPages[pageId],
        enabled
      }
    });
  };

  const handleTemplateChange = (pageId, templateId) => {
    const currentPages = settings?.pages || {};
    updateSetting('pages', {
      ...currentPages,
      [pageId]: {
        ...currentPages[pageId],
        template: templateId
      }
    });
  };

  const handlePageOrderChange = (pageId, direction) => {
    const currentPages = settings?.pages || {};
    const currentOrder = currentPages[pageId]?.order || 0;
    const newOrder = direction === 'up' ? currentOrder - 1 : currentOrder + 1;
    
    updateSetting('pages', {
      ...currentPages,
      [pageId]: {
        ...currentPages[pageId],
        order: newOrder
      }
    });
  };

  const handleHeroSizeChange = (pageId, size) => {
    const currentPages = settings?.pages || {};
    updateSetting('pages', {
      ...currentPages,
      [pageId]: {
        ...currentPages[pageId],
        heroSize: size
      }
    });
  };

  if (loading) return <div className="flex justify-center py-16">Loading settings...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Site Settings</h1>
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition"
            >
              {saving ? 'Saving...' : 'Save All Changes'}
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Sidebar Navigation */}
          <div className="w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <nav className="space-y-2">
                {[
                  { id: 'general', name: 'General', icon: '⚙️' },
                  { id: 'pages', name: 'Pages & Templates', icon: '📄' },
                  { id: 'branding', name: 'Branding', icon: '🎨' },
                  { id: 'features', name: 'Features', icon: '✨' },
                  { id: 'advanced', name: 'Advanced', icon: '🔧' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition ${
                      activeTab === tab.id
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <span className="mr-3">{tab.icon}</span>
                    {tab.name}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm">
              
              {/* General Tab */}
              {activeTab === 'general' && (
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-6">General Settings</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Site Name
                      </label>
                      <input
                        type="text"
                        value={settings?.general?.siteName || ''}
                        onChange={(e) => updateSetting('general.siteName', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="The Coworking Space"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Site Description
                      </label>
                      <textarea
                        value={settings?.general?.siteDescription || ''}
                        onChange={(e) => updateSetting('general.siteDescription', e.target.value)}
                        rows={3}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Your creative workspace in the heart of the city"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Contact Email
                      </label>
                      <input
                        type="email"
                        value={settings?.general?.contactEmail || ''}
                        onChange={(e) => updateSetting('general.contactEmail', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="contact@coworkingspace.com"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Pages & Templates Tab */}
              {activeTab === 'pages' && (
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-6">Pages & Templates</h2>
                  
                  <div className="space-y-6">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="text-blue-800 text-sm">
                        <strong>📝 How it works:</strong> Enable/disable pages and choose templates for each page. 
                        Disabled pages won't appear in navigation. Order determines navigation sequence.
                      </p>
                    </div>

                    {availablePages.map((page) => {
                      const pageSettings = settings?.pages?.[page.id] || { 
                        enabled: page.required || false, 
                        template: availableTemplates[page.id]?.[0]?.id || 'default',
                        order: 0,
                        heroSize: 'medium'
                      };
                      
                      return (
                        <div key={page.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-3">
                                <div className="flex items-center">
                                  <input
                                    type="checkbox"
                                    checked={pageSettings.enabled}
                                    onChange={(e) => handlePageToggle(page.id, e.target.checked)}
                                    disabled={page.required}
                                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                                  />
                                  <label className="ml-2 text-lg font-medium text-gray-900">
                                    {page.name}
                                    {page.required && <span className="text-red-500 ml-1">*</span>}
                                  </label>
                                </div>
                                
                                {pageSettings.enabled && (
                                  <div className="flex items-center gap-2">
                                    <button
                                      onClick={() => handlePageOrderChange(page.id, 'up')}
                                      className="p-1 text-gray-400 hover:text-gray-600"
                                      title="Move up in navigation"
                                    >
                                      ↑
                                    </button>
                                    <span className="text-xs text-gray-500">Order: {pageSettings.order}</span>
                                    <button
                                      onClick={() => handlePageOrderChange(page.id, 'down')}
                                      className="p-1 text-gray-400 hover:text-gray-600"
                                      title="Move down in navigation"
                                    >
                                      ↓
                                    </button>
                                  </div>
                                )}
                              </div>
                              
                              <p className="text-sm text-gray-600 mt-1">{page.description}</p>
                            </div>
                          </div>

                          {pageSettings.enabled && availableTemplates[page.id] && (
                            <div className="mt-4 pl-6 border-l-2 border-gray-100 space-y-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Template Style
                                </label>
                                <select
                                  value={pageSettings.template}
                                  onChange={(e) => handleTemplateChange(page.id, e.target.value)}
                                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                  {availableTemplates[page.id].map((template) => (
                                    <option key={template.id} value={template.id}>
                                      {template.name} - {template.description}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              
                              {/* Hero Size Slider - Only show for pages that have hero sections */}
                              {['home', 'about', 'services', 'contact'].includes(page.id) && (
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Hero Banner Size
                                  </label>
                                  <div className="space-y-2">
                                    <input
                                      type="range"
                                      min="1"
                                      max="5"
                                      value={
                                        pageSettings.heroSize === 'small' ? 2 :
                                        pageSettings.heroSize === 'medium' ? 3 :
                                        pageSettings.heroSize === 'large' ? 4 :
                                        pageSettings.heroSize === 'xlarge' ? 5 : 1
                                      }
                                      onChange={(e) => {
                                        const sizes = ['compact', 'small', 'medium', 'large', 'xlarge'];
                                        handleHeroSizeChange(page.id, sizes[parseInt(e.target.value) - 1]);
                                      }}
                                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                    />
                                    <div className="flex justify-between text-xs text-gray-500">
                                      <span>Compact</span>
                                      <span>Small</span>
                                      <span>Medium</span>
                                      <span>Large</span>
                                      <span>XLarge</span>
                                    </div>
                                    <div className="text-sm text-gray-600 text-center">
                                      Current: <span className="font-medium">{pageSettings.heroSize || 'medium'}</span>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}

                          {!pageSettings.enabled && !page.required && (
                            <div className="mt-2 text-sm text-gray-500 italic">
                              This page is disabled and won't appear in navigation
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Branding Tab */}
              {activeTab === 'branding' && (
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-6">Branding & Appearance</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Primary Color
                      </label>
                      <div className="flex items-center gap-3">
                        <input
                          type="color"
                          value={settings?.branding?.primaryColor || '#2563eb'}
                          onChange={(e) => updateSetting('branding.primaryColor', e.target.value)}
                          className="w-12 h-12 rounded-lg border border-gray-300"
                        />
                        <input
                          type="text"
                          value={settings?.branding?.primaryColor || '#2563eb'}
                          onChange={(e) => updateSetting('branding.primaryColor', e.target.value)}
                          className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="#2563eb"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Logo URL
                      </label>
                      <input
                        type="url"
                        value={settings?.branding?.logoUrl || ''}
                        onChange={(e) => updateSetting('branding.logoUrl', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="https://example.com/logo.png"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Font Family
                      </label>
                      <select
                        value={settings?.branding?.fontFamily || 'Inter'}
                        onChange={(e) => updateSetting('branding.fontFamily', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="Inter">Inter (Modern)</option>
                        <option value="Roboto">Roboto (Google)</option>
                        <option value="Open Sans">Open Sans (Clean)</option>
                        <option value="Poppins">Poppins (Friendly)</option>
                        <option value="Playfair Display">Playfair Display (Elegant)</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Features Tab */}
              {activeTab === 'features' && (
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-6">Feature Toggles</h2>
                  
                  <div className="space-y-4">
                    {[
                      { key: 'showSocialMedia', label: 'Social Media Links', description: 'Show social media icons in footer' },
                      { key: 'enableComments', label: 'Comments on News', description: 'Allow comments on news articles' },
                      { key: 'showTestimonials', label: 'Testimonials', description: 'Display customer testimonials' },
                      { key: 'enableBooking', label: 'Online Booking', description: 'Allow online space booking' },
                      { key: 'showPricing', label: 'Pricing Display', description: 'Show pricing information' },
                      { key: 'enableNewsletter', label: 'Newsletter Signup', description: 'Show newsletter subscription form' }
                    ].map((feature) => (
                      <div key={feature.key} className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg">
                        <input
                          type="checkbox"
                          checked={settings?.features?.[feature.key] || false}
                          onChange={(e) => updateSetting(`features.${feature.key}`, e.target.checked)}
                          className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 mt-1"
                        />
                        <div>
                          <label className="font-medium text-gray-900">{feature.label}</label>
                          <p className="text-sm text-gray-600">{feature.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Advanced Tab */}
              {activeTab === 'advanced' && (
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-6">Advanced Settings</h2>
                  
                  <div className="space-y-6">
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <p className="text-yellow-800 text-sm">
                        <strong>⚠️ Advanced Settings:</strong> These settings affect core functionality. 
                        Only modify if you understand the implications.
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Custom CSS
                      </label>
                      <textarea
                        value={settings?.advanced?.customCSS || ''}
                        onChange={(e) => updateSetting('advanced.customCSS', e.target.value)}
                        rows={8}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                        placeholder="/* Add your custom CSS here */"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Google Analytics ID
                      </label>
                      <input
                        type="text"
                        value={settings?.advanced?.googleAnalyticsId || ''}
                        onChange={(e) => updateSetting('advanced.googleAnalyticsId', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="G-XXXXXXXXXX"
                      />
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}