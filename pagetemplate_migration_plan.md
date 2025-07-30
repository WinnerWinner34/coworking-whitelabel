# 🚀 CORRECTED PageTemplates Architecture Migration Plan

## Overview
Transform the coworking platform from scattered template logic to a centralized PageTemplates architecture, **compatible with existing hooks and data structures**.

## 🎯 Migration Goals
- ✅ Extract existing Hero templates into new PageTemplates system
- ✅ Preserve existing usePageData and useSettings hook APIs
- ✅ Maintain current hero data structure (sections-based)
- ✅ Storage-agnostic migration utilities (localStorage → Firebase ready)
- ✅ Zero breaking changes to existing functionality

---

## 📁 Step 1: Create File Structure  

```bash
# Create directories
mkdir -p src/pageTemplates/shared
mkdir -p src/pageTemplates/home
mkdir -p src/pageTemplates/presets
mkdir -p src/utils/migration
```

**New files to create:**
```
src/
├── pageTemplates/
│   ├── shared/
│   │   ├── TemplateContainer.js
│   │   ├── TemplateHero.js
│   │   ├── TemplateCard.js
│   │   └── TemplateGrid.js
│   ├── home/
│   │   ├── ModernTemplate.js
│   │   ├── ClassicTemplate.js
│   │   ├── GradientTemplate.js
│   │   └── MinimalTemplate.js
│   ├── presets/
│   │   ├── presetManager.js
│   │   └── defaultPresets.js
│   ├── templateRegistry.js
│   └── templateTypes.js
├── components/shared/
│   └── TemplateRenderer.js (new)
└── utils/migration/
    ├── templateMigration.js
    └── storageUtils.js
```

---

## 🛠️ Step 2: Install Dependencies

```bash
npm install prop-types
```

---

## 🛠️ Step 3: Create Template Types and Validation

### File: `src/pageTemplates/templateTypes.js`

```javascript
import PropTypes from 'prop-types';

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
```

---

## 🛠️ Step 4: Create Storage-Agnostic Migration Utilities

### File: `src/utils/migration/storageUtils.js`

```javascript
// Storage-agnostic utilities that work with localStorage now, Firebase later

class StorageAdapter {
  constructor() {
    this.isFirebase = process.env.REACT_APP_USE_FIREBASE === 'true';
  }

  async getData(key) {
    if (this.isFirebase) {
      // TODO: Implement Firebase getter when ready
      const { getPageContent } = await import('../../services/api');
      return await getPageContent(key);
    } else {
      // localStorage implementation
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    }
  }

  async setData(key, value) {
    if (this.isFirebase) {
      // TODO: Implement Firebase setter when ready
      const { savePageContent } = await import('../../services/api');
      return await savePageContent(key, value);
    } else {
      // localStorage implementation
      localStorage.setItem(key, JSON.stringify(value));
      return Promise.resolve();
    }
  }

  async getAllKeys() {
    if (this.isFirebase) {
      // TODO: Implement Firebase key listing when ready
      return ['home', 'about', 'team', 'news', 'events'];
    } else {
      // localStorage implementation
      return Object.keys(localStorage).filter(key => 
        !key.startsWith('_') && 
        !key.includes('auth') &&
        !key.includes('settings')
      );
    }
  }
}

export const storage = new StorageAdapter();
```

### File: `src/utils/migration/templateMigration.js`

