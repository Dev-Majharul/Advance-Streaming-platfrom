import React, { HTMLAttributes } from 'react';

interface CyberCardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'primary' | 'secondary' | 'dark';
  glow?: boolean;
  glitch?: boolean;
  bordered?: boolean;
}

const CyberCard: React.FC<CyberCardProps> = ({
  children,
  className = '',
  variant = 'primary',
  glow = false,
  glitch = false,
  bordered = true,
  ...props
}) => {
  const baseClasses = 'cyber-card relative rounded-sm backdrop-blur-sm transition-all duration-300';
  
  const variantClasses = {
    primary: 'bg-black/80 border-cyan-400 text-white',
    secondary: 'bg-black/80 border-purple-500 text-white',
    dark: 'bg-black/90 border-gray-700 text-gray-300',
  };
  
  const glowClasses = {
    primary: glow ? 'shadow-cyan-glow' : '',
    secondary: glow ? 'shadow-purple-glow' : '',
    dark: glow ? 'shadow-gray-glow' : '',
  };
  
  const borderClasses = bordered ? 'border-2 before:border-b-2 before:border-r-2' : '';
  const glitchClass = glitch ? 'animate-glitch' : '';
  
  return (
    <div
      className={`
        ${baseClasses} 
        ${variantClasses[variant]} 
        ${glowClasses[variant]} 
        ${borderClasses} 
        ${glitchClass} 
        ${className}
      `}
      {...props}
    >
      {/* Card corner accents */}
      <span className="absolute -top-1 -right-1 h-3 w-3 border-t-2 border-r-2 border-cyan-400"></span>
      <span className="absolute -bottom-1 -left-1 h-3 w-3 border-b-2 border-l-2 border-cyan-400"></span>
      
      {/* Scanline effect */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="animate-scanline pointer-events-none"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 p-4">
        {children}
      </div>
    </div>
  );
};

export default CyberCard; 