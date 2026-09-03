function QuizTimer({ timeLeft }) {
  const isCritical = timeLeft <= 5;
  const isWarning = timeLeft <= 10 && timeLeft > 5;

  return (
    <div
      className={`quiz-timer ${
        isCritical ? "timer-critical" : ""
      } ${isWarning ? "timer-warning" : ""}`}
      aria-live="polite"
    >
      <span className="timer-icon">⏱</span>

      <div className="timer-content">
        <span className="timer-label">Time Remaining</span>

        <strong>
          00:{String(Math.max(timeLeft, 0)).padStart(2, "0")}
        </strong>
      </div>
    </div>
  );
}

export default QuizTimer;
