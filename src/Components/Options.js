function Options({ question, dispatch, answer }) {
  const hasAnswered = answer !== null;
  return (
    <ul className="options">
      {question.options.map((option, index) => (
        <li key={option}>
          <button
            className={`btn btn-option ${index === answer ? "answer" : ""} ${
              hasAnswered
                ? index === question.correctOption
                  ? "correct"
                  : "wrong"
                : ""
            } `}
            onClick={() => dispatch({ type: "newAnswer", payload: index })}
            disabled={hasAnswered}
          >
            {option}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default Options;
