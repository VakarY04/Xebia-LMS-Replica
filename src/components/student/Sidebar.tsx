import React from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  Compass,
  ShoppingCart,
  Calendar, 
  ClipboardList, 
  Award, 
  Bell, 
  MessageSquare, 
  LogOut 
} from 'lucide-react';
import { useUIStore } from '../../store';
import logoWhite from '../../assets/logo/logo-white-BP39qsjW.png';

interface SidebarProps {
  currentTab?: string;
  onTabChange?: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentTab = 'dashboard', onTabChange }) => {
  const { setCurrentView, isSidebarOpen, studentName, studentAvatar, notifications, cart } = useUIStore();
  const unreadCount = notifications.filter(n => !n.isRead).length;
  const cartCount = cart.length;

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'courses', label: 'My Courses', icon: <BookOpen size={20} /> },
    { id: 'explore', label: 'Explore Courses', icon: <Compass size={20} /> },
    { id: 'cart', label: 'Cart', icon: <ShoppingCart size={20} /> },
    { id: 'batches', label: 'My Batches', icon: <Calendar size={20} /> },
    { id: 'assessments', label: 'Assessments', icon: <ClipboardList size={20} /> },
    { id: 'results', label: 'Results', icon: <Award size={20} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={20} /> },
    { id: 'feedback', label: 'Feedback', icon: <MessageSquare size={20} /> },
  ];

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
            <span className="text-[9px] text-white/50 font-bold tracking-widest uppercase">Student Portal</span>
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
          const isActive = currentTab === item.id;
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
              {item.id === 'notifications' && unreadCount > 0 && (
                <span className="ml-auto bg-[#FF6200] text-white text-[9px] font-black px-1.5 py-0.5 rounded-full font-sans select-none">
                  {unreadCount}
                </span>
              )}
              {item.id === 'cart' && cartCount > 0 && (
                <span className="ml-auto bg-[#FF6200] text-white text-[9px] font-black px-1.5 py-0.5 rounded-full font-sans select-none">
                  {cartCount}
                </span>
              )}
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
              {item.id === 'notifications' && unreadCount > 0 && (
                <span className="absolute top-2 right-5 w-2.5 h-2.5 bg-[#FF6200] rounded-full border border-[#4A1E47] pointer-events-none"></span>
              )}
              {item.id === 'cart' && cartCount > 0 && (
                <span className="absolute top-2 right-5 w-2.5 h-2.5 bg-[#FF6200] rounded-full border border-[#4A1E47] pointer-events-none"></span>
              )}
            </div>
          );
        })}
      </nav>

      {/* Sidebar Footer */}
      {isSidebarOpen ? (
        <div className="p-4 border-t border-white/10 space-y-2">
          <div className="flex items-center gap-3 px-4 py-2">
            <div className="w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center font-bold text-sm overflow-hidden flex-shrink-0">
              {studentAvatar ? (
                <img src={studentAvatar} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                studentName.trim().charAt(0).toUpperCase() || 'S'
              )}
            </div>
            <div className="flex flex-col flex-grow overflow-hidden">
              <span className="text-sm font-semibold text-white leading-tight truncate">{studentName}</span>
              <span className="text-[10px] text-white/50">Active Session</span>
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
          <div className="w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center font-bold text-sm select-none overflow-hidden flex-shrink-0" title={`${studentName}'s Profile`}>
            {studentAvatar ? (
              <img src={studentAvatar} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              studentName.trim().charAt(0).toUpperCase() || 'S'
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
