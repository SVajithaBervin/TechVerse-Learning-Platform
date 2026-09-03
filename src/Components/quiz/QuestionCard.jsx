function QuestionCard({
  question,
  selectedAnswer,
  onAnswer,
}) {
  if (!question) {
    return null;
  }

  return (
    <div className="question-card">
      <div className="question-number">
        Question {question.id}
      </div>

      <h3 className="question-text">
        {question.question}
      </h3>

      <div className="question-options">
        {question.options.map((option, index) => {
          const optionLetter = String.fromCharCode(65 + index);
          const isSelected = selectedAnswer === option;

          return (
            <label
              key={option}
              className={`question-option ${
                isSelected ? "selected" : ""
              }`}
            >
              <input
                type="radio"
                name={`question-${question.id}`}
                value={option}
                checked={isSelected}
                onChange={() => onAnswer(option)}
              />

              <span className="option-letter">
                {optionLetter}
              </span>

              <span className="option-text">
                {option}
              </span>

              <span className="option-radio">
                <span></span>
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
}

export default QuestionCard;
