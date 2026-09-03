import { useEffect, useMemo, useState } from "react";

const QUESTIONS = [
  {
    id: 1,
    question: "What does JSX stand for in React?",
    options: [
      "JavaScript XML",
      "Java Syntax Extension",
      "JSON XML",
      "JavaScript Extension",
    ],
    answer: "JavaScript XML",
  },
  {
    id: 2,
    question: "Which hook is commonly used to manage state in a React component?",
    options: [
      "useState",
      "useRoute",
      "useData",
      "useComponent",
    ],
    answer: "useState",
  },
  {
    id: 3,
    question: "Which hook is used to perform side effects in React?",
    options: [
      "useEffect",
      "useAction",
      "useStyle",
      "useEvent",
    ],
    answer: "useEffect",
  },
  {
    id: 4,
    question: "What is a React component?",
    options: [
      "A reusable UI building block",
      "A database table",
      "A CSS file",
      "A browser extension",
    ],
    answer: "A reusable UI building block",
  },
  {
    id: 5,
    question: "Which syntax is used to pass data from a parent component to a child component?",
    options: [
      "Props",
      "State",
      "Hooks",
      "Routes",
    ],
    answer: "Props",
  },
  {
    id: 6,
    question: "Which command is commonly used to create a new React application with Vite?",
    options: [
      "npm create vite@latest",
      "npm install react-new",
      "react create app",
      "vite start react",
    ],
    answer: "npm create vite@latest",
  },
  {
    id: 7,
    question: "Which file commonly contains the main React application component in this TechVerse project?",
    options: [
      "App.jsx",
      "index.html",
      "package.json",
      "README.md",
    ],
    answer: "App.jsx",
  },
  {
    id: 8,
    question: "Which technology is primarily used to style the TechVerse interface?",
    options: [
      "CSS",
      "SQL",
      "Python",
      "MongoDB",
    ],
    answer: "CSS",
  },
  {
    id: 9,
    question: "Which browser API is used in TechVerse to store data on the user's device?",
    options: [
      "localStorage",
      "sessionServer",
      "browserSQL",
      "deviceDB",
    ],
    answer: "localStorage",
  },
  {
    id: 10,
    question: "What should a student complete before attempting a locked assessment in TechVerse?",
    options: [
      "Required video lessons and notes",
      "Only the home page",
      "Only the contact form",
      "Only the profile section",
    ],
    answer: "Required video lessons and notes",
  },
];

const TIME_PER_QUESTION = 25;
const PASS_PERCENTAGE = 60;

