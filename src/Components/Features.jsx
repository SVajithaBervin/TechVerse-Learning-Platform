function Features() {
  const features = [
    {
      icon: "🎥",
      title: "Video Learning",
      description:
        "Learn through structured video lessons with course-wise learning resources."
    },
    {
      icon: "📚",
      title: "Study Notes",
      description:
        "Access course-related notes to revise important concepts before assessments."
    },
    {
      icon: "📝",
      title: "Online Assessments",
      description:
        "Test your knowledge through timed quizzes and objective-based assessments."
    },
    {
      icon: "📊",
      title: "Progress Tracking",
      description:
        "Track your learning progress, completed activities, assessment attempts and scores."
    },
    {
      icon: "🏆",
      title: "Achievement Recognition",
      description:
        "Earn grades and achievement recognition based on your assessment performance."
    },
    {
      icon: "🎓",
      title: "Certificates",
      description:
        "Receive a course certificate after meeting the required completion and assessment criteria."
    },
    {
      icon: "🔐",
      title: "Certificate Verification",
      description:
        "Verify certificates using a unique certificate ID and view the associated details."
    },
    {
      icon: "💻",
      title: "Self-Paced Learning",
      description:
        "Learn at your own pace and continue your course journey whenever you are ready."
    }
  ];

  return (
    <section className="features" id="features">

      <div className="section-heading">

        <span className="section-label">
          WHY TECHVERSE
        </span>

        <h2>
          Everything You Need to Learn
        </h2>

        <p>
          TechVerse combines learning resources, assessments,
          progress tracking and certification into one learning platform.
        </p>

      </div>

      <div className="feature-container">

        {features.map((feature, index) => (
          <div
            className="card feature-card"
            key={index}
          >

            <div className="feature-icon">
              {feature.icon}
            </div>

            <h3>
              {feature.title}
            </h3>

            <p>
              {feature.description}
            </p>

          </div>
        ))}

      </div>

    </section>
  );
}

export default Features;
