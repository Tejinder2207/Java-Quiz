import React, { useState, useEffect } from "react";

const Timer = ({ seconds = 60, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(seconds);

  // 🔄 Reset timer when seconds prop changes (optional)
  useEffect(() => {
    setTimeLeft(seconds);
  }, [seconds]);

  // ⏱️ Countdown effect
  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp?.(); // only call if provided
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft, onTimeUp]);

  // 🧮 Format time as mm:ss
  const minutes = Math.floor(timeLeft / 60);
  const secondsDisplay = (timeLeft % 60).toString().padStart(2, "0");

  return (
    <div style={styles.container}>
      <span style={styles.icon}>⏱️</span>
      <span style={styles.text}>
        {minutes}:{secondsDisplay}
      </span>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ff4757",
    color: "#fff",
    padding: "8px 16px",
    borderRadius: "20px",
    fontWeight: "600",
    fontSize: "16px",
    width: "80px",
    textAlign: "center",
    boxShadow: "0 3px 6px rgba(0,0,0,0.1)",
  },
  icon: {
    marginRight: "6px",
    fontSize: "18px",
  },
  text: {
    fontVariantNumeric: "tabular-nums",
  },
};

export default Timer;
