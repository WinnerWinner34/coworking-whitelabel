import React from 'react';
import { usePageTemplate } from '../../hooks/useTemplateSettings';

export default function Hero({ data, isEditable = false, onChange, pageId = 'home' }) {
  const { template } = usePageTemplate(pageId);

  const handleChange = (field, value) => {
    if (onChange) {
      onChange(`hero.${field}`, value);
    }
  };

  // Modern Template - Clean, large hero with gradient background
  const ModernTemplate = () => (
    <div className="relative bg-gradient-to-br from-blue-600 to-purple-700 text-white py-32 overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div className="container mx-auto text-center relative z-10 px-6">
        <h1 
          className="text-6xl font-bold mb-6 leading-tight"
          contentEditable={isEditable}
          suppressContentEditableWarning={true}
          onBlur={(e) => isEditable && handleChange('title', e.target.textContent)}
        >
          {data?.title || 'Welcome to the Future of Work'}
        </h1>
        <p 
          className="text-2xl mb-8 max-w-3xl mx-auto leading-relaxed"
          contentEditable={isEditable}
          suppressContentEditableWarning={true}
          onBlur={(e) => isEditable && handleChange('subtitle', e.target.textContent)}
        >
          {data?.subtitle || 'Experience a workspace designed for innovation, collaboration, and success'}
        </p>
        <div className="flex gap-4 justify-center">
          <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition">
            Get Started
          </button>
          <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition">
            Learn More
          </button>
        </div>
      </div>
      {/* Decorative elements */}
      <div className="absolute top-10 right-10 w-24 h-24 bg-white opacity-10 rounded-full"></div>
      <div className="absolute bottom-10 left-10 w-16 h-16 bg-white opacity-10 rounded-full"></div>
    </div>
  );

  // Classic Template - Traditional business look
  const ClassicTemplate = () => (
    <div className="bg-gray-900 text-white py-24">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl">
          <h1 
            className="text-5xl font-serif font-bold mb-6"
            contentEditable={isEditable}
            suppressContentEditableWarning={true}
            onBlur={(e) => isEditable && handleChange('title', e.target.textContent)}
          >
            {data?.title || 'Professional Workspace Solutions'}
          </h1>
          <p 
            className="text-xl mb-8 text-gray-300 max-w-2xl"
            contentEditable={isEditable}
            suppressContentEditableWarning={true}
            onBlur={(e) => isEditable && handleChange('subtitle', e.target.textContent)}
          >
            {data?.subtitle || 'Established excellence in providing premium office spaces for ambitious professionals and growing businesses'}
          </p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded font-semibold hover:bg-blue-700 transition">
            Schedule a Tour
          </button>
        </div>
      </div>
    </div>
  );

  // Fallback - use your current hero if template system fails
  const FallbackTemplate = () => (
    <div className="hero text-white py-16">
      <div className="container mx-auto text-center">
        <h1 
          className="text-5xl font-bold mb-4"
          contentEditable={isEditable}
          suppressContentEditableWarning={true}
          onBlur={(e) => handleChange('title', e.target.textContent)}
        >
          {data?.title || 'Welcome'}
        </h1>
        
        <p 
          className="text-xl mb-8"
          contentEditable={isEditable}
          suppressContentEditableWarning={true}
          onBlur={(e) => handleChange('subtitle', e.target.textContent)}
        >
          {data?.subtitle || 'Your subtitle here'}
        </p>
        
        {data?.cta && (
          <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
            {data.cta.text}
          </button>
        )}
      </div>
    </div>
  );

  // Template selector with fallback
  const renderTemplate = () => {
    try {
      switch (template) {
        case 'classic':
          return <ClassicTemplate />;
        case 'modern':
          return <ModernTemplate />;
        default:
          return <ModernTemplate />;
      }
    } catch (error) {
      console.error('Template rendering error:', error);
      return <FallbackTemplate />;
    }
  };

  return (
    <div className="relative">
      {isEditable && (
        <div className="absolute top-4 right-4 z-20 bg-yellow-100 border border-yellow-300 rounded px-3 py-1 text-sm">
          Template: <strong>{template}</strong>
        </div>
      )}
      {renderTemplate()}
    </div>
  );
}