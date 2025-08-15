import { useEffect } from "react";
import { Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import * as coursesClient from "../client";
import { setQuizzes } from "./reducer";

export default function QuizDetails() {
  const { cid, qid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  const currentUser = useSelector(
    (state: any) => state.accountReducer.currentUser
  );
  const role = currentUser.role;
  const isFaculty = role === "FACULTY";

  const quiz: any = quizzes?.find((q: any) => q._id === qid);

  const fetchQuizzes = async () => {
    if (!cid || quiz) return;
    const data = await coursesClient.findQuizzesForCourse(cid);
    dispatch(setQuizzes(data));
  };

  useEffect(() => {
    fetchQuizzes();
  }, [cid, quiz, dispatch]);

  if (!quiz) {
    return <div className="text-muted">Loading quiz details…</div>;
  }

  return (
    <div>
      <div className="ms-auto d-flex gap-2 justify-content-center">
        {isFaculty ? (
          <>
            <Button
              variant="outline-primary"
              onClick={() =>
                navigate(`/Kambaz/Courses/${cid}/Quizzes/${quiz._id}/Preview`)
              }
            >
              Preview
            </Button>
          </>
        ) : (
          <Button
            variant="danger"
            onClick={() =>
              navigate(`/Kambaz/Courses/${cid}/Quizzes/${quiz._id}/Take`)
            }
            disabled={!quiz.published}
          >
            Take Quiz
          </Button>
        )}
      </div>
      <div className="d-flex align-items-center mb-3">
        <h3 className="mb-0 me-3">{quiz.title}</h3>
        <div className="ms-auto d-flex gap-2">
          {isFaculty && (
            <Button
              variant="secondary"
              onClick={() =>
                navigate(`/Kambaz/Courses/${cid}/Quizzes/${quiz._id}/Editors`)
              }
            >
              Edit
            </Button>
          )}
          <Link to={`/Kambaz/Courses/${cid}/Quizzes`}>
            <Button variant="outline-secondary">Back</Button>
          </Link>
        </div>
      </div>

      <div className="p-4 mb-4" style={{ border: "1px #000000ff" }}>
        <Row className="gx-5 gy-2">
          <Col sm={5} className="text-end fw-semibold text-muted">
            Quiz Type
          </Col>
          <Col sm={7}>{quiz.quizType}</Col>

          <Col sm={5} className="text-end fw-semibold text-muted">
            Points
          </Col>
          <Col sm={7}>{quiz.points ?? 0}</Col>

          <Col sm={5} className="text-end fw-semibold text-muted">
            Assignment Group
          </Col>
          <Col sm={7}>{(quiz as any).assignmentGroup ?? "QUIZZES"}</Col>

          <Col sm={5} className="text-end fw-semibold text-muted">
            Shuffle Answers
          </Col>
          <Col sm={7}>{quiz.shuffleAnswers ? "Yes" : "No"}</Col>

          <Col sm={5} className="text-end fw-semibold text-muted">
            Time Limit
          </Col>
          <Col sm={7}>
            {quiz.timeLimit != null ? `${quiz.timeLimit} Minutes` : "—"}
          </Col>

          <Col sm={5} className="text-end fw-semibold text-muted">
            Multiple Attempts
          </Col>
          <Col sm={7}>{quiz.multipleAttempts ? "Yes" : "No"}</Col>

          <Col sm={5} className="text-end fw-semibold text-muted">
            Show Correct Answers
          </Col>
          <Col sm={7}>
            {quiz.showCorrectAnswers ? "At release time" : "Immediately"}
          </Col>

          <Col sm={5} className="text-end fw-semibold text-muted">
            One Question at a Time
          </Col>
          <Col sm={7}>{quiz.oneQuestionAtATime ? "Yes" : "No"}</Col>

          <Col sm={5} className="text-end fw-semibold text-muted">
            Webcam Required
          </Col>
          <Col sm={7}>{quiz.webcamRequired ? "Yes" : "No"}</Col>

          <Col sm={5} className="text-end fw-semibold text-muted">
            Lock Questions After Answering
          </Col>
          <Col sm={7}>{quiz.lockAfterAnswering ? "Yes" : "No"}</Col>

          <Col sm={5} className="text-end fw-semibold text-muted">
            Question Number
          </Col>
          <Col sm={7}>{quiz.questionNumber}</Col>
        </Row>

        <hr className="my-4" />

        <Row className="fw-semibold text-muted mb-2">
          <Col>Due</Col>
          <Col>For</Col>
          <Col>Available from</Col>
          <Col>Until</Col>
        </Row>
        <Row>
          <Col>{quiz.dueDate || "—"}</Col>
          <Col>Everyone</Col>
          <Col>{quiz.availableDate || "—"}</Col>
          <Col>{quiz.availableUntil || "—"}</Col>
        </Row>
      </div>
    </div>
  );
}
