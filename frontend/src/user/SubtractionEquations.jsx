import React, { useEffect, useState, useMemo, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  TrainFront, 
  ArrowLeft, 
  Clock, 
  Ticket, 
  Navigation, 
  CheckCircle2, 
  XCircle, 
  Coins, 
  Cloud,
  ChevronRight,
  MapPin
} from "lucide-react";
import { useEquationStore } from "../store/equationStore";

// --- Decorative Train Station Components ---
const TrainStationDecor = memo(() => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-slate-100">
      {/* Sky */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-300 via-sky-100 to-orange-50/30" />
      
      {/* Moving Clouds */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-white/60"
          initial={{ x: -300, y: 30 + i * 70 }}
          animate={{ x: '115vw' }}
          transition={{ duration: 35 + i * 12, repeat: Infinity, ease: "linear", delay: i * 4 }}
        >
          <Cloud size={120 + i * 30} />
        </motion.div>
      ))}

      {/* BIGGER AND BETTER DESIGNED TRAIN */}
      <motion.div
        className="absolute bottom-[25%] z-10 left-0 flex items-end scale-150 md:scale-[2.2]"
        initial={{ x: "-100%" }}
        animate={{ x: "150vw" }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        {/* Steam Puffs with improved variation */}
        <div className="absolute -top-24 left-16">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-white/60 rounded-full blur-sm"
              initial={{ scale: 0.3, opacity: 0, y: 0 }}
              animate={{ scale: [1, 3], opacity: [0.8, 0], y: -120, x: -40 }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.3 }}
              style={{ width: 35, height: 35 }}
            />
          ))}
        </div>

        {/* Enhanced Train Engine */}
        <div className="relative flex items-end">
          {/* Cowcatcher / Front Grille */}
          <div className="absolute bottom-2 -left-6 w-10 h-10 bg-slate-900 clip-path-polygon-[0%_100%,100%_100%,100%_0%]" style={{ clipPath: 'polygon(0% 100%, 100% 100%, 100% 0%)' }} />
          
          {/* Main Boiler Section */}
          <div className="w-48 h-24 bg-red-600 rounded-tr-3xl relative border-b-8 border-red-800 shadow-xl">
             {/* Boiler Bands */}
             <div className="absolute left-8 top-0 w-3 h-full bg-red-700/50" />
             <div className="absolute left-24 top-0 w-3 h-full bg-red-700/50" />
             
             {/* Headlight */}
             <motion.div 
               animate={{ opacity: [1, 0.6, 1] }}
               transition={{ duration: 0.5, repeat: Infinity }}
               className="absolute top-4 -left-2 w-6 h-6 bg-yellow-200 rounded-full border-2 border-slate-800 shadow-[0_0_20px_rgba(253,224,71,0.8)]" 
             />
             
             {/* Chimney */}
             <div className="absolute -top-14 left-12 w-10 h-16 bg-slate-800 rounded-t-lg">
                <div className="w-14 h-4 bg-slate-900 -ml-2 rounded-full" />
             </div>
          </div>

          {/* Cabin */}
          <div className="w-32 h-36 bg-red-700 rounded-t-xl relative border-b-8 border-red-900 shadow-2xl -ml-2 z-10">
             <div className="absolute top-4 left-4 right-4 h-16 bg-sky-200 border-4 border-slate-800 rounded-md shadow-inner overflow-hidden">
                <div className="w-full h-2 bg-white/40 -rotate-45 translate-y-4" />
             </div>
             {/* Cabin Roof */}
             <div className="absolute -top-2 -left-2 -right-2 h-6 bg-slate-900 rounded-full shadow-lg" />
          </div>

          {/* Engine Wheels */}
          <div className="absolute -bottom-6 flex gap-4 px-2 w-full justify-around">
            {[...Array(3)].map((_, i) => (
              <motion.div 
                key={i}
                className="w-12 h-12 rounded-full border-4 border-slate-900 bg-slate-700 relative shadow-lg"
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              >
                <div className="absolute top-1/2 left-0 w-full h-2 bg-slate-900 -translate-y-1/2" />
                <div className="absolute top-0 left-1/2 h-full w-2 bg-slate-900 -translate-x-1/2" />
                <div className="absolute inset-2 rounded-full bg-slate-800 border-2 border-slate-600" />
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Enhanced Carriages */}
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex items-end">
             {/* Coupler */}
             <div className="w-6 h-3 bg-slate-800 mb-6 shadow-md" />
             {/* Coach Body */}
             <div className={`w-40 h-28 ${i === 0 ? 'bg-blue-600 border-blue-800' : 'bg-emerald-600 border-emerald-800'} rounded-xl relative border-b-8 shadow-2xl`}>
                <div className="absolute -top-1 -left-1 -right-1 h-4 bg-slate-900 rounded-full" />
                <div className="flex justify-around mt-6 px-4">
                  {[...Array(3)].map((_, win) => (
                    <div key={win} className="w-8 h-10 bg-sky-100 border-2 border-slate-800 rounded-sm shadow-inner" />
                  ))}
                </div>
                {/* Stripe */}
                <div className="absolute bottom-6 w-full h-3 bg-white/20" />
                
                {/* Coach Wheels */}
                <div className="absolute -bottom-6 flex justify-around w-full">
                   <motion.div 
                     animate={{ rotate: 360 }}
                     transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                     className="w-10 h-10 rounded-full border-4 border-slate-900 bg-slate-700 relative shadow-md"
                   >
                     <div className="absolute top-1/2 w-full h-1 bg-slate-900" />
                   </motion.div>
                   <motion.div 
                     animate={{ rotate: 360 }}
                     transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                     className="w-10 h-10 rounded-full border-4 border-slate-900 bg-slate-700 relative shadow-md"
                   >
                     <div className="absolute top-1/2 w-full h-1 bg-slate-900" />
                   </motion.div>
                </div>
             </div>
          </div>
        ))}
      </motion.div>

      {/* Station Platform Floor */}
      <div className="absolute bottom-0 w-full h-1/3 bg-slate-300 border-t-[12px] border-slate-400">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        
        {/* Railway Tracks - More Detailed */}
        <div className="absolute top-0 w-full h-24 flex flex-col justify-center gap-6 px-4 overflow-hidden bg-slate-400/20">
          <div className="h-3 w-[150%] bg-slate-700 -ml-20 shadow-sm" />
          <div className="h-3 w-[150%] bg-slate-700 -ml-20 shadow-sm" />
          <div className="absolute inset-0 flex justify-around items-center">
            {[...Array(50)].map((_, i) => (
              <div key={i} className="h-20 w-3 bg-amber-950/40 rounded-sm rotate-12 shadow-inner" />
            ))}
          </div>
        </div>
      </div>

      {/* Station Clock */}
      <motion.div 
        className="absolute top-10 left-1/2 -translate-x-1/2 md:left-24 md:translate-x-0 w-40 h-40 bg-white rounded-full border-[10px] border-slate-800 shadow-2xl flex items-center justify-center z-20"
        animate={{ rotate: [0, 1, -1, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      >
        <div className="absolute inset-2 border-2 border-slate-200 rounded-full" />
        <Clock size={80} className="text-slate-800 opacity-90" />
        <div className="absolute top-1/2 left-1/2 w-1.5 h-12 bg-red-600 origin-bottom -translate-x-1/2 -translate-y-full rounded-full animate-spin [animation-duration:60s]" />
        <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-slate-900 rounded-full -translate-x-1/2 -translate-y-1/2" />
      </motion.div>
    </div>
  );
});

