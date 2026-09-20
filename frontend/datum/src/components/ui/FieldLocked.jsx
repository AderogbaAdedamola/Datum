import { ShieldCheck } from 'lucide-react';

const FieldLocked = ({ label, value, reason = "This field can't be edited — it's already verified on your profile.", className = '' }) => {
  return (
    <div className={`relative ${className}`}>
      {label && <label className="block text-sm font-medium mb-1 text-[var(--color-ink-900)]/60">{label}</label>}
      <div className="relative group">
        <input 
          type="text" 
          value={value} 
          disabled 
          readOnly
          className="w-full bg-[var(--color-ink-900)]/5 border border-[var(--color-ink-900)]/20 px-3 py-2 text-[var(--color-ink-900)]/60 cursor-not-allowed pr-10 focus:outline-none"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-ink-900)]/40">
          <ShieldCheck size={16} />
        </div>
        
        {/* Tooltip on hover */}
        <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block w-max max-w-xs bg-[var(--color-ink-900)] text-[var(--color-paper-50)] text-xs px-2 py-1 z-10 shadow-sm pointer-events-none">
          {reason}
        </div>
      </div>
    </div>
  );
};

export default FieldLocked;
