function QuizProgress({ currentQuestion, totalQuestions }) {
  const progress =
    totalQuestions > 0
      ? Math.round((currentQuestion / totalQuestions) * 100)
      : 0;

  return (
    <div className="quiz-progress">
      <div className="quiz-progress-header">
        <span>Question {currentQuestion} of {totalQuestions}</span>
        <strong>{progress}%</strong>
      </div>

      <div className="quiz-progress-track">
        <div
          className="quiz-progress-fill"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}

export default QuizProgress;
