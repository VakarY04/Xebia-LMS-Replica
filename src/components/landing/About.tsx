import React from 'react';
import { Target, Compass, Award } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section className="py-16 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-extrabold text-xebia-purpleDark mb-6 leading-tight">
            Empowering the Next Generation of Global Tech Leaders
          </h2>
          <p className="text-xebia-darkGrey mb-6 leading-relaxed">
            At Xebia LMS, we build educational systems for the modern developer. We understand that software engineering isn't just about reading documentation—it's about coding, breaking, deploying, and building.
          </p>
          <p className="text-xebia-darkGrey leading-relaxed">
            Our ecosystem integrates high-fidelity code environments, comprehensive courseware, and peer collaboration frameworks into a singular dashboard. Whether you're an individual learner or a corporate training officer, we provide the tools to sustain continuous technical excellence.
          </p>
        </div>
        <div className="space-y-6">
          <div className="flex gap-4 p-4 rounded-xl hover:bg-white border border-transparent hover:border-xebia-lightGrey transition-all duration-200">
            <div className="flex-shrink-0 text-xebia-emerald">
              <Target size={24} />
            </div>
            <div>
              <h4 className="text-base font-bold text-xebia-purpleDark mb-1">Our Mission</h4>
              <p className="text-xebia-darkGrey text-sm">To democratize top-tier technical curriculum and hands-on coding sandboxes globally.</p>
            </div>
          </div>
          <div className="flex gap-4 p-4 rounded-xl hover:bg-white border border-transparent hover:border-xebia-lightGrey transition-all duration-200">
            <div className="flex-shrink-0 text-xebia-orange">
              <Compass size={24} />
            </div>
            <div>
              <h4 className="text-base font-bold text-xebia-purpleDark mb-1">Industry-Driven Paths</h4>
              <p className="text-xebia-darkGrey text-sm">Designed alongside senior architects and consultants from Xebia Group.</p>
            </div>
          </div>
          <div className="flex gap-4 p-4 rounded-xl hover:bg-white border border-transparent hover:border-xebia-lightGrey transition-all duration-200">
            <div className="flex-shrink-0 text-xebia-purple">
              <Award size={24} />
            </div>
            <div>
              <h4 className="text-base font-bold text-xebia-purpleDark mb-1">Verified Credentials</h4>
              <p className="text-xebia-darkGrey text-sm">Gain shareable digital badges and certificates recognized by leading global enterprises.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