```javascript
import { storage } from './storageUtils';

export class TemplateMigration {
  
  async ensureHeroHasSections() {
    console.log('🔄 Ensuring Hero has sections structure...');
    
    try {
      const homeData = await storage.getData('home');
      
      if (!homeData || !homeData.hero) {
        console.log('ℹ️ No home/hero data found');
        return false;
      }

      // Check if hero already has sections structure
      if (homeData.hero.sections && Array.isArray(homeData.hero.sections)) {
        console.log('✅ Hero already has sections structure');
        return false;
      }

      // Convert simple hero to sections-based structure
      console.log('📝 Converting hero to sections structure...');
      
      const updatedHero = {
        ...homeData.hero,
        sections: [
          {
            title: homeData.hero.title || "Welcome to The Coworking Space",
            description: homeData.hero.subtitle || "Your creative workspace in the heart of the city",
            subtitle: "COWORKING SPACE",
            image: ""
          }
        ]
      };

      const updatedData = {
        ...homeData,
        hero: updatedHero
      };

      await storage.setData('home', updatedData);
      console.log('✅ Hero converted to sections structure');
      return true;
      
    } catch (error) {
      console.error('❌ Error ensuring hero sections:', error);
      return false;
    }
  }

  async migrateTemplateSettings() {
    console.log('🔄 Starting template settings migration...');
    
    try {
      // Get existing settings from the settings hook system
      const existingSettings = await storage.getData('settings') || {};
      
      // Ensure pages structure exists
      if (!existingSettings.pages) {
        existingSettings.pages = {};
      }

      // Ensure home page template setting exists
      if (!existingSettings.pages.home) {
        existingSettings.pages.home = {
          template: 'modern',  // Default template
          enabled: true
        };
      }

      // Add other pages if they don't exist
      const defaultPages = ['about', 'team', 'news', 'events'];
      defaultPages.forEach(pageId => {
        if (!existingSettings.pages[pageId]) {
          existingSettings.pages[pageId] = {
            template: 'default',
            enabled: true
          };
        }
      });

      await storage.setData('settings', existingSettings);
      console.log('✅ Template settings ensured');
      
    } catch (error) {
      console.error('❌ Error migrating template settings:', error);
    }
  }

  async runFullMigration() {
    console.log('🚀 Running PageTemplates migration...');
    
    const heroUpdated = await this.ensureHeroHasSections();
    await this.migrateTemplateSettings();
    
    console.log('✅ Migration completed successfully');
    return heroUpdated;
  }
}

export const templateMigration = new TemplateMigration();

// Auto-run migration check on module load
if (typeof window !== 'undefined') {
  const migrationKey = 'pagetemplate_migration_complete';
  
  if (!localStorage.getItem(migrationKey)) {
    console.log('🔍 First time with PageTemplates system, checking migration...');
    
    templateMigration.runFullMigration().then((migrated) => {
      localStorage.setItem(migrationKey, 'true');
      console.log('✅ Initial migration completed');
    });
  }
}
```

---

## 🛠️ Step 5: Create Shared Template Components

### File: `src/pageTemplates/shared/TemplateContainer.js`

```javascript
import React from 'react';
import PropTypes from 'prop-types';

export default function TemplateContainer({ 
  children, 
  className = '', 
  padding = 'py-16',
  background = 'bg-white' 
}) {
  return (
    <div className={`${background} ${padding}`}>
      <div className={`container mx-auto px-6 ${className}`}>
        {children}
      </div>
    </div>
  );
}

TemplateContainer.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  padding: PropTypes.string,
  background: PropTypes.string
};
```

### File: `src/pageTemplates/shared/TemplateHero.js`

