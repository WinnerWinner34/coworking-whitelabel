import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import { Toaster } from 'react-hot-toast';

// Components
import Layout from './components/layout';
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

function App() {
  return (
    <AuthProvider>
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
          </Route>
          
          {/* Catch all - redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;