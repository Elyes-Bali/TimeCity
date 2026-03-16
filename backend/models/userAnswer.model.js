import mongoose from "mongoose";

const userAnswerSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    equation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Equation",
      required: true,
    },

    userAnswer: {
      type: Number,
      required: true,
    },

    isCorrect: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const UserAnswer = mongoose.model("UserAnswer", userAnswerSchema);