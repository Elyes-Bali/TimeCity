import React, { useEffect, useState, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Droplets, 
  Cloud, 
  Sun, 
  CheckCircle, 
  ArrowLeft,
  Anchor,
  Compass,
  Waves,
  Send,
  Ghost
} from "lucide-react";
import { useEquationStore } from "../store/equationStore";

// --- Realistic SVG Fish Component ---
const RealisticFish = ({ color = "#f87171", size = 60 }) => (
  <svg width={size} height={size * 0.6} viewBox="0 0 120 70" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Tail Fin */}
    <path 
      d="M25 35 L5 10 Q15 35 5 60 Z" 
      fill={color} 
      className="opacity-90"
    />
    {/* Body - Realistic Tapered Shape */}
    <path 
      d="M20 35 C20 10, 115 10, 115 35 C115 60, 20 60, 20 35Z" 
      fill={color} 
    />
    {/* Underbelly Highlight */}
    <path 
      d="M35 48 C60 55, 100 50, 110 35" 
      stroke="white" 
      strokeWidth="2" 
      className="opacity-30" 
      strokeLinecap="round" 
    />
    {/* Gills */}
    <path d="M95 25 Q90 35 95 45" stroke="black" strokeWidth="1" className="opacity-20" />
    {/* Dorsal Fin */}
    <path d="M60 18 Q80 5 95 18 Z" fill={color} className="brightness-90" />
    {/* Eye */}
    <circle cx="103" cy="30" r="4" fill="white" />
    <circle cx="104" cy="30" r="2" fill="black" />
    {/* Pectoral Fin */}
    <path d="M75 40 Q85 50 70 50 Z" fill={color} className="brightness-75" />
  </svg>
);

// --- High-Detail Tree Component ---
const RealisticTree = ({ height = 120, width = 80 }) => (
  <svg width={width} height={height} viewBox="0 0 100 150" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Trunk */}
    <path d="M45 150 L55 150 L52 100 L48 100 Z" fill="#422006" />
    {/* Main Foliage Layers */}
    <circle cx="50" cy="90" r="30" fill="#064e3b" />
    <circle cx="35" cy="70" r="25" fill="#065f46" />
    <circle cx="65" cy="70" r="25" fill="#065f46" />
    <circle cx="50" cy="50" r="28" fill="#059669" />
    {/* Leaf Highlights */}
    <circle cx="45" cy="45" r="8" fill="#34d399" className="opacity-40" />
    <circle cx="60" cy="65" r="10" fill="#34d399" className="opacity-30" />
    {/* Small Fruit/Flowers */}
    <circle cx="40" cy="80" r="2" fill="#fb7185" />
    <circle cx="65" cy="55" r="2" fill="#fb7185" />
    <circle cx="55" cy="95" r="2" fill="#fb7185" />
  </svg>
);

// --- Detailed Plane Component ---
const DetailedPlane = () => (
  <div className="relative w-32 h-20 drop-shadow-2xl">
    <motion.div 
      animate={{ rotateY: 360 }}
      transition={{ duration: 0.2, repeat: Infinity, ease: "linear" }}
      className="absolute -right-1 top-1/2 -translate-y-1/2 w-1.5 h-14 bg-slate-400 rounded-full z-20 origin-center"
    />
    <div className={`absolute right-0 top-1/2 -translate-y-1/2 w-5 h-8 rounded-r-full bg-slate-800 z-10`} />
    <div className={`absolute right-2 top-4 w-24 h-11 rounded-full bg-rose-500 border-b-4 border-rose-700 shadow-inner`} />
    <div className="absolute right-8 top-3 w-8 h-5 bg-sky-200 rounded-t-full border-2 border-slate-700 opacity-80" />
    <div className="absolute right-10 top-9 w-16 h-4 bg-rose-400 rounded-full border-b-2 border-rose-600 rotate-[-5deg] z-20" />
    <div className="absolute right-8 top-6 w-14 h-3 bg-rose-600 rounded-full opacity-40 rotate-[10deg]" />
    <div className="absolute left-1 top-2 w-8 h-8 bg-rose-500 rounded-tl-full border-l-4 border-rose-700 rotate-[-15deg]" />
  </div>
);

