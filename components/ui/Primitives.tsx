
import React from 'react';

// --- Card Components ---
export const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden ${className}`}>
    {children}
  </div>
);

export const CardHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`p-6 pb-2 ${className}`}>{children}</div>
);

export const CardTitle: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <h3 className={`text-lg font-semibold leading-none tracking-tight text-slate-900 ${className}`}>{children}</h3>
);

export const CardDescription: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <p className={`text-sm text-slate-500 mt-2 ${className}`}>{children}</p>
);

export const CardContent: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`p-6 pt-2 ${className}`}>{children}</div>
);

export const CardFooter: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`flex items-center p-6 pt-0 ${className}`}>{children}</div>
);

// --- Badge Component ---
interface BadgeProps {
  variant?: 'default' | 'success' | 'danger' | 'warning' | 'outline' | 'blue' | 'purple';
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ variant = 'default', children, className = '' }) => {
  const variants = {
    default: 'bg-slate-900 text-slate-50 hover:bg-slate-900/80',
    success: 'bg-emerald-100 text-emerald-700 hover:bg-emerald-100/80 border border-emerald-200',
    danger: 'bg-rose-100 text-rose-700 hover:bg-rose-100/80 border border-rose-200',
    warning: 'bg-amber-100 text-amber-700 hover:bg-amber-100/80 border border-amber-200',
    blue: 'bg-blue-100 text-blue-700 hover:bg-blue-100/80 border border-blue-200',
    purple: 'bg-purple-100 text-purple-700 hover:bg-purple-100/80 border border-purple-200',
    outline: 'text-slate-950 border border-slate-200 hover:bg-slate-100',
  };

  return (
    <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 ${variants[variant]} ${className}`}>
      {children}
    </div>
  );
};

// --- Button Component ---
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'link' | 'secondary';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export const Button: React.FC<ButtonProps> = ({ variant = 'default', size = 'default', className = '', children, ...props }) => {
  const baseStyles = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95 transition-transform duration-100";
  
  const variants = {
    default: "bg-slate-900 text-slate-50 hover:bg-slate-900/90",
    outline: "border border-slate-200 bg-white hover:bg-slate-100 hover:text-slate-900",
    ghost: "hover:bg-slate-100 hover:text-slate-900",
    link: "text-slate-900 underline-offset-4 hover:underline",
    secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200/80",
  };

  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8",
    icon: "h-10 w-10",
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  );
};

// --- Avatar Component ---
export const Avatar: React.FC<{ src: string; fallback: string; className?: string }> = ({ src, fallback, className = '' }) => (
  <div className={`relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full border border-slate-200 ${className}`}>
    <img className="aspect-square h-full w-full object-cover" src={src} alt={fallback} />
  </div>
);

// --- Progress Bar Component ---
export const Progress: React.FC<{ value: number; className?: string; indicatorClassName?: string }> = ({ value, className = '', indicatorClassName = 'bg-slate-900' }) => (
  <div className={`relative h-4 w-full overflow-hidden rounded-full bg-slate-100 ${className}`}>
    <div
      className={`h-full w-full flex-1 transition-all ${indicatorClassName}`}
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </div>
);

// --- Form Components ---
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input: React.FC<InputProps> = ({ className = '', ...props }) => (
  <input
    className={`flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    {...props}
  />
);

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}

export const Select: React.FC<SelectProps> = ({ className = '', children, ...props }) => (
  <div className="relative">
      <select
        className={`flex h-10 w-full items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none ${className}`}
        {...props}
      >
        {children}
      </select>
      {/* Custom arrow could go here if we hid appearance-none */}
      <div className="absolute right-3 top-3 pointer-events-none">
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L5 5L9 1" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
      </div>
  </div>
);
