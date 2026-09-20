import Panel from '../components/ui/Panel';
import { Circle } from 'lucide-react';

export const Wallet = () => {
  return (
    <div className="max-w-3xl">
      <h1 className="font-serif text-3xl mb-8">Points Wallet</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Panel>
          <div className="text-sm text-[var(--color-ink-900)]/60 mb-2">Available Balance</div>
          <div className="text-4xl font-serif mb-4 flex items-center">
            <Circle size={28} className="mr-3 text-[var(--color-brass-500)]" />
            2,550
          </div>
          <p className="text-sm text-[var(--color-ink-900)]/60">Estimated value: ~$24.50</p>
        </Panel>

        <Panel>
          <div className="text-sm text-[var(--color-ink-900)]/60 mb-4">Recent History </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <div className="font-medium">Consumer habits</div>
                <div className="text-sm text-[var(--color-ink-900)]/60">Today</div>
              </div>
              <div className="font-medium text-[var(--color-verified-600)]">+320</div>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <div className="font-medium">Regional study </div>
                <div className="text-sm text-[var(--color-ink-900)]/60">Sep 10 </div>
              </div>
              <div className="font-medium text-[var(--color-verified-600)]"> +600 </div>
            </div>
          </div>
        </Panel>
      </div>
    </div>
  );
};

export const Leaderboard = () => {
  return (
    <div className="max-w-3xl">
      <h1 className="font-serif text-3xl mb-8">Leaderboard</h1>
      
      <Panel>
        <div className="flex items-center justify-between border-b border-[var(--color-ink-900)]/10 pb-4 mb-4">
          <div className="font-medium text-[var(--color-ink-900)]/60">Rank</div>
          <div className="font-medium text-[var(--color-ink-900)]/60 text-right">Points</div>
        </div>
        
        <div className="space-y-4">
          {[
            { rank: 1, user: 'User_492', points: '12,450', highlight: false },
            { rank: 2, user: 'User_811', points: '11,200', highlight: false },
            { rank: 3, user: 'User_102', points: '10,950', highlight: false },
            { rank: '...', user: '...', points: '...', highlight: false },
            { rank: 128, user: 'You', points: '2,450', highlight: true },
          ].map((row, i) => (
            <div key={i} className={`flex items-center justify-between p-2 ${row.highlight ? 'bg-[var(--color-blueprint-600)]/5 -mx-2 px-4 rounded' : ''}`}>
              <div className="flex items-center space-x-4">
                <div className={`font-serif ${row.highlight ? 'text-[var(--color-blueprint-600)] font-bold' : ''}`}>{row.rank}</div>
                <div className={row.highlight ? 'font-bold' : ''}>{row.user}</div>
              </div>
              <div className={row.highlight ? 'font-bold' : ''}>{row.points}</div>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
};