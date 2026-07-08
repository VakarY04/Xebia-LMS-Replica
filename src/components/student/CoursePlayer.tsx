import React from 'react';
import { PlayCircle, CheckCircle, Lock, ArrowLeft, ArrowRight, Settings } from 'lucide-react';
import { Button } from '../common/Button';

export const CoursePlayer: React.FC = () => {
  const chapters = [
    { id: 1, title: 'Introduction to React 19 Ecosystem', duration: '15:00', status: 'completed' },
    { id: 2, title: 'Understanding Server Components & Server Actions', duration: '45:30', status: 'active' },
    { id: 3, title: 'Optimizing Builds with Vite & Rollup', duration: '32:15', status: 'locked' },
    { id: 4, title: 'State Orchestration with Zustand', duration: '28:40', status: 'locked' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 border border-xebia-lightGrey rounded-xl overflow-hidden bg-white shadow-sm">
      <div className="lg:col-span-3 flex flex-col border-b lg:border-b-0 lg:border-r border-xebia-lightGrey">
        <div className="aspect-video bg-black flex items-center justify-center text-white relative">
          <PlayCircle size={64} className="text-xebia-orange opacity-80 hover:opacity-100 hover:scale-105 transition cursor-pointer" />
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-xs bg-black/60 px-3 py-2 rounded-lg">
            <span>Video Stream: Understanding Server Components & Server Actions</span>
            <div className="flex gap-2">
              <button aria-label="Settings"><Settings size={14} /></button>
            </div>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-xebia-purpleDark">Understanding Server Components & Server Actions</h2>
            <div className="flex gap-2">
              <Button variant="outline" className="py-1 px-3 text-xs gap-1" leftIcon={<ArrowLeft size={12} />}>
                Prev
              </Button>
              <Button variant="outline" className="py-1 px-3 text-xs gap-1" rightIcon={<ArrowRight size={12} />}>
                Next
              </Button>
            </div>
          </div>
          <p className="text-sm text-xebia-darkGrey leading-relaxed">
            In this lesson, you will learn about the fundamentals of React 19 Server Components, how they differ from Client Components, and how Server Actions facilitate secure client-to-server function execution.
          </p>
        </div>
      </div>

      <div className="flex flex-col bg-xebia-blueishGrey/50">
        <div className="p-4 border-b border-xebia-lightGrey font-bold text-xebia-purpleDark text-sm bg-white">
          Course Syllabus
        </div>
        <div className="divide-y divide-xebia-lightGrey/60 overflow-y-auto max-h-[500px]">
          {chapters.map((chap) => (
            <div
              key={chap.id}
              className={`p-4 flex items-start gap-3 transition-colors ${
                chap.status === 'active' ? 'bg-white border-l-4 border-xebia-purple' : ''
              }`}
            >
              <div className="mt-0.5 flex-shrink-0">
                {chap.status === 'completed' && <CheckCircle size={16} className="text-xebia-emerald" />}
                {chap.status === 'active' && <PlayCircle size={16} className="text-xebia-purple animate-pulse" />}
                {chap.status === 'locked' && <Lock size={16} className="text-xebia-lightGrey" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-xs font-bold ${chap.status === 'locked' ? 'text-xebia-lightGrey' : 'text-xebia-purpleDark'}`}>
                  {chap.title}
                </p>
                <span className="text-[10px] text-xebia-darkGrey font-medium">{chap.duration}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
