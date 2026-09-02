function Hero({ progress = 0, loggedUser = "" }) {
  const scrollToSection = (id) => {
    const section = document.getElementById(id);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const displayProgress = Math.round(progress);

  return (
    <section className="hero" id="home">

      <div className="hero-content">

        <h1>
          {loggedUser
            ? `Welcome back, ${loggedUser}!`
            : "Welcome to TechVerse"}
        </h1>

        <p>
          Learn modern technology through structured courses,
          video lessons, notes, assessments, progress tracking,
          and verified certificates.
        </p>

        {loggedUser && (
          <div className="hero-progress">

            <h3>
              Your Learning Progress
            </h3>

            <progress
              value={displayProgress}
              max="100"
            ></progress>

            <p>
              {displayProgress}% completed
            </p>

          </div>
        )}

        <div className="hero-actions">

          <button
            className="hero-btn"
            onClick={() => scrollToSection("courses")}
          >
            📚 Explore Courses
          </button>

          <button
            className="course-btn"
            onClick={() => scrollToSection("features")}
          >
            ✨ Discover Features
          </button>

        </div>

      </div>

      <div className="hero-image">

        <img
          src="/techverse-hero.jpg"
          alt="TechVerse learning platform"
        />

      </div>

    </section>
  );
}

export default Hero;
