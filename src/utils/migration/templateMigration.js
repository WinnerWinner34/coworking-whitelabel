import { storage } from './storageUtils';

export class TemplateMigration {
  
  async ensureHeroHasSections() {
    console.log('🔄 Ensuring Hero has sections structure...');
    
    try {
      // Get data from localStorage with correct key
      const storedData = localStorage.getItem('coworking_data');
      if (!storedData) {
        console.log('ℹ️ No data found in localStorage');
        return false;
      }
      
      const data = JSON.parse(storedData);
      const homeData = data.home;
      
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

      // Also ensure features are at root level (not in sections)
      const features = homeData.sections?.features?.items || [
        {
          id: "1",
          icon: "💼",
          title: "Professional Environment",
          description: "Modern, well-designed spaces that inspire productivity and creativity."
        },
        {
          id: "2", 
          icon: "🌐",
          title: "High-Speed Internet",
          description: "Reliable, fast internet connectivity to keep you connected and productive."
        },
        {
          id: "3",
          icon: "☕",
          title: "Premium Amenities",
          description: "Coffee bar, meeting rooms, printing facilities, and comfortable lounge areas."
        }
      ];

      const updatedData = {
        ...data,
        home: {
          ...homeData,
          hero: updatedHero,
          features: features
        }
      };

      localStorage.setItem('coworking_data', JSON.stringify(updatedData));
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
      // Get existing settings from localStorage with correct key
      const storedSettings = localStorage.getItem('template_settings');
      const existingSettings = storedSettings ? JSON.parse(storedSettings) : {};
      
      // Ensure pages structure exists
      if (!existingSettings.pages) {
        existingSettings.pages = {};
      }

      // Ensure home page template setting exists
      if (!existingSettings.pages.home) {
        existingSettings.pages.home = {
          template: 'modern',  // Default template
          enabled: true,
          heroSize: 'medium'
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

      localStorage.setItem('template_settings', JSON.stringify(existingSettings));
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