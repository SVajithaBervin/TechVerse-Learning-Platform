import { useEffect, useState } from "react";

function MyCourses({
  registeredCourses,
  setRegisteredCourses,
}) {
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    const savedCourses = localStorage.getItem("registeredCourses");

    if (savedCourses) {
      try {
        const parsedCourses = JSON.parse(savedCourses);

        if (Array.isArray(parsedCourses)) {
          setRegisteredCourses(parsedCourses);
        }
      } catch (error) {
        console.error("Unable to load registered courses:", error);
      }
    }
  }, [setRegisteredCourses]);

  const handleRemove = (id) => {
    const confirmRemove = window.confirm(
      "Are you sure you want to remove this course?"
    );

    if (!confirmRemove) return;

    const updatedCourses = registeredCourses.filter(
      (course) => course.id !== id
    );

    setRegisteredCourses(updatedCourses);

    alert("🗑️ Course removed successfully.");
  };

  const getProgress = (course) => {
    return typeof course.progress === "number"
      ? course.progress
      : 0;
  };

  return (
    <section className="my-courses" id="my-learning">

      <h2>📚 My Learning</h2>

      <p className="search-text">
        Track your enrolled courses and continue your learning journey.
      </p>

      <div className="learning-summary">

        <div className="card">
          <h1>📘</h1>
          <h3>Enrolled Courses</h3>
          <p>{registeredCourses.length}</p>
        </div>

        <div className="card">
          <h1>▶️</h1>
          <h3>Courses Started</h3>
          <p>
            {
              registeredCourses.filter(
                (course) => getProgress(course) > 0
              ).length
            }
          </p>
        </div>

        <div className="card">
          <h1>🏆</h1>
          <h3>Completed</h3>
          <p>
            {
              registeredCourses.filter(
                (course) => getProgress(course) >= 100
              ).length
            }
          </p>
        </div>

      </div>

      <button
        className="continue-btn"
        onClick={() => setShowHistory(!showHistory)}
      >
        {showHistory
          ? "Hide Registration History"
          : "View Registration History"}
      </button>

      {registeredCourses.length === 0 ? (

        <div className="learning-panel">

          <h3>📭 No Courses Enrolled</h3>

          <p>
            You have not enrolled in any course yet.
            Explore our courses and start learning.
          </p>

        </div>

      ) : (

        <div className="course-container">

          {registeredCourses.map((course) => {

            const progress = getProgress(course);

            return (
              <div
                className="my-course-card"
                key={course.id}
              >

                <h3>{course.course}</h3>

                <p>
                  <strong>Student:</strong>{" "}
                  {course.name || "Student"}
                </p>

                <p>
                  <strong>Email:</strong>{" "}
                  {course.email || "Not available"}
                </p>

                <p>
                  <strong>Status:</strong>{" "}
                  <span className="user-name">
                    {course.status || "Active"}
                  </span>
                </p>

                <p>
                  <strong>Learning Progress:</strong>{" "}
                  {progress}%
                </p>

                <progress
                  value={progress}
                  max="100"
                ></progress>

                <div>

                  <button
                    className="continue-btn"
                    onClick={() =>
                      alert(
                        `📖 Continuing ${course.course}...\n\nYour current progress is ${progress}%.`
                      )
                    }
                  >
                    ▶ Continue Learning
                  </button>

                  <button
                    className="continue-btn"
                    onClick={() => handleRemove(course.id)}
                  >
                    🗑️ Remove
                  </button>

                </div>

                {showHistory && (

                  <div className="history-card">

                    <h3>📋 Registration Details</h3>

                    <p>
                      <strong>Name:</strong>{" "}
                      {course.name || "Student"}
                    </p>

                    <p>
                      <strong>Email:</strong>{" "}
                      {course.email || "Not available"}
                    </p>

                    <p>
                      <strong>Course:</strong>{" "}
                      {course.course}
                    </p>

                    <p>
                      <strong>Status:</strong>{" "}
                      {course.status || "Active"}
                    </p>

                    <p>
                      <strong>Registered On:</strong>{" "}
                      {course.registeredAt ||
                        "Date not available"}
                    </p>

                    <p>
                      <strong>Learning Progress:</strong>{" "}
                      {progress}%
                    </p>

                  </div>

                )}

              </div>
            );
          })}

        </div>

      )}

    </section>
  );
}

export default MyCourses;
