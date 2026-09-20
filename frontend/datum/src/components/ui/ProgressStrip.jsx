
const ProgressStrip = ({ value, max = 100, className = '', ...props }) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div 
      className={`w-full h-1 bg-[var(--color-ink-900)]/10 overflow-hidden relative ${className}`}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      {...props}
    >
      <div 
        className="absolute top-0 left-0 h-full bg-[var(--color-blueprint-600)] transition-all duration-300 ease-out"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

export default ProgressStrip;
