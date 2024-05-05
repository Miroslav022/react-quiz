import { createContext, useContext, useEffect, useReducer } from "react";

const QuizContext = createContext();

const SECONDS_PER_QUESTION = 30;

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  secondsRemaining: null,
  highScore: 0,
};
function reducer(state, action) {
  switch (action.type) {
    case "restart":
      return { ...initialState, questions: state.questions, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "LoadQuestions":
      return { ...state, questions: action.payload, status: "ready" };
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          question.correctOption === action.payload
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finishQuiz":
      return {
        ...state,
        status: "finish",
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      };
    case "start":
      return {
        ...state,
        secondsRemaining: SECONDS_PER_QUESTION * state.questions.length,
        status: "active",
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finish" : state.status,
      };
    default:
      throw new Error("action unknown");
  }
}

function QuizProvider({ children }) {
  const [
    { questions, status, index, answer, points, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  const maxPossiblePoints = questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );
  const QuestionLength = questions.length;

  useEffect(function () {
    async function getQuestions() {
      const res = await fetch("http://localhost:9000/questions");
      const data = await res.json();
      dispatch({ type: "LoadQuestions", payload: data });
    }
    getQuestions();
  }, []);

  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        answer,
        index,
        maxPossiblePoints,
        QuestionLength,
        secondsRemaining,
        points,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined)
    throw new Error("QuizContext was used outside of the QuizProvider");
  return context;
}

export { QuizProvider, useQuiz };
