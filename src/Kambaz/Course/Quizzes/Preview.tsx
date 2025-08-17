import { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import * as coursesClient from "../client";
import * as quizzesClient from "./client";
import { setQuizzes } from "./reducer";

type Quiz = {
  _id: string;
  title: string;
  description?: string;
  course: string;
  published?: boolean;
  points?: number;
  quizType?: "GRADED" | "PRACTICE" | "GRADED_SURVEY" | "UNGRADED_SURVEY";
};

type Choice = { text: string; isCorrect?: boolean };
type Question = {
  _id: string;
  quizId: string;
  type: "MULTIPLE_CHOICE" | "TRUE_FALSE" | "FILL_IN_BLANK";
  title: string;
  points?: number;
  choices?: Choice[];
  answer?: string[];
};

export default function QuizPreview() {
  const { cid, qid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { quizzes } = useSelector((s: any) => s.quizzesReducer);
  const quiz = quizzes?.find((q: Quiz) => q._id === qid);

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const ensureQuiz = async () => {
      if (!cid || quiz) return;
      const data = await coursesClient.findQuizzesForCourse(cid);
      dispatch(setQuizzes(data));
    };
    ensureQuiz();
  }, [cid, quiz, dispatch]);

  useEffect(() => {
    const load = async () => {
      if (!qid) return;
      const data = await quizzesClient.findQuestionsForQuiz(qid);
      setQuestions(data);
      setCurrentIndex(0);
    };
    load();
  }, [qid]);

  const currentQuestion = questions[currentIndex];

  const goPrev = () => setCurrentIndex((i) => i - 1);
  const goNext = () => setCurrentIndex((i) =>  i + 1);
  const goTo = (i: number) => setCurrentIndex(i);

return (
  <div className="mx-auto" style={{ maxWidth: 1000 }}>
    <h3 className="mb-4">{quiz?.title}</h3>

    <Row>
      <Col md={9}>
        {currentQuestion && (
          <Card key={currentQuestion._id}>
            <Card.Header className="d-flex justify-content-between">
              <div>Question {currentIndex + 1}.</div>
              <div>{currentQuestion.points ?? 0} pts</div>
            </Card.Header>
            <Card.Body>
              {currentQuestion.title}

              {currentQuestion.type === "MULTIPLE_CHOICE" && (
                <Form className="mt-2">
                  {currentQuestion.choices?.map((c, i) => (
                    <Form.Check
                      key={i}
                      type="radio"
                      className="mb-2"
                      label={c.text}
                      checked={!!c.isCorrect}
                      readOnly
                    />
                  ))}
                </Form>
              )}

              {currentQuestion.type === "TRUE_FALSE" && (
                <Form className="mt-2">
                  {currentQuestion.choices?.map((c, i) => (
                    <Form.Check
                      key={i}
                      type="radio"
                      className="mb-2"
                      label={c.text}
                      checked={!!c.isCorrect}
                      readOnly
                    />
                  ))}
                </Form>
              )}

              {currentQuestion.type === "FILL_IN_BLANK" && (
                <Form.Control
                  className="mt-2"
                  value={(currentQuestion.answer ?? []).join(", ")}
                  readOnly
                />
              )}
            </Card.Body>
          </Card>
        )}

        <div className="d-flex justify-content-between gap-3 my-3">
          <Button
            variant="outline-secondary"
            onClick={goPrev}
            disabled={currentIndex === 0}
          >
            Prev
          </Button>
          <div className="d-flex gap-3">
            <Button variant="light" onClick={() => navigate(-1)}>
              Close
            </Button>
            <Button
              variant="outline-secondary"
              onClick={goNext}
              disabled={currentIndex >= questions.length - 1}
            >
              Next
            </Button>
          </div>
        </div>
      </Col>

      <Col md={3}>
        <div className="d-flex flex-column align-items-start">
          Questions:
          {questions.map((_, i) => (
            <Button
              key={i}
              size="sm"
              className="mb-2"
              variant={i === currentIndex ? "danger" : "outline-secondary"}
              onClick={() => goTo(i)}
            >
              Question {i + 1}
            </Button>
          ))}
        </div>
      </Col>
    </Row>
  </div>
);}