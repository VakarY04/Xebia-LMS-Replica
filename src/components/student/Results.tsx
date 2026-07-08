import React, { useState } from 'react';
import { 
  Award, 
  BookOpen, 
  TrendingUp, 
  Star, 
  Calendar, 
  FileText 
} from 'lucide-react';
import { useUIStore } from '../../store';

export const Results: React.FC = () => {
  const { quizResults } = useUIStore();
  // Chart A: Month hovered state
  const [hoveredMonth, setHoveredMonth] = useState<string | null>(null);
  // Chart B: Bar hovered state
  const [hoveredBar, setHoveredBar] = useState<string | null>(null);
  // Course Progress hovered row state
  const [hoveredProgressIdx, setHoveredProgressIdx] = useState<number | null>(null);

  const progressCourses = [
    { title: 'Advanced React & Next.js', progress: 75 },
    { title: 'Enterprise Architecture Patterns', progress: 30 },
    { title: 'UI/UX Design for Developers', progress: 100 }
  ];

  // Chart data
  const linePoints = [
    { label: 'Jan', x: 50, y: 174, val: 10 },
    { label: 'Feb', x: 115, y: 134, val: 35 },
    { label: 'Mar', x: 180, y: 110, val: 50 },
    { label: 'Apr', x: 245, y: 94, val: 60 },
    { label: 'May', x: 310, y: 70, val: 75 },
    { label: 'Jun', x: 375, y: 46, val: 90 },
  ];
  const activePoint = linePoints.find(pt => pt.label === hoveredMonth);

  const barPoints = [
    { label: 'React', x: 74, y: 54, val: 85 },
    { label: 'Architecture', x: 142, y: 86, val: 65 },
    { label: 'UI/UX', x: 210, y: 38, val: 95 },
    { label: 'JavaScript', x: 278, y: 49, val: 88 },
    { label: 'CSS', x: 346, y: 43, val: 92 },
  ];
  const activeBar = barPoints.find(bp => bp.label === hoveredBar);

  return (
    <div className="p-8 space-y-8 overflow-y-auto h-full bg-slate-50/50">
      {/* Page Header */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center shadow-sm">
          <Award size={22} />
        </div>
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Results & Performance</h1>
          <p className="text-slate-500 text-sm">
            Track your learning progress and assessment scores
          </p>
        </div>
      </div>

      {/* Row of 3 Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Card 1: Course Progress */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm relative hover:border-[#6C1D5F] hover:ring-1 hover:ring-[#6C1D5F] hover:shadow-md transition-all duration-300">
          <div className="flex items-center gap-3.5 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-[#6C1D5F] flex items-center justify-center shadow-sm">
              <BookOpen size={22} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800 leading-tight">Course Progress</h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Enrollment Status</p>
            </div>
          </div>

          <div className="relative h-[230px]">
            <svg 
              viewBox="0 0 400 220" 
              className="w-full h-full"
              onMouseLeave={() => setHoveredProgressIdx(null)}
            >
              {/* Vertical Guide/Axis line */}
              <line x1="120" y1="20" x2="120" y2="200" stroke="#cbd5e1" strokeWidth="1.5" />

              {/* Background Highlight Columns */}
              {hoveredProgressIdx === 0 && (
                <rect x="120" y="20" width="260" height="60" rx="8" fill="rgba(0,0,0,0.06)" />
              )}
              {hoveredProgressIdx === 1 && (
                <rect x="120" y="80" width="260" height="60" rx="8" fill="rgba(0,0,0,0.06)" />
              )}
              {hoveredProgressIdx === 2 && (
                <rect x="120" y="140" width="260" height="60" rx="8" fill="rgba(0,0,0,0.06)" />
              )}

              {/* Labels for courses */}
              <text x="105" y="44" textAnchor="end" fontSize="10" className="fill-slate-400 font-bold">Advanced React</text>
              <text x="105" y="54" textAnchor="end" fontSize="10" className="fill-slate-400 font-bold">& Next.js</text>

              <text x="105" y="104" textAnchor="end" fontSize="10" className="fill-slate-400 font-bold">Enterprise</text>
              <text x="105" y="114" textAnchor="end" fontSize="10" className="fill-slate-400 font-bold">Architecture</text>
              <text x="105" y="124" textAnchor="end" fontSize="10" className="fill-slate-400 font-bold">Patterns</text>

              <text x="105" y="174" textAnchor="end" fontSize="10" className="fill-slate-400 font-bold">UI/UX Design for</text>
              <text x="105" y="184" textAnchor="end" fontSize="10" className="fill-slate-400 font-bold">Developers</text>

              {/* Progress Bars (big size: height 24) */}
              {/* Advanced React & Next.js: 75% */}
              <rect x="120" y="38" width="195" height="24" rx="6" fill="#6C1D5F" className="transition-all duration-200 cursor-pointer" />
              {/* Enterprise Architecture Patterns: 30% */}
              <rect x="120" y="98" width="78" height="24" rx="6" fill="#6C1D5F" className="transition-all duration-200 cursor-pointer" />
              {/* UI/UX Design for Developers: 100% */}
              <rect x="120" y="158" width="260" height="24" rx="6" fill="#6C1D5F" className="transition-all duration-200 cursor-pointer" />

              {/* Interactive Hover Areas */}
              <rect x="10" y="20" width="370" height="60" fill="transparent" className="cursor-pointer" onMouseEnter={() => setHoveredProgressIdx(0)} />
              <rect x="10" y="80" width="370" height="60" fill="transparent" className="cursor-pointer" onMouseEnter={() => setHoveredProgressIdx(1)} />
              <rect x="10" y="140" width="370" height="60" fill="transparent" className="cursor-pointer" onMouseEnter={() => setHoveredProgressIdx(2)} />
            </svg>

            {/* Tooltip Overlay */}
            {hoveredProgressIdx !== null && (
              <div 
                className="absolute bg-white border border-slate-100 rounded-xl px-3 py-2.5 shadow-xl z-20 pointer-events-none -translate-x-1/2 flex flex-col text-left min-w-[170px] transition-all duration-150"
                style={{ 
                  left: '58%', 
                  top: hoveredProgressIdx === 0 ? '34%' : hoveredProgressIdx === 1 ? '55%' : '48%'
                }}
              >
                <div className="text-xs font-bold text-slate-800 leading-tight">
                  {progressCourses[hoveredProgressIdx].title}
                </div>
                <div className="text-[11px] font-extrabold text-[#6C1D5F] mt-1">
                  Progress : {progressCourses[hoveredProgressIdx].progress}%
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Card 2: Subject Performance */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm relative hover:border-[#6C1D5F] hover:ring-1 hover:ring-[#6C1D5F] hover:shadow-md transition-all duration-300">
          <div className="flex items-center gap-3.5 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center shadow-sm">
              <Star size={22} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800 leading-tight">Subject Performance</h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Average Scores</p>
            </div>
          </div>

          <div className="relative h-[230px]">
            <svg 
              viewBox="0 0 400 245" 
              className="w-full h-full"
              onMouseLeave={() => setHoveredBar(null)}
            >
              <defs>
                <linearGradient id="barGradResults" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#14B8A6" />
                  <stop offset="100%" stopColor="#14B8A6" stopOpacity="0.15" />
                </linearGradient>
                <linearGradient id="barGradHoverResults" x1="0" y1="0" x2="0" y2="1">
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
                    fill={bp.label === hoveredBar ? 'url(#barGradHoverResults)' : 'url(#barGradResults)'} 
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

        {/* Card 3: Learning Activity */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm relative hover:border-[#6C1D5F] hover:ring-1 hover:ring-[#6C1D5F] hover:shadow-md transition-all duration-300">
          <div className="flex items-center gap-3.5 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center shadow-sm">
              <TrendingUp size={22} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800 leading-tight">Learning Activity</h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Time Spent Learning</p>
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
                <linearGradient id="purpleGradResults" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6C1D5F" stopOpacity="0.18" />
                  <stop offset="100%" stopColor="#6C1D5F" stopOpacity="0.00" />
                </linearGradient>
              </defs>
              <path 
                d="M50,174 L115,134 L180,110 L245,94 L310,70 L375,46 L375,190 L50,190 Z" 
                fill="url(#purpleGradResults)" 
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

      </div>

      {/* Recent Results Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-extrabold text-slate-800">Recent Results</h2>
        
        {/* Table Container Header labels */}
        <div className="grid grid-cols-12 px-6 py-2 text-[10px] font-extrabold tracking-wider text-slate-400 uppercase">
          <div className="col-span-4">Assessment</div>
          <div className="col-span-3">Course</div>
          <div className="col-span-2">Date</div>
          <div className="col-span-2">Score</div>
          <div className="col-span-1 text-center">Grade</div>
        </div>

        {/* Stack of Rows */}
        <div className="space-y-3.5">
          {quizResults.map((result) => (
            <div 
              key={result.id}
              className="grid grid-cols-12 items-center p-4 bg-white rounded-2xl border border-slate-100 shadow-sm hover:border-[#6C1D5F] hover:ring-1 hover:ring-[#6C1D5F] hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 ease-in-out cursor-pointer"
            >
              <div className="col-span-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center border border-slate-100">
                  <FileText size={18} />
                </div>
                <span className="font-bold text-slate-800 text-sm">{result.title}</span>
              </div>

              <div className="col-span-3 text-slate-500 text-xs font-semibold uppercase">
                {result.subject}
              </div>

              <div className="col-span-2 flex items-center gap-2 text-slate-500 text-xs font-semibold">
                <Calendar size={14} className="text-slate-400" />
                <span>{result.date}</span>
              </div>

              <div className="col-span-2 flex flex-col">
                <span className="font-extrabold text-slate-800 text-sm">
                  {result.score} <span className="text-slate-400 font-bold text-xs">/ {result.maxScore}</span>
                </span>
                <span className="text-[10px] text-slate-400 font-semibold mt-0.5">
                  {Math.round((result.score / result.maxScore) * 100)}%
                </span>
              </div>

              <div className="col-span-1 flex justify-center">
                <span className={`border rounded-lg px-2.5 py-1 text-xs font-bold font-sans ${
                  result.grade.startsWith('A') 
                    ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                    : 'bg-purple-50 text-purple-600 border-purple-100'
                }`}>
                  {result.grade}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
