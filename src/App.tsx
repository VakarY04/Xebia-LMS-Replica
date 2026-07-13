import React from 'react';
import { useUIStore } from './store';
import { LandingPage } from './components/landing';
import { Sidebar, Dashboard, Notes, Sandbox, Batches, Assessments, Results, SettingsModal, MyCourses, Notifications, Feedback, ExploreCourses, Cart } from './components/student';
import { AdminSidebar, AdminDashboard, AdminSettingsModal, AdminCategories, AdminCreateCategory, AdminCourses, AdminCreateCourse, AdminNotifications } from './components/admin';
import { AdminCurriculum } from './components/admin/AdminCurriculum';
import { Menu, Search, Bell, Settings } from 'lucide-react';

const adminTabLabels: Record<string, string> = {
  dashboard: 'Dashboard',
  categories: 'Categories',
  courses: 'Courses',
  curriculum: 'Curriculum',
  notifications: 'Notifications',
  'analytics-overview': 'Analytics Overview',
  'analytics-reports': 'Analytics Reports',
};

const App: React.FC = () => {
  const {
    currentView,
    currentStudentTab,
    setCurrentStudentTab,
    currentAdminTab,
    setCurrentAdminTab,
    toggleSidebar,
    setIsSettingsOpen,
    setIsAdminSettingsOpen,
    notifications,
    markNotificationAsRead,
  } = useUIStore();

  const [isNotifOpen, setIsNotifOpen] = React.useState(false);
  const unreadCount = notifications.filter((notification) => !notification.isRead).length;

  const renderStudentContent = () => {
    switch (currentStudentTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'courses':
        return <MyCourses />;
      case 'explore':
        return <ExploreCourses />;
      case 'cart':
        return <Cart />;
      case 'batches':
        return <Batches />;
      case 'assessments':
        return <Assessments />;
      case 'results':
        return <Results />;
      case 'notifications':
        return <Notifications />;
      case 'feedback':
        return <Feedback />;
      case 'notes':
        return <Notes />;
      case 'sandbox':
        return <Sandbox />;
      default:
        return <Dashboard />;
    }
  };

  const renderAdminContent = () => {
    switch (currentAdminTab) {
      case 'dashboard':
        return <AdminDashboard />;
      case 'categories':
        return <AdminCategories />;
      case 'create-category':
        return <AdminCreateCategory />;
      case 'courses':
        return <AdminCourses />;
      case 'create-course':
        return <AdminCreateCourse />;
      case 'curriculum':
        return <AdminCurriculum />;
      case 'notifications':
        return <AdminNotifications />;
      case 'analytics-overview':
      case 'analytics-reports':
        return (
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm min-h-[300px] flex items-center justify-center">
            <span className="text-sm font-bold text-slate-400">Analytics suite is under construction.</span>
          </div>
        );
      default:
        return <AdminDashboard />;
    }
  };

  const currentAdminLabel = adminTabLabels[currentAdminTab] ?? currentAdminTab;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-xebia-darkGrey font-sans">
      {currentView === 'landing' ? (
        <LandingPage />
      ) : currentView === 'admin' ? (
        <div className="h-screen w-screen flex overflow-hidden">
          <AdminSidebar currentTab={currentAdminTab} onTabChange={setCurrentAdminTab} />

          <div className="flex-grow flex flex-col overflow-hidden">
            <header className="h-16 bg-white border-b border-xebia-lightGrey flex items-center justify-between px-6 flex-shrink-0">
              <div className="flex items-center gap-3">
                <button
                  onClick={toggleSidebar}
                  className="p-1.5 hover:bg-slate-100 rounded-lg text-[#4A1E47] transition-colors"
                >
                  <Menu size={20} />
                </button>
                <div className="h-4 w-[1px] bg-slate-200"></div>
                <div className="text-xs font-semibold text-slate-500 flex items-center gap-1.5 font-sans">
                  <span className="text-slate-500">Admin</span>
                  <span className="text-slate-400">&gt;</span>
                  {currentAdminTab === 'create-category' ? (
                    <>
                      <span className="text-slate-500 cursor-pointer hover:text-slate-700" onClick={() => setCurrentAdminTab('categories')}>Categories</span>
                      <span className="text-slate-400">&gt;</span>
                      <span className="text-slate-800 font-bold">Create</span>
                    </>
                  ) : currentAdminTab === 'create-course' ? (
                    <>
                      <span className="text-slate-500 cursor-pointer hover:text-slate-700" onClick={() => setCurrentAdminTab('courses')}>Courses</span>
                      <span className="text-slate-400">&gt;</span>
                      <span className="text-slate-800 font-bold">Create</span>
                    </>
                  ) : (
                    <span className="text-slate-800 font-bold">{currentAdminLabel}</span>
                  )}
                </div>
              </div>

              <div className="hidden md:flex items-center bg-white border border-[#6C1D5F]/50 rounded-full px-5 py-2 w-[450px] relative transition-all duration-200 focus-within:border-[#6C1D5F] focus-within:ring-1 focus-within:ring-[#6C1D5F] shadow-sm">
                <input
                  type="text"
                  placeholder="Search users, batches, courses, analytics..."
                  className="bg-transparent border-none text-xs w-full focus:outline-none text-slate-800 placeholder-slate-500 pr-6"
                />
                <Search size={16} className="text-[#6C1D5F] absolute right-5 pointer-events-none" />
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsAdminSettingsOpen(true)}
                  className="p-1.5 hover:bg-slate-100 rounded-xl text-slate-500 transition-colors"
                >
                  <Settings size={18} />
                </button>
              </div>
            </header>

            <main className="flex-1 overflow-y-auto bg-[#F7F8FC] p-6 md:p-8">
              <div className="max-w-7xl mx-auto font-sans">
                {renderAdminContent()}
              </div>
            </main>
          </div>
          <AdminSettingsModal />
        </div>
      ) : (
        <div className="h-screen w-screen flex overflow-hidden">
          <Sidebar currentTab={currentStudentTab} onTabChange={setCurrentStudentTab} />

          <div className="flex-grow flex flex-col overflow-hidden">
            <header className="h-16 bg-white border-b border-xebia-lightGrey flex items-center justify-between px-6 flex-shrink-0">
              <div className="flex items-center gap-3">
                <button
                  onClick={toggleSidebar}
                  className="p-1.5 hover:bg-slate-100 rounded-lg text-[#4A1E47] transition-colors"
                >
                  <Menu size={20} />
                </button>
                <div className="h-4 w-[1px] bg-slate-200"></div>
                <div className="text-xs font-semibold text-slate-500 flex items-center gap-1.5 font-sans">
                  <span className="text-slate-500">Student</span>
                  <span className="text-slate-400">&gt;</span>
                  <span className="text-slate-800 font-bold capitalize">{currentStudentTab}</span>
                </div>
              </div>

              <div className="hidden md:flex items-center bg-white border border-[#6C1D5F]/50 rounded-full px-5 py-2 w-[450px] relative transition-all duration-200 focus-within:border-[#6C1D5F] focus-within:ring-1 focus-within:ring-[#6C1D5F] shadow-sm">
                <input
                  type="text"
                  placeholder="Search courses, assessments, results..."
                  className="bg-transparent border-none text-xs w-full focus:outline-none text-slate-800 placeholder-slate-500 pr-6"
                />
                <Search size={16} className="text-[#6C1D5F] absolute right-5 pointer-events-none" />
              </div>

              <div className="flex items-center gap-3">
                <div className="relative">
                  <button
                    onClick={() => setIsNotifOpen((prev) => !prev)}
                    className="p-1.5 hover:bg-slate-100 rounded-xl text-slate-500 relative transition-colors"
                    aria-label="Toggle notifications dropdown"
                  >
                    <Bell size={18} />
                    {unreadCount > 0 && (
                      <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-xebia-orange rounded-full border border-white"></span>
                    )}
                  </button>

                  {isNotifOpen && (
                    <>
                      <div className="fixed inset-0 z-30" onClick={() => setIsNotifOpen(false)}></div>

                      <div className="absolute right-0 mt-3.5 w-[360px] bg-white border border-slate-100 rounded-3xl shadow-2xl z-40 p-5 overflow-hidden flex flex-col space-y-4 animate-in fade-in slide-in-from-top-3 duration-200">
                        <h3 className="text-sm font-extrabold text-slate-800 px-4">Notifications</h3>

                        <div className="flex flex-col space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
                          {notifications.slice(0, 3).map((notif) => {
                            const handleItemClick = () => {
                              if (!notif.isRead) {
                                markNotificationAsRead(notif.id);
                              }
                              setIsNotifOpen(false);
                              setCurrentStudentTab('notifications');
                            };

                            return (
                              <div
                                key={notif.id}
                                onClick={handleItemClick}
                                className={`px-4 py-3.5 rounded-2xl flex flex-col gap-1 cursor-pointer transition-all ${
                                  notif.isRead
                                    ? 'bg-white hover:bg-slate-50'
                                    : 'bg-[#6C1D5F]/5 hover:bg-[#6C1D5F]/10'
                                }`}
                              >
                                <div className="flex items-start justify-between gap-3">
                                  <span className={`text-xs font-bold leading-tight ${
                                    notif.isRead ? 'text-slate-800' : 'text-[#6C1D5F] font-extrabold'
                                  }`}>
                                    {notif.title}
                                  </span>
                                  <span className="text-[9px] text-slate-400 font-bold flex-shrink-0 mt-0.5">
                                    {notif.time}
                                  </span>
                                </div>
                                <p className="text-[11px] text-slate-400 font-semibold leading-relaxed">
                                  {notif.description}
                                </p>
                              </div>
                            );
                          })}
                        </div>

                        <button
                          onClick={() => {
                            setIsNotifOpen(false);
                            setCurrentStudentTab('notifications');
                          }}
                          className="w-full pt-3.5 border-t border-slate-100 text-center text-xs font-extrabold text-[#6C1D5F] hover:text-[#4A1E47] hover:underline transition-all"
                        >
                          View all notifications
                        </button>
                      </div>
                    </>
                  )}
                </div>

                <button
                  onClick={() => setIsSettingsOpen(true)}
                  className="p-1.5 hover:bg-slate-100 rounded-xl text-slate-500 transition-colors"
                >
                  <Settings size={18} />
                </button>
              </div>
            </header>

            <main className="flex-1 overflow-y-auto bg-[#F7F8FC] p-6 md:p-8">
              <div className="max-w-7xl mx-auto">
                {renderStudentContent()}
              </div>
            </main>
          </div>
        </div>
      )}
      <SettingsModal />
    </div>
  );
};

export default App;
