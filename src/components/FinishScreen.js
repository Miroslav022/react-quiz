import { useQuiz } from "../Contexts/QuizContext";

function FinishScreen() {
  const { points, maxPossiblePoints, dispatch } = useQuiz();
  return (
    <>
      <p className="result">
        You scored {points} out of {maxPossiblePoints}
      </p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart Quiz
      </button>
    </>
  );
}

export default FinishScreen;
