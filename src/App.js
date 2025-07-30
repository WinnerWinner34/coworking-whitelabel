import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import { TemplateSettingsProvider } from './hooks/useTemplateSettings';
import { Toaster } from 'react-hot-toast';
import { migrateHeroData } from './utils/migrateHeroData';

// Components
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

// Public Pages
import Home from './pages/public/Home';
import About from './pages/public/About';
import Team from './pages/public/Team';
import News from './pages/public/News';
import Events from './pages/public/Events';
import Register from './pages/public/Register';

// Admin Pages
import Login from './pages/admin/Login';
import AdminHome from './pages/admin/AdminHome';
import AdminAbout from './pages/admin/AdminAbout';
import AdminTeam from './pages/admin/AdminTeam';
import AdminNews from './pages/admin/AdminNews';
import AdminEvents from './pages/admin/AdminEvents';
import AdminSettings from './pages/admin/AdminSettings';

// Placeholder pages for future features
function ServicesPage() {
  return (
    <div className="container mx-auto py-16 text-center">
      <h1 className="text-4xl font-bold mb-4">Services</h1>
      <p className="text-gray-600">Services page coming soon...</p>
    </div>
  );
}

function PricingPage() {
  return (
    <div className="container mx-auto py-16 text-center">
      <h1 className="text-4xl font-bold mb-4">Pricing</h1>
      <p className="text-gray-600">Pricing page coming soon...</p>
    </div>
  );
}

function ContactPage() {
  return (
    <div className="container mx-auto py-16 text-center">
      <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
      <p className="text-gray-600">Contact page coming soon...</p>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <TemplateSettingsProvider>
        <div className="App">
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                style: {
                  background: '#10b981',
                },
              },
              error: {
                style: {
                  background: '#ef4444',
                },
              },
            }}
          />
          
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="team" element={<Team />} />
              <Route path="news" element={<News />} />
              <Route path="events" element={<Events />} />
              <Route path="register" element={<Register />} />
              
              {/* Future pages */}
              <Route path="services" element={<ServicesPage />} />
              <Route path="pricing" element={<PricingPage />} />
              <Route path="contact" element={<ContactPage />} />
            </Route>
            
            {/* Admin Login - No layout */}
            <Route path="/admin/login" element={<Login />} />
            
            {/* Protected Admin Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <Layout isAdmin={true} />
                </ProtectedRoute>
              }
            >
              <Route index element={<AdminHome />} />
              <Route path="about" element={<AdminAbout />} />
              <Route path="team" element={<AdminTeam />} />
              <Route path="news" element={<AdminNews />} />
              <Route path="events" element={<AdminEvents />} />
              <Route path="settings" element={<AdminSettings />} />
              
              {/* Admin routes for future pages */}
              <Route path="services" element={<ServicesPage />} />
              <Route path="pricing" element={<PricingPage />} />
              <Route path="contact" element={<ContactPage />} />
            </Route>
            
            {/* Catch all - redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </TemplateSettingsProvider>
    </AuthProvider>
  );
}

export default App;