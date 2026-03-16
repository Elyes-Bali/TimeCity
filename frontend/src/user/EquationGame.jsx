import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trophy,
  Lock,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  Calculator,
  Train,
  Star,
  Sun,
  Cloud,
  Ghost,
  Moon,
  Rocket,
  Heart,
  Zap,
  Sparkles,
  Smile,
  Target,
} from "lucide-react";

// استخدام المسار الصحيح للمتجر لضمان التوافق مع البيئة
import { useEquationStore } from "../store/equationStore";
import ClockQuestion from "../clocks/ClockQuestion";

const types = [
  "addition",
  "subtraction",
  "multiplication",
  "division",
  "clock",
];

const typeTranslations = {
  addition: "مملكة الجمع",
  subtraction: "وادي الطرح",
  multiplication: "قلعة الضرب",
  division: "جزيرة القسمة",
  clock: "كوكب الساعات",
};

// مكون القطار المطور بتصميم أكثر تفصيلاً وجمالاً
const TravelingTrain = () => {
  return (
    <div className="fixed bottom-12 left-0 w-full overflow-hidden pointer-events-none z-0 h-32">
      <motion.div
        initial={{ x: "-120%" }}
        animate={{ x: "100vw" }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
        className="flex items-end gap-0.5 relative"
      >
        {/* قاطرة القطار الرئيسية */}
        <div className="relative flex items-end">
          {/* الدخان المتصاعد */}
          <div className="absolute top-0 left-10">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                initial={{ y: 0, opacity: 0.8, scale: 0.5 }}
                animate={{ y: -60, opacity: 0, scale: 2 }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.4,
                  ease: "easeOut",
                }}
                className="absolute w-8 h-8 bg-zinc-400/40 rounded-full blur-md"
              />
            ))}
          </div>

          {/* جسم القاطرة */}
          <div className="relative z-10 text-orange-600">
            <Train size={80} fill="currentColor" strokeWidth={1} />
          </div>
        </div>

        {/* العربات الملونة */}
        {[
          {
            color: "bg-amber-400",
            icon: <Star size={16} className="text-white" />,
          },
          {
            color: "bg-blue-400",
            icon: <Smile size={16} className="text-white" />,
          },
          {
            color: "bg-rose-400",
            icon: <Heart size={16} className="text-white" />,
          },
          {
            color: "bg-emerald-400",
            icon: <Zap size={16} className="text-white" />,
          },
        ].map((wagon, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <div
              className={`w-16 h-10 ${wagon.color} rounded-t-lg shadow-inner flex items-center justify-center border-b-4 border-zinc-800/20`}
            >
              {wagon.icon}
            </div>
            <div className="flex gap-4 px-1">
              <div className="w-4 h-4 bg-zinc-800 rounded-full border-2 border-zinc-600" />
              <div className="w-4 h-4 bg-zinc-800 rounded-full border-2 border-zinc-600" />
            </div>
          </div>
        ))}

        {/* وصلة القطار */}
        <div className="absolute bottom-4 left-0 w-full h-1 bg-zinc-300/30 -z-10" />
      </motion.div>

      {/* سكة الحديد المبسطة */}
      {/* <div className="absolute bottom-4 left-0 w-full h-1.5 bg-zinc-200" /> */}
      {/* <div className="absolute bottom-2 left-0 w-full h-0.5 bg-zinc-300 opacity-50" /> */}
    </div>
  );
};

