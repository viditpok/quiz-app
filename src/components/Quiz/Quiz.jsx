import { useState } from "react";
import { resultInitialState } from "../../constants";
import "./Quiz.scss";
import AnswerTimer from "../AnswerTimer/AnswerTimer";
import Result from "../Result/Result";
import Feedback from "../Feedback/Feedback";

const Quiz = ({ questions }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answerIdx, setAnswerIdx] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [result, setResult] = useState(resultInitialState);
  const [showResult, setShowResult] = useState(false);
  const [inputAnswer, setInputAnswer] = useState("");
  const [showAnswerTimer, setShowAnswerTimer] = useState(true);

  const { question, choices, correctAnswer, type } = questions[currentQuestion];

  const onAnswerClick = (answer, index) => {
    setAnswerIdx(index);
    if (answer === correctAnswer) {
      setAnswer(true);
    } else {
      setAnswer(false);
    }
  };

  const onClickNext = (finalAnswer) => {
    setAnswerIdx(null);
    setShowAnswerTimer(false);
    setInputAnswer('');
    setResult((prev) => {
      return answer
        ? {
            ...prev,
            score: prev.score + 5,
            correctAnswers: prev.correctAnswers + 1,
          }
        : {
            ...prev,
            wrongAnswers: prev.wrongAnswers + 1,
          };
    });

    if (currentQuestion !== questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setCurrentQuestion(0);
      setShowResult(true);
    }

    setTimeout(() => {
      setShowAnswerTimer(true);
    });
  };

  const onTryAgain = () => {
    setResult(resultInitialState);
    setShowResult(false);
  };

  const handleTimeUp = () => {
    setAnswer(false);
    onClickNext(false);
  };

  const handleInputChange = (evt) => {
    setInputAnswer(evt.target.value);

    if (evt.target.value === correctAnswer) {
      setAnswer(true);
    } else {
      setAnswer(false);
    }
  };

  const getAnswerUI = () => {
    if (type === "FIB") {
      return <input value={inputAnswer} onChange={handleInputChange} />;
    }

    return (
      <ul>
        {choices.map((answer, index) => (
          <li
            onClick={() => onAnswerClick(answer, index)}
            key={answer}
            className={answerIdx === index ? "selected-answer" : null}
          >
            {answer}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="quiz-container">
      <Feedback />
      {!showResult ? (
        <>
          {showAnswerTimer && (
            <AnswerTimer duration={25} onTimeUp={handleTimeUp} />
          )}
          <span className="active-question-no">{currentQuestion + 1}</span>
          <span className="total-questions">/{questions.length}</span>
          <h2>{question}</h2>
          {getAnswerUI(type)}
          <div className="footer">
            <button
              onClick={() => onClickNext(answer)}
              disabled={answerIdx === null && !inputAnswer}
            >
              {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
            </button>
          </div>
        </>
      ) : (
        <Result result={result} onTryAgain={onTryAgain} totalQuestions={questions.length} />
      )}
    </div>
  );
};

export default Quiz;