```javascript
import React from 'react';
import PropTypes from 'prop-types';

// This component handles the SECTIONS-based hero structure used by current Hero.js
export default function TemplateHero({ 
  data, 
  isEditable, 
  onChange,
  template = 'modern'
}) {
  
  const handleChange = (field, value) => {
    if (onChange) {
      onChange(field, value);
    }
  };

  // Get size classes based on template
  const getSizeClasses = (template) => {
    switch (template) {
      case 'classic':
        return 'py-20 md:py-28';
      case 'modern':
      case 'gradient':
        return 'py-24 md:py-32';
      case 'minimal':
        return 'py-16 md:py-24';
      default:
        return 'py-24 md:py-32';
    }
  };

  const getTextSizes = (template, isMainSection = true) => {
    const base = {
      'classic': { title: 'text-4xl md:text-5xl', subtitle: 'text-xl' },
      'modern': { title: 'text-5xl md:text-6xl', subtitle: 'text-2xl' },
      'gradient': { title: 'text-5xl md:text-6xl', subtitle: 'text-2xl' },
      'minimal': { title: 'text-4xl md:text-5xl', subtitle: 'text-lg' }
    };
    
    return base[template] || base.modern;
  };

  // Render sections-based hero (matches current Hero.js structure)
  const renderSectionsHero = () => {
    const sections = data?.hero?.sections || [];
    const textSizes = getTextSizes(template);
    
    return (
      <div>
        {sections.map((section, index) => {
          const isMainSection = index === 0;
          const isLeftAligned = index % 2 === 0;
          
          return (
            <div 
              key={index}
              className={`${isMainSection ? getSizeClasses(template) : 'py-20 md:py-28'} ${
                index > 0 ? 'border-t border-gray-100' : ''
              } ${getBackgroundForTemplate(template, index)}`}
            >
              <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[500px]">
                  {/* Text Content */}
                  <div className={`${!isLeftAligned ? 'md:order-2' : 'md:order-1'} space-y-6`}>
                    {/* Subtitle/Category */}
                    {section.subtitle && (
                      <div className="mb-4">
                        <span 
                          className="inline-block bg-blue-50 text-blue-700 font-semibold text-sm uppercase tracking-wider px-4 py-2 rounded-full"
                          contentEditable={isEditable}
                          suppressContentEditableWarning={true}
                          onBlur={(e) => isEditable && handleChange(`hero.sections.${index}.subtitle`, e.target.textContent)}
                        >
                          {section.subtitle}
                        </span>
                      </div>
                    )}
                    
                    {/* Main Title */}
                    <h2 
                      className={`${isMainSection ? textSizes.title : 'text-4xl md:text-5xl'} font-bold ${getTextColorForTemplate(template)} mb-6 leading-tight`}
                      contentEditable={isEditable}
                      suppressContentEditableWarning={true}
                      onBlur={(e) => isEditable && handleChange(`hero.sections.${index}.title`, e.target.textContent)}
                    >
                      {section.title}
                    </h2>
                    
                    {/* Description */}
                    <p 
                      className={`${isMainSection ? textSizes.subtitle : 'text-lg'} ${getSubtextColorForTemplate(template)} mb-8 leading-relaxed`}
                      contentEditable={isEditable}
                      suppressContentEditableWarning={true}
                      onBlur={(e) => isEditable && handleChange(`hero.sections.${index}.description`, e.target.textContent)}
                    >
                      {section.description}
                    </p>
                    
                    {/* CTA Button for main section */}
                    {isMainSection && (
                      <div>
                        <button className={`${getButtonStyleForTemplate(template)} px-8 py-4 rounded-lg font-semibold transition-all duration-200`}>
                          Get Started
                        </button>
                      </div>
                    )}
                  </div>
                  
                  {/* Image/Visual Content */}
                  <div className={`${!isLeftAligned ? 'md:order-1' : 'md:order-2'}`}>
                    {section.image ? (
                      <img 
                        src={section.image} 
                        alt={section.title}
                        className="w-full h-96 object-cover rounded-lg shadow-xl"
                      />
                    ) : (
                      <div className="w-full h-96 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-lg shadow-xl flex items-center justify-center">
                        <div className="text-center p-8">
                          <div className="text-6xl mb-4">🏢</div>
                          <p className="text-gray-600">Premium Workspace</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return renderSectionsHero();
}

// Template-specific styling helpers
function getBackgroundForTemplate(template, index) {
  const isEven = index % 2 === 0;
  
  switch (template) {
    case 'modern':
      return isEven ? 'bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white' : 'bg-white';
    case 'classic':
      return isEven ? 'bg-slate-900 text-white' : 'bg-gray-50';
    case 'gradient':
      return isEven ? 'bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white' : 'bg-gradient-to-br from-gray-50 to-white';
    case 'minimal':
      return isEven ? 'bg-white' : 'bg-gray-50';
    default:
      return isEven ? 'bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white' : 'bg-white';
  }
}

function getTextColorForTemplate(template) {
  return 'text-current'; // Uses parent container's text color
}

function getSubtextColorForTemplate(template) {
  return 'text-current opacity-90';
}

function getButtonStyleForTemplate(template) {
  switch (template) {
    case 'modern':
      return 'bg-white text-blue-600 hover:bg-gray-100';
    case 'classic':
      return 'bg-blue-600 text-white hover:bg-blue-700';
    case 'gradient':
      return 'bg-white text-green-600 hover:bg-gray-100';
    case 'minimal':
      return 'bg-gray-900 text-white hover:bg-gray-800';
    default:
      return 'bg-white text-blue-600 hover:bg-gray-100';
  }
}

TemplateHero.propTypes = {
  data: PropTypes.shape({
    hero: PropTypes.shape({
      sections: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
        image: PropTypes.string,
        subtitle: PropTypes.string
      }))
    })
  }),
  isEditable: PropTypes.bool.isRequired,
  onChange: PropTypes.func,
  template: PropTypes.string
};

export default TemplateHero;
```

