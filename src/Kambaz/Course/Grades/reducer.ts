import { createSlice } from "@reduxjs/toolkit";
interface Grade {
  course: String;
  user: String;
  quiz: String;
  score: Number;
  attempt: String;
}
const initialState = {
  currentUser: null,
  grades: [] as Grade[],
};
const gradeSlice = createSlice({
  name: "grade",
  initialState,
  reducers: {
    setGrades: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});
export const { setGrades } = gradeSlice.actions;
export default gradeSlice.reducer;
