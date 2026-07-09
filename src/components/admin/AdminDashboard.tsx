import React from 'react';
import {
  BookOpen,
  Tag,
  CheckCircle,
  Clock,
  ArrowRight,
  Plus,
  GraduationCap
} from 'lucide-react';
import { useUIStore } from '../../store';

export const AdminDashboard: React.FC = () => {
  const { setCurrentAdminTab, categories, adminCourses } = useUIStore();

  const totalCourses = adminCourses.length;
  const totalCategories = categories.length;
  const publishedCourses = adminCourses.filter((course) => course.status === 'Published').length;
  const draftCourses = adminCourses.filter((course) => course.status === 'Draft' || course.status === 'Inactive').length;

  const recentCourses = [...adminCourses].reverse().slice(0, 5);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#4A1E47] via-[#6C1D5F] to-[#01AC9F] text-white p-8 md:p-12 shadow-xl border border-white/10">
        <div className="relative z-10 max-w-3xl space-y-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Xebia LMS
          </h1>
          <p className="text-sm sm:text-base text-slate-100 font-medium leading-relaxed max-w-2xl">
            Welcome back to the Admin Dashboard. Monitor platform metrics, manage courses and learning paths, and coordinate enterprise curriculum.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={() => setCurrentAdminTab('courses')}
              className="bg-white text-[#4A1E47] hover:bg-slate-50 px-6 py-3 rounded-2xl font-extrabold text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2 active:scale-95"
            >
              <BookOpen size={16} />
              Manage Courses
            </button>
            <button
              onClick={() => setCurrentAdminTab('categories')}
              className="bg-white/10 border border-white/20 hover:bg-white/20 text-white px-6 py-3 rounded-2xl font-extrabold text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2 active:scale-95"
            >
              <Tag size={16} />
              Browse Categories
            </button>
          </div>
        </div>
        <div className="absolute -top-16 -right-16 w-72 h-72 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-16 -left-16 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
              Total Courses
            </span>
            <span className="text-3xl font-black text-slate-800">{totalCourses}</span>
            <span className="text-xs text-slate-400 font-bold block pt-1">
              {publishedCourses} Published, {draftCourses} Draft
            </span>
          </div>
          <div className="p-4 bg-[#6C1D5F]/5 text-[#6C1D5F] rounded-2xl">
            <BookOpen size={24} />
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
              Categories
            </span>
            <span className="text-3xl font-black text-slate-800">{totalCategories}</span>
            <span className="text-xs text-slate-400 font-bold block pt-1">
              {categories.filter((category) => category.status === 'Active').length} Active categories
            </span>
          </div>
          <div className="p-4 bg-[#01AC9F]/5 text-[#01AC9F] rounded-2xl">
            <Tag size={24} />
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
              Published
            </span>
            <span className="text-3xl font-black text-slate-800">{publishedCourses}</span>
            <span className="text-xs text-slate-400 font-bold block pt-1">
              Live & available to learners
            </span>
          </div>
          <div className="p-4 bg-emerald-50 text-emerald-500 rounded-2xl">
            <CheckCircle size={24} />
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
              Draft Courses
            </span>
            <span className="text-3xl font-black text-slate-800">{draftCourses}</span>
            <span className="text-xs text-slate-400 font-bold block pt-1">
              Draft / In-progress courses
            </span>
          </div>
          <div className="p-4 bg-orange-50 text-orange-500 rounded-2xl">
            <Clock size={24} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-white rounded-3xl border border-slate-100 p-6 md:p-8 lg:col-span-2 shadow-sm flex flex-col justify-between min-h-[360px]">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-bold text-slate-800">
                Recently Created Courses
              </h3>
              <button
                onClick={() => setCurrentAdminTab('courses')}
                className="text-xs font-bold text-[#01AC9F] hover:text-[#008f84] transition-colors flex items-center gap-1"
              >
                View all <ArrowRight size={14} />
              </button>
            </div>
            <p className="text-xs font-semibold text-slate-400 mb-6">
              Latest curriculums and learning materials added
            </p>
          </div>

          <div className="flex-grow flex flex-col justify-center py-6">
            {recentCourses.length > 0 ? (
              <div className="divide-y divide-slate-100 max-h-[220px] overflow-y-auto pr-1">
                {recentCourses.map((course) => (
                  <div key={course.id} className="py-2.5 flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-800 font-bold truncate max-w-[280px]">{course.title}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[9px] uppercase font-black ${
                      course.status === 'Published' || course.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-500'
                    }`}>{course.status}</span>
                  </div>
                ))}
              </div>
            ) : (
              <span className="text-sm font-bold text-slate-400 text-center px-4">
                No courses available. Create one to get started!
              </span>
            )}
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-100 p-6 md:p-8 shadow-sm flex flex-col space-y-6">
          <div>
            <h3 className="text-lg font-bold text-slate-800">
              Quick Creator Actions
            </h3>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => setCurrentAdminTab('create-category')}
              className="w-full text-left bg-[#01AC9F]/5 hover:bg-[#01AC9F]/10 border border-[#01AC9F]/10 hover:border-[#01AC9F]/30 hover:-translate-y-0.5 active:scale-[0.98] rounded-2xl p-4 flex items-center gap-4 transition-all duration-200 shadow-sm"
            >
              <div className="p-3.5 bg-[#01AC9F] text-white rounded-xl shadow-sm flex-shrink-0">
                <Tag size={18} />
              </div>
              <div>
                <span className="font-extrabold text-[#01AC9F] text-sm block">
                  New Category
                </span>
                <span className="text-xs font-bold text-slate-400">
                  Create course categories
                </span>
              </div>
            </button>

            <button
              onClick={() => setCurrentAdminTab('courses')}
              className="w-full text-left bg-[#6C1D5F]/5 hover:bg-[#6C1D5F]/10 border border-[#6C1D5F]/10 hover:border-[#6C1D5F]/30 hover:-translate-y-0.5 active:scale-[0.98] rounded-2xl p-4 flex items-center gap-4 transition-all duration-200 shadow-sm"
            >
              <div className="p-3.5 bg-[#6C1D5F] text-white rounded-xl shadow-sm flex-shrink-0">
                <Plus size={18} />
              </div>
              <div>
                <span className="font-extrabold text-[#6C1D5F] text-sm block">
                  New Course
                </span>
                <span className="text-xs font-bold text-slate-400">
                  Open the course library
                </span>
              </div>
            </button>

            <button
              onClick={() => setCurrentAdminTab('curriculum')}
              className="w-full text-left bg-[#FF6200]/5 hover:bg-[#FF6200]/10 border border-[#FF6200]/10 hover:border-[#FF6200]/30 hover:-translate-y-0.5 active:scale-[0.98] rounded-2xl p-4 flex items-center gap-4 transition-all duration-200 shadow-sm"
            >
              <div className="p-3.5 bg-[#FF6200] text-white rounded-xl shadow-sm flex-shrink-0">
                <GraduationCap size={18} />
              </div>
              <div>
                <span className="font-extrabold text-slate-800 text-sm block">
                  Organiser
                </span>
                <span className="text-xs font-bold text-slate-400">
                  Open curriculum management
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
