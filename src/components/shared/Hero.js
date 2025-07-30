// src/components/shared/Hero.js
// Enhanced with professional Motive-style design

import React from 'react';
import { usePageTemplate, useTemplateSettings } from '../../hooks/useTemplateSettings';

export default function Hero({ data, isEditable = false, onChange, pageId = 'home' }) {
  const { template } = usePageTemplate(pageId);
  const { settings } = useTemplateSettings();
  const heroSize = settings?.pages?.[pageId]?.heroSize || 'medium';

  console.log('Hero template:', template, 'for pageId:', pageId);
  console.log('Hero data received:', data);

  const handleChange = (field, value) => {
    if (onChange) {
      onChange(`hero.${field}`, value);
    }
  };

  // Get padding classes based on hero size
  const getSizeClasses = () => {
    switch (heroSize) {
      case 'compact':
        return 'py-12';
      case 'small':
        return 'py-20';
      case 'medium':
        return 'py-32';
      case 'large':
        return 'py-44';
      case 'xlarge':
        return 'py-56';
      default:
        return 'py-32';
    }
  };

  // Get text size classes based on hero size
  const getTextSizeClasses = () => {
    switch (heroSize) {
      case 'compact':
        return { title: 'text-3xl md:text-4xl', subtitle: 'text-lg' };
      case 'small':
        return { title: 'text-4xl md:text-5xl', subtitle: 'text-xl' };
      case 'medium':
        return { title: 'text-5xl md:text-6xl', subtitle: 'text-2xl' };
      case 'large':
        return { title: 'text-6xl md:text-7xl', subtitle: 'text-2xl md:text-3xl' };
      case 'xlarge':
        return { title: 'text-6xl md:text-8xl', subtitle: 'text-3xl md:text-4xl' };
      default:
        return { title: 'text-5xl md:text-6xl', subtitle: 'text-2xl' };
    }
  };

  // Enhanced Motive Template - Professional, clean design with alternating sections
  const MotiveTemplate = () => {
    const sections = data?.sections || [];
    const textSizes = getTextSizeClasses();
    const sizeClass = getSizeClasses();
    
    console.log('Motive template sections:', sections);
    
    // Fallback content if no sections exist
    if (sections.length === 0) {
      return (
        <div className="bg-white">
          <div className={`${sizeClass}`}>
            <div className="container mx-auto px-6">
              <div className="max-w-4xl mx-auto text-center">
                <h1 
                  className={`${textSizes.title} font-bold text-gray-900 mb-6 leading-tight`}
                  contentEditable={isEditable}
                  suppressContentEditableWarning={true}
                  onBlur={(e) => isEditable && handleChange('title', e.target.textContent)}
                >
                  {data?.title || 'Welcome to The Coworking Space'}
                </h1>
                <p 
                  className={`${textSizes.subtitle} text-gray-600 mb-10 leading-relaxed max-w-3xl mx-auto`}
                  contentEditable={isEditable}
                  suppressContentEditableWarning={true}
                  onBlur={(e) => isEditable && handleChange('subtitle', e.target.textContent)}
                >
                  {data?.subtitle || 'Your creative workspace in the heart of the city'}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl">
                    Get Started
                  </button>
                  <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold text-lg hover:border-gray-400 hover:bg-gray-50 transition-all duration-200">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Add some sample sections if no data exists */}
          <div className="py-20 border-t border-gray-100">
            <div className="container mx-auto px-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[400px]">
                <div className="md:order-2 space-y-6">
                  <div className="mb-4">
                    <span className="inline-block bg-blue-50 text-blue-700 font-semibold text-sm uppercase tracking-wider px-4 py-2 rounded-full">
                      Work Your Way
                    </span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                    Flexible Workspace Solutions
                  </h2>
                  <p className="text-xl text-gray-600 leading-relaxed">
                    From hot desks to private offices, find the perfect space that matches your work style and growing business needs.
                  </p>
                </div>
                <div className="md:order-1 relative flex items-center justify-center">
                  <div className="relative w-full max-w-lg">
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl aspect-[4/3] flex items-center justify-center shadow-xl border border-blue-100 w-full">
                      <div className="text-center p-8">
                        <div className="w-24 h-24 bg-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                          <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">
                          Workspace Options
                        </h3>
                        <p className="text-gray-500 text-sm">
                          Professional workspace image
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    
    return (
      <div className="bg-white">
        {sections.map((section, index) => {
          const isMainSection = section.type === 'main';
          const isLeftAligned = section.alignment === 'left';
          
          return (
            <div 
              key={section.id} 
              className={`${isMainSection ? sizeClass : 'py-20 md:py-28'} ${index > 0 ? 'border-t border-gray-100' : ''}`}
            >
              <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[500px]">
                  {/* Text Content */}
                  <div className={`${!isLeftAligned ? 'md:order-2' : 'md:order-1'} ${isMainSection ? 'md:pr-8' : ''} space-y-6`}>
                    {/* Subtitle/Category */}
                    {section.subtitle && (
                      <div className="mb-4">
                        <span 
                          className="inline-block bg-blue-50 text-blue-700 font-semibold text-sm uppercase tracking-wider px-4 py-2 rounded-full"
                          contentEditable={isEditable}
                          suppressContentEditableWarning={true}
                          onBlur={(e) => isEditable && handleChange(`sections.${index}.subtitle`, e.target.textContent)}
                        >
                          {section.subtitle}
                        </span>
                      </div>
                    )}
                    
                    {/* Main Title */}
                    <h2 
                      className={`${isMainSection ? textSizes.title : 'text-4xl md:text-5xl'} font-bold text-gray-900 mb-6 leading-tight`}
                      contentEditable={isEditable}
                      suppressContentEditableWarning={true}
                      onBlur={(e) => isEditable && handleChange(`sections.${index}.title`, e.target.textContent)}
                    >
                      {section.title}
                    </h2>
                    
                    {/* Description */}
                    <p 
                      className={`${isMainSection ? textSizes.subtitle : 'text-xl'} text-gray-600 mb-8 leading-relaxed`}
                      contentEditable={isEditable}
                      suppressContentEditableWarning={true}
                      onBlur={(e) => isEditable && handleChange(`sections.${index}.description`, e.target.textContent)}
                    >
                      {section.description}
                    </p>
                    
                    {/* CTA Buttons for main section */}
                    {isMainSection && (
                      <div className="flex flex-col sm:flex-row gap-4">
                        {section.cta && (
                          <button className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                            {section.cta.text}
                          </button>
                        )}
                        {section.secondaryCta && (
                          <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold text-lg hover:border-gray-400 hover:bg-gray-50 transition-all duration-200">
                            {section.secondaryCta.text}
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                  
                  {/* Image/Visual Content */}
                  <div className={`${!isLeftAligned ? 'md:order-1' : 'md:order-2'} relative flex items-center justify-center`}>
                    {section.image ? (
                      <div className="relative overflow-hidden rounded-2xl shadow-2xl w-full max-w-lg">
                        <img 
                          src={section.image} 
                          alt={section.imageAlt || section.title}
                          className="w-full h-auto transform hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    ) : (
                      <div className="relative w-full max-w-lg">
                        {/* Modern Image Placeholder */}
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl aspect-[4/3] flex items-center justify-center shadow-xl border border-blue-100 w-full">
                          <div className="text-center p-8">
                            {/* Professional placeholder icon */}
                            <div className="w-24 h-24 bg-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                              <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-700 mb-2">
                              {section.imageAlt || 'Professional Image'}
                            </h3>
                            <p className="text-gray-500 text-sm">
                              High-quality image placeholder
                            </p>
                            {isEditable && (
                              <p className="text-xs text-blue-600 mt-3 font-medium">
                                Click to upload image
                              </p>
                            )}
                          </div>
                        </div>
                        
                        {/* Decorative elements */}
                        <div className="absolute -z-10 -top-4 -right-4 w-24 h-24 bg-blue-100 rounded-full opacity-20"></div>
                        <div className="absolute -z-10 -bottom-6 -left-6 w-32 h-32 bg-indigo-100 rounded-full opacity-20"></div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        
        {/* Bottom decorative section */}
        <div className="py-16 bg-gray-50">
          <div className="container mx-auto px-6 text-center">
            <div className="max-w-3xl mx-auto">
              <p className="text-lg text-gray-600 mb-8">
                Join over <span className="font-semibold text-blue-600">500+ professionals</span> who trust our coworking space for their business success.
              </p>
              <div className="flex items-center justify-center space-x-12 opacity-60">
                {/* Company logos placeholder */}
                <div className="text-gray-400 font-semibold">Company A</div>
                <div className="text-gray-400 font-semibold">Company B</div>
                <div className="text-gray-400 font-semibold">Company C</div>
                <div className="text-gray-400 font-semibold">Company D</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Modern Template - Clean, large hero with gradient background
  const ModernTemplate = () => {
    const textSizes = getTextSizeClasses();
    
    return (
      <div className={`relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white overflow-hidden ${getSizeClasses()}`}>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 
              className={`${textSizes.title} font-bold mb-6 leading-tight`}
              contentEditable={isEditable}
              suppressContentEditableWarning={true}
              onBlur={(e) => isEditable && handleChange('title', e.target.textContent)}
            >
              {data?.title || 'Modern Workspace Solutions'}
            </h1>
            <p 
              className={`${textSizes.subtitle} mb-10 text-blue-100 leading-relaxed max-w-3xl mx-auto`}
              contentEditable={isEditable}
              suppressContentEditableWarning={true}
              onBlur={(e) => isEditable && handleChange('subtitle', e.target.textContent)}
            >
              {data?.subtitle || 'Experience the future of collaborative workspaces'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-all duration-200 shadow-lg">
                Get Started
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-200">
                Learn More
              </button>
            </div>
          </div>
        </div>
        
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full transform translate-x-32 -translate-y-32"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full transform -translate-x-20 translate-y-20"></div>
      </div>
    );
  };

  // Classic Template - Traditional business look
  const ClassicTemplate = () => {
    const textSizes = getTextSizeClasses();
    
    return (
      <div className={`bg-gray-900 text-white ${getSizeClasses()}`}>
        <div className="container mx-auto px-6">
          <div className="max-w-4xl">
            <h1 
              className={`${textSizes.title} font-serif font-bold mb-6`}
              contentEditable={isEditable}
              suppressContentEditableWarning={true}
              onBlur={(e) => isEditable && handleChange('title', e.target.textContent)}
            >
              {data?.title || 'Professional Workspace Solutions'}
            </h1>
            <p 
              className={`${textSizes.subtitle} mb-8 text-gray-300 max-w-2xl`}
              contentEditable={isEditable}
              suppressContentEditableWarning={true}
              onBlur={(e) => isEditable && handleChange('subtitle', e.target.textContent)}
            >
              {data?.subtitle || 'Established excellence in providing premium office spaces'}
            </p>
            <button className="bg-blue-600 text-white px-6 py-3 rounded font-semibold hover:bg-blue-700 transition">
              Schedule a Tour
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Template selector with fallback
  const renderTemplate = () => {
    try {
      switch (template) {
        case 'classic':
          return <ClassicTemplate />;
        case 'modern':
          return <MotiveTemplate />;  // Use Motive style for modern
        case 'gradient':
          return <ModernTemplate />;  // Keep gradient as separate option
        case 'motive':
          return <MotiveTemplate />;
        default:
          return <MotiveTemplate />;  // Default to Motive style
      }
    } catch (error) {
      console.error('Template rendering error:', error);
      return <MotiveTemplate />; // Fallback to Motive template
    }
  };

  return (
    <div className="relative">
      {isEditable && (
        <div className="absolute top-4 right-4 z-20 bg-yellow-100 border border-yellow-300 rounded px-3 py-1 text-sm font-medium">
          Template: <strong className="text-yellow-800">{template}</strong>
        </div>
      )}
      {renderTemplate()}
    </div>
  );
}