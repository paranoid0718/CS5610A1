import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  questions: [] as any[],
};

const questionsSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    setQuestions: (state, { payload }) => {
      state.questions = payload;
    },
    // addQuiz: (state, { payload }) => {
    //   state.quizzes.push(payload);
    // },
    // deleteQuiz: (state, { payload: quizId }) => {
    //   state.quizzes = state.quizzes.filter((q) => q._id !== quizId);
    // },
    // updateQuiz: (state, { payload }) => {
    //   const index = state.quizzes.findIndex((q) => q._id === payload._id);
    //   if (index !== -1) {
    //     state.quizzes[index] = payload;
    //   }
    // },
  },
});

export const { setQuestions } = questionsSlice.actions;
export default questionsSlice.reducer;