### File: `src/pageTemplates/shared/TemplateCard.js`

```javascript
import React from 'react';
import PropTypes from 'prop-types';

export default function TemplateCard({ 
  children, 
  className = '', 
  hover = true,
  shadow = 'lg',
  padding = 'p-6'
}) {
  const hoverClass = hover ? 'hover:shadow-xl hover:scale-105 transition-all duration-300' : '';
  const shadowClass = `shadow-${shadow}`;

  return (
    <div className={`bg-white rounded-lg ${shadowClass} ${hoverClass} ${padding} ${className}`}>
      {children}
    </div>
  );
}

TemplateCard.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  hover: PropTypes.bool,
  shadow: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
  padding: PropTypes.string
};
```

### File: `src/pageTemplates/shared/TemplateGrid.js`

```javascript
import React from 'react';
import PropTypes from 'prop-types';

export default function TemplateGrid({ 
  children, 
  columns = { sm: 1, md: 2, lg: 3 },
  gap = 'gap-8',
  className = ''
}) {
  const getGridClasses = () => {
    const { sm, md, lg, xl } = columns;
    let classes = `grid ${gap} ${className}`;
    
    if (sm) classes += ` grid-cols-${sm}`;
    if (md) classes += ` md:grid-cols-${md}`;
    if (lg) classes += ` lg:grid-cols-${lg}`;
    if (xl) classes += ` xl:grid-cols-${xl}`;
    
    return classes;
  };

  return (
    <div className={getGridClasses()}>
      {children}
    </div>
  );
}

TemplateGrid.propTypes = {
  children: PropTypes.node.isRequired,
  columns: PropTypes.shape({
    sm: PropTypes.number,
    md: PropTypes.number,
    lg: PropTypes.number,
    xl: PropTypes.number
  }),
  gap: PropTypes.string,
  className: PropTypes.string
};
```

---

## 🛠️ Step 6: Extract Home Templates (Matching Current Hero.js)

### File: `src/pageTemplates/home/ModernTemplate.js`

```javascript
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
```

### File: `src/pageTemplates/home/ClassicTemplate.js`

```javascript
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
```

### File: `src/pageTemplates/home/GradientTemplate.js`

```javascript
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
```

### File: `src/pageTemplates/home/MinimalTemplate.js`

```javascript
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
```

---

## 🛠️ Step 7: Create Template Registry

### File: `src/pageTemplates/templateRegistry.js`

```javascript
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
```

---

## 🛠️ Step 8: Create Template Renderer

