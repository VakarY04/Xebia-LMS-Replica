import React from 'react';
import { Menu, User, BookOpen } from 'lucide-react';

export const Navbar: React.FC = () => {
  return (
    <nav className="bg-xebia-purple text-white px-6 py-4 flex items-center justify-between shadow-md">
      <div className="flex items-center gap-2 font-semibold text-xl tracking-tight">
        <BookOpen className="text-xebia-emerald" size={24} />
        <span>
          <span className="text-xebia-orange font-bold">Xebia</span> LMS
        </span>
      </div>
      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-xebia-purpleDark rounded-full transition-colors duration-200">
          <Menu size={20} />
        </button>
        <button className="p-2 hover:bg-xebia-purpleDark rounded-full transition-colors duration-200">
          <User size={20} />
        </button>
      </div>
    </nav>
  );
};
