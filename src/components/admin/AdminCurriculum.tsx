import React, { useState } from 'react';
import { ArrowRight, BookOpen, ChevronDown, LayoutGrid, Layers, Search } from 'lucide-react';
import { useUIStore } from '../../store';

const getCourseStatusTone = (status: string) => {
  if (status === 'Published' || status === 'Active') {
    return 'bg-emerald-50 text-emerald-600 border border-emerald-100';
  }

  if (status === 'Draft') {
    return 'bg-orange-50 text-orange-600 border border-orange-100';
  }

  return 'bg-slate-100 text-slate-500 border border-slate-200';
};

export const AdminCurriculum: React.FC = () => {
  const { adminCourses, setCurrentAdminTab } = useUIStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('All Levels');
  const [selectedStatus, setSelectedStatus] = useState('All Status');

  const filteredCourses = adminCourses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.slug.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = selectedLevel === 'All Levels' || course.level === selectedLevel;
    const matchesStatus = selectedStatus === 'All Status' || course.status === selectedStatus;

    return matchesSearch && matchesLevel && matchesStatus;
  });

  const totalCourses = adminCourses.length;
  const totalModules = 0;
  const totalBlocks = 0;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
        <div className="space-y-2.5">
          <h1 className="text-3xl font-black tracking-tight text-slate-800">Curriculum</h1>
          <p className="text-sm font-medium text-slate-500">
            Select a course below to manage its modules, submodules, and content.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#DCC5F9] bg-[#FAF5FF] px-5 py-3 text-sm font-black text-[#7C3AED]">
            <BookOpen size={16} />
            <span>{totalCourses} Courses</span>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#BFDBFE] bg-[#EFF6FF] px-5 py-3 text-sm font-black text-[#2563EB]">
            <Layers size={16} />
            <span>{totalModules} Modules</span>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#99F6E4] bg-[#ECFEFF] px-5 py-3 text-sm font-black text-[#0F766E]">
            <LayoutGrid size={16} />
            <span>{totalBlocks} Blocks</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          <div className="relative w-full lg:w-[480px]">
            <Search size={18} className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search courses by title..."
              className="w-full rounded-2xl border border-slate-200 bg-white py-4 pl-14 pr-5 text-sm font-semibold text-slate-800 shadow-sm transition-all duration-200 placeholder:text-slate-400 focus:border-[#6C1D5F] focus:outline-none focus:ring-1 focus:ring-[#6C1D5F]"
            />
          </div>

          <div className="relative w-full lg:w-[180px]">
            <select
              value={selectedLevel}
              onChange={(event) => setSelectedLevel(event.target.value)}
              className="w-full appearance-none rounded-2xl border border-slate-200 bg-white px-5 py-4 pr-11 text-sm font-semibold text-slate-800 shadow-sm transition-all duration-200 focus:border-[#6C1D5F] focus:outline-none focus:ring-1 focus:ring-[#6C1D5F]"
            >
              <option>All Levels</option>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
              <option>Expert</option>
            </select>
            <ChevronDown size={16} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>

          <div className="relative w-full lg:w-[180px]">
            <select
              value={selectedStatus}
              onChange={(event) => setSelectedStatus(event.target.value)}
              className="w-full appearance-none rounded-2xl border border-slate-200 bg-white px-5 py-4 pr-11 text-sm font-semibold text-slate-800 shadow-sm transition-all duration-200 focus:border-[#6C1D5F] focus:outline-none focus:ring-1 focus:ring-[#6C1D5F]"
            >
              <option>All Status</option>
              <option>Published</option>
              <option>Draft</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
            <ChevronDown size={16} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>
        </div>

        <div className="text-right text-sm font-medium text-slate-500">{filteredCourses.length} courses</div>
      </div>

      {filteredCourses.length === 0 ? (
        <div className="flex min-h-[520px] items-center justify-center rounded-[32px] border border-dashed border-slate-200 bg-white/30 px-6 text-center">
          <div className="space-y-6">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-slate-100 text-slate-300">
              <Layers size={38} />
            </div>
            <div className="space-y-2">
              <p className="text-3xl font-black tracking-tight text-slate-200">Curriculum</p>
              <p className="text-[28px] font-medium text-slate-400">No courses found. Create a course first to build its curriculum.</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="rounded-[28px] border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] ${getCourseStatusTone(course.status)}`}>
                      {course.status}
                    </span>
                    <span className="rounded-full bg-[#F4EBFF] px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-[#6C1D5F]">
                      {course.level}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-800">{course.title}</h3>
                    <p className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-slate-400">{course.slug}</p>
                  </div>
                </div>
                <div
                  className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl text-white shadow-sm"
                  style={{ backgroundColor: course.accentColor }}
                >
                  <BookOpen size={22} />
                </div>
              </div>

              <p className="mt-5 line-clamp-3 text-sm font-medium leading-relaxed text-slate-500">
                {course.description || 'No course description available yet. Start structuring modules and submodules from the course builder.'}
              </p>

              <div className="mt-6 grid grid-cols-3 gap-3">
                <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
                  <div className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">Modules</div>
                  <div className="mt-1 text-2xl font-black text-slate-800">0</div>
                </div>
                <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
                  <div className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">Submodules</div>
                  <div className="mt-1 text-2xl font-black text-slate-800">0</div>
                </div>
                <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
                  <div className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">Blocks</div>
                  <div className="mt-1 text-2xl font-black text-slate-800">0</div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5">
                <div className="text-xs font-semibold text-slate-400">
                  Curriculum builder scaffold is ready for this course.
                </div>
                <button
                  onClick={() => setCurrentAdminTab('courses')}
                  className="inline-flex items-center gap-2 rounded-2xl bg-[#6C1D5F] px-5 py-3 text-xs font-black text-white shadow-md transition-all duration-200 hover:bg-[#4A1E47] hover:shadow-lg active:scale-95"
                >
                  Open Course
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
