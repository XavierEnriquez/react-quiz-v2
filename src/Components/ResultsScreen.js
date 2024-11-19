import { useQuizContext } from "../contexts/QuizContext";

function ResultsScreen() {
  const { points, highscore, maxPoints } = useQuizContext();

  const percentage = (points / maxPoints) * 100;
  const highestPercent = Math.ceil((highscore / maxPoints) * 100);

  let emoji;
  if (percentage > 89) emoji = "🏆";
  if (percentage <= 89 && percentage >= 80) emoji = "⭐";
  if (percentage <= 79 && percentage >= 70) emoji = "😕";
  if (percentage < 69) emoji = "👎";
  return (
    <>
      <p className="result">
        <span>{emoji}</span> Your score is{" "}
        <strong>{Math.ceil(percentage)}%</strong> ({points} out of {maxPoints}{" "}
        points){" "}
      </p>
      <p className="highscore">(Your highest score: {highestPercent}%)</p>
    </>
  );
}

export default ResultsScreen;
