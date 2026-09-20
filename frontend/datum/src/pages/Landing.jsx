import React, { Suspense, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Medallion3D from '../components/3d/Medallion3D';
import Button from '../components/ui/Button';
import { ArrowRight, Check, ShieldCheck, Target, Lock, TrendingUp, Zap } from 'lucide-react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const ScrambleText = ({ text, as: Component = 'span', className = '' }) => {
  const [displayText, setDisplayText] = React.useState('');
  const chars = '0123456789+-*/&#@$';
  
  React.useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(text.split('').map((char, index) => {
        if(char === ' ') return ' ';
        if(index < iteration) {
          return char;
        }
        return chars[Math.floor(Math.random() * chars.length)];
      }).join(''));
      
      if(iteration >= text.length) {
        clearInterval(interval);
      }
      
      iteration += 1 / 3; 
    }, 30);
    
    return () => clearInterval(interval);
  }, [text]);
  
  return <Component className={className}>{displayText}</Component>;
};

const FeatureCard = ({ title, desc, icon: Icon, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay, duration: 0.8, type: "spring", bounce: 0.4 }}
      whileHover={{ scale: 1.05, y: -10 }}
      className="group relative bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors cursor-pointer"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-brass-500)]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />
      <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-full bg-[var(--color-brass-500)]/20 text-[var(--color-brass-500)]">
        <Icon size={24} />
      </div>
      <h3 className="text-xl font-medium mb-4 text-[var(--color-paper-50)]">{title}</h3>
      <p className="text-[var(--color-paper-50)]/70 leading-relaxed relative z-10">{desc}</p>
    </motion.div>
  );
};

