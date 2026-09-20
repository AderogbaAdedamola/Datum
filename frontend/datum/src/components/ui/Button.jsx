const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseClasses = 'inline-flex items-center justify-center font-sans font-medium transition-colors focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-[var(--color-blueprint-600)] text-white hover:bg-[var(--color-blueprint-600)]/90 px-4 py-2',
    secondary: 'border border-[var(--color-blueprint-600)] text-[var(--color-blueprint-600)] hover:bg-[var(--color-blueprint-600)]/10 px-4 py-2',
    stamp: 'bg-[var(--color-brass-500)] text-white hover:bg-[var(--color-brass-500)]/90 px-6 py-3 text-lg font-serif tracking-wide',
  };

  return (
    <button 
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
