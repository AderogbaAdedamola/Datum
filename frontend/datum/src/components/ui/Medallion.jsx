const Medallion = ({ level = 1, size = 'md', className = '' }) => {
  // Map level to material colors based on design doc
  const materials = {
    0: { bg: 'bg-[#E5E7EB]', border: 'border-[#9CA3AF]', text: 'text-[#4B5563]' }, // Tin/Grey
    1: { bg: 'bg-[#D1D5DB]', border: 'border-[#6B7280]', text: 'text-[#374151]' }, // Better Tin
    2: { bg: 'bg-[#D4A373]', border: 'border-[#A9825A]', text: 'text-[#5C4033]' }, // Bronze
    3: { bg: 'bg-[#B08D6A]', border: 'border-[#8B5A2B]', text: 'text-[#4A2E15]' }, // Better Bronze
    4: { bg: 'bg-[#E2E8F0]', border: 'border-[#94A3B8]', text: 'text-[#334155]' }, // Silver
    5: { bg: 'bg-[#FDE68A]', border: 'border-[#D97706]', text: 'text-[#78350F]' }, // Desaturated Gold
  };

  const sizes = {
    sm: 'w-12 h-12 text-xs border-2',
    md: 'w-24 h-24 text-base border-4',
    lg: 'w-48 h-48 text-2xl border-8',
  };

  const currentMaterial = materials[level] || materials[0];
  const currentSize = sizes[size] || sizes.md;

  return (
    <div 
      className={`rounded-full flex flex-col items-center justify-center font-serif tracking-widest relative overflow-hidden transition-transform duration-500 hover:rotate-12 ${currentMaterial.bg} ${currentMaterial.border} ${currentMaterial.text} ${currentSize} ${className}`}
      style={{
        boxShadow: `
          inset 0 4px 6px -1px rgba(255, 255, 255, 0.4),
          inset 0 -4px 6px -1px rgba(0, 0, 0, 0.2),
          0 10px 15px -3px rgba(0, 0, 0, 0.2)
        `
      }}
    >
      <div className="absolute inset-0 rounded-full border border-white/30 m-[2px]"></div>
      
      {/* Level indicators/notches (decorative) */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-black/10 w-full" />
      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[1px] bg-black/10 h-full" />
      
      <span className="relative z-10 text-[0.6em] uppercase mb-1 opacity-70">Level</span>
      <span className="relative z-10 font-bold leading-none">{level}</span>
      
      {/* Fake lighting gradient */}
      <div className="absolute inset-0 bg-gradient-to-tr from-black/5 via-transparent to-white/20 pointer-events-none rounded-full" />
    </div>
  );
};

export default Medallion;
