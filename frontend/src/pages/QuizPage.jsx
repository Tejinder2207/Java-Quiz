// src/pages/QuizPage.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Quiz from "./Quiz";

const QuizPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const unit = params.get("unit");

  // ✅ handle quit (go back to unit selection)
  const handleQuit = () => {
    navigate("/quiz-selection");
  };

  return <Quiz unit={unit} onQuit={handleQuit} />;
};

export default QuizPage;
