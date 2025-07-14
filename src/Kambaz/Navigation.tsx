import { Link } from "react-router-dom";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import { ListGroup } from "react-bootstrap";

export default function KambazNavigation() {
  return (
    <div className="d-flex" >
    <ListGroup
      id="wd-kambaz-navigation"
      style={{ width: 100 }}
      className="rounded-0 position-fixed top-0 bottom-0 d-none d-md-block bg-black z-2"
    >
      <ListGroup.Item
        id="wd-neu-link"
        target="_blank"
        action
        href="https://www.northeastern.edu/"
        className="text-center bg-black border-0 text-center"
      >
        <img src="/images/NEU.png" width="75px" alt="NEU" />
      </ListGroup.Item>
      <ListGroup.Item
        as={Link}
        to="/Kambaz/Account"
        className="text-center border-0 bg-black text-white"
      
      >
        <FaRegCircleUser className="fs-1 text-danger"/>
        <br />
        Account
      </ListGroup.Item>
      <ListGroup.Item
        as={Link}
        to="/Kambaz/Dashboard"
        className="text-center border-0 bg-white text-danger"
      >
        <AiOutlineDashboard className="fs-1 text-danger" />
        <br />
        Dashboard
      </ListGroup.Item>
      <ListGroup.Item
        as={Link}
        to="/Kambaz/Dashboard"
        className="text-center border-0 bg-black text-white"
      >
        <LiaBookSolid className="fs-1 text-danger" />
        <br />
        Courses
      </ListGroup.Item>
      <ListGroup.Item
        as={Link}
        to="/Kambaz/Calendar"
        className="text-center border-0 bg-black text-white"
      >
        <IoCalendarOutline className="fs-1 text-danger" />
        <br />
        Calendar
      </ListGroup.Item>
      <ListGroup.Item
        as={Link}
        to="/Kambaz/Inbox"
        className="text-center border-0 bg-black text-white"
      >
        <FaInbox className="fs-1 text-danger" />
        <br />
        Inbox
      </ListGroup.Item>
      <ListGroup.Item
        as={Link}
        to="/Labs"
        className="text-center border-0 bg-black text-white"
      >
        <LiaCogSolid className="fs-1 text-danger" />
        <br />
        Labs
      </ListGroup.Item>
    </ListGroup>
    </div>
  );
}