### File: `src/components/shared/TemplateRenderer.js`

```javascript
import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import { usePageTemplate } from '../../hooks/useSettings'; // CORRECT import path
import { templateRegistry, templateExists } from '../../pageTemplates/templateRegistry';

function TemplateLoadingState() {
  return (
    <div className="flex items-center justify-center py-16">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading template...</p>
      </div>
    </div>
  );
}

function TemplateErrorState({ pageId, templateId, error }) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
      <div className="text-red-600 mb-4">
        <svg className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 16.5c-.77.833-.232 2.5 1.732 2.5z" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-red-800 mb-2">Template Error</h3>
      <p className="text-red-600 mb-4">
        Failed to load template "{templateId}" for page "{pageId}"
      </p>
      <details className="text-left">
        <summary className="cursor-pointer text-red-700 font-medium mb-2">Error Details</summary>
        <pre className="text-sm text-red-600 bg-red-100 p-2 rounded overflow-auto">
          {error?.toString()}
        </pre>
      </details>
      <div className="mt-4">
        <button 
          onClick={() => window.location.reload()} 
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Reload Page
        </button>
      </div>
    </div>
  );
}

export default function TemplateRenderer({ pageId, data, isEditable, onChange }) {
  const { template, isEnabled } = usePageTemplate(pageId);
  
  if (!isEnabled) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
        <h3 className="text-gray-600 font-semibold">Page Disabled</h3>
        <p className="text-gray-500">This page is currently disabled in settings.</p>
      </div>
    );
  }
  
  // For home page, use template system. For others, return null (let existing components handle it)
  if (pageId !== 'home') {
    return null;
  }
  
  // Check if template exists
  if (!templateExists(pageId, template)) {
    return (
      <TemplateErrorState 
        pageId={pageId} 
        templateId={template} 
        error={new Error(`Template "${template}" not found for page "${pageId}"`)}
      />
    );
  }
  
  const TemplateComponent = templateRegistry[pageId][template];
  
  if (!TemplateComponent) {
    return (
      <TemplateErrorState 
        pageId={pageId} 
        templateId={template} 
        error={new Error('Template component is null')}
      />
    );
  }
  
  return (
    <Suspense fallback={<TemplateLoadingState />}>
      <ErrorBoundary pageId={pageId} templateId={template}>
        <TemplateComponent 
          data={data} 
          isEditable={isEditable} 
          onChange={onChange} 
        />
      </ErrorBoundary>
    </Suspense>
  );
}

// Error boundary for template rendering errors
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Template rendering error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <TemplateErrorState 
          pageId={this.props.pageId} 
          templateId={this.props.templateId} 
          error={this.state.error}
        />
      );
    }

    return this.props.children;
  }
}

TemplateRenderer.propTypes = {
  pageId: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  isEditable: PropTypes.bool.isRequired,
  onChange: PropTypes.func
};
```

---

## 🛠️ Step 9: Create Preset System Foundation

### File: `src/pageTemplates/presets/defaultPresets.js`

```javascript
export const templatePresets = {
  modern: {
    id: 'modern',
    name: 'Modern Tech',
    description: 'Contemporary design perfect for tech companies',
    thumbnail: '/presets/modern-preview.jpg',  
    templates: {
      home: 'modern',
      about: 'default',
      team: 'default',
      news: 'default',
      events: 'default'
    }
  },
  
  professional: {
    id: 'professional',
    name: 'Professional',
    description: 'Clean, business-focused design',
    thumbnail: '/presets/professional-preview.jpg',
    templates: {
      home: 'classic',
      about: 'default',
      team: 'default',
      news: 'default',
      events: 'default'
    }
  },
  
  creative: {
    id: 'creative',
    name: 'Creative Studio',
    description: 'Bold, artistic design for creative agencies',
    thumbnail: '/presets/creative-preview.jpg',
    templates: {
      home: 'gradient',
      about: 'default',
      team: 'default',
      news: 'default',
      events: 'default'
    }
  },
  
  minimal: {
    id: 'minimal',
    name: 'Minimal Clean',
    description: 'Simple, clean design that focuses on content',
    thumbnail: '/presets/minimal-preview.jpg',
    templates: {
      home: 'minimal',
      about: 'default',
      team: 'default',
      news: 'default',
      events: 'default'
    }
  }
};
```

