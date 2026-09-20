import { ShieldCheck, AlertTriangle, Award } from 'lucide-react';

const Badge = ({ variant = 'default', children, className = '', ...props }) => {
  const variants = {
    verified: 'bg-[var(--color-verified-600)]/10 text-[var(--color-verified-600)] border-[var(--color-verified-600)]/20',
    flagged: 'bg-[var(--color-flag-600)]/10 text-[var(--color-flag-600)] border-[var(--color-flag-600)]/20',
    level: 'bg-[var(--color-brass-500)]/10 text-[var(--color-brass-500)] border-[var(--color-brass-500)]/20',
    default: 'bg-[var(--color-ink-900)]/5 text-[var(--color-ink-900)] border-[var(--color-ink-900)]/10',
  };

  const icons = {
    verified: <ShieldCheck size={14} className="mr-1" />,
    flagged: <AlertTriangle size={14} className="mr-1" />,
    level: <Award size={14} className="mr-1" />,
    default: null,
  };

  return (
    <span 
      className={`inline-flex items-center px-2 py-0.5 border text-xs font-medium ${variants[variant]} ${className}`}
      {...props}
    >
      {icons[variant]}
      {children}
    </span>
  );
};

export default Badge;
