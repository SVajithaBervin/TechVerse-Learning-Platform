import { useEffect, useState } from "react";

import "./App.css";

import Welcome from "./components/Welcome";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Courses from "./components/Courses";
import Search from "./components/Search";
import Register from "./components/Register";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

import Dashboard from "./components/Dashboard";
import LearningDashboard from "./components/LearningDashboard";

import Profile from "./components/Profile";
import MyCourses from "./components/MyCourses";

import CourseDetails from "./components/CourseDetails";
import VideoLessons from "./components/VideoLessons";

import ProfessionalQuiz from "./components/ProfessionalQuiz";

import MyCertificates from "./components/MyCertificates";
import CertificateVerify from "./components/CertificateVerify";

export default function App() {
  /* =========================
     Theme
  ========================= */

  const [darkMode, setDarkMode] = useState(false);

  /* =========================
     Course Selection
  ========================= */

  const [selectedCourse, setSelectedCourse] = useState("");

  /* =========================
     Registered Courses
  ========================= */

  const [registeredCourses, setRegisteredCourses] = useState([]);

  /* =========================
     User Login
  ========================= */

  const [loggedUser, setLoggedUser] = useState("");

  /* =========================
     Quiz Score
  ========================= */

  const [score, setScore] = useState(0);

  /* =========================
     Initial Loading
  ========================= */

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  /* =========================
     Restore Registered Courses
  ========================= */

  useEffect(() => {
    try {
      const savedCourses = localStorage.getItem("registeredCourses");

      if (savedCourses) {
        setRegisteredCourses(JSON.parse(savedCourses));
      }
    } catch (error) {
      console.error("Unable to restore registered courses:", error);
      setRegisteredCourses([]);
    }
  }, []);

  /* =========================
     Save Registered Courses
  ========================= */

  useEffect(() => {
    localStorage.setItem(
      "registeredCourses",
      JSON.stringify(registeredCourses)
    );
  }, [registeredCourses]);

  /* =========================
     Learning Progress
  ========================= */

  const progress = Math.min(
    (registeredCourses.length / 8) * 100,
    100
  );

  /* =========================
     Loading Screen
  ========================= */

  if (loading) {
    return (
      <div className="loader">
        <div className="spinner"></div>

        <h2>Loading TechVerse...</h2>

        <p>Preparing your learning experience...</p>
      </div>
    );
  }

  /* =========================
     Main Application
  ========================= */

  return (
    <div className={darkMode ? "App dark" : "App"}>

      {/* Welcome message and page title */}
      <Welcome />

      {/* Navigation */}
      <Navbar
        loggedUser={loggedUser}
        setLoggedUser={setLoggedUser}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      {/* Home / Hero */}
      <Hero
        progress={progress}
        loggedUser={loggedUser}
      />

      {/* Student Profile */}
      <Profile
        loggedUser={loggedUser}
        email={localStorage.getItem("email")}
        registeredCourses={registeredCourses}
      />

      {/* Platform Features */}
      <Features />

      {/* Course Catalogue */}
      <Courses
        setSelectedCourse={setSelectedCourse}
      />

      {/* Course Search */}
      <Search
        setSelectedCourse={setSelectedCourse}
      />

      {/* Course Registration */}
      <Register
        selectedCourse={selectedCourse}
        registeredCourses={registeredCourses}
        setRegisteredCourses={setRegisteredCourses}
      />

      {/* My Learning / Registered Courses */}
      <MyCourses
        registeredCourses={registeredCourses}
        setRegisteredCourses={setRegisteredCourses}
      />

      {/* Course Information */}
      <CourseDetails />

      {/* Video Lessons + Notes */}
      <VideoLessons />

      {/* Assessment */}
      <ProfessionalQuiz
        setScore={setScore}
      />

      {/* Learning Dashboard */}
      <LearningDashboard
        setSelectedCourse={setSelectedCourse}
        selectedCourse={selectedCourse}
      />

      {/* Student Dashboard */}
      <Dashboard
        loggedUser={loggedUser}
        registeredCourses={registeredCourses}
        progress={progress}
        score={score}
      />

      {/* Certificates */}
      <MyCertificates />

      {/* Certificate Verification */}
      <CertificateVerify />

      {/* Student Reviews */}
      <Testimonials />

      {/* Contact */}
      <Contact />

      {/* Footer */}
      <Footer />

    </div>
  );
}

  /* =========================
     Initial Loading
  ========================= */

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  /* =========================
     Load Registered Courses
  ========================= */

  useEffect(() => {
    const savedCourses = localStorage.getItem("registeredCourses");

    if (savedCourses) {
      try {
        setRegisteredCourses(JSON.parse(savedCourses));
      } catch (error) {
        console.error("Unable to load registered courses:", error);
        setRegisteredCourses([]);
      }
    }
  }, []);

  /* =========================
     Save Registered Courses
  ========================= */

  useEffect(() => {
    localStorage.setItem(
      "registeredCourses",
      JSON.stringify(registeredCourses)
    );
  }, [registeredCourses]);

  /* =========================
     Overall Learning Progress
  ========================= */

  const progress = Math.min(
    (registeredCourses.length / 8) * 100,
    100
  );

  /* =========================
     Loading Screen
  ========================= */

  if (loading) {
    return (
      <div className="loader">
        <div className="spinner"></div>

        <h2>Loading TechVerse...</h2>

        <p>Preparing your learning experience</p>
      </div>
    );
  }

  /* =========================
     Main Application
  ========================= */

  return (
    <div className={darkMode ? "App dark" : "App"}>

      {/* Welcome / Page Setup */}
      <Welcome />

      {/* Navigation */}
      <Navbar
        loggedUser={loggedUser}
        setLoggedUser={setLoggedUser}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      {/* Home / Hero */}
      <Hero
        progress={progress}
        loggedUser={loggedUser}
      />

      {/* Student Profile */}
      <Profile
        loggedUser={loggedUser}
        email={localStorage.getItem("email")}
        registeredCourses={registeredCourses}
      />

      {/* Platform Features */}
      <Features />

      {/* Course Explorer */}
      <Courses
        setSelectedCourse={setSelectedCourse}
      />

      {/* Course Search */}
      <Search
        setSelectedCourse={setSelectedCourse}
      />

      {/* Course Registration */}
      <Register
        selectedCourse={selectedCourse}
        registeredCourses={registeredCourses}
        setRegisteredCourses={setRegisteredCourses}
      />

      {/* My Enrolled Courses */}
      <MyCourses
        registeredCourses={registeredCourses}
        setRegisteredCourses={setRegisteredCourses}
      />

      {/* Course Details */}
      <CourseDetails />

      {/* Video Learning */}
      <VideoLessons />

      {/* Assessment */}
      <ProfessionalQuiz
        setScore={setScore}
      />

      {/* Learning Dashboard */}
      <LearningDashboard
        setSelectedCourse={setSelectedCourse}
        selectedCourse={selectedCourse}
      />

      {/* Student Dashboard */}
      <Dashboard
        loggedUser={loggedUser}
        registeredCourses={registeredCourses}
        progress={progress}
        score={score}
      />

      {/* Certificates */}
      <MyCertificates />

      {/* Certificate Verification */}
      <CertificateVerify />

      {/* Student Reviews */}
      <Testimonials />

      {/* Contact */}
      <Contact />

      {/* Footer */}
      <Footer />

    </div>
  );
}

export default App;
