// src/pages/public/Home.js
// Updated to use TemplateRenderer with Hero fallback

import React from 'react';
import Hero from '../../components/shared/Hero'; // Keep existing Hero import
import TemplateRenderer from '../../components/shared/TemplateRenderer';
import { usePageData } from '../../hooks/usePageData';

export default function Home() {
  const { data, loading } = usePageData('home');
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading your workspace...</p>
        </div>
      </div>
    );
  }
  
  // Try new template system first, fallback to existing Hero
  const templateRenderer = (
    <TemplateRenderer 
      pageId="home" 
      data={data} 
      isEditable={false} 
    />
  );
  
  // If template renderer returns null, use existing Hero
  return (
    <div className="min-h-screen">
      {templateRenderer || <Hero data={data?.hero} pageId="home" />}
      
      {/* Features are now handled by TemplateRenderer */}
      
      {/* Additional sections can be added here if needed */}
    </div>
  );
}