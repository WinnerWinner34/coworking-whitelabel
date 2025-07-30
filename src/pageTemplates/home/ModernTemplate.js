import React from 'react';
import { createTemplateComponent, TemplateProps, HomeDataShape } from '../templateTypes';
import TemplateHero from '../shared/TemplateHero';

function ModernTemplate({ data, isEditable, onChange }) {
  return (
    <div>
      {/* Features Section - CENTERED VERSION */}
      {data.features && data.features.length > 0 && (
        <section className="py-20 min-h-screen flex items-center justify-center">
          {/* MAIN CENTERING CONTAINER */}
          <div className="container mx-auto px-6 max-w-6xl">
            
            {/* Header - Centered */}
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Us</h2>
              <p className="text-xl text-gray-600">Premium workspace solutions</p>
            </div>
            
            {/* CENTERED CONTENT WRAPPER */}
            <div className="flex flex-col items-center justify-center space-y-16">
              {data.features.map((feature, index) => {
                // Alternate layout: even index = text left/image right, odd = image left/text right
                const isEven = index % 2 === 0;
                
                return (
                  <React.Fragment key={index}>
                    {/* Feature Item - Alternating two column layout */}
                    <div className="grid grid-cols-2 gap-8 p-6 max-w-5xl w-full">
                      
                      {/* Column 1 - Text or Image based on index */}
                      <div className={isEven ? "h-80 flex flex-col justify-center p-6 bg-yellow-200 rounded-lg border-4 border-red-500" : "h-80"}>
                        {isEven ? (
                          // Text content for even rows (0, 2, 4...)
                          isEditable ? (
                            <>
                              <input
                                type="text"
                                value={feature.title || ''}
                                onChange={(e) => onChange(`features.${index}.title`, e.target.value)}
                                className="text-xl font-bold text-gray-800 mb-4 w-full border rounded p-2"
                                placeholder="Feature title..."
                              />
                              <textarea
                                value={feature.description || ''}
                                onChange={(e) => onChange(`features.${index}.description`, e.target.value)}
                                className="text-gray-600 w-full border rounded p-2 flex-1 resize-none"
                                placeholder="Feature description..."
                              />
                            </>
                          ) : (
                            <>
                              <h3 className="text-2xl font-bold text-gray-800 mb-4">{feature.title}</h3>
                              <p className="text-lg text-gray-600 leading-relaxed">{feature.description}</p>
                            </>
                          )
                        ) : (
                          // Image content for odd rows (1, 3, 5...)
                          <img 
                            src={feature.image || '/BlackSquareTempImage.jpg'} 
                            alt={feature.title}
                            className="w-full h-full object-cover rounded-lg shadow-lg"
                          />
                        )}
                      </div>
                      
                      {/* Column 2 - Image or Text based on index */}
                      <div className={isEven ? "h-80" : "h-80 flex flex-col justify-center p-6 bg-yellow-200 rounded-lg border-4 border-red-500"}>
                        {isEven ? (
                          // Image content for even rows (0, 2, 4...)
                          <img 
                            src={feature.image || '/BlackSquareTempImage.jpg'} 
                            alt={feature.title}
                            className="w-full h-full object-cover rounded-lg shadow-lg"
                          />
                        ) : (
                          // Text content for odd rows (1, 3, 5...)
                          isEditable ? (
                            <>
                              <input
                                type="text"
                                value={feature.title || ''}
                                onChange={(e) => onChange(`features.${index}.title`, e.target.value)}
                                className="text-xl font-bold text-gray-800 mb-4 w-full border rounded p-2"
                                placeholder="Feature title..."
                              />
                              <textarea
                                value={feature.description || ''}
                                onChange={(e) => onChange(`features.${index}.description`, e.target.value)}
                                className="text-gray-600 w-full border rounded p-2 flex-1 resize-none"
                                placeholder="Feature description..."
                              />
                            </>
                          ) : (
                            <>
                              <h3 className="text-2xl font-bold text-gray-800 mb-4">{feature.title}</h3>
                              <p className="text-lg text-gray-600 leading-relaxed">{feature.description}</p>
                            </>
                          )
                        )}
                      </div>
                    </div>
                    
                    {/* Subtle divider between items - CENTERED */}
                    {index < data.features.length - 1 && (
                      <div className="flex justify-center w-full">
                        <div className="w-24 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                      </div>
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