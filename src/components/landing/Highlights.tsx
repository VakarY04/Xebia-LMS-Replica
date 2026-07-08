import React from 'react';
import { Terminal, Cpu, Users, BarChart } from 'lucide-react';
import { CustomCard } from '../common/CustomCards';

export const Highlights: React.FC = () => {
  return (
    <section className="bg-xebia-blueishGrey py-16 px-6 border-y border-xebia-lightGrey">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-xebia-purpleDark mb-4">
            Platform Highlights
          </h2>
          <p className="text-xebia-darkGrey max-w-xl mx-auto text-sm md:text-base">
            Discover the powerful features designed to make modern engineering education interactive, immersive, and effective.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <CustomCard
            title="Interactive Code Sandbox"
            description="Run full-stack projects in the browser without setup hurdles. Supports Node.js, Python, and frontend frameworks."
            icon={<Terminal size={28} className="text-xebia-orange" />}
          />
          <CustomCard
            title="AI-Powered Assessment"
            description="Get instant, actionable feedback on code quality, performance issues, and architectural alignment."
            icon={<Cpu size={28} />}
          />
          <CustomCard
            title="Peer Coding Sessions"
            description="Collaborate in real-time on group assignments or pair-programming challenges via split-screen web IDEs."
            icon={<Users size={28} />}
          />
          <CustomCard
            title="Performance Dashboards"
            description="Track your strengths, identify skills gaps, and get personalized course recommendations to speed up your growth."
            icon={<BarChart size={28} />}
          />
        </div>
      </div>
    </section>
  );
};
