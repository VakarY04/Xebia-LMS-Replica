import { create } from 'zustand';
import javaCard from '../assets/java_course_card.png';
import pythonCard from '../assets/python_course_card.png';

export interface Course {
  id: number;
  title: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  status: 'Not Started' | 'In Progress' | 'Completed';
  progress: number;
  duration: string;
  description: string;
  image: string;
  isFavorite: boolean;
}

export interface ExploreCourse {
  id: string;
  title: string;
  description: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  trainer: string;
  price: string;
  type: 'Free' | 'Paid';
  gradient: string;
  image?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  iconType: 'emoji' | 'image';
  accentColor: string;
  status: 'Active' | 'Inactive';
  coursesCount: number;
}

export interface AdminCourse {
  id: string;
  title: string;
  slug: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  category: string;
  status: 'Published' | 'Draft' | 'Active' | 'Inactive';
  enrollmentsCount: number;
  image?: string;
  accentColor: string;
  isFavorite?: boolean;
}

interface UIState {
  currentView: 'landing' | 'student' | 'admin';
  setCurrentView: (view: 'landing' | 'student' | 'admin') => void;
  currentStudentTab: string;
  setCurrentStudentTab: (tab: string) => void;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  // Student Profile Settings
  studentName: string;
  studentEmail: string;
  studentUniversity: string;
  studentAvatar: string;
  isSettingsOpen: boolean;
  setStudentInfo: (info: { name: string; email: string; university: string; avatar?: string }) => void;
  setIsSettingsOpen: (isOpen: boolean) => void;
  
  // Admin Profile Settings
  adminName: string;
  adminEmail: string;
  adminRole: string;
  adminAvatar: string;
  isAdminSettingsOpen: boolean;
  setAdminInfo: (info: { name: string; avatar?: string }) => void;
  setIsAdminSettingsOpen: (isOpen: boolean) => void;
  currentAdminTab: string;
  setCurrentAdminTab: (tab: string) => void;
  
  // Categories State
  categories: Category[];
  addCategory: (category: Omit<Category, 'id' | 'coursesCount'>) => void;
  
  // Admin Courses State
  adminCourses: AdminCourse[];
  addAdminCourse: (course: Omit<AdminCourse, 'id' | 'enrollmentsCount'>) => void;
  deleteAdminCourse: (id: string) => void;
  
  // Courses state
  courses: Course[];
  activeCourseId: number | null;
  setActiveCourseId: (id: number | null) => void;
  updateCourseProgress: (id: number, progress: number, status: Course['status']) => void;
  toggleFavoriteCourse: (id: number) => void;

  // Quiz Results state
  quizResults: {
    id: string;
    title: string;
    subject: string;
    date: string;
    score: number;
    maxScore: number;
    grade: string;
  }[];
  addQuizResult: (result: {
    id: string;
    title: string;
    subject: string;
    date: string;
    score: number;
    maxScore: number;
    grade: string;
  }) => void;

  // Notifications state
  notifications: {
    id: string;
    title: string;
    description: string;
    time: string;
    isRead: boolean;
    type: 'course' | 'assessment' | 'reply' | 'result';
  }[];
  markAllNotificationsAsRead: () => void;
  markNotificationAsRead: (id: string) => void;

  // Cart state
  cart: ExploreCourse[];
  addToCart: (course: ExploreCourse) => void;
  removeFromCart: (courseId: string) => void;
  clearCart: () => void;
  checkoutCart: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  currentView: 'landing',
  setCurrentView: (view) => set({ currentView: view }),
  currentStudentTab: 'dashboard',
  setCurrentStudentTab: (tab) => set({ currentStudentTab: tab }),
  isSidebarOpen: true,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  
  // Student Profile Settings Default Values
  studentName: 'Student',
  studentEmail: 'student@xebia.com',
  studentUniversity: 'Xebia University',
  studentAvatar: '',
  isSettingsOpen: false,
  setStudentInfo: (info) => set((state) => ({
    studentName: info.name,
    studentEmail: info.email,
    studentUniversity: info.university,
    studentAvatar: info.avatar !== undefined ? info.avatar : state.studentAvatar,
  })),
  setIsSettingsOpen: (isOpen) => set({ isSettingsOpen: isOpen }),

  // Admin Profile Settings Default Values
  adminName: 'Admin User',
  adminEmail: 'admin@xebia.com',
  adminRole: 'System Administrator',
  adminAvatar: '',
  isAdminSettingsOpen: false,
  setAdminInfo: (info) => set((state) => ({
    adminName: info.name,
    adminAvatar: info.avatar !== undefined ? info.avatar : state.adminAvatar,
  })),
  setIsAdminSettingsOpen: (isOpen) => set({ isAdminSettingsOpen: isOpen }),
  currentAdminTab: 'dashboard',
  setCurrentAdminTab: (tab) => set({ currentAdminTab: tab }),

