import React from 'react';
import { GraduationCap, Award, Briefcase, Zap } from 'lucide-react';
import { ActionCard } from '../common/CustomCards';

export const Portals: React.FC = () => {
  return (
    <section className="py-16 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-extrabold text-xebia-purpleDark mb-4">
          Tailored Learning Portals
        </h2>
        <p className="text-xebia-darkGrey max-w-xl mx-auto text-sm md:text-base">
          Choose your gateway to specialized learning tracks built to bridge the gap between academic knowledge and industry expectations.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ActionCard
          title="Student Portal"
          description="Access your curriculum, view progress, complete assignments, and launch sandbox labs."
          icon={<GraduationCap size={24} />}
          actionText="Enter Portal"
        />
        <ActionCard
          title="Instructor Hub"
          description="Manage cohorts, evaluate sandbox submissions, host live lectures, and review student analytical reports."
          icon={<Zap size={24} />}
          actionText="Enter Hub"
        />
        <ActionCard
          title="Enterprise Suite"
          description="Customize training paths, manage corporate licensing, and monitor employee upskilling metrics."
          icon={<Briefcase size={24} />}
          actionText="Enter Suite"
        />
        <ActionCard
          title="Certifications"
          description="Prepare for industry exams, verify credentials, and export verified digital badges."
          icon={<Award size={24} />}
          actionText="View Badge"
        />
      </div>
    </section>
  );
};
