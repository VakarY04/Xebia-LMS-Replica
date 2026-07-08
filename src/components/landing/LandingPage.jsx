import React, { useState } from 'react';
import { useUIStore } from '../../store';
import { 
  Menu, 
  X, 
  Moon, 
  Sun,
  ArrowRight, 
  Check, 
  Users, 
  BookOpen, 
  Clock, 
  Award, 
  Cpu, 
  Layers, 
  BarChart3, 
  TrendingUp, 
  ChevronRight,
  BookMarked,
  Binary,
  GraduationCap,
  Building,
  Settings,
  Brain,
  ClipboardList,
  Shield,
  Server
} from 'lucide-react';

import logoPurple from '../../assets/logo/logo-purple-BChHg7OV.png';
import logoWhite from '../../assets/logo/logo-white-BP39qsjW.png';

export const LandingPage = () => {
  const { setCurrentView } = useUIStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Home');
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Typewriter effect state
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  React.useEffect(() => {
    let timer;
    const fullWord = "Welcome to Xebia Enterprise LMS";
    const handleType = () => {
      if (!isDeleting) {
        setCurrentText(fullWord.substring(0, currentText.length + 1));
        setTypingSpeed(100);

        if (currentText === fullWord) {
          timer = setTimeout(() => setIsDeleting(true), 2500);
          return;
        }
      } else {
        setCurrentText(fullWord.substring(0, currentText.length - 1));
        setTypingSpeed(50);

        if (currentText === '') {
          setIsDeleting(false);
          setTypingSpeed(300);
          return;
        }
      }
    };

    timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, typingSpeed]);

  const navigationLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Portals', href: '#portals' },
    { label: 'Features', href: '#features' },
    { label: 'About Us', href: '#about' },
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-xebia-purpleDark text-white' : 'bg-xebia-blueishGrey text-xebia-darkGrey'} transition-colors duration-300 font-sans`}>
      {/* 1. STICKY HEADER FIXED NAVIGATION */}
      <header className="sticky top-0 z-50 bg-white border-b border-xebia-lightGrey/80 backdrop-blur-md bg-opacity-95 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Left side: logo */}
          <div className="flex items-center">
            <img 
              src={isDarkMode ? logoWhite : logoPurple} 
              alt="Xebia Logo" 
              className="h-11 w-auto object-contain" 
            />
          </div>

          {/* Center Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-8">
            {navigationLinks.map((link) => {
              const isActive = activeTab === link.label;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setActiveTab(link.label)}
                  className={`relative text-sm font-semibold py-2 transition-colors duration-200 ${
                    isActive ? 'text-xebia-purple' : 'text-xebia-darkGrey hover:text-xebia-purple'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-xebia-purple"></span>
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right side: Dark Mode toggle & CTA button */}
          <div className="hidden md:flex items-center gap-5">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-full hover:bg-xebia-blueishGrey text-xebia-purple transition-all duration-200"
              aria-label="Toggle dark mode theme"
            >
              {isDarkMode ? <Sun size={20} className="text-xebia-orange" /> : <Moon size={20} />}
            </button>
            <button
              onClick={() => document.getElementById('portals')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-xebia-purple text-white hover:bg-xebia-purpleBright px-6 py-2.5 rounded-full font-bold text-sm tracking-wide transition-all duration-200 shadow-md flex items-center gap-1.5 active:scale-95"
            >
              Get Started <ArrowRight size={15} />
            </button>
          </div>

          {/* Mobile Menu Toggler */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-xebia-purple hover:bg-xebia-blueishGrey rounded"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-xebia-lightGrey px-6 py-4 space-y-4 animate-in fade-in slide-in-from-top-4 duration-200">
            <nav className="flex flex-col gap-3">
              {navigationLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => {
                    setActiveTab(link.label);
                    setMobileMenuOpen(false);
                  }}
                  className="text-base font-semibold text-xebia-darkGrey hover:text-xebia-purple py-1 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="pt-4 border-t border-xebia-lightGrey flex items-center justify-between gap-4">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 rounded-full border border-xebia-lightGrey text-xebia-purple"
              >
                {isDarkMode ? <Sun size={20} className="text-xebia-orange" /> : <Moon size={20} />}
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  document.getElementById('portals')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex-1 bg-xebia-purple text-white text-center py-2.5 rounded-md font-semibold text-sm hover:bg-xebia-purpleBright transition-colors"
              >
                Get Started
              </button>
            </div>
          </div>
        )}
      </header>

      {/* 2. HERO EXPLORER ZONE */}
      <section id="home" className="relative py-20 lg:py-28 overflow-hidden bg-xebia-blueishGrey">
        {/* Abstract white semi-transparent circular masks */}
        <div className="absolute top-10 right-[-10%] w-[500px] h-[500px] bg-white/70 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-white/60 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10 space-y-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight min-h-[96px] sm:min-h-[120px] lg:min-h-[144px]">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-xebia-purple to-xebia-emerald inline-block">
              {currentText}
              <span className="text-xebia-emerald animate-pulse ml-0.5 font-light">|</span>
            </span>
          </h1>
          <h2 className="text-xl sm:text-2xl font-bold text-xebia-purple tracking-wide">
            Enterprise Learning Management System
          </h2>
          <p className="text-sm sm:text-base text-xebia-darkGrey leading-relaxed max-w-2xl mx-auto">
            Empower your workforce with AI-powered learning, intelligent analytics, and a unified platform for training, upskilling, certifications, and employee development.
          </p>
          <div className="pt-4">
            <button
              onClick={() => document.getElementById('portals')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-xebia-purple text-white text-base sm:text-lg px-8 py-4 font-bold rounded-lg shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200 inline-flex items-center gap-2 hover:bg-xebia-purpleBright"
            >
              Get Started <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* 4. EXPLORE PORTALS ARCHITECTURE */}
      <section id="portals" className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl font-extrabold text-xebia-purpleDark">
            Explore Our Portals
          </h2>
          <p className="text-xebia-darkGrey max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Select the portal that best fits your role and access personalized features.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Student Portal Card */}
          <div 
            onClick={() => setCurrentView('student')}
            className="group bg-white rounded-2xl p-8 border border-xebia-lightGrey shadow-sm hover:shadow-xl hover:border-b-4 hover:border-b-xebia-emerald cursor-pointer transition-all duration-300 flex flex-col justify-between"
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="p-3 bg-xebia-purple text-white rounded-xl shadow-md">
                  <GraduationCap size={28} />
                </div>
                <span className="text-xs font-bold text-xebia-emerald bg-xebia-emerald/10 px-3 py-1 rounded-full uppercase tracking-wider">
                  Active Path
                </span>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-xebia-purpleDark mb-2">Student Portal</h3>
                <p className="text-xebia-darkGrey text-sm leading-relaxed mb-6">
                  Log in to access your modules, join lectures, use standard sandboxes, and view certifications.
                </p>
              </div>

              <div className="space-y-3 pt-4 border-t border-xebia-lightGrey/60">
                {[
                  'My Learning Dashboard',
                  'Courses & Curriculum',
                  'Assessments & Quizzes',
                  'Certifications',
                  'Progress & Feedback'
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2.5 text-sm text-xebia-darkGrey font-medium">
                    <Check size={16} className="text-xebia-emerald flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4">
              <button className="w-full bg-xebia-purple hover:bg-xebia-purpleBright text-white text-center py-3 rounded-lg font-bold text-sm transition-all duration-200 flex items-center justify-center gap-1.5">
                Student Portal <ArrowRight size={15} />
              </button>
            </div>
          </div>

          {/* Admin Portal Card */}
          <div className="group bg-white rounded-2xl p-8 border border-xebia-lightGrey shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="p-3 bg-xebia-emerald text-white rounded-xl shadow-md">
                  <Building size={28} />
                </div>
                <span className="text-xs font-bold text-xebia-darkGrey bg-xebia-blueishGrey px-3 py-1 rounded-full uppercase tracking-wider border border-xebia-lightGrey">
                  Governance
                </span>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-xebia-purpleDark mb-2">Admin Portal</h3>
                <p className="text-xebia-darkGrey text-sm leading-relaxed mb-6">
                  Manage cohorts, construct learning architectures, deploy server structures, and check corporate progress.
                </p>
              </div>

              <div className="space-y-3 pt-4 border-t border-xebia-lightGrey/60">
                {[
                  'AI-Powered Content Generation',
                  '4-Level Curriculum Hierarchy Builder',
                  '15-Page Predictive Analytics Suite',
                  'Skill Gap & Recommendation Engine',
                  'Enterprise User Management'
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2.5 text-sm text-xebia-darkGrey font-medium">
                    <Check size={16} className="text-xebia-emerald flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4">
              <button className="w-full bg-xebia-emerald hover:opacity-90 text-white text-center py-3 rounded-lg font-bold text-sm transition-all duration-200 flex items-center justify-center gap-1.5">
                Admin Portal <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. METRICS BANNER GRID */}
      <section className="py-12 bg-white border-y border-xebia-lightGrey/80">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {/* Card 1 */}
            <div className="bg-white p-5 rounded-xl border border-xebia-lightGrey shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-xebia-purple/5 text-xebia-purple rounded-lg">
                  <Users size={20} />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-xebia-darkGrey/60 uppercase tracking-wider">Employees</div>
                  <div className="text-xl font-extrabold text-xebia-purpleDark mt-0.5">12,580+</div>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between text-[11px] font-semibold text-xebia-darkGrey/80 pt-3 border-t border-xebia-lightGrey/60">
                <span>Growth</span>
                <span className="bg-emerald-50 text-xebia-emerald px-2 py-0.5 rounded text-[10px] font-bold">
                  +16.4% this month
                </span>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-5 rounded-xl border border-xebia-lightGrey shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-xebia-emerald/5 text-xebia-emerald rounded-lg">
                  <BookOpen size={20} />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-xebia-darkGrey/60 uppercase tracking-wider">Courses</div>
                  <div className="text-xl font-extrabold text-xebia-purpleDark mt-0.5">1,248+</div>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between text-[11px] font-semibold text-xebia-darkGrey/80 pt-3 border-t border-xebia-lightGrey/60">
                <span>Library</span>
                <span className="bg-emerald-50 text-xebia-emerald px-2 py-0.5 rounded text-[10px] font-bold">
                  +12.7% this month
                </span>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-5 rounded-xl border border-xebia-lightGrey shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-xebia-orange/5 text-xebia-orange rounded-lg">
                  <Clock size={20} />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-xebia-darkGrey/60 uppercase tracking-wider">Learning Hours</div>
                  <div className="text-xl font-extrabold text-xebia-purpleDark mt-0.5">45,680+</div>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between text-[11px] font-semibold text-xebia-darkGrey/80 pt-3 border-t border-xebia-lightGrey/60">
                <span>Engagement</span>
                <span className="bg-emerald-50 text-xebia-emerald px-2 py-0.5 rounded text-[10px] font-bold">
                  +18.3% this month
                </span>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-white p-5 rounded-xl border border-xebia-lightGrey shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-xebia-purple/5 text-xebia-purple rounded-lg">
                  <Award size={20} />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-xebia-darkGrey/60 uppercase tracking-wider">Certifications</div>
                  <div className="text-xl font-extrabold text-xebia-purpleDark mt-0.5">8,945+</div>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between text-[11px] font-semibold text-xebia-darkGrey/80 pt-3 border-t border-xebia-lightGrey/60">
                <span>Badges</span>
                <span className="bg-emerald-50 text-xebia-emerald px-2 py-0.5 rounded text-[10px] font-bold">
                  +14.2% this month
                </span>
              </div>
            </div>

            {/* Card 5 */}
            <div className="bg-white p-5 rounded-xl border border-xebia-lightGrey shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-xebia-emerald/5 text-xebia-emerald rounded-lg">
                  <Cpu size={20} />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-xebia-darkGrey/60 uppercase tracking-wider">AI Readiness</div>
                  <div className="text-xl font-extrabold text-xebia-purpleDark mt-0.5">82%</div>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between text-[11px] font-semibold text-xebia-darkGrey/80 pt-3 border-t border-xebia-lightGrey/60">
                <span>Cognitive</span>
                <span className="bg-emerald-50 text-xebia-emerald px-2 py-0.5 rounded text-[10px] font-bold">
                  +22.6% this month
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PLATFORM HIGHLIGHTS GRID */}
      <section id="features" className="py-24 bg-white border-y border-xebia-lightGrey/80">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-extrabold text-xebia-purpleDark tracking-tight">
              Platform Highlights
            </h2>
            <p className="text-xebia-darkGrey max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
              We've engineered a robust suite of tools that bridge the gap between content creation and actionable workforce intelligence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Item 1 */}
            <div className="group bg-[#F7F8FC]/50 hover:bg-white p-6 rounded-2xl border border-xebia-lightGrey/40 hover:border-transparent shadow-[0_2px_8px_rgba(0,0,0,0.01)] hover:shadow-[0_20px_45px_rgba(108,29,95,0.06)] hover:-translate-y-1 transition-all duration-300 flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-xebia-purple/10 text-xebia-purple flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-xebia-purple group-hover:text-white">
                <Brain size={24} />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-xebia-purpleDark text-base sm:text-lg tracking-tight">AI-Powered Learning</h4>
                <p className="text-xs sm:text-sm text-xebia-darkGrey leading-normal">Personalized learning paths and AI-driven course recommendations.</p>
              </div>
            </div>

            {/* Item 2 */}
            <div className="group bg-[#F7F8FC]/50 hover:bg-white p-6 rounded-2xl border border-xebia-lightGrey/40 hover:border-transparent shadow-[0_2px_8px_rgba(0,0,0,0.01)] hover:shadow-[0_20px_45px_rgba(108,29,95,0.06)] hover:-translate-y-1 transition-all duration-300 flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-xebia-purple/10 text-xebia-purple flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-xebia-purple group-hover:text-white">
                <BookOpen size={24} />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-xebia-purpleDark text-base sm:text-lg tracking-tight">Curriculum Management</h4>
                <p className="text-xs sm:text-sm text-xebia-darkGrey leading-normal">Create, organize and manage courses, modules, and learning content.</p>
              </div>
            </div>

            {/* Item 3 */}
            <div className="group bg-[#F7F8FC]/50 hover:bg-white p-6 rounded-2xl border border-xebia-lightGrey/40 hover:border-transparent shadow-[0_2px_8px_rgba(0,0,0,0.01)] hover:shadow-[0_20px_45px_rgba(108,29,95,0.06)] hover:-translate-y-1 transition-all duration-300 flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-xebia-purple/10 text-xebia-purple flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-xebia-purple group-hover:text-white">
                <ClipboardList size={24} />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-xebia-purpleDark text-base sm:text-lg tracking-tight">Assessments & Quizzes</h4>
                <p className="text-xs sm:text-sm text-xebia-darkGrey leading-normal">Interactive assessments, automated grading and performance analytics.</p>
              </div>
            </div>

            {/* Item 4 */}
            <div className="group bg-[#F7F8FC]/50 hover:bg-white p-6 rounded-2xl border border-xebia-lightGrey/40 hover:border-transparent shadow-[0_2px_8px_rgba(0,0,0,0.01)] hover:shadow-[0_20px_45px_rgba(108,29,95,0.06)] hover:-translate-y-1 transition-all duration-300 flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-xebia-purple/10 text-xebia-purple flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-xebia-purple group-hover:text-white">
                <Award size={24} />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-xebia-purpleDark text-base sm:text-lg tracking-tight">Certifications</h4>
                <p className="text-xs sm:text-sm text-xebia-darkGrey leading-normal">Industry-recognized certifications and digital credential management.</p>
              </div>
            </div>

            {/* Item 5 */}
            <div className="group bg-[#F7F8FC]/50 hover:bg-white p-6 rounded-2xl border border-xebia-lightGrey/40 hover:border-transparent shadow-[0_2px_8px_rgba(0,0,0,0.01)] hover:shadow-[0_20px_45px_rgba(108,29,95,0.06)] hover:-translate-y-1 transition-all duration-300 flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-xebia-purple/10 text-xebia-purple flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-xebia-purple group-hover:text-white">
                <BarChart3 size={24} />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-xebia-purpleDark text-base sm:text-lg tracking-tight">Advanced Analytics</h4>
                <p className="text-xs sm:text-sm text-xebia-darkGrey leading-normal">Real-time dashboards and insights to drive learning outcomes.</p>
              </div>
            </div>

            {/* Item 6 */}
            <div className="group bg-[#F7F8FC]/50 hover:bg-white p-6 rounded-2xl border border-xebia-lightGrey/40 hover:border-transparent shadow-[0_2px_8px_rgba(0,0,0,0.01)] hover:shadow-[0_20px_45px_rgba(108,29,95,0.06)] hover:-translate-y-1 transition-all duration-300 flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-xebia-purple/10 text-xebia-purple flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-xebia-purple group-hover:text-white">
                <TrendingUp size={24} />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-xebia-purpleDark text-base sm:text-lg tracking-tight">Employee Development</h4>
                <p className="text-xs sm:text-sm text-xebia-darkGrey leading-normal">Track skills, learning progress and career development.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. ABOUT THE ECOSYSTEM DEEP DIVE */}
      <section id="about" className="py-24 bg-[#0B1224] text-white relative">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-xebia-purpleBright/10 blur-3xl rounded-full pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-6 space-y-16 relative z-10">
          
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h3 className="text-3xl sm:text-5xl font-bold text-white leading-tight tracking-tight">
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D286C3] to-xebia-emerald inline-block">Xebia Enterprise LMS</span>
            </h3>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-4xl mx-auto font-medium">
              Engineered for scale and designed for engagement, Xebia Enterprise LMS is a production-grade learning ecosystem. It seamlessly bridges the gap between organizational learning goals and continuous employee development.
            </p>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-3xl mx-auto">
              Our platform supports the entire learning lifecycle—from AI-driven content generation and multi-tier curriculum management to immersive course playback, automated assessments, and a powerful predictive analytics suite.
            </p>
          </div>

          {/* 2x2 Technical Specification Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Column 1 - Admin Portal */}
            <div className="bg-[#131C31] hover:bg-[#172440] border border-slate-800 hover:border-[#01AC9F]/30 p-8 rounded-2xl shadow-sm hover:shadow-[0_12px_30px_rgba(0,0,0,0.25)] hover:shadow-[#01AC9F]/5 hover:-translate-y-1 transition-all duration-300 space-y-6 cursor-default">
              <div className="flex items-center gap-3 text-[#01AC9F]">
                <Shield size={22} className="text-[#01AC9F]" />
                <h4 className="font-extrabold text-lg tracking-wide text-white">Admin Portal</h4>
              </div>
              <ul className="space-y-3.5 text-sm text-[#CADCEA]/80">
                <li className="flex items-start gap-2.5">
                  <span className="text-[#01AC9F] flex-shrink-0 mt-0.5">✦</span>
                  <span>AI-Powered Course Creation (Groq API)</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#01AC9F] flex-shrink-0 mt-0.5">✦</span>
                  <span>Advanced 4-Level Curriculum Builder</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#01AC9F] flex-shrink-0 mt-0.5">✦</span>
                  <span>Category & Content Management</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#01AC9F] flex-shrink-0 mt-0.5">✦</span>
                  <span>Profile Settings & Cloudinary Uploads</span>
                </li>
              </ul>
            </div>

            {/* Column 2 - Student Portal */}
            <div className="bg-[#131C31] hover:bg-[#172440] border border-slate-800 hover:border-[#D286C3]/30 p-8 rounded-2xl shadow-sm hover:shadow-[0_12px_30px_rgba(0,0,0,0.25)] hover:shadow-[#D286C3]/5 hover:-translate-y-1 transition-all duration-300 space-y-6 cursor-default">
              <div className="flex items-center gap-3 text-[#D286C3]">
                <GraduationCap size={22} className="text-[#D286C3]" />
                <h4 className="font-extrabold text-lg tracking-wide text-white">Student Portal</h4>
              </div>
              <ul className="space-y-3.5 text-sm text-[#CADCEA]/80">
                <li className="flex items-start gap-2.5">
                  <span className="text-[#D286C3] flex-shrink-0 mt-0.5">✦</span>
                  <span>Personalized Learning Dashboard</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#D286C3] flex-shrink-0 mt-0.5">✦</span>
                  <span>Course Catalogue & Full Playback</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#D286C3] flex-shrink-0 mt-0.5">✦</span>
                  <span>Interactive Assessments & Feedback</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#D286C3] flex-shrink-0 mt-0.5">✦</span>
                  <span>Notifications Centre</span>
                </li>
              </ul>
            </div>

            {/* Column 3 - Analytics Suite */}
            <div className="bg-[#131C31] hover:bg-[#172440] border border-slate-800 hover:border-[#FF6200]/30 p-8 rounded-2xl shadow-sm hover:shadow-[0_12px_30px_rgba(0,0,0,0.25)] hover:shadow-[#FF6200]/5 hover:-translate-y-1 transition-all duration-300 space-y-6 cursor-default">
              <div className="flex items-center gap-3 text-[#FF6200]">
                <BarChart3 size={22} className="text-[#FF6200]" />
                <h4 className="font-extrabold text-lg tracking-wide text-white">Analytics Suite</h4>
              </div>
              <ul className="space-y-3.5 text-sm text-[#CADCEA]/80">
                <li className="flex items-start gap-2.5">
                  <span className="text-[#FF6200] flex-shrink-0 mt-0.5">✦</span>
                  <span>15-Page Predictive Analytics Dashboard</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#FF6200] flex-shrink-0 mt-0.5">✦</span>
                  <span>Skill Gaps & AI Transformation Readiness</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#FF6200] flex-shrink-0 mt-0.5">✦</span>
                  <span>Coverage Maps & Learning Pillars</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#FF6200] flex-shrink-0 mt-0.5">✦</span>
                  <span>Flagship Programs & Project Investments</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#FF6200] flex-shrink-0 mt-0.5">✦</span>
                  <span>Apprentice Journey & Recommendations</span>
                </li>
              </ul>
            </div>

            {/* Column 4 - Infrastructure & Tech Stack */}
            <div className="bg-[#131C31] hover:bg-[#172440] border border-slate-800 hover:border-[#3B82F6]/30 p-8 rounded-2xl shadow-sm hover:shadow-[0_12px_30px_rgba(0,0,0,0.25)] hover:shadow-[#3B82F6]/5 hover:-translate-y-1 transition-all duration-300 space-y-6 cursor-default">
              <div className="flex items-center gap-3 text-[#3B82F6]">
                <Server size={22} className="text-[#3B82F6]" />
                <h4 className="font-extrabold text-lg tracking-wide text-white">Infrastructure & Tech Stack</h4>
              </div>
              <div className="space-y-4 text-sm text-[#CADCEA]/80">
                <div className="flex gap-4">
                  <span className="font-bold text-white w-20 flex-shrink-0">Frontend:</span>
                  <span>React 19, Vite, Tailwind CSS, Zustand</span>
                </div>
                <div className="flex gap-4">
                  <span className="font-bold text-white w-20 flex-shrink-0">Backend:</span>
                  <span>Java 21, Spring Boot 3.3.6, Microservices</span>
                </div>
                <div className="flex gap-4">
                  <span className="font-bold text-white w-20 flex-shrink-0">Database:</span>
                  <span>PostgreSQL 15, Flyway, Redis Caching</span>
                </div>
                <div className="flex gap-4">
                  <span className="font-bold text-white w-20 flex-shrink-0">AI Cloud:</span>
                  <span>Groq LLaMA 3, Cloudinary Edge Network</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. RETENTION BANNER CONTAINER */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="bg-xebia-purpleDark text-white rounded-3xl p-8 md:p-12 border border-xebia-purpleBright/20 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="absolute top-0 left-0 w-64 h-64 bg-xebia-purple opacity-25 blur-3xl rounded-full pointer-events-none"></div>
          <div className="space-y-3 relative z-10 text-center md:text-left max-w-2xl">
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Ready to transform your learning experience?
            </h3>
            <p className="text-sm text-xebia-mediumGrey/80 leading-relaxed">
              Equip your corporate teams and individual developers with production-grade compilation environments, scalable cohort configurations, and customized syllabus generators.
            </p>
          </div>
          <div className="relative z-10 flex-shrink-0 w-full md:w-auto">
            <button
              onClick={() => document.getElementById('portals')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full md:w-auto bg-white text-xebia-purpleDark hover:bg-xebia-lightGrey font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all text-center flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              Get Started Now <ArrowRight size={18} className="text-xebia-purple" />
            </button>
          </div>
        </div>
      </section>

      {/* 8. MODULAR FOOTER */}
      <footer className="bg-white pt-16 pb-8 border-t border-xebia-lightGrey">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-5 gap-12 border-b border-xebia-lightGrey pb-12">
          {/* Logo Identity block */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center">
              <img 
                src={logoPurple} 
                alt="Xebia Logo" 
                className="h-11 w-auto object-contain" 
              />
            </div>
            <p className="text-xs text-xebia-darkGrey leading-relaxed max-w-sm">
              Empowering global teams with production-grade learning ecosystems, integrated IDE compilers, and structured architectural curriculums. Authority on IT.
            </p>
          </div>

          {/* Product links */}
          <div className="space-y-4">
            <h5 className="text-xs font-bold uppercase tracking-wider text-xebia-purple">Product</h5>
            <ul className="space-y-2.5 text-xs text-xebia-darkGrey/95 font-medium">
              <li><a href="#portals" className="hover:text-xebia-purple transition-colors">Learning Portals</a></li>
              <li><a href="#home" className="hover:text-xebia-purple transition-colors">Compiler Sandboxes</a></li>
              <li><a href="#features" className="hover:text-xebia-purple transition-colors">Skills Matrices</a></li>
              <li><a href="#pricing" className="hover:text-xebia-purple transition-colors">Enterprise Pricing</a></li>
            </ul>
          </div>

          {/* Resource Libraries */}
          <div className="space-y-4">
            <h5 className="text-xs font-bold uppercase tracking-wider text-xebia-emerald">Resources</h5>
            <ul className="space-y-2.5 text-xs text-xebia-darkGrey/95 font-medium">
              <li><a href="#docs" className="hover:text-xebia-purple transition-colors">Developer API Docs</a></li>
              <li><a href="#blog" className="hover:text-xebia-purple transition-colors">Xebia Tech Blog</a></li>
              <li><a href="#guides" className="hover:text-xebia-purple transition-colors">Architect Guides</a></li>
              <li><a href="#support" className="hover:text-xebia-purple transition-colors">Customer Help Desk</a></li>
            </ul>
          </div>

          {/* Company Policy Blocks */}
          <div className="space-y-4 flex flex-col justify-between">
            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-xebia-orange">Company</h5>
              <ul className="space-y-2.5 text-xs text-xebia-darkGrey/95 font-medium mt-4">
                <li><a href="#about" className="hover:text-xebia-purple transition-colors">About Xebia</a></li>
                <li><a href="#careers" className="hover:text-xebia-purple transition-colors">Join Tech Team</a></li>
                <li><a href="#privacy" className="hover:text-xebia-purple transition-colors">Security & Privacy</a></li>
              </ul>
            </div>
            
            {/* Social channels */}
            <div className="flex gap-3 mt-4">
              <a href="https://github.com" aria-label="Github link" className="w-8 h-8 rounded-full bg-xebia-blueishGrey hover:bg-xebia-lightGrey flex items-center justify-center text-xebia-purple transition-colors shadow-sm">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="https://twitter.com" aria-label="Twitter link" className="w-8 h-8 rounded-full bg-xebia-blueishGrey hover:bg-xebia-lightGrey flex items-center justify-center text-xebia-purple transition-colors shadow-sm">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="https://linkedin.com" aria-label="Linkedin link" className="w-8 h-8 rounded-full bg-xebia-blueishGrey hover:bg-xebia-lightGrey flex items-center justify-center text-xebia-purple transition-colors shadow-sm">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="https://facebook.com" aria-label="Facebook link" className="w-8 h-8 rounded-full bg-xebia-blueishGrey hover:bg-xebia-lightGrey flex items-center justify-center text-xebia-purple transition-colors shadow-sm">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Footer copyright */}
        <div className="max-w-7xl mx-auto px-6 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-xebia-darkGrey/60">
          <div>
            © {new Date().getFullYear()} Xebia LMS. Authority on IT. All rights reserved.
          </div>
          <div className="flex gap-6">
            <a href="#terms" className="hover:text-xebia-purple transition-colors">Terms of Service</a>
            <a href="#privacy" className="hover:text-xebia-purple transition-colors">Privacy Policy</a>
            <a href="#cookies" className="hover:text-xebia-purple transition-colors">Cookie Settings</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
