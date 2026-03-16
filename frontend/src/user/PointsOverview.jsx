import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Trophy, 
  Info, 
  Plus, 
  Minus, 
  X, 
  Divide, 
  Home, 
  Settings, 
  User, 
  LayoutDashboard,
  Star,
  Circle,
  Triangle,
  Square,
  Rocket
} from "lucide-react";
import { useEquationStore } from "../store/equationStore";
// Mock store implementation to make the code runnable


const types = ["addition", "subtraction", "multiplication", "division"];

const typeTranslations = {
  addition: "الجمع",
  subtraction: "الطرح",
  multiplication: "الضرب",
  division: "القسمة"
};

const pointsMap = {
  addition: 1,
  subtraction: 2,
  multiplication: 3,
  division: 4
};

const icons = {
  addition: Plus,
  subtraction: Minus,
  multiplication: X,
  division: Divide
};

const colors = {
  addition: "bg-blue-500",
  subtraction: "bg-emerald-500",
  multiplication: "bg-purple-500",
  division: "bg-rose-500"
};

// Background Decorative Elements
const FloatingShape = ({ delay, color, size, top, left, icon: ShapeIcon }) => (
  <motion.div
    initial={{ y: 0, rotate: 0, opacity: 0 }}
    animate={{ 
      y: [0, -40, 0], 
      rotate: [0, 360],
      opacity: [0.3, 0.6, 0.3]
    }}
    transition={{ 
      duration: 10 + Math.random() * 10, 
      repeat: Infinity, 
      delay 
    }}
    className={`absolute pointer-events-none ${color} opacity-30 blur-sm`}
    style={{ top, left, width: size, height: size, borderRadius: '30%' }}
  />
);

const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 h-20 bg-white/80 backdrop-blur-md border-b border-white/20 z-50 px-6 flex items-center justify-between">
    <div className="flex items-center gap-2">
      <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-200">
        <Trophy className="text-white" size={24} />
      </div>
      <span className="text-2xl font-black bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
        مدينة الزمن
      </span>
    </div>
    
    <div className="hidden md:flex items-center gap-8 text-zinc-600 font-bold">
      <a href="/" className="flex items-center gap-2 hover:text-orange-500 transition-colors">
        <Home size={20} /> الرئيسية
      </a>
      <button className="flex items-center gap-2 text-orange-500">
        <LayoutDashboard size={20} /> الإحصائيات
      </button>
      <a href="/equations-game" className="flex items-center gap-2 hover:text-orange-500 transition-colors">
        <Rocket size={20} /> صفحة التحديات
      </a>
    </div>

    <button className="p-2 rounded-full bg-zinc-100 text-zinc-600 hover:bg-orange-100 hover:text-orange-600 transition-all">
      <Settings size={24} />
    </button>
  </nav>
);

