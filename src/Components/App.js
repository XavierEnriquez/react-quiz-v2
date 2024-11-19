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
import { useQuizContext } from "../contexts/QuizContext";

function App() {
  const { status } = useQuizContext();
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen />}
        {status === "active" && (
          <>
            <Progress />
            <Question />
          </>
        )}
        {status === "finished" && (
          <>
            <ResultsScreen />
            <NextButton />
          </>
        )}
      </Main>
      {status === "active" && (
        <Footer children>
          <Timer />
          <NextButton />
        </Footer>
      )}
    </div>
  );
}

export default App;
