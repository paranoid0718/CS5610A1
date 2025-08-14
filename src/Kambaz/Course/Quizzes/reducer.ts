import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quizzes: [] as any[],
};

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    setQuizzes: (state, { payload }) => {
      state.quizzes = payload;
    },
    addQuiz: (state, { payload }) => {
      state.quizzes.push(payload);
    },
    deleteQuiz: (state, { payload: quizId }) => {
      state.quizzes = state.quizzes.filter((q) => q._id !== quizId);
    },
    updateQuiz: (state, { payload }) => {
      const index = state.quizzes.findIndex((q) => q._id === payload._id);
      if (index !== -1) {
        state.quizzes[index] = payload;
      }
    },
  },
});

export const { setQuizzes, addQuiz, deleteQuiz, updateQuiz } = quizzesSlice.actions;
export default quizzesSlice.reducer;