const StickersBackground = () => {
  const stickers = [
    { Icon: Star, color: "text-yellow-400", top: "5%", left: "5%" },
    { Icon: Sun, color: "text-orange-500", top: "12%", left: "85%" },
    { Icon: Cloud, color: "text-blue-400", top: "35%", left: "92%" },
    { Icon: Ghost, color: "text-purple-400", top: "70%", left: "3%" },
    { Icon: Trophy, color: "text-emerald-500", top: "85%", left: "80%" },
    { Icon: Moon, color: "text-indigo-400", top: "50%", left: "10%" },
    { Icon: Rocket, color: "text-rose-500", top: "20%", left: "45%" },
    { Icon: Heart, color: "text-pink-500", top: "75%", left: "15%" },
    { Icon: Zap, color: "text-yellow-600", top: "60%", left: "88%" },
    { Icon: Sparkles, color: "text-cyan-500", top: "5%", left: "70%" },
    { Icon: Smile, color: "text-orange-400", top: "90%", left: "40%" },
    { Icon: Target, color: "text-emerald-500", top: "30%", left: "2%" },
    { Icon: Star, color: "text-amber-400", top: "45%", left: "75%" },
    { Icon: Cloud, color: "text-zinc-400", top: "15%", left: "20%" },
  ];

  const mathSymbols = ["+", "−", "×", "÷"];
  const symbolColors = [
    "text-rose-500",
    "text-cyan-500",
    "text-purple-500",
    "text-amber-500",
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`math-${i}`}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: [0.2, 0.4, 0.2],
            x: [0, Math.random() * 40 - 20, 0],
            y: [0, Math.random() * 60 - 30, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            ease: "linear",
          }}
          className={`absolute font-black text-4xl ${symbolColors[i % 4]}`}
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
        >
          {mathSymbols[i % 4]}
        </motion.div>
      ))}

      {stickers.map((item, idx) => (
        <motion.div
          key={idx}
          className={`absolute ${item.color} opacity-60`}
          style={{ top: item.top, left: item.left }}
          animate={{
            rotate: [0, 15, -15, 0],
            scale: [1, 1.2, 1],
            y: [0, -10, 0],
          }}
          transition={{
            duration: 4 + (idx % 4),
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <item.Icon size={idx % 2 === 0 ? 52 : 68} strokeWidth={2} />
        </motion.div>
      ))}
    </div>
  );
};

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-zinc-50">
      {/* طبقات ألوان أكثر كثافة ووضوحاً */}
      <motion.div
        animate={{
          scale: [1, 1.4, 1],
          x: [0, 80, 0],
          y: [0, 50, 0],
          rotate: [0, 15, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute -top-[15%] -left-[10%] w-[85%] h-[85%] bg-gradient-to-br from-orange-400/40 to-rose-300/40 blur-[100px] rounded-[40%]"
      />
      <motion.div
        animate={{
          scale: [1.3, 1, 1.3],
          x: [0, -90, 0],
          y: [0, -60, 0],
          rotate: [0, -20, 0],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-[10%] -right-[10%] w-[95%] h-[95%] bg-gradient-to-tl from-cyan-400/40 to-indigo-300/40 blur-[120px] rounded-[50%]"
      />

      <motion.div
        animate={{
          opacity: [0.4, 0.7, 0.4],
          scale: [1, 1.25, 1],
          x: [30, -30, 30],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[20%] left-[25%] w-[65%] h-[65%] bg-gradient-to-tr from-purple-400/30 to-pink-300/30 blur-[90px] rounded-full"
      />

      <motion.div
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: [0.8, 1.2, 0.8],
          y: [40, -40, 40],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[20%] left-[10%] w-[55%] h-[55%] bg-gradient-to-r from-emerald-300/30 to-teal-200/30 blur-[80px] rounded-full"
      />

      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0.1, 0.25, 0.1],
            y: [0, -30, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: 8 + i * 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute text-orange-500/30"
          style={{
            top: `${(i * 19) % 100}%`,
            left: `${(i * 29) % 100}%`,
          }}
        >
          <Clock className="w-24 h-24" strokeWidth={0.25} />
        </motion.div>
      ))}

      <StickersBackground />
      <TravelingTrain />
      {/* نمط النقاط في الخلفية */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#000 1.5px, transparent 0)",
          backgroundSize: "50px 50px",
        }}
      />
    </div>
  );
};

const EquationGame = () => {
  const {
    fetchProgress,
    progress,
    fetchUserAnswers,
    fetchAdditionEquations,
    fetchSubtractionEquations,
    fetchMultiplicationEquations,
    fetchDivisionEquations,
    fetchClockEquations,
    answerEquation,
  } = useEquationStore();

  const [currentType, setCurrentType] = useState("addition");
  const [equations, setEquations] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [feedbackState, setFeedbackState] = useState({});
  const [showSolutionState, setShowSolutionState] = useState({});
  const [showHintState, setShowHintState] = useState({});
  const [attemptsState, setAttemptsState] = useState({});

  const [hours, setHours] = useState({});
  const [minutes, setMinutes] = useState({});
  const [seconds, setSeconds] = useState({});

  useEffect(() => {
    const loadData = async () => {
      await fetchProgress();
      const answers = await fetchUserAnswers();
      setUserAnswers(answers);
    };
    loadData();
  }, []);

  useEffect(() => {
    const load = async () => {
      const answers = await fetchUserAnswers();
      setUserAnswers(answers);
      await loadEquations(answers);
    };
    load();
  }, [currentType, progress]);

  const loadEquations = async (answers = userAnswers) => {
    if (!progress) return;

    let data = [];
    if (currentType === "addition") data = await fetchAdditionEquations();
    if (currentType === "subtraction") data = await fetchSubtractionEquations();
    if (currentType === "multiplication")
      data = await fetchMultiplicationEquations();
    if (currentType === "division") data = await fetchDivisionEquations();
    if (currentType === "clock") data = await fetchClockEquations();
    const hoursInit = {};
    const minutesInit = {};
    const secondsInit = {};
    const showSolutionInit = {};
    const feedbackInit = {};
    const attemptsInit = {};
    const showHintInit = {};

    data.forEach((eq) => {
      const ua = answers.find(
        (a) => a.equation && a.equation._id === eq._id && a.isCorrect,
      );

      if (ua) {
        const total = ua.userAnswer;
        hoursInit[eq._id] = Math.floor(total / 3600);
        minutesInit[eq._id] = Math.floor((total % 3600) / 60);
        secondsInit[eq._id] = total % 60;

        showSolutionInit[eq._id] = true;
        feedbackInit[eq._id] = "إجابة صحيحة! ✅";
        attemptsInit[eq._id] = 3;
        showHintInit[eq._id] = false;
      } else {
        attemptsInit[eq._id] = attemptsState[eq._id] || 0;
        showHintInit[eq._id] = showHintState[eq._id] || false;
      }
    });

    setEquations(data);
    setHours((prev) => ({ ...prev, ...hoursInit }));
    setMinutes((prev) => ({ ...prev, ...minutesInit }));
    setSeconds((prev) => ({ ...prev, ...secondsInit }));
    setShowSolutionState((prev) => ({ ...prev, ...showSolutionInit }));
    setFeedbackState((prev) => ({ ...prev, ...feedbackInit }));
    setAttemptsState((prev) => ({ ...prev, ...attemptsInit }));
    setShowHintState((prev) => ({ ...prev, ...showHintInit }));
  };

  const totalSeconds = (id) =>
    Number(hours[id] || 0) * 3600 +
    Number(minutes[id] || 0) * 60 +
    Number(seconds[id] || 0);

  const handleSubmit = async (eq) => {
    const total = totalSeconds(eq._id);
    if (total === 0) return;

    const res = await answerEquation(eq._id, total);

    if (res.correct) {
      setFeedbackState((prev) => ({ ...prev, [eq._id]: "إجابة صحيحة! ✅" }));
      setShowSolutionState((prev) => ({ ...prev, [eq._id]: true }));
      setAttemptsState((prev) => ({ ...prev, [eq._id]: 3 }));
      setShowHintState((prev) => ({ ...prev, [eq._id]: false }));
    } else {
      const prevAttempts = attemptsState[eq._id] || 0;
      const newAttempts = prevAttempts + 1;
      setAttemptsState((prev) => ({ ...prev, [eq._id]: newAttempts }));

      if (newAttempts >= 3) {
        setShowHintState((prev) => ({ ...prev, [eq._id]: true }));
        setFeedbackState((prev) => ({
          ...prev,
          [eq._id]: "❌ لقد نفدت المحاولات. الحل الصحيح موضح أدناه.",
        }));
      } else {
        setFeedbackState((prev) => ({
          ...prev,
          [eq._id]: "❌ إجابة خاطئة، حاول مجدداً",
        }));
      }
    }

    const updatedAnswers = await fetchUserAnswers();
    setUserAnswers(updatedAnswers);
    fetchProgress();
  };

  const formatTimeAr = (totalSeconds) => {
    if (totalSeconds == null) return "";
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    let result = "";
    if (h > 0) result += `${h} ساعة `;
    if (m > 0) result += `${m} دقيقة `;
    if (s >= 0) result += `${s} ثانية`;
    return result.trim();
  };

  if (!progress) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center font-sans text-zinc-900">
        <div className="flex flex-col items-center gap-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full"
          />
          <p className="text-2xl font-bold">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen text-zinc-900 font-sans selection:bg-orange-100 selection:text-orange-900 relative"
      dir="rtl"
    >
      <AnimatedBackground />

      <nav className="sticky top-0 z-50 bg-white/40 backdrop-blur-2xl border-b border-white/30 px-8 py-6 shadow-2xl shadow-zinc-200/30">
        <div className="max-w-8xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-4">
            <motion.div
              whileHover={{ rotate: 180, scale: 1.1 }}
              className="p-3.5 bg-gradient-to-br from-orange-500 to-rose-600 rounded-3xl shadow-lg"
            >
              <Clock className="w-9 h-9 text-white" />
            </motion.div>
            <h1 className="text-4xl font-black tracking-tight text-zinc-900 drop-shadow-sm">
              تحدي الوقت الرقمي
            </h1>
          </div>

          <div className="flex gap-4 p-2.5 bg-white/50 backdrop-blur-md rounded-[2.5rem] border border-white/60 shadow-inner overflow-x-auto max-w-full no-scrollbar">
            <a
              href="/"
              className=" px-8 py-4 rounded-2xl text-xl font-black transition-all duration-300 flex items-center gap-3 whitespace-nowrap"
            >
              الصفحة الرئيسية
            </a>
            {types.map((type) => {
              const unlocked = type === "clock" || progress.unlockedTypes.includes(type);
              const isActive = currentType === type;
              return (
                <button
                  key={type}
                  disabled={type !== "clock" && !unlocked}
                  onClick={() => setCurrentType(type)}
                  className={`
                    px-8 py-4 rounded-2xl text-xl font-black transition-all duration-300 flex items-center gap-3 whitespace-nowrap
                    ${isActive ? "bg-white text-orange-600 shadow-xl shadow-orange-100/50 ring-2 ring-orange-100" : "text-zinc-500 hover:text-zinc-900 hover:bg-white/60"}
                    ${type !== "clock" && !unlocked ? "opacity-50 cursor-not-allowed grayscale" : ""}
                  `}
                >
                  <span>{typeTranslations[type]}</span>
                  {type !== "clock" && !unlocked ? <Lock className="w-5 h-5" /> : null}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-14 relative z-20">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
  {types.map((type) => (
    <>
       {type !== "clock" && (
    <motion.div
      key={type}
      whileHover={{ y: -10, scale: 1.05 }}
      className="group relative bg-white/80 backdrop-blur-xl border border-white p-8 rounded-[3rem] shadow-2xl shadow-zinc-300/40 overflow-hidden transition-all"
    >
      {/* Only show Trophy if type is not clock */}
      
        <div className="absolute -right-4 -top-4 p-5 text-orange-600 opacity-10 group-hover:opacity-20 transition-opacity">
          <Trophy className="w-28 h-28" />
        </div>
     
 
      <p className="text-sm uppercase tracking-[0.2em] text-orange-600 font-black mb-4">
        {typeTranslations[type]}
      </p>
       
        
      <div className="flex items-baseline gap-2">
        <p className="text-5xl font-black text-zinc-900 tracking-tight">
          {progress.points[type] || 0}
        </p>
        <span className="text-lg text-zinc-500 font-bold">نقطة</span>
      </div>
     
    </motion.div>
      )}
      </>
  ))}
</div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <AnimatePresence mode="popLayout">
            {equations.map((eq) => {
              const isCorrect = showSolutionState[eq._id];
              const hasHint = showHintState[eq._id];

              return (
                <motion.div
                  layout
                  key={eq._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className={`
                    relative bg-white/90 backdrop-blur-3xl border-4 p-12 rounded-[4.5rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.12)] transition-all duration-700
                    ${isCorrect ? "border-emerald-400 bg-emerald-50/60 shadow-emerald-200/40" : "border-white hover:border-orange-200 hover:bg-white"}
                  `}
                >
                  <div className="flex justify-between items-center mb-12">
                    <div className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-orange-100/50 text-sm font-black uppercase tracking-widest text-orange-700 ring-2 ring-orange-200/50">
                      <Calculator className="w-5 h-5" /> مسألة زمنية
                    </div>
                    {isCorrect && (
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        className="bg-emerald-100 p-4 rounded-3xl shadow-lg shadow-emerald-200/50"
                      >
                        <CheckCircle2 className="text-emerald-600 w-10 h-10" />
                      </motion.div>
                    )}
                  </div>

                  {/* <h2 className="text-6xl font-black tracking-tighter text-zinc-900 mb-14 text-center leading-[1.2]">
                    {eq.question}
                  </h2> */}
                  {eq.mode === "clock" ? (
                    <>
                      <span className="text-center font-black block mb-2 text-2xl decoration-orange-400 decoration-4 underline-offset-4 underline">
                        {" "}
                        كم الساعة ؟
                      </span>
                      <ClockQuestion eq={eq} />
                    </>
                  ) : (
                    <h2 className="text-6xl font-black tracking-tighter text-zinc-900 mb-14 text-center leading-[1.2]">
                      {eq.question}
                    </h2>
                  )}
                  {hasHint && !isCorrect && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mb-12 p-10 rounded-[3rem] bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200/50 text-amber-950 text-xl flex items-start gap-6 shadow-xl shadow-amber-200/20"
                    >
                      <AlertCircle className="w-9 h-9 flex-shrink-0 text-orange-500 mt-1" />
                      <div>
                        <span className="font-black block mb-2 text-2xl decoration-orange-400 decoration-4 underline-offset-4 underline">
                          تلميح ذكي
                        </span>
                        الحل الصحيح هو:{" "}
                        <span className="font-black text-orange-700 bg-white px-4 py-1.5 rounded-2xl border-2 border-orange-200/50 inline-block mt-2">
                          {formatTimeAr(eq.correctAnswer)}
                        </span>
                      </div>
                    </motion.div>
                  )}

                  <div className="grid grid-cols-3 gap-6 mb-12" dir="ltr">
                    {[
                      {
                        label: "ساعة",
                        state: hours,
                        setter: setHours,
                        color: "focus:border-blue-500 focus:ring-blue-100",
                      },
                      {
                        label: "دقيقة",
                        state: minutes,
                        setter: setMinutes,
                        color:
                          "focus:border-emerald-500 focus:ring-emerald-100",
                      },
                      {
                        label: "ثانية",
                        state: seconds,
                        setter: setSeconds,
                        color: "focus:border-orange-500 focus:ring-orange-100",
                      },
                    ].map((input) => (
                      <div key={input.label} className="group relative">
                        <input
                          type="number"
                          placeholder="00"
                          value={input.state[eq._id] ?? ""}
                          onChange={(e) =>
                            input.setter((prev) => ({
                              ...prev,
                              [eq._id]: e.target.value,
                            }))
                          }
                          className={`
                            w-full py-12 text-center text-5xl font-black bg-zinc-50 rounded-[3rem] border-4 transition-all duration-300
                            ${isCorrect ? "border-emerald-200 text-emerald-600 bg-emerald-100/20 shadow-none" : `border-zinc-100 group-hover:border-zinc-300 ${input.color} focus:ring-8 focus:bg-white outline-none shadow-inner`}
                            disabled:opacity-80
                          `}
                          disabled={isCorrect}
                        />
                        <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 px-6 py-2 bg-white rounded-full text-base text-zinc-500 font-black uppercase tracking-widest border-2 border-zinc-100 shadow-md">
                          {input.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleSubmit(eq)}
                    disabled={isCorrect}
                    className={`
                      group relative w-full py-9 rounded-[3.5rem] font-black text-3xl overflow-hidden transition-all duration-500
                      ${
                        isCorrect
                          ? "bg-emerald-500 text-white shadow-2xl shadow-emerald-200"
                          : "bg-zinc-900 text-white hover:bg-orange-600 hover:shadow-[0_20px_40px_rgba(249,115,22,0.4)] active:scale-[0.98]"
                      }
                    `}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-5">
                      {isCorrect ? "تم الإنجاز بنجاح" : "إرسال الإجابة الآن"}
                      {!isCorrect && (
                        <Send className="w-9 h-9 rotate-180 transition-transform group-hover:-translate-x-4" />
                      )}
                    </span>
                    {!isCorrect && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    )}
                  </motion.button>

                  {feedbackState[eq._id] && (
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`mt-10 text-2xl font-black text-center tracking-wide ${isCorrect ? "text-emerald-600" : "text-rose-500"}`}
                    >
                      {feedbackState[eq._id]}
                    </motion.p>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </main>

      <footer className="relative z-20 py-24 text-center">
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="inline-block"
        >
          <p className="text-zinc-500 text-xl font-black tracking-[0.3em] uppercase">
            تعلم الوقت بذكاء وبطريقة ممتعة
          </p>
          <div className="w-24 h-1.5 bg-orange-500 mx-auto mt-6 rounded-full opacity-50" />
        </motion.div>
      </footer>
    </div>
  );
};

export default EquationGame;
