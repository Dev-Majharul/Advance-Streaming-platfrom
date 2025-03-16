import React, { ButtonHTMLAttributes, ReactNode } from 'react';

interface CyberButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  glitch?: boolean;
  children?: ReactNode;
}

const CyberButton: React.FC<CyberButtonProps> = ({
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  glitch = false,
  ...props
}) => {
  const baseClasses = 'cyber-btn relative font-rajdhani uppercase tracking-wider inline-flex items-center justify-center overflow-hidden transition-all duration-300';
  
  const variantClasses = {
    primary: 'border-cyan-400 text-cyan-400 shadow-lg after:bg-cyan-400/20 hover:bg-cyan-400/10',
    secondary: 'border-purple-500 text-purple-500 shadow-lg after:bg-purple-500/20 hover:bg-purple-500/10',
    danger: 'border-pink-500 text-pink-500 shadow-lg after:bg-pink-500/20 hover:bg-pink-500/10',
  };
  
  const sizeClasses = {
    sm: 'text-xs py-1 px-3 border',
    md: 'text-sm py-2 px-4 border-2',
    lg: 'text-md py-3 px-6 border-2',
  };

  const glitchClass = glitch ? 'animate-glow' : '';
  
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant as keyof typeof variantClasses]} ${sizeClasses[size as keyof typeof sizeClasses]} ${glitchClass} ${className}`}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <span className="absolute inset-0 z-0 translate-x-full translate-y-full transform bg-gradient-to-r"></span>
    </button>
  );
};

export default CyberButton; 