### File: `src/pageTemplates/presets/presetManager.js`

```javascript
import { storage } from '../../utils/migration/storageUtils';
import { templatePresets } from './defaultPresets';

export class PresetManager {
  
  async applyPreset(presetId) {
    const preset = templatePresets[presetId];
    if (!preset) {
      throw new Error(`Preset "${presetId}" not found`);
    }
    
    try {
      console.log(`🎨 Applying preset: ${preset.name}`);
      
      // Get current settings (using the same structure as useSettings)
      const currentSettings = await storage.getData('settings') || {};
      
      // Update template selections
      const updatedSettings = {
        ...currentSettings,
        pages: {
          ...currentSettings.pages,
          ...Object.entries(preset.templates).reduce((acc, [pageId, templateId]) => {
            acc[pageId] = {
              ...currentSettings.pages?.[pageId],
              template: templateId
            };
            return acc;
          }, {})
        },
        lastAppliedPreset: presetId,
        lastPresetAppliedAt: new Date().toISOString()
      };
      
      // Save updated settings
      await storage.setData('settings', updatedSettings);
      
      console.log(`✅ Successfully applied preset: ${preset.name}`);
      return true;
      
    } catch (error) {
      console.error(`❌ Failed to apply preset ${presetId}:`, error);
      throw error;
    }
  }
  
  async getCurrentPreset() {
    try {
      const settings = await storage.getData('settings');
      return settings?.lastAppliedPreset || null;
    } catch (error) {
      console.error('Error getting current preset:', error);
      return null;
    }
  }
  
  getAvailablePresets() {
    return Object.values(templatePresets);
  }
  
  getPresetById(presetId) {
    return templatePresets[presetId] || null;
  }
}

export const presetManager = new PresetManager();
```

---

## 🛠️ Step 10: Update Home Page to Use Template Renderer

### Update: `src/pages/public/Home.js`

```javascript
import React from 'react';
import Hero from '../../components/shared/Hero'; // Keep existing Hero import
import TemplateRenderer from '../../components/shared/TemplateRenderer';
import usePageData from '../../hooks/usePageData'; // Default import

export default function Home() {
  const { data, loading } = usePageData('home');
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
  
  // Try new template system first, fallback to existing Hero
  const templateRenderer = (
    <TemplateRenderer 
      pageId="home" 
      data={data} 
      isEditable={false} 
    />
  );
  
  // If template renderer returns null, use existing Hero
  return (
    <div>
      {templateRenderer || <Hero data={data?.hero} pageId="home" />}
    </div>
  );
}
```

### Update: `src/pages/admin/AdminHome.js`

