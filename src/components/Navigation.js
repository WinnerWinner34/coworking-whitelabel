import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navigation({ isAdmin = false }) {
  const location = useLocation();
  
  const getLinkClass = (path) => {
    const baseClass = "px-4 py-2 rounded transition";
    const isActive = location.pathname === path;
    
    if (isActive) {
      return `${baseClass} bg-blue-600 text-white`;
    }
    return `${baseClass} text-gray-700 hover:bg-gray-100`;
  };
  
  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to={isAdmin ? "/admin" : "/"} className="text-xl font-bold">
            The Coworking Space
          </Link>
          
          <div className="flex space-x-2">
            <Link to={isAdmin ? "/admin" : "/"} 
                  className={getLinkClass(isAdmin ? "/admin" : "/")}>
              Home
            </Link>
            <Link to={isAdmin ? "/admin/about" : "/about"} 
                  className={getLinkClass(isAdmin ? "/admin/about" : "/about")}>
              About
            </Link>
            <Link to={isAdmin ? "/admin/team" : "/team"} 
                  className={getLinkClass(isAdmin ? "/admin/team" : "/team")}>
              Team
            </Link>
            <Link to={isAdmin ? "/admin/news" : "/news"} 
                  className={getLinkClass(isAdmin ? "/admin/news" : "/news")}>
              News
            </Link>
            <Link to={isAdmin ? "/admin/events" : "/events"} 
                  className={getLinkClass(isAdmin ? "/admin/events" : "/events")}>
              Events
            </Link>
            
            {isAdmin && (
              <>
                <Link to="/admin/settings" 
                      className={getLinkClass("/admin/settings")}>
                  Settings
                </Link>
                <button 
                  onClick={() => {/* Person B will implement logout */}} 
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}