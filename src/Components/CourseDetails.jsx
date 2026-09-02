import { useState } from "react";

function CourseDetails() {
  const [showDetails, setShowDetails] = useState(false);

  const course = {
    title: "React.js",
    category: "Web Development",
    level: "Intermediate",
    duration: "6 Weeks",
    modules: 5,
    learningMode: "Self-paced / Online",
    description:
      "Learn the fundamentals of React.js and build modern, component-based web applications.",
    topics: [
      "JSX and Components",
      "Props and State",
      "Hooks",
      "Event Handling",
      "Building React Applications",
    ],
    resources: [
      "Video Lessons",
      "Learning Notes",
      "Quizzes & Assessments",
    ],
  };

  const handleViewDetails = () => {
    setShowDetails(true);
  };

  const handleClose = () => {
    setShowDetails(false);
  };

  return (
    <section className="course-details" id="course-details">
      <div className="course-details-header">
        <h2>📘 Course Details</h2>
        <p>
          Explore the learning structure, topics, resources and course
          information before you begin.
        </p>
      </div>

      <div className="course-details-card">
        <div className="course-details-top">
          <div>
            <span className="course-category">
              {course.category}
            </span>

            <h3>{course.title}</h3>

            <p className="course-description">
              {course.description}
            </p>
          </div>

          <div className="course-level">
            <span>Level</span>
            <strong>{course.level}</strong>
          </div>
        </div>

        <div className="course-meta">
          <div className="course-meta-item">
            <span>⏱️</span>
            <div>
              <small>Duration</small>
              <strong>{course.duration}</strong>
            </div>
          </div>

          <div className="course-meta-item">
            <span>📚</span>
            <div>
              <small>Modules</small>
              <strong>{course.modules} Topics</strong>
            </div>
          </div>

          <div className="course-meta-item">
            <span>💻</span>
            <div>
              <small>Learning Mode</small>
              <strong>{course.learningMode}</strong>
            </div>
          </div>
        </div>

        {!showDetails ? (
          <button
            className="continue-btn"
            onClick={handleViewDetails}
          >
            👁️ View Course Details
          </button>
        ) : (
          <div className="course-expanded-details">
            <div className="details-section">
              <h4>🎯 What You Will Learn</h4>

              <ul>
                {course.topics.map((topic, index) => (
                  <li key={index}>
                    <span>✓</span>
                    {topic}
                  </li>
                ))}
              </ul>
            </div>

            <div className="details-section">
              <h4>📦 Learning Resources</h4>

              <ul>
                {course.resources.map((resource, index) => (
                  <li key={index}>
                    <span>✓</span>
                    {resource}
                  </li>
                ))}
              </ul>
            </div>

            <div className="learning-flow">
              <h4>🛤️ Learning Path</h4>

              <div className="learning-flow-steps">
                <div className="learning-step">
                  <span>1</span>
                  <strong>Video</strong>
                  <small>Watch lessons</small>
                </div>

                <div className="flow-arrow">→</div>

                <div className="learning-step">
                  <span>2</span>
                  <strong>Notes</strong>
                  <small>Study materials</small>
                </div>

                <div className="flow-arrow">→</div>

                <div className="learning-step">
                  <span>3</span>
                  <strong>Quiz</strong>
                  <small>Test knowledge</small>
                </div>

                <div className="flow-arrow">→</div>

                <div className="learning-step">
                  <span>4</span>
                  <strong>Result</strong>
                  <small>View performance</small>
                </div>

                <div className="flow-arrow">→</div>

                <div className="learning-step">
                  <span>5</span>
                  <strong>Certificate</strong>
                  <small>Earn certificate</small>
                </div>
              </div>
            </div>

            <div className="course-note">
              <strong>🔐 Structured Learning</strong>
              <p>
                Complete the learning stages in order. Video lessons must
                be completed before accessing notes, and notes must be
                completed before attempting the assessment.
              </p>
            </div>

            <button
              className="continue-btn"
              onClick={handleClose}
            >
              ✕ Close Details
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default CourseDetails;
