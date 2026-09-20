import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import { motion } from 'framer-motion';
import { ArrowRight, Plus, Activity, CheckCircle2 } from 'lucide-react';

const SurveyRow = ({ id, title, completed, total, passRate, status, delay = 0 }) => {
  const percentage = Math.round((completed / total) * 100);
  const isLive = status === 'live';

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.5, type: "spring" }}
      className="group"
    >
      <Link to={`/requester/surveys/${id}`} className="block">
        <div className="bg-white/50 backdrop-blur-md border border-[var(--color-ink-900)]/5 hover:border-[var(--color-blueprint-600)]/30 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:bg-white relative overflow-hidden mb-4 flex flex-col md:flex-row md:items-center justify-between gap-6">
          
          {/* Subtle glowing background on hover */}
          <div className="absolute top-0 right-0 w-64 h-full bg-gradient-to-l from-[var(--color-blueprint-600)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          {/* Title Area */}
          <div className="flex-1 min-w-[200px]">
            <h3 className="font-medium text-lg text-[var(--color-ink-900)] group-hover:text-[var(--color-blueprint-600)] transition-colors mb-1 flex items-center">
              {title}
              <ArrowRight size={16} className="ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[var(--color-blueprint-600)]" />
            </h3>
            <div className="text-sm font-medium text-[var(--color-ink-900)]/50">
              ID: DAT-{id}000{id}
            </div>
          </div>

          {/* Progress Area */}
          <div className="flex-1 min-w-[200px]">
            <div className="flex justify-between items-end mb-2 text-sm font-medium">
              <span className="text-[var(--color-ink-900)]/70">Progress</span>
              <span>{completed} / {total}</span>
            </div>
            <div className="h-2 w-full bg-[var(--color-ink-900)]/10 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ delay: delay + 0.3, duration: 1, ease: "easeOut" }}
                className={`h-full rounded-full ${isLive ? 'bg-[var(--color-blueprint-600)]' : 'bg-[var(--color-ink-900)]/40'}`} 
              />
            </div>
          </div>

          {/* Quality Area */}
          <div className="w-32">
            <div className="text-sm font-medium text-[var(--color-ink-900)]/50 mb-1">Quality</div>
            <div className="font-bold text-[var(--color-verified-600)] flex items-center">
              <CheckCircle2 size={16} className="mr-1.5" />
              {passRate}% pass
            </div>
          </div>

          {/* Status Area */}
          <div className="w-32 flex justify-end md:justify-start">
            <span className={`inline-flex items-center space-x-2 px-3 py-1.5 rounded-full text-sm font-bold ${
              isLive 
                ? 'bg-[var(--color-blueprint-600)]/10 text-[var(--color-blueprint-600)]' 
                : 'bg-[var(--color-ink-900)]/5 text-[var(--color-ink-900)]/60'
            }`}>
              {isLive ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-[var(--color-blueprint-600)] animate-pulse"></span>
                  <span>Live</span>
                </>
              ) : (
                <>
                  <Activity size={14} />
                  <span>Complete</span>
                </>
              )}
            </span>
          </div>

        </div>
      </Link>
    </motion.div>
  );
};

const RequesterDashboard = () => {
  return (
    <div className="relative">
      {/* Background Blobs */}
      <div className="fixed top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-[var(--color-blueprint-600)]/5 blur-[120px] rounded-full pointer-events-none mix-blend-multiply" />
      <div className="fixed bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-[var(--color-brass-500)]/5 blur-[100px] rounded-full pointer-events-none mix-blend-multiply" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10"
      >
        <div className="flex flex-col sm:flex-row justify-between sm:items-end mb-10 gap-4">
          <div>
            <h1 className="font-serif text-4xl mb-2 tracking-tight">Your surveys</h1>
            <p className="text-[var(--color-ink-900)]/60 font-medium">Overview of your active and completed data collections.</p>
          </div>
          <Link to="/requester/surveys/new">
            <Button className="flex items-center gap-2 hover:scale-105 transition-transform shadow-lg shadow-[var(--color-blueprint-600)]/20">
              <Plus size={18} /> New survey
            </Button>
          </Link>
        </div>
        
        <div className="space-y-2">
          {/* List Headers (Desktop Only) */}
          <div className="hidden md:flex items-center justify-between px-6 pb-2 text-sm font-bold text-[var(--color-ink-900)]/40 uppercase tracking-wider">
            <div className="flex-1 min-w-[200px]">Name</div>
            <div className="flex-1 min-w-[200px]">Progress</div>
            <div className="w-32">Quality</div>
            <div className="w-32">Status</div>
          </div>

          <SurveyRow 
            id={1}
            title="Consumer habits"
            completed={142}
            total={200}
            passRate={94}
            status="live"
            delay={0.1}
          />
          <SurveyRow 
            id={2}
            title="Regional study"
            completed={50}
            total={50}
            passRate={88}
            status="complete"
            delay={0.2}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default RequesterDashboard;
