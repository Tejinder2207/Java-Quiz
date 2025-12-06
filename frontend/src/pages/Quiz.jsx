import React, { useEffect, useState } from "react";
import QuestionCard from "../components/QuestionCard";
import ScoreBoard from "../components/ScoreBoard";
import { fetchQuestions, postResult } from "../services/api";

const Quiz = ({ unit, onQuit }) => {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);

  const email = localStorage.getItem("userEmail");

  useEffect(() => {
    if (unit) {
      fetchQuestions(unit)
        .then((data) => {
          const unitQuestions = data.filter((q) => q.unit === unit);
          setQuestions(unitQuestions);
          setCurrent(0);
          setScore(0);
          setQuizFinished(false);
          setUserAnswers(Array(unitQuestions.length).fill(null));
        })
        .catch((err) => console.error("Error fetching questions:", err));
    }
  }, [unit]);

  const handleNext = (isCorrect, selectedAnswer) => {
    const currentQ = questions[current];
    const updatedAnswers = [...userAnswers];

    updatedAnswers[current] = {
      question: currentQ.question,
      selectedAnswer,
      correctAnswer: currentQ.answer,
      isCorrect,
    };

    setUserAnswers(updatedAnswers);

    const updatedScore = updatedAnswers.filter((a) => a?.isCorrect).length;
    setScore(updatedScore);

    if (current < questions.length - 1) {
      setCurrent((prev) => prev + 1);
    } else {
      setQuizFinished(true);

      postResult({
        user: email || "Anonymous",
        email,
        unit,
        score: updatedScore,
        total: questions.length,
        date: new Date().toISOString(),
      });
    }
  };

  const handlePrevious = () => {
    setCurrent((prev) => Math.max(prev - 1, 0));
  };

  if (!unit) {
    return <p>No unit selected. Please go back and choose one.</p>;
  }

  if (!questions || questions.length === 0) {
    return <p style={{ textAlign: "center", marginTop: "50px" }}>Loading questions...</p>;
  }

  return (
    <div>
      {!quizFinished ? (
        <QuestionCard
          question={questions[current]}
          onNext={handleNext}
          onPrevious={handlePrevious}
          selectedAnswer={userAnswers[current]?.selectedAnswer || null}
          isLast={current === questions.length - 1}
          currentIndex={current + 1}
          totalQuestions={questions.length}
        />
      ) : (
        <ScoreBoard
          score={score}
          total={questions.length}
          unit={unit}
          userAnswers={userAnswers.filter(Boolean)}
          onRetry={() => {
            setQuizFinished(false);
            setCurrent(0);
            setScore(0);
            setUserAnswers(Array(questions.length).fill(null));
          }}
          onQuit={onQuit}
        />
      )}
    </div>
  );
};

export default Quiz;
