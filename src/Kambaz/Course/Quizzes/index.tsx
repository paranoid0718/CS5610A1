import { useEffect, useState } from "react";
import { Button, Col, FormControl, InputGroup, ListGroup, Row, Dropdown } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { BsGripVertical } from "react-icons/bs";
import { FaSearch, FaEllipsisV } from "react-icons/fa";
import * as coursesClient from "../client";
import * as quizzesClient from "./client";
import { useDispatch, useSelector } from "react-redux";
import { setQuizzes, deleteQuiz, updateQuiz } from "./reducer";

export default function Quizzes() {
  const { cid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    const loadQuizzes = async () => {
      if (!cid) return;
      setLoading(true);
      try {
        const data = await coursesClient.findQuizzesForCourse(cid);
        dispatch(setQuizzes(data));
      } finally {
        setLoading(false);
      }
    };
    loadQuizzes();
  }, [cid, dispatch]);

const filtered =
  !keyword.trim()
    ? quizzes
    : quizzes.filter((q: any) => {
        const k = keyword.trim().toLowerCase();
        return (
          q.title?.toLowerCase().includes(k) ||
          q.description?.toLowerCase().includes(k)
        );
      });

  const removeQuiz = async (qid: string) => {
    if (!qid) return;
    try {
      await quizzesClient.deleteQuiz(qid);
      dispatch(deleteQuiz(qid));
    } catch (e) {
      console.error("Delete quiz failed:", e);
    }
  };

  const togglePublish = async (q: any) => {
    try {
      const updated = { ...q, published: !q.published };
      await quizzesClient.updateQuiz(updated);
      dispatch(updateQuiz(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const availabilityLabel = (q: any) => {
    if (!q.availableDate && !q.untilDate) return "";
    const now = new Date();
    const start = q.availableDate ? new Date(q.availableDate) : undefined;
    const end = q.untilDate ? new Date(q.untilDate) : undefined;
    if (start && now < start) return `Not available until ${q.availableDate}`;
    if (end && now > end) return "Closed";
    return "Available";
  };

  return (
    <div>
      <div className="my-3">
        <Row>
          <Col xs={8}>
            <div className="float-start">
              <InputGroup>
                <InputGroup.Text><FaSearch /></InputGroup.Text>
                <FormControl
                  type="text"
                  placeholder="Search quizzes..."
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
              </InputGroup>
            </div>
          </Col>
          <Col xs={4}>
            <div className="d-flex float-end gap-2">
              <Button
                variant="danger"
                onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes/new`)}
              >
                + Quiz
              </Button>
            </div>
          </Col>
        </Row>
      </div>

      <ListGroup className="rounded-0" id="wd-quizzes">
        <ListGroup.Item className="p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center">
            <BsGripVertical className="me-2 fs-3" />
            <strong>QUIZZES</strong>
            <span className="ms-auto me-3">
              {loading ? "Loading..." : `${filtered.length} quiz(es)`}
            </span>
          </div>

          <ListGroup className="rounded-0">
            {filtered.map((q: any) => (
              <ListGroup.Item key={q._id} className="p-3 ps-1 d-flex align-items-start">
                <BsGripVertical className="me-2 fs-3 flex-shrink-0" />
                <span
                  className="me-2 mt-1 fload-end "
                  title={q.published ? "Unpublish" : "Publish"}
                >
                  {q.published ? "✅" : "🚫"}
                </span>
                <div className="flex-grow-1">
                  <a
                    href={`#/Kambaz/Courses/${cid}/Quizzes/${q._id}`}
                    className="text-decoration-none fw-semibold d-block mb-1"
                  >
                    {q.title}
                  </a>
                  <div className="text-muted small">
                    <span className="me-2">{availabilityLabel(q)}</span>
                    {q.dueDate && (
                      <span className="me-2"><strong>Due:</strong> {q.dueDate}</span>
                    )}
                    {q.points != null && (
                      <span className="me-2"><strong>Points:</strong> {q.points}</span>
                    )}
                    {q.questionNumber != null && (
                      <span className="me-2"><strong>Questions:</strong> {q.questionNumber}</span>
                    )}
                    {q.lastScore != null && (
                      <span className="me-2"><strong>Score:</strong> {q.lastScore}</span>
                    )}
                    
                  </div>
                </div>
                <Dropdown align="end" className="ms-2">
                  <Dropdown.Toggle variant="light" size="sm">
                    <FaEllipsisV />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes/${q._id}/Editors`)}>
                      Edit
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => removeQuiz(q._id)}>
                      Delete
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => togglePublish(q)}>
                      {q.published ? "Unpublish" : "Publish"}
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

              </ListGroup.Item>
            ))}
            {!loading && filtered.length === 0 && (
              <div className="p-4 text-center text-muted">No quizzes found.</div>
            )}
          </ListGroup>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}