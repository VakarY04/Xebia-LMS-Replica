import React, { useState } from 'react';
import { 
  Plus, 
  Tag, 
  CheckCircle, 
  XCircle, 
  BookOpen, 
  Search, 
  ChevronDown, 
  LayoutGrid, 
  List,
  Users
} from 'lucide-react';
import { useUIStore } from '../../store';

export const AdminCategories: React.FC = () => {
  const { categories, setCurrentAdminTab } = useUIStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // Filter & Sort State
  const [statusFilter, setStatusFilter] = useState<'All' | 'Active' | 'Inactive'>('All');
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  
  const [sortOrder, setSortOrder] = useState<'A-Z' | 'Z-A'>('A-Z');
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);

  // Compute metrics dynamically from Zustand categories
  const totalCategories = categories.length;
  const activeCount = categories.filter(c => c.status === 'Active').length;
  const inactiveCount = categories.filter(c => c.status === 'Inactive').length;
  const totalCourses = categories.reduce((acc, c) => acc + c.coursesCount, 0);

  // Filter & Sort Logic
  const filteredCategories = categories
    .filter(cat => {
      const matchesSearch = cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            cat.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            cat.slug.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === 'All' ? true : cat.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortOrder === 'A-Z') {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Title & Action Header Block */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1.5">
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">
            Categories
          </h1>
          <p className="text-sm font-semibold text-slate-400">
            Organize your courses into structured domains.
          </p>
        </div>
        <button 
          onClick={() => setCurrentAdminTab('create-category')}
          className="flex-shrink-0 bg-[#6C1D5F] hover:bg-[#4A1E47] text-white font-extrabold text-sm px-5 py-3 rounded-2xl shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus size={16} />
          Create Category
        </button>
      </div>

      {/* Metrics Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Total Categories */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
              Total Categories
            </span>
            <span className="text-3xl font-black text-slate-800">{totalCategories}</span>
            <span className="text-xs text-slate-400 font-bold block pt-1">
              All structured domains
            </span>
          </div>
          <div className="p-4 bg-rose-50 text-rose-500 rounded-2xl">
            <Tag size={24} />
          </div>
        </div>

        {/* Active */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
              Active
            </span>
            <span className="text-3xl font-black text-slate-800">{activeCount}</span>
            <span className="text-xs text-slate-400 font-bold block pt-1">
              Currently in use
            </span>
          </div>
          <div className="p-4 bg-emerald-50 text-emerald-500 rounded-2xl">
            <CheckCircle size={24} />
          </div>
        </div>

        {/* Inactive */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
              Inactive
            </span>
            <span className="text-3xl font-black text-slate-800">{inactiveCount}</span>
            <span className="text-xs text-slate-400 font-bold block pt-1">
              Hidden or archived
            </span>
          </div>
          <div className="p-4 bg-orange-50 text-[#FF6200] rounded-2xl">
            <XCircle size={24} />
          </div>
        </div>

        {/* Total Courses */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
              Total Courses
            </span>
            <span className="text-3xl font-black text-slate-800">{totalCourses}</span>
            <span className="text-xs text-slate-400 font-bold block pt-1">
              Across all categories
            </span>
          </div>
          <div className="p-4 bg-purple-50 text-[#6C1D5F] rounded-2xl">
            <BookOpen size={24} />
          </div>
        </div>

      </div>

      {/* Search and Filters Bar */}
      <div className="bg-white rounded-3xl border border-slate-100 p-4 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Search Bar Input */}
        <div className="relative flex-grow max-w-xl">
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search categories by name..." 
            className="w-full bg-[#F8F9FD] border border-slate-100 rounded-2xl pl-11 pr-4 py-3 text-xs text-slate-800 focus:outline-none focus:bg-white focus:border-[#6C1D5F] transition-all font-semibold placeholder-slate-400"
          />
          <Search size={16} className="text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Dropdowns & Mode Toggles */}
        <div className="flex flex-wrap items-center gap-3 relative">
          
          {/* Status Dropdown */}
          <div className="relative">
            <button 
              onClick={() => {
                setIsStatusDropdownOpen(!isStatusDropdownOpen);
                setIsSortDropdownOpen(false);
              }}
              className="bg-[#F8F9FD] border border-slate-100 rounded-2xl px-5 py-3 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all flex items-center gap-2"
            >
              <span>Status: {statusFilter === 'All' ? 'All Status' : statusFilter}</span>
              <ChevronDown size={14} className="text-slate-400" />
            </button>
            {isStatusDropdownOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setIsStatusDropdownOpen(false)}></div>
                <div className="absolute right-0 mt-2 w-40 bg-white border border-slate-100 rounded-2xl shadow-xl z-20 p-2 overflow-hidden flex flex-col space-y-1 animate-in fade-in slide-in-from-top-2 duration-150">
                  {['All', 'Active', 'Inactive'].map((status) => (
                    <button
                      key={status}
                      type="button"
                      onClick={() => {
                        setStatusFilter(status as any);
                        setIsStatusDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 rounded-xl text-xs font-bold transition-all ${statusFilter === status ? 'bg-[#6C1D5F]/5 text-[#6C1D5F]' : 'hover:bg-slate-50 text-slate-600'}`}
                    >
                      {status === 'All' ? 'All Status' : status}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <button 
              onClick={() => {
                setIsSortDropdownOpen(!isSortDropdownOpen);
                setIsStatusDropdownOpen(false);
              }}
              className="bg-[#F8F9FD] border border-slate-100 rounded-2xl px-5 py-3 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all flex items-center gap-2"
            >
              <span>{sortOrder === 'A-Z' ? 'Sort: Name A-Z' : 'Sort: Name Z-A'}</span>
              <ChevronDown size={14} className="text-slate-400" />
            </button>
            {isSortDropdownOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setIsSortDropdownOpen(false)}></div>
                <div className="absolute right-0 mt-2 w-44 bg-white border border-slate-100 rounded-2xl shadow-xl z-20 p-2 overflow-hidden flex flex-col space-y-1 animate-in fade-in slide-in-from-top-2 duration-150">
                  {[
                    { label: 'Sort: Name A-Z', order: 'A-Z' },
                    { label: 'Sort: Name Z-A', order: 'Z-A' }
                  ].map((option) => (
                    <button
                      key={option.order}
                      type="button"
                      onClick={() => {
                        setSortOrder(option.order as any);
                        setIsSortDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 rounded-xl text-xs font-bold transition-all ${sortOrder === option.order ? 'bg-[#6C1D5F]/5 text-[#6C1D5F]' : 'hover:bg-slate-50 text-slate-600'}`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Grid/List Toggle divider */}
          <div className="h-6 w-[1px] bg-slate-200 hidden sm:block"></div>

          {/* Grid & List View Buttons */}
          <div className="bg-[#F8F9FD] border border-slate-100 rounded-2xl p-1 flex items-center gap-1">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-white text-[#6C1D5F] shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
              title="Grid View"
            >
              <LayoutGrid size={16} />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-xl transition-all ${viewMode === 'list' ? 'bg-white text-[#6C1D5F] shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
              title="List View"
            >
              <List size={16} />
            </button>
          </div>

        </div>

      </div>

      {/* Categories Content List Grid */}
      {filteredCategories.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-100 py-16 px-6 shadow-sm flex flex-col items-center justify-center text-center space-y-4 animate-in fade-in duration-200">
          <div className="p-4 bg-slate-50 text-slate-400 rounded-full">
            <Tag size={32} />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-slate-800">No categories found</h3>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Create a new learning category by clicking "+ Create Category" to start structuring your curriculums.
            </p>
          </div>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-200">
          {filteredCategories.map((cat) => (
            <div 
              key={cat.id} 
              className="border border-slate-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-md hover:scale-[1.01] transition-all duration-200 flex flex-col bg-white"
            >
              {/* Card Banner */}
              <div 
                className="h-24 relative flex items-center justify-center transition-all duration-300 overflow-hidden"
                style={{ backgroundColor: cat.icon && cat.icon.startsWith('data:') ? 'transparent' : cat.accentColor }}
              >
                {cat.icon && cat.icon.startsWith('data:') ? (
                  <img src={cat.icon} alt={cat.name} className="w-full h-full object-cover absolute inset-0" />
                ) : (
                  <div className="w-12 h-12 bg-white/95 rounded-xl flex items-center justify-center text-2xl shadow-md border border-white/20 select-none">
                    {cat.icon || '🏷️'}
                  </div>
                )}
                
                <span className={`absolute top-3 right-3 text-[9px] font-black uppercase px-2 py-0.5 rounded-full text-white shadow-sm z-10 ${cat.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-500'}`}>
                  {cat.status}
                </span>
              </div>

              {/* Card Content Body */}
              <div className="p-5 space-y-3">
                <div>
                  <h4 className="text-sm font-extrabold text-slate-800 line-clamp-1">{cat.name}</h4>
                  <span className="text-[9px] font-bold text-slate-400 block font-mono">{cat.slug}</span>
                </div>
                <p className="text-xs text-slate-400 font-semibold line-clamp-2 min-h-[32px] leading-relaxed">
                  {cat.description}
                </p>

                {/* Footer Details */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-50 text-[10px] font-bold text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.accentColor }}></span>
                    <span className="font-mono text-[9px]">{cat.accentColor}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <BookOpen size={12} className="text-slate-400" />
                    {cat.coursesCount} Courses
                  </span>
                  <span className="flex items-center gap-1">
                    <Users size={12} className="text-slate-400" />
                    0
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm animate-in fade-in duration-200">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs font-semibold text-slate-500">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  <th className="p-4 pl-6">Category</th>
                  <th className="p-4">Description</th>
                  <th className="p-4">Accent Color</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right pr-6">Courses</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredCategories.map((cat) => (
                  <tr key={cat.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4 pl-6 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-xl flex-shrink-0 select-none">
                        {cat.icon}
                      </div>
                      <div>
                        <span className="font-extrabold text-slate-800 block text-xs">{cat.name}</span>
                        <span className="text-[9px] text-slate-400 font-mono block">{cat.slug}</span>
                      </div>
                    </td>
                    <td className="p-4 max-w-xs truncate text-slate-400 font-medium">
                      {cat.description}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-3.5 h-3.5 rounded-full shadow-sm" style={{ backgroundColor: cat.accentColor }}></div>
                        <span className="font-mono text-[10px] text-slate-600">{cat.accentColor}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${cat.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-slate-50 text-slate-500 border border-slate-200'}`}>
                        {cat.status}
                      </span>
                    </td>
                    <td className="p-4 text-right pr-6 text-slate-700 font-extrabold">
                      {cat.coursesCount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Categories Summary Footer */}
      <div className="space-y-4 pt-2">
        <span className="text-xs sm:text-sm font-bold text-slate-400">
          {filteredCategories.length === 0 
            ? 'Showing 0 to 0 of 0 categories' 
            : `Showing 1 to ${filteredCategories.length} of ${totalCategories} categories`}
        </span>
      </div>

    </div>
  );
};

