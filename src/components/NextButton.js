import { useQuiz } from "../Contexts/QuizContext";

function NextButton() {
  const { dispatch, index, answer, questions } = useQuiz();
  const hasAnswer = answer !== null;
  if (!hasAnswer) return;
  console.log(questions.length, index);
  if (questions.length - 1 === index) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finishQuiz" })}
      >
        Finish
      </button>
    );
  }
  return (
    <button
      className="btn btn-ui"
      onClick={() => dispatch({ type: "nextQuestion" })}
    >
      Next
    </button>
  );
}

export default NextButton;
