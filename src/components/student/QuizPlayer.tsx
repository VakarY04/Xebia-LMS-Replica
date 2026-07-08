import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle } from 'lucide-react';
import { useUIStore } from '../../store';

interface QuizPlayerProps {
  onBack: () => void;
}

interface Question {
  text: string;
  options: string[];
  correctAnswer: number;
}

const QUESTIONS: Question[] = [
  {
    text: "What is the primary purpose of a Virtual DOM in modern frontend frameworks like React?",
    options: [
      "To directly manipulate the browser's DOM for better performance",
      "To create an in-memory representation of the UI and calculate minimal updates",
      "To store data securely on the client-side",
      "To manage server-side rendering logic"
    ],
    correctAnswer: 1
  },
  {
    text: "Which React hook should be used to memoize the result of an expensive computation?",
    options: [
      "useCallback",
      "useEffect",
      "useMemo",
      "useRef"
    ],
    correctAnswer: 2
  },
  {
    text: "What is the correct way to pass a ref to a child component in React 19?",
    options: [
      "Using the forwardRef wrapper around the child component",
      "Passing it directly as a standard 'ref' prop like any other prop",
      "Using the useImperativeHandle hook exclusively",
      "Using the legacy findDOMNode method"
    ],
    correctAnswer: 1
  },
  {
    text: "What is the function of the 'key' prop in React lists?",
    options: [
      "To uniquely identify elements and help React determine which items have changed, been added, or been removed",
      "To apply dynamic CSS styles to list items based on indices",
      "To bind click event handlers to list elements in a performant way",
      "To persist data across page reloads by saving state to localStorage"
    ],
    correctAnswer: 0
  },
  {
    text: "Which React 19 hook is specifically designed to manage async action states and handle pending states automatically?",
    options: [
      "useTransition",
      "useActionState",
      "useDeferredValue",
      "useOptimistic"
    ],
    correctAnswer: 1
  }
];

