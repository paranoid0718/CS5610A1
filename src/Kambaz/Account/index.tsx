import { Routes, Route, Navigate } from "react-router";
import AccountNavigation from "./AccountNavigation";
import Signin from "./Signin";
import Profile from "./Profile";
import Signup from "./Signup";
import { useSelector } from "react-redux";

export default function Account() {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
  return (
    <div id="wd-account-screen" className="d-flex">
      <AccountNavigation/>
            <Routes>
              <Route path="/" element={<Navigate to={currentUser? "/Kambaz/Account/Profile": "/Kambaz/Account/Signin"} />} />
              <Route path="/Signin"  element={<Signin />} />
              <Route path="/Profile" element={<Profile />} />
              <Route path="/Signup"  element={<Signup />} />
            </Routes>

    </div>
  );
}

