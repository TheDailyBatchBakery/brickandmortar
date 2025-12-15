import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'default' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export default function Button({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles = 'font-medium rounded-lg transition-colors';
  const variants = {
    default: 'bg-gray-900 text-white hover:bg-gray-800',
    outline: 'border-2 border-gray-900 text-gray-900 hover:bg-gray-100',
  };
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

