import { useEffect, useState } from "react";
import QuestionCard from "./QuestionCard";
import QuizProgress from "./QuizProgress";
import QuizTimer from "./QuizTimer";
import QuizResult from "./QuizResult";

const questions = [
  {
    id: 1,
    question: "Which command creates a new React project using Vite?",
    options: [
      "npm create vite@latest",
      "npm install react-project",
      "react create vite",
      "vite new react",
    ],
    answer: "npm create vite@latest",
  },
  {
    id: 2,
    question: "Which hook is commonly used to manage state in a React functional component?",
    options: ["useState", "useRoute", "useStyle", "usePage"],
    answer: "useState",
  },
  {
    id: 3,
    question: "Which hook is commonly used for side effects in React?",
    options: ["useEffect", "useAction", "useEvent", "useTask"],
    answer: "useEffect",
  },
  {
    id: 4,
    question: "Which file is commonly used as the entry point in a Vite React application?",
    options: ["src/main.jsx", "src/start.jsx", "src/index.html", "src/server.jsx"],
    answer: "src/main.jsx",
  },
  {
    id: 5,
    question: "Which technology is primarily used to style the visual appearance of a webpage?",
    options: ["CSS", "HTML", "SQL", "JSON"],
    answer: "CSS",
  },
  {
    id: 6,
    question: "Which HTML element is normally used to create a hyperlink?",
    options: ["<a>", "<link>", "<href>", "<url>"],
    answer: "<a>",
  },
  {
    id: 7,
    question: "Which JavaScript method creates a new array containing elements that satisfy a condition?",
    options: ["filter()", "push()", "join()", "sort()"],
    answer: "filter()",
  },
  {
    id: 8,
    question: "Which browser storage mechanism can persist data across page reloads on the same origin?",
    options: ["localStorage", "console.log()", "setTimeout()", "document.write()"],
    answer: "localStorage",
  },
  {
    id: 9,
    question: "What does JSX allow developers to write inside JavaScript?",
    options: [
      "HTML-like UI syntax",
      "SQL database queries",
      "CSS-only rules",
      "Server configuration files",
    ],
    answer: "HTML-like UI syntax",
  },
  {
    id: 10,
    question: "Which command is commonly used to start a Vite development server?",
    options: ["npm run dev", "npm run start-vite", "vite launch", "npm dev-server"],
    answer: "npm run dev",
  },
];

const QUESTION_TIME = 25;

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME);
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState(null);

  const question = questions[currentQuestion];

  useEffect(() => {
    if (submitted) {
      return;
    }

    setTimeLeft(QUESTION_TIME);

    const timer = setInterval(() => {
      setTimeLeft((previousTime) => {
        if (previousTime <= 1) {
          clearInterval(timer);

          setCurrentQuestion((previousQuestion) => {
            if (previousQuestion < questions.length - 1) {
              return previousQuestion + 1;
            }

            setSubmitted(true);
            return previousQuestion;
          });

          return 0;
        }

        return previousTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestion, submitted]);

  const handleAnswer = (answer) => {
    if (submitted) {
      return;
    }

    setAnswers((previousAnswers) => ({
      ...previousAnswers,
      [question.id]: answer,
    }));
  };

  const calculateResult = () => {
    let correct = 0;

    questions.forEach((item) => {
      if (answers[item.id] === item.answer) {
        correct += 1;
      }
    });

    const percentage = Math.round((correct / questions.length) * 100);

    let grade = "C";

    if (percentage >= 80) {
      grade = "A";
    } else if (percentage >= 60) {
      grade = "B";
    }

    const passed = percentage >= 60;

    return {
      score: correct,
      total: questions.length,
      percentage,
      grade,
      passed,
    };
  };

  const handleSubmit = () => {
    const calculatedResult = calculateResult();

    setResult(calculatedResult);
    setSubmitted(true);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((previousQuestion) => previousQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((previousQuestion) => previousQuestion - 1);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setTimeLeft(QUESTION_TIME);
    setSubmitted(false);
    setResult(null);
  };

  if (submitted && result) {
    return (
      <section className="quiz-section" id="quiz">
        <div className="quiz-container">
          <QuizResult
            score={result.score}
            total={result.total}
            percentage={result.percentage}
            grade={result.grade}
            passed={result.passed}
            onRestart={handleRestart}
          />
        </div>
      </section>
    );
  }

  return (
    <section className="quiz-section" id="quiz">
      <div className="quiz-container">
        <div className="quiz-header">
          <span className="section-badge">TechVerse Assessment</span>

          <h2>Professional Quiz</h2>

          <p>
            Test your knowledge with a timed assessment. Select one
            answer for each question.
          </p>
        </div>

        <div className="quiz-info-bar">
          <div>
            <strong>React & Web Development</strong>
            <span>10 Questions</span>
          </div>

          <QuizTimer timeLeft={timeLeft} />
        </div>

        <QuizProgress
          currentQuestion={currentQuestion + 1}
          totalQuestions={questions.length}
        />

        <QuestionCard
          question={question}
          selectedAnswer={answers[question.id] || ""}
          onAnswer={handleAnswer}
        />

        <div className="quiz-navigation">
          <button
            type="button"
            className="quiz-secondary-btn"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
          >
            Previous
          </button>

          {currentQuestion < questions.length - 1 ? (
            <button
              type="button"
              className="quiz-primary-btn"
              onClick={handleNext}
            >
              Next
            </button>
          ) : (
            <button
              type="button"
              className="quiz-submit-btn"
              onClick={handleSubmit}
            >
              Submit Assessment
            </button>
          )}
        </div>

        <div className="quiz-footer-note">
          <span>⏱</span>
          <p>
            Each question has {QUESTION_TIME} seconds. If the timer
            reaches zero, the question will automatically move forward.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Quiz;
