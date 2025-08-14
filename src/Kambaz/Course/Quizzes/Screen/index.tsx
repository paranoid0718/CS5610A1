import { useEffect } from "react";
import * as quizClient from "../client";
import * as attemptClient from "./client";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setQuestions } from "./reducer";

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
      'input[type="radio"]:checked, input[type="text"]'
    );
    const answers = Array.from(formElements).map((el: any) => ({
      questionId: el.name,
      choice: el.value,
    }));
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
    <div>
      <h1>Quiz Screen</h1>
      {/* {questions} */}
      <ul>
        {questions.map((question: any) => (
          <li key={question._id}>
            <h3>{question.title}</h3>
            <ul>
              {question.type === "FILL_IN_BLANK" ? (
                <li>
                  <input type="text" name={question._id} />
                </li>
              ) : (
                question.choices.map((choice: any, index: number) => (
                  <li key={index}>
                    <input
                      type="radio"
                      name={question._id}
                      value={choice.text}
                    />
                    {choice.text}
                  </li>
                ))
              )}
            </ul>
          </li>
        ))}
      </ul>
      <button onClick={submitQuiz}>Submit Quiz</button>
    </div>
  );
}