const LakeDecor = memo(() => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-sky-200">
      {/* Sky */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#7dd3fc] via-[#bae6fd] to-[#e0f2fe]" />
      
      {/* Sun */}
      <div className="absolute top-10 left-20">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-orange-200 blur-[80px] scale-150 rounded-full"
        />
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="text-yellow-300 relative"
        >
          <Sun size={120} fill="currentColor" strokeWidth={1} />
        </motion.div>
      </div>

      {/* Plane */}
      {[...Array(2)].map((_, i) => (
        <motion.div
          key={`plane-${i}`}
          initial={{ x: "-50vw", y: 100 + i * 200 }}
          animate={{ x: "130vw", y: [100, 130, 100] }}
          transition={{ x: { duration: 35 + i * 5, repeat: Infinity, ease: "linear", delay: i * 15 }, y: { duration: 6, repeat: Infinity } }}
          className="absolute flex items-center"
        >
          <DetailedPlane />
          <motion.div animate={{ rotate: [-10, 10] }} transition={{ duration: 1, repeat: Infinity, repeatType: "mirror" }} className="absolute -top-3 right-12">
            <Ghost size={40} fill="#fef3c7" className="stroke-amber-900" />
          </motion.div>
        </motion.div>
      ))}

      {/* --- LAKE SYSTEM --- */}
      <div className="absolute bottom-0 w-full h-[52%] flex flex-col">
        {/* Shoreline */}
        <div className="relative w-full z-40">
          <div className="absolute bottom-[-10px] w-full flex justify-around items-end px-4 h-0 overflow-visible">
            {[...Array(14)].map((_, i) => (
              <motion.div
                key={`tree-${i}`}
                animate={{ rotate: [i % 2 === 0 ? -1 : 1, i % 2 === 0 ? 1 : -1] }}
                transition={{ duration: 4 + (i % 2), repeat: Infinity, ease: "easeInOut" }}
                className="drop-shadow-xl"
              >
                <RealisticTree height={100 + (i % 5) * 20} width={70 + (i % 3) * 10} />
              </motion.div>
            ))}
          </div>
          <div className="h-12 w-full bg-[#1e3a1f] shadow-2xl border-t-4 border-[#2d4d2e]" />
          <div className="h-4 w-full bg-gradient-to-b from-[#1e3a1f] to-[#0ea5e9] opacity-80" />
        </div>

        {/* Water */}
        <div className="relative flex-grow overflow-hidden bg-gradient-to-b from-[#0ea5e9] via-[#0284c7] to-[#075985]">
          
          {/* SWIMMING FISH - Far left to Far Right */}
          {[...Array(8)].map((_, i) => {
            const duration = 15 + (i * 3);
            return (
              <motion.div
                key={`fish-swim-${i}`}
                className="absolute z-20"
                initial={{ left: "-150px" }}
                animate={{ left: "115%" }}
                transition={{ 
                  duration: duration, 
                  repeat: Infinity, 
                  ease: "linear",
                  delay: i * 2.5 
                }}
                style={{ top: `${15 + i * 10}%` }}
              >
                <motion.div
                  animate={{ y: [0, -10, 0], rotate: [-2, 2, -2] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <RealisticFish 
                    color={["#facc15", "#fb923c", "#f87171", "#4ade80", "#2dd4bf"][i % 5]} 
                    size={45 + (i % 4) * 10} 
                  />
                </motion.div>
              </motion.div>
            );
          })}

          {/* Reflections */}
          <div className="absolute top-0 w-full h-full flex justify-around items-start opacity-20 blur-[4px] pointer-events-none">
            {[...Array(14)].map((_, i) => (
              <div key={`refl-${i}`} className="scale-y-[-1] translate-y-[-10px]">
                <RealisticTree height={80} width={60} />
              </div>
            ))}
          </div>

          {/* Reeds */}
          <div className="absolute bottom-0 w-full h-24 flex items-end justify-between px-4 z-40">
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={`reed-${i}`}
                className="w-1 bg-[#064e3b] rounded-t-full origin-bottom"
                style={{ height: `${40 + Math.random() * 50}%`, opacity: 0.6 }}
                animate={{ rotate: [-2, 2, -2] }}
                transition={{ duration: 2 + Math.random() * 2, repeat: Infinity }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

const DivisionEquations = () => {
  const { fetchDivisionEquations, fetchUserAnswers, answerEquation } = useEquationStore();

  const [equations, setEquations] = useState([]);
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const eqs = await fetchDivisionEquations();
        setEquations(eqs || []);

        const userAnswers = (await fetchUserAnswers()) || [];
        const answersMap = {};
        const solved = {};

        userAnswers.forEach((ua) => {
          if (ua.equation?.type === "division") {
            answersMap[ua.equation._id] = ua.userAnswer;
            if (ua.isCorrect) {
              solved[ua.equation._id] = true;
            }
          }
        });

        setAnswers(answersMap);
        setResults(solved);
      } catch (err) {
        console.error("Lake navigation failed", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [fetchDivisionEquations, fetchUserAnswers]);

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
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-[#e0f2fe] text-sky-900">
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 3, ease: "linear" }}>
          <Anchor size={90} className="text-sky-600 drop-shadow-2xl" />
        </motion.div>
        <p className="mt-8 font-black text-3xl tracking-wider text-sky-800 animate-pulse">جاري استكشاف النهر...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full font-sans relative overflow-x-hidden p-4 md:p-10 text-emerald-950" dir="rtl">
      <LakeDecor />

      <AnimatePresence>
        {errorMsg && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-sky-900/30 backdrop-blur-md">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white p-8 rounded-[4rem] border-4 border-rose-400 shadow-2xl max-w-sm w-full text-center"
            >
              <div className="w-24 h-24 bg-rose-50 rounded-[2.5rem] flex items-center justify-center mx-auto mb-6 border-2 border-rose-100">
                <Anchor className="text-rose-500" size={48} />
              </div>
              <h2 className="text-3xl font-black mb-2 text-rose-900">عائق نهري!</h2>
              <p className="text-gray-500 font-bold mb-8 text-lg leading-relaxed">{errorMsg}</p>
              <button 
                onClick={() => setErrorMsg(null)}
                className="w-full py-5 bg-gradient-to-r from-rose-500 to-rose-600 text-white rounded-3xl font-black text-xl shadow-xl active:scale-95"
              >
                فهمت ذلك
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="relative z-20 max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-center gap-10 mb-20">
          <motion.button 
            whileHover={{ scale: 1.05, x: 5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.history.back()}
            className="flex items-center gap-4 px-10 py-5 bg-white/80 border-2 border-sky-100 rounded-3xl backdrop-blur-2xl font-black text-lg shadow-xl"
          >
            <ArrowLeft size={24} className="text-sky-600" />
            <span>خريطة الجزر</span>
          </motion.button>

          <div className="text-center">
            <h1 className="text-7xl md:text-9xl font-black tracking-tighter text-sky-950 drop-shadow-2xl">
              ضفاف <span className="text-rose-500">القسمة</span>
            </h1>
          </div>

          <div className="bg-white/90 border-b-[10px] border-sky-500 p-6 rounded-[2.5rem] shadow-2xl flex items-center gap-6 min-w-[240px] backdrop-blur-xl">
            <div className="bg-sky-50 p-5 rounded-2xl border-2 border-sky-100">
              <Droplets className="text-sky-600" size={36} />
            </div>
            <div>
              <p className="text-xs text-sky-400 font-black uppercase tracking-widest mb-1">نقاط الإنجاز</p>
              <p className="text-5xl font-black leading-none text-sky-950">
                {Object.values(results).filter(Boolean).length} <span className="text-2xl text-sky-300">/ {equations.length}</span>
              </p>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pb-60">
          {equations.length === 0 ? (
            <div className="col-span-full py-32 text-center bg-white/40 backdrop-blur-2xl rounded-[5rem] border-4 border-dashed border-sky-200">
               <Waves className="mx-auto text-sky-400 mb-10 animate-bounce" size={120} />
               <p className="text-3xl font-black text-sky-900 italic">مياه الجزيرة هادئة...</p>
            </div>
          ) : equations.map((eq, index) => {
            const isSolved = results[eq._id] === true;
            const isWrong = results[eq._id] === false;

            return (
              <motion.div
                key={eq._id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`
                  relative bg-white/90 backdrop-blur-3xl rounded-[4rem] p-12 border-4 transition-all duration-700
                  ${isSolved 
                    ? 'border-emerald-400 shadow-[0_30px_70px_rgba(16,185,129,0.2)]' 
                    : 'border-white shadow-xl hover:-translate-y-3'}
                `}
              >
                <div className="flex justify-between items-center mb-12">
                  <div className={`
                    w-20 h-20 rounded-[2rem] flex items-center justify-center border-2 transition-all duration-700
                    ${isSolved ? 'bg-emerald-500 border-emerald-300 scale-110 rotate-12' : 'bg-sky-50 border-sky-100'}
                  `}>
                    {isSolved ? <CheckCircle className="text-white" size={40} /> : <Compass className="text-sky-400" size={40} />}
                  </div>
                  <div className="bg-sky-50 px-6 py-2 rounded-full font-mono text-sm text-sky-400 font-black border border-sky-100">
                    ISLAND_TASK_{index + 1}
                  </div>
                </div>

                <div className="text-center mb-12">
                  <div className="text-8xl font-black text-sky-950 flex items-center justify-center gap-8 drop-shadow-md">
                    {eq.question.split('=').shift()}
                  </div>
                </div>

                <div className="flex flex-col gap-8">
                 <input
                    type="text"
                    inputMode="numeric"
                    value={answers[eq._id] || ""}
                    disabled={isSolved}
                    onWheel={(e) => e.target.blur()} // Prevents scroll value changes by unfocusing
                    onChange={(e) => handleChange(eq._id, e.target.value)}
                    placeholder="؟"
                    className={`
                      w-full bg-sky-50/30 p-10 text-6xl font-black text-center rounded-[3rem] border-4 transition-all outline-none
                      ${isSolved 
                        ? 'border-emerald-400 text-emerald-600 bg-emerald-50/50' 
                        : isWrong 
                          ? 'border-rose-400 text-rose-500 animate-shake' 
                          : 'border-sky-100 focus:border-sky-400 text-sky-950 focus:bg-white'}
                    `}
                  />
                  <button
                    disabled={isSolved}
                    onClick={() => submitAnswer(eq._id)}
                    className={`
                      w-full py-8 rounded-[2.5rem] font-black text-3xl flex items-center justify-center gap-6 transition-all duration-300
                      ${isSolved 
                        ? 'bg-emerald-100 text-emerald-600 opacity-50' 
                        : 'bg-sky-600 hover:bg-sky-700 text-white shadow-xl active:scale-95'}
                    `}
                  >
                    {isSolved ? "تم الإرسال" : "توزيع الكنز"}
                    {!isSolved && <Send size={32} />}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-15px); }
          75% { transform: translateX(15px); }
        }
        .animate-shake { animation: shake 0.15s ease-in-out 0s 2; }
        input::-webkit-outer-spin-button, input::-webkit-inner-spin-button {
          -webkit-appearance: none; margin: 0;
        }
        body { background-color: #e0f2fe; }
      `}</style>
    </div>
  );
};

export default DivisionEquations;