import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { VideoProvider } from './contexts/VideoContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import VideoPage from './pages/VideoPage';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import ProtectedRoute from './components/ProtectedRoute';
import CyberHeader from './components/CyberHeader';
import CyberFooter from './components/CyberFooter';
import './index.css';

const App: React.FC = () => {
  // Mock auth state for demo purposes
  const isLoggedIn = false;
  const handleSignOut = () => {
    console.log('Sign out clicked');
  };

  return (
    <Router>
      <AuthProvider>
        <VideoProvider>
          <Toaster position="top-center" />
          <div className="min-h-screen bg-black text-white flex flex-col">
            <CyberHeader isLoggedIn={isLoggedIn} onSignOut={handleSignOut} />
            
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/video/:videoId" element={<VideoPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute requiredRole="admin">
                      <AdminPage />
                    </ProtectedRoute>
                  }
                />
                <Route path="*" element={
                  <div className="h-screen flex flex-col items-center justify-center">
                    <h1 className="text-4xl font-orbitron text-cyan-400 mb-4">404_ERROR</h1>
                    <p className="text-xl font-rajdhani text-gray-300 mb-8">Connection failed: Path not found</p>
                    <div className="w-64 h-64 relative border-2 border-pink-500 flex items-center justify-center">
                      <span className="text-6xl">?</span>
                    </div>
                  </div>
                } />
              </Routes>
            </main>
            
            <CyberFooter />
          </div>
        </VideoProvider>
      </AuthProvider>
    </Router>
  );
};

export default App; 