import React from 'react';
import Panel from '../components/ui/Panel';
import Button from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';

const SurveyBuilder = () => {
  const navigate = useNavigate();

  const trustLevelOptions = [
    { value: 'Basic verification', label: 'Level 1' },
    { value: 'Identity verified', label: 'Level 2' },
    { value: 'Financials verified', label: 'Level 3' },
    { value: 'Verified by community', label: 'Level 4' },
    { value: 'Verified by community', label: 'Level 5' },
  ]
  const trustLevel = trustLevelOptions.map((option) => {
    return <option key={option.value} value={option.value}>{option.label} ({option.value})</option>
  })

  const location = [
    { value: 'Any', label: 'Any' },
    { value: 'Nigeria', label: 'Nigeria' },
    { value: 'Ghana', label: 'Ghana' },
    { value: 'Kenya', label: 'Kenya' },
    { value: 'South Africa', label: 'South Africa' },
    { value: 'Rwanda', label: 'Rwanda' },
    { value: 'Uganda', label: 'Uganda' },
    { value: 'Tanzania', label: 'Tanzania' },
    { value: 'Zambia', label: 'Zambia' },
    { value: 'Zimbabwe', label: 'Zimbabwe' },
    { value: 'Ethiopia', label: 'Ethiopia' },
    { value: 'Kenya', label: 'Kenya' },
    { value: 'South Africa', label: 'South Africa' },
    { value: 'Rwanda', label: 'Rwanda' },
    { value: 'Uganda', label: 'Uganda' },
    { value: 'Tanzania', label: 'Tanzania' },
    { value: 'Zambia', label: 'Zambia' },
    { value: 'Zimbabwe', label: 'Zimbabwe' },
    { value: 'Ethiopia', label: 'Ethiopia' },
  ]
  const locationOptions = location.map((option) => {
    return <option key={option.value} value={option.value}>{option.label}</option>
  })
  
  return (
    <div className="max-w-2xl">
      <div className="mb-8 border-b border-[var(--color-ink-900)]/20 pb-4">
        <button onClick={() => navigate(-1)} className="text-[var(--color-ink-900)]/60 hover:text-[var(--color-ink-900)] mb-4 block">
          ← Back
        </button>
        <h1 className="font-serif text-3xl">New Survey</h1>
      </div>

      <div className="space-y-12">
        {/*  Step 1  */}
        <section>
          <h2 className="text-xl font-medium mb-4 text-[var(--color-ink-900)]/60">Step: Who do you need?</h2>
          <Panel>
            <div className="space-y-4">
              <div className="grid grid-cols-12 gap-4 items-center">
                <div className="col-span-3 font-medium text-[var(--color-ink-900)]/80">Age range</div>
                <div className="col-span-9 flex space-x-2 items-center">
                  <input type="number" defaultValue="18" className="border border-[var(--color-ink-900)]/20 bg-transparent px-3 py-1.5 w-20" />
                  <span>-</span>
                  <input type="number" defaultValue="65" className="border border-[var(--color-ink-900)]/20 bg-transparent px-3 py-1.5 w-20" />
                </div>
              </div>
              <div className="grid grid-cols-12 gap-4 items-center">
                <div className="col-span-3 font-medium text-[var(--color-ink-900)]/80">Location</div>
                <div className="col-span-9">
                  <select className="border border-[var(--color-ink-900)]/20 bg-transparent px-3 py-1.5 w-full max-w-xs">
                    {locationOptions}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-12 gap-4 items-center">
                <div className="col-span-3 font-medium text-[var(--color-ink-900)]/80">Min. trust level</div>
                <div className="col-span-9">
                  <select className="border border-[var(--color-ink-900)]/20 bg-transparent px-3 py-1.5 w-full max-w-xs">
                    {trustLevel}
                  </select>
                </div>
              </div>
            </div>
          </Panel>
        </section>

        {/*  Step 2 */}
        <section>
          <h2 className="text-xl font-medium mb-4 text-[var(--color-ink-900)]/60">Step: What do you need to know?</h2>
          <Panel>
            <div className="mb-6">
              <div className="font-medium mb-3">From verified profile:</div>
              <div className="flex flex-wrap gap-2">
                <Button variant="secondary" className="!py-1 !px-3 !text-sm border-dashed">+ Age</Button>
                <Button variant="secondary" className="!py-1 !px-3 !text-sm border-dashed">+ Location</Button>
                <Button variant="secondary" className="!py-1 !px-3 !text-sm border-dashed">+ Income</Button>
              </div>
            </div>
            
            <div>
              <div className="font-medium mb-3">Custom questions:</div>
              <Button variant="secondary" className="!py-1 !px-3 !text-sm border-dashed">+ Add question</Button>
            </div>
          </Panel>
        </section>

        {/* Step 3 */}
        <section>
          <h2 className="text-xl font-medium mb-4 text-[var(--color-ink-900)]/60">Step: Timing & budget</h2>
          <Panel>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span>Need</span>
                <input type="number" defaultValue="200" className="border border-[var(--color-ink-900)]/20 bg-transparent px-3 py-1.5 w-24" />
                <span>responses by</span>
                <input type="date" className="border border-[var(--color-ink-900)]/20 bg-transparent px-3 py-1.5" />
              </div>
              
              <div className="pt-4 mt-4 border-t border-[var(--color-ink-900)]/10 text-[var(--color-ink-900)]/80">
                Estimated cost: <span className="font-medium">320 pts</span> × 200 = <span className="font-bold text-lg text-[var(--color-blueprint-600)]">64,000 pts</span>
              </div>
            </div>
          </Panel>
        </section>
        
        <div className="pt-8">
          <Button variant="stamp" onClick={() => navigate('/requester')}>Publish survey</Button>
        </div>
      </div>
    </div>
  );
};

export default SurveyBuilder;
