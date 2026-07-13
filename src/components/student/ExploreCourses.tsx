import React, { useState } from 'react';
import { Compass, Clock, ShoppingCart, Check } from 'lucide-react';
import { useUIStore } from '../../store';
import javaCard from '../../assets/java_course_card.png';
import pythonCard from '../../assets/python_course_card.png';
import reactCard from '../../assets/react_course_card.png';
import architectureCard from '../../assets/architecture_course_card.png';
import uiuxCard from '../../assets/uiux_course_card.png';
import mlCard from '../../assets/ml_course_card.png';
import dockerCard from '../../assets/docker_course_card.png';
import sqlCard from '../../assets/sql_course_card.png';

interface ExploreCourse {
  id: string;
  title: string;
  description: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  trainer: string;
  price: string;
  type: 'Free' | 'Paid';
  gradient: string;
  image?: string;
}

const EXPLORE_COURSES: ExploreCourse[] = [
  {
    id: 'e-react',
    title: 'Advanced React & Next.js',
    description: 'Master server components, action hooks, portals, state patterns, and complex rendering techniques in modern production React.',
    category: 'Advanced React & Next.js',
    level: 'Advanced',
    duration: '18h 45m',
    trainer: 'Sarah Drasner',
    price: '₹999',
    type: 'Paid',
    gradient: 'from-purple-600 to-indigo-700',
    image: reactCard
  },
  {
    id: 'e-arch',
    title: 'Enterprise Architecture Patterns',
    description: 'Learn foundational patterns, microservices architectures, data integrity, messaging queues, and system performance optimizations.',
    category: 'Enterprise Architecture Patterns',
    level: 'Advanced',
    duration: '22h 10m',
    trainer: 'Martin Fowler',
    price: '₹1,299',
    type: 'Paid',
    gradient: 'from-slate-700 to-slate-900',
    image: architectureCard
  },
  {
    id: 'e-uiux',
    title: 'UI/UX Design for Developers',
    description: 'Bridge the gap between design and code. Learn typography, layout grids, visual hierarchical styling, and component building principles.',
    category: 'UI/UX Design for Developers',
    level: 'Intermediate',
    duration: '10h 30m',
    trainer: 'Refactoring UI',
    price: 'Free',
    type: 'Free',
    gradient: 'from-[#01AC9F] to-[#0D9488]',
    image: uiuxCard
  },
  {
    id: 'e-java',
    title: 'Java Fundamentals Mastery',
    description: "A beginner's step-by-step guide to objects, classes, garbage collection, data flows, multi-threading, and package imports.",
    category: 'Java Fundamentals Mastery',
    level: 'Beginner',
    duration: '12h 0m',
    trainer: 'Kathy Sierra',
    price: 'Free',
    type: 'Free',
    gradient: 'from-amber-500 to-orange-600',
    image: javaCard
  },
  {
    id: 'e-python',
    title: 'Python Foundations',
    description: 'Introduction to variables, arrays, dictionary structures, decorators, packages, data analysis tools, and backend frameworks.',
    category: 'Python Foundations',
    level: 'Beginner',
    duration: '24h 0m',
    trainer: 'Guido van Rossum',
    price: 'Free',
    type: 'Free',
    gradient: 'from-blue-500 to-sky-600',
    image: pythonCard
  },
  {
    id: 'e-ml',
    title: 'Machine Learning Basics',
    description: 'Discover models fitting, linear regressions, data preprocessing, clustering algorithms, networks, and neural optimizations.',
    category: 'Machine Learning Basics',
    level: 'Intermediate',
    duration: '15h 15m',
    trainer: 'Andrew Ng',
    price: '₹1,499',
    type: 'Paid',
    gradient: 'from-rose-600 to-red-800',
    image: mlCard
  },
  {
    id: 'e-docker',
    title: 'Docker & Kubernetes Bootcamp',
    description: 'Containerize systems, scale services, run local clusters, manage volumes, network bindings, and cluster architectures.',
    category: 'Docker & Kubernetes Bootcamp',
    level: 'Advanced',
    duration: '14h 50m',
    trainer: 'Kelsey Hightower',
    price: '₹899',
    type: 'Paid',
    gradient: 'from-cyan-500 to-blue-700',
    image: dockerCard
  },
  {
    id: 'e-sql',
    title: 'Introduction to SQL',
    description: 'Master SELECT queries, database schemas, primary/foreign keys, joins, aggregation formulas, triggers, and indices.',
    category: 'Database SQL',
    level: 'Beginner',
    duration: '8h 20m',
    trainer: 'SQL Mastery',
    price: 'Free',
    type: 'Free',
    gradient: 'from-emerald-500 to-teal-600',
    image: sqlCard
  }
];

