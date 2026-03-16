import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useEquationStore } from "../store/equationStore";
import ClockQuestion from "./ClockQuestion";
import { Send, CheckCircle2, AlertCircle, Calculator } from "lucide-react";

const ClockMode = () => {
 const {
    fetchUserAnswers,
    fetchClockEquations,
    answerEquation,
  } = useEquationStore();

  const [equations, setEquations] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [feedbackState, setFeedbackState] = useState({});
  const [showSolutionState, setShowSolutionState] = useState({});
  const [showHintState, setShowHintState] = useState({});
  const [attemptsState, setAttemptsState] = useState({});

  const [hours, setHours] = useState({});
  const [minutes, setMinutes] = useState({});
  const [seconds, setSeconds] = useState({});

  // Load user answers
  useEffect(() => {
    const load = async () => {
      const answers = await fetchUserAnswers();
      setUserAnswers(answers);
      await loadEquations(answers);
    };
    load();
  }, []);

  const loadEquations = async (answers = userAnswers) => {
    const data = await fetchClockEquations();

    const hoursInit = {};
    const minutesInit = {};
    const secondsInit = {};
    const showSolutionInit = {};
    const feedbackInit = {};
    const attemptsInit = {};
    const showHintInit = {};

    data.forEach((eq) => {
      const ua = answers.find(a => a.equation?._id === eq._id && a.isCorrect);
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
    setHours(hoursInit);
    setMinutes(minutesInit);
    setSeconds(secondsInit);
    setShowSolutionState(showSolutionInit);
    setFeedbackState(feedbackInit);
    setAttemptsState(attemptsInit);
    setShowHintState(showHintInit);
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
      setFeedbackState(prev => ({ ...prev, [eq._id]: "إجابة صحيحة! ✅" }));
      setShowSolutionState(prev => ({ ...prev, [eq._id]: true }));
      setAttemptsState(prev => ({ ...prev, [eq._id]: 3 }));
      setShowHintState(prev => ({ ...prev, [eq._id]: false }));
    } else {
      const prevAttempts = attemptsState[eq._id] || 0;
      const newAttempts = prevAttempts + 1;
      setAttemptsState(prev => ({ ...prev, [eq._id]: newAttempts }));

      if (newAttempts >= 3) {
        setShowHintState(prev => ({ ...prev, [eq._id]: true }));
        setFeedbackState(prev => ({
          ...prev,
          [eq._id]: "❌ لقد نفدت المحاولات. الحل الصحيح موضح أدناه.",
        }));
      } else {
        setFeedbackState(prev => ({ ...prev, [eq._id]: "❌ إجابة خاطئة، حاول مجدداً" }));
      }
    }

    const updatedAnswers = await fetchUserAnswers();
    setUserAnswers(updatedAnswers);
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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {equations.map(eq => {
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

            <span className="text-center font-black block mb-2 text-2xl decoration-orange-400 decoration-4 underline-offset-4 underline"> كم الساعة ؟</span>
            <ClockQuestion eq={eq} />

            {hasHint && !isCorrect && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-12 p-10 rounded-[3rem] bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200/50 text-amber-950 text-xl flex items-start gap-6 shadow-xl shadow-amber-200/20"
              >
                <AlertCircle className="w-9 h-9 flex-shrink-0 text-orange-500 mt-1" />
                <div>
                  <span className="font-black block mb-2 text-2xl decoration-orange-400 decoration-4 underline-offset-4 underline">تلميح ذكي</span>
                  الحل الصحيح هو: <span className="font-black text-orange-700 bg-white px-4 py-1.5 rounded-2xl border-2 border-orange-200/50 inline-block mt-2">{formatTimeAr(eq.correctAnswer)}</span>
                </div>
              </motion.div>
            )}

            <div className="grid grid-cols-3 gap-6 mb-12" dir="ltr">
              {[
                { label: "ساعة", state: hours, setter: setHours, color: "focus:border-blue-500 focus:ring-blue-100" },
                { label: "دقيقة", state: minutes, setter: setMinutes, color: "focus:border-emerald-500 focus:ring-emerald-100" },
                { label: "ثانية", state: seconds, setter: setSeconds, color: "focus:border-orange-500 focus:ring-orange-100" }
              ].map(input => (
                <div key={input.label} className="group relative">
                  <input
                    type="number"
                    placeholder="00"
                    value={input.state[eq._id] ?? ""}
                    onChange={(e) => input.setter(prev => ({ ...prev, [eq._id]: e.target.value }))}
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
                ${isCorrect 
                  ? "bg-emerald-500 text-white shadow-2xl shadow-emerald-200" 
                  : "bg-zinc-900 text-white hover:bg-orange-600 hover:shadow-[0_20px_40px_rgba(249,115,22,0.4)] active:scale-[0.98]"}
              `}
            >
              <span className="relative z-10 flex items-center justify-center gap-5">
                {isCorrect ? "تم الإنجاز بنجاح" : "إرسال الإجابة الآن"}
                {!isCorrect && <Send className="w-9 h-9 rotate-180 transition-transform group-hover:-translate-x-4" />}
              </span>
              {!isCorrect && <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />}
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
    </div>
  );
};


export default ClockMode
