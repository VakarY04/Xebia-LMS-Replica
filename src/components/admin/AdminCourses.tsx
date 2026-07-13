import React, { useState, useRef } from 'react';
import { 
  BookOpen, 
  Search, 
  LayoutGrid, 
  List, 
  ChevronDown, 
  Plus, 
  GraduationCap, 
  Users,
  Clock,
  X,
  Trash2,
  Image as ImageIcon
} from 'lucide-react';
import { useUIStore } from '../../store';

export const AdminCourses: React.FC = () => {
  const { adminCourses, categories, addAdminCourse, deleteAdminCourse, releaseAdminCourses, setCurrentAdminTab } = useUIStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSort, setSelectedSort] = useState('All Courses');
  const [selectedLevel, setSelectedLevel] = useState('All Levels');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCourseIds, setSelectedCourseIds] = useState<string[]>([]);

  // Modal State
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [level, setLevel] = useState<'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'>('Beginner');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState<'Published' | 'Draft' | 'Active' | 'Inactive'>('Published');
  const [accentColor, setAccentColor] = useState('#01AC9F');
  const [courseImage, setCourseImage] = useState('');
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-set first category on modal open
  React.useEffect(() => {
    if (categories.length > 0 && !category) {
      setCategory(categories[0].name);
    }
  }, [categories, isCreateModalOpen]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setError('Image size exceeds 2MB limit.');
      return;
    }

    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file.');
      return;
    }

    setError(null);
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        setCourseImage(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const toggleCourseSelection = (id: string) => {
    setSelectedCourseIds((current) =>
      current.includes(id)
        ? current.filter((courseId) => courseId !== id)
        : [...current, id]
    );
  };

  const toggleSelectAllVisible = () => {
    const visibleIds = sortedCourses.map((course) => course.id);
    const allVisibleSelected = visibleIds.every((id) => selectedCourseIds.includes(id));

    if (allVisibleSelected) {
      setSelectedCourseIds((current) => current.filter((id) => !visibleIds.includes(id)));
      return;
    }

    setSelectedCourseIds((current) => Array.from(new Set([...current, ...visibleIds])));
  };

  const handleReleaseSelected = () => {
    if (selectedCourseIds.length === 0) return;

    releaseAdminCourses(selectedCourseIds);
    setSelectedCourseIds([]);
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Course title is required.');
      return;
    }
    if (!category) {
      setError('Please select a category.');
      return;
    }

    const generatedSlug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    addAdminCourse({
      title: title.trim(),
      slug: generatedSlug,
      description: description.trim(),
      level,
      category,
      status,
      accentColor,
      image: courseImage || undefined
    });

    // Reset states
    setTitle('');
    setDescription('');
    setLevel('Beginner');
    setCourseImage('');
    setError(null);
    setIsCreateModalOpen(false);
  };

  // Filter & Search Logic
  const filteredCourses = adminCourses.filter((course) => {
    const matchesSearch = 
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.slug.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesLevel = 
      selectedLevel === 'All Levels' || 
      course.level === selectedLevel;

    const matchesCategory = 
      selectedCategory === 'All Categories' || 
      course.category === selectedCategory;

    const matchesStatus = 
      selectedStatus === 'All Status' || 
      course.status === selectedStatus;

    const matchesFavorites = 
      selectedSort === 'All Courses' ||
      (selectedSort === 'Favorites' && !!course.isFavorite);

    return matchesSearch && matchesLevel && matchesCategory && matchesStatus && matchesFavorites;
  });

  // Sort logic
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    if (selectedSort === 'A-Z') return a.title.localeCompare(b.title);
    if (selectedSort === 'Z-A') return b.title.localeCompare(a.title);
    return 0; // Default / Latest
  });

  // Stats
  const totalCourses = adminCourses.length;
  const publishedCourses = adminCourses.filter(c => c.status === 'Published').length;
  const draftCourses = adminCourses.filter(c => c.status === 'Draft').length;
  const totalEnrollments = adminCourses.reduce((sum, c) => sum + c.enrollmentsCount, 0);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Sub-header Breadcrumbs */}
      <div className="text-xs font-semibold text-slate-400 flex items-center gap-1.5 font-sans">
        <span className="text-slate-400">Admin</span>
        <span>&gt;</span>
        <span className="text-slate-800 font-bold">Courses</span>
      </div>

      {/* Title & Create button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 bg-white border border-slate-100 rounded-2xl shadow-sm flex items-center justify-center flex-shrink-0 text-[#6C1D5F]">
            <BookOpen size={20} />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-800 tracking-tight">
              Courses
            </h1>
            <p className="text-xs font-bold text-slate-400">
              Manage and organize your learning library.
            </p>
          </div>
        </div>

        <button
          onClick={() => setCurrentAdminTab('create-course')}
          className="self-start sm:self-auto bg-[#6C1D5F] hover:bg-[#4A1E47] text-white font-extrabold text-xs px-5 py-3.5 rounded-2xl shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center gap-2"
        >
          <Plus size={16} />
          Create Course
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* TOTAL COURSES */}
        <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm hover:-translate-y-2 hover:shadow-xl hover:border-slate-200/50 transition-all duration-300 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
              Total Courses
            </span>
            <span className="text-3xl font-black text-slate-800">{totalCourses}</span>
            <span className="text-[10px] text-slate-400 font-bold block pt-0.5">
              All courses in library
            </span>
          </div>
          <div className="p-3.5 bg-[#6C1D5F]/10 text-[#6C1D5F] rounded-2xl">
            <BookOpen size={20} />
          </div>
        </div>

        {/* PUBLISHED COURSES */}
        <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm hover:-translate-y-2 hover:shadow-xl hover:border-slate-200/50 transition-all duration-300 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
              Published Courses
            </span>
            <span className="text-3xl font-black text-slate-800">{publishedCourses}</span>
            <span className="text-[10px] text-slate-400 font-bold block pt-0.5">
              Courses are live
            </span>
          </div>
          <div className="p-3.5 bg-[#01AC9F]/10 text-[#01AC9F] rounded-2xl">
            <GraduationCap size={20} />
          </div>
        </div>

        {/* DRAFT COURSES */}
        <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm hover:-translate-y-2 hover:shadow-xl hover:border-slate-200/50 transition-all duration-300 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
              Draft Courses
            </span>
            <span className="text-3xl font-black text-slate-800">{draftCourses}</span>
            <span className="text-[10px] text-slate-400 font-bold block pt-0.5">
              Work in progress
            </span>
          </div>
          <div className="p-3.5 bg-[#FF6200]/10 text-[#FF6200] rounded-2xl">
            <Clock size={20} />
          </div>
        </div>

        {/* TOTAL ENROLLMENTS */}
        <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm hover:-translate-y-2 hover:shadow-xl hover:border-slate-200/50 transition-all duration-300 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
              Total Enrollments
            </span>
            <span className="text-3xl font-black text-slate-800">{totalEnrollments}</span>
            <span className="text-[10px] text-slate-400 font-bold block pt-0.5">
              Across all courses
            </span>
          </div>
          <div className="p-3.5 bg-[#3B82F6]/10 text-[#3B82F6] rounded-2xl">
            <Users size={20} />
          </div>
        </div>

      </div>

      {/* Filter / Search Bar */}
      <div className="bg-white rounded-3xl border border-slate-100 p-4 shadow-sm flex flex-col lg:flex-row items-center gap-4 hover:-translate-y-2 hover:shadow-xl hover:border-slate-200/50 transition-all duration-300">
        
        {/* Search */}
        <div className="w-full lg:w-80 flex items-center bg-[#F8F9FD] border border-slate-200 hover:border-slate-300 hover:-translate-y-1 focus-within:-translate-y-1 hover:shadow-md focus-within:shadow-md rounded-2xl px-4 py-2.5 relative transition-all duration-300 group">
          <Search size={14} className="text-slate-400 mr-2 flex-shrink-0" />
          <input 
            type="text"
            placeholder="Search courses by title or slug"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent border-none text-xs w-full focus:outline-none text-slate-800 placeholder-slate-400 font-semibold"
          />
        </div>

        {/* Scope Select */}
        <div className="w-full sm:w-auto flex items-center gap-2 relative group">
          <select
            value={selectedSort}
            onChange={(e) => setSelectedSort(e.target.value)}
            className="appearance-none bg-[#F8F9FD] hover:bg-slate-50 border border-slate-200 hover:border-slate-300 hover:-translate-y-1 hover:shadow-md rounded-2xl px-5 py-2.5 text-xs font-bold text-slate-700 focus:outline-none transition-all duration-300 pr-10 cursor-pointer w-full sm:w-auto"
          >
            <option value="All Courses">All Courses</option>
            <option value="Favorites">Favorites</option>
          </select>
          <ChevronDown size={14} className="text-slate-400 absolute right-4 pointer-events-none" />
        </div>

        {/* Layout Grid / List Switcher */}
        <div className="hidden sm:flex items-center gap-1.5 bg-[#F8F9FD] p-1.5 rounded-2xl border border-slate-200 hover:-translate-y-1 hover:shadow-md transition-all duration-300">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-white text-[#6C1D5F] shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
            title="Grid View"
          >
            <LayoutGrid size={14} />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-xl transition-all ${viewMode === 'list' ? 'bg-white text-[#6C1D5F] shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
            title="List View"
          >
            <List size={14} />
          </button>
        </div>

        {/* Spacer */}
        <div className="hidden lg:block flex-grow"></div>

        {/* Filter Levels Select */}
        <div className="w-full sm:w-auto flex items-center gap-2 relative group">
          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="appearance-none bg-[#F8F9FD] hover:bg-slate-50 border border-slate-200 hover:border-slate-300 hover:-translate-y-1 hover:shadow-md rounded-2xl px-5 py-2.5 text-xs font-bold text-slate-700 focus:outline-none transition-all duration-300 pr-10 cursor-pointer w-full sm:w-auto"
          >
            <option value="All Levels">All Levels</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
            <option value="Expert">Expert</option>
          </select>
          <ChevronDown size={14} className="text-slate-400 absolute right-4 pointer-events-none" />
        </div>

        {/* Filter Categories Select */}
        <div className="w-full sm:w-auto flex items-center gap-2 relative group">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="appearance-none bg-[#F8F9FD] hover:bg-slate-50 border border-slate-200 hover:border-slate-300 hover:-translate-y-1 hover:shadow-md rounded-2xl px-5 py-2.5 text-xs font-bold text-slate-700 focus:outline-none transition-all duration-300 pr-10 cursor-pointer w-full sm:w-auto"
          >
            <option value="All Categories">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>{cat.name}</option>
            ))}
          </select>
          <ChevronDown size={14} className="text-slate-400 absolute right-4 pointer-events-none" />
        </div>

        {/* Filter Status Select */}
        <div className="w-full sm:w-auto flex items-center gap-2 relative group">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="appearance-none bg-[#F8F9FD] hover:bg-slate-50 border border-slate-200 hover:border-slate-300 hover:-translate-y-1 hover:shadow-md rounded-2xl px-5 py-2.5 text-xs font-bold text-slate-700 focus:outline-none transition-all duration-300 pr-10 cursor-pointer w-full sm:w-auto"
          >
            <option value="All Status">All Status</option>
            <option value="Published">Published</option>
            <option value="Draft">Draft</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <ChevronDown size={14} className="text-slate-400 absolute right-4 pointer-events-none" />
        </div>

        <div className="flex flex-wrap items-center gap-2 lg:ml-auto">
          <label className="flex items-center gap-2 bg-[#F8F9FD] border border-slate-200 rounded-2xl px-3 py-2 text-[10px] font-black text-slate-600 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={sortedCourses.length > 0 && sortedCourses.every((course) => selectedCourseIds.includes(course.id))}
              onChange={toggleSelectAllVisible}
              className="accent-[#6C1D5F]"
            />
            Select all visible
          </label>
          <button
            type="button"
            onClick={handleReleaseSelected}
            disabled={selectedCourseIds.length === 0}
            className="bg-[#01AC9F] hover:bg-[#078b82] text-white font-extrabold text-xs px-4 py-2.5 rounded-2xl shadow-md hover:shadow-lg transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Release
          </button>
        </div>

      </div>

      {/* Showing X courses label */}
      <div className="text-xs font-semibold text-slate-400 tracking-wide select-none">
        Showing {sortedCourses.length === 0 ? 0 : 1} to {sortedCourses.length} of {sortedCourses.length} courses
      </div>

      {/* Main Content Area */}
      {sortedCourses.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-100 py-20 px-6 shadow-sm flex flex-col items-center justify-center text-center space-y-4 hover:-translate-y-2 hover:shadow-xl hover:border-slate-200/50 transition-all duration-300">
          <div className="p-4 bg-slate-50 text-slate-400 rounded-full">
            <BookOpen size={32} />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-slate-800">No courses found</h3>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed font-semibold">
              There are no courses matching your filter criteria. Create one by clicking "+ Create Course".
            </p>
          </div>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-200">
          {sortedCourses.map((course) => (
            <div 
              key={course.id} 
              className="border border-slate-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 hover:border-slate-200/50 transition-all duration-300 flex flex-col bg-white group"
            >
              {/* Card Banner */}
              <div 
                className="h-28 relative flex items-center justify-center transition-all duration-300 overflow-hidden"
                style={{ backgroundColor: course.image ? 'transparent' : course.accentColor }}
              >
                <label className="absolute top-3 left-3 z-20 flex items-center gap-2 bg-white/90 px-2 py-1 rounded-full shadow-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedCourseIds.includes(course.id)}
                    onChange={() => toggleCourseSelection(course.id)}
                    className="accent-[#6C1D5F]"
                  />
                  <span className="text-[9px] font-black uppercase text-slate-600">Select</span>
                </label>
                {course.image ? (
                  <img src={course.image} alt={course.title} className="w-full h-full object-cover absolute inset-0 group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="text-white font-extrabold text-lg select-none">
                    {course.category}
                  </div>
                )}
                
                <span className={`absolute top-3 right-3 text-[9px] font-black uppercase px-2 py-0.5 rounded-full text-white shadow-sm z-10 ${course.status === 'Published' ? 'bg-emerald-500' : 'bg-slate-500'}`}>
                  {course.status}
                </span>

                <button 
                  onClick={() => deleteAdminCourse(course.id)}
                  className="absolute bottom-3 right-3 p-2 bg-red-600/90 hover:bg-red-700 text-white rounded-xl shadow-md transition-all scale-0 group-hover:scale-100 active:scale-90 z-20"
                  title="Delete Course"
                >
                  <Trash2 size={12} />
                </button>
              </div>

              {/* Card Content Body */}
              <div className="p-5 space-y-3 flex-grow flex flex-col justify-between">
                <div className="space-y-2">
                  <div>
                    <h4 className="text-sm font-extrabold text-slate-800 line-clamp-2 leading-snug">{course.title}</h4>
                    <span className="text-[9px] font-bold text-slate-400 block font-mono mt-0.5">{course.slug}</span>
                  </div>
                  <p className="text-xs text-slate-400 font-semibold line-clamp-3 leading-relaxed">
                    {course.description || 'No description provided.'}
                  </p>
                </div>

                {/* Footer Details */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-50 text-[10px] font-bold text-slate-400 mt-2 gap-2">
                  <span className="px-2 py-1 bg-slate-50 text-slate-500 rounded-lg text-[9px] uppercase font-black">
                    {course.level}
                  </span>
                  <span className={`px-2 py-1 rounded-lg text-[9px] uppercase font-black ${course.type === 'Paid' ? 'bg-[#6C1D5F]/10 text-[#6C1D5F]' : 'bg-emerald-50 text-emerald-600 border border-emerald-100'}`}>
                    {course.type === 'Paid' ? (course.price || '₹999') : 'Free'}
                  </span>
                  <span className="flex items-center gap-1.5 font-mono text-[9px]">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: course.accentColor }}></span>
                    {course.category}
                  </span>
                  <span className="flex items-center gap-1 font-mono">
                    <Users size={12} className="text-slate-400" />
                    {course.enrollmentsCount}
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-slate-200/50 transition-all duration-300 divide-y divide-slate-50 animate-in fade-in duration-200">
          {sortedCourses.map((course) => (
            <div key={course.id} className="p-5 flex items-center justify-between gap-4 group">
              <div className="flex items-center gap-4 flex-grow min-w-0">
                <label className="flex items-center gap-2 shrink-0">
                  <input
                    type="checkbox"
                    checked={selectedCourseIds.includes(course.id)}
                    onChange={() => toggleCourseSelection(course.id)}
                    className="accent-[#6C1D5F]"
                  />
                </label>
                <div className="w-16 h-12 rounded-xl overflow-hidden flex-shrink-0 bg-slate-50 border border-slate-100 flex items-center justify-center">
                  {course.image ? (
                    <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[10px] font-black text-white" style={{ backgroundColor: course.accentColor }}>
                      {course.category}
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-grow">
                  <h4 className="text-xs font-black text-slate-800 truncate">{course.title}</h4>
                  <p className="text-[10px] text-slate-400 truncate font-semibold mt-0.5">{course.description || 'No description.'}</p>
                </div>
              </div>
              <div className="flex items-center gap-6 flex-shrink-0 text-xs font-bold">
                <span className="px-2 py-1 bg-slate-50 text-slate-500 rounded-lg text-[9px] uppercase font-black">
                  {course.level}
                </span>
                <span className="text-slate-400 text-[10px]">{course.category}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-black uppercase ${course.type === 'Paid' ? 'bg-[#6C1D5F]/10 text-[#6C1D5F]' : 'bg-emerald-50 text-emerald-600 border border-emerald-100'}`}>
                  {course.type === 'Paid' ? (course.price || '₹999') : 'Free'}
                </span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-black uppercase ${course.status === 'Published' ? 'text-emerald-600 bg-emerald-50' : 'text-slate-500 bg-slate-50'}`}>
                  {course.status}
                </span>
                <span className="text-slate-400 font-mono text-[10px] flex items-center gap-1 w-10">
                  <Users size={12} className="text-slate-400" />
                  {course.enrollmentsCount}
                </span>
                <button 
                  onClick={() => deleteAdminCourse(course.id)}
                  className="p-1.5 hover:bg-red-50 text-slate-300 hover:text-red-600 rounded-lg transition-all"
                  title="Delete Course"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Course Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setIsCreateModalOpen(false)}>
          <div 
            className="bg-white rounded-3xl w-full max-w-lg border border-slate-100 p-8 md:p-10 shadow-2xl flex flex-col space-y-6 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
                <div className="w-10 h-10 bg-white border border-slate-100 rounded-2xl shadow-sm flex items-center justify-center flex-shrink-0 text-[#6C1D5F]">
                  <BookOpen size={16} />
                </div>
                Create New Course
              </h3>
              <button 
                onClick={() => setIsCreateModalOpen(false)}
                className="p-2 hover:bg-slate-50 rounded-xl text-slate-400 hover:text-slate-600 transition-all active:scale-95"
              >
                <X size={16} />
              </button>
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 text-xs px-4 py-2.5 rounded-2xl border border-red-100 font-semibold flex items-center justify-between">
                <span>{error}</span>
                <button onClick={() => setError(null)} className="p-1 hover:bg-red-100 rounded-full transition-all">
                  <X size={14} />
                </button>
              </div>
            )}

            <form onSubmit={handleCreateSubmit} className="space-y-6">
              
              {/* Title */}
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest block">
                  Course Title *
                </label>
                <input 
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Master React and Redux Toolkit"
                  className="w-full bg-[#F8F9FD] border border-slate-200 hover:border-slate-300 focus:border-[#6C1D5F] hover:-translate-y-0.5 focus:-translate-y-0.5 hover:shadow-md focus:shadow-md rounded-2xl px-5 py-3.5 text-xs text-slate-800 focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#6C1D5F] transition-all duration-300 font-semibold shadow-sm placeholder-slate-400"
                  required
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest block">
                  Description
                </label>
                <textarea 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide a detailed outline of this course..."
                  className="w-full bg-[#F8F9FD] border border-slate-200 hover:border-slate-300 focus:border-[#6C1D5F] hover:-translate-y-0.5 focus:-translate-y-0.5 hover:shadow-md focus:shadow-md rounded-2xl px-5 py-4 text-xs text-slate-800 focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#6C1D5F] transition-all duration-300 font-semibold shadow-sm placeholder-slate-400 min-h-[100px] resize-none"
                />
              </div>

              {/* Level & Category Row */}
              <div className="grid grid-cols-2 gap-4">
                
                {/* Level */}
                <div className="space-y-2 relative">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest block">
                    Difficulty Level
                  </label>
                  <select
                    value={level}
                    onChange={(e) => setLevel(e.target.value as any)}
                    className="w-full appearance-none bg-[#F8F9FD] hover:bg-slate-50 border border-slate-200 hover:border-slate-300 hover:-translate-y-0.5 hover:shadow-md rounded-2xl px-5 py-3.5 text-xs font-bold text-slate-700 focus:outline-none transition-all duration-300 pr-10 cursor-pointer"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Expert">Expert</option>
                  </select>
                  <ChevronDown size={14} className="text-slate-400 absolute right-4 bottom-4 pointer-events-none" />
                </div>

                {/* Category */}
                <div className="space-y-2 relative">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest block">
                    Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full appearance-none bg-[#F8F9FD] hover:bg-slate-50 border border-slate-200 hover:border-slate-300 hover:-translate-y-0.5 hover:shadow-md rounded-2xl px-5 py-3.5 text-xs font-bold text-slate-700 focus:outline-none transition-all duration-300 pr-10 cursor-pointer"
                    required
                  >
                    <option value="" disabled>Select category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.name}>{cat.name}</option>
                    ))}
                    {categories.length === 0 && (
                      <option value="General">General</option>
                    )}
                  </select>
                  <ChevronDown size={14} className="text-slate-400 absolute right-4 bottom-4 pointer-events-none" />
                </div>

              </div>

              {/* Status & Accent Color Row */}
              <div className="grid grid-cols-2 gap-4">
                
                {/* Status */}
                <div className="space-y-2 relative">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest block">
                    Publish Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="w-full appearance-none bg-[#F8F9FD] hover:bg-slate-50 border border-slate-200 hover:border-slate-300 hover:-translate-y-0.5 hover:shadow-md rounded-2xl px-5 py-3.5 text-xs font-bold text-slate-700 focus:outline-none transition-all duration-300 pr-10 cursor-pointer"
                  >
                    <option value="Published">Published</option>
                    <option value="Draft">Draft</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                  <ChevronDown size={14} className="text-slate-400 absolute right-4 bottom-4 pointer-events-none" />
                </div>

                {/* Accent Color picker */}
                <div className="space-y-2 relative">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest block">
                    Accent Color
                  </label>
                  <select
                    value={accentColor}
                    onChange={(e) => setAccentColor(e.target.value)}
                    className="w-full appearance-none bg-[#F8F9FD] hover:bg-slate-50 border border-slate-200 hover:border-slate-300 hover:-translate-y-0.5 hover:shadow-md rounded-2xl px-5 py-3.5 text-xs font-bold text-slate-700 focus:outline-none transition-all duration-300 pr-10 cursor-pointer"
                  >
                    <option value="#6C1D5F">Deep Purple</option>
                    <option value="#01AC9F">Teal</option>
                    <option value="#FF6200">Orange</option>
                    <option value="#84117C">Bright Purple</option>
                    <option value="#5A5A5A">Grey</option>
                    <option value="#3B82F6">Blue</option>
                  </select>
                  <ChevronDown size={14} className="text-slate-400 absolute right-4 bottom-4 pointer-events-none" />
                </div>

              </div>

              {/* Course Thumbnail Image */}
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest block">
                  Course Image Thumbnail
                </label>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  accept="image/*" 
                  className="hidden" 
                />
                
                {courseImage ? (
                  <div className="relative border border-slate-200 rounded-2xl overflow-hidden h-28 group hover:-translate-y-0.5 hover:shadow-md transition-all duration-300">
                    <img src={courseImage} alt="Thumbnail Preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        type="button" 
                        onClick={triggerFileUpload}
                        className="px-3 py-1.5 bg-white text-slate-800 rounded-xl text-xs font-bold shadow-md hover:bg-slate-50 mr-2 transition-all"
                      >
                        Change
                      </button>
                      <button 
                        type="button" 
                        onClick={() => setCourseImage('')}
                        className="px-3 py-1.5 bg-red-600 text-white rounded-xl text-xs font-bold shadow-md hover:bg-red-700 transition-all"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ) : (
                  <div 
                    onClick={triggerFileUpload}
                    className="bg-slate-50 border border-dashed border-slate-200 hover:border-[#6C1D5F]/60 rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-slate-50/80 transition-all duration-300 group hover:-translate-y-0.5 hover:shadow-sm"
                  >
                    <ImageIcon size={20} className="text-slate-400 mb-1 group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] font-bold text-slate-500">Click to upload banner image</span>
                    <span className="text-[9px] text-slate-400">Max size: 2MB (Recommended ratio: 16:9)</span>
                  </div>
                )}
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center gap-3 justify-end pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs px-5 py-3 rounded-2xl transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#6C1D5F] hover:bg-[#4A1E47] text-white font-extrabold text-xs px-5 py-3 rounded-2xl shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center gap-1.5"
                >
                  <Plus size={14} />
                  Add Course
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};
