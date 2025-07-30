// src/components/shared/Hero.js
// Using new PageTemplates architecture

import React from 'react';
import { usePageTemplate, useTemplateSettings } from '../../hooks/useTemplateSettings';
import { templateRegistry } from '../../pageTemplates/templateRegistry';
import { TemplateTypes } from '../../pageTemplates/templateTypes';

export default function Hero({ data, isEditable = false, onChange, pageId = 'home' }) {
  const { template } = usePageTemplate(pageId);
  const { settings } = useTemplateSettings();
  const heroSize = settings?.pages?.[pageId]?.heroSize || 'medium';

  console.log('Hero template:', template, 'for pageId:', pageId);
  console.log('Hero data received:', data);

  // Use the new template registry to render
  const renderHero = () => {
    try {
      // Prepare options for template rendering
      const options = {
        isEditable,
        onChange: (field, value) => {
          if (onChange) {
            // Handle both direct fields and nested fields
            if (field.startsWith('hero.')) {
              onChange(field, value);
            } else {
              onChange(`hero.${field}`, value);
            }
          }
        },
        heroSize
      };
      
      // Render using the template registry
      const rendered = templateRegistry.renderTemplate(
        TemplateTypes.HERO,
        template || 'motive',
        data,
        options
      );
      
      if (!rendered) {
        console.error('Failed to render hero template:', template);
        return <div className="p-8 text-center text-gray-500">Hero template not found</div>;
      }
      
      return rendered;
    } catch (error) {
      console.error('Hero rendering error:', error);
      return <div className="p-8 text-center text-red-500">Error rendering hero</div>;
    }
  };

  return (
    <div className="relative">
      {isEditable && (
        <div className="absolute top-4 right-4 z-20 bg-yellow-100 border border-yellow-300 rounded px-3 py-1 text-sm font-medium">
          Template: <strong className="text-yellow-800">{template}</strong>
        </div>
      )}
      {renderHero()}
    </div>
  );
}