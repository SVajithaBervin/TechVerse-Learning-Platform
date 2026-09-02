import { useState } from "react";

function Search({ setSelectedCourse }) {
  const [searchTerm, setSearchTerm] = useState("");

  const courses = [
    "React JS",
    "HTML",
    "CSS",
    "JavaScript",
    "Python",
    "Node JS",
    "MongoDB",
    "Artificial Intelligence",
    "Data Science",
    "Cloud Computing",
  ];

  const filteredCourses = courses.filter((course) =>
    course.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectCourse = (course) => {
    setSelectedCourse(course);
  };

  return (
    <section className="search" id="search">

      <h2>🔍 Search for a Course</h2>

      <p className="search-text">
        Find the course you want to learn and start your learning journey
        with TechVerse.
      </p>

      <input
        type="text"
        placeholder="Search courses..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {searchTerm && (
        <div className="course-container">

          {filteredCourses.length > 0 ? (
            filteredCourses.map((course, index) => (
              <div className="course-card" key={index}>

                <h3>{course}</h3>

                <p>
                  Learn {course} through structured lessons,
                  notes and assessments.
                </p>

                <button
                  onClick={() => handleSelectCourse(course)}
                >
                  Select Course
                </button>

              </div>
            ))
          ) : (
            <p className="search-text">
              ❌ The course is not found.
            </p>
          )}

        </div>
      )}

    </section>
  );
}

export default Search;
