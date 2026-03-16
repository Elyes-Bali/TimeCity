import express from "express";
import {
  createEquation,
  updateEquation,
  deleteEquation,
  getAllEquations,
  answerEquation,
  getUserAnswers,
  getUserProgress,
  getClockEquations,
} from "../controllers/equation.controller.js";

import { verifyToken } from "../middleware/verifyToken.js";
import { getAdditionEquations } from "../controllers/equation.controller.js";
import { getSubtractionEquations } from "../controllers/equation.controller.js";
import { getMultiplicationEquations } from "../controllers/equation.controller.js";
import { getDivisionEquations } from "../controllers/equation.controller.js";

const router = express.Router();

router.post("/create", verifyToken, createEquation);
router.put("/update/:id", verifyToken, updateEquation);
router.delete("/delete/:id", verifyToken, deleteEquation);

router.get("/all", verifyToken, getAllEquations);

router.post("/answer/:equationId", verifyToken, answerEquation);

router.get("/my-answers", verifyToken, getUserAnswers);

router.get("/addition", verifyToken, getAdditionEquations);
router.get("/subtraction", verifyToken, getSubtractionEquations);
router.get("/multiplication", verifyToken, getMultiplicationEquations);
router.get("/division", verifyToken, getDivisionEquations);
router.get("/clock", verifyToken, getClockEquations);
router.get("/progress", verifyToken, getUserProgress);
export default router;