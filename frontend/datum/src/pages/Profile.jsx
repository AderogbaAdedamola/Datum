import Medallion from '../components/ui/Medallion';
import { ShieldCheck, ArrowUpRight } from 'lucide-react';
import Button from '../components/ui/Button';

const Profile = () => {
  const MAX_LEVEL = 5;
  const user = {
    level: 2,
  }
  return (
    <div className="max-w-3xl">
      <div className="flex flex-col md:flex-row items-start gap-12 mb-16">
        <div className="flex-shrink-0">
          <Medallion level={user.level} size="lg" />
        </div>
        <div>
          <h1 className="font-serif text-3xl mb-2">Your profile</h1>
          <p className="text-xl text-[var(--color-ink-900)]/60 font-serif mb-6">Level {user.level} of {MAX_LEVEL}</p>
          <div className="text-[var(--color-ink-900)]/80 max-w-md leading-relaxed">
            Your trust level determines which surveys you qualify for. Higher levels require more verified information and a consistent track record of quality responses.
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-[var(--color-ink-900)]/20 pt-12">
        <div>
          <h2 className="font-serif text-2xl mb-6">Verified fields</h2>
          <ul className="space-y-4">
            <li className="flex items-center text-[var(--color-ink-900)]">
              <ShieldCheck size={18} className="mr-3 text-[var(--color-verified-600)]" />
              <span className="font-medium mr-2">Age</span>
              <span className="text-[var(--color-ink-900)]/60">— verified</span>
            </li>
            <li className="flex items-center text-[var(--color-ink-900)]">
              <ShieldCheck size={18} className="mr-3 text-[var(--color-verified-600)]" />
              <span className="font-medium mr-2">Location</span>
              <span className="text-[var(--color-ink-900)]/60">— verified</span>
            </li>
            <li className="flex items-center text-[var(--color-ink-900)]">
              <ShieldCheck size={18} className="mr-3 text-[var(--color-verified-600)]" />
              <span className="font-medium mr-2">Email</span>
              <span className="text-[var(--color-ink-900)]/60">— verified</span>
            </li>
            <li className="flex items-center text-[var(--color-ink-900)]/40">
              <div className="w-[18px] h-[18px] rounded-full border border-[var(--color-ink-900)]/30 mr-3" />
              <span className="font-medium mr-2">Education</span>
              <span>— not yet</span>
            </li>
            <li className="flex items-center text-[var(--color-ink-900)]/40">
              <div className="w-[18px] h-[18px] rounded-full border border-[var(--color-ink-900)]/30 mr-3" />
              <span className="font-medium mr-2">Income bracket</span>
              <span>— not yet</span>
            </li>
          </ul>
          <div className="mt-8">
            <Button variant="secondary">Verify a field →</Button>
          </div>
        </div>

        <div>
          <h2 className="font-serif text-2xl mb-6">Sharing log</h2>
          <div className="space-y-6">
            <div className="flex items-start">
              <ArrowUpRight size={18} className="mr-3 mt-1 text-[var(--color-ink-900)]/40" />
              <div>
                <div className="font-medium">Age shared with "Consumer habits" survey</div>
                <div className="text-sm text-[var(--color-ink-900)]/60 mt-1">on Sep 12</div>
              </div>
            </div>
            <div className="flex items-start">
              <ArrowUpRight size={18} className="mr-3 mt-1 text-[var(--color-ink-900)]/40" />
              <div>
                <div className="font-medium">Location shared with "Regional study" survey</div>
                <div className="text-sm text-[var(--color-ink-900)]/60 mt-1">on Sep 10</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
