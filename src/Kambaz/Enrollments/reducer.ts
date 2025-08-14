import { createSlice } from "@reduxjs/toolkit";
import * as db from "../Database";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  enrollments: db.enrollments,
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    enroll: (state, { payload }) => {
      const { user, course } = payload;
      const alreadyEnrolled = state.enrollments.some(
        (e) => e.user === user && e.course === course
      );
      if (!alreadyEnrolled) {
        state.enrollments.push({
          _id: uuidv4(),
          user,
          course,
        });
      }
    },
    unenroll: (state, { payload }) => {
      const { user, course } = payload;
      state.enrollments = state.enrollments.filter(
        (e) => !(e.user === user && e.course === course)
      );
    },
  },
});

export const { enroll, unenroll } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;