import React, { useState, useRef, useEffect } from 'react';
import { X, Camera } from 'lucide-react';
import { useUIStore } from '../../store';

export const AdminSettingsModal: React.FC = () => {
  const {
    adminName,
    adminEmail,
    adminRole,
    adminAvatar,
    isAdminSettingsOpen,
    setIsAdminSettingsOpen,
    setAdminInfo,
  } = useUIStore();

  const [name, setName] = useState(adminName);
  const [avatar, setAvatar] = useState(adminAvatar);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Keep state in sync with store when modal opens
  useEffect(() => {
    if (isAdminSettingsOpen) {
      setName(adminName);
      setAvatar(adminAvatar);
      setError(null);
    }
  }, [isAdminSettingsOpen, adminName, adminAvatar]);

  if (!isAdminSettingsOpen) return null;

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      setError('Image size exceeds 2MB limit.');
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file (JPG or PNG).');
      return;
    }

    setError(null);
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        setAvatar(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const trimmedName = name.trim();

    if (!trimmedName) {
      setError('Full Name is required.');
      return;
    }

    // Save changes to store
    setAdminInfo({
      name: trimmedName,
      avatar: avatar,
    });

    setIsAdminSettingsOpen(false);
  };

  const handleCancel = () => {
    setIsAdminSettingsOpen(false);
  };

  const getInitial = () => {
    return name.trim().charAt(0).toUpperCase() || 'A';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop overlay */}
      <div 
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={handleCancel}
      ></div>

      {/* Modal card */}
      <div className="bg-white rounded-3xl w-full max-w-[480px] shadow-2xl relative z-10 overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in duration-200">
        
        {/* Modal Header */}
        <div className="px-6 pt-6 pb-2 flex items-center justify-between border-b border-slate-50 flex-shrink-0">
          <h2 className="text-xl font-bold text-slate-800">Account Settings</h2>
          <button 
            onClick={handleCancel}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all"
            aria-label="Close settings"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 md:px-8 space-y-6">
          
          {/* Avatar Section */}
          <div className="flex flex-col items-center">
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              accept="image/png, image/jpeg, image/jpg" 
              className="hidden" 
            />
            
            <div 
              onClick={handleAvatarClick}
              className="w-24 h-24 rounded-full flex items-center justify-center relative cursor-pointer group shadow-inner border border-slate-100 bg-[#4A1E47] text-white text-4xl font-extrabold select-none overflow-hidden transition-all duration-300 hover:scale-105 hover:ring-2 hover:ring-[#4A1E47]/30"
              title="Click to change photo"
            >
              {avatar ? (
                <img 
                  src={avatar} 
                  alt="Admin Avatar" 
                  className="w-full h-full object-cover" 
                />
              ) : (
                <span>{getInitial()}</span>
              )}
              {/* Hover Camera Overlay */}
              <div className="absolute inset-0 bg-black/45 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <Camera size={20} className="text-white mb-1" />
                <span className="text-[9px] text-white font-bold uppercase tracking-wider">Upload</span>
              </div>
            </div>
            
            <p className="text-[11px] text-slate-400 font-semibold mt-3 tracking-wide">
              Max size 2MB (JPG, PNG)
            </p>
          </div>

          {/* Validation Error Message */}
          {error && (
            <div className="bg-red-50 text-red-600 text-xs px-4 py-2.5 rounded-xl border border-red-100 font-semibold">
              {error}
            </div>
          )}

          {/* Inputs Section */}
          <div className="space-y-4">
            {/* Full Name (Editable) */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Full Name
              </label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter full name"
                className="w-full bg-[#F8F9FD] border border-slate-100 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:bg-white focus:border-[#4A1E47] focus:ring-1 focus:ring-[#4A1E47] transition-all font-semibold shadow-sm"
                required
              />
            </div>

            {/* Email Address (Read-only / Disabled) */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Email Address
              </label>
              <input 
                type="email" 
                value={adminEmail}
                disabled
                readOnly
                className="w-full bg-[#F3F4F6] border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-500 font-semibold shadow-sm cursor-not-allowed select-none"
              />
            </div>

            {/* Role (Read-only / Disabled) */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Role
              </label>
              <input 
                type="text" 
                value={adminRole}
                disabled
                readOnly
                className="w-full bg-[#F3F4F6] border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-500 font-semibold shadow-sm cursor-not-allowed select-none"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-50 flex-shrink-0">
            <button 
              type="button" 
              onClick={handleCancel}
              className="px-5 py-2.5 text-sm font-bold text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-xl transition-all"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="px-5 py-2.5 text-sm font-bold text-white bg-[#6C1D5F] hover:bg-[#4A1E47] rounded-xl shadow-md hover:shadow-lg transition-all active:scale-95"
            >
              Save Changes
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
