import { Routes, Route, Navigate } from "react-router";
import Account from "./Account";
import Dashboard from "./Dashboard";
import KambazNavigation from "./Navigation";
import Courses from "./Course";
import "./styles.css";
import { useSelector } from "react-redux";
import ProtectedRoute from "./Account/ProtectedRoute";
export default function Kambaz() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { courses } = useSelector((state: any) => state.coursesReducer);


  return (
    <div id="wd-kambaz">
      <div>
            <KambazNavigation />
      </div>
      <div className="wd-main-content-offset p-3">
            <Routes>
              <Route path="/" element={<Navigate to={currentUser ? "/Kambaz/Account/Profile" : "/Kambaz/Account/Signin"} />} />
              <Route path="/Account/*" element={<Account />} />
              <Route path="/Dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
            <Route path="/Courses/:cid/*" element={<ProtectedRoute><Courses courses={courses}/></ProtectedRoute>} />
              <Route path="/Calendar" element={<h1>Calendar</h1>} />
              <Route path="/Inbox" element={<h1>Inbox</h1>} />
            </Routes>
      </div>
    </div>
);}
