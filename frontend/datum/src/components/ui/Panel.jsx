const Panel = ({ children, variant = 'default', className = '', ...props }) => {
  const baseClasses = 'bg-[var(--color-paper-50)] border border-[var(--color-ink-900)]/20 p-6 relative';
  
  const variants = {
    default: '',
    survey: 'pl-8 border-l-4 border-l-[var(--color-blueprint-600)]',
  };

  return (
    <div 
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      {variant === 'survey' && (
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[var(--color-ink-900)]/50 -ml-[5px] -mt-[1px]" />
      )}
      {children}
    </div>
  );
};

export default Panel;
