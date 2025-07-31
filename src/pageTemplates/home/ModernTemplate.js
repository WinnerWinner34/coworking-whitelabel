import React from 'react';
import { createTemplateComponent, TemplateProps, HomeDataShape } from '../templateTypes';

function ModernTemplate({ data, isEditable, onChange }) {
  const handleChange = (field, value) => {
    if (onChange) {
      onChange(field, value);
    }
  };

  return (
    <div>
      {/* Hero Banner - HeroSection-motive */}
      <section className="bg-gray-100 dark:bg-gray-800">
        <div className="container mx-auto px-6 py-18 md:py-50 lg:py-50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="max-w-prose text-left">
            <h1 
              className="text-4xl font-bold text-gray-900 sm:text-5xl dark:text-white"
              contentEditable={isEditable}
              suppressContentEditableWarning={true}
              onBlur={(e) => isEditable && handleChange('hero.title', e.target.textContent)}
            >
              {data?.hero?.title || (
                <>
                  Understand user flow and
                  <strong className="text-indigo-600"> increase </strong>
                  conversions
                </>
              )}
            </h1>

            <p 
              className="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed dark:text-gray-200"
              contentEditable={isEditable}
              suppressContentEditableWarning={true}
              onBlur={(e) => isEditable && handleChange('hero.subtitle', e.target.textContent)}
            >
              {data?.hero?.subtitle || "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque, nisi. Natus, provident accusamus impedit minima harum corporis iusto."}
            </p>

            <div className="mt-8 flex flex-wrap gap-4 text-center">
              <button className="block w-full rounded bg-indigo-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-indigo-700 focus:outline-none focus:ring active:bg-rose-500 sm:w-auto">
                Get Started
              </button>

              <button className="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-indigo-600 shadow hover:text-indigo-700 focus:outline-none focus:ring active:text-indigo-500 sm:w-auto border border-indigo-600">
                Learn More
              </button>
            </div>
          </div>

          <div className="relative">
            {isEditable ? (
              <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg h-64 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-gray-500 mb-2">Hero Image</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        // Handle image upload logic here
                        const reader = new FileReader();
                        reader.onload = (event) => {
                          handleChange('hero.image', event.target.result);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="text-sm"
                  />
                </div>
              </div>
            ) : (
              <img
                alt="Hero"
                src={data?.hero?.image || "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"}
                className="h-64 w-full rounded-lg object-cover shadow-lg"
              />
            )}
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
              <h2 
                className="text-4xl font-bold text-gray-900 mb-4"
                contentEditable={isEditable}
                suppressContentEditableWarning={true}
                onBlur={(e) => isEditable && handleChange('features.title', e.target.textContent)}
              >
                {data?.features?.title || "Why Choose Us"}
              </h2>
              <p 
                className="text-xl text-gray-600"
                contentEditable={isEditable}
                suppressContentEditableWarning={true}
                onBlur={(e) => isEditable && handleChange('features.subtitle', e.target.textContent)}
              >
                {data?.features?.subtitle || "Premium workspace solutions"}
              </p>
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
                                onChange={(e) => handleChange(`features.${index}.title`, e.target.value)}
                                className="text-xl font-bold text-gray-800 mb-4 w-full border rounded p-2"
                                placeholder="Feature title..."
                              />
                              <textarea
                                value={feature.description || ''}
                                onChange={(e) => handleChange(`features.${index}.description`, e.target.value)}
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
                                onChange={(e) => handleChange(`features.${index}.title`, e.target.value)}
                                className="text-xl font-bold text-gray-800 mb-4 w-full border rounded p-2"
                                placeholder="Feature title..."
                              />
                              <textarea
                                value={feature.description || ''}
                                onChange={(e) => handleChange(`features.${index}.description`, e.target.value)}
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