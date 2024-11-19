import { useQuizContext } from "../contexts/QuizContext";

function NextButton() {
  const { status, index, answer, numQuestions, dispatch } = useQuizContext();

  if (answer !== null && index < numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </button>
    );

  if (status !== "finished" && answer !== null && index === numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "getResults" })}
      >
        Get Results
      </button>
    );

  if (status === "finished")
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "RESTART" })}
      >
        Restart Quiz
      </button>
    );
}

export default NextButton;
