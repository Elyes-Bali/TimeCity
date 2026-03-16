import React, { useEffect, useState } from "react";
import { useEquationStore } from "../store/equationStore";

const EquationsModal = ({ onClose }) => {
  const { equations, fetchEquations, answerEquation } = useEquationStore();

  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState({});

  useEffect(() => {
    fetchEquations();
  }, []);

  const handleChange = (id, value) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const submitAnswer = async (id) => {
    const res = await answerEquation(id, answers[id]);

    if (!res) return;

    if (res.error) {
      alert(res.error);
      return;
    }

    setResults((prev) => ({
      ...prev,
      [id]: res.correct,
    }));
  };

  const grouped = {
    addition: [],
    subtraction: [],
    multiplication: [],
    division: [],
  };

  equations.forEach((eq) => {
    if (grouped[eq.type]) {
      grouped[eq.type].push(eq);
    }
  });

  return (
    <div className="modal">
      <h2>Math Equations</h2>

      {Object.keys(grouped).map((type) => (
        <div key={type} style={{ marginBottom: 30 }}>
          <h3>{type.toUpperCase()}</h3>

          {grouped[type].map((eq) => (
            <div key={eq._id} style={{ marginBottom: 10 }}>
              <span>{eq.question} = </span>

              <input
                type="number"
                value={answers[eq._id] || ""}
                disabled={results[eq._id] === true}
                onChange={(e) => handleChange(eq._id, e.target.value)}
              />
              <button
                disabled={results[eq._id] === true}
                onClick={() => submitAnswer(eq._id)}
              >
                Submit
              </button>

              {results[eq._id] !== undefined && (
                <span
                  style={{
                    marginLeft: 10,
                    color: results[eq._id] ? "green" : "red",
                  }}
                >
                  {results[eq._id] ? "Correct ✓" : "Wrong ✗"}
                </span>
              )}
            </div>
          ))}
        </div>
      ))}

      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default EquationsModal;
