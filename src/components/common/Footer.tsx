import React from 'react';
import { Globe, Shield, HelpCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-xebia-purpleDark text-xebia-blueishGrey py-8 px-6 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm font-medium">
          © {new Date().getFullYear()} Xebia LMS. All rights reserved.
        </div>
        <div className="flex items-center gap-6 text-sm">
          <a href="#help" className="flex items-center gap-1.5 hover:text-xebia-orange transition-colors">
            <HelpCircle size={16} /> Help Center
          </a>
          <a href="#privacy" className="flex items-center gap-1.5 hover:text-xebia-orange transition-colors">
            <Shield size={16} /> Privacy Policy
          </a>
          <a href="#lang" className="flex items-center gap-1.5 hover:text-xebia-orange transition-colors">
            <Globe size={16} /> English (US)
          </a>
        </div>
      </div>
    </footer>
  );
};
