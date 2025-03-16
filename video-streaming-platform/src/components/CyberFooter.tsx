import React from 'react';
import { Link } from 'react-router-dom';

const CyberFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-black relative mt-16 overflow-hidden">
      {/* Top border */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
      
      {/* Grid background overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{ backgroundImage: 'url(/cyber-grid-bg.svg)', backgroundSize: 'cover' }}></div>
      </div>
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and tag line */}
          <div className="md:col-span-1">
            <Link to="/" className="text-2xl font-display text-white flex items-center">
              <span className="text-cyan-400">CYBER</span>
              <span className="text-white mx-1">/</span>
              <span className="text-pink-500">STREAM</span>
            </Link>
            <p className="mt-4 text-gray-400 text-sm font-sans">
              The future of video streaming is here. Experience content in a whole new dimension.
            </p>
            
            {/* Social links */}
            <div className="mt-6 flex space-x-4">
              {['twitter', 'facebook', 'instagram', 'youtube'].map((social) => (
                <a 
                  key={social}
                  href={`https://${social}.com`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-8 h-8 border border-gray-700 hover:border-cyan-400 flex items-center justify-center text-gray-400 hover:text-cyan-400 transition-colors"
                >
                  <span className="sr-only">{social}</span>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z" clipRule="evenodd" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
          
          {/* Navigation Links */}
          <div className="md:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-display text-white text-lg mb-4 flex items-center">
                <span className="text-cyan-400 mr-2">01.</span>
                Navigation
              </h3>
              <ul className="space-y-2 font-sans text-gray-400">
                {['Home', 'Trending', 'Categories', 'Live', 'New Uploads'].map((item) => (
                  <li key={item}>
                    <Link to={`/${item.toLowerCase()}`} className="hover:text-cyan-400 transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="font-display text-white text-lg mb-4 flex items-center">
                <span className="text-pink-500 mr-2">02.</span>
                Account
              </h3>
              <ul className="space-y-2 font-sans text-gray-400">
                {['Profile', 'Studio', 'Analytics', 'Settings', 'Logout'].map((item) => (
                  <li key={item}>
                    <Link to={`/${item.toLowerCase()}`} className="hover:text-pink-500 transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="font-display text-white text-lg mb-4 flex items-center">
                <span className="text-purple-500 mr-2">03.</span>
                Support
              </h3>
              <ul className="space-y-2 font-sans text-gray-400">
                {['Help Center', 'Terms of Service', 'Privacy Policy', 'Contact Us', 'About'].map((item) => (
                  <li key={item}>
                    <Link to={`/${item.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-purple-500 transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        {/* Bottom copyright section */}
        <div className="mt-12 pt-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm font-mono order-2 md:order-1 mt-4 md:mt-0">
            <span className="text-cyan-400">&copy;</span> {currentYear} CYBER/STREAM. All rights reserved.
          </p>
          
          <div className="order-1 md:order-2 flex items-center">
            <span className="text-xs uppercase tracking-widest font-mono mr-2 text-gray-500">System Status:</span>
            <span className="animate-pulse inline-flex h-2 w-2 rounded-full bg-green-500 mr-1"></span>
            <span className="text-xs text-green-500 font-mono">Online</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default CyberFooter; 