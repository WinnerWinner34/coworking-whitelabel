// Utility to migrate old hero data to include sections
export function migrateHeroData() {
  const STORAGE_KEY = 'coworking_data';
  
  try {
    // Get current stored data
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return;
    
    const data = JSON.parse(stored);
    
    // Check if home hero already has sections
    if (data.home?.hero?.sections) {
      console.log('Hero data already has sections');
      return;
    }
    
    // Add sections to home hero if missing
    if (data.home?.hero) {
      data.home.hero.sections = [
        {
          id: "hero-main",
          type: "main",
          title: data.home.hero.title || "Welcome to The Coworking Space",
          subtitle: data.home.hero.subtitle || "Your creative workspace in the heart of the city",
          description: "Join a thriving community of entrepreneurs, freelancers, and remote workers in our modern, fully-equipped coworking space.",
          image: "",
          imageAlt: "Modern coworking space",
          alignment: "left",
          cta: data.home.hero.cta || { text: "Get Started", url: "/register" },
          secondaryCta: { text: "Watch Demo", url: "#demo" }
        },
        {
          id: "hero-1",
          type: "feature",
          title: "Flexible Workspace Solutions",
          subtitle: "Work Your Way",
          description: "From hot desks to private offices, find the perfect space that matches your work style and growing business needs.",
          image: "",
          imageAlt: "Various workspace options",
          alignment: "right"
        },
        {
          id: "hero-2",
          type: "feature",
          title: "State-of-the-Art Amenities",
          subtitle: "Everything You Need",
          description: "High-speed internet, modern meeting rooms, phone booths, and a fully stocked kitchen. We've thought of everything so you can focus on what matters.",
          image: "",
          imageAlt: "Modern amenities",
          alignment: "left"
        },
        {
          id: "hero-3",
          type: "feature",
          title: "Vibrant Community",
          subtitle: "Connect & Grow",
          description: "Join networking events, workshops, and social gatherings. Build meaningful connections with like-minded professionals.",
          image: "",
          imageAlt: "Community events",
          alignment: "right"
        }
      ];
      
      // Save updated data
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      console.log('Hero data migrated successfully');
      
      // Reload the page to use new data
      window.location.reload();
    }
  } catch (error) {
    console.error('Error migrating hero data:', error);
  }
}

// Run migration on load
if (typeof window !== 'undefined') {
  migrateHeroData();
}