import { useQuiz } from "../Contexts/QuizContext";

function Options({ question }) {
  const { dispatch, answer } = useQuiz();
  const hasAnswer = answer !== null;
  return (
    <div className="options">
      {question.options.map((option, index) => {
        return (
          <button
            key={option}
            className={`btn btn-option ${index === answer ? "answer" : ""} ${
              hasAnswer
                ? question.correctOption === index
                  ? "correct"
                  : "wrong"
                : ""
            }`}
            onClick={() => dispatch({ type: "newAnswer", payload: index })}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}

export default Options;
