import React from 'react';
import { usePageTemplate, useTemplateSettings } from '../../hooks/useTemplateSettings';

export default function Hero({ data, isEditable = false, onChange, pageId = 'home' }) {
  const { template } = usePageTemplate(pageId);
  const { settings } = useTemplateSettings();
  const heroSize = settings?.pages?.[pageId]?.heroSize || 'medium';

  console.log('Hero template:', template, 'for pageId:', pageId); // Debug log
  console.log('Hero data received:', data); // Debug log to see what data we have

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

  // Modern Template - Clean, large hero with gradient background
  const ModernTemplate = () => {
    const textSizes = getTextSizeClasses();
    
    return (
      <div className={`relative bg-gradient-to-br from-blue-600 to-purple-700 text-white ${getSizeClasses()} overflow-hidden`}>
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="container mx-auto text-center relative z-10 px-6">
          <h1 
            className={`${textSizes.title} font-bold mb-6 leading-tight`}
            contentEditable={isEditable}
            suppressContentEditableWarning={true}
            onBlur={(e) => isEditable && handleChange('title', e.target.textContent)}
          >
            {data?.title || 'Welcome to the Future of Work'}
          </h1>
          <p 
            className={`${textSizes.subtitle} mb-8 max-w-3xl mx-auto leading-relaxed`}
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
            {data?.subtitle || 'Established excellence in providing premium office spaces for ambitious professionals and growing businesses'}
            </p>
            <button className="bg-blue-600 text-white px-6 py-3 rounded font-semibold hover:bg-blue-700 transition">
              Schedule a Tour
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Motive Template - Alternating sections with professional design
  const MotiveTemplate = () => {
    const sections = data?.sections || [];
    const textSizes = getTextSizeClasses();
    const sizeClass = getSizeClasses();
    
    console.log('Motive template sections:', sections); // Debug log
    
    // If no sections, show a fallback
    if (sections.length === 0) {
      return (
        <div className={`bg-white ${sizeClass}`}>
          <div className="container mx-auto px-6 text-center">
            <h1 className={`${textSizes.title} font-bold text-gray-900 mb-4`}>
              {data?.title || 'Welcome to The Coworking Space'}
            </h1>
            <p className={`${textSizes.subtitle} text-gray-600 mb-8`}>
              {data?.subtitle || 'Your creative workspace in the heart of the city'}
            </p>
            <div className="flex gap-4 justify-center">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
                Get Started
              </button>
              <button className="border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:border-gray-400 transition">
                Learn More
              </button>
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
              className={`${isMainSection ? sizeClass : 'py-16 md:py-24'} ${index > 0 ? 'border-t border-gray-100' : ''}`}
            >
              <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  {/* Text Content */}
                  <div className={`${!isLeftAligned ? 'lg:order-2' : 'lg:order-1'}`}>
                    {section.subtitle && (
                      <p 
                        className="text-blue-600 font-semibold text-sm uppercase tracking-wide mb-2"
                        contentEditable={isEditable}
                        suppressContentEditableWarning={true}
                        onBlur={(e) => isEditable && handleChange(`sections.${index}.subtitle`, e.target.textContent)}
                      >
                        {section.subtitle}
                      </p>
                    )}
                    
                    <h2 
                      className={`${isMainSection ? textSizes.title : 'text-3xl md:text-4xl'} font-bold text-gray-900 mb-4 leading-tight`}
                      contentEditable={isEditable}
                      suppressContentEditableWarning={true}
                      onBlur={(e) => isEditable && handleChange(`sections.${index}.title`, e.target.textContent)}
                    >
                      {section.title}
                    </h2>
                    
                    <p 
                      className={`${isMainSection ? textSizes.subtitle : 'text-lg'} text-gray-600 mb-8 leading-relaxed`}
                      contentEditable={isEditable}
                      suppressContentEditableWarning={true}
                      onBlur={(e) => isEditable && handleChange(`sections.${index}.description`, e.target.textContent)}
                    >
                      {section.description}
                    </p>
                    
                    {/* CTA Buttons for main section */}
                    {isMainSection && (
                      <div className="flex flex-wrap gap-4">
                        {section.cta && (
                          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow-sm">
                            {section.cta.text}
                          </button>
                        )}
                        {section.secondaryCta && (
                          <button className="border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:border-gray-400 hover:bg-gray-50 transition">
                            {section.secondaryCta.text}
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                  
                  {/* Image/Graphic */}
                  <div className={`${!isLeftAligned ? 'lg:order-1' : 'lg:order-2'} relative`}>
                    {section.image ? (
                      <img 
                        src={section.image} 
                        alt={section.imageAlt || section.title}
                        className="w-full h-auto rounded-lg shadow-lg"
                      />
                    ) : (
                      <div className="bg-gray-100 rounded-lg aspect-video flex items-center justify-center">
                        <div className="text-center p-8">
                          <div className="text-6xl mb-4">📸</div>
                          <p className="text-gray-500">Image placeholder</p>
                          {isEditable && (
                            <p className="text-sm text-gray-400 mt-2">Click to upload image</p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

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
          return <MotiveTemplate />;  // Changed to use Motive style for modern
        case 'gradient':
          return <ModernTemplate />;  // Keep the old modern as gradient option
        case 'motive':
          return <MotiveTemplate />;
        default:
          return <MotiveTemplate />;
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