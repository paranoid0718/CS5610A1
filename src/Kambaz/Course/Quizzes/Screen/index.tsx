import { useEffect } from "react";
import * as quizClient from "../client";
import * as attemptClient from "./client";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setQuestions } from "./reducer";
import { Card, Form, Button } from "react-bootstrap";

export default function QuizScreen() {
  const { questions } = useSelector((state: any) => state.questionsReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { cid, qid } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchQuiz = async () => {
    const questions = await quizClient.findQuestionsForQuiz(qid! as string);
    dispatch(setQuestions(questions));
  };

  const submitQuiz = async () => {
    const formElements = document.querySelectorAll(
      'input[type="radio"]:checked, input[type="checkbox"]:checked, input[type="text"]'
    );

    const answers: any[] = [];
    formElements.forEach((el: any) => {
      const [qid, blankIdx] = el.name.split(":"); 
      answers.push({
        questionId: qid,
        blankIndex: blankIdx ? Number(blankIdx) : undefined,
        choice: el.value,
      });
    });

    const attempt = {
      course: cid,
      user: currentUser._id,
      quiz: qid,
      answers,
    };

    const response = await attemptClient.addAttempt(attempt);
    navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}/Results/${response._id}`);
  };

  useEffect(() => {
    fetchQuiz();
  }, []);

  return (
    <div className="mx-auto" style={{ maxWidth: 900 }}>
      <div className="d-flex align-items-center mb-3">
        <h3 className="mb-0">Quiz</h3>
      </div>

      <div className="d-flex flex-column gap-3">
        {questions.map((question: any, index: number) => (
          <Card key={question._id}>
            <Card.Header className="d-flex justify-content-between">
              <div>Question {index + 1}.</div>
              <div>{question.points} pts</div>
            </Card.Header>
            <Card.Body>
              {question.title}

              {question.type === "FILL_IN_BLANK" && (
                <Form className="mt-2 d-flex flex-column gap-2">
                  {Array.from({ length: question.fields }).map((_, i) => (
                    <Form.Control
                      key={i}
                      type="text"
                      name={`${question._id}:${i}`} 
                      placeholder={`Blank ${i + 1}`}
                    />
                  ))}
                </Form>
              )}

              {question.type === "TRUE_FALSE" && (
                <Form className="mt-2">
                  {question.choices.map((choice: any, i: number) => (
                    <Form.Check
                      key={i}
                      type="radio"
                      name={question._id}
                      className="mb-2"
                      label={choice.text}
                      value={choice.text}
                    />
                  ))}
                </Form>
              )}

              {question.type === "MULTIPLE_CHOICE" && (
                <Form className="mt-2">
                  {question.choices.map((choice: any, i: number) => (
                    <Form.Check
                      key={i}
                      type="radio"
                      name={question._id}
                      className="mb-2"
                      label={choice.text}
                      value={choice.text}
                    />
                  ))}
                </Form>
              )}
            </Card.Body>
          </Card>
        ))}

        <div className="d-flex justify-content-center gap-3 my-3">
          <Button variant="danger" onClick={submitQuiz}>
            Submit Quiz
          </Button>
        </div>
      </div>
    </div>
  );
}