const App = () => {
  const { progress, fetchProgress } = useEquationStore();

  useEffect(() => {
    fetchProgress();
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-zinc-900 font-sans selection:bg-orange-200 overflow-x-hidden pt-24 pb-20" dir="rtl">
      <Navbar />

      {/* Background Stickers & Shapes */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <FloatingShape color="bg-orange-400" size={120} top="10%" left="5%" delay={0} />
        <FloatingShape color="bg-blue-400" size={80} top="60%" left="15%" delay={2} />
        <FloatingShape color="bg-purple-400" size={150} top="40%" left="80%" delay={5} />
        <FloatingShape color="bg-emerald-400" size={60} top="80%" left="70%" delay={1} />
        
        {/* Math Stickers */}
        <motion.div 
           animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.1, 1] }}
           transition={{ duration: 5, repeat: Infinity }}
           className="absolute top-1/4 right-10 opacity-10"
        >
          <Plus size={200} className="text-orange-500" strokeWidth={3} />
        </motion.div>
        <motion.div 
           animate={{ rotate: [0, -20, 20, 0], y: [0, 30, 0] }}
           transition={{ duration: 7, repeat: Infinity }}
           className="absolute bottom-1/4 left-5 opacity-10"
        >
          <Divide size={150} className="text-blue-500" strokeWidth={3} />
        </motion.div>
      </div>

      <main className="relative max-w-6xl mx-auto px-6 z-10">
        <motion.header 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12"
        >
          <div className="flex items-center gap-4">
            <div className="p-4 bg-orange-100 rounded-3xl shadow-inner">
              <Trophy className="text-orange-600 w-12 h-12" strokeWidth={2.5} />
            </div>
            <div>
              <h2 className="text-4xl font-black text-zinc-900 tracking-tight">إحصائيات النقاط</h2>
              <p className="text-zinc-500 font-medium">تابع تقدمك في رحلة تعلم الرياضيات</p>
            </div>
          </div>

          <div className="bg-white/60 backdrop-blur shadow-sm border border-white p-2 rounded-2xl flex items-center gap-3 pr-4">
            <span className="text-zinc-500 font-bold">المجموع:</span>
            <span className="text-2xl font-black text-orange-600">
              {progress ? Object.values(progress.points).reduce((a, b) => a + b, 0) : 0}
            </span>
            <div className="bg-orange-500 p-2 rounded-xl text-white shadow-lg">
              <Star fill="currentColor" size={18} />
            </div>
          </div>
        </motion.header>

        <AnimatePresence mode="wait">
          {!progress ? (
            <motion.div 
              key="loader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col justify-center items-center py-40 gap-4"
            >
              <div className="w-16 h-16 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin" />
              <p className="text-xl font-black text-zinc-400">جاري جمع البيانات...</p>
            </motion.div>
          ) : (
            <motion.div 
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-16"
            >
              {/* POINTS PER TYPE */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {types.map((type, idx) => {
                  const Icon = icons[type];
                  return (
                    <motion.div
                      key={type}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      whileHover={{ y: -10, scale: 1.02 }}
                      className="group relative bg-white border border-white/50 rounded-[2.5rem] p-8 shadow-xl shadow-zinc-200/50 hover:shadow-2xl transition-all overflow-hidden"
                    >
                      {/* Decorative internal circle */}
                      <div className={`absolute -top-12 -right-12 w-32 h-32 rounded-full ${colors[type]} opacity-5 group-hover:opacity-10 transition-opacity`} />
                      
                      <div className={`w-16 h-16 ${colors[type]} rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg rotate-3 group-hover:rotate-0 transition-transform`}>
                        <Icon size={32} strokeWidth={3} />
                      </div>

                      <p className="text-zinc-400 font-bold mb-1">
                        {typeTranslations[type]}
                      </p>

                      <div className="flex items-baseline gap-2">
                        <p className="text-5xl font-black text-zinc-900">
                          {progress.points[type] || 0}
                        </p>
                        <span className="text-zinc-400 text-sm font-bold">نقطة</span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* INSTRUCTIONS */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative bg-gradient-to-br from-white/80 to-orange-50/50 backdrop-blur-xl border border-white rounded-[3rem] p-8 md:p-12 shadow-2xl overflow-hidden"
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#f97316 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

                <div className="relative flex items-center gap-4 mb-10">
                  <div className="bg-orange-500 p-3 rounded-2xl text-white">
                    <Info size={28} />
                  </div>
                  <div>
                    <h3 className="text-3xl font-black text-zinc-800">قواعد النقاط</h3>
                    <p className="text-zinc-500">اكتشف كيف يمكنك زيادة رصيدك</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 relative z-10">
                  {types.map((type) => (
                    <div
                      key={type}
                      className="group flex justify-between items-center bg-white hover:bg-orange-500 rounded-3xl p-6 border border-zinc-100 shadow-sm transition-all duration-300"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-zinc-50 group-hover:bg-white/20 flex items-center justify-center text-zinc-400 group-hover:text-white">
                          {React.createElement(icons[type], { size: 20 })}
                        </div>
                        <span className="font-black text-lg text-zinc-700 group-hover:text-white transition-colors">
                          {typeTranslations[type]}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                         <span className="text-2xl font-black text-orange-600 group-hover:text-white">
                          +{pointsMap[type]}
                        </span>
                        <div className="w-6 h-6 rounded-full bg-orange-100 group-hover:bg-white/20 flex items-center justify-center text-orange-600 group-hover:text-white">
                          <Star size={12} fill="currentColor" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-10 p-6 bg-white/40 border border-white rounded-2xl">
                  <p className="text-zinc-600 text-center font-bold flex items-center justify-center gap-2">
                    <Star className="text-amber-400" size={20} fill="currentColor" />
                    كلما زادت صعوبة المسألة، زاد عدد النجوم التي تحصل عليها! استمر في المحاولة.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default App;