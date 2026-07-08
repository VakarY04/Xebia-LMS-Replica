import React from 'react';
import { Users2, Calendar, Clock, MapPin, CheckCircle2, ArrowRight } from 'lucide-react';

export const Batches: React.FC = () => {
  const batchesData = [
    {
      id: 'XEBIA-2026-A1',
      title: 'XEBIA-2026-A1',
      subtitle: 'Frontend Engineering Bootcamp',
      status: 'Active',
      duration: 'Jan 10, 2026 - Jun 30, 2026',
      schedule: 'Mon, Wed, Fri (10 AM - 1 PM)',
      location: 'Hybrid (Online & Gurgaon Campus)',
      instructor: 'Jane Smith',
      classmates: 42,
    },
    {
      id: 'XEBIA-2025-B2',
      title: 'XEBIA-2025-B2',
      subtitle: 'Cloud Native Essentials',
      status: 'Completed',
      duration: 'Jul 1, 2025 - Dec 15, 2025',
      schedule: 'Tue, Thu (2 PM - 5 PM)',
      location: 'Online',
      instructor: 'Michael Doe',
      classmates: 38,
    },
  ];

  return (
    <div className="p-8 space-y-8 overflow-y-auto h-full bg-slate-50/50">
      {/* Page Header */}
      <div className="space-y-1">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">My Batches</h1>
        <p className="text-slate-500 text-sm">
          Track your batch schedules, progress, and cohort details.
        </p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {batchesData.map((batch) => (
          <div 
            key={batch.id}
            className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:border-[#6C1D5F] hover:ring-1 hover:ring-[#6C1D5F] hover:shadow-lg hover:-translate-y-1 cursor-pointer transition-all duration-300 ease-in-out flex flex-col justify-between"
          >
            {/* Top section */}
            <div>
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  {/* Icon Block */}
                  <div className="w-14 h-14 rounded-2xl bg-purple-50 text-[#6C1D5F] flex items-center justify-center shadow-sm">
                    <Users2 size={24} />
                  </div>
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-900 leading-tight">
                      {batch.title}
                    </h2>
                    <p className="text-[#6C1D5F] font-bold text-sm leading-tight mt-0.5">
                      {batch.subtitle}
                    </p>
                  </div>
                </div>

                {/* Status Badge */}
                {batch.status === 'Active' ? (
                  <span className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 text-[#01AC9F] text-[11px] font-bold tracking-wide uppercase select-none border border-emerald-100/50">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#01AC9F]"></span>
                    Active
                  </span>
                ) : (
                  <span className="px-3.5 py-1.5 rounded-full bg-slate-100 text-slate-600 text-[11px] font-bold tracking-wide uppercase select-none border border-slate-200/50">
                    Completed
                  </span>
                )}
              </div>

              {/* Grid 2x2 Specs Section */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5 border-t border-slate-100/70 pt-6 mb-8">
                {/* Duration */}
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 text-slate-400">
                    <Calendar size={16} />
                  </div>
                  <div className="space-y-0.5">
                    <div className="text-xs font-bold text-slate-700">Duration</div>
                    <div className="text-xs font-medium text-slate-500">{batch.duration}</div>
                  </div>
                </div>

                {/* Schedule */}
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 text-slate-400">
                    <Clock size={16} />
                  </div>
                  <div className="space-y-0.5">
                    <div className="text-xs font-bold text-slate-700">Schedule</div>
                    <div className="text-xs font-medium text-slate-500">{batch.schedule}</div>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 text-slate-400">
                    <MapPin size={16} />
                  </div>
                  <div className="space-y-0.5">
                    <div className="text-xs font-bold text-slate-700">Location</div>
                    <div className="text-xs font-medium text-slate-500">{batch.location}</div>
                  </div>
                </div>

                {/* Instructor */}
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 text-slate-400">
                    <CheckCircle2 size={16} />
                  </div>
                  <div className="space-y-0.5">
                    <div className="text-xs font-bold text-slate-700">Instructor</div>
                    <div className="text-xs font-medium text-slate-500">{batch.instructor}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Section */}
            <div className="flex items-center justify-between border-t border-slate-100/70 pt-5">
              <div className="flex items-center gap-2">
                <span className="bg-slate-100 text-slate-700 font-extrabold text-[11px] px-2.5 py-1 rounded-full shadow-inner">
                  +{batch.classmates}
                </span>
                <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                  Classmates
                </span>
              </div>

              <button className="bg-[#FF5C00] text-white text-[11px] font-extrabold px-6 py-2.5 rounded-full flex items-center gap-2 hover:bg-[#E05200] transition-colors shadow-md hover:shadow-lg transition-transform hover:scale-[1.03] active:scale-[0.97] duration-200">
                View Details
                <ArrowRight size={13} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
