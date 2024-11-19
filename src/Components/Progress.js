import { useQuizContext } from "../contexts/QuizContext";

function Progress() {
  const { index, answer, points, numQuestions, maxPoints } = useQuizContext();

  return (
    <header className="progress">
      <progress max={numQuestions} value={index + Number(answer !== null)} />
      <p>
        Question{" "}
        <strong>
          {index + 1} / {numQuestions}
        </strong>
      </p>
      <p>
        <strong>
          {points} / {maxPoints} points
        </strong>
      </p>
    </header>
  );
}

export default Progress;
