import { useEffect, useState } from "react";
import * as attemptClient from "./client";
import * as quizClient from "../client";
import { useParams } from "react-router";
import { v4 as uuidv4 } from "uuid";
import { Card, Form } from "react-bootstrap";
// import { setGrades } from "../../Grades/reducer";
// import { useDispatch } from "react-redux";

export default function Results() {
  // const dispatch = useDispatch();
  const { qid, aid } = useParams();
  const [attempt, setAttempt] = useState({
    _id: uuidv4(),
    course: "",
    user: "",
    quiz: "",
    answers: [],
  });
  const [questions, setQuestions] = useState<any[]>([]);

  const fetchQuiz = async () => {
    const questions = await quizClient.findQuestionsForQuiz(qid! as string);
    setQuestions(questions);
  };

  const fetchAttempt = async () => {
    const attempt = await attemptClient.findAttemptById(aid! as string);
    setAttempt(attempt);
    fetchQuiz();
  };

  const getScore = () => {
    if (!questions.length || !attempt.answers.length) return 0;
    let score = 0;
    attempt.answers.forEach((answer: any) => {
      const question = questions.find((q: any) => q._id === answer.questionId);
      if (question && question.answer.includes(String(answer.choice))) {
        score += question.points;
      }
    });
    // dispatch(
    //   setGrades({
    //     course: attempt.course,
    //     user: attempt.user,
    //     quiz: attempt.quiz,
    //     score: score,
    //     attempt: attempt._id,
    //   })
    // );

    return `${score}/${questions.reduce((total, q) => total + q.points, 0)}`;
  };

  useEffect(() => {
    fetchAttempt();
  }, []);

  const grouped: Record<string, string[]> = {};
  attempt.answers.forEach((a: any) => {
    if (!grouped[a.questionId]) grouped[a.questionId] = [];
    grouped[a.questionId].push(a.choice);
  });

  return (
    <div className="mx-auto" style={{ maxWidth: 900 }}>
      <h1>Quiz Results Screen</h1>
      <p>Attempt ID: {attempt._id}</p>
      <p>Course ID: {attempt.course}</p>
      <p>User ID: {attempt.user}</p>
      <p>Quiz ID: {attempt.quiz}</p>
      <h2>Your Answers:</h2>

      <div className="mx-auto" style={{ maxWidth: 900 }}>
        {attempt &&
          attempt.answers.map((answer: any, i: number) => {
            const question = questions.find(
              (q: any) => q._id === answer.questionId
            );

            return (
              <div key={`${answer.questionId}-${i}`}>
                <Card>
                  <Card.Header
                    className={`d-flex justify-content-between ${
                      question &&
                      question.answer.includes(String(answer.choice))
                        ? "bg-success"
                        : "bg-danger"
                    }`}
                  >
                    <div>
                      {question ? `Question${i + 1}` : "Question not found"}
                    </div>
                    <div>{question?.points ?? 0} pts</div>
                  </Card.Header>

                  <Card.Body>
                    <div className="mb-2">
                      {question ? question.title : "—"}
                    </div>

                    {(question?.type === "MULTIPLE_CHOICE" ||
                      question?.type === "TRUE_FALSE") && (
                      <Form className="mt-2">
                        {question?.choices?.map((c: any, i: number) => (
                          <Form.Check
                            key={i}
                            type="radio"
                            className="mb-2"
                            label={c.text}
                            checked={false}
                            readOnly
                          />
                        ))}
                      </Form>
                    )}

                    {question?.type === "FILL_IN_BLANK" && (
                      <Form.Control
                        className="mt-2"
                        value=""
                        placeholder=""
                        readOnly
                      />
                    )}
                  </Card.Body>
                </Card>

                <div className="mt-2 ms-2">
                  <p>
                    <p>{`${
                      question && question?.answer.length > 1
                        ? "Accepted answers:"
                        : "Correct answer:"
                    } ${question?.answer.join(", ") || "Not found"}`}</p>
                  </p>
                  <p>Your answer: {answer.choice}</p>
                </div>
              </div>
            );
          })}
      </div>

      <h2 className="mt-4">Quiz Results:</h2>
      <p>Score: {getScore()}</p>
    </div>
  );
}
