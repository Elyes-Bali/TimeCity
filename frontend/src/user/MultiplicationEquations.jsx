import React, { useEffect, useState, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Cpu, 
  Settings, 
  Box, 
  Bot, 
  Palette, 
  CheckCircle, 
  XCircle, 
  ArrowLeft,
  Zap,
  Package,
  Wrench,
  Gauge,
  Wind,
  Layers,
  Container,
  Activity,
  Drill
} from "lucide-react";
import { useEquationStore } from "../store/equationStore";

// --- Advanced Decorative Factory Components ---
const FactoryDecor = memo(() => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-slate-950">
      {/* Industrial Floor with Hazard Stripes */}
      <div className="absolute bottom-0 w-full h-1/4 bg-slate-900 border-t-4 border-slate-800 shadow-[inset_0_20px_50px_rgba(0,0,0,0.5)]">
        <div className="w-full h-6 bg-[repeating-linear-gradient(45deg,#eab308,#eab308_20px,#1e293b_20px,#1e293b_40px)] opacity-10" />
      </div>
      
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />

      {/* Pulsing Steam Pipes (Top) */}
      <div className="absolute top-0 left-0 w-full flex justify-around px-20">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-8 h-40 bg-gradient-to-b from-slate-700 to-slate-800 rounded-b-3xl relative">
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center">
              <motion.div
                animate={{ y: [-20, -100], opacity: [0, 0.4, 0], scale: [1, 2] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.8 }}
                className="text-white/30"
              >
                <Wind size={40} />
              </motion.div>
            </div>
            {/* Pipe Joints */}
            <div className="absolute top-10 w-10 h-4 bg-slate-600 -left-1 rounded-sm" />
          </div>
        ))}
      </div>

      {/* Massive Moving Gears */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-20 -left-20 opacity-5 text-cyan-500"
      >
        <Settings size={600} strokeWidth={1} />
      </motion.div>

      {/* Floating Mechanical Droids */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-cyan-400/10"
          initial={{ y: "110vh", x: i * 12 + "%" }}
          animate={{ 
            y: "-20vh", 
            x: (i * 12 + (i % 2 === 0 ? 5 : -5)) + "%",
            rotate: [0, 5, -5, 0] 
          }}
          transition={{ 
            duration: 18 + i * 2, 
            repeat: Infinity, 
            ease: "easeInOut", 
            delay: i * 2.5 
          }}
        >
          <Bot size={100 + i * 10} />
          <motion.div 
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-2 h-2 bg-cyan-500 rounded-full blur-[2px] mx-auto mt-2" 
          />
        </motion.div>
      ))}

      {/* Corner Equipment - Control Panel */}
      <div className="absolute bottom-10 right-10 w-48 h-64 bg-slate-900 border-4 border-slate-800 rounded-2xl hidden lg:block p-4 shadow-2xl overflow-hidden">
        <div className="flex gap-2 mb-4">
          <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <div className="w-3 h-3 rounded-full bg-blue-500" />
        </div>
        <div className="space-y-2">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-1 bg-slate-800 rounded-full overflow-hidden">
              <motion.div 
                animate={{ width: ["0%", "100%", "0%"] }} 
                transition={{ duration: 2 + i, repeat: Infinity }}
                className="h-full bg-cyan-500/30" 
              />
            </div>
          ))}
        </div>
        <Activity className="text-slate-700 absolute -bottom-4 -right-4" size={100} />
      </div>

      {/* Particle Sparks */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-yellow-400 rounded-full shadow-[0_0_10px_#facc15]"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0, 1, 0], 
            y: [0, 120], 
            x: [0, (i % 2 === 0 ? 40 : -40)] 
          }}
          transition={{ 
            duration: 0.7, 
            repeat: Infinity, 
            delay: i * 1.5,
            repeatDelay: Math.random() * 4
          }}
          style={{ top: "35%", left: `${10 + i * 8}%` }}
        />
      ))}
    </div>
  );
});

