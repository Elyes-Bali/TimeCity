import { Equation } from "../models/equation.model.js";
import { UserAnswer } from "../models/userAnswer.model.js";
import { UserProgress } from "../models/userProgress.model.js";

// export const createEquation = async (req, res) => {
//   try {
//     const { question, correctAnswer, type } = req.body;

//     const equation = new Equation({
//       question,
//       correctAnswer,
//       type,
//       createdBy: req.userId,
//     });

//     await equation.save();

//     res.status(201).json(equation);
//   } catch (error) {
//   console.log(error);
//   res.status(500).json({ message: error.message });
// }
// };


// export const createEquation = async (req, res) => {
//   try {

//     const {
//       question,
//       correctAnswer,
//       type,
//       mode,
//       clockType,
//       clockTime
//     } = req.body;

//     let equationData = {
//       correctAnswer,
//       createdBy: req.userId,
//       mode: mode || "equation"
//     };

//     if (mode === "equation") {
//       equationData.question = question;
//       equationData.type = type;
//     }

//     if (mode === "clock") {
//       equationData.clockType = clockType;
//       equationData.clockTime = clockTime;
//     }

//     const equation = new Equation(equationData);

//     await equation.save();

//     res.status(201).json(equation);

//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: error.message });
//   }
// };


export const createEquation = async (req, res) => {
  try {
    const {
      question,
      correctAnswer,
      type,
      mode,
      clockType,
      clockTime
    } = req.body;

    let equationData = {
      createdBy: req.userId,
      mode: mode || "equation"
    };

    if (mode === "equation") {
      equationData.question = question;
      equationData.type = type;
      equationData.correctAnswer = correctAnswer;
    }

    if (mode === "clock") {
      equationData.clockType = clockType;
      equationData.clockTime = clockTime;

      // ✅ Calculate total seconds and set as correctAnswer
      const totalSeconds =
        (clockTime?.hours || 0) * 3600 +
        (clockTime?.minutes || 0) * 60 +
        (clockTime?.seconds || 0);

      equationData.correctAnswer = totalSeconds;
    }

    const equation = new Equation(equationData);
    await equation.save();

    res.status(201).json(equation);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
export const getAllEquations = async (req, res) => {
  try {
    const equations = await Equation.find();

    res.json(equations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// equation.controller.js

export const getAdditionEquations = async (req, res) => {
  try {
    const equations = await Equation.find({ type: "addition" });
    res.json(equations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSubtractionEquations = async (req, res) => {
  try {
    const equations = await Equation.find({ type: "subtraction" });
    res.json(equations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMultiplicationEquations = async (req, res) => {
  try {
    const equations = await Equation.find({ type: "multiplication" });
    res.json(equations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDivisionEquations = async (req, res) => {
  try {
    const equations = await Equation.find({ type: "division" });
    res.json(equations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getClockEquations = async (req, res) => {
  try {
    const equations = await Equation.find({ mode: "clock" });
    res.json(equations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export const updateEquation = async (req, res) => {
  try {
    const equation = await Equation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(equation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteEquation = async (req, res) => {
  try {
    await Equation.findByIdAndDelete(req.params.id);

    res.json({ message: "Equation deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// export const answerEquation = async (req, res) => {
//   try {
//     const { equationId } = req.params;
//     const { answer } = req.body;

//     const equation = await Equation.findById(equationId);

//     if (!equation) {
//       return res.status(404).json({ message: "Equation not found" });
//     }

//     // ✅ check if user already answered
//     const existing = await UserAnswer.findOne({
//       user: req.userId,
//       equation: equationId,
//     });

//     if (existing) {
//       return res.status(400).json({
//         message: "You already answered this equation",
//       });
//     }

//     const isCorrect = Number(answer) === equation.correctAnswer;

//     const userAnswer = new UserAnswer({
//       user: req.userId,
//       equation: equationId,
//       userAnswer: answer,
//       isCorrect,
//     });

//     await userAnswer.save();

//     equation.answersCount += 1;
//     await equation.save();

//     res.json({
//       correct: isCorrect,
//       correctAnswer: equation.correctAnswer,
//     });

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// export const answerEquation = async (req, res) => {
//   try {
//     const { equationId } = req.params;
//     const { answer } = req.body;

//     const equation = await Equation.findById(equationId);

//     if (!equation) {
//       return res.status(404).json({ message: "Equation not found" });
//     }

//     const isCorrect =
//       Number(answer) === Number(equation.correctAnswer);

//     // Check if user already solved it correctly
//     const existingCorrect = await UserAnswer.findOne({
//       user: req.userId,
//       equation: equationId,
//       isCorrect: true
//     });

//     if (existingCorrect) {
//       return res.status(400).json({
//         message: "You already solved this equation",
//       });
//     }

//     // Save attempt
//     const userAnswer = new UserAnswer({
//       user: req.userId,
//       equation: equationId,
//       userAnswer: answer,
//       isCorrect,
//     });

//     await userAnswer.save();

//     equation.answersCount += 1;
//     await equation.save();

//     res.json({
//       correct: isCorrect,
//       correctAnswer: equation.correctAnswer,
//     });

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };



export const answerEquation = async (req, res) => {
  try {

    const { equationId } = req.params;
    const { answer } = req.body;

    const equation = await Equation.findById(equationId);

    if (!equation) {
      return res.status(404).json({ message: "Equation not found" });
    }

    // get or create progress
    let progress = await UserProgress.findOne({ user: req.userId });

    if (!progress) {
      progress = await UserProgress.create({
        user: req.userId
      });
    }

    // check if level unlocked
    // if (!progress.unlockedTypes.includes(equation.type)) {
    //   return res.status(403).json({
    //     message: `${equation.type} level is locked`
    //   });
    // }
// Skip lock check for clock mode
if (equation.mode !== "clock" && !progress.unlockedTypes.includes(equation.type)) {
  return res.status(403).json({
    message: `${equation.type} level is locked`
  });
}
    const isCorrect = Number(answer) === Number(equation.correctAnswer);

    const existingCorrect = await UserAnswer.findOne({
      user: req.userId,
      equation: equationId,
      isCorrect: true
    });

    if (existingCorrect) {
      return res.status(400).json({
        message: "You already solved this equation",
      });
    }

    const userAnswer = new UserAnswer({
      user: req.userId,
      equation: equationId,
      userAnswer: answer,
      isCorrect,
    });

    await userAnswer.save();

    equation.answersCount += 1;
    await equation.save();

    // add points if correct
const pointsMap = {
  addition: 1,
  subtraction: 2,
  multiplication: 3,
  division: 4
};

// add points if correct
if (isCorrect) {
  const earnedPoints = pointsMap[equation.type] || 1;
  progress.points[equation.type] += earnedPoints;
}

    // check unlock next level
    const totalEquations = await Equation.countDocuments({
      type: equation.type
    });

    const solved = await UserAnswer.countDocuments({
      user: req.userId,
      isCorrect: true
    }).populate({
      path: "equation",
      match: { type: equation.type }
    });

    const order = ["addition","subtraction","multiplication","division"];
    const currentIndex = order.indexOf(equation.type);

    if (solved >= totalEquations && currentIndex < order.length - 1) {

      const nextType = order[currentIndex + 1];

      if (!progress.unlockedTypes.includes(nextType)) {
        progress.unlockedTypes.push(nextType);
      }
    }

    await progress.save();

    res.json({
      correct: isCorrect,
      correctAnswer: equation.correctAnswer,
      unlockedTypes: progress.unlockedTypes,
      points: progress.points
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getUserAnswers = async (req, res) => {
  try {
    const answers = await UserAnswer.find({ user: req.userId })
      .populate("equation");

    res.json(answers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserProgress = async (req, res) => {
  try {

    let progress = await UserProgress.findOne({
      user: req.userId
    });

    if (!progress) {
      progress = await UserProgress.create({
        user: req.userId
      });
    }

    res.json(progress);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
