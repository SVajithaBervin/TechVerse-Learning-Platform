export default function QuestionCard({
  question,
  options,
  selectedAnswer,
  onAnswer
}) {
  if (!question) {
    return null;
  }

  return (
    <div className="question-card">

      <div className="question-card-header">
        <span className="question-label">
          Question
        </span>

        <span className="question-mark">
          1 Mark
        </span>
      </div>

      <h3 className="question-text">
        {question}
      </h3>

      <div className="question-options">

        {options.map((option, index) => {
          const isSelected =
            selectedAnswer === option;

          return (
            <label
              key={index}
              className={
                isSelected
                  ? "question-option selected"
                  : "question-option"
              }
            >

              <span className="option-number">
                {String.fromCharCode(65 + index)}
              </span>

              <input
                type="radio"
                name="quiz-answer"
                value={option}
                checked={isSelected}
                onChange={() =>
                  onAnswer(option)
                }
              />

              <span className="option-text">
                {option}
              </span>

              {isSelected && (
                <span className="option-check">
                  ✓
                </span>
              )}

            </label>
          );
        })}

      </div>

      {!selectedAnswer && (
        <p className="question-hint">
          💡 Select one answer to continue.
        </p>
      )}

      {selectedAnswer && (
        <p className="question-selected">
          ✅ Answer selected
        </p>
      )}

    </div>
  );
} 
