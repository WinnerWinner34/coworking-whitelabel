// src/data/defaultData.js
// This is the core data structure that defines what content each page can have
// Person A's components will use this structure to know what fields to display/edit

export const defaultData = {
  // HOME PAGE - Landing page with hero and features
  home: {
    hero: {
      title: "Welcome to The Coworking Space",
      subtitle: "Your creative workspace in the heart of the city",
      cta: { 
        text: "Get Started", 
        url: "/register" 
      },
      backgroundImage: ""
    },
    features: [
      { 
        id: "1",
        icon: "🏢", 
        title: "24/7 Access", 
        description: "Work on your schedule with round-the-clock access" 
      },
      { 
        id: "2",
        icon: "🌐", 
        title: "High-Speed Internet", 
        description: "Lightning-fast fiber connection for seamless work" 
      },
      { 
        id: "3",
        icon: "☕", 
        title: "Free Coffee", 
        description: "Unlimited coffee and snacks to keep you energized" 
      },
      { 
        id: "4",
        icon: "🤝", 
        title: "Community Events", 
        description: "Regular networking events and workshops" 
      }
    ]
  },

  // ABOUT PAGE - Company story and values
  about: {
    hero: {
      title: "About Our Space",
      subtitle: "Building a community of innovators and creators",
      backgroundImage: ""
    },
    content: [
      {
        id: "1",
        title: "Our Story",
        text: "Founded in 2020, we set out to create more than just a workspace. We wanted to build a community where ideas flourish and connections are made. What started as a vision has grown into a thriving ecosystem of entrepreneurs, freelancers, and remote workers.",
        image: ""
      },
      {
        id: "2", 
        title: "Our Mission",
        text: "To provide an inspiring, collaborative environment that empowers professionals to do their best work while building meaningful connections. We believe that great things happen when creative minds come together in the right space.",
        image: ""
      },
      {
        id: "3",
        title: "Our Vision",
        text: "To be the premier destination for professionals seeking a dynamic workspace that fosters innovation, collaboration, and personal growth in our community.",
        image: ""
      }
    ],
    values: [
      { 
        id: "1",
        icon: "🤝", 
        title: "Community", 
        description: "Foster connections and collaboration among our diverse membership" 
      },
      { 
        id: "2",
        icon: "💡", 
        title: "Innovation", 
        description: "Embrace new ideas and technologies that enhance the work experience" 
      },
      { 
        id: "3",
        icon: "🌱", 
        title: "Growth", 
        description: "Support personal and professional development through resources and programs" 
      },
      { 
        id: "4",
        icon: "🎯", 
        title: "Excellence", 
        description: "Maintain the highest standards in facilities, service, and member experience" 
      }
    ]
  },

  // TEAM PAGE - Staff and management
  team: {
    hero: {
      title: "Meet Our Team", 
      subtitle: "The people who make it all happen",
      backgroundImage: ""
    },
    title: "Our Team",
    subtitle: "Dedicated professionals committed to your success",
    members: [
      { 
        id: "1", 
        name: "Jane Smith", 
        role: "Community Manager", 
        bio: "Passionate about building communities and helping members succeed. Jane brings 8 years of experience in community building and event management.",
        image: "",
        email: "jane@coworking.com",
        linkedin: ""
      },
      { 
        id: "2", 
        name: "John Doe", 
        role: "Operations Lead", 
        bio: "Ensuring everything runs smoothly for our members. John's background in facility management and operations keeps our space running perfectly.",
        image: "",
        email: "john@coworking.com",
        linkedin: ""
      },
      { 
        id: "3", 
        name: "Sarah Johnson", 
        role: "Tech Support Specialist", 
        bio: "Here to help with all your technical needs. Sarah ensures our tech infrastructure supports your productivity and connectivity needs.",
        image: "",
        email: "sarah@coworking.com",
        linkedin: ""
      },
      { 
        id: "4", 
        name: "Mike Chen", 
        role: "Business Development", 
        bio: "Connecting our members with opportunities and partnerships. Mike helps facilitate business growth and networking within our community.",
        image: "",
        email: "mike@coworking.com",
        linkedin: ""
      }
    ]
  },

  // NEWS PAGE - Blog posts and announcements
  news: {
    hero: {
      title: "Latest News",
      subtitle: "Stay updated with our community",
      backgroundImage: ""
    },
    title: "Recent Updates",
    subtitle: "What's happening in our coworking community",
    articles: [
      {
        id: "1",
        title: "New Workshop Space Now Open",
        excerpt: "Our expanded workshop area is ready for your creative projects with state-of-the-art equipment.",
        content: "We are excited to announce that our new 2,000 sq ft workshop space is now open! This fully equipped area includes 3D printers, laser cutters, traditional woodworking tools, and electronics stations. Members can book time slots through our app and attend safety orientations every Tuesday. The space is perfect for prototyping, crafting, and bringing your ideas to life.",
        date: "2024-01-15",
        author: "Jane Smith",
        image: "",
        category: "Facilities",
        featured: true
      },
      {
        id: "2",
        title: "Member Spotlight: TechStart Success Story",
        excerpt: "Learn how TechStart grew from 2 founders to 20 employees right here in our space.",
        content: "When TechStart first joined our community 18 months ago, they were just two founders with an idea and a dream. Today, they've grown to a team of 20 and just secured $2M in Series A funding. 'The collaborative environment here was crucial to our growth,' says CEO Maria Rodriguez. 'Being surrounded by other entrepreneurs and having access to meeting rooms and event spaces made all the difference.' TechStart will be hosting a lunch-and-learn next month to share their journey.",
        date: "2024-01-10",
        author: "Mike Chen",
        image: "",
        category: "Success Stories",
        featured: true
      },
      {
        id: "3",
        title: "Upgraded Coffee Bar and Kitchen Facilities",
        excerpt: "New espresso machine, extended hours, and healthier snack options now available.",
        content: "Based on member feedback, we've upgraded our coffee bar with a professional-grade espresso machine and extended kitchen hours until 8 PM. We've also partnered with Local Harvest to provide fresh, healthy snack options including gluten-free and vegan choices. The new setup includes a juice bar, kombucha on tap, and locally sourced pastries. Members with premium plans get unlimited access to premium beverages.",
        date: "2024-01-05",
        author: "John Doe",
        image: "",
        category: "Amenities",
        featured: false
      }
    ]
  },

  // EVENTS PAGE - Calendar and event listings  
  events: {
    hero: {
      title: "Upcoming Events",
      subtitle: "Connect, learn, and grow with our community",
      backgroundImage: ""
    },
    title: "Events Calendar",
    subtitle: "Join us for networking, learning, and community building",
    events: [
      {
        id: "1",
        title: "Networking Happy Hour", 
        date: "2024-02-01",
        time: "5:30 PM - 7:30 PM",
        location: "Main Lounge",
        description: "Join us for drinks, appetizers, and connections with fellow members. This month we're featuring a mixologist creating custom cocktails and highlighting three member businesses.",
        image: "",
        category: "Networking",
        capacity: 50,
        registered: 23,
        price: "Free for members, $15 for guests"
      },
      {
        id: "2",
        title: "AI for Small Business Workshop",
        date: "2024-02-05", 
        time: "2:00 PM - 4:00 PM",
        location: "Conference Room A",
        description: "Learn practical ways to integrate AI tools into your business workflow. Covers ChatGPT, automation tools, and emerging AI applications. Bring your laptop for hands-on exercises.",
        image: "",
        category: "Workshop",
        capacity: 20,
        registered: 15,
        price: "Free for premium members, $25 for basic members"
      },
      {
        id: "3",
        title: "Startup Pitch Practice",
        date: "2024-02-08",
        time: "6:00 PM - 8:00 PM", 
        location: "Event Space",
        description: "Practice your pitch in front of a supportive audience. Get feedback from experienced entrepreneurs and investors. Open to all members working on startups or side projects.",
        image: "",
        category: "Startup",
        capacity: 30,
        registered: 8,
        price: "Free for all members"
      },
      {
        id: "4",
        title: "Photography Workshop: Product Shots",
        date: "2024-02-12",
        time: "10:00 AM - 12:00 PM",
        location: "Workshop Space",
        description: "Learn to take professional-quality photos of your products using simple lighting setups. Perfect for e-commerce, social media, and marketing materials.",
        image: "",
        category: "Creative",  
        capacity: 15,
        registered: 12,
        price: "$35 for members, $50 for non-members"
      }
    ]
  }
};

