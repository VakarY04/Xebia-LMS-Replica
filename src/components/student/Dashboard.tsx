import React, { useState } from 'react';
import { Play, FileText, BookOpen, Calendar, Award, Bell, TrendingUp, Star, Clock } from 'lucide-react';
import { useUIStore } from '../../store';

export const Dashboard: React.FC = () => {
  const { 
    studentName, 
    studentAvatar,
    courses,
    setActiveCourseId,
    setCurrentStudentTab,
    updateCourseProgress
  } = useUIStore();
  const [hoveredMonth, setHoveredMonth] = useState<string | null>(null);
  const [hoveredBar, setHoveredBar] = useState<string | null>(null);

  const linePoints = [
    { label: 'Jan', x: 50, y: 174, val: 10 },
    { label: 'Feb', x: 115, y: 134, val: 35 },
    { label: 'Mar', x: 180, y: 110, val: 48 },
    { label: 'Apr', x: 245, y: 94, val: 60 },
    { label: 'May', x: 310, y: 70, val: 72 },
    { label: 'Jun', x: 375, y: 46, val: 85 },
  ];

  const barPoints = [
    { label: 'React', x: 74, y: 54, val: 80 },
    { label: 'Architecture', x: 142, y: 86, val: 60 },
    { label: 'UI/UX', x: 210, y: 37, val: 95 },
    { label: 'JavaScript', x: 278, y: 51, val: 85 },
    { label: 'CSS', x: 346, y: 46, val: 88 },
  ];

  const activePoint = linePoints.find(pt => pt.label === hoveredMonth);
  const activeBar = barPoints.find(bp => bp.label === hoveredBar);

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#6C1D5F] to-[#4A1E47] rounded-3xl p-8 text-white relative overflow-hidden flex items-center justify-between shadow-lg">
        {/* Glow backdrop */}
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="space-y-6 z-10">
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Welcome Back, {studentName}!</h1>
            <p className="text-white/80 text-sm font-medium">Continue your learning journey and track your progress.</p>
          </div>
          <div className="flex flex-wrap gap-2.5">
            <span className="bg-white/10 border border-white/20 text-white text-xs px-3 py-1.5 rounded-full font-bold">
              Enrolled Student
            </span>
            <span className="bg-white/10 border border-white/20 text-white text-xs px-3 py-1.5 rounded-full font-bold">
              Xebia Enterprise LMS
            </span>
          </div>
        </div>

        {/* Large Avatar Card */}
        <div className="hidden sm:flex w-24 h-24 rounded-2xl bg-white/10 border border-white/20 items-center justify-center text-white text-4xl font-extrabold shadow-inner mr-4 select-none overflow-hidden flex-shrink-0">
          {studentAvatar ? (
            <img src={studentAvatar} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            studentName.trim().charAt(0).toUpperCase() || 'S'
          )}
        </div>
      </div>

      {/* Sub-action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1 - Resume last course */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between hover:shadow-lg hover:-translate-y-1 hover:border-slate-200 cursor-pointer transition-all duration-300 ease-in-out">
          <div className="space-y-1">
            <div className="text-[10px] font-extrabold tracking-wider text-slate-400 uppercase">Jump Back In</div>
            <h3 className="text-xl font-bold text-slate-800">Resume Last Course</h3>
          </div>
          <button className="w-12 h-12 rounded-2xl bg-[#EAEAEA] text-slate-900 flex items-center justify-center hover:bg-slate-300 transition-all duration-200">
            <Play size={20} fill="currentColor" className="ml-0.5" />
          </button>
        </div>

        {/* Card 2 - Take Assessment */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between hover:shadow-lg hover:-translate-y-1 hover:border-slate-200 cursor-pointer transition-all duration-300 ease-in-out">
          <div className="space-y-1">
            <div className="text-[10px] font-extrabold tracking-wider text-slate-400 uppercase">Action Required</div>
            <h3 className="text-xl font-bold text-slate-800">Take Assessment</h3>
          </div>
          <button className="w-12 h-12 rounded-2xl bg-[#EAEAEA] text-slate-900 flex items-center justify-center hover:bg-slate-300 transition-all duration-200">
            <FileText size={20} />
          </button>
        </div>
      </div>

      {/* Overview Section */}
      <div>
        <h2 className="text-xl font-extrabold text-slate-800 mb-4">Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card A - Enrolled Courses */}
          <div 
            className="bg-white p-6 rounded-2xl border border-slate-100 flex items-center justify-between shadow-sm hover:border-[#6C1D5F] hover:ring-1 hover:ring-[#6C1D5F] hover:shadow-lg hover:-translate-y-1 cursor-pointer transition-all duration-300 ease-in-out"
          >
            <div className="space-y-1">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Enrolled Courses</div>
              <div className="text-3xl font-extrabold text-slate-800">0</div>
              <div className="text-[10px] text-slate-400 font-semibold">Total active</div>
            </div>
            <div className="p-3 bg-[#6C1D5F]/10 text-[#6C1D5F] rounded-2xl">
              <BookOpen size={20} />
            </div>
          </div>

          {/* Card B - Pending Assessments */}
          <div 
            className="bg-white p-6 rounded-2xl border border-slate-100 flex items-center justify-between shadow-sm hover:border-[#6C1D5F] hover:ring-1 hover:ring-[#6C1D5F] hover:shadow-lg hover:-translate-y-1 cursor-pointer transition-all duration-300 ease-in-out"
          >
            <div className="space-y-1">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Pending Assessments</div>
              <div className="text-3xl font-extrabold text-slate-800">3</div>
              <div className="text-[10px] text-slate-400 font-semibold">Action required</div>
            </div>
            <div className="p-3 bg-orange-50 text-orange-600 rounded-2xl">
              <Calendar size={20} />
            </div>
          </div>

          {/* Card C - Completed Courses */}
          <div 
            className="bg-white p-6 rounded-2xl border border-slate-100 flex items-center justify-between shadow-sm hover:border-[#6C1D5F] hover:ring-1 hover:ring-[#6C1D5F] hover:shadow-lg hover:-translate-y-1 cursor-pointer transition-all duration-300 ease-in-out"
          >
            <div className="space-y-1">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Completed Courses</div>
              <div className="text-3xl font-extrabold text-slate-800">0</div>
              <div className="text-[10px] text-slate-400 font-semibold">Finished courses</div>
            </div>
            <div className="p-3 bg-teal-50 text-teal-600 rounded-2xl">
              <Award size={20} />
            </div>
          </div>

          {/* Card D - Unread Notifications */}
          <div 
            className="bg-white p-6 rounded-2xl border border-slate-100 flex items-center justify-between shadow-sm hover:border-[#6C1D5F] hover:ring-1 hover:ring-[#6C1D5F] hover:shadow-lg hover:-translate-y-1 cursor-pointer transition-all duration-300 ease-in-out"
          >
            <div className="space-y-1">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Unread Notifications</div>
              <div className="text-3xl font-extrabold text-slate-800">2</div>
              <div className="text-[10px] text-slate-400 font-semibold">New alerts</div>
            </div>
            <div className="p-3 bg-[#6C1D5F]/10 text-[#6C1D5F] rounded-2xl">
              <Bell size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Chart A: Learning Activity */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm relative hover:shadow-md transition-all duration-300">
          <div className="flex items-center gap-3.5 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center shadow-sm">
              <TrendingUp size={22} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800 leading-tight">Learning Activity</h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Hours Spent Learning</p>
            </div>
          </div>
          
          <div className="relative h-[230px]">
            <svg 
              viewBox="0 0 400 245" 
              className="w-full h-full"
              onMouseLeave={() => setHoveredMonth(null)}
            >
              {/* Grid Lines */}
              <line x1="40" y1="30" x2="380" y2="30" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="40" y1="70" x2="380" y2="70" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="40" y1="110" x2="380" y2="110" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="40" y1="150" x2="380" y2="150" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="40" y1="190" x2="380" y2="190" stroke="#e2e8f0" strokeWidth="1" />

              {/* Y Axis Labels */}
              <text x="30" y="34" textAnchor="end" fontSize="10" className="fill-slate-400 font-semibold">100</text>
              <text x="30" y="74" textAnchor="end" fontSize="10" className="fill-slate-400 font-semibold">75</text>
              <text x="30" y="114" textAnchor="end" fontSize="10" className="fill-slate-400 font-semibold">50</text>
              <text x="30" y="154" textAnchor="end" fontSize="10" className="fill-slate-400 font-semibold">25</text>
              <text x="30" y="194" textAnchor="end" fontSize="10" className="fill-slate-400 font-semibold">0</text>

              {/* Area Gradient Fill */}
              <defs>
                <linearGradient id="purpleGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6C1D5F" stopOpacity="0.18" />
                  <stop offset="100%" stopColor="#6C1D5F" stopOpacity="0.00" />
                </linearGradient>
              </defs>
              <path 
                d="M50,174 L115,134 L180,110 L245,94 L310,70 L375,46 L375,190 L50,190 Z" 
                fill="url(#purpleGrad)" 
              />

              {/* Trend Line */}
              <path 
                d="M50,174 L115,134 L180,110 L245,94 L310,70 L375,46" 
                fill="none" 
                stroke="#6C1D5F" 
                strokeWidth="3" 
                strokeLinecap="round"
              />

              {/* Vertical Guide Line */}
              {activePoint && (
                <line 
                  x1={activePoint.x} 
                  y1={30} 
                  x2={activePoint.x} 
                  y2={190} 
                  stroke="#E2E8F0" 
                  strokeWidth="1" 
                />
              )}

              {/* Interactive Hover Areas */}
              {linePoints.map((pt) => (
                <g key={pt.label}>
                  <circle 
                    cx={pt.x} 
                    cy={pt.y} 
                    r={20} 
                    fill="transparent" 
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredMonth(pt.label)}
                  />
                </g>
              ))}

              {/* Active data point (only hovered) */}
              {linePoints.map((pt) => pt.label === hoveredMonth && (
                <circle 
                  key={`dot-${pt.label}`}
                  cx={pt.x} 
                  cy={pt.y} 
                  r={6} 
                  fill="#6C1D5F" 
                  stroke="#ffffff" 
                  strokeWidth="2.5" 
                  className="drop-shadow-md"
                />
              ))}

              {/* X Axis Labels */}
              <text x="50" y="212" textAnchor="middle" fontSize="10" className="fill-slate-400 font-semibold">Jan</text>
              <text x="115" y="212" textAnchor="middle" fontSize="10" className="fill-slate-400 font-semibold">Feb</text>
              <text x="180" y="212" textAnchor="middle" fontSize="10" className="fill-slate-400 font-semibold">Mar</text>
              <text x="245" y="212" textAnchor="middle" fontSize="10" className={`fill-slate-400 font-semibold ${hoveredMonth === 'Apr' ? 'fill-[#6C1D5F] font-bold' : ''}`}>Apr</text>
              <text x="310" y="212" textAnchor="middle" fontSize="10" className="fill-slate-400 font-semibold">May</text>
              <text x="375" y="212" textAnchor="middle" fontSize="10" className="fill-slate-400 font-semibold">Jun</text>
            </svg>

            {/* Tooltip Overlay */}
            {activePoint && (
              <div 
                className="absolute bg-white border border-slate-100 rounded-xl px-3 py-2.5 shadow-xl z-20 pointer-events-none -translate-x-1/2 flex flex-col text-left min-w-[110px] transition-all duration-150"
                style={{ 
                  left: `${(activePoint.x / 400) * 100}%`, 
                  top: `${(activePoint.y / 245) * 100 + 12}%`
                }}
              >
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{activePoint.label}</div>
                <div className="text-xs font-extrabold text-[#6C1D5F]">Progress % : {activePoint.val}</div>
              </div>
            )}
          </div>
        </div>

        {/* Chart B: Subject Performance */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm relative hover:shadow-md transition-all duration-300">
          <div className="flex items-center gap-3.5 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center shadow-sm">
              <Star size={22} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800 leading-tight">Subject Performance</h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Assessment Scores</p>
            </div>
          </div>

          <div className="relative h-[230px]">
            <svg 
              viewBox="0 0 400 245" 
              className="w-full h-full"
              onMouseLeave={() => setHoveredBar(null)}
            >
              <defs>
                <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#14B8A6" />
                  <stop offset="100%" stopColor="#14B8A6" stopOpacity="0.15" />
                </linearGradient>
                <linearGradient id="barGradHover" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0D9488" />
                  <stop offset="100%" stopColor="#0D9488" stopOpacity="0.3" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line x1="40" y1="30" x2="380" y2="30" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="40" y1="70" x2="380" y2="70" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="40" y1="110" x2="380" y2="110" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="40" y1="150" x2="380" y2="150" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="40" y1="190" x2="380" y2="190" stroke="#e2e8f0" strokeWidth="1" />

              {/* Y Axis Labels */}
              <text x="30" y="34" textAnchor="end" fontSize="10" className="fill-slate-400 font-semibold">100</text>
              <text x="30" y="74" textAnchor="end" fontSize="10" className="fill-slate-400 font-semibold">75</text>
              <text x="30" y="114" textAnchor="end" fontSize="10" className="fill-slate-400 font-semibold">50</text>
              <text x="30" y="154" textAnchor="end" fontSize="10" className="fill-slate-400 font-semibold">25</text>
              <text x="30" y="194" textAnchor="end" fontSize="10" className="fill-slate-400 font-semibold">0</text>

              {/* Background Highlight Columns */}
              {barPoints.map((bp) => (
                <g key={bp.label + '-bg'}>
                  {bp.label === hoveredBar && (
                    <rect 
                      x={bp.x - 24} 
                      y={15} 
                      width={48} 
                      height={175} 
                      fill="rgba(0,0,0,0.03)" 
                      rx={8} 
                    />
                  )}
                </g>
              ))}

              {/* Bars */}
              {barPoints.map((bp) => (
                <g key={bp.label}>
                  <path 
                    d={`M ${bp.x - 10} 190 L ${bp.x - 10} ${bp.y + 6} Q ${bp.x - 10} ${bp.y} ${bp.x - 5} ${bp.y} L ${bp.x + 5} ${bp.y} Q ${bp.x + 10} ${bp.y} ${bp.x + 10} ${bp.y + 6} L ${bp.x + 10} 190 Z`} 
                    fill={bp.label === hoveredBar ? 'url(#barGradHover)' : 'url(#barGrad)'} 
                    className="transition-all duration-200 cursor-pointer"
                    onMouseEnter={() => setHoveredBar(bp.label)}
                  />
                </g>
              ))}

              {/* X Axis Labels */}
              {barPoints.map((bp) => (
                <text 
                  key={bp.label + '-lbl'}
                  x={bp.x} 
                  y="212" 
                  textAnchor="middle" 
                  fontSize="10" 
                  className={`fill-slate-400 font-semibold transition-all duration-200 ${bp.label === hoveredBar ? 'fill-[#0D9488] font-bold' : ''}`}
                >
                  {bp.label}
                </text>
              ))}
            </svg>

            {/* Tooltip Overlay */}
            {activeBar && (
              <div 
                className="absolute bg-white border border-slate-100 rounded-xl px-3 py-2.5 shadow-xl z-20 pointer-events-none -translate-x-1/2 flex flex-col text-left min-w-[100px] transition-all duration-150"
                style={{ 
                  left: `${(activeBar.x / 400) * 100}%`, 
                  top: `${(activeBar.y / 245) * 100 + 10}%`
                }}
              >
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{activeBar.label}</div>
                <div className="text-xs font-extrabold text-[#0D9488]">Score % : {activeBar.val}</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Continue Learning Section */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-slate-800">Continue Learning</h2>
          <button 
            onClick={() => setCurrentStudentTab('courses')}
            className="text-xs font-bold text-[#6C1D5F] hover:text-[#4A1E47] transition-all cursor-pointer hover:underline"
          >
            View All
          </button>
        </div>

        {/* Horizontal course progress list */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courses.filter(course => course.progress > 0 || course.status === 'In Progress').length > 0 ? (
            courses.filter(course => course.progress > 0 || course.status === 'In Progress').map(course => {
              // Function to handle clicking on Continue Learning card to immediately play it
              const handleResume = () => {
                if (course.status === 'Not Started') {
                  updateCourseProgress(course.id, 25, 'In Progress');
                }
                setActiveCourseId(course.id);
                setCurrentStudentTab('courses');
              };

              return (
                <div 
                  key={course.id}
                  onClick={handleResume}
                  className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 hover:shadow-lg hover:-translate-y-1 hover:border-[#6C1D5F] hover:ring-1 hover:ring-[#6C1D5F] transition-all duration-300 cursor-pointer group"
                >
                  {/* Thumbnail */}
                  <div className="w-24 h-16 rounded-xl overflow-hidden bg-slate-50 flex-shrink-0 border border-slate-50 relative">
                    <img 
                      src={course.image} 
                      alt={course.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-grow min-w-0 space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-sm font-bold text-slate-800 truncate group-hover:text-[#6C1D5F] transition-colors">
                        {course.title}
                      </h3>
                      <span className="text-[10px] font-bold text-slate-400 flex-shrink-0 flex items-center gap-1">
                        <Clock size={10} />
                        {course.duration}
                      </span>
                    </div>

                    {/* Progress info */}
                    <div className="space-y-1">
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
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full bg-white p-6 rounded-2xl border border-slate-100 shadow-sm text-center text-slate-500 font-semibold text-sm">
              No courses in progress. Go to{" "}
              <button 
                onClick={() => setCurrentStudentTab('courses')}
                className="text-[#6C1D5F] font-bold hover:underline cursor-pointer"
              >
                My Courses
              </button>{" "}
              to start learning!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
