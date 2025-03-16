import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import CyberButton from './CyberButton';

interface CyberHeaderProps {
  isLoggedIn: boolean;
  onSignOut?: () => void;
}

const CyberHeader: React.FC<CyberHeaderProps> = ({ isLoggedIn, onSignOut }) => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md transition-all duration-300 
      ${scrolled ? 'bg-black/80 shadow-lg' : 'bg-black/50'}`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-display text-white flex items-center">
            <span className="text-cyan-400">CYBER</span>
            <span className="text-white mx-1">/</span>
            <span className="text-pink-500">STREAM</span>
            <div className="ml-2 h-4 w-4 bg-cyan-400 animate-pulse"></div>
          </Link>
          
          {/* Center status bar */}
          <div className="hidden md:flex items-center space-x-4 font-mono text-xs text-gray-400">
            <div className="border border-gray-700 bg-black/50 px-2 py-1">
              <span>SYS:</span>
              <span className="text-green-400 ml-1">ONLINE</span>
            </div>
            <div className="hidden lg:block border border-gray-700 bg-black/50 px-2 py-1">
              <span>LOCATION:</span>
              <span className="text-cyan-400 ml-1">{location.pathname}</span>
            </div>
            <div className="border border-gray-700 bg-black/50 px-2 py-1">
              <span>TIME:</span>
              <span className="text-purple-400 ml-1">
                {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
          
          {/* Navigation and auth buttons */}
          <div className="flex items-center space-x-4">
            <nav className="hidden md:flex items-center space-x-6 text-sm font-sans uppercase tracking-wider">
              <Link 
                to="/" 
                className={`hover:text-cyan-400 transition-colors ${location.pathname === '/' ? 'text-cyan-400' : 'text-gray-300'}`}
              >
                Home
              </Link>
              <Link 
                to="/trending" 
                className={`hover:text-cyan-400 transition-colors ${location.pathname === '/trending' ? 'text-cyan-400' : 'text-gray-300'}`}
              >
                Trending
              </Link>
              <Link 
                to="/categories" 
                className={`hover:text-cyan-400 transition-colors ${location.pathname === '/categories' ? 'text-cyan-400' : 'text-gray-300'}`}
              >
                Categories
              </Link>
              {isLoggedIn && (
                <Link 
                  to="/studio" 
                  className={`hover:text-pink-500 transition-colors ${location.pathname === '/studio' ? 'text-pink-500' : 'text-gray-300'}`}
                >
                  Studio
                </Link>
              )}
            </nav>
            
            {isLoggedIn ? (
              <div className="flex items-center space-x-3">
                <Link to="/profile">
                  <div className="w-8 h-8 rounded-sm bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center text-white font-bold border border-cyan-400">
                    U
                  </div>
                </Link>
                <CyberButton size="sm" variant="danger" onClick={onSignOut}>
                  Logout
                </CyberButton>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <CyberButton size="sm" variant="secondary">
                  <Link to="/login">Login</Link>
                </CyberButton>
                <CyberButton size="sm" variant="primary">
                  <Link to="/signup">Sign Up</Link>
                </CyberButton>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Bottom border */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
    </header>
  );
};

export default CyberHeader; 