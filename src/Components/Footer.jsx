function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-main">
          <div className="footer-brand">
            <h2>TechVerse</h2>

            <p>
              A learning and online assessment platform designed to
              provide a structured and practical learning experience.
            </p>
          </div>

          <div className="footer-links">
            <h3>Quick Links</h3>

            <button
              type="button"
              onClick={() => scrollToSection("home")}
            >
              Home
            </button>

            <button
              type="button"
              onClick={() => scrollToSection("courses")}
            >
              Courses
            </button>

            <button
              type="button"
              onClick={() => scrollToSection("features")}
            >
              Features
            </button>

            <button
              type="button"
              onClick={() => scrollToSection("contact")}
            >
              Contact
            </button>
          </div>

          <div className="footer-learning">
            <h3>Learning</h3>

            <button
              type="button"
              onClick={() => scrollToSection("my-learning")}
            >
              My Learning
            </button>

            <button
              type="button"
              onClick={() => scrollToSection("dashboard")}
            >
              Dashboard
            </button>

            <button
              type="button"
              onClick={() => scrollToSection("certificate-verification")}
            >
              Verify Certificate
            </button>
          </div>

          <div className="footer-contact">
            <h3>Get in Touch</h3>

            <p>
              Have questions, suggestions, or need learning support?
            </p>

            <button
              type="button"
              onClick={() => scrollToSection("contact")}
              className="footer-contact-btn"
            >
              Contact TechVerse
            </button>
          </div>
        </div>

        <div className="footer-divider"></div>

        <div className="footer-bottom">
          <p>
            © {currentYear} <strong>TechVerse</strong>. All rights
            reserved.
          </p>

          <p>
            Learning • Practice • Assessment
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
