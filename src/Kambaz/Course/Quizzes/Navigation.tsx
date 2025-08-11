import { Nav } from "react-bootstrap";
import { Outlet, useNavigate, useParams } from "react-router-dom";

export default function QuizTabs() {
  const { cid, qid } = useParams();
  const navigate = useNavigate();

  return (
    <div>
      <Nav variant="tabs" className="mb-3">
        <Nav.Item>
          <Nav.Link onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}/Editor`)}>
            Editor
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}/Questions`)}>
            Questions
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <Outlet />
    </div>
  );
}