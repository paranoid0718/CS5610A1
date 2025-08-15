import { useEffect, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import * as quizzesClient from "../client";
import * as questionsClient from "./client";

type QuestionType = "MULTIPLE_CHOICE" | "TRUE_FALSE" | "FILL_IN_BLANK";
type Choice = { text: string; isCorrect?: boolean };

type Question = {
  _id?: string;
  quizId: string;
  type: QuestionType;
  title: string;
  points: number;
  choices: Choice[];
  answer: string[];
};

export default function QuestionForm({
  questions,
  setQuestions,
}: {
  questions: any[];
  setQuestions: (questions: any) => void;
}) {
  const { cid, qid, questionId } = useParams();
  const navigate = useNavigate();

  const isNew = questionId === "new";

  const [q, setQ] = useState<Question>({
    quizId: qid || "",
    type: "MULTIPLE_CHOICE",
    title: "",
    points: 1,
    choices: [
      { text: "Option 1", isCorrect: true },
      { text: "Option 2", isCorrect: false },
    ],
    answer: [],
  });

  useEffect(() => {
    const init = async () => {
      if (!isNew && questionId) {
        const existing = await questionsClient.findQuestionById(questionId);
        setQ(existing);
      } else {
        setQ({ ...q, quizId: qid || "" });
      }
    };
    init();
  }, [isNew, questionId, qid]);

  const editQ = (p: any) => setQ({ ...q, ...p });

  const changeType = (t: QuestionType) => {
    if (t === "MULTIPLE_CHOICE") {
      editQ({
        type: t,
        choices: [
          { text: "Option 1", isCorrect: true },
          { text: "Option 2", isCorrect: false },
        ],
        answer: [],
      });
    } else if (t === "TRUE_FALSE") {
      editQ({
        type: t,
        choices: [
          { text: "True", isCorrect: true },
          { text: "False", isCorrect: false },
        ],
        answer: [],
      });
    } else {
      editQ({
        type: t,
        choices: [],
        answer: q.answer?.length ? q.answer : [""],
      });
    }
  };

  const addChoice = () =>
    editQ({ choices: [...q.choices, { text: "", isCorrect: false }] });
  const removeChoice = (idx: number) => {
    const deletedChoice = [...q.choices];
    deletedChoice.splice(idx, 1);
    editQ({ choices: deletedChoice });
  };
const updateChoice = (idx: number, patch: Partial<Choice>) => {
  const nextChoices = q.choices.map((choice, i) => {
    const merged = i === idx ? { ...choice, ...patch } : choice;
    if ("isCorrect" in patch) {
      return {
        ...merged,
        isCorrect: i === idx ? !!patch.isCorrect : false,
      };
    }
    return merged;
  });

  setQ({ ...q, choices: nextChoices });
};

  const setTrueFalse = (opt: "True" | "False") => {
    const updatedChoices = q.choices.map((choice) => ({
      ...choice,
      isCorrect: choice.text === opt,
    }));

    editQ({
      choices: updatedChoices,
      answer: [opt],
    });
  };

  const addBlank = () => editQ({ answer: [...q.answer, ""] });
  const removeBlank = (idx: number) => {
    const deletedBlank = [...q.answer];
    deletedBlank.splice(idx, 1);
    editQ({ answer: deletedBlank });
  };
  const updateBlank = (idx: number, text: string) => {
    const updatedAnswer = [...q.answer];
    updatedAnswer[idx] = text;
    editQ({ answer: updatedAnswer });
  };

  const handleSave = async () => {
    console.log(q);
    const payload = {
      _id: q._id,
      quizId: q.quizId,
      type: q.type,
      title: q.title,
      points: Number(q.points) || 0,
      choices: q.choices,
      answer:
        q.type === "FILL_IN_BLANK"
          ? q.answer
          : q.choices
              .filter((choice) => choice.isCorrect)
              .map((choice) => choice.text),
    } as any;

    if (isNew) {
      const newQuestion = await quizzesClient.createQuestionForQuiz(
        qid as string,
        payload
      );
      setQuestions([...questions, newQuestion]);
      await quizzesClient.recalcQuizQuestionNumber(qid as string);
    } else {
      await questionsClient.updateQuestion(payload);
      setQuestions(await quizzesClient.findQuestionsForQuiz(qid as string));
    }
    await quizzesClient.recalcQuizPoints(qid as string);

    navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}/Editors/Questions`);
  };

  const handleCancel = () => navigate(-1);

  return (
    <div className="d-flex flex-column gap-3">
      <h5 className="mb-2">{isNew ? "Add Question" : "Edit Question"}</h5>

      <Form.Group>
        <Form.Label>Question Type</Form.Label>
        <Form.Select
          value={q.type}
          onChange={(e) => changeType(e.target.value as QuestionType)}
        >
          <option value="MULTIPLE_CHOICE">Multiple Choice</option>
          <option value="TRUE_FALSE">True / False</option>
          <option value="FILL_IN_BLANK">Fill in the Blank</option>
        </Form.Select>
      </Form.Group>

      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control
          value={q.title}
          onChange={(e) => editQ({ title: e.target.value })}
          placeholder="Enter question text"
        />
      </Form.Group>

      <Form.Group style={{ maxWidth: 180 }}>
        <Form.Label>Points</Form.Label>
        <Form.Control
          type="number"
          min={0}
          value={q.points}
          onChange={(e) => editQ({ points: Number(e.target.value) || 0 })}
        />
      </Form.Group>

{q.type === "MULTIPLE_CHOICE" && (
  <div className="d-flex flex-column gap-2">
    <div className="fw-semibold">Choices (single correct)</div>
    {q.choices.map((c, i) => (
      <InputGroup key={i} className="mb-2">
        <Form.Check
          type="radio"
          name="mc-correct"
          className="me-2"
          checked={!!c.isCorrect}
          onChange={(e) => updateChoice(i, {isCorrect: e.target.checked})}
          title="Correct?"
        />
        <Form.Control
          value={c.text}
          onChange={(e) => updateChoice(i, { text: e.target.value })}
          placeholder={`Choice ${i + 1}`}
        />
        <Button variant="outline-secondary" onClick={() => removeChoice(i)}>
          Delete
        </Button>
      </InputGroup>
    ))}
    <Button variant="light" onClick={addChoice}>+ Add Choice</Button>
  </div>
)}

      {q.type === "TRUE_FALSE" && (
        <Form>
          {q.choices.map((c, i) => (
            <Form.Check
              key={i}
              type="radio"
              name="tf"
              className="mb-2"
              label={c.text}
              checked={c.isCorrect}
              onChange={() => setTrueFalse(c.text as "True" | "False")}
            />
          ))}
        </Form>
      )}

      {q.type === "FILL_IN_BLANK" && (
        <div className="d-flex flex-column gap-2">
          <div className="fw-semibold">Possible Answers</div>
          {(q.answer.length ? q.answer : [""]).map((a, i) => (
            <InputGroup key={i} className="mb-2">
              <Form.Control
                value={a}
                onChange={(e) => updateBlank(i, e.target.value)}
                placeholder={`Answer ${i + 1}`}
              />
              <Button
                variant="outline-secondary"
                onClick={() => removeBlank(i)}
              >
                Delete
              </Button>
            </InputGroup>
          ))}
          <Button variant="light" onClick={addBlank}>
            + Add Answer
          </Button>
        </div>
      )}
      <hr />
      <div className="d-flex justify-content-center gap-3 mt-3">
        <Button variant="light" onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleSave}>
          Save
        </Button>
      </div>
    </div>
  );
}
