import { useState } from "react";

function Register({
  selectedCourse,
  registeredCourses,
  setRegisteredCourses,
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState(selectedCourse || "");

  const handleRegister = (e) => {
    e.preventDefault();

    if (!name || !email || !course) {
      alert("⚠️ Please fill all fields.");
      return;
    }

    const alreadyRegistered = registeredCourses.some(
      (item) =>
        item.course === course &&
        item.email.toLowerCase() === email.toLowerCase()
    );

    if (alreadyRegistered) {
      alert("ℹ️ You are already registered for this course.");
      return;
    }

    const now = new Date();

    const registration = {
      id: Date.now(),
      name,
      email,
      course,
      status: "Active",
      registeredAt: now.toLocaleString(),
      progress: 0,
      videoCompleted: false,
      notesCompleted: false,
      quizCompleted: false,
    };

    setRegisteredCourses([
      ...registeredCourses,
      registration,
    ]);

    localStorage.setItem("email", email);

    alert(
      `🎉 Successfully registered!\n\nWelcome ${name}!\nCourse: ${course}`
    );

    setName("");
    setEmail("");
    setCourse("");
  };

  return (
    <section className="register" id="register">

      <h2>📝 Course Registration</h2>

      <p>
        Register for your selected course and start your
        learning journey with TechVerse.
      </p>

      <form onSubmit={handleRegister}>

        <div>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <br />

        <div>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <br />

        <div>
          <input
            type="text"
            placeholder="Selected course"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
          />
        </div>

        <br />

        <button type="submit">
          Register Now
        </button>

      </form>

    </section>
  );
}

export default Register;
