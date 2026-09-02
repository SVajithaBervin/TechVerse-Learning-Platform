import { useEffect, useState } from "react";

function LearningDashboard({
  setSelectedCourse,
  selectedCourse,
}) {
  const [registeredCourses, setRegisteredCourses] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadCourses = () => {
      const savedCourses = localStorage.getItem("registeredCourses");

      if (!savedCourses) {
        setRegisteredCourses([]);
        return;
      }

      try {
        const parsedCourses = JSON.parse(savedCourses);

        if (Array.isArray(parsedCourses)) {
          setRegisteredCourses(parsedCourses);
        }
      } catch (error) {
        console.error(
          "Unable to load learning dashboard data:",
          error
        );

        setRegisteredCourses([]);
      }
    };

    loadCourses();

    window.addEventListener(
      "storage",
      loadCourses
    );

    return () => {
      window.removeEventListener(
        "storage",
        loadCourses
      );
    };
  }, []);

  const getProgress = (course) => {
    if (typeof course.progress === "number") {
      return Math.min(Math.max(course.progress, 0), 100);
    }

    return 0;
  };

  const getStage = (course) => {
    const progress = getProgress(course);

    if (progress >= 100) {
      return "Completed";
    }

    if (course.quizCompleted) {
      return "Assessment Completed";
    }

    if (course.notesCompleted) {
      return "Assessment Pending";
    }

    if (course.videoCompleted) {
      return "Notes Pending";
    }

    return "Video Learning";
  };

  const getStageNumber = (course) => {
    const progress = getProgress(course);

    if (progress >= 100) {
      return 5;
    }

    if (course.quizCompleted) {
      return 4;
    }

    if (course.notesCompleted) {
      return 3;
    }

    if (course.videoCompleted) {
      return 2;
    }

    return 1;
  };

  const handleContinueLearning = (course) => {
    setSelectedCourse(course.course);

    setMessage(
      `▶ Continuing ${course.course}. Your current stage is "${getStage(
        course
      )}".`
    );

    setTimeout(() => {
      document
        .getElementById("video-lessons")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }, 100);
  };

  const handleDashboardLogin = () => {
    const loggedUser = localStorage.getItem("loggedUser");

    if (!loggedUser) {
      alert("Please login to view your learning dashboard.");
      return;
    }

    document
      .getElementById("dashboard")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  };

  return (
    <section
      className="learning-dashboard"
      id="learning-dashboard"
    >
      <div className="learning-dashboard-header">
        <div>
          <span className="course-category">
            LEARNING CENTER
          </span>

          <h2>🎓 Learning Dashboard</h2>

          <p>
            Track your courses, learning stages, progress and
            assessment status from one place.
          </p>
        </div>

        <div className="dashboard-status">
          <span>📚</span>
          <strong>
            {registeredCourses.length}
          </strong>
          <small>Enrolled Courses</small>
        </div>
      </div>

      {message && (
        <div className="learning-dashboard-message">
          {message}
        </div>
      )}

      {registeredCourses.length === 0 ? (
        <div className="learning-empty-state">
          <div className="empty-icon">📭</div>

          <h3>No Learning Data Available</h3>

          <p>
            Please enroll in a course to start tracking
            your learning progress.
          </p>

          <button
            className="continue-btn"
            onClick={() => {
              document
                .getElementById("courses")
                ?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
            }}
          >
            🔎 Explore Courses
          </button>

          <button
            className="continue-btn secondary-btn"
            onClick={handleDashboardLogin}
          >
            🔐 Login
          </button>
        </div>
      ) : (
        <>
          <div className="learning-overview">
            <div className="overview-card">
              <span>📚</span>
              <div>
                <strong>{registeredCourses.length}</strong>
                <small>Enrolled</small>
              </div>
            </div>

            <div className="overview-card">
              <span>▶️</span>
              <div>
                <strong>
                  {
                    registeredCourses.filter(
                      (course) =>
                        getProgress(course) > 0
                    ).length
                  }
                </strong>
                <small>Started</small>
              </div>
            </div>

            <div className="overview-card">
              <span>🏆</span>
              <div>
                <strong>
                  {
                    registeredCourses.filter(
                      (course) =>
                        getProgress(course) >= 100
                    ).length
                  }
                </strong>
                <small>Completed</small>
              </div>
            </div>

            <div className="overview-card">
              <span>📈</span>
              <div>
                <strong>
                  {registeredCourses.length > 0
                    ? Math.round(
                        registeredCourses.reduce(
                          (total, course) =>
                            total +
                            getProgress(course),
                          0
                        ) /
                          registeredCourses.length
                      )
                    : 0}
                  %
                </strong>
                <small>Average Progress</small>
              </div>
            </div>
          </div>

          <div className="learning-course-list">
            {registeredCourses.map((course) => {
              const progress = getProgress(course);
              const stage = getStage(course);
              const stageNumber =
                getStageNumber(course);

              return (
                <article
                  className="learning-course-card"
                  key={course.id}
                >
                  <div className="learning-course-header">
                    <div>
                      <span className="course-category">
                        ENROLLED COURSE
                      </span>

                      <h3>{course.course}</h3>

                      <p>
                        <strong>Student:</strong>{" "}
                        {course.name ||
                          "Student"}
                      </p>
                    </div>

                    <span
                      className={
                        progress >= 100
                          ? "learning-status completed"
                          : "learning-status active"
                      }
                    >
                      {progress >= 100
                        ? "✓ Completed"
                        : "● Active"}
                    </span>
                  </div>

                  <div className="learning-progress-section">
                    <div className="progress-heading">
                      <span>
                        Learning Progress
                      </span>

                      <strong>
                        {progress}%
                      </strong>
                    </div>

                    <div className="learning-progress-bar">
                      <div
                        className="learning-progress-fill"
                        style={{
                          width: `${progress}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  <div className="current-stage">
                    <div>
                      <small>
                        CURRENT LEARNING STAGE
                      </small>

                      <h4>{stage}</h4>
                    </div>

                    <div className="stage-count">
                      Stage {stageNumber} / 5
                    </div>
                  </div>

                  <div className="learning-stage-tracker">
                    <div
                      className={
                        course.videoCompleted
                          ? "stage-item completed"
                          : "stage-item current"
                      }
                    >
                      <span>
                        {course.videoCompleted
                          ? "✓"
                          : "1"}
                      </span>

                      <div>
                        <strong>
                          Video
                        </strong>

                        <small>
                          {course.videoCompleted
                            ? "Completed"
                            : "Pending"}
                        </small>
                      </div>
                    </div>

                    <div className="stage-line"></div>

                    <div
                      className={
                        course.notesCompleted
                          ? "stage-item completed"
                          : course.videoCompleted
                          ? "stage-item current"
                          : "stage-item locked"
                      }
                    >
                      <span>
                        {course.notesCompleted
                          ? "✓"
                          : "2"}
                      </span>

                      <div>
                        <strong>
                          Notes
                        </strong>

                        <small>
                          {course.notesCompleted
                            ? "Completed"
                            : course.videoCompleted
                            ? "Available"
                            : "Locked"}
                        </small>
                      </div>
                    </div>

                    <div className="stage-line"></div>

                    <div
                      className={
                        course.quizCompleted
                          ? "stage-item completed"
                          : course.notesCompleted
                          ? "stage-item current"
                          : "stage-item locked"
                      }
                    >
                      <span>
                        {course.quizCompleted
                          ? "✓"
                          : "3"}
                      </span>

                      <div>
                        <strong>
                          Assessment
                        </strong>

                        <small>
                          {course.quizCompleted
                            ? "Completed"
                            : course.notesCompleted
                            ? "Available"
                            : "Locked"}
                        </small>
                      </div>
                    </div>

                    <div className="stage-line"></div>

                    <div
                      className={
                        progress >= 100
                          ? "stage-item completed"
                          : "stage-item locked"
                      }
                    >
                      <span>
                        {progress >= 100
                          ? "✓"
                          : "4"}
                      </span>

                      <div>
                        <strong>
                          Result
                        </strong>

                        <small>
                          {progress >= 100
                            ? "Completed"
                            : "Pending"}
                        </small>
                      </div>
                    </div>

                    <div className="stage-line"></div>

                    <div
                      className={
                        progress >= 100
                          ? "stage-item completed"
                          : "stage-item locked"
                      }
                    >
                      <span>
                        {progress >= 100
                          ? "✓"
                          : "5"}
                      </span>

                      <div>
                        <strong>
                          Certificate
                        </strong>

                        <small>
                          {progress >= 100
                            ? "Eligible"
                            : "Locked"}
                        </small>
                      </div>
                    </div>
                  </div>

                  <div className="learning-course-footer">
                    <div className="course-information">
                      <span>
                        📧{" "}
                        {course.email ||
                          "Email not available"}
                      </span>

                      <span>
                        🗓️{" "}
                        {course.registeredAt ||
                          "Registration date unavailable"}
                      </span>
                    </div>

                    <button
                      className="continue-btn"
                      onClick={() =>
                        handleContinueLearning(
                          course
                        )
                      }
                    >
                      {progress >= 100
                        ? "🏆 View Course"
                        : "▶ Continue Learning"}
                    </button>
                  </div>

                  {progress === 0 && (
                    <div className="learning-reminder">
                      <span>💡</span>

                      <p>
                        You have not started this course
                        yet. Start with the video lessons
                        to begin your learning journey.
                      </p>
                    </div>
                  )}

                  {progress > 0 &&
                    progress < 100 && (
                      <div className="learning-reminder">
                        <span>📖</span>

                        <p>
                          Continue from{" "}
                          <strong>{stage}</strong>{" "}
                          to keep progressing through the
                          course.
                        </p>
                      </div>
                    )}

                  {progress >= 100 && (
                    <div className="learning-reminder completed-reminder">
                      <span>🎉</span>

                      <p>
                        Congratulations! You have
                        completed this course and reached
                        the final learning stage.
                      </p>
                    </div>
                  )}
                </article>
              );
            })}
          </div>

          <div className="learning-dashboard-note">
            <h3>🔐 Structured Learning</h3>

            <p>
              TechVerse uses a stage-based learning
              experience. Complete each required stage
              before moving to the next one.
            </p>

            <div className="dashboard-flow">
              <span>🎥 Video</span>
              <strong>→</strong>
              <span>📖 Notes</span>
              <strong>→</strong>
              <span>📝 Assessment</span>
              <strong>→</strong>
              <span>📊 Result</span>
              <strong>→</strong>
              <span>🏆 Certificate</span>
            </div>
          </div>
        </>
      )}
    </section>
  );
}

export default LearningDashboard;
