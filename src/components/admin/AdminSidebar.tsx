import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Tag,
  BookOpen, 
  Layers, 
  BarChart3, 
  ChevronRight, 
  LogOut 
} from 'lucide-react';
import { useUIStore } from '../../store';
import logoWhite from '../../assets/logo/logo-white-BP39qsjW.png';

interface AdminSidebarProps {
  currentTab?: string;
  onTabChange?: (tab: string) => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ currentTab = 'dashboard', onTabChange }) => {
  const { setCurrentView, isSidebarOpen, adminName, adminAvatar } = useUIStore();
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'categories', label: 'Categories', icon: <Tag size={20} /> },
    { id: 'courses', label: 'Courses', icon: <BookOpen size={20} /> },
    { id: 'curriculum', label: 'Curriculum', icon: <Layers size={20} /> },
  ];

  const getInitials = (name: string) => {
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase() || 'AD';
  };

  return (
    <aside className={`bg-[#4A1E47] text-slate-300 flex flex-col h-full flex-shrink-0 transition-all duration-300 ease-in-out ${isSidebarOpen ? 'w-64' : 'w-20'}`}>
      {/* Brand Header */}
      {isSidebarOpen ? (
        <div className="p-6 border-b border-white/10 flex items-center gap-3">
          <img 
            src={logoWhite} 
            alt="Xebia Logo" 
            className="h-8 w-auto object-contain" 
          />
          <div className="h-5 w-[1.5px] bg-white/20"></div>
          <div className="flex flex-col">
            <span className="font-extrabold text-white text-base leading-tight tracking-tight">Xebia LMS</span>
            <span className="text-[9px] text-white/50 font-bold tracking-widest uppercase">Admin Portal</span>
          </div>
        </div>
      ) : (
        <div className="p-5 border-b border-white/10 flex items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center p-1.5 shadow-inner">
            <img 
              src={logoWhite} 
              alt="Xebia Logo" 
              className="h-full w-full object-contain" 
            />
          </div>
        </div>
      )}

      {/* Main Menu Label */}
      {isSidebarOpen && (
        <div className="px-6 pt-6 pb-2 text-[10px] font-bold tracking-wider text-white/40 uppercase">
          Main Menu
        </div>
      )}

      {/* Navigation */}
      <nav className={`flex-1 px-4 space-y-1.5 overflow-y-auto ${isSidebarOpen ? '' : 'pt-4'}`}>
        {menuItems.map((item) => {
          const isActive = 
            currentTab === item.id ||
            (item.id === 'categories' && currentTab === 'create-category') ||
            (item.id === 'courses' && currentTab === 'create-course');
          return isSidebarOpen ? (
            <button
              key={item.id}
              onClick={() => onTabChange?.(item.id)}
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200 ${
                isActive
                  ? 'bg-white text-[#4A1E47] shadow-md font-bold'
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              <span className={isActive ? 'text-[#4A1E47]' : 'text-white/60'}>
                {item.icon}
              </span>
              <span>{item.label}</span>
            </button>
          ) : (
            <div key={item.id} className="w-full flex justify-center py-1 relative">
              <button
                onClick={() => onTabChange?.(item.id)}
                title={item.label}
                className={`w-12 h-12 flex items-center justify-center rounded-2xl transition-all duration-200 ${
                  isActive
                    ? 'bg-white text-[#4A1E47] shadow-md'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                {item.icon}
              </button>
            </div>
          );
        })}

        {/* Analytics Hub Section */}
        {isSidebarOpen ? (
          <div className="pt-2">
            <button
              onClick={() => setIsAnalyticsOpen(!isAnalyticsOpen)}
              className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-semibold text-white/70 hover:bg-white/10 hover:text-white transition-all duration-200"
            >
              <div className="flex items-center gap-3.5">
                <BarChart3 size={20} className="text-white/60" />
                <span>Analytics Hub</span>
              </div>
              <ChevronRight 
                size={16} 
                className={`text-white/40 transition-transform duration-200 ${isAnalyticsOpen ? 'rotate-90' : ''}`} 
              />
            </button>
            
            {isAnalyticsOpen && (
              <div className="pl-11 pr-4 py-1 space-y-1 animate-in slide-in-from-top-1 duration-150">
                <button 
                  onClick={() => onTabChange?.('analytics-overview')}
                  className={`w-full text-left py-2 text-xs font-semibold hover:text-white transition-all ${currentTab === 'analytics-overview' ? 'text-white font-bold' : 'text-white/50'}`}
                >
                  Overview
                </button>
                <button 
                  onClick={() => onTabChange?.('analytics-reports')}
                  className={`w-full text-left py-2 text-xs font-semibold hover:text-white transition-all ${currentTab === 'analytics-reports' ? 'text-white font-bold' : 'text-white/50'}`}
                >
                  Report Center
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="w-full flex justify-center py-1 relative">
            <button
              onClick={() => {
                setIsAnalyticsOpen(!isAnalyticsOpen);
                onTabChange?.('analytics-overview');
              }}
              title="Analytics Hub"
              className={`w-12 h-12 flex items-center justify-center rounded-2xl text-white/70 hover:bg-white/10 hover:text-white transition-all duration-200 ${
                currentTab.startsWith('analytics') ? 'bg-white/10 text-white' : ''
              }`}
            >
              <BarChart3 size={20} />
            </button>
          </div>
        )}
      </nav>

      {/* Sidebar Footer */}
      {isSidebarOpen ? (
        <div className="p-4 border-t border-white/10 space-y-2">
          <div className="flex items-center gap-3 px-4 py-2">
            <div className="w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center font-bold text-sm overflow-hidden flex-shrink-0">
              {adminAvatar ? (
                <img src={adminAvatar} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                getInitials(adminName)
              )}
            </div>
            <div className="flex flex-col flex-grow overflow-hidden">
              <span className="text-sm font-semibold text-white leading-tight truncate">{adminName}</span>
              <span className="text-[10px] text-white/50">Admin User</span>
            </div>
          </div>

          <button
            onClick={() => setCurrentView('landing')}
            className="w-full flex items-center gap-3.5 px-4 py-3 rounded-lg text-sm font-semibold text-white/70 hover:bg-white/10 hover:text-white transition-all duration-200"
          >
            <LogOut size={18} className="text-white/60" />
            Logout
          </button>
        </div>
      ) : (
        <div className="p-4 border-t border-white/10 flex flex-col items-center gap-4">
          <div 
            className="w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center font-bold text-sm select-none overflow-hidden flex-shrink-0" 
            title={`${adminName}'s Profile`}
          >
            {adminAvatar ? (
              <img src={adminAvatar} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              getInitials(adminName)
            )}
          </div>
          <button
            onClick={() => setCurrentView('landing')}
            title="Logout"
            className="w-12 h-12 flex items-center justify-center rounded-2xl text-white/70 hover:bg-white/10 hover:text-white transition-all duration-200"
          >
            <LogOut size={20} className="text-white/60" />
          </button>
        </div>
      )}
    </aside>
  );
};
