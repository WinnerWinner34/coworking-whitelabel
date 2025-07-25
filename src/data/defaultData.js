export const defaultData = {
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
        text: "Founded in 2020, we set out to create more than just a workspace...",
        image: ""
      },
      {
        id: "2", 
        title: "Our Mission",
        text: "To provide an inspiring, collaborative environment...",
        image: ""
      }
    ],
    values: [
      { id: "1", icon: "💡", title: "Innovation", description: "We foster creative thinking" },
      { id: "2", icon: "🤝", title: "Community", description: "Building connections that matter" },
      { id: "3", icon: "🌱", title: "Growth", description: "Supporting your journey" }
    ]
  },
  
  team: {
    hero: {
      title: "Meet Our Team",
      subtitle: "The people who make it all happen"
    },
    title: "Our Amazing Team",
    members: [
      {
        id: "1",
        name: "Sarah Johnson",
        role: "Community Manager",
        bio: "Passionate about creating connections and fostering community growth.",
        image: ""
      },
      {
        id: "2",
        name: "Mike Chen",
        role: "Operations Director",
        bio: "Ensuring everything runs smoothly so you can focus on your work.",
        image: ""
      }
    ]
  },
  
  news: {
    hero: {
      title: "News & Updates",
      subtitle: "Stay informed about what's happening"
    },
    title: "Latest News",
    articles: [
      {
        id: "1",
        title: "Grand Opening Celebration",
        excerpt: "Join us for our grand opening...",
        content: "Full article content here...",
        date: "2024-01-15",
        author: "Sarah Johnson",
        image: "",
        featured: true
      }
    ]
  },
  
  events: {
    hero: {
      title: "Upcoming Events",
      subtitle: "Connect, learn, and grow with our community"
    },
    title: "Events Calendar",
    upcomingEvents: [
      {
        id: "1",
        title: "Networking Mixer",
        date: "2024-02-01",
        time: "6:00 PM - 8:00 PM",
        location: "Main Hall",
        description: "Connect with fellow members over drinks and appetizers",
        image: "",
        category: "Networking",
        capacity: 50,
        registered: 23
      }
    ]
  }
};

export default defaultData;