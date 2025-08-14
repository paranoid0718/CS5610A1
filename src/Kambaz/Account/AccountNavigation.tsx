import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
export default function AccountNavigation() {
  const { pathname } = useLocation();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const active = (path: string) => (pathname.includes(path) ? "active" : "");

  const links = currentUser ? ["Profile"] : ["Signin", "Signup"];
    return (
      
            <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0">
              {links.map((link) => (
                <Link to={`/Kambaz/Account/${link}`} id = {`wd-account-${link.toLowerCase()}-link`} 
                className={`list-group-item border border-0 ${pathname.includes(link) ? "active" : ""}`}>
                  {link}
                </Link>
                
                
              ))}
              {currentUser && currentUser.role === "ADMIN" && (
       <Link to={`/Kambaz/Account/Users`} className={`list-group-item border border-0 ${active("Users")}`}> Users </Link> )}

    </div>
    );
}
