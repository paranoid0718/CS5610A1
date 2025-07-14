import { Routes, Route, Navigate } from "react-router";
import Account from "./Account";
import Dashboard from "./Dashboard";
import KambazNavigation from "./Navigation";
import Courses from "./Course";
import Course1 from "./Course/Course1"
import Course2 from "./Course/Course2"
import "./styles.css";
export default function Kambaz() {
  return (
    <div id="wd-kambaz">
      <div>
            <KambazNavigation />
      </div>
      <div className="wd-main-content-offset p-3">
            <Routes>
              <Route path="/" element={<Navigate to="/Kambaz/Account" />} />
              <Route path="/Account/*" element={<Account />} />
              <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/Courses/1234/*" element={<Courses />} />
            <Route path="/Courses/5678/*" element={<Course1 />} />
            <Route path="/Courses/4321/*" element={<Course2 />} />
              <Route path="/Calendar" element={<h1>Calendar</h1>} />
              <Route path="/Inbox" element={<h1>Inbox</h1>} />
            </Routes>
      </div>
    </div>
);}
