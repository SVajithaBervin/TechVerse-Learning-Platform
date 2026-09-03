import { useEffect, useState } from "react";

function Dashboard({
  loggedUser,
  registeredCourses,
  progress,
  score,
}) {
  const [email, setEmail] = useState("");
  const [loginCount, setLoginCount] = useState(0);

  useEffect(() => {
    setEmail(localStorage.getItem("email") || "");

    const savedLoginCount =
      Number(localStorage.getItem("loginCount")) || 0;

    setLoginCount(savedLoginCount);
  }, [loggedUser]);

  const getCourseProgress = (course) => {
    if (typeof course.progress === "number") {
      return Math.min(Math.max(course.progress, 0), 100);
    }

    return 0;
  };

  const getLearningStage = (course) => {
    const courseProgress = getCourseProgress(course);

    if (courseProgress >= 100) {
      return "Completed";
    }

    if (course.quizCompleted) {
      return "Result & Performance";
    }

    if (course.notesCompleted) {
      return "Assessment";
    }

    if (course.videoCompleted) {
      return "Notes";
    }

    return "Video Learning";
  };

  const getStatus = (course) => {
    const courseProgress = getCourseProgress(course);

    if (courseProgress >= 100) {
      return "Completed";
    }

    return "Ongoing";
  };

  const completedCourses = registeredCourses.filter(
    (course) => getCourseProgress(course) >= 100
  ).length;

  const ongoingCourses = registeredCourses.filter(
    (course) => {
      const courseProgress = getCourseProgress(course);
      return courseProgress > 0 && courseProgress < 100;
    }
  ).length;

  const startedCourses = registeredCourses.filter(
    (course) => getCourseProgress(course) > 0
  ).length;

  const averageProgress =
    registeredCourses.length > 0
      ? Math.round(
          registeredCourses.reduce(
            (total, course) =>
              total + getCourseProgress(course),
            0
          ) / registeredCourses.length
        )
      : 0;

  const handleContinueLearning = (course) => {
    const courseName = course.course;

    alert(
      `▶ Continue Learning\n\nCourse: ${courseName}\nCurrent Stage: ${getLearningStage(
        course
      )}\nProgress: ${getCourseProgress(course)}%`
    );

    document
      .getElementById("learning-dashboard")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  };

  return (
    <section className="dashboard" id="dashboard">
      <div className="dashboard-header">
        <div>
          <span className="course-category">
            STUDENT DASHBOARD
          </span>

          <h2>🎓 Welcome to Your Dashboard</h2>

          <p>
            Monitor your learning journey, course progress,
            assessment performance and completion status.
          </p>
        </div>

        {loggedUser && (
          <div className="dashboard-user">
            <div className="dashboard-avatar">
              {loggedUser.charAt(0).toUpperCase()}
            </div>

            <div>
              <strong>{loggedUser}</strong>
              <span>{email || "Student"}</span>
            </div>
          </div>
        )}
      </div>

      {!loggedUser ? (
        <div className="dashboard-login-message">
          <div className="empty-icon">🔐</div>

          <h3>Please Login to Continue</h3>

          <p>
            Please login to view your learning dashboard,
            enrolled courses and academic progress.
          </p>
        </div>
      ) : (
        <>
          <div className="dashboard-welcome-card">
            <div>
              <small>WELCOME BACK</small>

              <h3>
                Hello, {loggedUser}! 👋
              </h3>

              <p>
                Keep learning and make progress toward your
                course completion goals.
              </p>
            </div>

            <div className="login-count">
              <span>🔑</span>
              <strong>{loginCount}</strong>
              <small>
                {loginCount === 1
                  ? "Login"
                  : "Logins"}
              </small>
            </div>
          </div>

          <div className="dashboard-statistics">
            <div className="dashboard-stat-card">
              <span>📚</span>

              <div>
                <strong>
                  {registeredCourses.length}
                </strong>

                <small>Enrolled Courses</small>
              </div>
            </div>

            <div className="dashboard-stat-card">
              <span>▶️</span>

              <div>
                <strong>{startedCourses}</strong>

                <small>Courses Started</small>
              </div>
            </div>

            <div className="dashboard-stat-card">
              <span>⏳</span>

              <div>
                <strong>{ongoingCourses}</strong>

                <small>Ongoing Courses</small>
              </div>
            </div>

            <div className="dashboard-stat-card">
              <span>🏆</span>

              <div>
                <strong>{completedCourses}</strong>

                <small>Completed Courses</small>
              </div>
            </div>
          </div>

          <div className="dashboard-progress-card">
            <div className="dashboard-section-title">
              <div>
                <span className="course-category">
                  OVERALL PROGRESS
                </span>

                <h3>📈 Learning Performance</h3>
              </div>

              <strong>{averageProgress}%</strong>
            </div>

            <div className="dashboard-progress-bar">
              <div
                className="dashboard-progress-fill"
                style={{
                  width: `${averageProgress}%`,
                }}
              ></div>
            </div>

            <p>
              Your average progress across all enrolled
              courses is <strong>{averageProgress}%</strong>.
            </p>
          </div>

          <div className="dashboard-courses">
            <div className="dashboard-section-heading">
              <h3>📘 My Course Progress</h3>

              <p>
                View your current learning stage and course
                performance.
              </p>
            </div>

            {registeredCourses.length === 0 ? (
              <div className="dashboard-empty-courses">
                <span>📭</span>

                <h3>No Courses Enrolled</h3>

                <p>
                  Enroll in a course to start your learning
                  journey.
                </p>

                <button
                  className="continue-btn"
                  onClick={() =>
                    document
                      .getElementById("courses")
                      ?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      })
                  }
                >
                  🔎 Explore Courses
                </button>
              </div>
            ) : (
              <div className="dashboard-course-list">
                {registeredCourses.map((course) => {
                  const courseProgress =
                    getCourseProgress(course);

                  return (
                    <div
                      className="dashboard-course-card"
                      key={course.id}
                    >
                      <div className="dashboard-course-top">
                        <div>
                          <span className="course-category">
                            {course.status || "Active"}
                          </span>

                          <h4>{course.course}</h4>
                        </div>

                        <span
                          className={
                            getStatus(course) ===
                            "Completed"
                              ? "dashboard-course-status completed"
                              : "dashboard-course-status"
                          }
                        >
                          {getStatus(course)}
                        </span>
                      </div>

                      <div className="dashboard-course-info">
                        <p>
                          <strong>Student:</strong>{" "}
                          {course.name || loggedUser}
                        </p>

                        <p>
                          <strong>Email:</strong>{" "}
                          {course.email || email}
                        </p>

                        <p>
                          <strong>Learning Stage:</strong>{" "}
                          {getLearningStage(course)}
                        </p>

                        <p>
                          <strong>Progress:</strong>{" "}
                          {courseProgress}%
                        </p>
                      </div>

                      <div className="dashboard-course-progress">
                        <div>
                          <span>Course Progress</span>

                          <strong>
                            {courseProgress}%
                          </strong>
                        </div>

                        <div className="dashboard-mini-bar">
                          <div
                            style={{
                              width: `${courseProgress}%`,
                            }}
                          ></div>
                        </div>
                      </div>

                      <div className="dashboard-stage-status">
                        <div
                          className={
                            course.videoCompleted
                              ? "stage-status completed"
                              : "stage-status"
                          }
                        >
                          <span>
                            {course.videoCompleted
                              ? "✓"
                              : "1"}
                          </span>

                          <small>Video</small>
                        </div>

                        <div
                          className={
                            course.notesCompleted
                              ? "stage-status completed"
                              : "stage-status"
                          }
                        >
                          <span>
                            {course.notesCompleted
                              ? "✓"
                              : "2"}
                          </span>

                          <small>Notes</small>
                        </div>

                        <div
                          className={
                            course.quizCompleted
                              ? "stage-status completed"
                              : "stage-status"
                          }
                        >
                          <span>
                            {course.quizCompleted
                              ? "✓"
                              : "3"}
                          </span>

                          <small>Assessment</small>
                        </div>

                        <div
                          className={
                            courseProgress >= 100
                              ? "stage-status completed"
                              : "stage-status"
                          }
                        >
                          <span>
                            {courseProgress >= 100
                              ? "✓"
                              : "4"}
                          </span>

                          <small>Result</small>
                        </div>

                        <div
                          className={
                            courseProgress >= 100
                              ? "stage-status completed"
                              : "stage-status"
                          }
                        >
                          <span>
                            {courseProgress >= 100
                              ? "✓"
                              : "5"}
                          </span>

                          <small>Certificate</small>
                        </div>
                      </div>

                      <div className="dashboard-course-footer">
                        <div>
                          {course.score !== undefined && (
                            <span>
                              📝 Score: {course.score}
                            </span>
                          )}

                          {course.grade && (
                            <span>
                              🎯 Grade: {course.grade}
                            </span>
                          )}
                        </div>

                        <button
                          className="continue-btn"
                          onClick={() =>
                            handleContinueLearning(
                              course
                            )
                          }
                        >
                          {courseProgress >= 100
                            ? "🏆 View Course"
                            : "▶ Continue Learning"}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="dashboard-performance">
            <div className="dashboard-section-heading">
              <h3>📊 Academic Summary</h3>

              <p>
                A quick overview of your TechVerse learning
                activity.
              </p>
            </div>

            <div className="performance-grid">
              <div className="performance-card">
                <span>📚</span>
                <strong>
                  {registeredCourses.length}
                </strong>
                <p>Total Enrollments</p>
              </div>

              <div className="performance-card">
                <span>▶️</span>
                <strong>{startedCourses}</strong>
                <p>Started Learning</p>
              </div>

              <div className="performance-card">
                <span>🏆</span>
                <strong>{completedCourses}</strong>
                <p>Completed Courses</p>
              </div>

              <div className="performance-card">
                <span>📈</span>
                <strong>{averageProgress}%</strong>
                <p>Average Progress</p>
              </div>

              <div className="performance-card">
                <span>⭐</span>
                <strong>
                  {score || 0}
                </strong>
                <p>Latest Score</p>
              </div>
            </div>
          </div>

          <div className="dashboard-learning-path">
            <h3>🛤️ Your Learning Path</h3>

            <div className="dashboard-path">
              <div className="path-step">
                <span>1</span>
                <strong>Enroll</strong>
                <small>Choose a course</small>
              </div>

              <div className="path-arrow">→</div>

              <div className="path-step">
                <span>2</span>
                <strong>Learn</strong>
                <small>Watch videos & study notes</small>
              </div>

              <div className="path-arrow">→</div>

              <div className="path-step">
                <span>3</span>
                <strong>Assess</strong>
                <small>Complete assessments</small>
              </div>

              <div className="path-arrow">→</div>

              <div className="path-step">
                <span>4</span>
                <strong>Achieve</strong>
                <small>Complete the course</small>
              </div>

              <div className="path-arrow">→</div>

              <div className="path-step">
                <span>5</span>
                <strong>Certificate</strong>
                <small>Earn your certificate</small>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
}

export default Dashboard;
