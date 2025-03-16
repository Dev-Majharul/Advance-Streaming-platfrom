import React, { InputHTMLAttributes } from 'react';

interface CyberInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  variant?: 'primary' | 'secondary' | 'dark';
  fullWidth?: boolean;
}

const CyberInput: React.FC<CyberInputProps> = ({
  label,
  error,
  className = '',
  variant = 'primary',
  fullWidth = false,
  ...props
}) => {
  const baseClasses = 'cyber-input bg-black/50 border-2 px-4 py-2 font-rajdhani focus:outline-none focus:ring-1 transition-all duration-300 placeholder:text-gray-500';
  
  const variantClasses = {
    primary: 'border-cyan-400 text-cyan-100 focus:ring-cyan-400/50 focus:bg-black/80',
    secondary: 'border-purple-500 text-purple-100 focus:ring-purple-500/50 focus:bg-black/80',
    dark: 'border-gray-700 text-gray-300 focus:ring-gray-500/50 focus:bg-black/90',
  };
  
  const widthClass = fullWidth ? 'w-full' : '';
  const errorClass = error ? 'border-pink-500 focus:ring-pink-500/50' : '';
  
  return (
    <div className={`cyber-input-wrapper ${fullWidth ? 'w-full' : ''} mb-4`}>
      {label && (
        <label className="cyber-label block mb-1 font-rajdhani text-sm uppercase tracking-wider text-gray-300">
          {label}
          <span className="ml-1 text-cyan-400">_</span>
        </label>
      )}
      
      <div className="relative">
        <input
          className={`${baseClasses} ${variantClasses[variant]} ${widthClass} ${errorClass} ${className}`}
          {...props}
        />
        
        {/* Corner accent */}
        <span className="absolute top-0 right-0 h-2 w-2 border-t-2 border-r-2 border-current"></span>
        <span className="absolute bottom-0 left-0 h-2 w-2 border-b-2 border-l-2 border-current"></span>
      </div>
      
      {error && (
        <p className="mt-1 text-xs text-pink-500 font-mono">ERROR: {error}</p>
      )}
    </div>
  );
};

export default CyberInput; 