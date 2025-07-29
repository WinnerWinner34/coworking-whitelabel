import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';

export default function Navigation({ isAdmin = false }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut, user } = useAuth();
  
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
  
  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <Link 
            to={isAdmin ? "/admin" : "/"} 
            className="text-xl font-bold text-blue-700 hover:text-blue-800 transition-colors"
          >
            The Coworking Space
          </Link>
          
          {/* Navigation Links - FIXED: All links are shown for now */}
          <div className="flex items-center space-x-2">
            <Link 
              to={isAdmin ? "/admin" : "/"} 
              className={getLinkClass(isAdmin ? "/admin" : "/")}
            >
              Home
            </Link>
            
            <Link 
              to={isAdmin ? "/admin/about" : "/about"} 
              className={getLinkClass(isAdmin ? "/admin/about" : "/about")}
            >
              About
            </Link>
            
            <Link 
              to={isAdmin ? "/admin/team" : "/team"} 
              className={getLinkClass(isAdmin ? "/admin/team" : "/team")}
            >
              Team
            </Link>
            
            <Link 
              to={isAdmin ? "/admin/news" : "/news"} 
              className={getLinkClass(isAdmin ? "/admin/news" : "/news")}
            >
              News
            </Link>
            
            <Link 
              to={isAdmin ? "/admin/events" : "/events"} 
              className={getLinkClass(isAdmin ? "/admin/events" : "/events")}
            >
              Events
            </Link>
            
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
            
            {/* Public register link */}
            {!isAdmin && (
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