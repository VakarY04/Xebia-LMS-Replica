import React from 'react';
import { 
  Bell, 
  CheckCircle, 
  BookOpen, 
  MessageSquare, 
  Award,
  ClipboardList 
} from 'lucide-react';
import { useUIStore } from '../../store';

export const Notifications: React.FC = () => {
  const { 
    notifications, 
    markAllNotificationsAsRead, 
    markNotificationAsRead 
  } = useUIStore();

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'course':
        return (
          <div className="w-10 h-10 bg-purple-50 text-[#6C1D5F] rounded-xl flex items-center justify-center border border-purple-100/50 flex-shrink-0">
            <BookOpen size={18} />
          </div>
        );
      case 'assessment':
        return (
          <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center border border-orange-100/50 flex-shrink-0">
            <ClipboardList size={18} />
          </div>
        );
      case 'reply':
        return (
          <div className="w-10 h-10 bg-pink-50 text-pink-600 rounded-xl flex items-center justify-center border border-pink-100/50 flex-shrink-0">
            <MessageSquare size={18} />
          </div>
        );
      case 'result':
        return (
          <div className="w-10 h-10 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center border border-teal-100/50 flex-shrink-0">
            <Award size={18} />
          </div>
        );
      case 'system':
        return (
          <div className="w-10 h-10 bg-slate-100 text-slate-600 rounded-xl flex items-center justify-center border border-slate-200/70 flex-shrink-0">
            <Bell size={18} />
          </div>
        );
      default:
        return (
          <div className="w-10 h-10 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center border border-slate-100 flex-shrink-0">
            <Bell size={18} />
          </div>
        );
    }
  };

  return (
    <div className="p-8 space-y-8 overflow-y-auto h-full bg-slate-50/50">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-[#6C1D5F] flex items-center justify-center shadow-sm">
            <Bell size={22} />
          </div>
          <div>
            <div className="flex items-center flex-wrap gap-2">
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Notifications</h1>
              {unreadCount > 0 && (
                <span className="px-2.5 py-0.5 bg-[#6C1D5F] text-white text-[10px] font-black rounded-full select-none font-sans uppercase tracking-wider">
                  {unreadCount} New
                </span>
              )}
            </div>
            <p className="text-slate-500 text-sm font-semibold mt-0.5">
              Stay updated with your courses and assessments
            </p>
          </div>
        </div>

        {unreadCount > 0 && (
          <button 
            onClick={markAllNotificationsAsRead}
            className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors bg-white hover:bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-200/60 shadow-sm"
          >
            <CheckCircle size={14} className="text-[#01AC9F]" />
            Mark all as read
          </button>
        )}
      </div>

      {/* Stack of Cards */}
      <div className="space-y-4 max-w-4xl">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            onClick={() => !notif.isRead && markNotificationAsRead(notif.id)}
            className={`bg-white rounded-3xl p-5 border flex items-start gap-4 shadow-sm transition-all duration-300 relative ${
              notif.isRead
                ? 'border-slate-100/70 hover:shadow-md'
                : 'border-slate-200/50 border-l-4 border-l-[#6C1D5F] hover:shadow-lg cursor-pointer hover:-translate-y-0.5'
            }`}
          >
            {getNotificationIcon(notif.type)}

            <div className="flex-grow min-w-0 pr-12 space-y-1">
              <h3 className={`text-sm font-bold leading-tight ${
                notif.isRead ? 'text-slate-700' : 'text-slate-800 font-extrabold'
              }`}>
                {notif.title}
              </h3>
              <p className="text-slate-400 text-xs font-semibold leading-relaxed">
                {notif.description}
              </p>
            </div>

            <span className="text-[10px] text-slate-400 font-bold flex-shrink-0 absolute top-5 right-5">
              {notif.time}
            </span>
          </div>
        ))}
      </div>

    </div>
  );
};
