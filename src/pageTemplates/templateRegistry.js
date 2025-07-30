import { lazy } from 'react';

export const templateRegistry = {
  home: {
    modern: lazy(() => import('./home/ModernTemplate')),
    classic: lazy(() => import('./home/ClassicTemplate')),
    gradient: lazy(() => import('./home/GradientTemplate')),
    minimal: lazy(() => import('./home/MinimalTemplate'))
  },
  // Infrastructure ready for future templates - fallback to current components
  about: {
    default: () => null // Will use existing About page component
  },
  team: {
    default: () => null // Will use existing Team page component
  },
  news: {
    default: () => null // Will use existing News page component
  },
  events: {
    default: () => null // Will use existing Events page component
  }
};

// Helper functions
export function getAvailableTemplates(pageId) {
  return Object.keys(templateRegistry[pageId] || {});
}

export function templateExists(pageId, templateId) {
  return !!(templateRegistry[pageId]?.[templateId]);
}

export function getTemplateComponent(pageId, templateId) {
  return templateRegistry[pageId]?.[templateId];
}

// Template metadata for admin interface
export const templateMetadata = {
  home: {
    modern: { 
      name: 'Modern', 
      description: 'Bold gradients and contemporary design',
      preview: '/template-previews/modern.jpg'
    },
    classic: { 
      name: 'Classic', 
      description: 'Professional and timeless layout',
      preview: '/template-previews/classic.jpg'
    },
    gradient: { 
      name: 'Gradient', 
      description: 'Vibrant colors and dynamic gradients',
      preview: '/template-previews/gradient.jpg'
    },
    minimal: { 
      name: 'Minimal', 
      description: 'Clean and focused simplicity',
      preview: '/template-previews/minimal.jpg'
    }
  },
  // Placeholders for future implementation
  about: {
    default: { name: 'Default', description: 'Current layout' }
  },
  team: {
    default: { name: 'Default', description: 'Current layout' }
  },
  news: {
    default: { name: 'Default', description: 'Current layout' }
  },
  events: {
    default: { name: 'Default', description: 'Current layout' }
  }
};