function ProfessionalQuiz({ setScore }) {
  const [selectedCourse, setSelectedCourse] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [result, setResult] = useState(null);
  const [attemptNumber, setAttemptNumber] = useState(1);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const savedHistory =
      localStorage.getItem("techverseQuizHistory");

    if (savedHistory) {
      try {
        const parsedHistory = JSON.parse(savedHistory);

        if (Array.isArray(parsedHistory)) {
          setHistory(parsedHistory);
        }
      } catch (error) {
        console.error(
          "Unable to load quiz history:",
          error
        );
      }
    }
  }, []);

  useEffect(() => {
    if (!quizStarted || quizSubmitted) {
      return undefined;
    }

    if (timeLeft <= 0) {
      handleNextQuestion();
      return undefined;
    }

    const timer = setInterval(() => {
      setTimeLeft((previousTime) => previousTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [
    quizStarted,
    quizSubmitted,
    timeLeft,
    currentQuestion,
  ]);

  const current = QUESTIONS[currentQuestion];

  const answeredCount = Object.keys(answers).length;

  const progressPercentage = Math.round(
    ((currentQuestion + 1) / QUESTIONS.length) * 100
  );

  const grade = useMemo(() => {
    if (!result) return "";

    if (result.percentage >= 90) return "A";
    if (result.percentage >= 75) return "B";

    return "C";
  }, [result]);

  const recognition = useMemo(() => {
    if (!result || !result.passed) {
      return "Not Eligible";
    }

    if (result.percentage >= 90) return "Gold";
    if (result.percentage >= 75) return "Silver";

    return "Bronze";
  }, [result]);

  const resetTimer = () => {
    setTimeLeft(TIME_PER_QUESTION);
  };

  const handleStartQuiz = () => {
    if (!selectedCourse.trim()) {
      alert("⚠️ Please enter or select a course before starting the assessment.");
      return;
    }

    setCurrentQuestion(0);
    setAnswers({});
    setResult(null);
    setQuizSubmitted(false);
    setQuizStarted(true);
    setAttemptNumber(history.length + 1);
    resetTimer();
  };

  const handleAnswerChange = (answer) => {
    if (quizSubmitted) return;

    setAnswers((previousAnswers) => ({
      ...previousAnswers,
      [current.id]: answer,
    }));
  };

  const calculateResult = () => {
    let correctAnswers = 0;

    QUESTIONS.forEach((question) => {
      if (answers[question.id] === question.answer) {
        correctAnswers += 1;
      }
    });

    const percentage = Math.round(
      (correctAnswers / QUESTIONS.length) * 100
    );

    return {
      correctAnswers,
      totalQuestions: QUESTIONS.length,
      percentage,
      passed: percentage >= PASS_PERCENTAGE,
    };
  };

  const saveQuizHistory = (quizResult) => {
    const loggedUser =
      localStorage.getItem("loggedUser") || "Student";

    const email =
      localStorage.getItem("email") || "";

    const now = new Date();

    const historyItem = {
      id: Date.now(),
      attempt: attemptNumber,
      student: loggedUser,
      email,
      course: selectedCourse,
      score: `${quizResult.correctAnswers}/${quizResult.totalQuestions}`,
      percentage: quizResult.percentage,
      grade:
        quizResult.percentage >= 90
          ? "A"
          : quizResult.percentage >= 75
          ? "B"
          : "C",
      status: quizResult.passed ? "Pass" : "Fail",
      recognition: quizResult.passed
        ? quizResult.percentage >= 90
          ? "Gold"
          : quizResult.percentage >= 75
          ? "Silver"
          : "Bronze"
        : "Not Eligible",
      date: now.toLocaleDateString(),
      time: now.toLocaleTimeString(),
    };

    const updatedHistory = [
      ...history,
      historyItem,
    ];

    setHistory(updatedHistory);

    localStorage.setItem(
      "techverseQuizHistory",
      JSON.stringify(updatedHistory)
    );

    return historyItem;
  };

  const updateRegisteredCourse = (quizResult) => {
    const savedCourses =
      localStorage.getItem("registeredCourses");

    if (!savedCourses) return;

    try {
      const courses = JSON.parse(savedCourses);

      if (!Array.isArray(courses)) return;

      const updatedCourses = courses.map((course) => {
        const sameCourse =
          course.course?.toLowerCase() ===
          selectedCourse.trim().toLowerCase();

        if (!sameCourse) {
          return course;
        }

        const newProgress = quizResult.passed
          ? 100
          : Math.max(
              typeof course.progress === "number"
                ? course.progress
                : 0,
              67
            );

        return {
          ...course,
          quizCompleted: true,
          quizScore: quizResult.correctAnswers,
          quizPercentage: quizResult.percentage,
          grade:
            quizResult.percentage >= 90
              ? "A"
              : quizResult.percentage >= 75
              ? "B"
              : "C",
          quizStatus: quizResult.passed
            ? "Passed"
            : "Failed",
          progress: newProgress,
          lastAssessmentDate:
            new Date().toLocaleString(),
        };
      });

      localStorage.setItem(
        "registeredCourses",
        JSON.stringify(updatedCourses)
      );

      window.dispatchEvent(new Event("storage"));
    } catch (error) {
      console.error(
        "Unable to update registered course:",
        error
      );
    }
  };

  const handleSubmitQuiz = () => {
    const quizResult = calculateResult();

    setResult(quizResult);
    setQuizSubmitted(true);

    if (setScore) {
      setScore(quizResult.correctAnswers);
    }

    saveQuizHistory(quizResult);
    updateRegisteredCourse(quizResult);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(
        (previousQuestion) => previousQuestion + 1
      );

      resetTimer();
      return;
    }

    handleSubmitQuiz();
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(
        (previousQuestion) => previousQuestion - 1
      );

      resetTimer();
    }
  };

  const handleTryAgain = () => {
    setQuizStarted(false);
    setQuizSubmitted(false);
    setResult(null);
    setCurrentQuestion(0);
    setAnswers({});
    resetTimer();
    setAttemptNumber(history.length + 1);
  };

  const handleReviewAnswers = () => {
    setCurrentQuestion(0);
  };

  const renderStartScreen = () => {
    return (
      <div className="professional-quiz-start">
        <div className="quiz-start-icon">📝</div>

        <span className="course-category">
          PROFESSIONAL ASSESSMENT
        </span>

        <h3>TechVerse Final Assessment</h3>

        <p>
          Test your understanding through a structured
          multiple-choice assessment.
        </p>

        <div className="quiz-instructions">
          <div>
            <span>📋</span>
            <strong>Questions</strong>
            <small>10 MCQs</small>
          </div>

          <div>
            <span>⏱️</span>
            <strong>Time</strong>
            <small>25 sec / question</small>
          </div>

          <div>
            <span>🎯</span>
            <strong>Pass Mark</strong>
            <small>60%</small>
          </div>

          <div>
            <span>🏆</span>
            <strong>Certificate</strong>
            <small>On successful completion</small>
          </div>
        </div>

        <div className="quiz-course-input">
          <label htmlFor="quiz-course">
            Course Name
          </label>

          <input
            id="quiz-course"
            type="text"
            value={selectedCourse}
            onChange={(event) =>
              setSelectedCourse(event.target.value)
            }
            placeholder="Example: React.js"
          />
        </div>

        <div className="quiz-rules">
          <h4>📌 Assessment Rules</h4>

          <ul>
            <li>
              Each question has one correct answer.
            </li>

            <li>
              You have 25 seconds for each question.
            </li>

            <li>
              If the timer reaches zero, the question is
              automatically skipped.
            </li>

            <li>
              You can use Previous and Next before
              submitting.
            </li>

            <li>
              Answers cannot be changed after submission.
            </li>

            <li>
              A minimum score of 60% is required to pass.
            </li>
          </ul>
        </div>

        <button
          className="continue-btn"
          onClick={handleStartQuiz}
        >
          🚀 Start Assessment
        </button>
      </div>
    );
  };

  const renderQuiz = () => {
    const selectedAnswer = answers[current.id];

    return (
      <div className="professional-quiz-container">
        <div className="quiz-top-bar">
          <div>
            <span className="course-category">
              {selectedCourse}
            </span>

            <h3>Final Assessment</h3>
          </div>

          <div
            className={
              timeLeft <= 5
                ? "quiz-timer danger"
                : "quiz-timer"
            }
          >
            ⏱️ {timeLeft}s
          </div>
        </div>

        <div className="quiz-progress-header">
          <span>
            Question {currentQuestion + 1} of{" "}
            {QUESTIONS.length}
          </span>

          <strong>
            {progressPercentage}%
          </strong>
        </div>

        <div className="quiz-progress-bar">
          <div
            style={{
              width: `${progressPercentage}%`,
            }}
          ></div>
        </div>

        <div className="quiz-answer-progress">
          <span>
            Answered: {answeredCount}/{QUESTIONS.length}
          </span>

          <span>
            Attempt: {attemptNumber}
          </span>
        </div>

        <div className="professional-question-card">
          <div className="question-number">
            Q{current.id}
          </div>

          <h3>{current.question}</h3>

          <div className="professional-options">
            {current.options.map((option, index) => (
              <label
                className={
                  selectedAnswer === option
                    ? "professional-option selected"
                    : "professional-option"
                }
                key={option}
              >
                <input
                  type="radio"
                  name={`question-${current.id}`}
                  value={option}
                  checked={
                    selectedAnswer === option
                  }
                  onChange={() =>
                    handleAnswerChange(option)
                  }
                />

                <span className="option-letter">
                  {String.fromCharCode(65 + index)}
                </span>

                <span>{option}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="quiz-navigation">
          <button
            className="quiz-nav-btn"
            onClick={handlePreviousQuestion}
            disabled={currentQuestion === 0}
          >
            ← Previous
          </button>

          {currentQuestion ===
          QUESTIONS.length - 1 ? (
            <button
              className="quiz-submit-btn"
              onClick={handleSubmitQuiz}
            >
              ✓ Submit Assessment
            </button>
          ) : (
            <button
              className="continue-btn"
              onClick={handleNextQuestion}
            >
              Next →
            </button>
          )}
        </div>

        <div className="quiz-time-note">
          💡 Unanswered questions receive 0 marks when the
          assessment is submitted.
        </div>
      </div>
    );
  };

  const renderResult = () => {
    if (!result) return null;

    return (
      <div className="professional-quiz-result">
        <div
          className={
            result.passed
              ? "result-icon success"
              : "result-icon failed"
          }
        >
          {result.passed ? "🏆" : "📊"}
        </div>

        <span className="course-category">
          ASSESSMENT RESULT
        </span>

        <h3>
          {result.passed
            ? "Congratulations! Assessment Passed"
            : "Assessment Not Passed"}
        </h3>

        <p>
          {result.passed
            ? "You have successfully achieved the required score."
            : "You need at least 60% to pass. You can try the assessment again."}
        </p>

        <div className="result-score-card">
          <div>
            <strong>
              {result.correctAnswers}/
              {result.totalQuestions}
            </strong>

            <span>Correct Answers</span>
          </div>

          <div>
            <strong>
              {result.percentage}%
            </strong>

            <span>Percentage</span>
          </div>

          <div>
            <strong>{grade}</strong>

            <span>Grade</span>
          </div>

          <div>
            <strong>
              {recognition}
            </strong>

            <span>Recognition</span>
          </div>
        </div>

        <div
          className={
            result.passed
              ? "result-status pass"
              : "result-status fail"
          }
        >
          {result.passed
            ? "✓ PASS — Certificate Eligible"
            : "✕ FAIL — Certificate Not Eligible"}
        </div>

        {result.passed && (
          <div className="certificate-eligibility">
            <h4>🎓 Certificate Eligibility</h4>

            <p>
              You have met the TechVerse certificate
              eligibility requirement of <strong>60%</strong>.
              Your certificate can be generated after the
              course completion workflow is completed.
            </p>

            <div className="recognition-level">
              <span>Recognition Level:</span>
              <strong>{recognition}</strong>
            </div>
          </div>
        )}

        <div className="result-actions">
          <button
            className="continue-btn"
            onClick={handleReviewAnswers}
          >
            🔍 Review Questions
          </button>

          <button
            className="continue-btn"
            onClick={handleTryAgain}
          >
            🔄 Try Again
          </button>
        </div>

        <div className="assessment-history-preview">
          <h4>📋 Assessment History</h4>

          {history.length === 0 ? (
            <p>No assessment history available.</p>
          ) : (
            <div className="quiz-history-table">
              {history
                .slice()
                .reverse()
                .slice(0, 5)
                .map((item) => (
                  <div
                    className="quiz-history-row"
                    key={item.id}
                  >
                    <span>
                      Attempt {item.attempt}
                    </span>

                    <span>
                      {item.score}
                    </span>

                    <span>
                      {item.percentage}%
                    </span>

                    <span>
                      Grade {item.grade}
                    </span>

                    <strong
                      className={
                        item.status === "Pass"
                          ? "history-pass"
                          : "history-fail"
                      }
                    >
                      {item.status}
                    </strong>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <section
      className="professional-quiz"
      id="professional-quiz"
    >
      <div className="professional-quiz-header">
        <span className="course-category">
          ASSESSMENT CENTER
        </span>

        <h2>📝 Professional Assessment</h2>

        <p>
          Complete structured assessments, review your
          performance and track your attempts.
        </p>
      </div>

      {!quizStarted && !quizSubmitted
        ? renderStartScreen()
        : quizSubmitted
        ? renderResult()
        : renderQuiz()}
    </section>
  );
}

export default ProfessionalQuiz;