// Settings that control how content is displayed and what features are available
export const defaultSettings = {
  branding: {
    siteName: 'The Coworking Space',
    tagline: 'Your creative workspace in the heart of the city',
    logo: '',
    favicon: '',
    primaryColor: '#2563eb',
    secondaryColor: '#9333ea',
    accentColor: '#10b981'
  },
  
  layout: {
    maxTeamColumns: 3,
    newsLayout: 'cards', // 'cards' | 'list' | 'masonry'
    eventsLayout: 'calendar', // 'calendar' | 'list' | 'grid'
    showFooterLinks: true,
    showSocialMedia: true,
    enableMemberDirectory: false
  },
  
  content: {
    teamMemberFields: ['name', 'role', 'bio', 'image', 'email'],
    eventFields: ['title', 'date', 'time', 'location', 'description', 'price'],
    newsExcerptLength: 150,
    showEventRegistration: true,
    enableComments: false
  },
  
  images: {
    teamPhotoSize: 'medium', // 'small' | 'medium' | 'large'
    newsImageRatio: '16:9', // '16:9' | '4:3' | '1:1'
    maxUploadSize: 5, // MB
    imageQuality: 0.85,
    enableImageOptimization: true
  },
  
  features: {
    enableBookingSystem: true,
    enableMemberLogin: true,
    enablePayments: false,
    enableNewsletter: true,
    enableContactForm: true,
    enableLiveChat: false
  }
};

export default defaultData;