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
  },
});

export const { setQuestions } = questionsSlice.actions;
export default questionsSlice.reducer;
