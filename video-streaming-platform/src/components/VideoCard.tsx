import React from 'react';
import { Link } from 'react-router-dom';

interface VideoCardProps {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  views: number;
  username: string;
  createdAt: string;
  glitch?: boolean;
}

const VideoCard: React.FC<VideoCardProps> = ({
  id,
  title,
  thumbnail,
  duration,
  views,
  username,
  createdAt,
  glitch = false,
}) => {
  const formatViews = (count: number): string => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  return (
    <div className="cyber-video-card group relative overflow-hidden">
      <Link to={`/video/${id}`} className="block">
        {/* Thumbnail with overlay */}
        <div className="relative overflow-hidden">
          <div className={`relative aspect-video overflow-hidden ${glitch ? 'animate-glitch' : ''}`}>
            <img 
              src={thumbnail} 
              alt={title} 
              className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            
            {/* Scanline effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50 mix-blend-overlay"></div>
            <div className="absolute inset-0 opacity-10">
              <div className="animate-scanline pointer-events-none"></div>
            </div>
            
            {/* Glitch overlay effect on hover */}
            <div className="absolute inset-0 bg-cyan-400/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
            
            {/* Duration badge */}
            <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-0.5 text-xs font-mono text-cyan-400 border border-cyan-400/50">
              {duration}
            </div>
            
            {/* Border accents */}
            <span className="absolute top-0 left-0 h-4 w-4 border-t-2 border-l-2 border-cyan-400"></span>
            <span className="absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-cyan-400"></span>
          </div>
        </div>
        
        {/* Video details */}
        <div className="mt-2 px-1">
          <h3 className="text-base font-orbitron text-white line-clamp-2 group-hover:text-cyan-400 transition-colors">
            {title}
          </h3>
          <div className="mt-1 flex items-center justify-between text-xs text-gray-400">
            <span className="font-mono">{formatViews(views)} views</span>
            <span className="font-mono">{createdAt}</span>
          </div>
          <div className="mt-1 text-sm text-purple-500 font-rajdhani">
            @{username}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default VideoCard; 