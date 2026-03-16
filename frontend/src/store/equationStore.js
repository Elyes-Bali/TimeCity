import { create } from "zustand";
import axios from "axios";

const API_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/api/equations"
    : "/api/equations";

axios.defaults.withCredentials = true;

export const useEquationStore = create((set, get) => ({
  equations: [],
  userAnswers: [],
  progress: null,
  loading: false,
  error: null,

  fetchProgress: async () => {
    try {
      const res = await axios.get(`${API_URL}/progress`);
      set({ progress: res.data });
      return res.data;
    } catch (error) {
      console.error(error);
    }
  },

  fetchEquations: async () => {
    try {
      const res = await axios.get(`${API_URL}/all`);
      set({ equations: res.data });
    } catch (error) {
      console.error(error);
    }
  },

  fetchAdditionEquations: async () => {
    try {
      const res = await axios.get(`${API_URL}/addition`);
      return res.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  },

  fetchSubtractionEquations: async () => {
    try {
      const res = await axios.get(`${API_URL}/subtraction`);
      return res.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  },

  fetchMultiplicationEquations: async () => {
    try {
      const res = await axios.get(`${API_URL}/multiplication`);
      return res.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  },

  fetchDivisionEquations: async () => {
    try {
      const res = await axios.get(`${API_URL}/division`);
      return res.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  },

  fetchClockEquations: async () => {
    try {
      const res = await axios.get(`${API_URL}/clock`);
      return res.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  },
  // answerEquation: async (equationId, answer) => {
  //   try {
  //     const res = await axios.post(`${API_URL}/answer/${equationId}`, {
  //       answer,
  //     });

  //     return res.data;
  //   } catch (error) {
  //     console.error(error);

  //     return {
  //       correct: false,
  //       error: error.response?.data?.message || "Error answering equation",
  //     };
  //   }
  // },

  answerEquation: async (equationId, answer) => {
    try {
      const res = await axios.post(`${API_URL}/answer/${equationId}`, {
        answer,
      });

      return res.data;
    } catch (error) {
      // Check if the error status is 400
      if (error.response?.status === 400) {
        console.log("This equation has already been solved by the user.");
      } else {
        console.error(error);
      }

      return {
        correct: false,
        error: error.response?.data?.message || "Error answering equation",
      };
    }
  },
  //   fetchUserAnswers: async () => {
  //     try {
  //       const res = await axios.get(`${API_URL}/my-answers`);
  //       set({ userAnswers: res.data });
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   },

  fetchUserAnswers: async () => {
    try {
      const res = await axios.get(`${API_URL}/my-answers`);
      set({ userAnswers: res.data });
      return res.data; // ✅ return the answers
    } catch (error) {
      console.error(error);
      return []; // return empty array on error
    }
  },
  createEquation: async (data) => {
    await axios.post(`${API_URL}/create`, data);
    get().fetchEquations();
  },

  updateEquation: async (id, data) => {
    await axios.put(`${API_URL}/update/${id}`, data);
    get().fetchEquations();
  },

  deleteEquation: async (id) => {
    await axios.delete(`${API_URL}/delete/${id}`);
    get().fetchEquations();
  },
}));
