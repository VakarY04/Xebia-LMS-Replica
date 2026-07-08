import React, { useState } from 'react';
import { 
  MessageSquare, 
  Star, 
  Send, 
  CheckCircle,
  ChevronDown
} from 'lucide-react';

export const Feedback: React.FC = () => {
  const [course, setCourse] = useState('');
  const [trainerName, setTrainerName] = useState('');
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [detailedFeedback, setDetailedFeedback] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const isValid = 
    course !== '' && 
    course !== 'Choose a course...' &&
    trainerName.trim() !== '' && 
    rating > 0 && 
    detailedFeedback.trim() !== '';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid || isLoading) return;

    setIsLoading(true);
    setIsSuccess(false);

    // Mock network request delay of 1.5 seconds
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      
      // Clear all form fields
      setCourse('');
      setTrainerName('');
      setRating(0);
      setDetailedFeedback('');

      // Dismiss success banner after 4 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 4000);
    }, 1500);
  };

  const getRatingLabel = (val: number) => {
    switch (val) {
      case 1: return 'Poor';
      case 2: return 'Fair';
      case 3: return 'Good';
      case 4: return 'Very Good';
      case 5: return 'Excellent!';
      default: return 'Rate the course';
    }
  };

  const activeRating = hoveredRating || rating;

  return (
    <div className="p-8 overflow-y-auto h-full bg-slate-50/50 relative flex flex-col items-center">
      <div className="w-full max-w-2xl space-y-8 flex flex-col">
        
        {/* Success Toast Banner */}
        {isSuccess && (
          <div className="fixed bottom-6 right-6 z-50 bg-emerald-50 border border-emerald-100 text-emerald-800 rounded-3xl p-5 shadow-2xl flex items-center gap-3.5 animate-in slide-in-from-bottom-5 duration-300 max-w-sm">
            <div className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center shadow-inner flex-shrink-0">
              <CheckCircle size={22} />
            </div>
            <div>
              <h4 className="text-sm font-extrabold leading-tight text-slate-800">Feedback Submitted</h4>
              <p className="text-xs text-slate-400 font-semibold mt-0.5">Your feedback has been saved successfully.</p>
            </div>
          </div>
        )}

        {/* Page Header (Left-aligned to content card) */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-[#6C1D5F] flex items-center justify-center shadow-sm flex-shrink-0">
            <MessageSquare size={22} />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Submit Feedback</h1>
            <p className="text-slate-500 text-sm font-semibold mt-0.5">
              Help us improve by sharing your learning experience
            </p>
          </div>
        </div>

        {/* Main Feedback Form Box (Centered max-w-2xl width & hoverable lift effects) */}
        <div className="bg-white rounded-3xl border border-[#6C1D5F] shadow-sm overflow-hidden w-full relative hover:shadow-lg hover:-translate-y-1 hover:border-[#4A1E47] transition-all duration-300 ease-in-out">
          
          {/* Loading Spinner Screen */}
          {isLoading && (
            <div className="absolute inset-0 bg-white/80 z-20 flex flex-col items-center justify-center gap-3 select-none backdrop-blur-[1px]">
              <div className="w-10 h-10 border-4 border-[#6C1D5F] border-t-transparent rounded-full animate-spin"></div>
              <span className="text-sm font-bold text-slate-600">Submitting your feedback...</span>
            </div>
          )}

          {/* Card Header Strip */}
          <div className="bg-slate-50/80 px-6 py-5 border-b border-slate-100/50">
            <h3 className="text-base font-extrabold text-slate-800 leading-tight">Course & Trainer Feedback</h3>
            <p className="text-slate-400 text-xs font-semibold mt-0.5">
              All feedback is anonymous and used solely for improvement.
            </p>
          </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
          
          {/* Success message inline notice */}
          {isSuccess && (
            <div className="bg-emerald-50/50 border border-emerald-100 text-emerald-700 p-4 rounded-2xl flex items-center gap-3 text-sm font-bold animate-in fade-in duration-200">
              <CheckCircle size={18} className="text-emerald-500 flex-shrink-0" />
              <span>Feedback submitted successfully! Thank you for your input.</span>
            </div>
          )}

          {/* Row 1: Select Course & Trainer */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Dropdown Input wrapper */}
            <div className="space-y-2 text-left">
              <label htmlFor="course-select" className="text-xs font-extrabold text-slate-700">Select Course</label>
              <div className="relative">
                <select
                  id="course-select"
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-white text-sm text-slate-800 hover:border-[#4A1E47] hover:ring-1 hover:ring-[#4A1E47] focus:outline-none focus:border-[#6C1D5F] focus:ring-1 focus:ring-[#6C1D5F] transition-all appearance-none cursor-pointer pr-10 shadow-sm relative font-semibold"
                >
                  <option value="">Choose a course...</option>
                  <option value="Advanced React & Next.js">Advanced React & Next.js</option>
                  <option value="Enterprise Architecture Patterns">Enterprise Architecture Patterns</option>
                  <option value="UI/UX Design for Developers">UI/UX Design for Developers</option>
                </select>
                <ChevronDown size={16} className="text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Trainer Input wrapper */}
            <div className="space-y-2 text-left">
              <label htmlFor="trainer-input" className="text-xs font-extrabold text-slate-700">Trainer Name</label>
              <input
                id="trainer-input"
                type="text"
                value={trainerName}
                onChange={(e) => setTrainerName(e.target.value)}
                placeholder="e.g. Sarah Drasner"
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-white text-sm text-slate-800 hover:border-[#4A1E47] hover:ring-1 hover:ring-[#4A1E47] focus:outline-none focus:border-[#6C1D5F] focus:ring-1 focus:ring-[#6C1D5F] transition-all placeholder-slate-400 shadow-sm font-semibold"
              />
            </div>

          </div>

          {/* Row 2: Star Rating */}
          <div className="space-y-2 text-left">
            <span className="text-xs font-extrabold text-slate-700 block">Overall Rating</span>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((starVal) => {
                  const isActive = starVal <= activeRating;
                  return (
                    <button
                      key={starVal}
                      type="button"
                      onClick={() => setRating(starVal)}
                      onMouseEnter={() => setHoveredRating(starVal)}
                      onMouseLeave={() => setHoveredRating(0)}
                      className="p-1 hover:scale-110 transition-transform cursor-pointer"
                      aria-label={`Rate ${starVal} Star`}
                    >
                      <Star
                        size={30}
                        className={`transition-colors duration-150 ${
                          isActive 
                            ? 'fill-[#FF6200] stroke-[#FF6200]' 
                            : 'fill-transparent stroke-slate-300 hover:stroke-slate-400'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
              
              <span className={`text-xs font-bold transition-all duration-200 ${
                rating > 0 ? 'text-[#FF6200] font-extrabold' : 'text-slate-400'
              }`}>
                {getRatingLabel(activeRating || rating)}
              </span>
            </div>
          </div>

          {/* Row 3: Detailed Feedback Text Area */}
          <div className="space-y-2 text-left">
            <label htmlFor="feedback-text" className="text-xs font-extrabold text-slate-700">Detailed Feedback</label>
            <textarea
              id="feedback-text"
              value={detailedFeedback}
              onChange={(e) => setDetailedFeedback(e.target.value)}
              placeholder="What did you like? What could be improved?"
              className="w-full px-4 py-4 rounded-2xl border border-slate-200 bg-white text-sm text-slate-800 hover:border-[#4A1E47] hover:ring-1 hover:ring-[#4A1E47] focus:outline-none focus:border-[#6C1D5F] focus:ring-1 focus:ring-[#6C1D5F] transition-all placeholder-slate-400 min-h-[140px] shadow-sm font-semibold leading-relaxed"
            />
          </div>

          {/* Bottom Row: Submit button */}
          <div className="flex justify-end pt-4 border-t border-slate-50">
            <button
              type="submit"
              disabled={!isValid || isLoading}
              className={`px-6 py-3.5 rounded-2xl text-xs font-black flex items-center justify-center gap-2 transition-all duration-300 ${
                isValid && !isLoading
                  ? 'bg-[#6C1D5F] hover:bg-[#4A1E47] text-white cursor-pointer active:scale-95 shadow hover:shadow-md'
                  : 'bg-[#cbd5e1] text-[#94a3b8] cursor-not-allowed'
              }`}
            >
              <Send size={13} />
              Submit Feedback
            </button>
          </div>

        </form>
      </div>
    </div>
    </div>
  );
};
