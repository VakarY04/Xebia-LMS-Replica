import React, { useState } from 'react';
import { 
  FileText, 
  Search, 
  Calendar, 
  Clock, 
  PlayCircle, 
  CheckCircle, 
  Award 
} from 'lucide-react';
import { useUIStore } from '../../store';
import { QuizPlayer } from './QuizPlayer';

export const Assessments: React.FC = () => {
  const { setCurrentStudentTab } = useUIStore();
  const [activeTab, setActiveTab] = useState<'all' | 'action' | 'upcoming' | 'completed'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeQuizId, setActiveQuizId] = useState<string | null>(null);

  const assessmentsData = [
    {
      id: 'react-final',
      subject: 'ADVANCED REACT & NEXT.JS',
      title: 'React Final Exam',
      status: 'upcoming',
      time: '10:00 AM',
      scheduledDate: '2026-06-25',
      buttonText: 'Starts on 2026-06-25',
      type: 'Upcoming'
    },
    {
      id: 'arch-quiz',
      subject: 'ENTERPRISE ARCHITECTURE PATTERNS',
      title: 'Architecture Quiz 1',
      status: 'action',
      time: '02:00 PM',
      scheduledDate: '2026-06-24',
      buttonText: 'Start Assessment',
      type: 'Action Required'
    },
    {
      id: 'uiux-assign',
      subject: 'UI/UX DESIGN FOR DEVELOPERS',
      title: 'Design Systems Assignment',
      status: 'completed',
      time: '11:59 PM',
      scheduledDate: '2026-06-20',
      buttonText: 'View Results',
      type: 'Completed'
    }
  ];

  const filteredAssessments = assessmentsData.filter((item) => {
    // Tab filter
    if (activeTab !== 'all' && item.status !== activeTab) return false;
    // Search query filter
    if (searchQuery) {
      return item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
             item.subject.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return true;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'upcoming':
        return (
          <span className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#6C1D5F] text-white font-bold text-[10px] uppercase select-none">
            <Calendar size={11} />
            Upcoming
          </span>
        );
      case 'action':
        return (
          <span className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#FF5C00] text-white font-bold text-[10px] uppercase select-none">
            <Clock size={11} />
            Action Required
          </span>
        );
      case 'completed':
        return (
          <span className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#01AC9F] text-white font-bold text-[10px] uppercase select-none">
            <CheckCircle size={11} />
            Completed
          </span>
        );
      default:
        return null;
    }
  };

  const getActionButton = (item: any) => {
    switch (item.status) {
      case 'upcoming':
        return (
          <button disabled className="bg-slate-100 text-slate-400 font-bold text-xs py-3 rounded-xl w-full flex items-center justify-center gap-1.5 cursor-not-allowed">
            <Clock size={14} />
            {item.buttonText}
          </button>
        );
      case 'action':
        return (
          <button 
            onClick={() => setActiveQuizId(item.id)}
            className="bg-[#6C1D5F] hover:bg-[#4A1E47] text-white font-bold text-xs py-3 rounded-xl w-full flex items-center justify-center gap-1.5 transition-colors shadow-md hover:shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98] duration-200"
          >
            <PlayCircle size={14} />
            {item.buttonText}
          </button>
        );
      case 'completed':
        return (
          <button 
            onClick={() => setCurrentStudentTab('results')}
            className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs py-3 rounded-xl w-full flex items-center justify-center gap-1.5 transition-colors"
          >
            <Award size={14} />
            {item.buttonText}
          </button>
        );
      default:
        return null;
    }
  };

  if (activeQuizId) {
    return <QuizPlayer onBack={() => setActiveQuizId(null)} />;
  }

  return (
    <div className="p-8 space-y-8 overflow-y-auto h-full bg-slate-50/50">
      {/* Page Header with Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center shadow-sm">
            <FileText size={22} />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Assessments</h1>
            <p className="text-slate-500 text-sm font-semibold">
              1 action required &bull; 1 upcoming
            </p>
          </div>
        </div>

        {/* Search input */}
        <div className="flex items-center bg-white border border-slate-300 rounded-xl px-4 py-2 w-full md:w-80 relative transition-all duration-200 focus-within:border-[#6C1D5F] focus-within:ring-1 focus-within:ring-[#6C1D5F] shadow-sm">
          <Search size={16} className="text-slate-500 mr-2" />
          <input 
            type="text" 
            placeholder="Search assessments..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent border-none text-xs w-full focus:outline-none text-slate-800 placeholder-slate-500"
          />
        </div>
      </div>

      {/* Tabs Filter Section */}
      <div className="flex flex-wrap gap-3">
        {(['all', 'action', 'upcoming', 'completed'] as const).map((tab) => {
          const isActive = activeTab === tab;
          const labelMap = {
            all: 'All (3)',
            action: 'Action Required (1)',
            upcoming: 'Upcoming (1)',
            completed: 'Completed (1)',
          };
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                isActive
                  ? 'bg-white border border-[#6C1D5F]/20 text-[#6C1D5F] shadow-md'
                  : 'text-slate-500 hover:text-[#6C1D5F]'
              }`}
            >
              {labelMap[tab]}
            </button>
          );
        })}
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredAssessments.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-3xl border border-slate-100 shadow-sm hover:border-[#6C1D5F] hover:ring-1 hover:ring-[#6C1D5F] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-in-out flex flex-col overflow-hidden cursor-pointer"
          >
            {/* Top Header Card Half */}
            <div className="h-28 bg-gradient-to-b from-slate-600/90 to-slate-800/90 p-5 relative flex items-start justify-between">
              {getStatusBadge(item.status)}
              <span className="flex items-center gap-1 px-2.5 py-1.5 rounded bg-black/40 text-white text-[9px] font-bold uppercase select-none tracking-wider">
                Time {item.time}
              </span>
            </div>

            {/* Bottom Card Content Half */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-5">
              <div className="space-y-1.5">
                <span className="text-[#6C1D5F] font-bold text-[10px] tracking-wider uppercase block">
                  {item.subject}
                </span>
                <h3 className="text-lg font-bold text-slate-900 leading-tight">
                  {item.title}
                </h3>
              </div>

              <div className="space-y-4">
                {/* Date specification box */}
                <div className="bg-slate-50 border border-slate-100/50 rounded-xl px-4 py-2.5 flex items-center gap-2.5 text-xs text-slate-600">
                  <Calendar size={14} className="text-slate-400" />
                  <span>Scheduled for <strong className="text-slate-800 font-bold">{item.scheduledDate}</strong></span>
                </div>

                {getActionButton(item)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
