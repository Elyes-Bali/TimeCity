import mongoose from "mongoose";

const userProgressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  unlockedTypes: {
    type: [String],
    default: ["addition"], // first level unlocked
  },

  points: {
    addition: { type: Number, default: 0 },
    subtraction: { type: Number, default: 0 },
    multiplication: { type: Number, default: 0 },
    division: { type: Number, default: 0 },
  }

}, { timestamps: true });

export const UserProgress = mongoose.model("UserProgress", userProgressSchema);