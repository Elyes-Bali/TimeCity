import mongoose from "mongoose";

const equationSchema = new mongoose.Schema(
  {
    question: {
      type: String,
       required: function () {
      return this.mode === "equation";
    }
    },

    correctAnswer: {
      type: Number,
      required: true,
    },

    type: {
      type: String,
      enum: ["addition", "subtraction", "multiplication", "division"],
       required: function () {
      return this.mode === "equation";
    }
    },

    mode: {
    type: String,
    enum: ["equation","clock"],
    default: "equation"
  },

  clockType: {
    type: String,
    enum: ["digital","analog"],
    default: null,
     required: function () {
      return this.mode === "clock";
    }
  },

  clockTime: {
    hours: Number,
    minutes: Number,
    seconds: Number,
    
  },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    answersCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const Equation = mongoose.model("Equation", equationSchema);