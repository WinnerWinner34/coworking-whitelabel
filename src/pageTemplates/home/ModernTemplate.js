import React from 'react';
import { createTemplateComponent, TemplateProps, HomeDataShape } from '../templateTypes';
import TemplateHero from '../shared/TemplateHero';

function ModernTemplate({ data, isEditable, onChange }) {
  return (
    <div>
      {/* Features Section - Based on claudePlan.md */}
      {data.features && data.features.length > 0 && (
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Us</h2>
              <p className="text-xl text-gray-600">Premium workspace solutions</p>
            </div>
            
            <div className="space-y-4">
              {data.features.map((feature, index) => {
                // Alternate layout: even index = text left/image right, odd = image left/text right
                const isEven = index % 2 === 0;
                
                return (
                  <React.Fragment key={index}>
                    {/* Feature Item - No borders, shadows, or background */}
                    <div className={`flex items-center space-x-8 p-6 ${isEven ? '' : 'flex-row-reverse space-x-reverse'}`}>
                      {/* Text Box - Equal size (flex-1) */}
                      <div className="flex-1">
                        {isEditable ? (
                          <>
                            <input
                              type="text"
                              value={feature.title || ''}
                              onChange={(e) => onChange(`features.${index}.title`, e.target.value)}
                              className="text-xl font-bold text-gray-800 mb-2 w-full border rounded p-2"
                              placeholder="Feature title..."
                            />
                            <textarea
                              value={feature.description || ''}
                              onChange={(e) => onChange(`features.${index}.description`, e.target.value)}
                              className="text-gray-600 w-full border rounded p-2"
                              rows="3"
                              placeholder="Feature description..."
                            />
                          </>
                        ) : (
                          <>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                            <p className="text-gray-600">{feature.description}</p>
                          </>
                        )}
                      </div>
                      
                      {/* Image Box - Equal size (flex-1) */}
                      <div className="flex-1">
                        <img 
                          src={feature.image || '/BlackSquareTempImage.jpg'} 
                          alt={feature.title}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      </div>
                    </div>
                    
                    {/* Divider between items */}
                    {index < data.features.length - 1 && (
                      <div className="border-t border-gray-300"></div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

ModernTemplate.propTypes = {
  ...TemplateProps,
  data: HomeDataShape
};

export default createTemplateComponent(ModernTemplate, 'ModernTemplate');