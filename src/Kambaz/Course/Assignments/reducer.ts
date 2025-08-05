import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

interface Assignment {
  _id: string;
  title: string;
  dueDate?: string;
  [key: string]: any;
}
interface AssignmentsState {
  assignments: Assignment[];
}

const initialState: AssignmentsState = {
  assignments: [],
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    setAssignments: (state, action) => {
      state.assignments = action.payload;
    },
    addAssignment: (state, { payload }) => {
      const newAssignment = { _id: uuidv4(), ...payload };
      state.assignments.push(newAssignment);
    },
    deleteAssignment: (state, { payload }) => {
      state.assignments = state.assignments.filter(a => a._id !== payload);
    },
    updateAssignment: (state, { payload }) => {
      state.assignments = state.assignments.map(a =>
        a._id === payload._id ? payload : a
      );
    },
  },
});

export const { setAssignments, addAssignment, deleteAssignment, updateAssignment } = assignmentsSlice.actions;
export default assignmentsSlice.reducer;