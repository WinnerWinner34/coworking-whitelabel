// src/data/defaultData.js
// Updated to include proper Motive-style sections for home hero

export const defaultData = {
  home: {
    hero: {
      title: "Welcome to The Coworking Space",
      subtitle: "Your creative workspace in the heart of the city",
      cta: { 
        text: "Get Started", 
        url: "/register" 
      },
      secondaryCta: {
        text: "Watch Demo",
        url: "#demo"
      },
      backgroundImage: "",
      sections: [
        {
          id: "hero-main",
          type: "main",
          title: "Welcome to The Coworking Space",
          subtitle: "Your creative workspace in the heart of the city",
          description: "Join a thriving community of entrepreneurs, freelancers, and remote workers in our modern, fully-equipped coworking space.",
          image: "",
          imageAlt: "Modern coworking space interior",
          alignment: "left",
          cta: { text: "Get Started", url: "/register" },
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
      ]
    },
    sections: {
      features: {
        title: "Why Choose Our Space",
        items: [
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
        ]
      }
    }
  },
  
  about: {
    hero: {
      title: "About Our Space",
      subtitle: "Creating the perfect environment for modern professionals"
    },
    content: [
      {
        id: "1",
        title: "Our Story",
        text: "Founded in 2020, we set out to create more than just a workspace. We wanted to build a community where entrepreneurs, freelancers, and remote workers could thrive together."
      },
      {
        id: "2", 
        title: "Our Mission",
        text: "To provide flexible, affordable, and inspiring workspaces that foster collaboration, creativity, and business growth."
      }
    ],
    values: [
      {
        id: "1",
        icon: "🤝",
        title: "Community",
        description: "Building connections that matter"
      },
      {
        id: "2",
        icon: "💡", 
        title: "Innovation",
        description: "Embracing new ideas and technologies"
      },
      {
        id: "3",
        icon: "🌱",
        title: "Growth",
        description: "Supporting your journey to success"
      }
    ]
  },

  team: {
    hero: {
      title: "Meet Our Team",
      subtitle: "The people who make our community thrive"
    },
    members: [
      {
        id: "1",
        name: "Sarah Johnson",
        role: "Community Manager",
        bio: "Sarah ensures our coworking space runs smoothly and our members feel at home.",
        image: "",
        email: "sarah@coworkingspace.com",
        linkedin: ""
      },
      {
        id: "2",
        name: "Mike Chen", 
        role: "Operations Director",
        bio: "Mike oversees daily operations and maintains our high standards of service.",
        image: "",
        email: "mike@coworkingspace.com",
        linkedin: ""
      },
      {
        id: "3",
        name: "Emily Rodriguez",
        role: "Events Coordinator", 
        bio: "Emily organizes our networking events, workshops, and community activities.",
        image: "",
        email: "emily@coworkingspace.com",
        linkedin: ""
      }
    ]
  },

  news: {
    hero: {
      title: "Latest News",
      subtitle: "Stay updated with our community and industry insights"
    },
    articles: [
      {
        id: "1",
        title: "Grand Opening Success",
        excerpt: "We're thrilled to announce the successful opening of our new coworking space...",
        content: "We're thrilled to announce the successful opening of our new coworking space. With over 100 members joining in our first month, we're excited to see our community grow.",
        author: "Sarah Johnson",
        date: "2024-01-15",
        image: "",
        featured: true
      },
      {
        id: "2",
        title: "New Meeting Rooms Available",
        excerpt: "We've added three new meeting rooms equipped with the latest technology...",
        content: "We've added three new meeting rooms equipped with the latest technology to better serve our growing community.",
        author: "Mike Chen",
        date: "2024-01-20", 
        image: "",
        featured: false
      }
    ]
  },

  events: {
    hero: {
      title: "Upcoming Events",
      subtitle: "Join our community events and networking opportunities"
    },
    events: [
      {
        id: "1",
        title: "Networking Happy Hour",
        description: "Join fellow members for drinks and networking in a relaxed atmosphere.",
        date: "2024-02-15",
        time: "17:00",
        location: "Main Lounge",
        image: "",
        featured: true
      },
      {
        id: "2",
        title: "Productivity Workshop",
        description: "Learn proven techniques to boost your productivity and manage your time better.",
        date: "2024-02-20",
        time: "14:00", 
        location: "Conference Room A",
        image: "",
        featured: false
      }
    ]
  },

  register: {
    hero: {
      title: "Join Our Community",
      subtitle: "Choose the membership plan that works for you"
    },
    plans: [
      {
        id: "hot-desk",
        name: "Hot Desk",
        price: "$149",
        period: "month",
        features: [
          "Access to shared workspace",
          "High-speed internet",
          "Coffee & tea included",
          "Community events access"
        ],
        popular: false
      },
      {
        id: "dedicated-desk",
        name: "Dedicated Desk", 
        price: "$249",
        period: "month",
        features: [
          "Your own dedicated desk",
          "Storage cabinet",
          "24/7 access",
          "All Hot Desk features"
        ],
        popular: true
      },
      {
        id: "private-office",
        name: "Private Office",
        price: "$449", 
        period: "month",
        features: [
          "Private office space",
          "Meeting room credits",
          "Phone booth access",
          "All Dedicated Desk features"
        ],
        popular: false
      }
    ]
  }
};

export const defaultSettings = {
  general: {
    siteName: 'The Coworking Space',
    siteDescription: 'Your creative workspace in the heart of the city',
    contactEmail: 'contact@coworkingspace.com'
  },
  pages: {
    home: { enabled: true, template: 'modern', order: 0, heroSize: 'large' },
    about: { enabled: true, template: 'story', order: 1, heroSize: 'medium' },
    team: { enabled: true, template: 'grid', order: 2, heroSize: 'medium' },
    news: { enabled: true, template: 'blog', order: 3, heroSize: 'medium' },
    events: { enabled: true, template: 'calendar', order: 4, heroSize: 'medium' },
    services: { enabled: false, template: 'default', order: 5, heroSize: 'medium' },
    pricing: { enabled: false, template: 'default', order: 6, heroSize: 'medium' },
    contact: { enabled: false, template: 'default', order: 7, heroSize: 'medium' },
    register: { enabled: true, template: 'default', order: 8, heroSize: 'medium' }
  },
  branding: {
    primaryColor: '#2563eb',
    secondaryColor: '#1e40af',
    accentColor: '#3b82f6',
    logoUrl: '',
    fontFamily: 'Inter, system-ui, sans-serif'
  },
  features: {
    showSocialMedia: true,
    enableComments: false,
    showTestimonials: true,
    enableBooking: false,
    showPricing: false,
    enableNewsletter: true
  }
};