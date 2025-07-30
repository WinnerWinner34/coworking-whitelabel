import PropTypes from 'prop-types';

// Template type constants
export const TemplateTypes = {
  HERO: 'hero',
  FEATURES: 'features',
  CTA: 'cta',
  SOCIAL_PROOF: 'socialProof',
  TEAM: 'team',
  PRICING: 'pricing',
  TESTIMONIALS: 'testimonials',
  CONTACT: 'contact'
};

// Standard template props that ALL templates must accept
export const TemplateProps = {
  data: PropTypes.object.isRequired,
  isEditable: PropTypes.bool.isRequired,
  onChange: PropTypes.func  // This will be updateField from usePageData
};

// HOME PAGE data shape matches current Hero.js expectations
export const HomeDataShape = PropTypes.shape({
  hero: PropTypes.shape({
    title: PropTypes.string,
    subtitle: PropTypes.string,
    sections: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
      image: PropTypes.string,
      subtitle: PropTypes.string
    }))
  }),
  features: PropTypes.arrayOf(PropTypes.shape({
    icon: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string
  }))
});

// Placeholder shapes for future implementation
export const TeamDataShape = PropTypes.object;
export const AboutDataShape = PropTypes.object;
export const NewsDataShape = PropTypes.object;
export const EventsDataShape = PropTypes.object;

// Template validation helper
export function validateTemplateProps(props, componentName) {
  const required = ['data', 'isEditable'];
  const missing = required.filter(prop => !(prop in props));
  
  if (missing.length > 0) {
    console.error(`${componentName} missing required props: ${missing.join(', ')}`);
    return false;
  }
  
  if (typeof props.isEditable !== 'boolean') {
    console.error(`${componentName}: isEditable must be boolean, got ${typeof props.isEditable}`);
    return false;
  }
  
  return true;
}

export function createTemplateComponent(Component, displayName) {
  const TemplateComponent = (props) => {
    if (!validateTemplateProps(props, displayName)) {
      return (
        <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
          <h3 className="text-red-800 font-semibold">Template Error</h3>
          <p className="text-red-600">Invalid props for {displayName}</p>
        </div>
      );
    }
    return <Component {...props} />;
  };
  
  TemplateComponent.displayName = displayName;
  return TemplateComponent;
}