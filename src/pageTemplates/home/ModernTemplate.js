import React from 'react';
import { createTemplateComponent, TemplateProps, HomeDataShape } from '../templateTypes';
import TemplateHero from '../shared/TemplateHero';

function ModernTemplate({ data, isEditable, onChange }) {
  return (
    <div>
      {/* Hero Banner - HeroSection-motive */}
      <section className="relative bg-cover bg-center bg-gray-900" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80")'}}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 container mx-auto px-6 py-32 min-h-[80vh]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center min-h-[60vh]">
            <div className="max-w-prose text-left">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Understand user flow and
                <strong className="text-indigo-400"> increase </strong>
                conversions
              </h1>

              <p className="text-xl text-gray-200 mb-8 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque, nisi. Natus, provident accusamus impedit minima harum corporis iusto. Empower your operations with superior insight and automation.
              </p>

              <div className="flex flex-wrap gap-4 mb-6">
                <button className="bg-indigo-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-indigo-700 transition-all duration-200 shadow-lg">
                  Get Started
                </button>

                <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-gray-900 transition-all duration-200">
                  Watch Demo
                </button>
              </div>
            </div>

            <div className="relative">
              <img
                alt="Hero"
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                className="w-full h-96 md:h-[500px] rounded-lg object-cover shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

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
                          // Image content for even rows (0, 2, 4...)
                          <img 
                            src={feature.image || '/BlackSquareTempImage.jpg'} 
                            alt={feature.title}
                            className="w-full h-full object-cover rounded-lg shadow-lg"
                          />
                        )}
                      </div>
                      
                      {/* Column 2 - Image or Text based on index */}
                      <div className={!isEven ? "h-80 flex flex-col justify-center p-6 bg-yellow-200 rounded-lg border-4 border-red-500" : "h-80"}>
                        {!isEven ? (
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
                        ) : (
                          // Image content for odd rows (1, 3, 5...)
                          <img 
                            src={feature.image || '/BlackSquareTempImage.jpg'} 
                            alt={feature.title}
                            className="w-full h-full object-cover rounded-lg shadow-lg"
                          />
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