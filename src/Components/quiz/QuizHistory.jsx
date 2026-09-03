import { useEffect, useState } from "react";

function QuizHistory({ loggedUser = "", email = "" }) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    loadHistory();
  }, [loggedUser, email]);

  const loadHistory = () => {
    const savedHistory = JSON.parse(
      localStorage.getItem("techverseQuizHistory") || "[]"
    );

    const userHistory = savedHistory.filter((attempt) => {
      const sameName =
        loggedUser &&
        attempt.studentName?.toLowerCase() === loggedUser.toLowerCase();

      const sameEmail =
        email &&
        attempt.email?.toLowerCase() === email.toLowerCase();

      return sameName || sameEmail;
    });

    setHistory(
      userHistory.sort(
        (a, b) =>
          new Date(b.completedAt || b.date || 0) -
          new Date(a.completedAt || a.date || 0)
      )
    );
  };

  const getStatusClass = (passed) => {
    return passed ? "history-passed" : "history-failed";
  };

  const getStatusText = (passed) => {
    return passed ? "PASS" : "FAIL";
  };

  const getRecognition = (percentage, passed) => {
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

  const formatDateTime = (attempt) => {
    const dateValue =
      attempt.completedAt ||
      attempt.date ||
      attempt.attemptDate ||
      attempt.createdAt;

    if (!dateValue) {
      return "Date not available";
    }

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
      return String(dateValue);
    }

    return date.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const getPercentage = (attempt) => {
    if (typeof attempt.percentage === "number") {
      return attempt.percentage;
    }

    if (
      typeof attempt.score === "number" &&
      typeof attempt.total === "number" &&
      attempt.total > 0
    ) {
      return Math.round((attempt.score / attempt.total) * 100);
    }

    return 0;
  };

  return (
    <section className="quiz-history-section" id="quiz-history">
      <div className="quiz-history-container">
        <div className="quiz-history-header">
          <span className="section-badge">Assessment History</span>

          <h2>Your Quiz Attempts</h2>

          <p>
            Review your previous TechVerse assessment attempts,
            scores, grades, and results.
          </p>
        </div>

        {history.length === 0 ? (
          <div className="quiz-history-empty">
            <div className="empty-history-icon">📝</div>

            <h3>No Assessment History Yet</h3>

            <p>
              Complete a TechVerse assessment to see your attempts
              here.
            </p>
          </div>
        ) : (
          <div className="quiz-history-table-wrapper">
            <table className="quiz-history-table">
              <thead>
                <tr>
                  <th>Attempt</th>
                  <th>Student</th>
                  <th>Course</th>
                  <th>Date & Time</th>
                  <th>Score</th>
                  <th>Percentage</th>
                  <th>Grade</th>
                  <th>Recognition</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {history.map((attempt, index) => {
                  const percentage = getPercentage(attempt);

                  const passed =
                    typeof attempt.passed === "boolean"
                      ? attempt.passed
                      : percentage >= 60;

                  const recognition = getRecognition(
                    percentage,
                    passed
                  );

                  return (
                    <tr
                      key={
                        attempt.id ||
                        attempt.attemptId ||
                        `${attempt.completedAt}-${index}`
                      }
                    >
                      <td>
                        <strong>
                          #
                          {attempt.attemptNumber ||
                            history.length - index}
                        </strong>
                      </td>

                      <td>
                        {attempt.studentName ||
                          loggedUser ||
                          "Student"}
                      </td>

                      <td>
                        {attempt.course ||
                          "React & Web Development"}
                      </td>

                      <td>{formatDateTime(attempt)}</td>

                      <td>
                        {attempt.score ?? 0}
                        {attempt.total
                          ? ` / ${attempt.total}`
                          : ""}
                      </td>

                      <td>
                        <strong>{percentage}%</strong>
                      </td>

                      <td>
                        <span className="history-grade">
                          {attempt.grade || "C"}
                        </span>
                      </td>

                      <td>{recognition}</td>

                      <td>
                        <span
                          className={`history-status ${getStatusClass(
                            passed
                          )}`}
                        >
                          {getStatusText(passed)}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {history.length > 0 && (
          <div className="quiz-history-summary">
            <div className="history-summary-card">
              <span>Total Attempts</span>
              <strong>{history.length}</strong>
            </div>

            <div className="history-summary-card">
              <span>Passed</span>
              <strong>
                {
                  history.filter((attempt) => {
                    const percentage = getPercentage(attempt);

                    return typeof attempt.passed === "boolean"
                      ? attempt.passed
                      : percentage >= 60;
                  }).length
                }
              </strong>
            </div>

            <div className="history-summary-card">
              <span>Best Percentage</span>
              <strong>
                {Math.max(
                  ...history.map((attempt) =>
                    getPercentage(attempt)
                  )
                )}
                %
              </strong>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default QuizHistory;
