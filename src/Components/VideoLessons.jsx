import { useState } from "react";

function VideoLessons() {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [completedVideos, setCompletedVideos] = useState([]);

  const lessons = [
    {
      id: 1,
      course: "React.js",
      title: "React.js Full Course",
      description:
        "Learn React.js fundamentals, components, props, state, hooks and application development.",
      videoUrl: "https://www.youtube.com/embed/bMknfKXIFA8",
      youtubeUrl: "https://www.youtube.com/watch?v=bMknfKXIFA8",
      duration: "Beginner Friendly",
    },
    {
      id: 2,
      course: "Python",
      title: "Python Programming",
      description:
        "Learn Python programming fundamentals including variables, functions, loops and data structures.",
      videoUrl: "https://www.youtube.com/embed/_uQrJ0TkZlc",
      youtubeUrl: "https://www.youtube.com/watch?v=_uQrJ0TkZlc",
      duration: "Complete Course",
    },
    {
      id: 3,
      course: "Web Development",
      title: "Web Development Fundamentals",
      description:
        "Understand the fundamentals of HTML, CSS and JavaScript for building modern websites.",
      videoUrl: "https://www.youtube.com/embed/pQN-pnXPaVg",
      youtubeUrl: "https://www.youtube.com/watch?v=pQN-pnXPaVg",
      duration: "Fundamentals",
    },
  ];

  const handleSelectVideo = (lesson) => {
    setSelectedVideo(lesson);
  };

  const handleCompleteVideo = (lessonId) => {
    if (!completedVideos.includes(lessonId)) {
      setCompletedVideos([...completedVideos, lessonId]);
    }

    alert(
      "✅ Video completed successfully!\n\nYou can now continue to the next learning stage."
    );
  };

  const isCompleted = (lessonId) => {
    return completedVideos.includes(lessonId);
  };

  return (
    <section className="video-lessons" id="video-lessons">
      <div className="video-lessons-header">
        <h2>🎥 Video Lessons</h2>

        <p>
          Learn through structured video lessons and complete each lesson
          as part of your TechVerse learning journey.
        </p>
      </div>

      <div className="video-learning-info">
        <div>
          <span>1</span>
          <strong>Watch Video</strong>
          <small>Learn the concept</small>
        </div>

        <div className="video-flow-arrow">→</div>

        <div>
          <span>2</span>
          <strong>Complete Lesson</strong>
          <small>Mark the video complete</small>
        </div>

        <div className="video-flow-arrow">→</div>

        <div>
          <span>3</span>
          <strong>Continue Learning</strong>
          <small>Move to the next stage</small>
        </div>
      </div>

      <div className="video-course-container">
        {lessons.map((lesson) => (
          <div className="video-course-card" key={lesson.id}>
            <div className="video-card-header">
              <span className="course-category">
                {lesson.course}
              </span>

              {isCompleted(lesson.id) && (
                <span className="completion-badge">
                  ✓ Completed
                </span>
              )}
            </div>

            <h3>{lesson.title}</h3>

            <p>{lesson.description}</p>

            <div className="video-meta">
              <span>🎬 Video Lesson</span>
              <span>📖 {lesson.duration}</span>
            </div>

            <button
              className="continue-btn"
              onClick={() => handleSelectVideo(lesson)}
            >
              {isCompleted(lesson.id)
                ? "▶ Watch Again"
                : "▶ Start Lesson"}
            </button>
          </div>
        ))}
      </div>

      {selectedVideo && (
        <div className="video-player-section">
          <div className="video-player-header">
            <div>
              <span className="course-category">
                {selectedVideo.course}
              </span>

              <h3>{selectedVideo.title}</h3>
            </div>

            <button
              className="close-video-btn"
              onClick={() => setSelectedVideo(null)}
              aria-label="Close video"
            >
              ✕
            </button>
          </div>

          <div className="video-player">
            <iframe
              src={selectedVideo.videoUrl}
              title={selectedVideo.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>

          <div className="video-actions">
            <button
              className="complete-video-btn"
              onClick={() =>
                handleCompleteVideo(selectedVideo.id)
              }
            >
              {isCompleted(selectedVideo.id)
                ? "✓ Video Completed"
                : "✓ Mark Video as Completed"}
            </button>

            <a
              href={selectedVideo.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="youtube-btn"
            >
              ▶ Open on YouTube
            </a>
          </div>

          <div className="video-next-stage">
            <h4>🔐 Next Learning Stage</h4>

            <p>
              After completing the video, continue to the{" "}
              <strong>Notes</strong> stage. Notes are available
              after completing the required video lesson.
            </p>
          </div>
        </div>
      )}

      <div className="video-learning-note">
        <h3>📌 How Learning Works</h3>

        <p>
          TechVerse follows a structured learning process. Complete
          the video lessons first, then study the notes, and finally
          attempt the assessment.
        </p>

        <div className="learning-stage-list">
          <div className="learning-stage">
            <span className="stage-number">1</span>
            <div>
              <strong>Video Lessons</strong>
              <small>Watch and complete the lessons</small>
            </div>
          </div>

          <div className="learning-stage">
            <span className="stage-number">2</span>
            <div>
              <strong>Notes</strong>
              <small>Review the learning materials</small>
            </div>
          </div>

          <div className="learning-stage">
            <span className="stage-number">3</span>
            <div>
              <strong>Assessment</strong>
              <small>Test your understanding</small>
            </div>
          </div>

          <div className="learning-stage">
            <span className="stage-number">4</span>
            <div>
              <strong>Result & Certificate</strong>
              <small>Check your performance and eligibility</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default VideoLessons;
