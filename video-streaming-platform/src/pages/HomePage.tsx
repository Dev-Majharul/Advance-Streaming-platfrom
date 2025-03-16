import React from 'react';
import { Link } from 'react-router-dom';
import CyberButton from '../components/CyberButton';

const HomePage: React.FC = () => {
  return (
    <div className="pt-16 min-h-screen">
      {/* Hero Section */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display text-white leading-tight mb-4">
                Welcome to the <br/>
                <span className="text-cyan-400">Digital Frontier</span>
              </h1>
              
              <p className="text-gray-300 text-lg mb-8 font-sans">
                Explore the cutting edge of digital content in our cyberpunk-inspired streaming platform. The future of entertainment is now.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <CyberButton variant="primary" size="lg">
                  Explore Now
                </CyberButton>
                
                <CyberButton variant="secondary" size="lg">
                  Top Creators
                </CyberButton>
              </div>
              
              <div className="mt-8 grid grid-cols-3 gap-4">
                <div className="border border-gray-700 bg-black/30 p-3 text-center">
                  <div className="text-3xl font-display text-cyan-400">2M+</div>
                  <div className="text-xs text-gray-400 font-mono uppercase tracking-wider">Users</div>
                </div>
                <div className="border border-gray-700 bg-black/30 p-3 text-center">
                  <div className="text-3xl font-display text-purple-500">50K+</div>
                  <div className="text-xs text-gray-400 font-mono uppercase tracking-wider">Videos</div>
                </div>
                <div className="border border-gray-700 bg-black/30 p-3 text-center">
                  <div className="text-3xl font-display text-pink-500">24/7</div>
                  <div className="text-xs text-gray-400 font-mono uppercase tracking-wider">Streams</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-video relative overflow-hidden rounded-sm border-2 border-cyan-400 shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80" 
                  alt="Featured Video" 
                  className="w-full h-full object-cover"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h2 className="text-xl font-display text-white mb-2">
                      Exploring the Digital Frontier: A Journey Through The Net
                    </h2>
                    <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                      An in-depth exploration of the digital frontiers that shape our cyberpunk reality.
                    </p>
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-cyan-400 font-mono">
                        1.2M views • 2 days ago
                      </div>
                      <Link to="/video/featured1">
                        <CyberButton variant="primary" size="sm">
                          Watch Now
                        </CyberButton>
                      </Link>
                    </div>
                  </div>
                </div>
                
                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-cyan-400"></div>
                <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-cyan-400"></div>
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-cyan-400"></div>
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-cyan-400"></div>
                
                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <div className="w-16 h-16 rounded-full bg-cyan-400/80 flex items-center justify-center cursor-pointer transform hover:scale-110 transition-transform duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" className="w-8 h-8">
                      <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* Status indicators */}
              <div className="absolute -top-4 -right-4 bg-black/80 border border-cyan-400 py-1 px-3 font-mono text-xs text-cyan-400">
                FEATURED_CONTENT
              </div>
              
              <div className="absolute -bottom-4 -left-4 bg-black/80 border border-pink-500 py-1 px-3 font-mono text-xs text-pink-500 flex items-center">
                <span className="w-2 h-2 bg-pink-500 rounded-full mr-2 animate-pulse"></span>
                LIVE
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 relative overflow-hidden border-t border-gray-800">
        <div className="container mx-auto px-4 relative z-10">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl md:text-4xl font-display text-white mb-6">
              Ready to Join The <span className="text-pink-500">Digital Revolution</span>?
            </h2>
            <p className="text-gray-300 mb-8 text-lg font-sans">
              Create your account today and start uploading your content to the network. Be part of the future of digital entertainment.
            </p>
            <div className="flex justify-center space-x-4">
              <CyberButton variant="primary" size="lg">
                Sign Up Now
              </CyberButton>
              <CyberButton variant="secondary" size="lg">
                Learn More
              </CyberButton>
            </div>
            
            <div className="mt-12 p-4 border border-gray-700 bg-black/50 inline-block font-mono text-sm text-gray-400">
              <span className="text-green-400">&gt;</span> JOIN_NETWORK --user=NEW --access=FULL
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage; 