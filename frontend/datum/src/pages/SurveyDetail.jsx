import { useNavigate } from 'react-router-dom';
import Panel from '../components/ui/Panel';
import Button from '../components/ui/Button';

const SurveyDetail = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl">
      <div className="mb-8 border-b border-[var(--color-ink-900)]/20 pb-4 flex justify-between items-end">
        <div>
          <button onClick={() => navigate(-1)} className="text-[var(--color-ink-900)]/60 hover:text-[var(--color-ink-900)] mb-4 block">
            ← Back
          </button>
          <h1 className="font-serif text-3xl flex items-center">
            Consumer habits
            <span className="ml-4 inline-flex items-center space-x-1.5 text-base font-sans font-normal text-[var(--color-ink-900)]">
              <span className="w-2 h-2 rounded-full bg-[var(--color-verified-600)] animate-pulse"></span>
              <span>Live</span>
            </span>
          </h1>
        </div>
        <Button variant="secondary">Export CSV</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <section>
            <h2 className="text-xl font-medium mb-4">Progress</h2>
            <Panel>
              <div className="flex justify-between items-end mb-2">
                <span className="text-3xl font-serif">142<span className="text-[var(--color-ink-900)]/40 text-xl">/200</span></span>
                <span className="text-[var(--color-ink-900)]/60">71%</span>
              </div>
              <div className="w-full h-2 bg-[var(--color-ink-900)]/10 mb-4">
                <div className="bg-[var(--color-blueprint-600)] h-full transition-all" style={{width: '71%'}}></div>
              </div>
              <p className="text-sm text-[var(--color-ink-900)]/60">Estimated completion in ~14 hours.</p>
            </Panel>
          </section>

          <section>
            <h2 className="text-xl font-medium mb-4">Live analytics preview</h2>
            <Panel>
              <div className="h-48 border border-dashed border-[var(--color-ink-900)]/20 flex items-center justify-center text-[var(--color-ink-900)]/40">
                [Data visualization placeholder]
              </div>
            </Panel>
          </section>
        </div>

        <div className="md:col-span-1 space-y-8">
          <section>
            <h2 className="text-xl font-medium mb-4">Quality</h2>
            <Panel>
              <div className="text-3xl font-serif text-[var(--color-verified-600)] mb-2">94% pass</div>
              <ul className="text-sm space-y-2 text-[var(--color-ink-900)]/80">
                <li className="flex justify-between"><span>Accepted:</span> <span>142</span></li>
                <li className="flex justify-between"><span>Flagged (attention check):</span> <span>6</span></li>
                <li className="flex justify-between"><span>Flagged (speeding):</span> <span>3</span></li>
              </ul>
            </Panel>
          </section>
          
          <section>
            <h2 className="text-xl font-medium mb-4">Targeting summary</h2>
            <Panel>
              <ul className="text-sm space-y-2 text-[var(--color-ink-900)]/80">
                <li><span className="font-medium">Age:</span> 18—65</li>
                <li><span className="font-medium">Location:</span> United States</li>
                <li><span className="font-medium">Trust level:</span> Level 1+</li>
              </ul>
            </Panel>
          </section>
        </div>
      </div>
    </div>
  );
};

export default SurveyDetail;
