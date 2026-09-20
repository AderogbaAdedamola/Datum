import { useNavigate } from 'react-router-dom';
import FieldLocked from '../components/ui/FieldLocked';
import Button from '../components/ui/Button';
import StampAnimation from '../components/ui/StampAnimation';

const SurveyTaking = () => {
  const navigate = useNavigate();
  const [showStamp, setShowStamp] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowStamp(true);
  };

  const handleAnimationComplete = () => {
    navigate('/home');
  };

  const question = [
    {
      Q: "Your age",
      type: 'locked'
    }
  ]

  return (
    <div className="max-w-2xl">
      <div className="mb-8 border-b border-[var(--color-ink-900)]/20 pb-4">
        <button onClick={() => navigate(-1)} className="text-[var(--color-ink-900)]/60 hover:text-[var(--color-ink-900)] mb-4 block">
          ← Back
        </button>
        <div className="text-sm text-[var(--color-ink-900)]/60 mb-2">Consumer habits · 320 pts · ~4 min</div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-12">
        {/* Auto-filled locked question */}
        <div>
          <h3 className="font-medium mb-4">Q1. Your age</h3>
          <FieldLocked value="32" />
        </div>

        <div>
          <h3 className="font-medium mb-4">Q2. How often do you buy specialized coffee?</h3>
          <div className="space-y-3">
            {['Weekly', 'Monthly', 'Rarely', 'Never'].map((opt) => (
              <label key={opt} className="flex items-center space-x-3 cursor-pointer group">
                <div className="w-5 h-5 rounded-full border border-[var(--color-ink-900)]/30 flex items-center justify-center group-hover:border-[var(--color-blueprint-600)] transition-colors">
                  <div className="w-2.5 h-2.5 rounded-full bg-transparent group-hover:bg-[var(--color-blueprint-600)]/20" />
                </div>
                <span>{opt}</span>
                <input type="radio" name="q2" value={opt} className="hidden" />
              </label>
            ))}
          </div>
        </div>

        {/* Attention check */}
        <div>
          <h3 className="font-medium mb-4">Q3. To ensure you are reading carefully, please select "Blue" below.</h3>
          <div className="space-y-3">
            {['Red', 'Blue', 'Green', 'Yellow'].map((opt) => (
              <label key={opt} className="flex items-center space-x-3 cursor-pointer group">
                <div className="w-5 h-5 rounded-full border border-[var(--color-ink-900)]/30 flex items-center justify-center group-hover:border-[var(--color-blueprint-600)] transition-colors">
                  <div className="w-2.5 h-2.5 rounded-full bg-transparent group-hover:bg-[var(--color-blueprint-600)]/20" />
                </div>
                <span>{opt}</span>
                <input type="radio" name="q3" value={opt} className="hidden" />
              </label>
            ))}
          </div>
        </div>

        <div className="pt-8 border-t border-[var(--color-ink-900)]/20">
          <Button type="submit" variant="stamp">Submit response</Button>
        </div>
      </form>

      <StampAnimation show={showStamp} onComplete={handleAnimationComplete} />
    </div>
  );
};

export default SurveyTaking;
