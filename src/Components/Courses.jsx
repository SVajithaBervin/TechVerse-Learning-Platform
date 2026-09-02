import { useMemo, useState } from "react";

function Courses({ setSelectedCourse }) {
  const [activeCategory, setActiveCategory] = useState("All");

  const courses = [
    // =========================
    // Web Development - 6
    // =========================

    {
      id: 1,
      title: "HTML & CSS Fundamentals",
      category: "Web Development",
      level: "Beginner",
      duration: "4 Weeks",
      modules: 6,
      videos: 12,
      notes: "Available",
      quiz: "Available",
    },
    {
      id: 2,
      title: "JavaScript Essentials",
      category: "Web Development",
      level: "Beginner",
      duration: "5 Weeks",
      modules: 7,
      videos: 15,
      notes: "Available",
      quiz: "Available",
    },
    {
      id: 3,
      title: "React JS",
      category: "Web Development",
      level: "Intermediate",
      duration: "6 Weeks",
      modules: 8,
      videos: 18,
      notes: "Available",
      quiz: "Available",
    },
    {
      id: 4,
      title: "Node.js & Express",
      category: "Web Development",
      level: "Intermediate",
      duration: "6 Weeks",
      modules: 8,
      videos: 16,
      notes: "Available",
      quiz: "Available",
    },
    {
      id: 5,
      title: "Full Stack Web Development",
      category: "Web Development",
      level: "Advanced",
      duration: "8 Weeks",
      modules: 10,
      videos: 24,
      notes: "Available",
      quiz: "Available",
    },
    {
      id: 6,
      title: "Responsive Web Design",
      category: "Web Development",
      level: "Beginner",
      duration: "4 Weeks",
      modules: 6,
      videos: 12,
      notes: "Available",
      quiz: "Available",
    },

    // =========================
    // Programming - 6
    // =========================

    {
      id: 7,
      title: "Python Programming",
      category: "Programming",
      level: "Beginner",
      duration: "6 Weeks",
      modules: 8,
      videos: 18,
      notes: "Available",
      quiz: "Available",
    },
    {
      id: 8,
      title: "Java Programming",
      category: "Programming",
      level: "Beginner",
      duration: "6 Weeks",
      modules: 8,
      videos: 18,
      notes: "Available",
      quiz: "Available",
    },
    {
      id: 9,
      title: "C Programming",
      category: "Programming",
      level: "Beginner",
      duration: "5 Weeks",
      modules: 7,
      videos: 15,
      notes: "Available",
      quiz: "Available",
    },
    {
      id: 10,
      title: "C++ Programming",
      category: "Programming",
      level: "Intermediate",
      duration: "6 Weeks",
      modules: 8,
      videos: 17,
      notes: "Available",
      quiz: "Available",
    },
    {
      id: 11,
      title: "Data Structures & Algorithms",
      category: "Programming",
      level: "Intermediate",
      duration: "8 Weeks",
      modules: 10,
      videos: 22,
      notes: "Available",
      quiz: "Available",
    },
    {
      id: 12,
      title: "Object-Oriented Programming",
      category: "Programming",
      level: "Intermediate",
      duration: "5 Weeks",
      modules: 7,
      videos: 15,
      notes: "Available",
      quiz: "Available",
    },

    // =========================
    // Database - 2
    // =========================

    {
      id: 13,
      title: "SQL & Database Fundamentals",
      category: "Database",
      level: "Beginner",
      duration: "4 Weeks",
      modules: 6,
      videos: 12,
      notes: "Available",
      quiz: "Available",
    },
    {
      id: 14,
      title: "MongoDB Basics",
      category: "Database",
      level: "Intermediate",
      duration: "4 Weeks",
      modules: 6,
      videos: 12,
      notes: "Available",
      quiz: "Available",
    },

    // =========================
    // AI & Data - 2
    // =========================

    {
      id: 15,
      title: "Artificial Intelligence Fundamentals",
      category: "AI & Data",
      level: "Beginner",
      duration: "6 Weeks",
      modules: 8,
      videos: 18,
      notes: "Available",
      quiz: "Available",
    },
    {
      id: 16,
      title: "Data Science Fundamentals",
      category: "AI & Data",
      level: "Intermediate",
      duration: "7 Weeks",
      modules: 9,
      videos: 20,
      notes: "Available",
      quiz: "Available",
    },

    // =========================
    // Cloud - 1
    // =========================

    {
      id: 17,
      title: "Cloud Computing Fundamentals",
      category: "Cloud",
      level: "Beginner",
      duration: "5 Weeks",
      modules: 7,
      videos: 15,
      notes: "Available",
      quiz: "Available",
    },

    // =========================
    // Design - 1
    // =========================

    {
      id: 18,
      title: "UI/UX Design Fundamentals",
      category: "Design",
      level: "Beginner",
      duration: "4 Weeks",
      modules: 6,
      videos: 12,
      notes: "Available",
      quiz: "Available",
    },

    // =========================
    // Tools - 1
    // =========================

    {
      id: 19,
      title: "Git & GitHub Essentials",
      category: "Tools",
      level: "Beginner",
      duration: "3 Weeks",
      modules: 5,
      videos: 10,
      notes: "Available",
      quiz: "Available",
    },
  ];

  const categories = [
    "All",
    "Web Development",
    "Programming",
    "Database",
    "AI & Data",
    "Cloud",
    "Design",
    "Tools",
  ];

  const filteredCourses = useMemo(() => {
    if (activeCategory === "All") {
      return courses;
    }

    return courses.filter(
      (course) => course.category === activeCategory
    );
  }, [activeCategory]);

  const handleEnroll = (courseTitle) => {
    setSelectedCourse(courseTitle);

    const registerSection = document.getElementById("register");

    if (registerSection) {
      registerSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section className="courses" id="courses">

      {/* =========================
          Section Header
      ========================= */}

      <div className="section-heading">

        <span className="section-label">
          TECHVERSE ACADEMY
        </span>

        <h2>
          Explore Our Courses
        </h2>

        <p>
          Build practical technology skills through structured,
          self-paced courses with videos, notes and assessments.
        </p>

      </div>

      {/* =========================
          Course Count
      ========================= */}

      <div className="course-summary">

        <strong>
          {filteredCourses.length}
        </strong>

        <span>
          {activeCategory === "All"
            ? "Courses Available"
            : `${activeCategory} Courses`}
        </span>

      </div>

      {/* =========================
          Category Filter
      ========================= */}

      <div className="course-filter">

        {categories.map((category) => (
          <button
            key={category}
            className={
              activeCategory === category
                ? "filter-btn active"
                : "filter-btn"
            }
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}

      </div>

      {/* =========================
          Course Cards
      ========================= */}

      <div className="course-container">

        {filteredCourses.map((course) => (
          <div
            className="course-card"
            key={course.id}
          >

            <div className="course-icon">
              {course.category === "Web Development" && "🌐"}
              {course.category === "Programming" && "💻"}
              {course.category === "Database" && "🗄️"}
              {course.category === "AI & Data" && "🤖"}
              {course.category === "Cloud" && "☁️"}
              {course.category === "Design" && "🎨"}
              {course.category === "Tools" && "🛠️"}
            </div>

            <span className="course-category">
              {course.category}
            </span>

            <h3>
              {course.title}
            </h3>

            <div className="course-level">
              <span>
                {course.level}
              </span>
            </div>

            <div className="course-meta">

              <p>
                ⏱️ <strong>Duration:</strong>{" "}
                {course.duration}
              </p>

              <p>
                📚 <strong>Modules:</strong>{" "}
                {course.modules}
              </p>

              <p>
                🎥 <strong>Videos:</strong>{" "}
                {course.videos}
              </p>

            </div>

            <div className="course-resources">

              <span>
                📄 Notes
              </span>

              <span>
                📝 Quiz
              </span>

            </div>

            <button
              className="course-card-btn"
              onClick={() => handleEnroll(course.title)}
            >
              Enroll Now →
            </button>

          </div>
        ))}

      </div>

      {/* =========================
          Empty State
      ========================= */}

      {filteredCourses.length === 0 && (
        <div className="empty-course-message">

          <h3>
            No courses found
          </h3>

          <p>
            Try selecting another course category.
          </p>

        </div>
      )}

    </section>
  );
}

export default Courses;
