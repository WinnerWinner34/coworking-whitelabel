import React from 'react';
import PropTypes from 'prop-types';

// This component handles the SECTIONS-based hero structure used by current Hero.js
export default function TemplateHero({ 
  data, 
  isEditable, 
  onChange,
  template = 'modern'
}) {
  
  const handleChange = (field, value) => {
    if (onChange) {
      onChange(field, value);
    }
  };

  // Get size classes based on template
  const getSizeClasses = (template) => {
    switch (template) {
      case 'classic':
        return 'py-20 md:py-28';
      case 'modern':
      case 'gradient':
        return 'py-24 md:py-32';
      case 'minimal':
        return 'py-16 md:py-24';
      default:
        return 'py-24 md:py-32';
    }
  };

  const getTextSizes = (template, isMainSection = true) => {
    const base = {
      'classic': { title: 'text-4xl md:text-5xl', subtitle: 'text-xl' },
      'modern': { title: 'text-5xl md:text-6xl', subtitle: 'text-2xl' },
      'gradient': { title: 'text-5xl md:text-6xl', subtitle: 'text-2xl' },
      'minimal': { title: 'text-4xl md:text-5xl', subtitle: 'text-lg' }
    };
    
    return base[template] || base.modern;
  };

  // Render sections-based hero (matches current Hero.js structure)
  const renderSectionsHero = () => {
    const sections = data?.hero?.sections || [];
    const textSizes = getTextSizes(template);
    
    return (
      <div>
        {sections.map((section, index) => {
          const isMainSection = index === 0;
          const isLeftAligned = index % 2 === 0;
          
          return (
            <div 
              key={index}
              className={`${isMainSection ? getSizeClasses(template) : 'py-20 md:py-28'} ${
                index > 0 ? 'border-t border-gray-100' : ''
              } ${getBackgroundForTemplate(template, index)}`}
            >
              <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[500px]">
                  {/* Text Content */}
                  <div className={`${!isLeftAligned ? 'md:order-2' : 'md:order-1'} space-y-6`}>
                    {/* Subtitle/Category */}
                    {section.subtitle && (
                      <div className="mb-4">
                        <span 
                          className="inline-block bg-blue-50 text-blue-700 font-semibold text-sm uppercase tracking-wider px-4 py-2 rounded-full"
                          contentEditable={isEditable}
                          suppressContentEditableWarning={true}
                          onBlur={(e) => isEditable && handleChange(`hero.sections.${index}.subtitle`, e.target.textContent)}
                        >
                          {section.subtitle}
                        </span>
                      </div>
                    )}
                    
                    {/* Main Title */}
                    <h2 
                      className={`${isMainSection ? textSizes.title : 'text-4xl md:text-5xl'} font-bold ${getTextColorForTemplate(template)} mb-6 leading-tight`}
                      contentEditable={isEditable}
                      suppressContentEditableWarning={true}
                      onBlur={(e) => isEditable && handleChange(`hero.sections.${index}.title`, e.target.textContent)}
                    >
                      {section.title}
                    </h2>
                    
                    {/* Description */}
                    <p 
                      className={`${isMainSection ? textSizes.subtitle : 'text-lg'} ${getSubtextColorForTemplate(template)} mb-8 leading-relaxed`}
                      contentEditable={isEditable}
                      suppressContentEditableWarning={true}
                      onBlur={(e) => isEditable && handleChange(`hero.sections.${index}.description`, e.target.textContent)}
                    >
                      {section.description}
                    </p>
                    
                    {/* CTA Button for main section */}
                    {isMainSection && (
                      <div>
                        <button className={`${getButtonStyleForTemplate(template)} px-8 py-4 rounded-lg font-semibold transition-all duration-200`}>
                          Get Started
                        </button>
                      </div>
                    )}
                  </div>
                  
                  {/* Image/Visual Content */}
                  <div className={`${!isLeftAligned ? 'md:order-1' : 'md:order-2'}`}>
                    {section.image ? (
                      <img 
                        src={section.image} 
                        alt={section.title}
                        className="w-full h-96 object-cover rounded-lg shadow-xl"
                      />
                    ) : (
                      <div className="w-full h-96 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-lg shadow-xl flex items-center justify-center">
                        <div className="text-center p-8">
                          <div className="text-6xl mb-4">🏢</div>
                          <p className="text-gray-600">Premium Workspace</p>
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

  return renderSectionsHero();
}

// Template-specific styling helpers
function getBackgroundForTemplate(template, index) {
  const isEven = index % 2 === 0;
  
  switch (template) {
    case 'modern':
      return isEven ? 'bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white' : 'bg-white';
    case 'classic':
      return isEven ? 'bg-slate-900 text-white' : 'bg-gray-50';
    case 'gradient':
      return isEven ? 'bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white' : 'bg-gradient-to-br from-gray-50 to-white';
    case 'minimal':
      return isEven ? 'bg-white' : 'bg-gray-50';
    default:
      return isEven ? 'bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white' : 'bg-white';
  }
}

function getTextColorForTemplate(template) {
  return 'text-current'; // Uses parent container's text color
}

function getSubtextColorForTemplate(template) {
  return 'text-current opacity-90';
}

function getButtonStyleForTemplate(template) {
  switch (template) {
    case 'modern':
      return 'bg-white text-blue-600 hover:bg-gray-100';
    case 'classic':
      return 'bg-blue-600 text-white hover:bg-blue-700';
    case 'gradient':
      return 'bg-white text-green-600 hover:bg-gray-100';
    case 'minimal':
      return 'bg-gray-900 text-white hover:bg-gray-800';
    default:
      return 'bg-white text-blue-600 hover:bg-gray-100';
  }
}

TemplateHero.propTypes = {
  data: PropTypes.shape({
    hero: PropTypes.shape({
      sections: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
        image: PropTypes.string,
        subtitle: PropTypes.string
      }))
    })
  }),
  isEditable: PropTypes.bool.isRequired,
  onChange: PropTypes.func,
  template: PropTypes.string
};