  // Categories Default State & Actions
  categories: [],
  addCategory: (newCat) => set((state) => ({
    categories: [
      ...state.categories,
      {
        ...newCat,
        id: `cat-${Date.now()}`,
        coursesCount: 0,
      }
    ]
  })),

  // Admin Courses Default State & Actions
  adminCourses: [],
  addAdminCourse: (newCourse) => set((state) => ({
    adminCourses: [
      ...state.adminCourses,
      {
        ...newCourse,
        id: `course-${Date.now()}`,
        enrollmentsCount: 0,
      }
    ]
  })),
  deleteAdminCourse: (id) => set((state) => ({
    adminCourses: state.adminCourses.filter(c => c.id !== id)
  })),

  // Default courses
  courses: [
    {
      id: 1,
      title: "Java Fundamentals Mastery: A Beginner's Step-by-Step Guide to Programming Success",
      category: "Java",
      level: "Beginner",
      status: "Not Started",
      progress: 0,
      duration: "12h",
      description: "In this comprehensive course, students will embark on a journey to master the fundamentals of Java programming. From basic syntax to advanced object-oriented concepts.",
      image: javaCard,
      isFavorite: false,
    },
    {
      id: 2,
      title: "Python Foundations: Introduction to Programming and Development Essentials",
      category: "Python",
      level: "Beginner",
      status: "Not Started",
      progress: 0,
      duration: "24h",
      description: "In this beginner-level course, students will embark on a comprehensive journey to master the essentials of Python programming. Perfect for aspiring developers.",
      image: pythonCard,
      isFavorite: false,
    },
  ],
  activeCourseId: null,
  setActiveCourseId: (id) => set({ activeCourseId: id }),
  updateCourseProgress: (id, progress, status) => set((state) => ({
    courses: state.courses.map((c) =>
      c.id === id ? { ...c, progress, status } : c
    ),
  })),
  toggleFavoriteCourse: (id) => set((state) => ({
    courses: state.courses.map((c) =>
      c.id === id ? { ...c, isFavorite: !c.isFavorite } : c
    ),
  })),
  // Default quiz results
  quizResults: [
    {
      id: 'uiux-assign',
      title: 'Design Systems Assignment',
      subject: 'UI/UX DESIGN FOR DEVELOPERS',
      date: '2026-06-20',
      score: 95,
      maxScore: 100,
      grade: 'A+'
    },
    {
      id: 'react-mid',
      title: 'React Midterm',
      subject: 'ADVANCED REACT & NEXT.JS',
      date: '2026-05-15',
      score: 82,
      maxScore: 100,
      grade: 'B+'
    }
  ],
  addQuizResult: (result) => set((state) => ({
    quizResults: [result, ...state.quizResults]
  })),

  // Default notifications list
  notifications: [
    {
      id: '1',
      title: 'New Course Assigned',
      description: "You have been enrolled in 'Enterprise Architecture Patterns'.",
      time: '2 hours ago',
      isRead: false,
      type: 'course',
    },
    {
      id: '2',
      title: 'Assessment Reminder',
      description: "Your 'React Final Exam' is due in 2 days.",
      time: '5 hours ago',
      isRead: false,
      type: 'assessment',
    },
    {
      id: '3',
      title: 'Trainer Replied',
      description: "Sarah Drasner replied to your comment in 'State Management'.",
      time: '1 day ago',
      isRead: true,
      type: 'reply',
    },
    {
      id: '4',
      title: 'Result Published',
      description: "Your 'Design Systems Assignment' results are out.",
      time: '3 days ago',
      isRead: true,
      type: 'result',
    }
  ],
  markAllNotificationsAsRead: () => set((state) => ({
    notifications: state.notifications.map((n) => ({ ...n, isRead: true })),
  })),
  markNotificationAsRead: (id) => set((state) => ({
    notifications: state.notifications.map((n) =>
      n.id === id ? { ...n, isRead: true } : n
    ),
  })),

  // Cart actions
  cart: [],
  addToCart: (course) => set((state) => {
    if (state.cart.some(item => item.id === course.id)) return {};
    return { cart: [...state.cart, course] };
  }),
  removeFromCart: (courseId) => set((state) => ({
    cart: state.cart.filter(item => item.id !== courseId)
  })),
  clearCart: () => set({ cart: [] }),
  checkoutCart: () => set((state) => {
    const enrolledNewCourses: Course[] = state.cart.map((item, idx) => ({
      id: Date.now() + idx,
      title: item.title,
      category: item.category,
      level: item.level,
      status: 'Not Started',
      progress: 0,
      duration: item.duration,
      description: item.description,
      image: item.image || '',
      isFavorite: false
    }));

    return {
      courses: [...state.courses, ...enrolledNewCourses],
      cart: []
    };
  }),
}));
