import React, { useMemo, useState } from 'react';
import {
  Bell,
  BookOpen,
  ClipboardList,
  MessageSquare,
  Award,
  Send,
  Sparkles,
} from 'lucide-react';
import { useUIStore } from '../../store';
import type { NotificationType } from '../../store/uiStore';

const notificationTypes: Array<{ value: NotificationType; label: string; accent: string }> = [
  { value: 'course', label: 'Course', accent: 'bg-purple-50 text-[#6C1D5F]' },
  { value: 'assessment', label: 'Assessment', accent: 'bg-orange-50 text-orange-600' },
  { value: 'reply', label: 'Reply', accent: 'bg-pink-50 text-pink-600' },
  { value: 'result', label: 'Result', accent: 'bg-teal-50 text-teal-600' },
  { value: 'system', label: 'System', accent: 'bg-slate-100 text-slate-600' },
];

export const AdminNotifications: React.FC = () => {
  const { notifications, addNotification } = useUIStore();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedType, setSelectedType] = useState<NotificationType>('course');
  const [timeLabel, setTimeLabel] = useState('Just now');
  const [error, setError] = useState<string | null>(null);

  const previewNotification = useMemo(() => ({
    title: title.trim() || 'New notification preview',
    description: description.trim() || 'This message will appear in the student notification feed and bell dropdown.',
    type: selectedType,
    time: timeLabel,
  }), [title, description, selectedType, timeLabel]);

  const handleCreateNotification = () => {
    if (!title.trim()) {
      setError('Notification title is required.');
      return;
    }

    if (!description.trim()) {
      setError('Notification description is required.');
      return;
    }

    addNotification({
      title: title.trim(),
      description: description.trim(),
      time: timeLabel,
      type: selectedType,
    });

    setTitle('');
    setDescription('');
    setError(null);
    setSelectedType('course');
    setTimeLabel('Just now');
  };

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case 'course':
        return <BookOpen size={16} />;
      case 'assessment':
        return <ClipboardList size={16} />;
      case 'reply':
        return <MessageSquare size={16} />;
      case 'result':
        return <Award size={16} />;
      default:
        return <Bell size={16} />;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div className="text-[11px] font-semibold text-slate-400 flex items-center gap-1.5 font-sans">
        <span className="text-slate-400">Admin</span>
        <span>&gt;</span>
        <span className="text-slate-800 font-bold">Notifications</span>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1.1fr_0.9fr] gap-8">
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 md:p-8 space-y-6 hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 bg-[#6C1D5F]/10 rounded-2xl flex items-center justify-center text-[#6C1D5F] shadow-sm">
              <Bell size={20} />
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-800 tracking-tight">Create Notification</h1>
              <p className="text-xs font-bold text-slate-400">Push announcements into the student bell and notifications page.</p>
            </div>
          </div>

          {error && (
            <div className="rounded-2xl border border-rose-100 bg-rose-50 px-4 py-3 text-xs font-bold text-rose-600">
              {error}
            </div>
          )}

          <div className="space-y-5">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. New React Bootcamp is live"
                className="w-full bg-[#F8F9FD] border border-slate-200 hover:border-slate-300 focus:border-[#6C1D5F] rounded-2xl px-4 py-3 text-xs text-slate-800 font-semibold focus:outline-none focus:bg-white shadow-sm placeholder-slate-400 transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Share the announcement message for students"
                className="w-full min-h-[110px] bg-[#F8F9FD] border border-slate-200 hover:border-slate-300 focus:border-[#6C1D5F] rounded-2xl px-4 py-3 text-xs text-slate-800 font-semibold focus:outline-none focus:bg-white shadow-sm placeholder-slate-400 transition-all resize-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Notification Type</label>
                <div className="grid grid-cols-2 gap-2">
                  {notificationTypes.map((type) => (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => setSelectedType(type.value)}
                      className={`rounded-2xl px-3 py-2.5 text-[10px] font-black transition-all ${
                        selectedType === type.value
                          ? 'bg-[#6C1D5F] text-white shadow-md'
                          : 'bg-[#F8F9FD] border border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Time Label</label>
                <input
                  value={timeLabel}
                  onChange={(e) => setTimeLabel(e.target.value)}
                  placeholder="Just now"
                  className="w-full bg-[#F8F9FD] border border-slate-200 hover:border-slate-300 focus:border-[#6C1D5F] rounded-2xl px-4 py-3 text-xs text-slate-800 font-semibold focus:outline-none focus:bg-white shadow-sm placeholder-slate-400 transition-all"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleCreateNotification}
              className="bg-[#6C1D5F] hover:bg-[#4A1E47] text-white font-extrabold text-xs px-5 py-3 rounded-2xl shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center gap-2"
            >
              <Send size={14} />
              Publish Notification
            </button>
            <span className="text-[10px] text-slate-400 font-bold">This message will update the student bell and the notifications page instantly.</span>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-2xl bg-[#6C1D5F]/10 text-[#6C1D5F] flex items-center justify-center shadow-sm">
                <Sparkles size={16} />
              </div>
              <div>
                <h2 className="text-sm font-black text-slate-800">Live Preview</h2>
                <p className="text-[10px] text-slate-400 font-bold">How the notification will look in the student UI</p>
              </div>
            </div>

            <div className="rounded-3xl p-4 border border-slate-100 bg-slate-50/50 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#6C1D5F]/10 text-[#6C1D5F] flex items-center justify-center border border-[#6C1D5F]/10 flex-shrink-0">
                  {getNotificationIcon(previewNotification.type)}
                </div>
                <div className="flex-grow min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <span className="text-xs font-extrabold text-slate-800 leading-tight">{previewNotification.title}</span>
                    <span className="text-[9px] text-slate-400 font-bold flex-shrink-0">{previewNotification.time}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-semibold leading-relaxed mt-1">{previewNotification.description}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between gap-3 mb-4">
              <div>
                <h2 className="text-sm font-black text-slate-800">Recent Notifications</h2>
                <p className="text-[10px] text-slate-400 font-bold">Latest notifications in the shared feed</p>
              </div>
              <div className="px-2.5 py-1 rounded-full bg-[#6C1D5F]/10 text-[#6C1D5F] text-[10px] font-black">{notifications.length}</div>
            </div>

            <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
              {notifications.slice(0, 6).map((notif) => (
                <div key={notif.id} className="rounded-2xl border border-slate-100 bg-slate-50/50 p-3.5 hover:shadow-md transition-all duration-300">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-[#6C1D5F] flex-shrink-0">
                      {getNotificationIcon(notif.type)}
                    </div>
                    <div className="min-w-0 flex-grow">
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-[11px] font-extrabold text-slate-800 truncate">{notif.title}</span>
                        <span className="text-[9px] text-slate-400 font-bold">{notif.time}</span>
                      </div>
                      <p className="text-[10px] text-slate-400 font-semibold mt-1 leading-relaxed">{notif.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
