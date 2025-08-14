import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Col, Form, Row, Card, Badge } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addQuiz } from "./reducer";
import * as coursesClient from "../client";
import * as quizzesClient from "./client";

export default function QuizCreate() {
  const { cid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [quiz, setQuiz] = useState({
    title: "",
    description: "",
    course: cid ?? "",
    quizType: "GRADED" as
      | "GRADED"
      | "PRACTICE"
      | "GRADED_SURVEY"
      | "UNGRADED_SURVEY",
    assignmentGroup: "ASSIGNMENTS" as
      | "QUIZZES"
      | "EXAMS"
      | "ASSIGNMENTS"
      | "PROJECT",
    shuffleAnswers: false,
    timeLimitEnabled: false,
    timeLimit: 0,
    multipleAttempts: false,
    attemptsAllowed: 1,
    showCorrectAnswers: null as string | null,
    accessCode: null as string | null,
    oneQuestionAtATime: true,
    webcamRequired: false,
    lockAfterAnswering: false,
    availableDate: "",
    dueDate: "",
    availableUntil: "",
    points: 0,
    questionNumber: 0,
  });

  const handleSave = async (publish: boolean) => {
    if (!cid) return;

    const payload = {
      ...quiz,
      timeLimit: quiz.timeLimitEnabled ? Number(quiz.timeLimit) : undefined,
    };

    const newQuiz = await coursesClient.createQuizForCourse(cid, payload);
    dispatch(addQuiz(newQuiz));
    if (publish) {
      await quizzesClient.publishQuiz(newQuiz._id);
    }
    navigate(`/Kambaz/Courses/${cid}/Quizzes`);
  };

  return (
    <div className="mx-auto" style={{ maxWidth: 900 }}>
      <Form.Group className="mb-3">
        <Form.Control
          placeholder="Unnamed Quiz"
          value={quiz.title}
          onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
        />
      </Form.Group>

      <div className="text-muted mb-1">Quiz Instructions:</div>
      <Form.Group className="mb-4">
        <Form.Control
          as="textarea"
          rows={6}
          value={quiz.description}
          onChange={(e) => setQuiz({ ...quiz, description: e.target.value })}
          placeholder=""
        />
      </Form.Group>

      <Row className="mb-3">
        <Col
          md={3}
          className="d-flex align-items-center justify-content-md-end mb-2 mb-md-0"
        >
          <div className="text-muted">Quiz Type</div>
        </Col>
        <Col md={5}>
          <Form.Select
            value={quiz.quizType}
            onChange={(e) =>
              setQuiz({ ...quiz, quizType: e.target.value as any })
            }
          >
            <option value="GRADED">Graded Quiz</option>
            <option value="PRACTICE">Practice Quiz</option>
            <option value="GRADED_SURVEY">Graded Survey</option>
            <option value="UNGRADED_SURVEY">Ungraded Survey</option>
          </Form.Select>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col
          md={3}
          className="d-flex align-items-center justify-content-md-end mb-2 mb-md-0"
        >
          <div className="text-muted">Assignment Group</div>
        </Col>
        <Col md={5}>
          <Form.Select
            defaultValue={"QUIZZES"}
            value={quiz.assignmentGroup}
            onChange={(e) =>
              setQuiz({ ...quiz, assignmentGroup: e.target.value as any })
            }
          >
            <option value="ASSIGNMENTS">ASSIGNMENTS</option>
            <option value="QUIZZES">QUIZZES</option>
            <option value="EXAMS">EXAMS</option>
            <option value="PROJECT">PROJECT</option>
          </Form.Select>
        </Col>
      </Row>

      <div className="fw-semibold mb-2" style={{ marginLeft: 12 }}>
        Options
      </div>

      <Row className="mb-3">
        <Col md={{ span: 5, offset: 3 }}>
          <Form.Check
            type="checkbox"
            id="opt-shuffle"
            label="Shuffle Answers"
            checked={quiz.shuffleAnswers}
            onChange={(e) =>
              setQuiz({ ...quiz, shuffleAnswers: e.target.checked })
            }
            className="mb-2"
          />

          <div className="d-flex align-items-center gap-2 mb-2">
            <Form.Check
              type="checkbox"
              id="opt-time-limit"
              label="Time Limit"
              checked={quiz.timeLimitEnabled}
              onChange={(e) =>
                setQuiz({
                  ...quiz,
                  timeLimitEnabled: e.target.checked,
                  timeLimit: e.target.checked ? quiz.timeLimit || 20 : 0,
                })
              }
            />
            <Form.Control
              style={{ width: 100 }}
              type="number"
              min={1}
              disabled={!quiz.timeLimitEnabled}
              value={quiz.timeLimitEnabled ? quiz.timeLimit : ""}
              onChange={(e) =>
                setQuiz({ ...quiz, timeLimit: Number(e.target.value) })
              }
            />
            <span className="text-muted">Minutes</span>
          </div>

          <Form.Check
            type="checkbox"
            id="opt-multi-attempts"
            label="Allow Multiple Attempts"
            checked={quiz.multipleAttempts}
            onChange={(e) =>
              setQuiz({
                ...quiz,
                multipleAttempts: e.target.checked,
                attemptsAllowed: e.target.checked
                  ? Math.max(quiz.attemptsAllowed || 1, 1)
                  : 1,
              })
            }
            className="mb-2"
          />
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={{ span: 9, offset: 3 }}>
          <Card className="border-secondary">
            <Card.Body>
              <div className="fw-semibold mb-2">Assign</div>

              <div className="mb-3">
                <div className="text-muted mb-1">Assign to</div>
                <Badge bg="light" text="dark" className="p-2">
                  Everyone ✕
                </Badge>
              </div>

              <div className="mb-3">
                <div className="text-muted mb-1">Due</div>
                <Form.Control
                  type="date"
                  value={quiz.dueDate || ""}
                  onChange={(e) =>
                    setQuiz({ ...quiz, dueDate: e.target.value })
                  }
                />
              </div>

              <Row className="g-3">
                <Col md={6}>
                  <div className="text-muted mb-1">Available from</div>
                  <Form.Control
                    type="date"
                    value={quiz.availableDate || ""}
                    onChange={(e) =>
                      setQuiz({ ...quiz, availableDate: e.target.value })
                    }
                  />
                </Col>
                <Col md={6}>
                  <div className="text-muted mb-1">Until</div>
                  <Form.Control
                    type="date"
                    value={quiz.availableUntil || ""}
                    onChange={(e) =>
                      setQuiz({ ...quiz, availableUntil: e.target.value })
                    }
                  />
                </Col>
              </Row>
            </Card.Body>
            <Card.Footer className="text-center text-muted">+ Add</Card.Footer>
          </Card>
        </Col>
      </Row>

      <div className="d-flex justify-content-center gap-3 my-4">
        <Button variant="light" size="lg" onClick={() => navigate(-1)}>
          Cancel
        </Button>
        <Button variant="danger" size="lg" onClick={() => handleSave(false)}>
          Save
        </Button>
        <Button variant="danger" size="lg" onClick={() => handleSave(true)}>
          Save and Publish
        </Button>
      </div>
    </div>
  );
}
