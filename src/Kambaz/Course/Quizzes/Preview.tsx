import { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
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
    };
    load();
  }, [qid]);

  return (
    <div className="mx-auto" style={{ maxWidth: 900 }}>
      <div className="d-flex align-items-center mb-3">
        <h3 className="mb-0">{quiz?.title}</h3>
      </div>

        <div className="d-flex flex-column gap-3">
          {questions.map((q, i) => (
            <Card key={q._id}>
              <Card.Header className="d-flex justify-content-between">
                <div>Question{i + 1}.</div>
                <div>{q.points} pts</div>
              </Card.Header>
              <Card.Body>
                {q.title}
                {q.type === "MULTIPLE_CHOICE" && (
                  <Form>
                    {q.choices?.map((c, i) => (
                      <Form.Check
                        key={i}
                        type="radio"
                        className="mb-2"
                        label={c.text}
                        checked={c.isCorrect}
                        readOnly
                      />
                    ))}
                  </Form>
                )}
                {q.type === "TRUE_FALSE" && (
                  <Form>
                    {q.choices?.map((c, i) => (
                      <Form.Check
                        key={i}
                        type="radio"
                        className="mb-2"
                        label={c.text}
                        checked={c.isCorrect}
                        readOnly
                      />
                    ))}
                  </Form>
                )}
                {q.type === "FILL_IN_BLANK" && (
                  <Form.Control
                    value={q.answer}
                    readOnly
                  />
                )}
              </Card.Body>
            </Card>
          ))}
          <div className="d-flex justify-content-center gap-3 my-3">
            <Button variant="light" onClick={() => navigate(-1)}>
              Close
            </Button>
          </div>
        </div>
    </div>
  );
}