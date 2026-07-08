import React from 'react';
import { ArrowRight, Star } from 'lucide-react';
import { Button } from '../common/Button';

export const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-tr from-xebia-purpleDark via-xebia-purple to-xebia-purpleBright text-white py-20 px-6">
      <div className="absolute top-0 right-0 w-96 h-96 bg-xebia-emerald opacity-10 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-xebia-orange opacity-10 blur-3xl rounded-full"></div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-1.5 bg-white/10 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-6 backdrop-blur-md">
          <Star className="text-xebia-orange fill-xebia-orange" size={14} />
          Accelerating Digital Excellence
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
          Next-Generation Learning for{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-xebia-orange to-xebia-emerald">
            Future Leaders
          </span>
        </h1>
        <p className="text-lg md:text-xl text-xebia-mediumGrey max-w-2xl mx-auto mb-10 leading-relaxed">
          Master cloud, DevOps, Agile, and cutting-edge software engineering with interactive learning portals and hands-on developer sandboxes.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button variant="secondary" rightIcon={<ArrowRight size={18} />}>
            Explore Portals
          </Button>
          <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
};
