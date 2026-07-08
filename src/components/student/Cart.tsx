import React, { useState } from 'react';
import { ShoppingCart, Trash2, CreditCard, ArrowRight, CheckCircle, HelpCircle } from 'lucide-react';
import { useUIStore } from '../../store';

export const Cart: React.FC = () => {
  const { cart, removeFromCart, checkoutCart, setCurrentStudentTab } = useUIStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Parse prices and calculate order totals
  const subtotal = cart.reduce((acc, item) => {
    if (item.type === 'Free') return acc;
    const num = parseInt(item.price.replace(/[^\d]/g, '') || '0', 10);
    return acc + num;
  }, 0);

  const gst = Math.round(subtotal * 0.18);
  const total = subtotal + gst;

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setIsLoading(true);

    // Simulate payment gateway loading delay
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      checkoutCart(); // Enrolls the student in these courses and empties the cart

      // Auto redirect to My Courses tab after 2.5 seconds
      setTimeout(() => {
        setIsSuccess(false);
        setCurrentStudentTab('courses');
      }, 2500);
    }, 1800);
  };

  return (
    <div className="p-8 space-y-8 overflow-y-auto h-full bg-slate-50/50 relative">
      
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-[2px] z-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-2xl flex flex-col items-center gap-4 text-center max-w-sm mx-4 animate-in zoom-in-95 duration-200">
            <div className="w-12 h-12 border-4 border-[#6C1D5F] border-t-transparent rounded-full animate-spin"></div>
            <div>
              <h3 className="text-base font-extrabold text-slate-800">Processing Payment</h3>
              <p className="text-xs text-slate-400 font-semibold mt-1">Connecting to secure gateway. Please do not close this window...</p>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {isSuccess && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-[2px] z-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-3xl border border-emerald-100 shadow-2xl flex flex-col items-center gap-4 text-center max-w-sm mx-4 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center shadow-inner">
              <CheckCircle size={36} />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-slate-800">Payment Successful!</h3>
              <p className="text-xs text-slate-400 font-semibold mt-1.5">
                Your courses have been unlocked successfully. Redirecting to My Courses...
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Page Header */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-purple-50 text-[#6C1D5F] flex items-center justify-center shadow-sm">
          <ShoppingCart size={22} />
        </div>
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Shopping Cart</h1>
          <p className="text-slate-500 text-sm font-semibold">
            Review and purchase your selected courses
          </p>
        </div>
      </div>

      {cart.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Left Column: Cart Items List */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div 
                key={item.id}
                className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex flex-col sm:flex-row items-center gap-4 hover:shadow-md hover:border-slate-200 transition-all duration-300 relative group"
              >
                {/* Thumbnail */}
                <div className="w-28 h-18 rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 flex-shrink-0 relative">
                  {item.image ? (
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className={`w-full h-full bg-gradient-to-br ${item.gradient} flex items-center justify-center p-2 text-center text-white text-[10px] font-bold select-none`}>
                      {item.title}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-grow min-w-0 space-y-1 text-center sm:text-left">
                  <span className="text-[#6C1D5F] font-bold text-[9px] uppercase tracking-wider block">
                    {item.category}
                  </span>
                  <h3 className="text-sm font-bold text-slate-800 truncate pr-6">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-semibold">
                    Trainer: <span className="text-slate-600">{item.trainer}</span> • Level: <span className="text-slate-600">{item.level}</span>
                  </p>
                </div>

                {/* Price & Delete Action */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-4 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0 flex-shrink-0">
                  <span className={`font-black text-sm px-3.5 py-1.5 rounded-2xl ${
                    item.type === 'Paid' ? 'bg-[#6C1D5F]/10 text-[#6C1D5F]' : 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                  }`}>
                    {item.price}
                  </span>
                  
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all cursor-pointer"
                    title="Remove from Cart"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Checkout Summary Sheet */}
          <div className="bg-white rounded-3xl border border-[#6C1D5F] shadow-sm overflow-hidden p-6 md:p-8 space-y-6 hover:shadow-lg transition-all duration-300 relative">
            <h3 className="text-base font-extrabold text-slate-800 pb-4 border-b border-slate-100">Order Summary</h3>

            {/* Calculations List */}
            <div className="space-y-4 text-xs font-semibold text-slate-500">
              <div className="flex justify-between items-center">
                <span>Courses Count</span>
                <span className="text-slate-800 font-bold">{cart.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Subtotal</span>
                <span className="text-slate-800 font-bold">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-1">
                  GST (18% tax)
                  <HelpCircle size={12} className="text-slate-400" />
                </span>
                <span className="text-slate-800 font-bold">₹{gst.toLocaleString('en-IN')}</span>
              </div>
              <div className="pt-4 border-t border-slate-100 flex justify-between items-center text-sm font-extrabold">
                <span className="text-slate-800">Total Price</span>
                <span className="text-[#6C1D5F] text-base">₹{total.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Payment Details Form Warning */}
            <div className="bg-slate-50 rounded-2xl p-4 text-[10px] text-slate-400 font-semibold leading-relaxed">
              By clicking "Make Payment", you agree to enroll in the courses instantly. The total will be deducted simulation-style and course playback starts immediately.
            </div>

            {/* Checkout Trigger button */}
            <button
              onClick={handlePayment}
              className="w-full py-4 rounded-2xl bg-[#6C1D5F] hover:bg-[#4A1E47] text-white text-xs font-black flex items-center justify-center gap-2 shadow hover:shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <CreditCard size={14} />
              Make Payment
              <ArrowRight size={12} className="ml-1 animate-pulse" />
            </button>
          </div>

        </div>
      ) : (
        <div className="bg-white p-12 rounded-3xl border border-slate-100 text-center space-y-5 shadow-sm max-w-xl mx-auto">
          <div className="w-16 h-16 rounded-full bg-purple-50 text-[#6C1D5F] flex items-center justify-center mx-auto shadow-sm">
            <ShoppingCart size={28} />
          </div>
          <div className="space-y-1.5">
            <h3 className="text-base font-extrabold text-slate-800">Your Cart is Empty</h3>
            <p className="text-slate-400 text-xs font-semibold">
              Browse through our premium courses to fill your roster.
            </p>
          </div>
          <button
            onClick={() => setCurrentStudentTab('explore')}
            className="px-6 py-3 rounded-2xl bg-[#6C1D5F] hover:bg-[#4A1E47] text-white text-xs font-bold transition-all shadow cursor-pointer inline-flex items-center gap-1.5"
          >
            Explore Courses
            <ArrowRight size={12} />
          </button>
        </div>
      )}

    </div>
  );
};
