import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Col, Form, Row, Card, Badge } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import * as quizzesClient from "./client";
import { updateQuiz } from "./reducer";
import * as coursesClient from "../client";
import { setQuizzes } from "./reducer";

export default function DetailsEditor() {
  const { cid, qid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const quizFromStore = useSelector((state: any) =>
    state.quizzesReducer.quizzes.find((q: any) => q._id === qid)
  );

  const [quiz, setQuiz] = useState<any>(null);

  const fetchQuizzes = async () => {
    if (!cid || quiz) return;
    const data = await coursesClient.findQuizzesForCourse(cid);
    dispatch(setQuizzes(data));
  };
  useEffect(() => {
    fetchQuizzes();
    if (quizFromStore) {
      setQuiz(quizFromStore);
    }
  }, [quizFromStore]);

  const handleSave = async (publish: boolean) => {
    if (!quiz) return;
    const updated = await quizzesClient.updateQuiz(quiz);
    dispatch(updateQuiz(updated));
    if (publish) {
      await quizzesClient.publishQuiz(quiz._id);
    }
    navigate(`/Kambaz/Courses/${cid}/Quizzes`);
  };

  if (!quiz) return <div>Loading...</div>;

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
        />
      </Form.Group>

      <Row className="mb-3">
        <Col md={3} className="text-end text-muted">
          Quiz Type
        </Col>
        <Col md={5}>
          <Form.Select
            value={quiz.quizType}
            onChange={(e) => setQuiz({ ...quiz, quizType: e.target.value })}
          >
            <option value="GRADED">Graded Quiz</option>
            <option value="PRACTICE">Practice Quiz</option>
            <option value="GRADED_SURVEY">Graded Survey</option>
            <option value="UNGRADED_SURVEY">Ungraded Survey</option>
          </Form.Select>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={3} className="text-end text-muted">
          Assignment Group
        </Col>
        <Col md={5}>
          <Form.Select
            value={quiz.assignmentGroup}
            onChange={(e) =>
              setQuiz({ ...quiz, assignmentGroup: e.target.value })
            }
          >
            <option value="ASSIGNMENTS">ASSIGNMENTS</option>
            <option value="QUIZZES">QUIZZES</option>
            <option value="EXAMS">EXAMS</option>
            <option value="PROJECT">PROJECT</option>
          </Form.Select>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={{ span: 5, offset: 3 }}>
          <Form.Check
            type="checkbox"
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
              label="Time Limit"
              checked={!!quiz.timeLimit}
              onChange={(e) =>
                setQuiz({
                  ...quiz,
                  timeLimit: e.target.checked ? quiz.timeLimit || 20 : 0,
                })
              }
            />
            <Form.Control
              style={{ width: 100 }}
              type="number"
              min={1}
              disabled={!quiz.timeLimit}
              value={quiz.timeLimit || ""}
              onChange={(e) =>
                setQuiz({ ...quiz, timeLimit: Number(e.target.value) })
              }
            />
            <span className="text-muted">Minutes</span>
          </div>
          <div className="d-flex align-items-center gap-2 mb-2">
            <Form.Check
              type="checkbox"
              label="Allow Multiple Attempts"
              checked={quiz.multipleAttempts}
              onChange={(e) =>
                setQuiz({
                  ...quiz,
                  multipleAttempts: e.target.checked,
                  attemptsAllowed: 1,
                })
              }
            />
            <Form.Control
              style={{ width: 100 }}
              type="number"
              min={1}
              disabled={!quiz.multipleAttempts}
              value={quiz.attemptsAllowed || ""}
              onChange={(e) =>
                setQuiz({ ...quiz, attemptsAllowed: Number(e.target.value) })
              }
            />
            <span className="text-muted">Times</span>
          </div>
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
          </Card>
        </Col>
      </Row>

      <div className="d-flex justify-content-center gap-3 my-4">
        <Button variant="light" size="lg" onClick={() => navigate(-3)}>
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
