import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useSettings } from '../hooks/useSettings';
import toast from 'react-hot-toast';

export default function Navigation({ isAdmin = false }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut, user } = useAuth();
  const { settings, getEnabledPages } = useSettings();
  
  // Page configuration for navigation
  const pageConfig = {
    home: { name: 'Home', path: '' },
    about: { name: 'About', path: 'about' },
    team: { name: 'Team', path: 'team' },
    news: { name: 'News', path: 'news' },
    events: { name: 'Events', path: 'events' },
    services: { name: 'Services', path: 'services' },
    pricing: { name: 'Pricing', path: 'pricing' },
    contact: { name: 'Contact', path: 'contact' },
    register: { name: 'Register', path: 'register' }
  };
  
  const getLinkClass = (path) => {
    const baseClass = "px-4 py-2 rounded transition-colors duration-200";
    const isActive = location.pathname === path;
    
    if (isActive) {
      return `${baseClass} bg-blue-600 text-white`;
    }
    return `${baseClass} text-gray-700 hover:bg-gray-100 hover:text-gray-900`;
  };
  
  const handleLogout = async () => {
    try {
      await signOut();
      toast.success('Logged out successfully');
      navigate('/admin/login');
    } catch (error) {
      console.error('Logout failed:', error);
      toast.error('Logout failed. Please try again.');
    }
  };

  // Get enabled pages for navigation
  const enabledPages = getEnabledPages();
  
  // Build navigation links based on enabled pages
  const getNavigationLinks = () => {
    return enabledPages.map(page => {
      const config = pageConfig[page.id];
      if (!config) return null;
      
      const path = isAdmin 
        ? `/admin${config.path ? `/${config.path}` : ''}`
        : `/${config.path}`;
        
      return {
        id: page.id,
        name: config.name,
        path: path,
        order: page.order
      };
    }).filter(Boolean);
  };

  const navigationLinks = getNavigationLinks();
  
  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <Link 
            to={isAdmin ? "/admin" : "/"} 
            className="text-xl font-bold text-blue-700 hover:text-blue-800 transition-colors"
          >
            {settings?.general?.siteName || 'The Coworking Space'}
          </Link>
          
          {/* Navigation Links */}
          <div className="flex items-center space-x-2">
            {navigationLinks.map((link) => (
              <Link 
                key={link.id}
                to={link.path} 
                className={getLinkClass(link.path)}
              >
                {link.name}
              </Link>
            ))}
            
            {/* Admin-only links */}
            {isAdmin && (
              <>
                <Link 
                  to="/admin/settings" 
                  className={getLinkClass("/admin/settings")}
                >
                  Settings
                </Link>
                
                {/* User info and logout */}
                <div className="flex items-center space-x-3 ml-4 pl-4 border-l border-gray-300">
                  {user && (
                    <span className="text-sm text-gray-600">
                      Welcome, {user.name || user.email}
                    </span>
                  )}
                  
                  <button 
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200"
                  >
                    Logout
                  </button>
                </div>
              </>
            )}
            
            {/* Public register link - only show if register page is enabled and not admin */}
            {!isAdmin && enabledPages.some(page => page.id === 'register') && (
              <Link 
                to="/register" 
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
              >
                Register
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}