import { useEffect, useReducer } from "react";

import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import ResultsScreen from "./ResultsScreen";
import Footer from "./Footer";
import Timer from "./Timer";

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsTimer: null,
};

const SECS_TIMER = 10;

function reducer(state, action) {
  switch (action.type) {
    case "RESTART":
      return {
        ...initialState,
        status: "ready",
        questions: state.questions,
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        secondsTimer: state.questions.length * SECS_TIMER,
      };
    case "newAnswer":
      const thisQuestion = state.questions.at(state.index);

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === thisQuestion.correctOption
            ? state.points + thisQuestion.points
            : state.points,
      };

    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "getResults":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "tickTock":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    // return {
    //   ...state,
    //   secondsTimer: state.secondsTimer - 1,
    //   status: state.secondsTimer === 0 ? "finished" : state.status,
    // };

    default:
      throw new Error("Action unknown");
  }
}

function App() {
  const [
    { questions, status, index, answer, points, highscore, secondsTimer },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const maxPoints = questions.reduce((prev, cur) => prev + cur.points, 0);

  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              points={points}
              maxPoints={maxPoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
          </>
        )}
        {status === "finished" && (
          <>
            <ResultsScreen
              points={points}
              maxPoints={maxPoints}
              highscore={highscore}
            />
            <NextButton dispatch={dispatch} status={status} />
          </>
        )}
      </Main>
      {status === "active" && (
        <Footer children>
          <Timer dispatch={dispatch} secondsTimer={secondsTimer} />
          <NextButton
            dispatch={dispatch}
            answer={answer}
            index={index}
            numQuestions={numQuestions}
          />
        </Footer>
      )}
    </div>
  );
}

export default App;