const MultiplicationEquations = () => {
  const { fetchMultiplicationEquations, fetchUserAnswers, answerEquation } = useEquationStore();

  const [equations, setEquations] = useState([]);
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const eqs = await fetchMultiplicationEquations();
      setEquations(eqs || []);

      const userAnswers = (await fetchUserAnswers()) || [];
      const answersMap = {};
      const solved = {};

      userAnswers.forEach((ua) => {
        if (ua.equation?.type === "multiplication") {
          answersMap[ua.equation._id] = ua.userAnswer;
          if (ua.isCorrect) {
            solved[ua.equation._id] = true;
          }
        }
      });

      setAnswers(answersMap);
      setResults(solved);
      setLoading(false);
    };

    loadData();
  }, []);

  const handleChange = (id, value) =>
    setAnswers((prev) => ({ ...prev, [id]: value }));

  const submitAnswer = async (id) => {
    const res = await answerEquation(id, answers[id]);
    if (!res) return;
    if (res.error) {
      setErrorMsg(res.error);
      return;
    }
    setResults((prev) => ({ ...prev, [id]: res.correct }));
  };

  if (loading) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-slate-950 text-white overflow-hidden">
        <div className="relative">
          <motion.div 
            animate={{ rotate: 360 }} 
            transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
          >
            <Settings size={180} className="text-cyan-500/20" />
          </motion.div>
          <motion.div 
            className="absolute inset-0 flex items-center justify-center"
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <Cpu size={60} className="text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]" />
          </motion.div>
        </div>
        <div className="mt-10 flex flex-col items-center">
          <p className="font-black text-3xl tracking-[0.3em] text-white uppercase italic">
            Booting Systems
          </p>
          <div className="w-64 h-2 bg-slate-900 rounded-full mt-4 overflow-hidden border border-slate-800">
            <motion.div 
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="w-full h-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full font-sans relative overflow-x-hidden p-4 md:p-10 text-white" dir="rtl">
      <FactoryDecor />

      {/* Error Modal */}
      <AnimatePresence>
        {errorMsg && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 30 }}
              className="bg-slate-900 p-10 rounded-[3rem] border-4 border-red-600 shadow-[0_0_80px_rgba(220,38,38,0.4)] max-w-sm w-full text-center relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-red-600 animate-pulse" />
              <div className="w-24 h-24 bg-red-600/10 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-red-600 shadow-inner">
                <Wrench className="text-red-500" size={50} />
              </div>
              <h2 className="text-3xl font-black mb-4 text-white uppercase italic">Critical Failure</h2>
              <p className="text-slate-400 font-bold mb-8 text-lg">{errorMsg}</p>
              <button 
                onClick={() => setErrorMsg(null)}
                className="w-full py-5 bg-gradient-to-b from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 text-white rounded-2xl font-black text-xl transition-all shadow-[0_6px_0_rgb(153,27,27)] active:translate-y-1 active:shadow-none"
              >
                إصلاح الوحدة
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="relative z-20 max-w-7xl mx-auto">
        {/* Header Section */}
        <header className="flex flex-col lg:flex-row justify-between items-center gap-10 mb-20">
          <motion.button 
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(34,211,238,0.2)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.history.back()}
            className="group flex items-center gap-4 px-10 py-5 bg-slate-900/80 border-2 border-slate-700 rounded-2xl backdrop-blur-md transition-all hover:border-cyan-500"
          >
            <ArrowLeft size={24} className="text-cyan-400 group-hover:-translate-x-2 transition-transform" />
            <span className="font-black text-xl tracking-tight">مغادرة النوبة</span>
          </motion.button>

          <div className="text-center relative">
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 flex items-center gap-6 opacity-30">
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }}>
                <Settings size={40} className="text-slate-500" />
              </motion.div>
              <Bot size={80} className="text-cyan-500" />
              <motion.div animate={{ rotate: -360 }} transition={{ duration: 12, repeat: Infinity, ease: "linear" }}>
                <Settings size={32} className="text-slate-600" />
              </motion.div>
            </div>
            
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter italic">
              <span className="bg-gradient-to-b from-white to-slate-500 bg-clip-text text-transparent drop-shadow-sm">مصنع</span>{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                الضرب الآلي
              </span>
            </h1>
            
            <div className="flex items-center justify-center gap-8 mt-6">
              <div className="flex items-center gap-2 text-xs font-black tracking-[0.3em] uppercase text-cyan-400/80">
                <Zap size={14} className="animate-pulse text-yellow-400" /> جهد عالي
              </div>
              <div className="h-4 w-[2px] bg-slate-800" />
              <div className="flex items-center gap-2 text-xs font-black tracking-[0.3em] uppercase text-emerald-400/80">
                <Activity size={14} /> متزامن
              </div>
              <div className="h-4 w-[2px] bg-slate-800" />
              <div className="flex items-center gap-2 text-xs font-black tracking-[0.3em] uppercase text-purple-400/80">
                <Drill size={14} /> الإنتاج نشط
              </div>
            </div>
          </div>

          <div className="flex gap-6">
            <div className="flex items-center gap-5 bg-slate-900 border-b-8 border-cyan-500 p-6 rounded-3xl shadow-2xl min-w-[200px] relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-2 opacity-5 group-hover:opacity-10 transition-opacity">
                <Package size={80} />
              </div>
              <div className="bg-cyan-500/20 p-4 rounded-2xl border border-cyan-500/30">
                <Package size={32} className="text-cyan-400" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-black uppercase mb-1">الإنتاج</p>
                <p className="text-4xl font-black text-white leading-none">
                  {Object.values(results).filter(Boolean).length}
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Production Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 pb-40">
          {equations.map((eq, index) => {
            const isSolved = results[eq._id] === true;
            const isWrong = results[eq._id] === false;

            return (
              <motion.div
                key={eq._id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`
                  relative group bg-slate-900/60 backdrop-blur-xl rounded-[3rem] border-2 p-10 transition-all duration-500
                  ${isSolved 
                    ? 'border-emerald-500 shadow-[0_20px_60px_rgba(16,185,129,0.2)] bg-emerald-500/5' 
                    : 'border-slate-800 hover:border-cyan-500 shadow-2xl hover:bg-slate-900/80'}
                `}
              >
                {/* Mechanical Rivets */}
                <div className="absolute top-6 left-6 w-4 h-4 bg-slate-800 rounded-full border-2 border-slate-700 shadow-inner" />
                <div className="absolute top-6 right-6 w-4 h-4 bg-slate-800 rounded-full border-2 border-slate-700 shadow-inner" />
                <div className="absolute bottom-6 left-6 w-4 h-4 bg-slate-800 rounded-full border-2 border-slate-700 shadow-inner" />
                <div className="absolute bottom-6 right-6 w-4 h-4 bg-slate-800 rounded-full border-2 border-slate-700 shadow-inner" />

                <div className="flex justify-between items-center mb-10">
                  <div className={`
                    w-16 h-16 rounded-2xl flex items-center justify-center border-2 transition-all duration-500
                    ${isSolved ? 'bg-emerald-500 border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.4)]' : 'bg-slate-800 border-slate-700 group-hover:border-cyan-500 group-hover:bg-cyan-500/10'}
                  `}>
                    {isSolved ? (
                      <CheckCircle className="text-white" size={32} />
                    ) : (
                      <Box className="text-slate-500 group-hover:text-cyan-400" size={32} />
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] mb-1">معرف الدفعة</p>
                    <p className="font-mono text-sm text-cyan-500/80 font-bold">#PROD-{eq._id.slice(-5).toUpperCase()}</p>
                  </div>
                </div>

                <div className="text-center mb-10 relative">
                  <motion.div 
                    initial={false}
                    animate={isSolved ? { scale: [1, 1.1, 1] } : {}}
                    className="text-7xl font-black text-white tracking-tighter drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]"
                  >
                    {eq.question}
                  </motion.div>
                  <div className="flex justify-center gap-1 mt-4">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className={`h-1.5 w-8 rounded-full transition-colors duration-500 ${isSolved ? 'bg-emerald-500' : 'bg-slate-800'}`} />
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="relative">
                    <input
                      type="number"
                      value={answers[eq._id] || ""}
                      disabled={isSolved}
                      onChange={(e) => handleChange(eq._id, e.target.value)}
                      placeholder="00"
                      className={`
                        w-full bg-slate-950/80 p-8 text-5xl font-black text-center rounded-[2rem] border-4 transition-all outline-none
                        ${isSolved 
                          ? 'border-emerald-500 text-emerald-400 shadow-[inset_0_0_20px_rgba(16,185,129,0.1)]' 
                          : isWrong 
                            ? 'border-red-600 text-red-500 animate-shake' 
                            : 'border-slate-800 focus:border-cyan-500 text-white placeholder:text-slate-800'}
                      `}
                    />
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none opacity-20">
                      <Gauge size={24} className={isSolved ? "text-emerald-500" : "text-slate-500"} />
                    </div>
                  </div>

                  <motion.button
                    whileHover={!isSolved ? { scale: 1.02, y: -4 } : {}}
                    whileTap={!isSolved ? { scale: 0.98 } : {}}
                    disabled={isSolved}
                    onClick={() => submitAnswer(eq._id)}
                    className={`
                      w-full py-6 rounded-2xl font-black text-2xl flex items-center justify-center gap-4 transition-all
                      ${isSolved 
                        ? 'bg-emerald-500/10 text-emerald-400 border-2 border-emerald-500/30 cursor-default' 
                        : 'bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 text-white shadow-[0_8px_0_rgb(21,94,117)] active:shadow-none active:translate-y-1'}
                    `}
                  >
                    {isSolved ? (
                      <>
                        <Layers size={28} />
                        تم الفحص والاعتماد
                      </>
                    ) : (
                      <>
                        <Zap size={28} className="text-yellow-400" />
                        بدء المعالجة
                      </>
                    )}
                  </motion.button>
                </div>

                {/* Performance Meter */}
                <div className="mt-10 pt-8 border-t border-slate-800/50 flex items-center justify-between">
                  <div className="flex gap-2">
                    <div className={`w-3 h-3 rounded-full ${isSolved ? 'bg-emerald-500 shadow-[0_0_8px_#10b981] animate-pulse' : 'bg-slate-800'}`} />
                    <div className={`w-3 h-3 rounded-full ${isSolved ? 'bg-emerald-500 shadow-[0_0_8px_#10b981] animate-pulse delay-100' : 'bg-slate-800'}`} />
                    <div className={`w-3 h-3 rounded-full ${isSolved ? 'bg-emerald-500 shadow-[0_0_8px_#10b981] animate-pulse delay-200' : 'bg-slate-800'}`} />
                  </div>
                  <AnimatePresence mode="wait">
                    {results[eq._id] !== undefined && (
                      <motion.div
                        key={results[eq._id] ? "p" : "f"}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={`text-[11px] font-black uppercase tracking-widest flex items-center gap-2 ${results[eq._id] ? "text-emerald-400" : "text-red-500"}`}
                      >
                        {results[eq._id] ? (
                          <>النظام: الأداء الأمثل <Activity size={12} /></>
                        ) : (
                          <>خطأ: عدم محاذاة النواة<XCircle size={12} /></>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        .animate-shake {
          animation: shake 0.15s ease-in-out 0s 2;
        }
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
      `}</style>
    </div>
  );
};

export default MultiplicationEquations;