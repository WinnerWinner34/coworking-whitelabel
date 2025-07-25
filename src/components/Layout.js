import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from './navigation';

export default function Layout({ isAdmin = false }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation isAdmin={isAdmin} />
      <main>
        <Outlet />
      </main>
      <footer className="bg-gray-900 text-white py-16 text-center">
        <div className="container mx-auto">
          <p>&copy; 2025 The Coworking Space. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}