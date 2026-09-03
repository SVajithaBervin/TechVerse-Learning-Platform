function QuizResult({
  score,
  total,
  percentage,
  grade,
  passed,
  onRestart,
}) {
  const getRecognition = () => {
    if (!passed) {
      return "Not Eligible";
    }

    if (percentage >= 80) {
      return "Gold";
    }

    if (percentage >= 70) {
      return "Silver";
    }

    return "Bronze";
  };

  const recognition = getRecognition();

  return (
    <div className="quiz-result-card">
      <div className={`result-icon ${passed ? "success" : "failed"}`}>
        {passed ? "✓" : "!"}
      </div>

      <span className="section-badge">
        Assessment Result
      </span>

      <h2>{passed ? "Assessment Passed" : "Assessment Not Passed"}</h2>

      <p className="result-message">
        {passed
          ? "Congratulations! You have successfully completed the assessment."
          : "You did not reach the required passing score. You can try the assessment again."}
      </p>

      <div className="result-score">
        <span>Your Score</span>

        <strong>
          {score} / {total}
        </strong>

        <small>{percentage}%</small>
      </div>

      <div className="result-details">
        <div className="result-detail">
          <span>Score</span>
          <strong>
            {score} / {total}
          </strong>
        </div>

        <div className="result-detail">
          <span>Percentage</span>
          <strong>{percentage}%</strong>
        </div>

        <div className="result-detail">
          <span>Grade</span>
          <strong>{grade}</strong>
        </div>

        <div className="result-detail">
          <span>Status</span>
          <strong className={passed ? "status-passed" : "status-failed"}>
            {passed ? "PASS" : "FAIL"}
          </strong>
        </div>

        <div className="result-detail">
          <span>Recognition</span>
          <strong>{recognition}</strong>
        </div>

        <div className="result-detail">
          <span>Certificate</span>
          <strong className={passed ? "status-passed" : "status-failed"}>
            {passed ? "Eligible" : "Not Eligible"}
          </strong>
        </div>
      </div>

      <div className="result-criteria">
        <h3>Assessment Criteria</h3>

        <p>
          A minimum score of <strong>60%</strong> is required to pass
          the TechVerse assessment and become eligible for a
          certificate.
        </p>

        <div className="grade-scale">
          <div>
            <strong>A</strong>
            <span>80% – 100%</span>
          </div>

          <div>
            <strong>B</strong>
            <span>60% – 79%</span>
          </div>

          <div>
            <strong>C</strong>
            <span>Below 60%</span>
          </div>
        </div>
      </div>

      {passed && (
        <div className="certificate-unlocked">
          <span>✓</span>

          <div>
            <strong>Certificate Eligibility Unlocked</strong>

            <p>
              Your assessment result meets the minimum requirement for
              certificate eligibility.
            </p>
          </div>
        </div>
      )}

      <button
        type="button"
        className="quiz-restart-btn"
        onClick={onRestart}
      >
        Try Again
      </button>
    </div>
  );
}

export default QuizResult;
