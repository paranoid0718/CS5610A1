import { createSlice } from "@reduxjs/toolkit";
import * as db from "./Database";
import { v4 as uuidv4 } from "uuid";

const courses = db.courses
const initialState = {
    courses: courses
}

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    addCourse: (state, {payload}) => {
      const newCourse: any = {
        ...payload,
        _id: uuidv4(),
      };
      state.courses = [...state.courses, newCourse] as any;
    },
    deleteCourse: (state, { payload: courseId }) => {
      state.courses = state.courses.filter((c: any) => c._id !== courseId);
    },
    updateCourse: (state, {payload}) => {
      state.courses = state.courses.map((c: any) =>
        c._id === payload._id ? payload: c
      ) as any;
    },
  },
});

export const { addCourse, deleteCourse, updateCourse } = coursesSlice.actions;
export default coursesSlice.reducer;