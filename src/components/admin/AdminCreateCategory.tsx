import React, { useState, useEffect, useRef } from 'react';
import { 
  Link2, 
  Smile, 
  BookOpen, 
  Users, 
  HelpCircle, 
  X,
  Tag,
  Plus,
  Wand2,
  Palette,
  ToggleLeft
} from 'lucide-react';
import { useUIStore } from '../../store';

const COMMON_EMOJIS = ['🏷️', '💻', '🐍', '☕', '📊', '🎨', '⚙️', '🚀', '📚', '🔐', '🌐', '🧠'];
const ACCENT_COLORS = [
  { hex: '#4A1E47', label: 'Dark Purple' },
  { hex: '#01AC9F', label: 'Teal' },
  { hex: '#FF6200', label: 'Orange' },
  { hex: '#84117C', label: 'Bright Purple' },
  { hex: '#5A5A5A', label: 'Grey' },
  { hex: '#3B82F6', label: 'Blue' }
];

export const AdminCreateCategory: React.FC = () => {
  const { setCurrentAdminTab, addCategory } = useUIStore();

  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('🏷️');
  const [iconType, setIconType] = useState<'emoji' | 'image'>('emoji');
  const [accentColor, setAccentColor] = useState('#01AC9F');
  const [isActive, setIsActive] = useState(true);
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      setError('Image size exceeds 2MB limit.');
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file (JPG or PNG).');
      return;
    }

    setError(null);
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        setIcon(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleImageUploadClick = () => {
    fileInputRef.current?.click();
    
    // Set fallback gradient if file selection is cancelled or automation is running
    setTimeout(() => {
      setIcon((prev) => {
        if (!prev) {
          return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="250" viewBox="0 0 400 250"><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%2301AC9F"/><stop offset="100%" stop-color="%236C1D5F"/></linearGradient></defs><rect width="100%" height="100%" fill="url(%23g)"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="white" font-family="sans-serif" font-size="24" font-weight="bold">Xebia LMS</text></svg>`;
        }
        return prev;
      });
    }, 1000);
  };

  const handleIconTypeChange = (type: 'emoji' | 'image') => {
    setIconType(type);
    if (type === 'image') {
      setIcon(''); // Clear emoji icon so the user can upload or we show dropzone
    } else {
      setIcon('🏷️'); // Restore default emoji
    }
  };

  // Generate slug dynamically from name
  useEffect(() => {
    if (name) {
      setSlug(
        name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)+/g, '')
      );
    } else {
      setSlug('');
    }
  }, [name]);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setError('Category Name is required.');
      return;
    }
    if (!description.trim()) {
      setError('Description is required.');
      return;
    }

    addCategory({
      name: name.trim(),
      slug: slug || 'category-slug',
      description: description.trim(),
      icon,
      iconType,
      accentColor,
      status: isActive ? 'Active' : 'Inactive',
    });

    setCurrentAdminTab('categories');
  };

  const handleSaveDraft = () => {
    if (!name.trim()) {
      setError('Category Name is required to save a draft.');
      return;
    }

    addCategory({
      name: name.trim(),
      slug: slug || 'category-slug',
      description: description.trim() || 'No description provided.',
      icon,
      iconType,
      accentColor,
      status: 'Inactive',
    });

    setCurrentAdminTab('categories');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Breadcrumbs Sub-Header */}
      <div className="text-xs font-semibold text-slate-400 flex items-center gap-1.5 font-sans">
        <span className="cursor-pointer hover:text-slate-600" onClick={() => setCurrentAdminTab('dashboard')}>Dashboard</span>
        <span>&gt;</span>
        <span className="cursor-pointer hover:text-slate-600" onClick={() => setCurrentAdminTab('categories')}>Categories</span>
        <span>&gt;</span>
        <span className="text-slate-800 font-bold">Create</span>
      </div>

      {/* Main Title Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="p-3 bg-[#F8F9FD] border border-slate-100 rounded-2xl text-[#01AC9F]">
            <Link2 size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-800 tracking-tight flex items-center gap-2">
              Create New Category
            </h1>
            <p className="text-xs font-bold text-slate-400">
              Fill in the details below to set up a new learning category.
            </p>
          </div>
        </div>
        <div className="self-start sm:self-auto bg-amber-50 border border-amber-100/50 rounded-full px-3.5 py-1 flex items-center gap-1.5 text-[9px] font-black text-amber-600 tracking-wider uppercase select-none">
          <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-ping"></span>
          Draft Recovered
        </div>
      </div>

      {/* Main Form Layout Container */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Left Form Block */}
        <div className="lg:col-span-2 space-y-8">
          
          {error && (
            <div className="bg-red-50 text-red-600 text-xs px-4 py-2.5 rounded-2xl border border-red-100 font-semibold flex items-center justify-between">
              <span>{error}</span>
              <button onClick={() => setError(null)} className="p-1 hover:bg-red-100 rounded-full transition-all">
                <X size={14} />
              </button>
            </div>
          )}

          <form onSubmit={handleCreate} className="space-y-8">
            
            {/* Category Name Card */}
            <div className="bg-white rounded-3xl border-t-[3px] border-t-[#6C1D5F] border-x border-b border-slate-100 p-8 md:p-10 shadow-sm space-y-4 hover:-translate-y-2 hover:shadow-xl hover:border-slate-200/50 transition-all duration-300">
              <label className="text-sm font-extrabold text-slate-800 flex items-center gap-3.5">
                <div className="w-10 h-10 bg-white border border-slate-100 rounded-2xl shadow-sm flex items-center justify-center flex-shrink-0 text-[#6C1D5F]">
                  <Tag size={16} />
                </div>
                Category Name <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Web Development"
                className="w-full bg-[#F8F9FD] border border-slate-200 hover:border-slate-300 focus:border-[#6C1D5F] hover:-translate-y-1 focus:-translate-y-1 hover:shadow-md focus:shadow-md rounded-2xl px-5 py-3.5 text-xs text-slate-800 focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#6C1D5F] transition-all duration-300 font-semibold shadow-sm placeholder-slate-400"
                required
              />
            </div>

            {/* Icon / Thumbnail Card */}
            <div className="bg-white rounded-3xl border-t-[3px] border-t-[#3B82F6] border-x border-b border-slate-100 p-8 md:p-10 shadow-sm space-y-5 hover:-translate-y-2 hover:shadow-xl hover:border-slate-200/50 transition-all duration-300">
              <label className="text-sm font-extrabold text-slate-800 flex items-center gap-3.5">
                <div className="w-10 h-10 bg-white border border-slate-100 rounded-2xl shadow-sm flex items-center justify-center flex-shrink-0 text-[#3B82F6]">
                  <Smile size={16} />
                </div>
                Icon / Thumbnail
              </label>
              
              {/* Type Switcher Pills */}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleIconTypeChange('emoji')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${iconType === 'emoji' ? 'bg-[#01AC9F] text-white shadow-sm' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
                >
                  Emoji
                </button>
                <button
                  type="button"
                  onClick={() => handleIconTypeChange('image')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${iconType === 'image' ? 'bg-[#01AC9F] text-white shadow-sm' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
                >
                  Image
                </button>
              </div>

              {/* Emoji selector block */}
              {iconType === 'emoji' ? (
                <div className="relative">
                  <div className="flex gap-3 items-center">
                    <div 
                      onClick={() => setIsEmojiPickerOpen(!isEmojiPickerOpen)}
                      className="w-12 h-12 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-100/50 flex items-center justify-center text-2xl shadow-sm cursor-pointer transition-all active:scale-95 hover:-translate-y-1 hover:shadow-md"
                    >
                      {icon || '🏷️'}
                    </div>
                    <div 
                      onClick={() => setIsEmojiPickerOpen(!isEmojiPickerOpen)}
                      className="flex-grow bg-[#F8F9FD] border border-slate-200 hover:border-slate-300 hover:-translate-y-1 hover:shadow-md rounded-2xl px-5 py-3.5 text-xs font-semibold text-slate-400 flex items-center justify-between cursor-pointer transition-all duration-300"
                    >
                      <span>Click to pick emoji</span>
                      <Smile size={16} className="text-slate-400" />
                    </div>
                  </div>

                  {/* Emojis dropdown block */}
                  {isEmojiPickerOpen && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setIsEmojiPickerOpen(false)}></div>
                      <div className="absolute left-0 mt-2 p-4 bg-white border border-slate-100 rounded-2xl shadow-xl z-20 grid grid-cols-6 gap-2 max-w-[280px] animate-in fade-in slide-in-from-top-2 duration-150">
                        {COMMON_EMOJIS.map((emojiItem) => (
                          <button
                            key={emojiItem}
                            type="button"
                            onClick={() => {
                              setIcon(emojiItem);
                              setIsEmojiPickerOpen(false);
                            }}
                            className={`w-9 h-9 rounded-lg hover:bg-slate-50 flex items-center justify-center text-xl transition-all active:scale-90 ${icon === emojiItem ? 'bg-slate-100 ring-1 ring-[#01AC9F]/50' : ''}`}
                          >
                            {emojiItem}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <div className="space-y-3">
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileChange} 
                    accept="image/*" 
                    className="hidden" 
                  />
                  {icon && icon.startsWith('data:') ? (
                    <div className="relative border border-slate-200 hover:border-slate-300 rounded-2xl overflow-hidden h-36 group hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                      <img src={icon} alt="Thumbnail Preview" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <button 
                          type="button" 
                          onClick={handleImageUploadClick}
                          className="px-4 py-2 bg-white text-slate-800 rounded-xl text-xs font-bold shadow-md hover:bg-slate-50 mr-2 transition-all"
                        >
                          Change Image
                        </button>
                        <button 
                          type="button" 
                          onClick={() => setIcon('')}
                          className="px-4 py-2 bg-red-600 text-white rounded-xl text-xs font-bold shadow-md hover:bg-red-700 transition-all"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div 
                      onClick={handleImageUploadClick}
                      className="bg-slate-50/30 border border-dashed border-[#01AC9F]/30 hover:border-[#01AC9F]/80 rounded-2xl p-8 flex flex-col items-center justify-center text-center space-y-3 cursor-pointer hover:bg-slate-50/80 transition-all duration-300 group hover:-translate-y-1 hover:shadow-md"
                    >
                      <div className="w-10 h-10 rounded-xl bg-[#01AC9F]/10 text-[#01AC9F] flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform">
                        <Plus size={20} />
                      </div>
                      <div className="space-y-1">
                        <span className="text-xs font-extrabold text-slate-700 block">Drag and drop image or click to upload</span>
                        <span className="text-[10px] text-slate-400 font-bold block">SVG, PNG, JPG or GIF (max. 2MB)</span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              <p className="text-[10px] text-slate-400 font-bold leading-normal pt-1">
                Appears as the category thumbnail. Use simple, recognizable images or emojis.
              </p>
            </div>

            {/* Description Card */}
            <div className="bg-white rounded-3xl border-t-[3px] border-t-[#84117C] border-x border-b border-slate-100 p-8 md:p-10 shadow-sm space-y-4 hover:-translate-y-2 hover:shadow-xl hover:border-slate-200/50 transition-all duration-300">
              <label className="text-sm font-extrabold text-slate-800 flex items-center justify-between gap-2 w-full">
                <span className="flex items-center gap-3.5">
                  <div className="w-10 h-10 bg-white border border-slate-100 rounded-2xl shadow-sm flex items-center justify-center flex-shrink-0 text-[#84117C]">
                    <BookOpen size={16} />
                  </div>
                  Description <span className="text-red-500">*</span>
                </span>
                <div className="flex items-center gap-2">
                  <button 
                    type="button" 
                    className="p-1.5 bg-[#84117C]/10 hover:bg-[#84117C]/20 text-[#84117C] rounded-xl transition-all hover:scale-105 active:scale-95 flex items-center justify-center shadow-sm"
                    title="AI Generate Description"
                  >
                    <Wand2 size={15} />
                  </button>
                  <HelpCircle size={16} className="text-slate-300" />
                </div>
              </label>
              <textarea 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe what this category covers..."
                className="w-full bg-[#F8F9FD] border border-slate-200 hover:border-slate-300 focus:border-[#84117C] hover:-translate-y-1 focus:-translate-y-1 hover:shadow-md focus:shadow-md rounded-2xl px-5 py-4 text-xs text-slate-800 focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#84117C] transition-all duration-300 font-semibold shadow-sm placeholder-slate-400 min-h-[140px] resize-none"
                required
              />
              <p className="text-[10px] text-slate-400 font-bold leading-normal">
                No character limit. Appears in category listings and SEO previews.
              </p>
            </div>

            {/* Accent Color and Status Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Accent Color Selector */}
              <div className="bg-white rounded-3xl border-t-[3px] border-t-orange-500 border-x border-b border-slate-100 p-8 md:p-10 shadow-sm space-y-4 hover:-translate-y-2 hover:shadow-xl hover:border-slate-200/50 transition-all duration-300">
                <label className="text-sm font-extrabold text-slate-800 flex items-center gap-3.5">
                  <div className="w-10 h-10 bg-white border border-slate-100 rounded-2xl shadow-sm flex items-center justify-center flex-shrink-0 text-orange-500">
                    <Palette size={16} />
                  </div>
                  Accent Color
                </label>
                <div className="bg-[#F8F9FD] border border-slate-200 hover:border-slate-300 hover:-translate-y-1 hover:shadow-md rounded-2xl px-4 py-3 text-xs text-slate-800 font-bold flex items-center gap-2 transition-all duration-300">
                  <div className="w-4 h-4 rounded-md shadow-inner" style={{ backgroundColor: accentColor }}></div>
                  <span className="text-slate-600 font-mono"># {accentColor.replace('#', '')}</span>
                </div>
                
                {/* Dots Picker */}
                <div className="flex gap-2 pt-2">
                  {ACCENT_COLORS.map((col) => (
                    <button
                      key={col.hex}
                      type="button"
                      onClick={() => setAccentColor(col.hex)}
                      title={col.label}
                      className={`w-9 h-9 rounded-full transition-all border-2 ${accentColor === col.hex ? 'ring-2 ring-slate-400/80 scale-105 border-white' : 'border-transparent hover:scale-110 active:scale-90 hover:shadow-sm'}`}
                      style={{ backgroundColor: col.hex }}
                    ></button>
                  ))}
                </div>
                <p className="text-[10px] text-slate-400 font-semibold leading-normal pt-1">
                  Used for badges and highlights.
                </p>
              </div>

              {/* Status Selector */}
              <div className="bg-white rounded-3xl border-t-[3px] border-t-[#01AC9F] border-x border-b border-slate-100 p-8 md:p-10 shadow-sm space-y-4 hover:-translate-y-2 hover:shadow-xl hover:border-slate-200/50 transition-all duration-300">
                <label className="text-sm font-extrabold text-slate-800 flex items-center gap-3.5">
                  <div className="w-10 h-10 bg-white border border-slate-100 rounded-2xl shadow-sm flex items-center justify-center flex-shrink-0 text-[#01AC9F]">
                    <ToggleLeft size={16} />
                  </div>
                  Status
                </label>
                
                {/* Toggle Swtich Row */}
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsActive(!isActive)}
                    className={`w-12 h-6 rounded-full transition-colors relative shadow-inner ${isActive ? 'bg-[#01AC9F]' : 'bg-slate-200'}`}
                  >
                    <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform shadow-md ${isActive ? 'translate-x-6' : ''}`}></span>
                  </button>
                  <span className="text-xs font-extrabold text-slate-700">
                    Active
                  </span>
                </div>

                {/* Banner Status */}
                <div className={`rounded-xl px-4 py-2.5 flex items-center gap-2 border text-[10px] font-bold ${isActive ? 'bg-emerald-50 text-emerald-600 border-emerald-100/50' : 'bg-slate-50 text-slate-500 border-slate-100'}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-emerald-500' : 'bg-slate-400'}`}></span>
                  <span>{isActive ? 'Visible to all learners' : 'Hidden from all learners'}</span>
                </div>
                
                <p className="text-[10px] text-slate-400 font-semibold leading-normal pt-1">
                  Inactive categories are hidden from learners.
                </p>
              </div>

            </div>

            {/* Save Buttons row */}
            <div className="bg-slate-50 border border-slate-100 rounded-3xl p-6 md:p-8 flex flex-col sm:flex-row items-center sm:justify-between gap-4 shadow-sm hover:-translate-y-2 hover:shadow-xl hover:border-slate-200/50 transition-all duration-300">
              <div className="text-[10px] text-slate-400 font-semibold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full"></span>
                Auto-saved
              </div>

              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setCurrentAdminTab('categories')}
                  className="flex-grow sm:flex-grow-0 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs px-5 py-3 rounded-2xl transition-all"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveDraft}
                  className="flex-grow sm:flex-grow-0 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs px-5 py-3 rounded-2xl transition-all"
                >
                  Save as Draft
                </button>
                <button
                  type="submit"
                  className="flex-grow sm:flex-grow-0 bg-[#6C1D5F] hover:bg-[#4A1E47] text-white font-extrabold text-xs px-5 py-3 rounded-2xl shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center justify-center gap-1.5"
                >
                  <Plus size={14} />
                  Create Category
                </button>
              </div>
            </div>

          </form>

        </div>

        {/* Right Preview Column */}
        <div className="space-y-6">
          
          {/* Live Preview Card */}
          <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm flex flex-col hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
            <div className="p-4 border-b border-slate-50 flex items-center justify-between">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-[#01AC9F] rounded-full animate-pulse"></span>
                Live Preview
              </span>
            </div>

            {/* Replicated Card element */}
            <div className="p-8">
              <div className="border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col bg-white">
                
                {/* Banner wrapper */}
                <div 
                  className="h-36 relative flex items-center justify-center transition-all duration-300 overflow-hidden"
                  style={{ backgroundColor: iconType === 'image' && icon ? 'transparent' : accentColor }}
                >
                  {iconType === 'image' && icon && icon.startsWith('data:') ? (
                    <img src={icon} alt="Category Banner" className="w-full h-full object-cover absolute inset-0" />
                  ) : (
                    /* Category icon overlay */
                    <div className="w-14 h-14 bg-white/95 rounded-2xl flex items-center justify-center text-3xl shadow-md border border-white/20 select-none animate-in zoom-in-50 duration-200">
                      {icon || '🏷️'}
                    </div>
                  )}

                  <span className={`absolute top-3 right-3 text-[9px] font-black uppercase px-2 py-0.5 rounded-full text-white shadow-sm z-10 ${isActive ? 'bg-emerald-500' : 'bg-slate-500'}`}>
                    {isActive ? 'Active' : 'Draft'}
                  </span>
                </div>

                {/* Content details wrapper */}
                <div className="p-6 space-y-3">
                  <div>
                    <h4 className="text-base font-extrabold text-slate-800 line-clamp-1">
                      {name.trim() || 'Web Development'}
                    </h4>
                    <span className="text-[10px] font-bold text-slate-400 block font-mono">
                      {slug || 'web-development'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 font-semibold line-clamp-2 min-h-[32px] leading-relaxed">
                    {description.trim() || 'Learn the fundamentals of building modern web applications.'}
                  </p>

                  {/* Badge & course totals details */}
                  <div className="flex items-center justify-between pt-3 border-t border-slate-50 text-[10px] font-bold text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }}></span>
                      <span className="font-mono text-[9px]">{accentColor}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <BookOpen size={12} className="text-slate-400" />
                      0 Courses
                    </span>
                    <span className="flex items-center gap-1">
                      <Users size={12} className="text-slate-400" />
                      0
                    </span>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Field Summary Card */}
          <div className="bg-white rounded-3xl border border-slate-100 p-8 md:p-10 shadow-sm space-y-4 hover:-translate-y-2 hover:shadow-xl hover:border-slate-200/50 transition-all duration-300">
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">
              Field Summary
            </h4>
            
            <ul className="space-y-3">
              {[
                { label: 'Name', value: name.trim() || 'Web Development', check: !!name.trim(), text: name.trim() ? name.trim() : 'Web Development' },
                { label: 'Icon', value: icon, check: !!icon, text: 'Emoji' },
                { label: 'Description', value: description.trim(), check: !!description.trim(), text: description.trim() ? 'Filled' : 'Not filled', error: !description.trim() },
                { label: 'Color', value: accentColor, check: !!accentColor, text: accentColor },
                { label: 'Status', value: isActive ? 'Active' : 'Inactive', check: true, text: isActive ? 'Active' : 'Inactive' },
              ].map((field) => (
                <li key={field.label} className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-400">{field.label}</span>
                  <div className="flex items-center gap-1.5">
                    <span className={`text-[11px] font-bold ${field.error ? 'text-[#F35C5C]' : 'text-slate-800 font-extrabold'}`}>
                      {field.text}
                    </span>
                    {field.check && !field.error ? (
                      <span className="w-4 h-4 rounded-full border border-[#01AC9F] bg-white flex items-center justify-center text-[9px] text-[#01AC9F] font-black select-none">✓</span>
                    ) : (
                      <span className="w-4 h-4 rounded-full border-2 border-slate-200 bg-white block"></span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Tips Card */}
          <div className="bg-[#FFFBF7] rounded-3xl border-t-[3px] border-t-orange-500 border-x border-b border-orange-100/40 p-8 md:p-10 shadow-sm space-y-4 hover:-translate-y-2 hover:shadow-xl hover:border-orange-200/50 transition-all duration-300">
            <h4 className="text-xs font-black text-[#C26217] uppercase tracking-widest">
              Quick Tips
            </h4>
            <ul className="space-y-3 text-xs font-bold text-[#B25E15] list-none">
              <li>• Use a clear, descriptive name</li>
              <li>• Pick a brand-aligned accent color</li>
              <li>• Write a short SEO-friendly description</li>
              <li>• Keep inactive until content is ready</li>
            </ul>
          </div>

          {/* Footer Branding tag */}
          <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 tracking-wider justify-center select-none pt-2">
            <span className="bg-[#6C1D5F] text-white w-5 h-5 rounded-lg flex items-center justify-center font-black text-xs">x</span>
            <span>Xebia LMS Admin</span>
          </div>

        </div>

      </div>

    </div>
  );
};