const SubtractionEquations = () => {
  const { fetchSubtractionEquations, fetchUserAnswers, answerEquation } = useEquationStore();

  const [equations, setEquations] = useState([]);
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const eqs = await fetchSubtractionEquations();
      setEquations(eqs || []);

      const userAnswers = (await fetchUserAnswers()) || [];
      const answersMap = {};
      const solved = {};

      userAnswers.forEach((ua) => {
        if (ua.equation?.type === "subtraction") {
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
  }, [fetchSubtractionEquations, fetchUserAnswers]);

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
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-slate-50">
        <motion.div 
          animate={{ x: [-20, 20, -20] }} 
          transition={{ repeat: Infinity, duration: 1 }}
        >
          <TrainFront className="text-blue-600" size={80} />
        </motion.div>
        <p className="mt-4 font-black text-slate-600 text-2xl">جاري تحضير المحطة...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full font-serif relative overflow-x-hidden p-4 md:p-8" dir="rtl">
      <TrainStationDecor />

      {/* Error Modal */}
      <AnimatePresence>
        {errorMsg && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white p-8 rounded-[2rem] shadow-2xl max-w-sm w-full text-center border-b-8 border-red-500"
            >
              <XCircle className="mx-auto text-red-500 mb-4" size={60} />
              <p className="text-xl font-bold text-slate-800 mb-6">{errorMsg}</p>
              <button 
                onClick={() => setErrorMsg(null)}
                className="w-full py-4 bg-slate-800 text-white rounded-xl font-bold"
              >
                موافق
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="relative z-20 max-w-6xl mx-auto">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
          <motion.button 
            whileHover={{ x: 5 }}
            onClick={() => window.history.back()}
            className="p-4 bg-white/90 backdrop-blur rounded-2xl border-b-4 border-slate-700 text-slate-800 shadow-xl flex items-center gap-2 font-black"
          >
            <ArrowLeft size={24} />
            <span>خروج من المحطة</span>
          </motion.button>

          <div className="text-center bg-white/60 backdrop-blur-md p-6 rounded-[3rem] border-2 border-white shadow-lg">
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 flex items-center justify-center gap-4">
              محطة <span className="text-red-600">الطرح</span>
              <Ticket className="text-amber-500 -rotate-12" size={40} />
            </h1>
            <p className="text-slate-700 text-xl font-bold mt-2 flex items-center justify-center gap-2">
              <MapPin size={20} className="text-red-500" />
              تذاكر ذكية للأبطال الصغار
            </p>
          </div>

          <div className="bg-white/90 p-4 rounded-3xl border-b-4 border-amber-500 shadow-xl flex gap-4 items-center">
            <Coins className="text-amber-500" size={32} />
            <span className="text-3xl font-black text-amber-900 leading-none">
              {Object.values(results).filter(Boolean).length * 100}
            </span>
          </div>
        </header>

        {/* Train Carriage Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-32">
          {equations.map((eq, index) => {
            const isSolved = results[eq._id] === true;
            const isWrong = results[eq._id] === false;

            return (
              <motion.div
                key={eq._id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`
                  relative bg-white/95 rounded-[2.5rem] border-4 transition-all duration-500
                  ${isSolved ? 'border-emerald-500 shadow-emerald-200 shadow-lg' : 'border-slate-200 shadow-xl'}
                  p-8 flex flex-col items-center gap-6 overflow-hidden
                `}
              >
                {/* Carriage Windows Design */}
                <div className="absolute top-4 left-0 w-full flex justify-around opacity-20 pointer-events-none">
                  <div className="w-12 h-12 bg-slate-400 rounded-lg" />
                  <div className="w-12 h-12 bg-slate-400 rounded-lg" />
                  <div className="w-12 h-12 bg-slate-400 rounded-lg" />
                </div>

                {/* Question Area */}
                <div className="mt-6 text-center">
                  <span className="text-sm font-bold text-slate-400 uppercase tracking-widest block mb-2">تذكرة رقم {index + 1}</span>
                  <div className="text-6xl font-black text-slate-800 flex items-center justify-center gap-4">
                    {eq.question}
                    <span className="text-red-500">=</span>
                  </div>
                </div>

                {/* Input Controls */}
                <div className="w-full flex flex-col gap-4">
                  <div className="relative">
                    <input
                      type="number"
                      value={answers[eq._id] || ""}
                      disabled={isSolved}
                      onChange={(e) => handleChange(eq._id, e.target.value)}
                      placeholder="؟"
                      className={`
                        w-full p-6 text-4xl font-black text-center rounded-2xl outline-none transition-all
                        ${isSolved 
                          ? 'bg-emerald-50 text-emerald-600 border-2 border-emerald-500' 
                          : 'bg-slate-50 border-2 border-slate-200 focus:bg-white focus:border-blue-500 text-slate-800'}
                      `}
                    />
                    {isSolved && <CheckCircle2 className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500" size={32} />}
                    {isWrong && <XCircle className="absolute left-4 top-1/2 -translate-y-1/2 text-red-500" size={32} />}
                  </div>

                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    disabled={isSolved}
                    onClick={() => submitAnswer(eq._id)}
                    className={`
                      w-full py-5 rounded-2xl font-black text-2xl flex items-center justify-center gap-2 transition-all
                      ${isSolved 
                        ? 'bg-emerald-500 text-white cursor-default' 
                        : 'bg-slate-800 text-white hover:bg-slate-900 active:bg-black'}
                    `}
                  >
                    {isSolved ? (
                      <>تم التحقق <Navigation className="rotate-90" /></>
                    ) : (
                      <>ركوب القطار <ChevronRight size={24} /></>
                    )}
                  </motion.button>
                </div>

                {/* Status Message */}
                <AnimatePresence>
                  {results[eq._id] !== undefined && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`text-xl font-bold ${results[eq._id] ? "text-emerald-600" : "text-red-500"}`}
                    >
                      {results[eq._id] ? "ممتاز! الإجابة صحيحة ✓" : "حاول مرة أخرى ✗"}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SubtractionEquations;