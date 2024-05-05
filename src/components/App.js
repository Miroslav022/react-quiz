import { useQuiz } from "../Contexts/QuizContext";
import Question from "./Question";
import Loader from "./Loader";
import Header from "./Header";
import Main from "./Main";
import NextButton from "./NextButton";
import FinishScreen from "./FinishScreen";
import Progress from "./Progress";
import Footer from "./Footer";
import Timer from "./Timer";
import StartQuiz from "./StartQuiz";

function App() {
  const { status } = useQuiz();

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "ready" && <StartQuiz />}
        {status === "active" && (
          <>
            <Progress />
            <Question />
            <Footer>
              <Timer />
              <NextButton />
            </Footer>
          </>
        )}
        {status === "finish" && <FinishScreen />}
      </Main>
    </div>
  );
}

export default App;
