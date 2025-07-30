import React, { useState } from 'react';
import Hero from '../../components/shared/Hero'; // Keep existing Hero import
import TemplateRenderer from '../../components/shared/TemplateRenderer';
import { usePageData } from '../../hooks/usePageData';
import toast from 'react-hot-toast';

export default function AdminHome() {
  const { data, draft, loading, hasChanges, updateField, save, publish } = usePageData('home');
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
  
  const handleSave = async () => {
    try {
      await save();
    } catch (error) {
      console.error('Save error:', error);
    }
  };
  
  const handlePublish = async () => {
    try {
      await publish();
    } catch (error) {
      console.error('Publish error:', error);
    }
  };
  
  // Try new template system first, fallback to existing Hero
  const templateRenderer = (
    <TemplateRenderer 
      pageId="home" 
      data={draft} 
      isEditable={true} 
      onChange={updateField} // Use updateField from usePageData
    />
  );
  
  return (
    <div>
      {/* Admin Header */}
      <div className="bg-yellow-100 border-b-2 border-yellow-300 p-4 sticky top-16 z-40">
        <div className="container mx-auto flex justify-between items-center">
          <span className="text-yellow-800 font-semibold">
            ✏️ Edit Home Page - {hasChanges ? 'Unsaved changes' : 'All changes saved'}
          </span>
          <div className="space-x-3">
            {hasChanges && (
              <button 
                onClick={handleSave}
                className="bg-white text-yellow-800 px-4 py-2 rounded border border-yellow-300 hover:bg-yellow-50"
              >
                Save Draft
              </button>
            )}
            <button 
              onClick={handlePublish}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Publish
            </button>
          </div>
        </div>
      </div>
      
      {/* Template Renderer with Hero fallback */}
      {templateRenderer || (
        <Hero 
          data={draft?.hero} 
          isEditable={true} 
          onChange={updateField}
          pageId="home" 
        />
      )}
    </div>
  );
}