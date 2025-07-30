import React from 'react';
import { createTemplateComponent, TemplateProps, HomeDataShape } from '../templateTypes';
import TemplateContainer from '../shared/TemplateContainer';
import TemplateHero from '../shared/TemplateHero';
import TemplateGrid from '../shared/TemplateGrid';

function GradientTemplate({ data, isEditable, onChange }) {
  return (
    <div>
      {/* Hero Section - Uses sections structure */}
      <TemplateHero
        data={data}
        isEditable={isEditable}
        onChange={onChange}
        template="gradient"
      />
      
      {/* Features Section */}
      {data.features && data.features.length > 0 && (
        <TemplateContainer padding="py-20" background="bg-gradient-to-br from-gray-50 to-white">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
              Premium Features
            </h2>
            <p className="text-xl text-gray-600">Everything you need to succeed</p>
          </div>
          
          <TemplateGrid columns={{ sm: 1, md: 2, lg: 3 }} gap="gap-8">
            {data.features.map((feature, index) => (
              <div key={index} className="relative p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-blue-500 rounded-t-2xl"></div>
                <div className="text-center">
                  <div className="text-4xl mb-6">{feature.icon}</div>
                  {isEditable ? (
                    <>
                      <input
                        type="text"
                        value={feature.title || ''}
                        onChange={(e) => onChange(`features.${index}.title`, e.target.value)}
                        className="text-xl font-bold mb-4 w-full text-center border rounded p-2"
                        placeholder="Feature title..."
                      />
                      <textarea
                        value={feature.description || ''}
                        onChange={(e) => onChange(`features.${index}.description`, e.target.value)}
                        className="text-gray-600 w-full border rounded p-2"
                        rows="2"
                        placeholder="Feature description..."
                      />
                    </>
                  ) : (
                    <>
                      <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </>
                  )}
                </div>
              </div>
            ))}
          </TemplateGrid>
        </TemplateContainer>
      )}
    </div>
  );
}

GradientTemplate.propTypes = {
  ...TemplateProps,
  data: HomeDataShape
};

export default createTemplateComponent(GradientTemplate, 'GradientTemplate');