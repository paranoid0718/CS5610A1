import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "./Course/Modules/reducer";
import accountReducer from "./Account/reducer";
import assignmentsReducer from "./Course/Assignments/reducer";
import coursesReducer from "./reducer"
import enrollmentReducer from "./Enrollments/reducer"
import quizzesReducer from "./Course/Quizzes/reducer"
const store = configureStore({
  reducer: {
    modulesReducer,
    accountReducer,
    assignmentsReducer,
    coursesReducer,
    enrollmentReducer,
    quizzesReducer,
  },
});
export default store;