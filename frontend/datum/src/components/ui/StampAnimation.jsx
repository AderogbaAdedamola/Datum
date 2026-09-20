import { useState, useEffect } from 'react';
import { Check } from 'lucide-react';

const StampAnimation = ({ show, onComplete, className = '' }) => {
  const [stage, setStage] = useState('idle'); 

  useEffect(() => {
    if (show && stage === 'idle') {
      const initialTimer = setTimeout(() => {
        setStage('stamping');
      }, 0);
      
      const timer1 = setTimeout(() => {
        setStage('settled');
      }, 300);
      
      const timer2 = setTimeout(() => {
        if (onComplete) onComplete();
      }, 1500); 

      return () => {
        clearTimeout(initialTimer);
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    } else if (!show) {
      setStage('idle');
    }
  }, [show, stage, onComplete]);

  if (stage === 'idle') return null;

  return (
    <div className={`fixed inset-0 pointer-events-none flex items-center justify-center z-50 bg-[var(--color-paper-50)]/80 backdrop-blur-sm transition-opacity duration-300 ${stage === 'settled' ? 'opacity-100' : 'opacity-100'} ${className}`}>
      <div 
        className={`flex items-center justify-center w-32 h-32 rounded-full border-4 border-[var(--color-brass-500)] text-[var(--color-brass-500)] bg-[var(--color-paper-50)]
          ${stage === 'stamping' ? 'scale-150 opacity-0' : 'scale-100 opacity-100'}
          transition-all duration-300 ease-out`}
        style={{
          boxShadow: stage === 'settled' ? '0 4px 12px rgba(169, 130, 90, 0.2), inset 0 2px 4px rgba(0,0,0,0.05)' : 'none',
          transform: stage === 'stamping' ? 'scale(2) rotate(-15deg)' : 'scale(1) rotate(-5deg)'
        }}
      >
        <Check strokeWidth={3} size={64} />
      </div>
    </div>
  );
};

export default StampAnimation;
