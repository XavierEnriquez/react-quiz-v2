import { useEffect, useState } from "react";
import { useQuizContext } from "../contexts/QuizContext";

function Timer() {
  const { secondsTimer, dispatch } = useQuizContext();

  // fixed full App re-renders after every second by managing the timer state at the component level instead of top App level
  const [secondsLeft, setSecondsLeft] = useState(secondsTimer);
  const mins = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  // const mins = Math.floor(secondsTimer / 60);
  // const seconds = secondsTimer % 60;

  useEffect(
    function () {
      const id = setInterval(function () {
        // managing the secondsTimer state at App level and dispatching this action was causing full App re-renders after every second
        // dispatch({ type: "tickTock" });

        // instead we re-set the secondsLeft state every second - 1 second
        setSecondsLeft(secondsLeft - 1);
      }, 1000);
      // when secondsLeft reach 0 will dispatch the action tickTock in App reducer
      if (secondsLeft === 0) return dispatch({ type: "tickTock" });
      return () => {
        clearInterval(id);
      };
    },
    [dispatch, secondsLeft]
  );

  return (
    <div className="timer">
      {mins < 10 && "0"}
      {mins}:{seconds < 10 && "0"}
      {seconds}
    </div>
  );
}

export default Timer;
