import { useEffect, useState } from "react";

function Navbar({
  loggedUser,
  setLoggedUser,
  darkMode,
  setDarkMode
}) {
  const [showLogin, setShowLogin] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [currentTime, setCurrentTime] = useState(new Date());

  const [loginCount, setLoginCount] = useState(() => {
    return Number(localStorage.getItem("loginCount")) || 0;
  });

  /* =========================
     Live Date & Time
  ========================= */

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  /* =========================
     Restore Logged User
  ========================= */

  useEffect(() => {
    const savedName = localStorage.getItem("loggedUser");

    if (savedName) {
      setLoggedUser(savedName);
    }
  }, [setLoggedUser]);

  /* =========================
     Login
  ========================= */

  const handleLogin = () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      alert("⚠️ Please fill all fields.");
      return;
    }

    const newLoginCount = loginCount + 1;

    setLoginCount(newLoginCount);

    localStorage.setItem("loginCount", newLoginCount);
    localStorage.setItem("loggedUser", name.trim());
    localStorage.setItem("email", email.trim());

    setLoggedUser(name.trim());

    alert(`✅ Successfully logged in!\n\nWelcome to TechVerse, ${name.trim()}!`);

    setShowLogin(false);

    setPassword("");
  };

  /* =========================
     Logout
  ========================= */

  const handleLogout = () => {
    setLoggedUser("");

    localStorage.removeItem("loggedUser");
    localStorage.removeItem("email");

    alert("👋 You have been successfully logged out.");
  };

  /* =========================
     Navigation
  ========================= */

  const scrollToSection = (id) => {
    const section = document.getElementById(id);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  };

  /* =========================
     Date & Time Formatting
  ========================= */

  const formattedDate = currentTime.toLocaleDateString(
    undefined,
    {
      day: "2-digit",
      month: "short",
      year: "numeric"
    }
  );

  const formattedTime = currentTime.toLocaleTimeString(
    undefined,
    {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    }
  );

  return (
    <>
      {/* =========================
          Navbar
      ========================= */}

      <nav className="navbar">

        {/* Logo */}

        <div
          className="logo"
          onClick={() => scrollToSection("home")}
          style={{ cursor: "pointer" }}
        >
          TechVerse
        </div>

        {/* Navigation Links */}

        <ul className="nav-links">

          <li>
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("home");
              }}
            >
              Home
            </a>
          </li>

          <li>
            <a
              href="#courses"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("courses");
              }}
            >
              Courses
            </a>
          </li>

          <li>
            <a
              href="#features"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("features");
              }}
            >
              Features
            </a>
          </li>

          <li>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("contact");
              }}
            >
              Contact
            </a>
          </li>

        </ul>

        {/* Right Side */}

        <div className="navbar-actions">

          {/* Date & Time */}

          <div className="time-box">
            <div>{formattedDate}</div>
            <div>{formattedTime}</div>
          </div>

          {/* Login / Logout */}

          {loggedUser ? (
            <div className="logged-user-box">

              <span className="user-name">
                👤 {loggedUser}
              </span>

              <span className="login-info">
                Login {loginCount}
              </span>

              <button
                className="login-btn"
                onClick={handleLogout}
              >
                Logout
              </button>

            </div>
          ) : (
            <button
              className="login-btn"
              onClick={() => setShowLogin(true)}
            >
              Login
            </button>
          )}

          {/* Theme Button */}

          <button
            className="theme-btn"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>

        </div>

      </nav>

      {/* =========================
          Login Popup
      ========================= */}

      {showLogin && (
        <div className="login-popup">

          <div className="login-box">

            <h2>Welcome to TechVerse</h2>

            <p>
              Login to continue your learning journey.
            </p>

            {/* Name */}

            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            {/* Email */}

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {/* Password */}

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* Login */}

            <button onClick={handleLogin}>
              🔐 Login
            </button>

            {/* Cancel */}

            <button
              className="cancel-btn"
              onClick={() => {
                setShowLogin(false);
                setPassword("");
              }}
            >
              Cancel
            </button>

          </div>

        </div>
      )}
    </>
  );
}

export default Navbar;
