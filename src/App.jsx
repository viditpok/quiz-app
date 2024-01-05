import Quiz from "./components/Quiz/Quiz";
import { useEffect, useState } from "react";

function App() {
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    getQuestions();
  }, []);

  const getQuestions = async () => {
    try {
      const urls = [
        "https://65983487668d248edf244a07.mockapi.io/questions",
        "https://65983487668d248edf244a07.mockapi.io/questions2",
      ];

      const responses = await Promise.all(urls.map((url) => fetch(url)));
      const questionsArrays = await Promise.all(
        responses.map((res) => res.json())
      );

      const combinedQuestions = questionsArrays.flat();
      console.log(combinedQuestions);
      setQuestions(combinedQuestions);
    } catch (error) {
      console.log(error);
    }
  };

  return questions.length && <Quiz questions={questions} />;
}

export default App;
