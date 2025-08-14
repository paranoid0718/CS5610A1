import { useEffect, useState } from "react";
import { Button, ListGroup, Badge } from "react-bootstrap";
import { Routes, Route, useNavigate, useParams } from "react-router-dom";
import * as quizzesClient from "./client";
import * as questionsClient from "./Questions/client";
import QuestionForm from "./Questions/QuestionsForm";

type Question = {
  _id?: string;
  quizId: string;
  type: "MULTIPLE_CHOICE" | "TRUE_FALSE" | "FILL_IN_BLANK";
  title: string;
  points?: number;
  choices?: { text: string; isCorrect?: boolean }[];
  answer?: string[];
};

export default function QuestionsEditor() {
  const { qid } = useParams();
  const {questionId} = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<Question[]>([]);

  const load = async () => {
    if (!qid) return;
    const data = await quizzesClient.findQuestionsForQuiz(qid);
    setQuestions(data || []);
  };
    const [editing, setEditing] = useState(false);

  useEffect(() => {
    setEditing(!!questionId);
  }, [questionId]);


  useEffect(() => {
    load();
  }, [qid]);

  const remove = async (questionId: string) => {
    await questionsClient.deleteQuestion(questionId);
    setQuestions((prev) => prev.filter((q) => q._id !== questionId));
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">Questions</h4>
        {!editing && <Button variant = "secondary" onClick={() => navigate("new")}>+ New Question</Button>}
      </div>
      <hr />

      <ListGroup className="mb-4">
        {questions.map((q, i) => (
          <ListGroup.Item key={q._id}>
            <div className="d-flex align-items-center">
              <div className="me-3"><Badge bg="secondary">Q{i + 1}</Badge></div>
              <div className="flex-grow-1">
                <div className="fw-semibold">{q.title}</div>
                <div className="text-muted small">
                  {q.type} · {q.points} pts
                </div>
              </div>
              <div className="d-flex gap-2">
                <Button
                  size="sm"
                  variant="outline-secondary"
                  onClick={() => navigate(`${q._id}`)}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="outline-danger"
                  onClick={async() => {q._id && await remove(q._id);
                   await quizzesClient.recalcQuizPoints(qid as string);
                    await quizzesClient.recalcQuizQuestionNumber(qid as string);
                  }}
                >
                  Delete
                </Button>
              </div>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <Routes>
        <Route path=":questionId" element={<QuestionForm questions={questions} setQuestions = {setQuestions}/>} />
      </Routes>
    </div>
  );
}