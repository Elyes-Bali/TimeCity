import React, { useEffect, useState, useMemo, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  ArrowLeft, 
  Waves, 
  Bird, 
  TreePine,
  CheckCircle2,
  XCircle,
  Coins,
  Flower2,
  Wind
} from "lucide-react";
import { useEquationStore } from "../store/equationStore";

// --- Animated Garden Elements ---
const GardenBackground = memo(() => {
  const birds = useMemo(() => Array.from({ length: 4 }).map((_, i) => ({
    id: i,
    initialX: -100,
    y: 10 + Math.random() * 40,
    duration: 15 + Math.random() * 10,
    delay: i * 5
  })), []);

  const flora = useMemo(() => Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: 70 + Math.random() * 30,
    size: 24 + Math.random() * 30,
    type: i % 2 === 0 ? 'tree' : 'flower',
    color: i % 3 === 0 ? '#2d6a4f' : (i % 3 === 1 ? '#ffafcc' : '#fb8500')
  })), []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Sky Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-100 via-sky-50 to-emerald-50" />
      
      {/* Animated Clouds/Wind */}
      <motion.div 
        className="absolute top-20 left-0 text-white/40"
        animate={{ x: [-100, 1500] }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      >
        <Wind size={120} />
      </motion.div>

      {/* Rolling Hills (SVG Shapes) */}
      <svg className="absolute bottom-0 w-full h-[40vh] preserve-3d" viewBox="0 0 1440 320" preserveAspectRatio="none">
        <path 
          fill="#40916c" 
          fillOpacity="0.4" 
          d="M0,160L60,176C120,192,240,224,360,224C480,224,600,192,720,170.7C840,149,960,139,1080,149.3C1200,160,1320,192,1380,208L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
        />
        <path 
          fill="#52b788" 
          fillOpacity="0.6" 
          d="M0,224L80,213.3C160,203,320,181,480,192C640,203,800,245,960,240C1120,235,1280,181,1360,154.7L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
        />
      </svg>

      {/* Flowing River at the very bottom */}
      <div className="absolute bottom-0 w-full h-16 bg-blue-400/30 overflow-hidden backdrop-blur-sm">
        <motion.div 
          className="flex gap-4"
          animate={{ x: [0, -100] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        >
          {Array.from({ length: 20 }).map((_, i) => (
            <Waves key={i} className="text-blue-500/50 min-w-[100px]" size={40} />
          ))}
        </motion.div>
      </div>

      {/* Birds */}
      {birds.map(bird => (
        <motion.div
          key={bird.id}
          className="absolute text-blue-900/40"
          initial={{ x: -100, y: `${bird.y}%` }}
          animate={{ x: '110vw' }}
          transition={{ duration: bird.duration, delay: bird.delay, repeat: Infinity, ease: "linear" }}
        >
          <Bird size={32} />
        </motion.div>
      ))}

      {/* Trees and Flowers */}
      {flora.map(item => (
        <motion.div
          key={item.id}
          className="absolute"
          style={{ left: `${item.x}%`, top: `${item.y}%`, color: item.color }}
          animate={{ 
            rotate: item.type === 'flower' ? [0, 10, 0] : [0, 2, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{ duration: 3 + Math.random() * 2, repeat: Infinity }}
        >
          {item.type === 'tree' ? <TreePine size={item.size} /> : <Flower2 size={item.size} />}
        </motion.div>
      ))}
    </div>
  );
});

const AdditionEquations = () => {
  const { fetchAdditionEquations, fetchUserAnswers, answerEquation } = useEquationStore();

  const [equations, setEquations] = useState([]);
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const eqs = await fetchAdditionEquations();
      setEquations(eqs || []);

      const userAnswers = (await fetchUserAnswers()) || [];
      const answersMap = {};
      const solved = {};

      userAnswers.forEach((ua) => {
        if (ua.equation?.type === "addition") {
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
      alert(res.error);
      return;
    }
    setResults((prev) => ({ ...prev, [id]: res.correct }));
  };

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-sky-50">
        <motion.div animate={{ rotate: 360, scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1.5 }}>
          <Flower2 className="text-emerald-500" size={64} />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full font-serif relative overflow-x-hidden p-4 md:p-8 selection:bg-emerald-200" dir="rtl">
      <GardenBackground />

      {/* Content Layer */}
      <div className="relative z-10">
        <header className="flex flex-col md:flex-row justify-between items-center gap-6 mb-16">
          <motion.button 
            whileHover={{ x: 5, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.history.back()}
            className="group p-4 bg-white/90 backdrop-blur-md rounded-2xl border-b-4 border-emerald-700 text-emerald-800 shadow-xl flex items-center gap-2 font-black"
          >
            <ArrowLeft className="group-hover:-translate-x-1 transition-transform" size={24} />
            <span>العودة للخريطة</span>
          </motion.button>

          <div className="text-center bg-white/40 backdrop-blur-sm p-6 rounded-[2.5rem] border-2 border-white/50 shadow-sm">
              <h1 className="text-5xl md:text-7xl font-black text-emerald-900 drop-shadow-sm flex items-center justify-center gap-4">
                  حديقة <span className="text-blue-600 underline decoration-wavy decoration-emerald-200">الجمع</span>
                  <Sparkles className="text-amber-400 animate-bounce" />
              </h1>
              <p className="text-emerald-800 text-xl font-bold mt-2">اسقِ الزهور بحل المسائل الرياضية!</p>
          </div>

          <div className="bg-gradient-to-br from-amber-50 to-white p-4 rounded-3xl border-b-4 border-amber-500 shadow-2xl flex gap-6 items-center">
               <div className="flex items-center gap-2">
                  <div className="w-12 h-12 bg-amber-400 rounded-full flex items-center justify-center shadow-lg">
                      <Coins className="text-amber-900" size={24} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-amber-800">نقاط الحديقة</span>
                    <span className="text-3xl font-black text-amber-900 leading-none">
                        {Object.values(results).filter(Boolean).length * 100}
                    </span>
                  </div>
               </div>
          </div>
        </header>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 pb-32">
          {equations.map((eq, index) => {
            const isSolved = results[eq._id] === true;
            const hasAttempted = results[eq._id] === false;

            return (
              <motion.div
                key={eq._id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className={`
                  relative p-10 rounded-[4rem] border-4 transition-all duration-500
                  ${isSolved 
                    ? 'bg-emerald-50/95 border-emerald-400 shadow-[0_20px_50px_rgba(16,185,129,0.2)]' 
                    : 'bg-white/95 border-blue-100 hover:border-blue-300 hover:shadow-2xl'}
                  flex flex-col items-center gap-8
                `}
              >
                {/* Animal Guardian */}
                <div className="absolute -top-8 -right-4 z-20">
                   <motion.div 
                      animate={{ 
                        y: [0, -10, 0],
                        rotate: isSolved ? [0, 360] : [0, 5, -5, 0]
                      }} 
                      transition={{ 
                        y: { repeat: Infinity, duration: 3 },
                        rotate: { duration: isSolved ? 0.5 : 4, repeat: isSolved ? 0 : Infinity }
                      }}
                      className={`w-24 h-24 rounded-3xl flex items-center justify-center text-5xl shadow-2xl border-4 ${isSolved ? 'bg-emerald-500 border-white text-white' : 'bg-white border-blue-100'}`}
                   >
                      {isSolved ? "🦋" : (index % 3 === 0 ? "🐰" : (index % 3 === 1 ? "🐼" : "🐿️"))}
                   </motion.div>
                </div>

                <div className="flex items-center gap-6 text-6xl md:text-7xl font-black text-slate-800 drop-shadow-sm">
                   <span className="bg-gradient-to-t from-slate-200 to-transparent rounded-2xl px-2">{eq.question}</span>
                   <span className="text-blue-500 font-light">=</span>
                </div>

                <div className="w-full flex flex-col items-center gap-6">
                  <div className="relative w-full max-w-[220px]">
                      <input
                          type="number"
                          value={answers[eq._id] || ""}
                          disabled={isSolved}
                          onChange={(e) => handleChange(eq._id, e.target.value)}
                          placeholder="؟"
                          className={`
                              w-full text-center p-8 text-5xl font-black rounded-[2.5rem] outline-none border-b-8 transition-all
                              ${isSolved 
                                ? 'bg-emerald-100 border-emerald-500 text-emerald-700' 
                                : 'bg-blue-50 border-blue-400 focus:bg-white text-blue-800 placeholder-blue-200'}
                          `}
                      />
                      {isSolved && (
                          <motion.div 
                            initial={{ scale: 0, rotate: -90 }} 
                            animate={{ scale: 1, rotate: 0 }} 
                            className="absolute -left-6 -top-6 bg-emerald-500 text-white p-3 rounded-full shadow-xl border-4 border-white"
                          >
                              <CheckCircle2 size={36} />
                          </motion.div>
                      )}
                  </div>

                  <motion.button
                    whileHover={!isSolved ? { scale: 1.02, y: -2 } : {}}
                    whileTap={!isSolved ? { scale: 0.98 } : {}}
                    disabled={isSolved}
                    onClick={() => submitAnswer(eq._id)}
                    className={`
                      w-full py-6 rounded-[2rem] font-black text-2xl tracking-wide transition-all
                      ${isSolved 
                          ? 'bg-emerald-100 text-emerald-400 cursor-not-allowed border-b-0' 
                          : 'bg-gradient-to-b from-blue-400 to-blue-700 text-white shadow-[0_10px_0_#1d4ed8] hover:shadow-[0_5px_0_#1d4ed8] hover:translate-y-1 active:shadow-none active:translate-y-2'}
                    `}
                  >
                    {isSolved ? "تم الإرواء بنجاح!" : "تأكد من الإجابة"}
                  </motion.button>

                  <AnimatePresence>
                      {hasAttempted && (
                          <motion.div 
                              initial={{ y: -10, opacity: 0 }} 
                              animate={{ y: 0, opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="bg-rose-50 text-rose-600 p-3 rounded-xl font-black text-lg flex items-center gap-2 border border-rose-100"
                          >
                              <XCircle size={20} /> أوه! حاول مرة أخرى يا بطل
                          </motion.div>
                      )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdditionEquations;