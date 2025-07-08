import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/1234/Home"
                className="wd-dashboard-course-link" >
            <img src="/images/reactjs.jpg" width={200} />
            <div>
              <h5> CS1234 React JS </h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer  </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/5678/Home"
                className="wd-dashboard-course-link" >
            <img src="/images/database.jfif" width={200} />
            <div>
              <h5> CS5678 Database </h5>
              <p className="wd-dashboard-course-title">
                Database Management  </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
                <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/4321/Home"
                className="wd-dashboard-course-link" >
            <img src="/images/datastructure.jpg" width={200} />
            <div>
              <h5> CS4321 Data Structures </h5>
              <p className="wd-dashboard-course-title">
                Data Structures and Algorithms  </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}