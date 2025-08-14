import { Link } from "react-router-dom";
export default function CourseNavigation() {
  return (
    <div id="wd-courses-navigation">
      <Link to="/Kambaz/Courses/5678/Home" id="wd-course-home-link">Home</Link><br/>
      <Link to="/Kambaz/Courses/5678/Modules" id="wd-course-modules-link">Modules
        </Link><br/>
      <Link to="/Kambaz/Courses/5678/Piazza" id="wd-course-piazza-link">Piazza</Link><br/>
      <Link to="/Kambaz/Courses/5678/Zoom" id="wd-course-zoom-link">Zoom</Link><br/>
      <Link to="/Kambaz/Courses/5678/Assignments" id="wd-course-quizzes-link">
          Assignments</Link><br/>
      <Link to="/Kambaz/Courses/5678/Quizzes" id="wd-course-assignments-link">Quizzes
        </Link><br/>
      <Link to="/Kambaz/Courses/5678/Grades" id="wd-course-grades-link">Grades</Link><br/>
      <Link to="/Kambaz/Courses/5678/People" id="wd-course-people-link">People</Link><br/>
    </div>
  );}
