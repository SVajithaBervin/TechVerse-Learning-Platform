function Testimonials() {
  const reviews = [
    {
      name: "Arun",
      role: "React.js Learner",
      review:
        "The React.js learning experience was clear and easy to follow. The structured lessons and assessments helped me understand the concepts better.",
      rating: 5,
    },
    {
      name: "Priya",
      role: "Web Development Learner",
      review:
        "TechVerse provides a simple and organized way to learn web development. The combination of videos, notes, and assessments is useful.",
      rating: 5,
    },
    {
      name: "Karthik",
      role: "Technology Learner",
      review:
        "I liked the learning dashboard and progress tracking. It makes it easier to understand what I have completed and what I need to learn next.",
      rating: 5,
    },
  ];

  return (
    <section className="testimonials" id="testimonials">
      <div className="testimonials-container">
        <div className="section-heading">
          <span className="section-badge">Student Feedback</span>

          <h2>What Learners Say</h2>

          <p>
            Feedback from learners about their experience with the
            TechVerse learning platform.
          </p>
        </div>

        <div className="review-container">
          {reviews.map((item, index) => (
            <article className="review-card" key={index}>
              <div className="review-top">
                <div className="review-avatar">
                  {item.name.charAt(0)}
                </div>

                <div>
                  <h3>{item.name}</h3>
                  <p className="review-role">{item.role}</p>
                </div>
              </div>

              <div className="review-rating" aria-label={`${item.rating} out of 5 stars`}>
                {"★".repeat(item.rating)}
                {"☆".repeat(5 - item.rating)}
              </div>

              <p className="review-text">“{item.review}”</p>

              <button
                type="button"
                className="review-more"
                onClick={() =>
                  alert(
                    `${item.name}'s Feedback\n\n${item.review}`
                  )
                }
              >
                More
              </button>
            </article>
          ))}
        </div>

        <div className="testimonial-footer">
          <h3>Keep Learning. Keep Growing.</h3>
          <p>
            TechVerse is designed to make learning more structured,
            practical, and easy to track.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
