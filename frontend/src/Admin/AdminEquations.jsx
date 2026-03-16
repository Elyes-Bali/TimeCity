// frontend/src/pages/AdminEquationsDashboard.jsx
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Trash2, Pencil } from "lucide-react";
import { useEquationStore } from "../store/equationStore";

import SideBarAdmin from "./SideBarAdmin";
import { useAuthStore } from "../store/authStore";

// --- Header ---
const Header = ({ title }) => (
  <header className="flex justify-between items-center mb-10">
    <div>
      <h1 className="text-3xl font-black text-white tracking-tight">{title}</h1>
      <p className="text-zinc-500 text-sm font-medium">Welcome back, Admin</p>
    </div>
    <div className="flex items-center gap-4">
      <button className="p-3 bg-zinc-900 border border-white/5 rounded-2xl text-zinc-400 hover:text-white transition-colors">
        <Bell size={20} />
      </button>
      <div className="w-12 h-12 rounded-2xl bg-orange-600 flex items-center justify-center font-black text-white shadow-lg shadow-orange-600/20">
        AD
      </div>
    </div>
  </header>
);

// --- Equations Page ---
const EquationsPage = () => {
  const {
    equations,
    fetchEquations,
    createEquation,
    updateEquation,
    deleteEquation,
  } = useEquationStore();
 const { isAuthenticated, user, logout } = useAuthStore();
  
    const handleLogout = () => {
      logout();
    };

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [type, setType] = useState("addition");

  const [editingId, setEditingId] = useState(null);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [mode, setMode] = useState("equation");
  const [clockType, setClockType] = useState("digital");
  const totalSeconds =
    Number(hours) * 3600 + Number(minutes) * 60 + Number(seconds);

  useEffect(() => {
    fetchEquations();
  }, []);

  // const handleCreateOrUpdate = () => {
  //   if (editingId) {
  //     updateEquation(editingId, { question, correctAnswer: answer, type });
  //     setEditingId(null);
  //   } else {
  //     createEquation({ question, correctAnswer: answer, type });
  //   }
  //   setQuestion("");
  //   setAnswer("");
  //   setType("addition");
  // };

  // const handleCreateOrUpdate = () => {
  //   const totalSeconds =
  //     Number(hours) * 3600 + Number(minutes) * 60 + Number(seconds);

  //   if (editingId) {
  //     updateEquation(editingId, {
  //       question,
  //       correctAnswer: totalSeconds,
  //       type,
  //     });

  //     setEditingId(null);
  //   } else {
  //     createEquation({
  //       question,
  //       correctAnswer: totalSeconds,
  //       type,
  //     });
  //   }

  //   setQuestion("");
  //   setHours(0);
  //   setMinutes(0);
  //   setSeconds(0);
  //   setType("addition");
  // };

  const handleCreateOrUpdate = () => {
    const totalSeconds =
      Number(hours) * 3600 + Number(minutes) * 60 + Number(seconds);

    const data =
      mode === "clock"
        ? {
            mode,
            clockType,
            clockTime: {
              hours: Number(hours),
              minutes: Number(minutes),
              seconds: Number(seconds),
            },
            correctAnswer: totalSeconds,
          }
        : {
            mode,
            question,
            correctAnswer: totalSeconds,
            type,
          };

    if (editingId) {
      updateEquation(editingId, data);
      setEditingId(null);
    } else {
      createEquation(data);
    }

    setQuestion("");
    setHours(0);
    setMinutes(0);
    setSeconds(0);
    setType("addition");
    setMode("equation");
  };
  const handleEdit = (eq) => {
    setQuestion(eq.question);
    setAnswer(eq.correctAnswer);
    setType(eq.type);
    setEditingId(eq._id);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <Header title="Manage Equations" />

      {/* Form */}
      <div className="bg-zinc-900 border border-white/5 p-8 rounded-[2.5rem] mb-10">
        <h3 className="text-xl font-black text-white mb-6">
          {editingId ? "Update Equation" : "Create Equation"}
        </h3>
        <div className="space-y-4 mb-6">
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            className="w-full bg-black border border-white/5 rounded-xl p-4 text-white outline-none focus:border-orange-600"
          >
            <option value="equation">Equation</option>
            <option value="clock">Clock Reading</option>
          </select>

          {mode === "equation" && (
            <>
            <span className="text-zinc-400 text-md">Write you question down below.</span>
              <input
                placeholder="Question (ex: 5 + 7)"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                dir="auto"
                style={{ textAlign: "right" }}
                className="w-full bg-black border border-white/5 rounded-xl p-4 text-white outline-none focus:border-orange-600"
              />

              <div className="flex gap-4">
                Hours
                <input
                  type="number"
                  placeholder="Hours"
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                  className="w-full bg-black border border-white/5 rounded-xl p-4 text-white"
                />
                Minutes
                <input
                  type="number"
                  placeholder="Minutes"
                  value={minutes}
                  onChange={(e) => setMinutes(e.target.value)}
                  className="w-full bg-black border border-white/5 rounded-xl p-4 text-white"
                />
                Seconds
                <input
                  type="number"
                  placeholder="Seconds"
                  value={seconds}
                  onChange={(e) => setSeconds(e.target.value)}
                  className="w-full bg-black border border-white/5 rounded-xl p-4 text-white"
                />
              </div>

                <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full bg-black border border-white/5 rounded-xl p-4 text-white outline-none focus:border-orange-600"
          >
            <option value="addition">Addition</option>
            <option value="subtraction">Subtraction</option>
            <option value="multiplication">Multiplication</option>
            <option value="division">Division</option>
          </select>
            </>
          )}

          {mode === "clock" && (
            <>
              <select
                value={clockType}
                onChange={(e) => setClockType(e.target.value)}
                className="w-full bg-black border border-white/5 rounded-xl p-4 text-white outline-none focus:border-orange-600"
              >
                <option value="digital">Digital Clock</option>
                <option value="analog">Analog Clock</option>
              </select>
              {/* <input
                placeholder="Question (ex: 12:45:20)"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                dir="auto"
                style={{ textAlign: "right" }}
                className="w-full bg-black border border-white/5 rounded-xl p-4 text-white outline-none focus:border-orange-600"
              /> */}
             <span className="text-zinc-400 text-md">Set the clock time using the inputs below.</span>
              <div className="flex gap-4">
                Hours
                <input
                  type="number"
                  placeholder="Hours"
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                  className="w-full bg-black border border-white/5 rounded-xl p-4 text-white"
                />
                Minutes
                <input
                  type="number"
                  placeholder="Minutes"
                  value={minutes}
                  onChange={(e) => setMinutes(e.target.value)}
                  className="w-full bg-black border border-white/5 rounded-xl p-4 text-white"
                />
                Seconds
                <input
                  type="number"
                  placeholder="Seconds"
                  value={seconds}
                  onChange={(e) => setSeconds(e.target.value)}
                  className="w-full bg-black border border-white/5 rounded-xl p-4 text-white"
                />
              </div>
            </>
          )}

        
        </div>
        <button
          onClick={handleCreateOrUpdate}
          className="w-full py-4 bg-orange-600 text-white font-black rounded-2xl hover:bg-orange-500 transition-all"
        >
          {editingId ? "Update Equation" : "Create Equation"}
        </button>
      </div>

      {/* Equations List */}
      <div className="bg-zinc-900 border border-white/5 p-6 rounded-[2.5rem] overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-white/5 border-b border-white/5">
            <tr>
              <th className="p-4 text-zinc-500 text-xs font-black uppercase tracking-widest">
                Question
              </th>
              <th className="p-4 text-zinc-500 text-xs font-black uppercase tracking-widest">
                Answer
              </th>
              <th className="p-4 text-zinc-500 text-xs font-black uppercase tracking-widest">
                Type
              </th>
              <th className="p-4 text-zinc-500 text-xs font-black uppercase tracking-widest">
                Mode
              </th>
              <th className="p-4 text-zinc-500 text-xs font-black uppercase tracking-widest text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {equations.map(
              (eq) => (
                console.log("This is the equations eq:", eq),
                (
                  <tr
                    key={eq._id}
                    className="hover:bg-white/[0.02] transition-colors group"
                  >
                    <td className="p-4 text-white font-bold">
                      {eq.question
                        ? eq.question
                        : eq.clockTime
                          ? `${eq.clockTime.hours}:${eq.clockTime.minutes}:${eq.clockTime.seconds}`
                          : "-"}
                    </td>
                    <td className="p-4 text-white font-bold">
                      {eq.correctAnswer}
                    </td>
                    <td className="p-4 text-zinc-400 font-bold">{eq.type ? eq.type : eq.clockType}</td>
                    <td className="p-4 text-zinc-400 font-bold">{eq.mode}</td>
                    <td className="p-4 text-right flex justify-end gap-2">
                      <button
                        onClick={() => handleEdit(eq)}
                        className="text-zinc-500 hover:text-orange-500"
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={() => deleteEquation(eq._id)}
                        className="text-zinc-500 hover:text-red-500"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                )
              ),
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

// --- Main Admin Page ---
const AdminEquationsDashboard = () => {
  const [activeTab, setActiveTab] = useState("equations");

  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-orange-600 antialiased overflow-x-hidden">
      <SideBarAdmin activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="ml-64 p-12 min-h-screen relative">
        {/* Ambient glow */}
        <div className="fixed top-0 right-0 w-1/2 h-1/2 bg-orange-600/5 blur-[120px] pointer-events-none" />

        <AnimatePresence mode="wait">
          <div key={activeTab}>
            {activeTab === "equations" && <EquationsPage />}
          </div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default AdminEquationsDashboard;
