import React from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, LogOut, ChevronDown, RefreshCw, Menu, X } from 'lucide-react';

// Layout Component
const Layout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isRequester = location.pathname.startsWith('/requester');
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const ProfileDropdown = ({ isMobile }) => (
    <div className="relative">
      <button 
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center space-x-2 focus:outline-none group"
      >
        <div className={`w-10 h-10 rounded-full flex items-center justify-center border shadow-sm transition-colors ${
          isMobile 
            ? 'bg-white/10 text-white border-white/20 hover:bg-white/20' 
            : 'bg-[var(--color-blueprint-600)]/10 text-[var(--color-blueprint-600)] border-[var(--color-blueprint-600)]/20 hover:bg-[var(--color-blueprint-600)]/20'
        }`}>
          <User size={18} />
        </div>
        {!isMobile && (
          <ChevronDown size={14} className={`text-[var(--color-ink-900)]/60 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
        )}
      </button>

      <AnimatePresence>
        {dropdownOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40" 
              onClick={() => setDropdownOpen(false)}
            />
            <motion.div 
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 mt-3 w-48 bg-white border border-[var(--color-ink-900)]/10 shadow-2xl rounded-xl overflow-hidden z-50 text-[var(--color-ink-900)]"
            >
              <div className="py-2">
                <button 
                  onClick={() => { setDropdownOpen(false); navigate('/profile'); }}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-[var(--color-ink-900)]/5 transition-colors flex items-center"
                >
                  <User size={16} className="mr-3 text-[var(--color-ink-900)]/60" />
                  MY PROFILE
                </button>
                <div className="h-px bg-[var(--color-ink-900)]/10 my-1"></div>
                <button 
                  onClick={() => { setDropdownOpen(false); navigate('/login'); }}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center"
                >
                  <LogOut size={16} className="mr-3" />
                  LOG OUT
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col md:flex-row relative">
      
      {/* Mobile Top Bar */}
      <div className="md:hidden bg-[var(--color-ink-900)] text-[var(--color-paper-50)] p-4 flex justify-between items-center z-40 sticky top-0">
        <button className="text-[var(--color-paper-50)]/80 hover:text-white focus:outline-none" onClick={() => setMobileMenuOpen(true)}>
          <Menu size={24} />
        </button>
        <div className="font-serif text-2xl tracking-tight absolute left-1/2 -translate-x-1/2">Datum</div>
        <ProfileDropdown isMobile={true} />
      </div>

      {/* Mobile Backdrop Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden fixed inset-0 bg-[var(--color-ink-900)]/50 z-40 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Persistent Left Nav / Side Drawer on Mobile */}
      <nav className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-[var(--color-ink-900)] text-[var(--color-paper-50)] p-6 flex flex-col
        transform transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0 md:h-screen md:sticky md:top-0 md:flex-shrink-0
        ${mobileMenuOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}
      `}>
        <div className="flex justify-between items-center mb-12">
          <div className="font-serif text-2xl tracking-tight">Datum</div>
          <button className="md:hidden text-[var(--color-paper-50)]/80 hover:text-white" onClick={() => setMobileMenuOpen(false)}>
            <X size={24} />
          </button>
        </div>
        
        <div className="flex flex-col space-y-4">
          {!isRequester ? (
            <>
              <Link onClick={() => setMobileMenuOpen(false)} to="/home" className={`hover:text-[var(--color-blueprint-600)] transition-colors ${location.pathname === '/home' ? 'text-[var(--color-blueprint-600)] font-medium' : ''}`}>Home</Link>
              <Link onClick={() => setMobileMenuOpen(false)} to="/profile" className={`hover:text-[var(--color-blueprint-600)] transition-colors ${location.pathname === '/profile' ? 'text-[var(--color-blueprint-600)] font-medium' : ''}`}>Profile</Link>
              <Link onClick={() => setMobileMenuOpen(false)} to="/wallet" className={`hover:text-[var(--color-blueprint-600)] transition-colors ${location.pathname === '/wallet' ? 'text-[var(--color-blueprint-600)] font-medium' : ''}`}>Wallet</Link>
              <Link onClick={() => setMobileMenuOpen(false)} to="/leaderboard" className={`hover:text-[var(--color-blueprint-600)] transition-colors ${location.pathname === '/leaderboard' ? 'text-[var(--color-blueprint-600)] font-medium' : ''}`}>Leaderboard</Link>
            </>
          ) : (
            <>
              <Link onClick={() => setMobileMenuOpen(false)} to="/requester" className={`hover:text-[var(--color-blueprint-600)] transition-colors ${location.pathname === '/requester' ? 'text-[var(--color-blueprint-600)] font-medium' : ''}`}>Dashboard</Link>
              <Link onClick={() => setMobileMenuOpen(false)} to="/requester/surveys/new" className={`hover:text-[var(--color-blueprint-600)] transition-colors ${location.pathname === '/requester/surveys/new' ? 'text-[var(--color-blueprint-600)] font-medium' : ''}`}>+ New Survey</Link>
            </>
          )}
        </div>

        <div className="mt-auto pt-12 text-sm border-t border-[var(--color-paper-50)]/10">
          <Link onClick={() => setMobileMenuOpen(false)} to={isRequester ? "/home" : "/requester"} className="flex items-center space-x-3 text-[var(--color-paper-50)]/70 hover:text-[var(--color-paper-50)] bg-white/5 hover:bg-white/10 p-3 rounded-xl transition-all duration-300 group w-full">
            <div className="bg-white/10 p-1.5 rounded-lg group-hover:bg-white/20 transition-colors">
              <RefreshCw size={14} className="group-hover:rotate-180 transition-transform duration-700" />
            </div>
            <span className="font-medium">Switch to {isRequester ? 'Respondent' : 'Requester'}</span>
          </Link>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto relative bg-[var(--color-paper-50)]">
        
        {/*  Top Bar with Profile Dropdown (Desktop Only)  */}
        <div className="hidden md:flex sticky top-0 z-40 px-6 md:px-12 py-4 justify-end items-center bg-[var(--color-paper-50)]/80 backdrop-blur-md border-b border-[var(--color-ink-900)]/5">
          <ProfileDropdown isMobile={false} />
        </div>

        <div className="p-6 md:p-12">
          <div className="max-w-4xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

import RespondentDashboard from './pages/RespondentDashboard';
import SurveyTaking from './pages/SurveyTaking';
import Profile from './pages/Profile';
import { Wallet, Leaderboard } from './pages/WalletLeaderboard';
import RequesterDashboard from './pages/RequesterDashboard';
import SurveyBuilder from './pages/SurveyBuilder';
import SurveyDetail from './pages/SurveyDetail';
import Landing from './pages/Landing';
import Auth from './pages/Auth';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/signup" element={<Auth />} />
        
        {/* Protected/App Routes wrapped in Layout */}
        <Route path="/*" element={
          <Layout>
            <Routes>
              {/* Respondent Routes */}
              <Route path="home" element={<RespondentDashboard />} />
              <Route path="surveys/:id" element={<SurveyTaking />} />
              <Route path="profile" element={<Profile />} />
              <Route path="wallet" element={<Wallet />} />
              <Route path="leaderboard" element={<Leaderboard />} />
              
              {/* Requester Routes */}
              <Route path="requester" element={<RequesterDashboard />} />
              <Route path="requester/surveys/new" element={<SurveyBuilder />} />
              <Route path="requester/surveys/:id" element={<SurveyDetail />} />
            </Routes>
          </Layout>
        } />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
