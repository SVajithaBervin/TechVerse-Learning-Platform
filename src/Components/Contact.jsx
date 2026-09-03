import { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    setSubmitted(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.message.trim()
    ) {
      alert("Please fill all required fields");
      return;
    }

    setSubmitted(true);

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <section className="contact" id="contact">
      <div className="contact-container">
        <div className="contact-header">
          <span className="section-badge">Get in Touch</span>

          <h2>Contact TechVerse</h2>

          <p>
            Have a question, suggestion, or need learning support?
            Send us a message and we will be happy to hear from you.
          </p>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            <div className="contact-info-card">
              <div className="contact-icon">?</div>

              <div>
                <h3>Questions</h3>
                <p>
                  Ask about courses, assessments, learning progress,
                  or the platform.
                </p>
              </div>
            </div>

            <div className="contact-info-card">
              <div className="contact-icon">💡</div>

              <div>
                <h3>Suggestions</h3>
                <p>
                  Share ideas that could make the TechVerse learning
                  experience better.
                </p>
              </div>
            </div>

            <div className="contact-info-card">
              <div className="contact-icon">🎓</div>

              <div>
                <h3>Learning Support</h3>
                <p>
                  Get help with your learning journey and assessment
                  experience.
                </p>
              </div>
            </div>
          </div>

          <div className="contact-form-wrapper">
            {submitted && (
              <div className="contact-success">
                <span>✓</span>

                <div>
                  <strong>Message Sent Successfully</strong>
                  <p>
                    Thank you for contacting TechVerse. Your message
                    has been recorded.
                  </p>
                </div>
              </div>
            )}

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="contact-name">
                    Name <span>*</span>
                  </label>

                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact-email">
                    Email <span>*</span>
                  </label>

                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="contact-subject">
                  Subject
                </label>

                <input
                  id="contact-subject"
                  type="text"
                  name="subject"
                  placeholder="Enter your subject"
                  value={formData.subject}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact-message">
                  Message <span>*</span>
                </label>

                <textarea
                  id="contact-message"
                  name="message"
                  rows="6"
                  placeholder="Write your message..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <button type="submit" className="contact-submit-btn">
                Send Message
              </button>
            </form>
          </div>
        </div>

        <div className="contact-note">
          <strong>TechVerse Support</strong>
          <p>
            For this frontend version, submitted messages are handled
            within the application interface. A backend email or
            support-ticket system can be connected in a future
            version.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Contact;
