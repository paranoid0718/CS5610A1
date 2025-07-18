import CourseNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import { Navigate, Route, Routes } from "react-router";
import AssignmentEditor from "./Assignments/Editor";
export default function Courses() {
  return (
    <div id="wd-courses">
      <h2>Course 5678</h2>
            <hr />
      <table>
        <tr>
          <td valign="top">
            <CourseNavigation />
          </td>
          <td valign="top">
            <Routes>
              <Route path="/" element={<Navigate to="Home" />} />
              <Route path="Home" element={<Home/>} />
              <Route path="Modules" element={<Modules />} />
              <Route path="Assignments" element={<Assignments />} />
              <Route path="Assignments/:aid" element={<AssignmentEditor />} />
              <Route path="/Piazza" element={<h1>Piazza</h1>} />
              <Route path="/Zoom" element={<h1>Zoom</h1>} />
              <Route path="/Quizzes" element={<h1>Quizzes</h1>} />\
              <Route path="/Grades" element={<h1>Grades</h1>} />
              <Route path="People" element={<h2>People</h2>} />
            </Routes>
          </td>
        </tr>
      </table>
    </div>
);}
