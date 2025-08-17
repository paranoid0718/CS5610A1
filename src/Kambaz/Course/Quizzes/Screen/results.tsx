import { useEffect, useState } from "react";
import * as attemptClient from "./client";
import * as quizClient from "../client";
import { useParams } from "react-router";
import { v4 as uuidv4 } from "uuid";
import { Card, Form } from "react-bootstrap";

export default function Results() {
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
    let prev = "";
    let count = 0;

    attempt.answers.forEach((answer: any) => {
      const question = questions.find((q: any) => q._id === answer.questionId);
      if (!question) return;

      if (question._id === prev) {
        count++;
      } else {
        count = 0;
      }

      if (question.answer[count]) {
        if (question.answer[count].includes(String(answer.choice))) {
          score += question.points / question.answer.length;
        }
      }

      prev = question._id;
    });

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
      <h1 className="mb-4">Quiz Results</h1>
      <div className="mx-auto" style={{ maxWidth: 900 }}>
        {attempt &&
          attempt.answers.map((answer: any, i: number) => {
            const question = questions.find(
              (q: any) => q._id === answer.questionId
            );

            const answersForThisQ = attempt.answers.filter(
              (a: any) => a.questionId === answer.questionId
            ) as any[];
            const localIndex = answersForThisQ.indexOf(answer);

            return (
              <div key={`${answer.questionId}-${i}`}>
                <Card>
                  <Card.Header
                    className={`d-flex justify-content-between ${(() => {
                      if (!question) return "bg-danger";
                      const correct = question.answer[localIndex]?.includes(
                        String(answer.choice)
                      );
                      return correct ? "bg-success" : "bg-danger";
                    })()}`}
                  >
                    <div>
                      {question ? `Question ${i + 1}` : "Question not found"}
                    </div>
                    <div>
                      {Number(question?.points / question?.answer.length) ?? 0}{" "}
                      pts
                    </div>
                  </Card.Header>

                  <Card.Body>
                    <div className="mb-2">
                      {question ? question.title : "—"}
                    </div>

                    {(question?.type === "MULTIPLE_CHOICE" ||
                      question?.type === "TRUE_FALSE") && (
                      <Form className="mt-2">
                        {question?.choices?.map((c: any, j: number) => (
                          <Form.Check
                            key={j}
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
                    {question && question.type === "FILL_IN_BLANK"
                      ? `Accepted answer${
                          (question.answer[localIndex]?.length ?? 0) > 1
                            ? "s"
                            : ""
                        }: ${
                          question.answer[localIndex]?.join(", ") || "Not found"
                        }`
                      : `Correct answer: ${
                          question?.answer.join(", ") || "Not found"
                        }`}
                  </p>
                  <p>Your answer: {answer.choice}</p>
                </div>
              </div>
            );
          })}
      </div>

      <h2 className="mt-4">Final Grade:</h2>
      <p>Score: {getScore()}</p>
    </div>
  );
}