const Landing = () => {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  
  const yBg = useTransform(smoothProgress, [0, 1], ['0%', '50%']);
  const opacityHero = useTransform(smoothProgress, [0, 0.2], [1, 0]);
  const scaleHero = useTransform(smoothProgress, [0, 0.2], [1, 0.95]);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) - 0.5,
        y: (e.clientY / window.innerHeight) - 0.5,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-[var(--color-paper-50)] text-[var(--color-ink-900)] selection:bg-[var(--color-blueprint-600)] selection:text-white relative overflow-hidden">
      
      {/* Ambient Moving Blobs Background */}
      <motion.div 
        animate={{ 
          x: mousePosition.x * -100,
          y: mousePosition.y * -100
        }}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
        className="fixed top-[-20%] left-[-10%] w-[70vw] h-[70vw] max-w-[800px] max-h-[800px] bg-[var(--color-brass-500)]/5 blur-[120px] rounded-full pointer-events-none mix-blend-multiply" 
      />
      <motion.div 
        animate={{ 
          x: mousePosition.x * 100,
          y: mousePosition.y * 100
        }}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
        className="fixed bottom-[-20%] right-[-10%] w-[70vw] h-[70vw] max-w-[800px] max-h-[800px] bg-[var(--color-blueprint-600)]/5 blur-[120px] rounded-full pointer-events-none mix-blend-multiply" 
      />

      {/* Topographic Background Parallax */}
      <motion.div 
        className="absolute inset-[-20%] z-0 pointer-events-none opacity-[0.03]"
        style={{ 
          y: yBg,
          backgroundImage: 'linear-gradient(to right, var(--color-ink-900) 1px, transparent 1px), linear-gradient(to bottom, var(--color-ink-900) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10">
        {/* Top Nav */}
        <header className="flex justify-between items-center p-6 max-w-6xl mx-auto backdrop-blur-md sticky top-0 z-50 border-b border-transparent transition-colors duration-300">
          <Link to="/" className="flex items-center space-x-3 group">
            <motion.img 
              whileHover={{ rotate: 180 }} 
              transition={{ duration: 0.6 }}
              src="/favicon.svg" alt="Datum Logo" className="w-8 h-8" 
            />
            <div className="font-serif text-2xl tracking-tight mt-1 group-hover:text-[var(--color-blueprint-600)] transition-colors">Datum</div>
          </Link>
          <div className="space-x-4">
            <Link to="/login" className="hover:text-[var(--color-blueprint-600)] transition-colors font-medium">Log in</Link>
            <Link to="/signup">
              <Button className="hover:scale-105 transition-transform">Get started</Button>
            </Link>
          </div>
        </header>

        <main>
          {/* Hero */}
          <motion.section 
            style={{ opacity: opacityHero, scale: scaleHero }}
            className="py-24 md:py-32 max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center min-h-[80vh]"
          >
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
            >
              <h1 className="font-serif text-6xl md:text-8xl mb-6 leading-[1.05]">
                <ScrambleText text="A benchmark" className="inline-block whitespace-nowrap" /><br/>
                <span className="text-[var(--color-blueprint-600)] inline-block whitespace-nowrap"><ScrambleText text="for real data." /></span>
              </h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="text-xl md:text-2xl text-[var(--color-ink-900)]/70 mb-10 max-w-lg leading-relaxed font-light"
              >
                Connect directly with respondents who have verified their identity. Filter out low-effort responses and build your research on authentic data.
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link to="/requester"><Button className="w-full sm:w-auto flex items-center justify-center gap-2 group hover:shadow-xl hover:shadow-[var(--color-blueprint-600)]/20 transition-all duration-300">I need verified data <motion.span group-hover={{ x: 5 }}><ArrowRight size={16}/></motion.span></Button></Link>
                <Link to="/signup"><Button variant="secondary" className="w-full sm:w-auto flex items-center justify-center gap-2 hover:bg-white/50 transition-colors duration-300">I want to get paid <ArrowRight size={16}/></Button></Link>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="relative h-[450px] w-full flex items-center justify-center perspective-[1000px]"
              animate={{ 
                rotateX: mousePosition.y * -15,
                rotateY: mousePosition.x * 15
              }}
              transition={{ type: "spring", stiffness: 75, damping: 15 }}
            >
               {/* Glowing place with logo */}
               <div className="absolute inset-0 flex items-center justify-center">
                 <motion.div 
                   animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
                   transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                   className="absolute w-[300px] h-[300px] rounded-full bg-gradient-to-tr from-[var(--color-blueprint-600)]/30 to-[var(--color-brass-500)]/30 blur-[60px]"
                 />
                 {/* Spinning rings */}
                 <div className="w-[340px] h-[340px] rounded-full border border-[var(--color-blueprint-600)]/20 animate-[spin_40s_linear_infinite] absolute border-t-transparent"></div>
                 <div className="w-[260px] h-[260px] rounded-full border border-[var(--color-brass-500)]/20 absolute animate-[spin_30s_linear_infinite_reverse] border-b-transparent"></div>
               </div>
               
               <Suspense fallback={<div className="w-32 h-32 rounded-full bg-[var(--color-ink-900)]/10 animate-pulse"></div>}>
                 <motion.div 
                   animate={{ y: [0, -15, 0] }} 
                   transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                   className="z-10 drop-shadow-2xl"
                 >
                   <Medallion3D level={3} />
                 </motion.div>
               </Suspense>
            </motion.div>
          </motion.section>

          {/* Value Props - "How it holds up" */}
          <section className="py-32 bg-[var(--color-ink-900)] text-[var(--color-paper-50)] relative overflow-hidden rounded-[3rem] mx-4 md:mx-6 shadow-2xl">
            {/* Inner background grid for dark section */}
            <div 
              className="absolute inset-0 z-0 pointer-events-none opacity-10"
              style={{ 
                backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
                backgroundSize: '60px 60px',
              }}
            />
            <div className="max-w-6xl mx-auto px-6 relative z-10">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-20"
              >
                <h2 className="font-serif text-5xl md:text-6xl mb-6">How it holds up</h2>
                <p className="text-xl text-[var(--color-paper-50)]/60 max-w-2xl mx-auto font-light">Built on cryptographic principles to ensure data provenance from the moment a user signs up.</p>
              </motion.div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <FeatureCard 
                  delay={0.2}
                  icon={ShieldCheck}
                  title="Verified profiles" 
                  desc="People confirm who they are once. Anything already verified auto-fills and can't be edited, eliminating contradictory survey-hopping." 
                />
                <FeatureCard 
                  delay={0.4}
                  icon={Lock}
                  title="Locked answers" 
                  desc="Immutable responses tied to verified identity attributes. No duplicate entries, no VPN masking, just clean, traceable data points." 
                />
                <FeatureCard 
                  delay={0.6}
                  icon={TrendingUp}
                  title="Trust levels" 
                  desc="Ranked 0 to 5, earned by what you verify — not how much you answer. Higher levels unlock better surveys for respondents and guarantee quality." 
                />
              </div>
            </div>
          </section>

          {/* Dual Target Sections */}
          <div className="max-w-6xl mx-auto px-6 py-32 space-y-32">
            
            {/* For Requesters */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
                whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, type: "spring" }}
                className="order-2 md:order-1 relative h-96 bg-gradient-to-br from-[var(--color-blueprint-600)]/10 to-transparent rounded-3xl p-10 flex flex-col justify-center overflow-hidden border border-[var(--color-blueprint-600)]/20 backdrop-blur-sm shadow-xl"
              >
                 <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-blueprint-600)]/20 blur-[80px] rounded-full" />
                 
                 <motion.div 
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: 0.4 }}
                   className="relative z-10"
                 >
                   <div className="text-7xl font-serif text-[var(--color-blueprint-600)] mb-4">98.4%</div>
                   <div className="text-xl text-[var(--color-ink-900)]/80 font-medium leading-relaxed">Average pass rate on attention and quality checks across all Level 2+ respondents.</div>
                 </motion.div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="order-1 md:order-2"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-blueprint-600)]/10 text-[var(--color-blueprint-600)] text-sm font-bold mb-6">
                  <Target size={16} /> FOR RESEARCHERS
                </div>
                <h2 className="font-serif text-5xl mb-6 leading-tight">Data you can trust, out of the box.</h2>
                <p className="text-xl text-[var(--color-ink-900)]/70 leading-relaxed mb-8 font-light">
                  Stop filtering out bots after you've already paid for them. Target specific, verified demographics with surgical precision. Our built-in attention checks guarantee integrity.
                </p>
                <ul className="space-y-5 mb-10 text-[var(--color-ink-900)]/80 text-lg">
                  {[
                    "Pay only for verified data points",
                    "Live quality analytics and filtering",
                    "Exact demographic targeting"
                  ].map((text, i) => (
                    <motion.li 
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + (i * 0.1) }}
                      className="flex items-center"
                    >
                      <div className="w-6 h-6 rounded-full bg-[var(--color-verified-600)]/20 flex items-center justify-center mr-4">
                        <Check size={14} className="text-[var(--color-verified-600)]" />
                      </div>
                      {text}
                    </motion.li>
                  ))}
                </ul>
                <Link to="/requester"><Button className="text-lg px-8 py-4 shadow-lg hover:shadow-[var(--color-blueprint-600)]/20 hover:-translate-y-1 transition-all">Start building a survey</Button></Link>
              </motion.div>
            </section>

            {/* For Respondents */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-brass-500)]/10 text-[var(--color-brass-500)] text-sm font-bold mb-6">
                  <Zap size={16} /> FOR RESPONDENTS
                </div>
                <h2 className="font-serif text-5xl mb-6 leading-tight">Your data, your compensation.</h2>
                <p className="text-xl text-[var(--color-ink-900)]/70 leading-relaxed mb-8 font-light">
                  Verify your profile once, and never fill out another tedious pre-screening questionnaire. Earn points for honest answers and unlock higher-paying opportunities.
                </p>
                <ul className="space-y-5 mb-10 text-[var(--color-ink-900)]/80 text-lg">
                  {[
                    "No unpaid screening questions",
                    "Transparent sharing log",
                    "Earn points convertible to cash"
                  ].map((text, i) => (
                    <motion.li 
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + (i * 0.1) }}
                      className="flex items-center"
                    >
                      <div className="w-6 h-6 rounded-full bg-[var(--color-brass-500)]/20 flex items-center justify-center mr-4">
                        <Check size={14} className="text-[var(--color-brass-500)]" />
                      </div>
                      {text}
                    </motion.li>
                  ))}
                </ul>
                <Link to="/signup"><Button variant="secondary" className="text-lg px-8 py-4 bg-white shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">Create your profile</Button></Link>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
                whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, type: "spring" }}
                className="relative h-96 bg-gradient-to-bl from-[var(--color-brass-500)]/10 to-transparent rounded-3xl p-10 flex flex-col justify-center overflow-hidden border border-[var(--color-brass-500)]/20 backdrop-blur-sm shadow-xl text-right"
              >
                 <div className="absolute bottom-0 left-0 w-64 h-64 bg-[var(--color-brass-500)]/20 blur-[80px] rounded-full" />
                 
                 <motion.div 
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: 0.4 }}
                   className="relative z-10"
                 >
                   <div className="text-7xl font-serif text-[var(--color-brass-500)] mb-4">Level 3</div>
                   <div className="text-xl text-[var(--color-ink-900)]/80 font-medium leading-relaxed">Reach Level 3 to unlock premium surveys and 1.5x point multipliers.</div>
                 </motion.div>
              </motion.div>
            </section>

          </div>
        </main>

        {/* Footer (Same) */}
        <footer className="bg-[var(--color-ink-900)] text-[var(--color-paper-50)]/60 py-16 border-t border-[var(--color-ink-900)]">
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center space-x-3 mb-6 group">
                <img src="/favicon.svg" alt="Datum Logo" className="w-8 h-8 opacity-80 grayscale group-hover:grayscale-0 transition-all duration-300" />
                <div className="font-serif text-2xl tracking-tight text-[var(--color-paper-50)]">Datum</div>
              </div>
              <p className="text-sm leading-relaxed mb-6 font-light">
                The fixed reference point for real data. We connect researchers with verified respondents for noise-free datasets.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium text-[var(--color-paper-50)] mb-4">Product</h4>
              <ul className="space-y-3 text-sm font-light">
                <li><Link to="/requester" className="hover:text-[var(--color-blueprint-600)] transition-colors">For Requesters</Link></li>
                <li><Link to="/home" className="hover:text-[var(--color-blueprint-600)] transition-colors">For Respondents</Link></li>
                <li><a href="#" className="hover:text-[var(--color-blueprint-600)] transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-[var(--color-blueprint-600)] transition-colors">Documentation</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-[var(--color-paper-50)] mb-4">Company</h4>
              <ul className="space-y-3 text-sm font-light">
                <li><a href="#" className="hover:text-[var(--color-blueprint-600)] transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-[var(--color-blueprint-600)] transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-[var(--color-blueprint-600)] transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-[var(--color-blueprint-600)] transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-[var(--color-paper-50)] mb-4">Legal</h4>
              <ul className="space-y-3 text-sm font-light">
                <li><a href="#" className="hover:text-[var(--color-blueprint-600)] transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-[var(--color-blueprint-600)] transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-[var(--color-blueprint-600)] transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="max-w-6xl mx-auto px-6 mt-16 pt-8 border-t border-[var(--color-paper-50)]/10 text-sm flex flex-col md:flex-row justify-between items-center font-light">
            <div>© {new Date().getFullYear()} Datum Inc. All rights reserved.</div>
            <div className="mt-4 md:mt-0 space-x-6">
              <a href="#" className="hover:text-[var(--color-paper-50)] transition-colors">Twitter</a>
              <a href="#" className="hover:text-[var(--color-paper-50)] transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-[var(--color-paper-50)] transition-colors">GitHub</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Landing;
