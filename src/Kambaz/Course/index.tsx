import CourseNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import { Navigate, Route, Routes, useLocation, useParams } from "react-router";
import AssignmentEditor from "./Assignments/Editor";
import { FaAlignJustify } from "react-icons/fa";
import Users from "./Users";
import Quizzes from "./Quizzes";
import QuizCreate from "./Quizzes/New";
import QuizDetails from "./Quizzes/Details";
import Editors from "./Quizzes/Editors"
export default function Courses({ courses }: { courses: any[]; }) {
  const { cid } = useParams()
  const course = courses.find((course) => course._id === cid);
  const {pathname} = useLocation()
  return (
    <div id="wd-courses">
        <h2 className="text-danger">
      <FaAlignJustify className="me-4 fs-4 mb-1" />
      {course && course.name} &gt; {pathname.split("/")[4]}
 </h2> <hr />
  <div className="d-flex">
    <div className="d-none d-md-block">
            <CourseNavigation />
                </div>
    <div className="flex-fill">
            <Routes>
              <Route path="/" element={<Navigate to="Home" />} />
              <Route path="Home" element={<Home/>} />
              <Route path="Modules" element={<Modules />} />
              <Route path="Assignments" element={<Assignments />} />
              <Route path="Assignments/:aid" element={<AssignmentEditor />} />
              <Route path="/Piazza" element={<h1>Piazza</h1>} />
              <Route path="/Zoom" element={<h1>Zoom</h1>} />
              <Route path="/Quizzes/*" element={<Quizzes />} />
              <Route path="Quizzes/new" element={<QuizCreate />} />
              <Route path="Quizzes/:qid/*" element={<QuizDetails />} />
              <Route path="/Grades" element={<h1>Grades</h1>} />
              <Route path="People" element={<Users/>}/>
              <Route path="Quizzes/:qid/Editors/*" element={<Editors /> }/>
            </Routes>
    </div>
    </div>
    </div>
);}