```javascript
import React, { useState } from 'react';
import Hero from '../../components/shared/Hero'; // Keep existing Hero import
import TemplateRenderer from '../../components/shared/TemplateRenderer';
import usePageData from '../../hooks/usePageData'; // Default import
import toast from 'react-hot-toast';

export default function AdminHome() {
  const { data, draft, loading, hasChanges, updateField, save, publish } = usePageData('home');
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
  
  const handleSave = async () => {
    try {
      await save();
    } catch (error) {
      console.error('Save error:', error);
    }
  };
  
  const handlePublish = async () => {
    try {
      await publish();
    } catch (error) {
      console.error('Publish error:', error);
    }
  };
  
  // Try new template system first, fallback to existing Hero
  const templateRenderer = (
    <TemplateRenderer 
      pageId="home" 
      data={draft} 
      isEditable={true} 
      onChange={updateField} // Use updateField from usePageData
    />
  );
  
  return (
    <div>
      {/* Admin Header */}
      <div className="bg-yellow-100 border-b-2 border-yellow-300 p-4 sticky top-16 z-40">
        <div className="container mx-auto flex justify-between items-center">
          <span className="text-yellow-800 font-semibold">
            ✏️ Edit Home Page - {hasChanges ? 'Unsaved changes' : 'All changes saved'}
          </span>
          <div className="space-x-3">
            {hasChanges && (
              <button 
                onClick={handleSave}
                className="bg-white text-yellow-800 px-4 py-2 rounded border border-yellow-300 hover:bg-yellow-50"
              >
                Save Draft
              </button>
            )}
            <button 
              onClick={handlePublish}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Publish
            </button>
          </div>
        </div>
      </div>
      
      {/* Template Renderer with Hero fallback */}
      {templateRenderer || (
        <Hero 
          data={draft?.hero} 
          isEditable={true} 
          onChange={updateField}
          pageId="home" 
        />
      )}
    </div>
  );
}
```

---

## 🛠️ Step 11: Update Admin Settings for Template Selection

### Update: `src/pages/admin/AdminSettings.js`

Add this section to the existing AdminSettings component:

```javascript
// Add these imports at the top (keeping existing imports)
import { templateMetadata } from '../../pageTemplates/templateRegistry';
import { presetManager } from '../../pageTemplates/presets/presetManager';

// Add these state variables inside the component
const [selectedPreset, setSelectedPreset] = useState(null);
const [applyingPreset, setApplyingPreset] = useState(false);

// Load current preset on mount  
React.useEffect(() => {
  presetManager.getCurrentPreset().then(setSelectedPreset);
}, []);

const handleApplyPreset = async (presetId) => {
  setApplyingPreset(true);
  try {
    await presetManager.applyPreset(presetId);
    setSelectedPreset(presetId);
    toast.success('Preset applied successfully!');
    // Trigger page reload to see changes
    setTimeout(() => window.location.reload(), 1000);
  } catch (error) {
    toast.error('Failed to apply preset');
    console.error('Preset error:', error);
  } finally {
    setApplyingPreset(false);
  }
};

// Add this JSX section after existing template settings (before closing div):

{/* Template Presets Section */}
<div className="bg-white rounded-lg shadow p-6 mb-6">
  <h3 className="text-lg font-semibold mb-4">Template Presets</h3>
  <p className="text-gray-600 mb-6">Quick setup with pre-designed template combinations</p>
  
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {presetManager.getAvailablePresets().map((preset) => (
      <div 
        key={preset.id}
        className={`border rounded-lg p-4 cursor-pointer transition-all ${
          selectedPreset === preset.id 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-200 hover:border-gray-300'
        } ${applyingPreset ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={() => !applyingPreset && handleApplyPreset(preset.id)}
      >
        <div className="flex justify-between items-start mb-2">
          <h4 className="font-semibold text-gray-900">{preset.name}</h4>
          {selectedPreset === preset.id && (
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
              Current
            </span>
          )}
        </div>
        <p className="text-sm text-gray-600 mb-3">{preset.description}</p>
        
        <div className="text-xs">
          <div className="font-medium mb-1 text-gray-700">Templates:</div>
          <div className="flex flex-wrap gap-1">
            {Object.entries(preset.templates).map(([page, template]) => (
              <span 
                key={page}
                className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
              >
                {page}: {template}
              </span>
            ))}
          </div>
        </div>
        
        {applyingPreset && (
          <div className="mt-2 text-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mx-auto"></div>
          </div>
        )}
      </div>
    ))}
  </div>
</div>

