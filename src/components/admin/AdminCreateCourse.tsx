import React, { useState, useEffect, useRef } from 'react';
import { 
  BookOpen, 
  Plus, 
  Image as ImageIcon, 
  Wand2, 
  X, 
  Tag, 
  Globe, 
  Clock, 
  ListOrdered,
  ChevronDown,
  Info
} from 'lucide-react';
import { useUIStore } from '../../store';

// Helper for Mock AI content generation
interface MockAIContent {
  title: string;
  shortDesc: string;
  fullDesc: string;
  outcomes: string[];
  prereqs: string[];
  audience: string[];
  highlights: string[];
  careers: string[];
}

const MOCK_AI_DATA: Record<string, MockAIContent> = {
  react: {
    title: 'Advanced React & Next.js: Zero to Production Masterclass',
    shortDesc: 'Master React 19, Next.js App Router, Server Components, and advanced state management tools like Zustand and Redux.',
    fullDesc: 'Go deep into advanced React patterns, custom hooks development, concurrent features, and state optimization. You will learn to architect high-performance React web applications using Next.js App Router, implement React Server Components (RSC), optimize rendering performance, write complete test suites using Vitest and React Testing Library, and deploy production-ready applications with caching and security best practices.',
    outcomes: [
      'Architect robust production-grade React & Next.js applications',
      'Optimize rendering cycles and state updates using concurrent features',
      'Implement React Server Components and Server Actions',
      'Build custom state management pipelines using Zustand'
    ],
    prereqs: [
      'Strong JavaScript (ES6+) foundations',
      'Basic familiarity with React concepts like hooks and props',
      'Understanding of HTML and CSS styling concepts'
    ],
    audience: [
      'Frontend developers looking to upgrade their React skills',
      'Software engineers transitioning to full-stack Next.js applications',
      'Tech leads aiming to establish React architectural standards'
    ],
    highlights: [
      '3 complete production-grade real-world projects',
      'In-depth Next.js Server Components architecture walkthroughs',
      'Performance benchmarking and optimization modules'
    ],
    careers: [
      'Senior React Developer',
      'Frontend Architect',
      'Full Stack Next.js Engineer'
    ]
  },
  springboot: {
    title: 'Spring Boot 3.x Masterclass: Build Production-Ready REST APIs',
    shortDesc: 'A comprehensive, hands-on guide to building secure, scalable, and cloud-ready microservices with Spring Boot and Spring Security.',
    fullDesc: 'This course takes you from Spring foundations to building complex, high-throughput microservices. You will learn to configure Spring MVC, persist data with Spring Data JPA & Hibernate, build bulletproof security gates using Spring Security and OAuth2, test services using JUnit 5 and Mockito, manage database migrations with Liquibase, and package apps inside Docker containers for cloud deployments.',
    outcomes: [
      'Build and secure REST APIs using Spring Boot and OAuth2/JWT',
      'Implement microservice communication using Spring Cloud',
      'Optimize database interaction with Hibernate caching and JPA queries',
      'Establish CI/CD pipelines and containerize microservices with Docker'
    ],
    prereqs: [
      'Core Java OOP knowledge (Classes, Interfaces, Streams)',
      'Basic database query knowledge (SQL)',
      'Familiarity with REST API basics'
    ],
    audience: [
      'Java developers aiming to specialize in backend microservices',
      'University graduates looking to enter enterprise software engineering',
      'Backend architects reviewing Spring Cloud architectural patterns'
    ],
    highlights: [
      '1 Enterprise-level distributed microservice architecture project',
      'Spring Security 6.x JWT and OAuth2 integration from scratch',
      'Real-world Docker and Kubernetes deployment tutorials'
    ],
    careers: [
      'Enterprise Java Developer',
      'Backend Software Engineer',
      'Spring Boot Specialist'
    ]
  },
  default: {
    title: 'Full Stack Web Development Bootcamp',
    shortDesc: 'Learn the complete modern stack from HTML/CSS to database design, REST APIs, and modern frontend frameworks.',
    fullDesc: 'An intensive, comprehensive bootcamp designed to take you from absolute scratch to a confident software developer. We cover modern HTML5, CSS3 layout engines, core JavaScript concepts, modern frontend design using React, backend services with Node.js and Express, relational database modeling using PostgreSQL, authentication protocols, and modern continuous integration and deployment pipelines.',
    outcomes: [
      'Develop modern, responsive web frontends using HTML, CSS, and React',
      'Construct scalable REST APIs using Express and Node.js',
      'Formulate complex relational database structures and queries',
      'Deploy and coordinate multi-container applications to production servers'
    ],
    prereqs: [
      'No programming background required',
      'High-speed internet and passion to learn',
      'Basic computer literacy'
    ],
    audience: [
      'Career changers searching for an entry path into software design',
      'Entrepreneurs wanting to prototype their own web applications',
      'Designers wanting to acquire programming skills'
    ],
    highlights: [
      '5 complete full-stack portfolio projects',
      'Personal resume review and mock interview workshops',
      'Lifetime access to Discord developer community support'
    ],
    careers: [
      'Junior Full Stack Developer',
      'Software Development Engineer',
      'Tech Consultant'
    ]
  }
};

const COMMON_LANGUAGES = ['English', 'Spanish', 'French', 'German', 'Hindi', 'Arabic', 'Portuguese'];

