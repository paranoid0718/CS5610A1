import { Routes, Route, Navigate } from "react-router";
import AccountNavigation from "./AccountNavigation";
import Signin from "./Signin";
import Profile from "./Profile";
import Signup from "./Signup";

export default function Account() {
  return (
    <div id="wd-account-screen" className="d-flex">
      <AccountNavigation/>
            <Routes>
              <Route path="/" element={<Navigate to="/Kambaz/Account/Signin" />} />
              <Route path="/Signin"  element={<Signin />} />
              <Route path="/Profile" element={<Profile />} />
              <Route path="/Signup"  element={<Signup />} />
            </Routes>

    </div>
  );
}