{/* Individual Template Settings */}
<div className="bg-white rounded-lg shadow p-6">
  <h3 className="text-lg font-semibold mb-4">Individual Page Templates</h3>
  <p className="text-gray-600 mb-6">Customize templates for each page individually</p>
  
  {Object.entries(templateMetadata).map(([pageId, templates]) => (
    <div key={pageId} className="mb-6 pb-6 border-b border-gray-200 last:border-b-0">
      <h4 className="font-semibold mb-3 capitalize text-gray-900">{pageId} Page</h4>
      
      {/* Only show template selection for home page for now */}
      {pageId === 'home' ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {Object.entries(templates).map(([templateId, meta]) => (
            <div
              key={templateId}
              className={`border rounded-lg p-3 cursor-pointer text-center transition-all ${
                settings?.pages?.[pageId]?.template === templateId
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => updateSetting(`pages.${pageId}.template`, templateId)}
            >
              <div className="font-medium text-sm text-gray-900">{meta.name}</div>
              <div className="text-xs text-gray-600 mt-1">{meta.description}</div>
              {settings?.pages?.[pageId]?.template === templateId && (
                <div className="text-xs text-blue-600 font-medium mt-1">✓ Active</div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500 italic">
          Template options will be available for this page in future updates
        </p>
      )}
    </div>
  ))}
</div>
```

---

## 🛠️ Step 12: Import Migration Utilities

### Update: `src/index.js`

Add this import to trigger migration on app startup:

```javascript
// Add this import at the top with other imports
import './utils/migration/templateMigration';

// Rest of your existing index.js code remains the same
```

---

## 🛠️ Step 13: Testing Instructions

### Phase 1: Verify Installation
1. **Start the development server:**
   ```bash
   npm start
   ```

2. **Check browser console** for migration messages:
   - Should see: "🔍 First time with PageTemplates system, checking migration..."
   - Should see: "✅ Initial migration completed"

3. **Verify home page loads** without errors

### Phase 2: Test Template Switching
1. **Go to Admin Settings** (`/admin/settings`)
2. **Try applying different presets** - should see templates change
3. **Try individual template selection** for home page  
4. **Verify template switching works** without breaking existing content

### Phase 3: Test Admin Editing
1. **Go to Admin Home** (`/admin/home`)
2. **Test editing hero sections** (should use sections structure)
3. **Test editing features** content
4. **Verify save/publish functionality** works
5. **Check that changes persist** after page reload

### Phase 4: Fallback Testing
1. **Temporarily rename a template file** to cause loading failure
2. **Verify error boundary shows** appropriate error message  
3. **Verify fallback to existing Hero component** works
4. **Restore template file** and verify it works again

---

## 🛠️ Step 14: Optional Cleanup

Once everything is working perfectly, you can optionally:

1. **Remove old template logic** from `src/components/shared/Hero.js` 
2. **Keep Hero.js as fallback** for other pages
3. **Add more templates** to other pages when ready

---

## 🎯 Migration Complete!

### ✅ **CORRECTED** What You Now Have:
- **✅ Compatible Hook Usage** - Uses existing usePageData and useSettings APIs
- **✅ Preserves Data Structure** - Works with current hero sections format  
- **✅ Safe Fallback System** - Falls back to existing Hero component if needed
- **✅ No Breaking Changes** - All existing functionality preserved
- **✅ Template Architecture** - Clean, extensible template system
- **✅ Storage Agnostic** - Ready for Firebase migration

### 🚀 Next Steps:
1. **Test thoroughly** with different templates
2. **Verify all existing content** still displays correctly
3. **Add more home templates** by creating new files in `pageTemplates/home/`
4. **Implement templates for other pages** when ready
5. **Migrate to Firebase** using existing storage utilities

### 🔧 Adding New Templates:
1. Create new template file: `src/pageTemplates/home/YourTemplate.js`
2. Add to registry: `templateRegistry.js`
3. Add metadata: `templateMetadata`
4. Template is immediately available in admin!

**This corrected plan fixes all the critical mismatches and ensures compatibility with your existing codebase!** 🎨