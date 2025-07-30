import React from 'react';
import { createTemplateComponent, TemplateProps, HomeDataShape } from '../templateTypes';
import TemplateContainer from '../shared/TemplateContainer';
import TemplateHero from '../shared/TemplateHero';
import TemplateGrid from '../shared/TemplateGrid';

function ClassicTemplate({ data, isEditable, onChange }) {
  return (
    <div>
      {/* Hero Section - Uses sections structure */}
      <TemplateHero
        data={data}
        isEditable={isEditable}
        onChange={onChange}
        template="classic"
      />
      
      {/* Features Section */}
      {data.features && data.features.length > 0 && (
        <TemplateContainer padding="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-xl text-gray-600">Professional workspace solutions</p>
          </div>
          
          <TemplateGrid columns={{ sm: 1, md: 3 }} gap="gap-6">
            {data.features.map((feature, index) => (
              <div key={index} className="text-center p-6 border border-gray-200 rounded-lg">
                <div className="text-3xl mb-4">{feature.icon}</div>
                {isEditable ? (
                  <>
                    <input
                      type="text"
                      value={feature.title || ''}
                      onChange={(e) => onChange(`features.${index}.title`, e.target.value)}
                      className="text-lg font-semibold mb-3 w-full text-center border rounded p-2"
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
                    <h3 className="text-lg font-semibold mb-3">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </>
                )}
              </div>
            ))}
          </TemplateGrid>
        </TemplateContainer>
      )}
    </div>
  );
}

ClassicTemplate.propTypes = {
  ...TemplateProps,
  data: HomeDataShape
};

export default createTemplateComponent(ClassicTemplate, 'ClassicTemplate');