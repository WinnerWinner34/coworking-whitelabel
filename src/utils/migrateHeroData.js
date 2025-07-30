// src/utils/migrateHeroData.js
// Enhanced utility to migrate old hero data to Motive-style sections

export function migrateHeroData() {
  const STORAGE_KEY = 'coworking_data';
  const SETTINGS_KEY = 'template_settings';
  
  try {
    console.log('🔄 Starting hero data migration...');
    
    // Get current stored data
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      console.log('ℹ️ No existing data found, will use defaults');
      return;
    }
    
    const data = JSON.parse(stored);
    
    // Check if home hero already has the new sections structure
    if (data.home?.hero?.sections && Array.isArray(data.home.hero.sections) && data.home.hero.sections.length > 0) {
      console.log('✅ Hero data already has sections structure');
      return;
    }
    
    console.log('🔧 Migrating hero data to new sections structure...');
    
    // Preserve existing title and subtitle if they exist
    const existingTitle = data.home?.hero?.title || "Welcome to The Coworking Space";
    const existingSubtitle = data.home?.hero?.subtitle || "Your creative workspace in the heart of the city";
    const existingCta = data.home?.hero?.cta || { text: "Get Started", url: "/register" };
    
    // Create the new sections structure
    const newSections = [
      {
        id: "hero-main",
        type: "main",
        title: existingTitle,
        subtitle: existingSubtitle,
        description: "Join a thriving community of entrepreneurs, freelancers, and remote workers in our modern, fully-equipped coworking space.",
        image: "",
        imageAlt: "Modern coworking space interior",
        alignment: "left",
        cta: existingCta,
        secondaryCta: { text: "Watch Demo", url: "#demo" }
      },
      {
        id: "hero-1",
        type: "feature",
        title: "Flexible Workspace Solutions",
        subtitle: "Work Your Way",
        description: "From hot desks to private offices, find the perfect space that matches your work style and growing business needs. Scale up or down as your team evolves.",
        image: "",
        imageAlt: "Various workspace options including hot desks and private offices",
        alignment: "right"
      },
      {
        id: "hero-2",
        type: "feature",
        title: "State-of-the-Art Amenities",
        subtitle: "Everything You Need",
        description: "High-speed internet, modern meeting rooms, phone booths, and a fully stocked kitchen. We've thought of everything so you can focus on what matters most.",
        image: "",
        imageAlt: "Modern office amenities and facilities",
        alignment: "left"
      },
      {
        id: "hero-3",
        type: "feature",
        title: "Vibrant Community",
        subtitle: "Connect & Grow",
        description: "Join networking events, workshops, and social gatherings. Build meaningful connections with like-minded professionals and grow your business network.",
        image: "",
        imageAlt: "Community networking events and collaborative spaces",
        alignment: "right"
      }
    ];
    
    // Ensure home and hero objects exist
    if (!data.home) {
      data.home = {};
    }
    if (!data.home.hero) {
      data.home.hero = {};
    }
    
    // Add the sections to the existing hero data
    data.home.hero.sections = newSections;
    
    // Preserve other hero properties
    data.home.hero.title = existingTitle;
    data.home.hero.subtitle = existingSubtitle;
    data.home.hero.cta = existingCta;
    data.home.hero.secondaryCta = { text: "Watch Demo", url: "#demo" };
    
    // Save updated data
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    console.log('✅ Hero data migrated successfully');
    
    // Also ensure template settings are set correctly
    migrateTemplateSettings();
    
    return true;
    
  } catch (error) {
    console.error('❌ Error migrating hero data:', error);
    return false;
  }
}

// Migrate template settings to use Motive style
export function migrateTemplateSettings() {
  const SETTINGS_KEY = 'template_settings';
  
  try {
    console.log('🔄 Checking template settings...');
    
    const stored = localStorage.getItem(SETTINGS_KEY);
    let settings = {};
    
    if (stored) {
      settings = JSON.parse(stored);
    }
    
    // Ensure proper structure exists
    if (!settings.pages) {
      settings.pages = {};
    }
    
    // Set home page to use modern (Motive) template with large hero
    if (!settings.pages.home || settings.pages.home.template !== 'modern') {
      settings.pages.home = {
        enabled: true,
        template: 'modern', // This maps to Motive style
        order: 0,
        heroSize: 'large'
      };
      
      console.log('🔧 Updated home page template settings');
    }
    
    // Ensure other default settings exist
    if (!settings.general) {
      settings.general = {
        siteName: 'The Coworking Space',
        siteDescription: 'Your creative workspace in the heart of the city',
        contactEmail: 'contact@coworkingspace.com'
      };
    }
    
    if (!settings.branding) {
      settings.branding = {
        primaryColor: '#2563eb',
        secondaryColor: '#1e40af',
        logoUrl: '',
        fontFamily: 'Inter, system-ui, sans-serif'
      };
    }
    
    // Save updated settings
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    console.log('✅ Template settings updated');
    
  } catch (error) {
    console.error('❌ Error migrating template settings:', error);
  }
}

// Force refresh to use new data
export function forceRefresh() {
  console.log('🔄 Refreshing page to apply changes...');
  window.location.reload();
}

// Main migration function
export function runMigration(autoRefresh = false) {
  console.log('🚀 Running complete migration...');
  
  const heroMigrated = migrateHeroData();
  migrateTemplateSettings();
  
  if (heroMigrated && autoRefresh) {
    // Small delay to ensure localStorage is written
    setTimeout(() => {
      forceRefresh();
    }, 500);
  }
  
  return heroMigrated;
}

// Auto-run migration when this module loads (for existing installations)
if (typeof window !== 'undefined') {
  // Check if this is the first time loading with the new system
  const migrationKey = 'hero_migration_v2_complete';
  
  if (!localStorage.getItem(migrationKey)) {
    console.log('🔍 First time with new hero system, running migration...');
    
    const success = runMigration(false); // Don't auto-refresh on first load
    
    if (success) {
      localStorage.setItem(migrationKey, 'true');
      console.log('✅ Migration completed successfully');
    }
  }
}