export const AdminCreateCourse: React.FC = () => {
  const { setCurrentAdminTab, categories, addAdminCourse } = useUIStore();

  // 1. Course Identity States
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [level, setLevel] = useState<'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'>('Beginner');
  const [language, setLanguage] = useState('English');
  const [durationHrs, setDurationHrs] = useState<number>(0);
  const [durationMin, setDurationMin] = useState<number>(0);

  // 2. Descriptions States
  const [shortDescription, setShortDescription] = useState('');
  const [fullDescription, setFullDescription] = useState('');

  // 3. Media States
  const [iconUrl, setIconUrl] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [bannerUrl, setBannerUrl] = useState('');

  const iconInputRef = useRef<HTMLInputElement>(null);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);

  // 4. Additional Information Lists States
  const [outcomes, setOutcomes] = useState<string[]>(['', '']);
  const [prerequisites, setPrerequisites] = useState<string[]>(['']);
  const [targetAudience, setTargetAudience] = useState<string[]>(['', '']);
  const [highlights, setHighlights] = useState<string[]>(['']);
  const [careerOpportunities, setCareerOpportunities] = useState<string[]>(['', '', '']);

  // 5. Course Settings Toggles States
  const [isActive, setIsActive] = useState(true);
  const [isPublished, setIsPublished] = useState(false);
  const [isFeatured, setIsFeatured] = useState(false);
  const [allowEnrolling, setAllowEnrolling] = useState(true);
  const [showOnListing, setShowOnListing] = useState(true);

  // Other Helper states
  const [error, setError] = useState<string | null>(null);

  // Auto-set first category on load
  useEffect(() => {
    if (categories.length > 0 && !category) {
      setCategory(categories[0].name);
    } else if (categories.length === 0) {
      setCategory('General');
    }
  }, [categories, category]);

  // Raise Hover Effect Utility CSS classes
  const hoverRaiseClass = "transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-slate-200/50 bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-sm";

  // AI Mock Generators
  const getAISuggestionKey = (): 'react' | 'springboot' | 'default' => {
    const checkText = (title + ' ' + category).toLowerCase();
    if (checkText.includes('react') || checkText.includes('next') || checkText.includes('js') || checkText.includes('web')) {
      return 'react';
    }
    if (checkText.includes('spring') || checkText.includes('boot') || checkText.includes('java') || checkText.includes('backend')) {
      return 'springboot';
    }
    return 'default';
  };

  const handleAITitle = () => {
    const key = getAISuggestionKey();
    const data = MOCK_AI_DATA[key];
    setTitle(data.title);
  };

  const handleAIShortDesc = () => {
    const key = getAISuggestionKey();
    const data = MOCK_AI_DATA[key];
    setShortDescription(data.shortDesc);
  };

  const handleAIFullDesc = () => {
    const key = getAISuggestionKey();
    const data = MOCK_AI_DATA[key];
    setFullDescription(data.fullDesc);
  };

  const handleAIOutcomes = () => {
    const key = getAISuggestionKey();
    const data = MOCK_AI_DATA[key];
    setOutcomes(data.outcomes);
  };

  const handleAIPrereqs = () => {
    const key = getAISuggestionKey();
    const data = MOCK_AI_DATA[key];
    setPrerequisites(data.prereqs);
  };

  const handleAIAudience = () => {
    const key = getAISuggestionKey();
    const data = MOCK_AI_DATA[key];
    setTargetAudience(data.audience);
  };

  const handleAIHighlights = () => {
    const key = getAISuggestionKey();
    const data = MOCK_AI_DATA[key];
    setHighlights(data.highlights);
  };

  const handleAICareers = () => {
    const key = getAISuggestionKey();
    const data = MOCK_AI_DATA[key];
    setCareerOpportunities(data.careers);
  };

  // List Management Helpers
  const handleListChange = (index: number, val: string, list: string[], setList: (v: string[]) => void) => {
    const updated = [...list];
    updated[index] = val;
    setList(updated);
  };

  const handleAddListItem = (list: string[], setList: (v: string[]) => void) => {
    setList([...list, '']);
  };

  const handleRemoveListItem = (index: number, list: string[], setList: (v: string[]) => void) => {
    if (list.length === 1) {
      setList(['']);
      return;
    }
    const updated = list.filter((_, idx) => idx !== index);
    setList(updated);
  };

  // Image Upload handler (Simulation)
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, setUrl: (u: string) => void) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (file.size > 2 * 1024 * 1024) {
      setError('File exceeds 2MB limit.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        setUrl(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const submitCourse = (statusOverride?: 'Published' | 'Draft' | 'Active' | 'Inactive') => {
    if (!title.trim()) {
      setError('Course Title is required.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const finalStatus = statusOverride || (isActive ? 'Active' : 'Draft');

    addAdminCourse({
      title: title.trim(),
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
      description: shortDescription.trim() || 'No description provided.',
      level,
      category: category || 'General',
      status: finalStatus,
      image: thumbnailUrl || bannerUrl || undefined,
      accentColor: '#6C1D5F' // default Xebia theme color
    });

    setCurrentAdminTab('courses');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Sub-Header Breadcrumb inside Main Layout */}
      <div className="text-[11px] font-semibold text-slate-400 flex items-center gap-1.5 font-sans">
        <span className="cursor-pointer hover:text-slate-600" onClick={() => setCurrentAdminTab('dashboard')}>Dashboard</span>
        <span>&gt;</span>
        <span className="cursor-pointer hover:text-slate-600" onClick={() => setCurrentAdminTab('courses')}>Courses</span>
        <span>&gt;</span>
        <span className="text-slate-800 font-bold">Create</span>
      </div>

      {/* Main Title Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 bg-white border border-slate-100 rounded-2xl shadow-sm flex items-center justify-center flex-shrink-0 text-[#6C1D5F]">
            <BookOpen size={20} />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-800 tracking-tight">
              Create New Course
            </h1>
            <p className="text-xs font-bold text-slate-400">
              Establish course name, content, level and prerequisites.
            </p>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 text-xs px-4 py-2.5 rounded-2xl border border-red-100 font-semibold flex items-center justify-between">
          <span>{error}</span>
          <button onClick={() => setError(null)} className="p-1 hover:bg-red-100 rounded-full transition-all">
            <X size={14} />
          </button>
        </div>
      )}

      {/* Two Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Columns - Forms */}
        <div className="lg:col-span-2 space-y-6">

          {/* 1. COURSE IDENTITY */}
          <div className={hoverRaiseClass + " border-t-[3px] border-t-[#6C1D5F]"}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 bg-white border border-slate-100 rounded-xl shadow-sm flex items-center justify-center text-[#6C1D5F]">
                <BookOpen size={16} />
              </div>
              <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest flex items-center gap-1.5">
                Course Identity <span className="text-red-500">*</span>
              </h2>
            </div>

            <div className="space-y-5">
              {/* Title Field with Wand button */}
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center justify-between">
                  <span>Title *</span>
                  <button 
                    type="button" 
                    onClick={handleAITitle}
                    className="p-1.5 bg-[#6C1D5F]/10 hover:bg-[#6C1D5F]/20 text-[#6C1D5F] rounded-lg transition-all hover:scale-105 active:scale-95 flex items-center gap-1 text-[9px] font-black"
                    title="Generate title using Mock AI"
                  >
                    <Wand2 size={12} />
                    Generate with AI
                  </button>
                </label>
                <div className="relative flex items-center">
                  <input 
                    type="text" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Type a topic (e.g. Java) and hit 'Generate with AI', or enter full title."
                    className="w-full bg-[#F8F9FD] border border-slate-200 hover:border-slate-300 focus:border-[#6C1D5F] rounded-2xl px-5 py-3.5 text-xs text-slate-800 focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#6C1D5F] transition-all font-semibold shadow-sm placeholder-slate-400"
                    required
                  />
                </div>
                <p className="text-[10px] text-slate-400 font-bold">Appears on the course card and listing pages.</p>
              </div>

              {/* Category & Level Dropdowns Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Category selection */}
                <div className="space-y-2 relative">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest block">
                    Category *
                  </label>
                  <div className="relative">
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full appearance-none bg-[#F8F9FD] hover:bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-2xl px-5 py-3.5 text-xs font-bold text-slate-700 focus:outline-none transition-all pr-10 cursor-pointer"
                      required
                    >
                      <option value="" disabled>Select a Category</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.name}>{cat.name}</option>
                      ))}
                      {categories.length === 0 && (
                        <>
                          <option value="General">General</option>
                          <option value="Java">Java</option>
                          <option value="Python">Python</option>
                          <option value="Web Development">Web Development</option>
                        </>
                      )}
                    </select>
                    <ChevronDown size={14} className="text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* Level selection */}
                <div className="space-y-2 relative">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest block">
                    Level *
                  </label>
                  <div className="relative">
                    <select
                      value={level}
                      onChange={(e) => setLevel(e.target.value as any)}
                      className="w-full appearance-none bg-[#F8F9FD] hover:bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-2xl px-5 py-3.5 text-xs font-bold text-slate-700 focus:outline-none transition-all pr-10 cursor-pointer"
                      required
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                      <option value="Expert">Expert</option>
                    </select>
                    <ChevronDown size={14} className="text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Language & Duration Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Language selection */}
                <div className="space-y-2 relative">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest block">
                    Language / Locale
                  </label>
                  <div className="relative">
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="w-full appearance-none bg-[#F8F9FD] hover:bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-2xl px-5 py-3.5 text-xs font-bold text-slate-700 focus:outline-none transition-all pr-10 cursor-pointer"
                    >
                      {COMMON_LANGUAGES.map((lang) => (
                        <option key={lang} value={lang}>{lang}</option>
                      ))}
                    </select>
                    <ChevronDown size={14} className="text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* Duration selection */}
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest block">
                    Duration *
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="relative flex items-center">
                      <input 
                        type="number" 
                        value={durationHrs || ''}
                        onChange={(e) => setDurationHrs(Math.max(0, parseInt(e.target.value) || 0))}
                        placeholder="0"
                        className="w-full bg-[#F8F9FD] border border-slate-200 hover:border-slate-300 focus:border-[#6C1D5F] rounded-2xl pl-5 pr-10 py-3.5 text-xs text-slate-800 focus:outline-none focus:bg-white transition-all font-semibold"
                        min="0"
                      />
                      <span className="absolute right-4 text-[10px] text-slate-400 font-bold pointer-events-none">hrs</span>
                    </div>
                    <div className="relative flex items-center">
                      <input 
                        type="number" 
                        value={durationMin || ''}
                        onChange={(e) => setDurationMin(Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))}
                        placeholder="0"
                        className="w-full bg-[#F8F9FD] border border-slate-200 hover:border-slate-300 focus:border-[#6C1D5F] rounded-2xl pl-5 pr-10 py-3.5 text-xs text-slate-800 focus:outline-none focus:bg-white transition-all font-semibold"
                        min="0"
                        max="59"
                      />
                      <span className="absolute right-4 text-[10px] text-slate-400 font-bold pointer-events-none">min</span>
                    </div>
                  </div>
                  <p className="text-[10px] text-slate-400 font-bold">Hours and Minutes</p>
                </div>
              </div>

            </div>
          </div>

          {/* 2. DESCRIPTIONS */}
          <div className={hoverRaiseClass + " border-t-[3px] border-t-[#01AC9F]"}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 bg-white border border-slate-100 rounded-xl shadow-sm flex items-center justify-center text-[#01AC9F]">
                <Tag size={16} />
              </div>
              <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest">
                Descriptions
              </h2>
            </div>

            <div className="space-y-5">
              {/* Short Description */}
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center justify-between font-sans">
                  <span className="flex items-center gap-1">Short Description <span className="text-red-500">*</span></span>
                  <button 
                    type="button" 
                    onClick={handleAIShortDesc}
                    className="p-1.5 bg-[#01AC9F]/10 hover:bg-[#01AC9F]/20 text-[#01AC9F] rounded-lg transition-all hover:scale-105 active:scale-95 flex items-center gap-1 text-[9px] font-black"
                  >
                    <Wand2 size={12} />
                    Generate with AI
                  </button>
                </label>
                <textarea 
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value.slice(0, 200))}
                  placeholder="A brief description of what this course covers..."
                  className="w-full bg-[#F8F9FD] border border-slate-200 hover:border-slate-300 focus:border-[#01AC9F] rounded-2xl px-5 py-3.5 text-xs text-slate-800 focus:outline-none focus:bg-white transition-all font-semibold shadow-sm placeholder-slate-400 min-h-[70px] resize-none"
                  required
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
                  <span>A short, catchy tagline (max 200 chars).</span>
                  <span>{shortDescription.length}/200</span>
                </div>
              </div>

              {/* Full Description */}
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center justify-between font-sans">
                  <span className="flex items-center gap-1">Full Description <span className="text-red-500">*</span></span>
                  <button 
                    type="button" 
                    onClick={handleAIFullDesc}
                    className="p-1.5 bg-[#01AC9F]/10 hover:bg-[#01AC9F]/20 text-[#01AC9F] rounded-lg transition-all hover:scale-105 active:scale-95 flex items-center gap-1 text-[9px] font-black"
                  >
                    <Wand2 size={12} />
                    Generate with AI
                  </button>
                </label>
                <textarea 
                  value={fullDescription}
                  onChange={(e) => setFullDescription(e.target.value)}
                  placeholder="Full course description..."
                  className="w-full bg-[#F8F9FD] border border-slate-200 hover:border-slate-300 focus:border-[#01AC9F] rounded-2xl px-5 py-3.5 text-xs text-slate-800 focus:outline-none focus:bg-white transition-all font-semibold shadow-sm placeholder-slate-400 min-h-[140px] resize-none"
                  required
                />
                <p className="text-[10px] text-slate-400 font-bold">Detailed overview. Supports markdown.</p>
              </div>
            </div>
          </div>

          {/* 3. MEDIA */}
          <div className={hoverRaiseClass + " border-t-[3px] border-t-amber-500"}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 bg-white border border-slate-100 rounded-xl shadow-sm flex items-center justify-center text-amber-500">
                <ImageIcon size={16} />
              </div>
              <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest">
                Media
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Box 1: ICON */}
              <div className="space-y-3">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Icon</span>
                <input 
                  type="file" 
                  ref={iconInputRef} 
                  onChange={(e) => handleImageUpload(e, setIconUrl)} 
                  accept="image/*" 
                  className="hidden" 
                />
                
                {iconUrl ? (
                  <div className="relative border border-slate-200 rounded-2xl overflow-hidden h-28 hover:-translate-y-1.5 hover:shadow-lg transition-all duration-300 group">
                    <img src={iconUrl} alt="Icon Preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <button type="button" onClick={() => iconInputRef.current?.click()} className="px-2 py-1 bg-white text-slate-800 rounded-lg text-[10px] font-bold mr-1">Change</button>
                      <button type="button" onClick={() => setIconUrl('')} className="px-2 py-1 bg-red-600 text-white rounded-lg text-[10px] font-bold">Remove</button>
                    </div>
                  </div>
                ) : (
                  <div 
                    onClick={() => iconInputRef.current?.click()}
                    className="bg-[#F8F9FD] border-2 border-dashed border-slate-200 hover:border-[#6C1D5F]/60 rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-md hover:bg-slate-50/50 group"
                  >
                    <div className="w-8 h-8 rounded-full bg-orange-100 text-[#FF6200] flex items-center justify-center font-bold text-lg mb-2 group-hover:scale-105 transition-transform">
                      +
                    </div>
                    <span className="text-[10px] font-extrabold text-slate-700 block font-sans">Drag & drop or click</span>
                  </div>
                )}
                
                <input 
                  type="text" 
                  value={iconUrl}
                  onChange={(e) => setIconUrl(e.target.value)}
                  placeholder="URI: https://..."
                  className="w-full bg-[#F8F9FD] border border-slate-200 focus:border-[#6C1D5F] rounded-xl px-3 py-1.5 text-[10px] text-slate-800 focus:outline-none transition-all font-mono"
                />
                <p className="text-[9px] text-slate-400 font-bold">Course Icon (Drag or URL)</p>
              </div>

              {/* Box 2: THUMBNAIL */}
              <div className="space-y-3">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Thumbnail Image</span>
                <input 
                  type="file" 
                  ref={thumbnailInputRef} 
                  onChange={(e) => handleImageUpload(e, setThumbnailUrl)} 
                  accept="image/*" 
                  className="hidden" 
                />
                
                {thumbnailUrl ? (
                  <div className="relative border border-slate-200 rounded-2xl overflow-hidden h-28 hover:-translate-y-1.5 hover:shadow-lg transition-all duration-300 group">
                    <img src={thumbnailUrl} alt="Thumbnail Preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <button type="button" onClick={() => thumbnailInputRef.current?.click()} className="px-2 py-1 bg-white text-slate-800 rounded-lg text-[10px] font-bold mr-1">Change</button>
                      <button type="button" onClick={() => setThumbnailUrl('')} className="px-2 py-1 bg-red-600 text-white rounded-lg text-[10px] font-bold">Remove</button>
                    </div>
                  </div>
                ) : (
                  <div 
                    onClick={() => thumbnailInputRef.current?.click()}
                    className="bg-[#F8F9FD] border-2 border-dashed border-slate-200 hover:border-[#6C1D5F]/60 rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-md hover:bg-slate-50/50 group"
                  >
                    <div className="w-8 h-8 rounded-full bg-orange-100 text-[#FF6200] flex items-center justify-center font-bold text-lg mb-2 group-hover:scale-105 transition-transform">
                      +
                    </div>
                    <span className="text-[10px] font-extrabold text-slate-700 block font-sans">Drag & drop or click</span>
                  </div>
                )}
                
                <input 
                  type="text" 
                  value={thumbnailUrl}
                  onChange={(e) => setThumbnailUrl(e.target.value)}
                  placeholder="URI: https://..."
                  className="w-full bg-[#F8F9FD] border border-slate-200 focus:border-[#6C1D5F] rounded-xl px-3 py-1.5 text-[10px] text-slate-800 focus:outline-none transition-all font-mono"
                />
                <p className="text-[9px] text-slate-400 font-bold">Course Thumbnail (Drag or URL)</p>
              </div>

              {/* Box 3: BANNER */}
              <div className="space-y-3">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Banner Image</span>
                <input 
                  type="file" 
                  ref={bannerInputRef} 
                  onChange={(e) => handleImageUpload(e, setBannerUrl)} 
                  accept="image/*" 
                  className="hidden" 
                />
                
                {bannerUrl ? (
                  <div className="relative border border-slate-200 rounded-2xl overflow-hidden h-28 hover:-translate-y-1.5 hover:shadow-lg transition-all duration-300 group">
                    <img src={bannerUrl} alt="Banner Preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <button type="button" onClick={() => bannerInputRef.current?.click()} className="px-2 py-1 bg-white text-slate-800 rounded-lg text-[10px] font-bold mr-1">Change</button>
                      <button type="button" onClick={() => setBannerUrl('')} className="px-2 py-1 bg-red-600 text-white rounded-lg text-[10px] font-bold">Remove</button>
                    </div>
                  </div>
                ) : (
                  <div 
                    onClick={() => bannerInputRef.current?.click()}
                    className="bg-[#F8F9FD] border-2 border-dashed border-slate-200 hover:border-[#6C1D5F]/60 rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-md hover:bg-slate-50/50 group"
                  >
                    <div className="w-8 h-8 rounded-full bg-orange-100 text-[#FF6200] flex items-center justify-center font-bold text-lg mb-2 group-hover:scale-105 transition-transform">
                      +
                    </div>
                    <span className="text-[10px] font-extrabold text-slate-700 block font-sans">Drag & drop or click</span>
                  </div>
                )}
                
                <input 
                  type="text" 
                  value={bannerUrl}
                  onChange={(e) => setBannerUrl(e.target.value)}
                  placeholder="URI: https://..."
                  className="w-full bg-[#F8F9FD] border border-slate-200 focus:border-[#6C1D5F] rounded-xl px-3 py-1.5 text-[10px] text-slate-800 focus:outline-none transition-all font-mono"
                />
                <p className="text-[9px] text-slate-400 font-bold">Course Banner (Drag or URL)</p>
              </div>
            </div>
          </div>

          {/* 4. ADDITIONAL INFORMATION */}
          <div className={hoverRaiseClass + " border-t-[3px] border-t-purple-500"}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 bg-white border border-slate-100 rounded-xl shadow-sm flex items-center justify-center text-purple-500">
                <ListOrdered size={16} />
              </div>
              <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest">
                Additional Information
              </h2>
            </div>

            <div className="space-y-8">
              
              {/* A. LEARNING OUTCOMES */}
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-slate-50 pb-2">
                  <div>
                    <h3 className="text-xs font-black text-slate-700 uppercase tracking-widest">Learning Outcomes</h3>
                    <p className="text-[10px] text-slate-400 font-bold">What students will learn</p>
                  </div>
                  <button 
                    type="button" 
                    onClick={handleAIOutcomes}
                    className="p-1.5 bg-[#6C1D5F]/10 hover:bg-[#6C1D5F]/20 text-[#6C1D5F] rounded-xl transition-all hover:scale-105 active:scale-95 flex items-center justify-center"
                    title="Mock AI outcomes generator"
                  >
                    <Wand2 size={14} />
                  </button>
                </div>
                
                <div className="space-y-2.5">
                  {outcomes.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 group transition-transform duration-200 hover:translate-x-1">
                      <span className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500 flex-shrink-0">
                        {idx + 1}
                      </span>
                      <input 
                        type="text" 
                        value={item}
                        onChange={(e) => handleListChange(idx, e.target.value, outcomes, setOutcomes)}
                        placeholder="e.g. Build REST APIs with Spring Boot"
                        className="flex-grow bg-[#F8F9FD] border border-slate-100 hover:border-slate-200 focus:border-[#6C1D5F] rounded-xl px-4 py-2 text-xs text-slate-800 font-semibold focus:outline-none transition-all shadow-sm"
                      />
                      <button 
                        type="button" 
                        onClick={() => handleRemoveListItem(idx, outcomes, setOutcomes)}
                        className="p-1.5 hover:bg-red-50 text-slate-300 hover:text-red-600 rounded-lg transition-colors animate-in zoom-in-75"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>

                <button 
                  type="button" 
                  onClick={() => handleAddListItem(outcomes, setOutcomes)}
                  className="bg-[#F8F9FD] hover:bg-slate-100 text-slate-700 border border-slate-200 font-bold text-[10px] px-4 py-2 rounded-xl shadow-sm hover:shadow-md transition-all flex items-center gap-1 active:scale-95 hover:-translate-y-0.5"
                >
                  <Plus size={12} /> Add Item
                </button>
              </div>

              {/* B. PREREQUISITES */}
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-slate-50 pb-2">
                  <div>
                    <h3 className="text-xs font-black text-slate-700 uppercase tracking-widest">Prerequisites</h3>
                    <p className="text-[10px] text-slate-400 font-bold">Optional</p>
                  </div>
                  <button 
                    type="button" 
                    onClick={handleAIPrereqs}
                    className="p-1.5 bg-[#6C1D5F]/10 hover:bg-[#6C1D5F]/20 text-[#6C1D5F] rounded-xl transition-all hover:scale-105 active:scale-95 flex items-center justify-center"
                  >
                    <Wand2 size={14} />
                  </button>
                </div>
                
                <div className="space-y-2.5">
                  {prerequisites.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 group transition-transform duration-200 hover:translate-x-1">
                      <span className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500 flex-shrink-0">
                        {idx + 1}
                      </span>
                      <input 
                        type="text" 
                        value={item}
                        onChange={(e) => handleListChange(idx, e.target.value, prerequisites, setPrerequisites)}
                        placeholder="e.g. Basic Java knowledge"
                        className="flex-grow bg-[#F8F9FD] border border-slate-100 hover:border-slate-200 focus:border-[#6C1D5F] rounded-xl px-4 py-2 text-xs text-slate-800 font-semibold focus:outline-none transition-all shadow-sm"
                      />
                      <button 
                        type="button" 
                        onClick={() => handleRemoveListItem(idx, prerequisites, setPrerequisites)}
                        className="p-1.5 hover:bg-red-50 text-slate-300 hover:text-red-600 rounded-lg transition-colors animate-in zoom-in-75"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>

                <button 
                  type="button" 
                  onClick={() => handleAddListItem(prerequisites, setPrerequisites)}
                  className="bg-[#F8F9FD] hover:bg-slate-100 text-slate-700 border border-slate-200 font-bold text-[10px] px-4 py-2 rounded-xl shadow-sm hover:shadow-md transition-all flex items-center gap-1 active:scale-95 hover:-translate-y-0.5"
                >
                  <Plus size={12} /> Add Item
                </button>
              </div>

              {/* C. TARGET AUDIENCE */}
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-slate-50 pb-2">
                  <div>
                    <h3 className="text-xs font-black text-slate-700 uppercase tracking-widest">Target Audience</h3>
                    <p className="text-[10px] text-slate-400 font-bold">Optional</p>
                  </div>
                  <button 
                    type="button" 
                    onClick={handleAIAudience}
                    className="p-1.5 bg-[#6C1D5F]/10 hover:bg-[#6C1D5F]/20 text-[#6C1D5F] rounded-xl transition-all hover:scale-105 active:scale-95 flex items-center justify-center"
                  >
                    <Wand2 size={14} />
                  </button>
                </div>
                
                <div className="space-y-2.5">
                  {targetAudience.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 group transition-transform duration-200 hover:translate-x-1">
                      <span className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500 flex-shrink-0">
                        {idx + 1}
                      </span>
                      <input 
                        type="text" 
                        value={item}
                        onChange={(e) => handleListChange(idx, e.target.value, targetAudience, setTargetAudience)}
                        placeholder="e.g. Backend developers who want to learn Spring Boot"
                        className="flex-grow bg-[#F8F9FD] border border-slate-100 hover:border-slate-200 focus:border-[#6C1D5F] rounded-xl px-4 py-2 text-xs text-slate-800 font-semibold focus:outline-none transition-all shadow-sm"
                      />
                      <button 
                        type="button" 
                        onClick={() => handleRemoveListItem(idx, targetAudience, setTargetAudience)}
                        className="p-1.5 hover:bg-red-50 text-slate-300 hover:text-red-600 rounded-lg transition-colors animate-in zoom-in-75"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>

                <button 
                  type="button" 
                  onClick={() => handleAddListItem(targetAudience, setTargetAudience)}
                  className="bg-[#F8F9FD] hover:bg-slate-100 text-slate-700 border border-slate-200 font-bold text-[10px] px-4 py-2 rounded-xl shadow-sm hover:shadow-md transition-all flex items-center gap-1 active:scale-95 hover:-translate-y-0.5"
                >
                  <Plus size={12} /> Add Item
                </button>
              </div>

              {/* D. COURSE HIGHLIGHTS */}
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-slate-50 pb-2">
                  <div>
                    <h3 className="text-xs font-black text-slate-700 uppercase tracking-widest">Course Highlights (Max 10)</h3>
                    <p className="text-[10px] text-slate-400 font-bold">Optional</p>
                  </div>
                  <button 
                    type="button" 
                    onClick={handleAIHighlights}
                    className="p-1.5 bg-[#6C1D5F]/10 hover:bg-[#6C1D5F]/20 text-[#6C1D5F] rounded-xl transition-all hover:scale-105 active:scale-95 flex items-center justify-center"
                  >
                    <Wand2 size={14} />
                  </button>
                </div>
                
                <div className="space-y-2.5">
                  {highlights.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 group transition-transform duration-200 hover:translate-x-1">
                      <span className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500 flex-shrink-0">
                        {idx + 1}
                      </span>
                      <input 
                        type="text" 
                        value={item}
                        onChange={(e) => handleListChange(idx, e.target.value, highlights, setHighlights)}
                        placeholder="Key highlights (e.g. 3 Real-world projects)"
                        className="flex-grow bg-[#F8F9FD] border border-slate-100 hover:border-slate-200 focus:border-[#6C1D5F] rounded-xl px-4 py-2 text-xs text-slate-800 font-semibold focus:outline-none transition-all shadow-sm"
                      />
                      <button 
                        type="button" 
                        onClick={() => handleRemoveListItem(idx, highlights, setHighlights)}
                        className="p-1.5 hover:bg-red-50 text-slate-300 hover:text-red-600 rounded-lg transition-colors animate-in zoom-in-75"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>

                <button 
                  type="button" 
                  onClick={() => {
                    if (highlights.length < 10) {
                      handleAddListItem(highlights, setHighlights);
                    }
                  }}
                  disabled={highlights.length >= 10}
                  className="bg-[#F8F9FD] hover:bg-slate-100 disabled:opacity-50 text-slate-700 border border-slate-200 font-bold text-[10px] px-4 py-2 rounded-xl shadow-sm hover:shadow-md transition-all flex items-center gap-1 active:scale-95 hover:-translate-y-0.5"
                >
                  <Plus size={12} /> Add Item
                </button>
              </div>

              {/* E. CAREER OPPORTUNITIES */}
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-slate-50 pb-2">
                  <div>
                    <h3 className="text-xs font-black text-slate-700 uppercase tracking-widest">Career Opportunities (Max 5)</h3>
                    <p className="text-[10px] text-slate-400 font-bold">Optional</p>
                  </div>
                  <button 
                    type="button" 
                    onClick={handleAICareers}
                    className="p-1.5 bg-[#6C1D5F]/10 hover:bg-[#6C1D5F]/20 text-[#6C1D5F] rounded-xl transition-all hover:scale-105 active:scale-95 flex items-center justify-center"
                  >
                    <Wand2 size={14} />
                  </button>
                </div>
                
                <div className="space-y-2.5">
                  {careerOpportunities.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 group transition-transform duration-200 hover:translate-x-1">
                      <span className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500 flex-shrink-0">
                        {idx + 1}
                      </span>
                      <input 
                        type="text" 
                        value={item}
                        onChange={(e) => handleListChange(idx, e.target.value, careerOpportunities, setCareerOpportunities)}
                        placeholder="e.g. Backend Developer, Cloud Engineer"
                        className="flex-grow bg-[#F8F9FD] border border-slate-100 hover:border-slate-200 focus:border-[#6C1D5F] rounded-xl px-4 py-2 text-xs text-slate-800 font-semibold focus:outline-none transition-all shadow-sm"
                      />
                      <button 
                        type="button" 
                        onClick={() => handleRemoveListItem(idx, careerOpportunities, setCareerOpportunities)}
                        className="p-1.5 hover:bg-red-50 text-slate-300 hover:text-red-600 rounded-lg transition-colors animate-in zoom-in-75"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>

                <button 
                  type="button" 
                  onClick={() => {
                    if (careerOpportunities.length < 5) {
                      handleAddListItem(careerOpportunities, setCareerOpportunities);
                    }
                  }}
                  disabled={careerOpportunities.length >= 5}
                  className="bg-[#F8F9FD] hover:bg-slate-100 disabled:opacity-50 text-slate-700 border border-slate-200 font-bold text-[10px] px-4 py-2 rounded-xl shadow-sm hover:shadow-md transition-all flex items-center gap-1 active:scale-95 hover:-translate-y-0.5"
                >
                  <Plus size={12} /> Add Item
                </button>
              </div>

            </div>
          </div>

          {/* 5. COURSE SETTINGS */}
          <div className={hoverRaiseClass + " border-t-[3px] border-t-emerald-500"}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 bg-white border border-slate-100 rounded-xl shadow-sm flex items-center justify-center text-emerald-500">
                <Info size={16} />
              </div>
              <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest">
                Course Settings
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
              {/* Active Toggle */}
              <div className="flex items-center justify-between py-1 border-b border-slate-50">
                <div>
                  <span className="text-xs font-extrabold text-slate-800 block">Active</span>
                  <span className="text-[10px] text-slate-400 font-semibold block">Makes the course visible to learners</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsActive(!isActive)}
                  className={`w-12 h-6 rounded-full transition-colors relative shadow-inner flex-shrink-0 ${isActive ? 'bg-[#01AC9F]' : 'bg-slate-200'}`}
                >
                  <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform shadow-md ${isActive ? 'translate-x-6' : ''}`}></span>
                </button>
              </div>

              {/* Published Toggle */}
              <div className="flex items-center justify-between py-1 border-b border-slate-50">
                <div>
                  <span className="text-xs font-extrabold text-slate-800 block">Published</span>
                  <span className="text-[10px] text-slate-400 font-semibold block">Publish the course now</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsPublished(!isPublished)}
                  className={`w-12 h-6 rounded-full transition-colors relative shadow-inner flex-shrink-0 ${isPublished ? 'bg-[#01AC9F]' : 'bg-slate-200'}`}
                >
                  <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform shadow-md ${isPublished ? 'translate-x-6' : ''}`}></span>
                </button>
              </div>

              {/* Featured Toggle */}
              <div className="flex items-center justify-between py-1 border-b border-slate-50">
                <div>
                  <span className="text-xs font-extrabold text-slate-800 block">Featured</span>
                  <span className="text-[10px] text-slate-400 font-semibold block">Show in featured section</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsFeatured(!isFeatured)}
                  className={`w-12 h-6 rounded-full transition-colors relative shadow-inner flex-shrink-0 ${isFeatured ? 'bg-[#01AC9F]' : 'bg-slate-200'}`}
                >
                  <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform shadow-md ${isFeatured ? 'translate-x-6' : ''}`}></span>
                </button>
              </div>

              {/* Allow Enrolling Toggle */}
              <div className="flex items-center justify-between py-1 border-b border-slate-50">
                <div>
                  <span className="text-xs font-extrabold text-slate-800 block">Allow Enrolling</span>
                  <span className="text-[10px] text-slate-400 font-semibold block">Allow new enrollments</span>
                </div>
                <button
                  type="button"
                  onClick={() => setAllowEnrolling(!allowEnrolling)}
                  className={`w-12 h-6 rounded-full transition-colors relative shadow-inner flex-shrink-0 ${allowEnrolling ? 'bg-[#01AC9F]' : 'bg-slate-200'}`}
                >
                  <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform shadow-md ${allowEnrolling ? 'translate-x-6' : ''}`}></span>
                </button>
              </div>

              {/* Show on Listing Toggle */}
              <div className="flex items-center justify-between py-1 border-b border-slate-50">
                <div>
                  <span className="text-xs font-extrabold text-slate-800 block">Show on Listing</span>
                  <span className="text-[10px] text-slate-400 font-semibold block">Show on course listing</span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowOnListing(!showOnListing)}
                  className={`w-12 h-6 rounded-full transition-colors relative shadow-inner flex-shrink-0 ${showOnListing ? 'bg-[#01AC9F]' : 'bg-slate-200'}`}
                >
                  <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform shadow-md ${showOnListing ? 'translate-x-6' : ''}`}></span>
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Saving Row Bar */}
          <div className="transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl bg-white border border-slate-100 rounded-3xl p-6 md:p-8 flex flex-col sm:flex-row items-center sm:justify-between gap-4 shadow-sm">
            <div className="text-[10px] text-slate-400 font-semibold flex items-center gap-1.5 select-none">
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-pulse"></span>
              Auto-saving enabled
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setCurrentAdminTab('courses')}
                className="flex-grow sm:flex-grow-0 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs px-5 py-3 rounded-2xl transition-all"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => submitCourse('Draft')}
                className="flex-grow sm:flex-grow-0 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs px-5 py-3 rounded-2xl transition-all"
              >
                Save as Draft
              </button>
              <button
                type="button"
                onClick={() => submitCourse('Active')}
                className="flex-grow sm:flex-grow-0 bg-gradient-to-r from-[#6C1D5F] to-[#01AC9F] hover:opacity-95 text-white font-extrabold text-xs px-5 py-3 rounded-2xl shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center justify-center gap-1.5"
              >
                <Plus size={14} />
                Create Course
              </button>
            </div>
          </div>

        </div>

        {/* Right Preview Column */}
        <div className="space-y-6">
          
          {/* A. LIVE PREVIEW */}
          <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm flex flex-col hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300">
            <div className="p-4 border-b border-slate-50 flex items-center justify-between">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5 select-none font-sans">
                <span className="w-1.5 h-1.5 bg-[#6C1D5F] rounded-full animate-pulse"></span>
                LIVE PREVIEW
              </span>
            </div>

            <div className="p-6 bg-slate-50/50">
              <div className="border border-slate-100 rounded-3xl overflow-hidden shadow-sm flex flex-col bg-white hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                {/* Image / Icon Banner Area */}
                <div className="h-44 relative bg-slate-100 flex items-center justify-center overflow-hidden">
                  {thumbnailUrl ? (
                    <img src={thumbnailUrl} alt="Thumbnail Preview" className="w-full h-full object-cover" />
                  ) : bannerUrl ? (
                    <img src={bannerUrl} alt="Banner Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex flex-col items-center select-none text-slate-300">
                      {iconUrl ? (
                        <img src={iconUrl} alt="Icon Preview" className="w-12 h-12 object-contain" />
                      ) : (
                        <span className="text-4xl font-extrabold tracking-widest opacity-20 font-sans">CO</span>
                      )}
                    </div>
                  )}

                  {/* Status Badges Overlay */}
                  <div className="absolute top-3 right-3 flex flex-col gap-1.5 font-sans">
                    <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-md bg-[#FF6200] text-white shadow-sm self-end">
                      Draft
                    </span>
                    {isActive && (
                      <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-md bg-emerald-500 text-white shadow-sm self-end">
                        Active
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Content details */}
                <div className="p-5 space-y-4 font-sans">
                  <span className="px-2.5 py-1 bg-orange-50 text-[#FF6200] rounded-lg text-[9px] uppercase font-black tracking-wider inline-block">
                    {level}
                  </span>
                  
                  <div className="space-y-1">
                    <h3 className="text-sm font-extrabold text-slate-800 line-clamp-2 leading-snug">
                      {title.trim() || 'Spring Boot Masterclass'}
                    </h3>
                    <p className="text-xs text-slate-400 font-semibold line-clamp-3 leading-relaxed">
                      {shortDescription.trim() || 'Course description preview...'}
                    </p>
                  </div>

                  {/* Footer details */}
                  <div className="flex items-center gap-4 pt-3 border-t border-slate-50 text-[10px] font-bold text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <Globe size={13} className="text-slate-400" />
                      {language}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={13} className="text-slate-400" />
                      {durationHrs > 0 || durationMin > 0 ? `${durationHrs}h ${durationMin}m` : '0 hrs'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* B. FIELD SUMMARY */}
          <div className="bg-white rounded-3xl border border-slate-100 p-6 md:p-8 shadow-sm space-y-5 hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest select-none font-sans">
              FIELD SUMMARY
            </h4>

            <ul className="space-y-4 font-sans">
              {/* Title Status */}
              <li className="flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-400">Title</span>
                <div className="flex items-center gap-2">
                  {title.trim() ? (
                    <>
                      <span className="text-slate-800 font-extrabold truncate max-w-[130px]">{title.trim()}</span>
                      <span className="w-4 h-4 rounded-full border border-[#01AC9F] bg-white flex items-center justify-center text-[9px] text-[#01AC9F] font-black select-none">✓</span>
                    </>
                  ) : (
                    <>
                      <span className="text-red-400 font-bold">—</span>
                      <span className="w-4 h-4 rounded-full border border-slate-200 bg-white block"></span>
                    </>
                  )}
                </div>
              </li>

              {/* Level Status */}
              <li className="flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-400">Level</span>
                <div className="flex items-center gap-2">
                  <span className="text-slate-800 font-extrabold">{level}</span>
                  <span className="w-4 h-4 rounded-full border border-[#01AC9F] bg-white flex items-center justify-center text-[9px] text-[#01AC9F] font-black select-none">✓</span>
                </div>
              </li>

              {/* Language Status */}
              <li className="flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-400">Language</span>
                <div className="flex items-center gap-2">
                  <span className="text-slate-800 font-extrabold">{language}</span>
                  <span className="w-4 h-4 rounded-full border border-[#01AC9F] bg-white flex items-center justify-center text-[9px] text-[#01AC9F] font-black select-none">✓</span>
                </div>
              </li>

              {/* Duration Status */}
              <li className="flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-400">Duration</span>
                <div className="flex items-center gap-2">
                  {durationHrs > 0 || durationMin > 0 ? (
                    <>
                      <span className="text-slate-800 font-extrabold">{durationHrs}h {durationMin}m</span>
                      <span className="w-4 h-4 rounded-full border border-[#01AC9F] bg-white flex items-center justify-center text-[9px] text-[#01AC9F] font-black select-none">✓</span>
                    </>
                  ) : (
                    <>
                      <span className="text-red-400 font-bold">—</span>
                      <span className="w-4 h-4 rounded-full border border-slate-200 bg-white block"></span>
                    </>
                  )}
                </div>
              </li>

              {/* Description Status */}
              <li className="flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-400">Description</span>
                <div className="flex items-center gap-2">
                  {shortDescription.trim() ? (
                    <>
                      <span className="text-slate-800 font-extrabold">Filled</span>
                      <span className="w-4 h-4 rounded-full border border-[#01AC9F] bg-white flex items-center justify-center text-[9px] text-[#01AC9F] font-black select-none">✓</span>
                    </>
                  ) : (
                    <>
                      <span className="text-red-400 font-bold">Empty</span>
                      <span className="w-4 h-4 rounded-full border border-slate-200 bg-white block"></span>
                    </>
                  )}
                </div>
              </li>

              {/* Status Status */}
              <li className="flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-400">Status</span>
                <div className="flex items-center gap-2">
                  <span className="text-slate-800 font-extrabold">{isActive ? 'Active' : 'Inactive'}</span>
                  <span className="w-4 h-4 rounded-full border border-[#01AC9F] bg-white flex items-center justify-center text-[9px] text-[#01AC9F] font-black select-none">✓</span>
                </div>
              </li>
            </ul>
          </div>

          {/* C. QUICK TIPS */}
          <div className="bg-[#FFFBF7] rounded-3xl border border-orange-100/50 p-6 md:p-8 space-y-4 hover:-translate-y-1.5 hover:shadow-xl hover:border-orange-200/50 transition-all duration-300">
            <h4 className="text-[10px] font-black text-[#FF6200] uppercase tracking-widest select-none font-sans">
              QUICK TIPS
            </h4>
            <ul className="space-y-2.5 text-xs font-bold text-[#b85314] list-none font-sans">
              <li className="flex items-start gap-1.5">• <span>Titles should be clear and searchable</span></li>
              <li className="flex items-start gap-1.5">• <span>Use high quality thumbnails</span></li>
              <li className="flex items-start gap-1.5">• <span>Include specific learning outcomes</span></li>
              <li className="flex items-start gap-1.5">• <span>Set duration accurately</span></li>
            </ul>
          </div>

        </div>

      </div>

    </div>
  );
};