export const QuizPlayer: React.FC<QuizPlayerProps> = ({ onBack }) => {
  const { addQuizResult, setCurrentStudentTab } = useUIStore();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  
  // Timer state (45 minutes = 2700 seconds)
  const [timeLeft, setTimeLeft] = useState(2700);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (optIdx: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentIdx]: optIdx
    }));
  };

  const handleNext = () => {
    if (currentIdx < QUESTIONS.length - 1) {
      setCurrentIdx(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    // Prevent double submission
    if (isSubmitted) return;

    setIsSubmitted(true);

    // Calculate score
    let correctCount = 0;
    QUESTIONS.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswer) {
        correctCount++;
      }
    });

    const score = correctCount * 20; // 20 points per question
    
    // Add result to store
    addQuizResult({
      id: `react-final-${Date.now()}`,
      title: 'React Final Exam',
      subject: 'ADVANCED REACT & NEXT.JS',
      date: new Date().toISOString().split('T')[0],
      score: score,
      maxScore: 100,
      grade: score >= 90 ? 'A+' : score >= 80 ? 'A' : score >= 70 ? 'B+' : score >= 60 ? 'B' : 'C'
    });

    // Auto-redirect after 3 seconds
    setTimeout(() => {
      onBack(); // Clear quiz player state
      setCurrentStudentTab('results');
    }, 3000);
  };

  const attemptedCount = Object.keys(selectedAnswers).length;
  const unattemptedCount = QUESTIONS.length - attemptedCount;

  // Redirection screen
  if (isSubmitted) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-slate-50/50 p-6">
        <div className="space-y-6 text-center max-w-md">
          {/* Green check container */}
          <div className="w-24 h-24 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center shadow-inner border border-emerald-100 mx-auto select-none">
            <CheckCircle size={44} />
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Assessment Submitted</h1>
            <p className="text-slate-400 font-semibold text-sm">Your answers have been saved securely.</p>
          </div>

          <p className="text-[#6C1D5F] font-bold text-sm animate-pulse tracking-wide pt-4">
            Redirecting to Results...
          </p>
        </div>
      </div>
    );
  }

  const currentQuestion = QUESTIONS[currentIdx];

  return (
    <div className="space-y-6">
      {/* Quiz Header Bar */}
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">React Final Exam</h1>
          <p className="text-slate-400 font-bold text-xs uppercase tracking-wider">ID: a2</p>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Time Remaining</span>
            <div className="flex items-center gap-1.5 text-slate-800 font-black text-2xl mt-0.5">
              <Clock size={20} className="text-slate-500" />
              <span>{formatTime(timeLeft)}</span>
            </div>
          </div>

          <button 
            onClick={handleSubmit}
            className="bg-[#01AC9F] hover:bg-[#0d9488] text-white font-bold px-6 py-3 rounded-2xl text-sm shadow-md hover:shadow-lg transition-all active:scale-95 flex-shrink-0"
          >
            Submit Now
          </button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Question Card */}
        <div className="lg:col-span-9 bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden flex flex-col min-h-[500px]">
          {/* Progress Indicator line */}
          <div className="h-1 w-full bg-slate-100 relative">
            <div 
              className="absolute left-0 top-0 h-1 bg-[#6C1D5F] rounded-r-full transition-all duration-300"
              style={{ width: `${((currentIdx + 1) / QUESTIONS.length) * 100}%` }}
            ></div>
          </div>

          {/* Question Box */}
          <div className="p-6 md:p-8 flex-grow space-y-6">
            <span className="px-3 py-1.5 bg-purple-50 text-[#6C1D5F] border border-purple-100 rounded-xl text-[10px] font-black tracking-widest uppercase select-none inline-block">
              Question {currentIdx + 1} of {QUESTIONS.length}
            </span>

            <h2 className="text-xl md:text-2xl font-black text-slate-800 leading-snug">
              {currentQuestion.text}
            </h2>

            {/* Answer Choices */}
            <div className="space-y-3.5 pt-4">
              {currentQuestion.options.map((option, oIdx) => {
                const isSelected = selectedAnswers[currentIdx] === oIdx;
                return (
                  <button 
                    key={oIdx}
                    onClick={() => handleSelectOption(oIdx)}
                    className={`w-full p-4 md:p-5 rounded-2xl border text-left flex items-start gap-4 transition-all duration-150 ${
                      isSelected 
                        ? 'border-[#6C1D5F] bg-[#6C1D5F]/5 text-slate-800 font-extrabold ring-1 ring-[#6C1D5F]'
                        : 'border-slate-200 hover:border-[#6C1D5F] hover:bg-[#6C1D5F]/5 text-slate-600 font-semibold'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full border-2 mt-0.5 flex items-center justify-center flex-shrink-0 transition-all ${
                      isSelected ? 'border-[#6C1D5F]' : 'border-slate-300'
                    }`}>
                      {isSelected && (
                        <div className="w-2.5 h-2.5 rounded-full bg-[#6C1D5F] animate-in zoom-in-50 duration-100"></div>
                      )}
                    </div>
                    <span className="text-sm leading-tight">{option}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Question Card Footer */}
          <div className="px-6 md:px-8 py-5 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between flex-shrink-0">
            <button 
              onClick={handlePrev}
              disabled={currentIdx === 0}
              className={`font-extrabold text-sm flex items-center gap-1.5 transition-colors select-none ${
                currentIdx === 0 
                  ? 'text-slate-300 cursor-not-allowed'
                  : 'text-slate-400 hover:text-slate-700'
              }`}
            >
              Previous
            </button>
            <button 
              onClick={handleNext}
              className="bg-slate-950 hover:bg-slate-800 text-white font-extrabold px-6 py-2.5 rounded-xl text-sm flex items-center gap-1 transition-all active:scale-95 shadow"
            >
              {currentIdx === QUESTIONS.length - 1 ? 'Finish' : 'Next'}
            </button>
          </div>
        </div>

        {/* Right Column: Numbers list & legend */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 space-y-6">
            <h3 className="text-sm font-extrabold text-slate-800">Questions</h3>

            {/* Numbers Grid */}
            <div className="grid grid-cols-4 gap-3">
              {QUESTIONS.map((_, idx) => {
                const isCurrent = idx === currentIdx;
                const isAttempted = selectedAnswers[idx] !== undefined;

                return (
                  <button
                    key={idx}
                    onClick={() => setCurrentIdx(idx)}
                    className={`aspect-square w-full rounded-2xl flex items-center justify-center text-xs font-black transition-all ${
                      isCurrent 
                        ? 'ring-2 ring-slate-800 border-[#6C1D5F] bg-[#6C1D5F] text-white shadow-sm'
                        : isAttempted
                          ? 'bg-[#6C1D5F] text-white'
                          : 'border border-slate-200 text-slate-400 hover:border-slate-300'
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            <hr className="border-slate-100" />

            {/* Legend section */}
            <div className="space-y-3 font-semibold text-xs text-slate-500">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#6C1D5F]"></div>
                  <span>Attempted</span>
                </div>
                <span className="font-extrabold text-slate-800">{attemptedCount}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full border-2 border-slate-300 bg-white"></div>
                  <span>Unattempted</span>
                </div>
                <span className="font-extrabold text-slate-800">{unattemptedCount}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
