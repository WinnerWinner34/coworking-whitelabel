import React from 'react';
import { createTemplateComponent, TemplateProps, HomeDataShape } from '../templateTypes';
import TemplateContainer from '../shared/TemplateContainer';
import TemplateHero from '../shared/TemplateHero';
import TemplateGrid from '../shared/TemplateGrid';

function MinimalTemplate({ data, isEditable, onChange }) {
  return (
    <div>
      {/* Hero Section - Uses sections structure */}
      <TemplateHero
        data={data}
        isEditable={isEditable}
        onChange={onChange}
        template="minimal"
      />
      
      {/* Features Section */}
      {data.features && data.features.length > 0 && (
        <TemplateContainer padding="py-12">
          <TemplateGrid columns={{ sm: 1, md: 3 }} gap="gap-12">
            {data.features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl mb-6 text-gray-400">{feature.icon}</div>
                {isEditable ? (
                  <>
                    <input
                      type="text"
                      value={feature.title || ''}
                      onChange={(e) => onChange(`features.${index}.title`, e.target.value)}
                      className="text-lg font-medium mb-4 w-full text-center border rounded p-2"
                      placeholder="Feature title..."
                    />
                    <textarea
                      value={feature.description || ''}
                      onChange={(e) => onChange(`features.${index}.description`, e.target.value)}
                      className="text-gray-600 text-sm w-full border rounded p-2"
                      rows="2"
                      placeholder="Feature description..."
                    />
                  </>
                ) : (
                  <>
                    <h3 className="text-lg font-medium mb-4 text-gray-900">{feature.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
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

MinimalTemplate.propTypes = {
  ...TemplateProps,
  data: HomeDataShape
};

export default createTemplateComponent(MinimalTemplate, 'MinimalTemplate');