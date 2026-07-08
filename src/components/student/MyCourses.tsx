import React, { useState } from 'react';
import { 
  BookOpen, 
  PlayCircle, 
  Award, 
  Search, 
  Grid, 
  List, 
  Clock, 
  Star,
  ChevronDown 
} from 'lucide-react';
import { CoursePlayer } from './CoursePlayer';
import { useUIStore } from '../../store';

export const MyCourses: React.FC = () => {
  // Read courses and actions from store
  const {
    courses,
    activeCourseId,
    setActiveCourseId,
    updateCourseProgress,
    toggleFavoriteCourse
  } = useUIStore();

  // Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Java' | 'Python'>('All');
  const [selectedLevel, setSelectedLevel] = useState<'All' | 'Beginner' | 'Intermediate' | 'Advanced'>('All');
  const [selectedStatus, setSelectedStatus] = useState<'All' | 'Not Started' | 'In Progress' | 'Completed'>('All');
  
  // Layout state
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Toggle favorite status
  const handleToggleFavorite = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavoriteCourse(id);
  };

  // Launch course player and advance status
  const handleStartCourse = (id: number) => {
    const course = courses.find(c => c.id === id);
    if (course && course.status === 'Not Started') {
      updateCourseProgress(id, 25, 'In Progress');
    }
    setActiveCourseId(id);
  };

  // Statistics calculation
  const totalEnrollments = courses.length;
  const ongoingCourses = courses.filter(c => c.status === 'In Progress').length;
  const finishedCourses = courses.filter(c => c.status === 'Completed').length;

  // Active course title
  const activeCourse = courses.find(c => c.id === activeCourseId);

  if (activeCourseId !== null && activeCourse) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setActiveCourseId(null)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-100 hover:bg-slate-50 text-xs font-bold text-slate-600 rounded-xl shadow-sm transition-all"
          >
            ← Back to Courses
          </button>
          <div className="h-4 w-[1px] bg-slate-200"></div>
          <span className="text-xs font-semibold text-slate-500 truncate max-w-md">
            Currently Playing: {activeCourse.title}
          </span>
        </div>
        
        <CoursePlayer />
      </div>
    );
  }

  // Filtered courses
  const filteredCourses = courses.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || c.category === selectedCategory;
    const matchesLevel = selectedLevel === 'All' || c.level === selectedLevel;
    const matchesStatus = selectedStatus === 'All' || c.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesLevel && matchesStatus;
  });

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="space-y-1">
        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">My Courses</h1>
        <p className="text-slate-500 text-sm font-medium">Access your enrolled courses and track your progress</p>
      </div>

      {/* Row of 3 Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Enrolled Courses */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between transition-all duration-300 hover:shadow-lg hover:border-[#6C1D5F] hover:ring-1 hover:ring-[#6C1D5F]">
          <div className="space-y-1">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Enrolled Courses</div>
            <div className="text-3xl font-extrabold text-slate-800 mt-2">{totalEnrollments}</div>
            <div className="text-[10px] text-slate-400 font-bold">Total enrollments</div>
          </div>
          <div className="p-3 bg-purple-50 text-[#6C1D5F] rounded-2xl shadow-sm">
            <BookOpen size={20} />
          </div>
        </div>

        {/* Card 2: In Progress */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between transition-all duration-300 hover:shadow-lg hover:border-[#FF6200] hover:ring-1 hover:ring-[#FF6200]">
          <div className="space-y-1">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">In Progress</div>
            <div className="text-3xl font-extrabold text-slate-800 mt-2">{ongoingCourses}</div>
            <div className="text-[10px] text-slate-400 font-bold">Ongoing courses</div>
          </div>
          <div className="p-3 bg-orange-50 text-orange-600 rounded-2xl shadow-sm">
            <PlayCircle size={20} />
          </div>
        </div>

        {/* Card 3: Completed Courses */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between transition-all duration-300 hover:shadow-lg hover:border-[#01AC9F] hover:ring-1 hover:ring-[#01AC9F]">
          <div className="space-y-1">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Completed Courses</div>
            <div className="text-3xl font-extrabold text-slate-800 mt-2">{finishedCourses}</div>
            <div className="text-[10px] text-slate-400 font-bold">Finished courses</div>
          </div>
          <div className="p-3 bg-teal-50 text-teal-600 rounded-2xl shadow-sm">
            <Award size={20} />
          </div>
        </div>
      </div>

      {/* Toolbar / Filters Area */}
      <div className="flex flex-col gap-4 bg-white md:bg-transparent p-5 md:p-0 rounded-3xl border border-slate-100 md:border-none shadow-sm md:shadow-none">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          {/* Left Controls: Search, Course dropdown, Grid/List view toggle */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="flex items-center bg-[#F8F9FD] border border-slate-100 rounded-xl px-4 py-2 w-full md:w-72 shadow-inner focus-within:bg-white focus-within:border-[#6C1D5F]/50 transition-all">
              <Search size={16} className="text-slate-400 mr-2 flex-shrink-0" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search courses by title..." 
                className="bg-transparent border-none text-xs w-full focus:outline-none text-slate-800 placeholder-slate-400 font-semibold"
              />
            </div>

            {/* Course Category filter */}
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as any)}
                className="appearance-none bg-[#F8F9FD] border border-slate-100 hover:border-slate-200 rounded-xl pl-4 pr-10 py-2.5 text-xs font-bold text-slate-600 cursor-pointer shadow-sm focus:outline-none focus:border-[#6C1D5F]/50 transition-all min-w-[110px]"
              >
                <option value="All">Course</option>
                <option value="Java">Java</option>
                <option value="Python">Python</option>
              </select>
              <ChevronDown size={14} className="text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Grid / List switcher */}
            <div className="flex items-center bg-[#F8F9FD] border border-slate-100 rounded-xl p-1 shadow-sm">
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white text-[#6C1D5F] shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                title="Grid View"
              >
                <Grid size={16} />
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white text-[#6C1D5F] shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                title="List View"
              >
                <List size={16} />
              </button>
            </div>
          </div>

          {/* Right Controls: Level, Status */}
          <div className="flex items-center gap-3">
            {/* Level Filter */}
            <div className="relative">
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value as any)}
                className="appearance-none bg-[#F8F9FD] border border-slate-100 hover:border-slate-200 rounded-xl pl-4 pr-10 py-2.5 text-xs font-bold text-slate-600 cursor-pointer shadow-sm focus:outline-none focus:border-[#6C1D5F]/50 transition-all min-w-[110px]"
              >
                <option value="All">Level</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
              <ChevronDown size={14} className="text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Status Filter */}
            <div className="relative">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value as any)}
                className="appearance-none bg-[#F8F9FD] border border-slate-100 hover:border-slate-200 rounded-xl pl-4 pr-10 py-2.5 text-xs font-bold text-slate-600 cursor-pointer shadow-sm focus:outline-none focus:border-[#6C1D5F]/50 transition-all min-w-[110px]"
              >
                <option value="All">Status</option>
                <option value="Not Started">Not Started</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
              <ChevronDown size={14} className="text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Courses List / Grid Rendering */}
      {filteredCourses.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 shadow-sm">
          <p className="text-slate-400 text-sm font-bold">No courses found matching the selected filters.</p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {filteredCourses.map(course => (
            <div 
              key={course.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2.5 hover:border-[#4A1E47] hover:ring-2 hover:ring-[#4A1E47] transition-all duration-300 flex flex-col group max-w-sm w-full mx-auto"
            >
              {/* Cover image container */}
              <div className="relative aspect-[3/2] w-full overflow-hidden bg-slate-50 border-b border-slate-50 flex-shrink-0">
                <button 
                  onClick={(e) => handleToggleFavorite(course.id, e)}
                  className="absolute top-4 right-4 p-2 bg-white/95 backdrop-blur-sm rounded-full text-slate-400 hover:text-yellow-500 hover:scale-110 shadow-sm transition-all duration-200 z-10"
                  title={course.isFavorite ? "Remove Favorite" : "Add Favorite"}
                >
                  <Star 
                    size={16} 
                    className={course.isFavorite ? "text-yellow-500 fill-yellow-500" : ""} 
                  />
                </button>
                <img 
                  src={course.image} 
                  alt={course.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110" 
                />
              </div>

              {/* Card Body */}
              <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  {/* Badges */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="bg-[#01AC9F]/10 text-[#01AC9F] border border-[#01AC9F]/15 px-3 py-1 rounded-xl text-[10px] font-bold tracking-wide font-sans">
                      {course.level}
                    </span>
                    <span className={`px-3 py-1 rounded-xl text-[10px] font-bold tracking-wide font-sans text-white ${
                      course.status === 'Completed' ? 'bg-emerald-500' :
                      course.status === 'In Progress' ? 'bg-orange-500' : 'bg-slate-500'
                    }`}>
                      {course.status}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-[17px] font-extrabold text-slate-800 leading-snug line-clamp-2 min-h-[48px] hover:text-[#6C1D5F] transition-colors">
                    {course.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-400 text-xs line-clamp-2 font-semibold leading-relaxed">
                    {course.description}
                  </p>
                </div>

                <div className="space-y-4 pt-3 border-t border-slate-50">
                  {/* Progress track */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-[11px] font-bold text-slate-400">
                      <span>Progress</span>
                      <span className="text-slate-700">{course.progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-[#6C1D5F] rounded-full transition-all duration-500" 
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Duration and Launch Button */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 font-bold">
                      <Clock size={14} className="text-slate-400" />
                      <span>{course.duration}</span>
                    </div>

                    <button 
                      onClick={() => handleStartCourse(course.id)}
                      className="w-full bg-[#6C1D5F] hover:bg-[#4A1E47] text-white py-3 rounded-2xl text-sm font-bold shadow-md hover:shadow-lg transition-all active:scale-95"
                    >
                      {course.status === 'Not Started' ? 'Start Course' : 'Resume Course'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {filteredCourses.map(course => (
            <div 
              key={course.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 hover:border-[#4A1E47] hover:ring-2 hover:ring-[#4A1E47] transition-all duration-300 p-5 flex flex-col md:flex-row gap-6 group"
            >
              {/* Cover thumbnail */}
              <div className="relative w-full md:w-56 aspect-[3/2] overflow-hidden bg-slate-50 border border-slate-50 rounded-2xl flex-shrink-0">
                <button 
                  onClick={(e) => handleToggleFavorite(course.id, e)}
                  className="absolute top-3 right-3 p-1.5 bg-white/95 backdrop-blur-sm rounded-full text-slate-400 hover:text-yellow-500 hover:scale-110 shadow-sm transition-all duration-200 z-10"
                  title={course.isFavorite ? "Remove Favorite" : "Add Favorite"}
                >
                  <Star 
                    size={14} 
                    className={course.isFavorite ? "text-yellow-500 fill-yellow-500" : ""} 
                  />
                </button>
                <img 
                  src={course.image} 
                  alt={course.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110" 
                />
              </div>

              {/* List Card Content */}
              <div className="flex-grow flex flex-col justify-between space-y-4 md:space-y-0">
                <div className="space-y-2">
                  {/* Badges */}
                  <div className="flex items-center gap-2">
                    <span className="bg-[#01AC9F]/10 text-[#01AC9F] border border-[#01AC9F]/15 px-2.5 py-0.5 rounded-lg text-[9px] font-bold tracking-wide font-sans">
                      {course.level}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-lg text-[9px] font-bold tracking-wide font-sans text-white ${
                      course.status === 'Completed' ? 'bg-emerald-500' :
                      course.status === 'In Progress' ? 'bg-orange-500' : 'bg-slate-500'
                    }`}>
                      {course.status}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-extrabold text-slate-800 leading-snug hover:text-[#6C1D5F] transition-colors">
                    {course.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-400 text-xs font-semibold leading-relaxed line-clamp-1 md:line-clamp-2">
                    {course.description}
                  </p>
                </div>

                {/* Progress bar + launch */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-3 border-t border-slate-50">
                  <div className="flex-grow max-w-md space-y-1">
                    <div className="flex justify-between items-center text-[10px] font-bold text-slate-400">
                      <span>Progress</span>
                      <span className="text-slate-700">{course.progress}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-[#6C1D5F] rounded-full transition-all duration-500" 
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 flex-shrink-0">
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 font-bold">
                      <Clock size={14} className="text-slate-400" />
                      <span>{course.duration}</span>
                    </div>

                    <button 
                      onClick={() => handleStartCourse(course.id)}
                      className="px-6 py-2.5 bg-[#6C1D5F] hover:bg-[#4A1E47] text-white rounded-xl text-xs font-bold shadow transition-all active:scale-95 min-w-[120px]"
                    >
                      {course.status === 'Not Started' ? 'Start Course' : 'Resume Course'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
