import React from 'react';
import { Link } from 'react-router-dom';
import Badge from '../components/ui/Badge';
import Medallion from '../components/ui/Medallion';
import { motion } from 'framer-motion';
import { ArrowRight, Trophy, Flame } from 'lucide-react';

const AnimatedPanel = ({ children, delay = 0, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.6, type: "spring", bounce: 0.4 }}
    className={`bg-white/50 backdrop-blur-md border border-[var(--color-ink-900)]/10 rounded-2xl p-6 shadow-sm relative overflow-hidden group ${className}`}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-blueprint-600)]/0 to-[var(--color-blueprint-600)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="relative z-10">
      {children}
    </div>
  </motion.div>
);

const SurveyCard = ({ id, title, duration, points, reqLevel, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay, duration: 0.5, type: "spring" }}
  >
    <Link to={`/surveys/${id}`} className="block">
      <div className="bg-white hover:bg-white/90 border border-[var(--color-ink-900)]/10 hover:border-[var(--color-blueprint-600)]/30 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 relative group overflow-hidden">
        
        <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-blueprint-600)]/10 blur-[40px] rounded-full group-hover:bg-[var(--color-blueprint-600)]/20 transition-colors" />
        
        <div className="flex justify-between items-start relative z-10">
          <div>
            <h3 className="font-medium text-xl mb-2 text-[var(--color-ink-900)] group-hover:text-[var(--color-blueprint-600)] transition-colors">{title}</h3>
            <div className="flex items-center space-x-3 text-sm text-[var(--color-ink-900)]/60 font-medium">
              <span>~{duration} min</span>
              <span>•</span>
              <span className="text-[var(--color-brass-500)]">{points} pts</span>
            </div>
          </div>
          <Badge variant="level">Requires: L{reqLevel}+</Badge>
        </div>
      </div>
    </Link>
  </motion.div>
);

const RespondentDashboard = () => {
  return (
    <div className="relative">
      {/* Background Blobs */}
      <div className="fixed top-[10%] right-[10%] w-[40vw] h-[40vw] bg-[var(--color-blueprint-600)]/5 blur-[100px] rounded-full pointer-events-none" />
      <div className="fixed bottom-[10%] left-[10%] w-[30vw] h-[30vw] bg-[var(--color-brass-500)]/5 blur-[100px] rounded-full pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10"
      >
        <h1 className="font-serif text-4xl mb-10 tracking-tight text-[var(--color-ink-900)]">Your coordinates</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column: Stats & Profile Summary */}
          <div className="md:col-span-1 space-y-6">
            <AnimatedPanel delay={0.1} className="hover:scale-[1.02] transition-transform duration-300">
              <div className="flex items-center space-x-5 mb-6">
                <Medallion level={2} size="md" />
                <div>
                  <div className="font-serif text-2xl mb-1">Level 2</div>
                  <div className="text-sm font-medium text-[var(--color-ink-900)]/60">3 fields verified · 2 to go</div>
                </div>
              </div>
              <Link to="/profile" className="flex items-center text-[var(--color-blueprint-600)] text-sm font-bold group w-max">
                Verify next field 
                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </AnimatedPanel>

            <AnimatedPanel delay={0.2} className="hover:scale-[1.02] transition-transform duration-300">
              <div className="flex justify-between items-end mb-6">
                <div>
                  <div className="flex items-center text-sm font-medium text-[var(--color-ink-900)]/60 mb-2">
                    <Flame size={16} className="mr-1.5 text-orange-500" />
                    This week
                  </div>
                  <div className="font-serif text-2xl">Streak: 4</div>
                </div>
                <div className="text-right">
                  <div className="flex items-center justify-end text-sm font-medium text-[var(--color-ink-900)]/60 mb-2">
                    <Trophy size={16} className="mr-1.5 text-[var(--color-brass-500)]" />
                    Rank
                  </div>
                  <div className="font-serif text-2xl text-[var(--color-blueprint-600)]">#128</div>
                </div>
              </div>
              <div className="pt-4 border-t border-[var(--color-ink-900)]/10">
                <Link to="/leaderboard" className="flex justify-center items-center text-[var(--color-ink-900)]/60 hover:text-[var(--color-blueprint-600)] text-sm font-medium transition-colors w-full group">
                  View full leaderboard
                  <ArrowRight size={14} className="ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </Link>
              </div>
            </AnimatedPanel>
          </div>

          {/* Right Column: Matched Surveys */}
          <div className="md:col-span-2">
            <div className="flex justify-between items-end mb-6">
              <h2 className="text-2xl font-serif text-[var(--color-ink-900)]">Matched surveys</h2>
              <div className="bg-[var(--color-blueprint-600)]/10 text-[var(--color-blueprint-600)] px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                4 New
              </div>
            </div>
            
            <div className="space-y-5">
              <SurveyCard 
                id={1}
                title="Consumer habits in 2026"
                duration={4}
                points={320}
                reqLevel={1}
                delay={0.3}
              />
              <SurveyCard 
                id={2}
                title="Tech adoption in remote work"
                duration={8}
                points={600}
                reqLevel={2}
                delay={0.4}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default RespondentDashboard;