export const ExploreCourses: React.FC = () => {
  const [filter, setFilter] = useState<'All' | 'Free' | 'Paid'>('All');
  const { cart, courses, adminCourses, addToCart, removeFromCart } = useUIStore();

  // Filter out any courses that are already inside My Courses
  const enrolledTitles = courses.map(c => c.title.toLowerCase());
  const releasedAdminCourses: ExploreCourse[] = adminCourses
    .filter((course) => course.status === 'Published')
    .map((course) => ({
      id: course.id,
      title: course.title,
      description: course.description || 'Newly released course from the admin library.',
      category: course.category,
      level: course.level === 'Expert' ? 'Advanced' : course.level,
      duration: course.duration || 'Self-paced',
      trainer: course.trainer || 'Xebia Mentor',
      price: course.price || 'Free',
      type: course.type || 'Free',
      gradient: 'from-[#6C1D5F] to-[#01AC9F]',
      image: course.image,
    }));

  const mergedExploreCourses = [...releasedAdminCourses, ...EXPLORE_COURSES];
  const dedupedExploreCourses = mergedExploreCourses.filter((course, index, array) => {
    const firstMatchIndex = array.findIndex((item) => item.title.toLowerCase() === course.title.toLowerCase());
    return firstMatchIndex === index;
  });

  const availableExploreCourses = dedupedExploreCourses.filter(ec => {
    return !enrolledTitles.some(et => 
      et.includes(ec.title.toLowerCase()) || 
      ec.title.toLowerCase().includes(et)
    );
  });

  const filteredCourses = availableExploreCourses.filter(course => {
    if (filter === 'All') return true;
    return course.type === filter;
  });

  return (
    <div className="p-8 space-y-8 overflow-y-auto h-full bg-slate-50/50">
      
      {/* Page Header */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-purple-50 text-[#6C1D5F] flex items-center justify-center shadow-sm">
          <Compass size={22} />
        </div>
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Course Exploration</h1>
          <p className="text-slate-500 text-sm font-semibold">
            Explore and enroll in premium free and paid tracks
          </p>
        </div>
      </div>

      {/* Filter Tabs Row */}
      <div className="flex flex-wrap gap-3">
        {(['All', 'Free', 'Paid'] as const).map((tab) => {
          const isActive = filter === tab;
          return (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-[#6C1D5F] text-white border border-[#6C1D5F]/20 shadow-md'
                  : 'text-slate-500 hover:text-[#6C1D5F] hover:bg-slate-50 border border-slate-200 bg-white'
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* Responsive Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => {
            const isInCart = cart.some(item => item.id === course.id);

            return (
              <div
                key={course.id}
                className="bg-white rounded-3xl border border-slate-100 shadow-sm flex flex-col overflow-hidden hover:shadow-xl hover:-translate-y-1.5 hover:border-[#4A1E47] hover:ring-2 hover:ring-[#4A1E47]/30 transition-all duration-300 ease-in-out group cursor-pointer"
              >
                {/* Top Thumbnail Section */}
                <div className="h-40 w-full relative overflow-hidden bg-slate-100 border-b border-slate-50 flex-shrink-0">
                  {course.image ? (
                    <img 
                      src={course.image} 
                      alt={course.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className={`w-full h-full bg-gradient-to-br ${course.gradient} flex items-center justify-center p-5 text-center select-none`}>
                      <span className="text-white font-extrabold text-sm leading-snug tracking-tight drop-shadow-sm group-hover:scale-105 transition-transform duration-500">
                        {course.title}
                      </span>
                    </div>
                  )}
                  {/* Category Badge */}
                  <span className="absolute top-4 left-4 bg-black/40 backdrop-blur-md text-white text-[9px] font-black uppercase px-2.5 py-1 rounded-full tracking-wider font-sans select-none">
                    {course.level}
                  </span>
                </div>

                {/* Bottom Card Content Block */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="text-[#6C1D5F] font-bold text-[9px] tracking-wider uppercase block">
                      {course.category}
                    </span>
                    <h3 className="text-sm font-bold text-slate-800 leading-snug line-clamp-1 group-hover:text-[#6C1D5F] transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-xs text-slate-400 font-semibold leading-relaxed line-clamp-2">
                      {course.description}
                    </p>
                  </div>

                  {/* Course Info & Pricing */}
                  <div className="pt-3 border-t border-slate-100/60 flex items-center justify-between text-xs">
                    <div className="flex flex-col text-left space-y-0.5">
                      <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Duration</span>
                      <span className="font-bold text-slate-600 flex items-center gap-1">
                        <Clock size={11} className="text-slate-400" />
                        {course.duration}
                      </span>
                    </div>

                    {/* Right Bottom Price Tag & Cart Row */}
                    <div className="flex items-center gap-2">
                      {course.type === 'Paid' ? (
                        <span className="bg-[#6C1D5F]/10 text-[#6C1D5F] font-black px-3 py-1.5 rounded-xl font-sans">
                          {course.price}
                        </span>
                      ) : (
                        <span className="bg-emerald-50 text-emerald-600 border border-emerald-100 font-black px-3 py-1.5 rounded-xl font-sans select-none">
                          Free
                        </span>
                      )}

                      {/* Cart Action Button */}
                      {isInCart ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFromCart(course.id);
                          }}
                          className="w-8 h-8 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow active:scale-95 transition-all cursor-pointer flex-shrink-0"
                          title="Remove from Cart"
                        >
                          <Check size={14} />
                        </button>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart(course);
                          }}
                          className="w-8 h-8 rounded-xl bg-[#6C1D5F] hover:bg-[#4A1E47] text-white flex items-center justify-center shadow active:scale-95 transition-all cursor-pointer flex-shrink-0"
                          title="Add to Cart"
                        >
                          <ShoppingCart size={14} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full bg-white p-8 rounded-3xl border border-slate-100 shadow-sm text-center text-slate-500 font-bold text-sm">
            All available courses are currently in your My Courses roster!
          </div>
        )}
      </div>

    </div>
  );
};
