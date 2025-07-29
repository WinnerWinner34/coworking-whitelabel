import React from 'react';
import { useSettings } from '../../hooks/useSettings';

export default function Hero({ data, isEditable = false, onChange, pageId = 'home' }) {
  const { getPageTemplate } = useSettings();
  const template = getPageTemplate(pageId);

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

  // Startup Template - Dynamic and energetic
  const StartupTemplate = () => (
    <div className="relative bg-gradient-to-r from-green-400 to-blue-500 text-white py-28 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 opacity-90"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>
      
      <div className="container mx-auto text-center relative z-10 px-6">
        <div className="inline-block bg-white bg-opacity-20 rounded-full px-4 py-2 mb-6">
          <span className="text-sm font-semibold">🚀 INNOVATION HUB</span>
        </div>
        <h1 
          className="text-6xl font-black mb-6 leading-tight"
          contentEditable={isEditable}
          suppressContentEditableWarning={true}
          onBlur={(e) => isEditable && handleChange('title', e.target.textContent)}
        >
          {data?.title || 'Build. Scale. Succeed.'}
        </h1>
        <p 
          className="text-xl mb-8 max-w-2xl mx-auto"
          contentEditable={isEditable}
          suppressContentEditableWarning={true}
          onBlur={(e) => isEditable && handleChange('subtitle', e.target.textContent)}
        >
          {data?.subtitle || 'Join the ecosystem where startups thrive and big ideas become reality'}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-white text-gray-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition transform hover:scale-105">
            Join the Community
          </button>
          <button className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-gray-900 transition">
            Watch Demo
          </button>
        </div>
      </div>
    </div>
  );

  // Minimal Template - Clean and simple
  const MinimalTemplate = () => (
    <div className="bg-white py-32 border-b border-gray-200">
      <div className="container mx-auto text-center px-6">
        <h1 
          className="text-5xl font-light text-gray-900 mb-6 tracking-tight"
          contentEditable={isEditable}
          suppressContentEditableWarning={true}
          onBlur={(e) => isEditable && handleChange('title', e.target.textContent)}
        >
          {data?.title || 'Simply Better Workspace'}
        </h1>
        <p 
          className="text-lg text-gray-600 mb-8 max-w-xl mx-auto"
          contentEditable={isEditable}
          suppressContentEditableWarning={true}
          onBlur={(e) => isEditable && handleChange('subtitle', e.target.textContent)}
        >
          {data?.subtitle || 'Clean, focused environments for clear thinking and productive work'}
        </p>
        <button className="bg-gray-900 text-white px-6 py-3 font-medium hover:bg-gray-800 transition">
          Explore Spaces
        </button>
      </div>
    </div>
  );

  // Template selector
  const renderTemplate = () => {
    switch (template) {
      case 'classic':
        return <ClassicTemplate />;
      case 'startup':
        return <StartupTemplate />;
      case 'minimal':
        return <MinimalTemplate />;
      case 'modern':
      default:
        return <ModernTemplate />;
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