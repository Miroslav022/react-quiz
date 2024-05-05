import { useQuiz } from "../Contexts/QuizContext";

function Progress() {
  const { maxPossiblePoints, points, QuestionLength, index, answer } =
    useQuiz();
  return (
    <header className="progress">
      <progress max={QuestionLength} value={index + Number(answer !== null)} />
      <p>
        Question <strong>{index + 1}</strong> / {QuestionLength}
      </p>
      <p>
        <strong>{points}</strong> / {maxPossiblePoints}
      </p>
    </header>
  );
}

export default Progress;
