import { useEffect, useState } from "react";

function Profile({
  loggedUser,
  email,
  registeredCourses = [],
}) {
  const [loginCount, setLoginCount] = useState(0);

  useEffect(() => {
    const savedLoginCount =
      Number(localStorage.getItem("loginCount")) || 0;

    setLoginCount(savedLoginCount);
  }, [loggedUser]);

  const getProgress = (course) => {
    if (typeof course.progress === "number") {
      return Math.min(Math.max(course.progress, 0), 100);
    }

    return 0;
  };

  const enrolledCount = registeredCourses.length;

  const completedCount = registeredCourses.filter(
    (course) => getProgress(course) >= 100
  ).length;

  const ongoingCount = registeredCourses.filter(
    (course) => {
      const progress = getProgress(course);
      return progress > 0 && progress < 100;
    }
  ).length;

  const averageProgress =
    enrolledCount > 0
      ? Math.round(
          registeredCourses.reduce(
            (total, course) =>
              total + getProgress(course),
            0
          ) / enrolledCount
        )
      : 0;

  if (!loggedUser) {
    return (
      <section className="profile" id="profile">
        <div className="profile-login-card">
          <div className="profile-icon">👤</div>

          <h2>Student Profile</h2>

          <p>
            Please login to view your profile and learning
            information.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="profile" id="profile">
      <div className="profile-header">
        <div>
          <span className="course-category">
            STUDENT PROFILE
          </span>

          <h2>👤 My Profile</h2>

          <p>
            View your account information and learning
            summary in TechVerse.
          </p>
        </div>
      </div>

      <div className="profile-container">
        <div className="profile-main-card">
          <div className="profile-avatar">
            {loggedUser.charAt(0).toUpperCase()}
          </div>

          <div className="profile-user-info">
            <h3>{loggedUser}</h3>

            <p>
              📧 {email || "Email not available"}
            </p>

            <span className="profile-status">
              ● Active Student
            </span>
          </div>
        </div>

        <div className="profile-details-card">
          <h3>📋 Account Information</h3>

          <div className="profile-detail-list">
            <div className="profile-detail-item">
              <span>👤 Name</span>
              <strong>{loggedUser}</strong>
            </div>

            <div className="profile-detail-item">
              <span>📧 Email</span>
              <strong>
                {email || "Not available"}
              </strong>
            </div>

            <div className="profile-detail-item">
              <span>🔑 Login Activity</span>
              <strong>
                {loginCount}{" "}
                {loginCount === 1
                  ? "login"
                  : "logins"}
              </strong>
            </div>

            <div className="profile-detail-item">
              <span>📚 Enrolled Courses</span>
              <strong>{enrolledCount}</strong>
            </div>
          </div>
        </div>
      </div>

      <div className="profile-learning-summary">
        <div className="profile-summary-card">
          <span>📚</span>
          <strong>{enrolledCount}</strong>
          <small>Enrolled Courses</small>
        </div>

        <div className="profile-summary-card">
          <span>▶️</span>
          <strong>
            {registeredCourses.filter(
              (course) => getProgress(course) > 0
            ).length}
          </strong>
          <small>Started Courses</small>
        </div>

        <div className="profile-summary-card">
          <span>⏳</span>
          <strong>{ongoingCount}</strong>
          <small>Ongoing Courses</small>
        </div>

        <div className="profile-summary-card">
          <span>🏆</span>
          <strong>{completedCount}</strong>
          <small>Completed Courses</small>
        </div>
      </div>

      <div className="profile-progress-card">
        <div className="profile-progress-header">
          <div>
            <span className="course-category">
              LEARNING PERFORMANCE
            </span>

            <h3>📈 Overall Learning Progress</h3>
          </div>

          <strong>{averageProgress}%</strong>
        </div>

        <div className="profile-progress-bar">
          <div
            className="profile-progress-fill"
            style={{
              width: `${averageProgress}%`,
            }}
          ></div>
        </div>

        <p>
          Your current average progress across all enrolled
          courses is <strong>{averageProgress}%</strong>.
        </p>
      </div>

      <div className="profile-courses-card">
        <div className="profile-section-heading">
          <h3>📘 Enrolled Courses</h3>

          <p>
            Your registered courses and their current
            learning status.
          </p>
        </div>

        {registeredCourses.length === 0 ? (
          <div className="profile-empty-state">
            <span>📭</span>

            <h4>No Courses Yet</h4>

            <p>
              You have not enrolled in any course yet.
            </p>
          </div>
        ) : (
          <div className="profile-course-list">
            {registeredCourses.map((course) => {
              const courseProgress =
                getProgress(course);

              return (
                <div
                  className="profile-course-item"
                  key={course.id}
                >
                  <div className="profile-course-title">
                    <div>
                      <h4>{course.course}</h4>

                      <small>
                        Registered:{" "}
                        {course.registeredAt ||
                          "Date unavailable"}
                      </small>
                    </div>

                    <span
                      className={
                        courseProgress >= 100
                          ? "profile-course-status completed"
                          : "profile-course-status"
                      }
                    >
                      {courseProgress >= 100
                        ? "✓ Completed"
                        : "● Active"}
                    </span>
                  </div>

                  <div className="profile-course-progress">
                    <div>
                      <span>Progress</span>

                      <strong>
                        {courseProgress}%
                      </strong>
                    </div>

                    <div className="profile-mini-bar">
                      <div
                        style={{
                          width: `${courseProgress}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  <div className="profile-course-meta">
                    <span>
                      🎥 Video:{" "}
                      {course.videoCompleted
                        ? "Completed"
                        : "Pending"}
                    </span>

                    <span>
                      📖 Notes:{" "}
                      {course.notesCompleted
                        ? "Completed"
                        : "Pending"}
                    </span>

                    <span>
                      📝 Assessment:{" "}
                      {course.quizCompleted
                        ? "Completed"
                        : "Pending"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="profile-learning-note">
        <span>💡</span>

        <div>
          <strong>Keep Learning!</strong>

          <p>
            Complete your video lessons, study the notes and
            finish the assessments to improve your progress
            and become eligible for your course certificate.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Profile;
