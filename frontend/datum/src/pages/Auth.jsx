import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Button from '../components/ui/Button';
import { Eye, EyeOff, CheckCircle2, Circle } from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';

const GravityWellBackground = () => {
  const canvasRef = React.useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let animationFrameId;
    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;
    canvas.width = width;
    canvas.height = height;

    const mouse = { x: -1000, y: -1000, targetX: -1000, targetY: -1000 };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
    };
    
    const handleMouseLeave = () => {
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    window.addEventListener('resize', () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width;
      canvas.height = height;
      initDots();
    });

    const spacing = 35;
    let dots = [];

    const initDots = () => {
      dots = [];
      const cols = Math.ceil(width / spacing);
      const rows = Math.ceil(height / spacing);
      for (let i = 0; i <= cols; i++) {
        for (let j = 0; j <= rows; j++) {
          dots.push({
            ox: i * spacing,
            oy: j * spacing,
            x: i * spacing,
            y: j * spacing,
            vx: 0,
            vy: 0
          });
        }
      }
    };

    initDots();

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Smooth mouse movement
      mouse.x += (mouse.targetX - mouse.x) * 0.15;
      mouse.y += (mouse.targetY - mouse.y) * 0.15;

      const gravityRadius = 250;
      const gravityForce = 0.55; 
      
      ctx.fillStyle = 'rgba(44, 74, 94, 0.4)'; // blueprint-600

      dots.forEach(dot => {
        // Calculate distance to mouse
        const dx = mouse.x - dot.ox;
        const dy = mouse.y - dot.oy;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        let targetX = dot.ox;
        let targetY = dot.oy;

        if (distance < gravityRadius) {
          // Calculate gravitational pull (closer = stronger)
          const force = (gravityRadius - distance) / gravityRadius;
          // Pull towards mouse
          targetX = dot.ox + dx * force * gravityForce;
          targetY = dot.oy + dy * force * gravityForce;
        }

        // Spring physics to move to target
        const ax = (targetX - dot.x) * 0.1; // Spring stiffness
        const ay = (targetY - dot.y) * 0.1;

        dot.vx += ax;
        dot.vy += ay;
        
        // Damping (friction)
        dot.vx *= 0.65;
        dot.vy *= 0.65;

        dot.x += dot.vx;
        dot.y += dot.vy;

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    
    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="hidden md:flex flex-1 relative overflow-hidden bg-[var(--color-paper-50)] items-center justify-center">
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full z-0"
      />

      {/* Datum Logo - Elegantly placed in the center */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 1.5, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center justify-center opacity-80 pointer-events-none mix-blend-multiply"
      >
        <div className="w-64 h-64 relative flex items-center justify-center">
          <img src="/favicon.svg" alt="Datum Logo" className="w-32 h-32 opacity-80 z-10 grayscale" />
        </div>
      </motion.div>

      {/* Floating coordinate hint */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-16 right-16 font-serif text-[var(--color-ink-900)]/40 text-xl max-w-[200px] leading-snug tracking-wide z-10 pointer-events-none"
      >
        "Your first verified coordinate."
      </motion.div>
    </div>
  );
};

const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isLogin = location.pathname === '/login';
  
  // State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [accountType, setAccountType] = useState(''); // 'respondent' or 'requester'
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // UI State
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  
  // Validation / Error state
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState(''); // For login
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [termsError, setTermsError] = useState('');
  const [globalError, setGlobalError] = useState('');
  
  // Sign up password rules
  const passwordRules = {
    length: password.length >= 8,
    number: /\d/.test(password),
    uppercase: /[A-Z]/.test(password)
  };
  const passwordValid = passwordRules.length && passwordRules.number && passwordRules.uppercase;

  // Clear errors when toggling modes
  useEffect(() => {
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');
    setTermsError('');
    setGlobalError('');
  }, [isLogin]);

  // Validation Handlers
  const validateEmail = () => {
    if (!email) {
      setEmailError('Enter a valid email address.');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Enter a valid email address.');
      return false;
    }
    setEmailError('');
    return true;
  };

  const validateConfirmPassword = () => {
    if (!isLogin && confirmPassword !== password && confirmPassword.length > 0) {
      setConfirmPasswordError("Passwords don't match.");
      return false;
    }
    setConfirmPasswordError('');
    return true;
  };

  const validateTerms = () => {
    if (!isLogin && !agreeTerms) {
      setTermsError("You'll need to accept the Terms to continue.");
      return false;
    }
    setTermsError('');
    return true;
  };
  
  const validateForm = () => {
    const isEmailValid = validateEmail();
    let isValid = isEmailValid;
    
    if (isLogin) {
      if (!password) {
        setPasswordError('Incorrect email or password.');
        isValid = false;
      }
    } else {
      if (!passwordValid) isValid = false;
      if (!validateConfirmPassword()) isValid = false;
      if (!accountType) isValid = false;
      if (!validateTerms()) isValid = false;
    }
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsLoading(true);
    setGlobalError('');
    
    // Simulate network
    setTimeout(() => {
      setIsLoading(false);
      // Mock failure for demonstration
      if (email === 'fail@example.com') {
        setGlobalError('Something went wrong creating your account. Try again.');
        return;
      }
      
      if (isLogin) {
        navigate('/home');
      } else {
        navigate(accountType === 'requester' ? '/requester' : '/home');
      }
    }, 1500);
  };

  const handleGoogleSubmit = () => {
    setIsGoogleLoading(true);
    // Simulate Google flow
    setTimeout(() => {
      setIsGoogleLoading(false);
      navigate('/home'); // Bypassing role selection flow for simplicity as discussed
    }, 1500);
  };

  const isSubmitDisabled = () => {
    if (isLogin) {
      return !email || !password || isLoading || isGoogleLoading;
    } else {
      return !email || !password || !passwordValid || !confirmPassword || !accountType || !agreeTerms || isLoading || isGoogleLoading;
    }
  };

  return (
    <div className="h-screen overflow-hidden flex bg-[var(--color-paper-50)] text-[var(--color-ink-900)] selection:bg-[var(--color-blueprint-600)] selection:text-[var(--color-paper-50)]">
      {/* Left Pane - Form Panel */}
      <div className="w-full md:w-[480px] lg:w-[560px] h-full overflow-y-auto flex-shrink-0 bg-white md:border-r border-[var(--color-ink-900)]/10 relative z-10 shadow-2xl">
        <div className="min-h-full flex flex-col justify-center px-8 md:px-16 py-12">
        
        {/* Header */}
        <div className="mb-10">
          <Link to="/" className="inline-flex items-center space-x-3 text-[var(--color-ink-900)] hover:opacity-80 transition-opacity mb-8 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-blueprint-600)] focus-visible:ring-offset-2 rounded-sm">
            <img src="/favicon.svg" alt="Datum Logo" className="w-8 h-8" />
            <span className="font-serif text-2xl tracking-tight">Datum</span>
          </Link>
          <h1 className="font-serif text-3xl font-medium tracking-tight">
            {isLogin ? 'Log in' : 'Create your account'}
          </h1>
        </div>

        {/* Global Error Banner */}
        <AnimatePresence>
          {globalError && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-sm"
            >
              {globalError}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Google OAuth */}
        <button 
          type="button"
          onClick={handleGoogleSubmit}
          disabled={isGoogleLoading || isLoading}
          className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-white border border-[var(--color-ink-900)]/10 text-[var(--color-ink-900)] font-medium rounded-sm hover:bg-[var(--color-ink-900)]/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-blueprint-600)] transition-colors disabled:opacity-70"
        >
          {isGoogleLoading ? (
            <div className="w-5 h-5 border-2 border-[var(--color-ink-900)]/20 border-t-[var(--color-ink-900)] rounded-full animate-spin" />
          ) : (
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="" className="w-5 h-5" aria-hidden="true" />
          )}
          <span>{isGoogleLoading ? 'Connecting to Google...' : 'Continue with Google'}</span>
        </button>

        <div className="flex items-center my-8">
          <div className="flex-1 border-t border-[var(--color-ink-900)]/10"></div>
          <span className="px-4 text-[var(--color-ink-900)]/40 text-sm">or</span>
          <div className="flex-1 border-t border-[var(--color-ink-900)]/10"></div>
        </div>

        {/* Main Form */}
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1.5">Email</label>
            <input 
              id="email"
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={validateEmail}
              aria-describedby={emailError ? "email-error" : undefined}
              className={`w-full bg-transparent border py-2.5 px-3 rounded-sm focus:outline-none focus:ring-2 transition-shadow ${emailError ? 'border-[var(--color-flag-600)] focus:border-[var(--color-flag-600)] focus:ring-[var(--color-flag-600)]' : 'border-[var(--color-ink-900)]/20 focus:border-[var(--color-blueprint-600)] focus:ring-[var(--color-blueprint-600)]'}`}
              required
            />
            {emailError && <p id="email-error" className="mt-1.5 text-sm text-[var(--color-flag-600)]">{emailError}</p>}
          </div>

          {/* Password Field */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label htmlFor="password" className="block text-sm font-medium">Password</label>
            </div>
            <div className="relative">
              <input 
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-describedby={isLogin && passwordError ? "login-error" : undefined}
                className={`w-full bg-transparent border py-2.5 px-3 pr-10 rounded-sm focus:outline-none focus:ring-2 transition-shadow ${passwordError ? 'border-[var(--color-flag-600)] focus:border-[var(--color-flag-600)] focus:ring-[var(--color-flag-600)]' : 'border-[var(--color-ink-900)]/20 focus:border-[var(--color-blueprint-600)] focus:ring-[var(--color-blueprint-600)]'}`}
                required
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 px-3 flex items-center text-[var(--color-ink-900)]/40 hover:text-[var(--color-ink-900)]/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-blueprint-600)] rounded-sm"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            
            {/* Login Password Error */}
            {isLogin && passwordError && (
              <p id="login-error" className="mt-1.5 text-sm text-[var(--color-flag-600)]">{passwordError}</p>
            )}

            {/* Login Forgot Password */}
            {isLogin && (
              <div className="mt-2 text-right">
                <a href="#" className="text-sm text-[var(--color-blueprint-600)] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-blueprint-600)] rounded-sm">Forgot password?</a>
              </div>
            )}

            {/* Sign Up Password Strength */}
            {!isLogin && (
              <div className="mt-3 space-y-1.5">
                <div className="flex items-center gap-2 text-sm">
                  {passwordRules.length ? <CheckCircle2 size={14} className="text-[var(--color-verified-600)]" /> : <Circle size={14} className="text-[var(--color-ink-900)]/30" />}
                  <span className={passwordRules.length ? "text-[var(--color-ink-900)]" : "text-[var(--color-ink-900)]/60"}>8+ characters</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  {passwordRules.number ? <CheckCircle2 size={14} className="text-[var(--color-verified-600)]" /> : <Circle size={14} className="text-[var(--color-ink-900)]/30" />}
                  <span className={passwordRules.number ? "text-[var(--color-ink-900)]" : "text-[var(--color-ink-900)]/60"}>1 number</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  {passwordRules.uppercase ? <CheckCircle2 size={14} className="text-[var(--color-verified-600)]" /> : <Circle size={14} className="text-[var(--color-ink-900)]/30" />}
                  <span className={passwordRules.uppercase ? "text-[var(--color-ink-900)]" : "text-[var(--color-ink-900)]/60"}>1 uppercase letter</span>
                </div>
              </div>
            )}
          </div>

          {/* Confirm Password (Sign Up) */}
          {!isLogin && (
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1.5">Confirm password</label>
              <input 
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onBlur={validateConfirmPassword}
                aria-describedby={confirmPasswordError ? "confirm-error" : undefined}
                className={`w-full bg-transparent border py-2.5 px-3 rounded-sm focus:outline-none focus:ring-2 transition-shadow ${confirmPasswordError ? 'border-[var(--color-flag-600)] focus:border-[var(--color-flag-600)] focus:ring-[var(--color-flag-600)]' : 'border-[var(--color-ink-900)]/20 focus:border-[var(--color-blueprint-600)] focus:ring-[var(--color-blueprint-600)]'}`}
                required
              />
              {confirmPasswordError && <p id="confirm-error" className="mt-1.5 text-sm text-[var(--color-flag-600)]">{confirmPasswordError}</p>}
            </div>
          )}

          {/* Role Selection (Sign Up) */}
          {!isLogin && (
            <fieldset className="pt-2">
              <legend className="block text-sm font-medium mb-3">I'm signing up to:</legend>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${accountType === 'respondent' ? 'border-[var(--color-blueprint-600)]' : 'border-[var(--color-ink-900)]/40 group-hover:border-[var(--color-blueprint-600)]'}`}>
                    {accountType === 'respondent' && <div className="w-2 h-2 rounded-full bg-[var(--color-blueprint-600)]" />}
                  </div>
                  <input type="radio" name="role" value="respondent" className="sr-only" checked={accountType === 'respondent'} onChange={() => setAccountType('respondent')} />
                  <span className="text-sm group-focus-within:ring-2 group-focus-within:ring-[var(--color-blueprint-600)] group-focus-within:ring-offset-1 rounded-sm">Answer surveys</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${accountType === 'requester' ? 'border-[var(--color-blueprint-600)]' : 'border-[var(--color-ink-900)]/40 group-hover:border-[var(--color-blueprint-600)]'}`}>
                    {accountType === 'requester' && <div className="w-2 h-2 rounded-full bg-[var(--color-blueprint-600)]" />}
                  </div>
                  <input type="radio" name="role" value="requester" className="sr-only" checked={accountType === 'requester'} onChange={() => setAccountType('requester')} />
                  <span className="text-sm group-focus-within:ring-2 group-focus-within:ring-[var(--color-blueprint-600)] group-focus-within:ring-offset-1 rounded-sm">Get research data</span>
                </label>
              </div>
            </fieldset>
          )}

          {/* Terms Checkbox (Sign Up) */}
          {!isLogin && (
            <div className="pt-2">
              <div className="flex items-start gap-3">
                <div className="flex items-center h-5">
                  <input 
                    type="checkbox" 
                    id="terms" 
                    checked={agreeTerms}
                    onChange={(e) => {
                      setAgreeTerms(e.target.checked);
                      if (e.target.checked) setTermsError('');
                    }}
                    aria-describedby={termsError ? "terms-error" : undefined}
                    className="w-4 h-4 border border-[var(--color-ink-900)]/40 rounded-sm text-[var(--color-blueprint-600)] focus:ring-[var(--color-blueprint-600)] cursor-pointer"
                  />
                </div>
                <label htmlFor="terms" className="text-sm text-[var(--color-ink-900)]/80 leading-snug cursor-pointer">
                  I agree to the <a href="#" className="text-[var(--color-blueprint-600)] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-blueprint-600)] rounded-sm">Terms</a> and <a href="#" className="text-[var(--color-blueprint-600)] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-blueprint-600)] rounded-sm">Privacy Policy</a>
                </label>
              </div>
              {termsError && <p id="terms-error" className="mt-1.5 text-sm text-[var(--color-flag-600)] ml-7">{termsError}</p>}
            </div>
          )}
          
          <div className="pt-4">
            <Button 
              type="submit" 
              disabled={isSubmitDisabled()} 
              className="w-full py-3 justify-center text-base disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  <span>{isLogin ? 'Logging in...' : 'Creating account...'}</span>
                </div>
              ) : (
                isLogin ? 'Log in' : 'Create account'
              )}
            </Button>
          </div>
          
        </form>

        <div className="mt-8 text-sm">
          {isLogin ? (
            <span>Don't have an account? <Link to="/signup" className="text-[var(--color-blueprint-600)] font-medium hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-blueprint-600)] rounded-sm">Sign up</Link></span>
          ) : (
            <span>Already have an account? <Link to="/login" className="text-[var(--color-blueprint-600)] font-medium hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-blueprint-600)] rounded-sm">Log in</Link></span>
          )}
        </div>
        </div>
      </div>

      <GravityWellBackground />

    </div>
  );
};

export default Auth;
