import { Nav } from "react-bootstrap";
import { Navigate, NavLink, Route, Routes, useParams } from "react-router-dom";
import DetailsEditor from "./DetailsEditor";
import QuestionsEditor from "./QuestionsEditor";

export default function Editors() {
  const { cid, qid } = useParams();

  return (
    <div>
      <Nav variant="tabs" className="mb-3">
        <Nav.Item>
          <Nav.Link
            as={NavLink}
            end
            to={`/Kambaz/Courses/${cid}/Quizzes/${qid}/Editors/Details`}
          >
            Details
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            as={NavLink}
            end
            to={`/Kambaz/Courses/${cid}/Quizzes/${qid}/Editors/Questions`}
          >
            Questions
          </Nav.Link>
        </Nav.Item>
      </Nav>
          <Routes>
        <Route path="/" element={<Navigate to="Details"/>} />
        <Route path="Details" element={<DetailsEditor />} />
        <Route path="Questions" element={<QuestionsEditor />} />
      </Routes>
    </div>
  );
}