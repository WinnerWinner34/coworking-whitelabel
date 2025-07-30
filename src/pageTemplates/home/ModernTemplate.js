import React from 'react';
import { createTemplateComponent, TemplateProps, HomeDataShape } from '../templateTypes';
import TemplateContainer from '../shared/TemplateContainer';
import TemplateHero from '../shared/TemplateHero';
import TemplateGrid from '../shared/TemplateGrid';
import TemplateCard from '../shared/TemplateCard';

function ModernTemplate({ data, isEditable, onChange }) {
  return (
    <div>
      {/* Hero Section - Uses sections structure like current Hero.js */}
      <TemplateHero
        data={data}
        isEditable={isEditable}
        onChange={onChange}
        template="modern"
      />
      
      {/* Features Section */}
      {data.features && data.features.length > 0 && (
        <TemplateContainer padding="py-20" background="bg-gray-50">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Us</h2>
            <p className="text-xl text-gray-600">Premium workspace solutions</p>
          </div>
          
          <TemplateGrid columns={{ sm: 1, md: 2, lg: 3 }}>
            {data.features.map((feature, index) => (
              <TemplateCard key={index} hover shadow="lg">
                <div className="text-center">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  {isEditable ? (
                    <>
                      <input
                        type="text"
                        value={feature.title || ''}
                        onChange={(e) => onChange(`features.${index}.title`, e.target.value)}
                        className="text-xl font-semibold mb-3 w-full text-center border rounded p-2"
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
                      <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </>
                  )}
                </div>
              </TemplateCard>
            ))}
          </TemplateGrid>
        </TemplateContainer>
      )}
    </div>
  );
}

ModernTemplate.propTypes = {
  ...TemplateProps,
  data: HomeDataShape
};

export default createTemplateComponent(ModernTemplate, 'ModernTemplate');