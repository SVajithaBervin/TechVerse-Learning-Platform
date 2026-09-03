import { useEffect, useState } from "react";

const PASS_PERCENTAGE = 60;

function MyCertificates() {
  const [certificates, setCertificates] = useState([]);
  const [selectedCertificate, setSelectedCertificate] =
    useState(null);

  useEffect(() => {
    loadCertificates();
  }, []);

  const loadCertificates = () => {
    const savedCertificates =
      localStorage.getItem("techverseCertificates");

    if (!savedCertificates) {
      setCertificates([]);
      return;
    }

    try {
      const parsedCertificates =
        JSON.parse(savedCertificates);

      if (Array.isArray(parsedCertificates)) {
        setCertificates(parsedCertificates);
      }
    } catch (error) {
      console.error(
        "Unable to load certificates:",
        error
      );

      setCertificates([]);
    }
  };

  const getGrade = (percentage) => {
    if (percentage >= 90) return "A";
    if (percentage >= 75) return "B";
    return "C";
  };

  const getRecognition = (percentage) => {
    if (percentage >= 90) return "Gold";
    if (percentage >= 75) return "Silver";
    return "Bronze";
  };

  const createCertificateId = () => {
    const timestamp = Date.now().toString().slice(-8);

    const randomPart = Math.random()
      .toString(36)
      .substring(2, 7)
      .toUpperCase();

    return `TV-${timestamp}-${randomPart}`;
  };

  const createCertificate = () => {
    const loggedUser =
      localStorage.getItem("loggedUser");

    const email =
      localStorage.getItem("email") || "";

    if (!loggedUser) {
      alert(
        "🔐 Please login to view your certificates."
      );
      return;
    }

    const savedHistory =
      localStorage.getItem("techverseQuizHistory");

    if (!savedHistory) {
      alert(
        "📋 No assessment result is available yet."
      );
      return;
    }

    try {
      const history = JSON.parse(savedHistory);

      if (!Array.isArray(history)) {
        return;
      }

      const passedAttempts = history.filter(
        (attempt) =>
          attempt.status === "Pass" &&
          Number(attempt.percentage) >= PASS_PERCENTAGE &&
          (
            attempt.email === email ||
            attempt.student === loggedUser
          )
      );

      if (passedAttempts.length === 0) {
        alert(
          "🎓 Certificate is not available yet.\n\nComplete the assessment with at least 60% to become eligible."
        );
        return;
      }

      const existingCertificates =
        JSON.parse(
          localStorage.getItem(
            "techverseCertificates"
          ) || "[]"
        );

      const newCertificates = [];

      passedAttempts.forEach((attempt) => {
        const alreadyGenerated =
          existingCertificates.some(
            (certificate) =>
              certificate.attemptId === attempt.id
          );

        if (alreadyGenerated) {
          return;
        }

        const percentage =
          Number(attempt.percentage) || 0;

        const now = new Date();

        const certificate = {
          id: Date.now() + newCertificates.length,
          certificateId: createCertificateId(),
          attemptId: attempt.id,
          studentName:
            attempt.student || loggedUser,
          email:
            attempt.email || email,
          course:
            attempt.course || "TechVerse Course",
          score:
            attempt.score || "N/A",
          percentage,
          grade:
            attempt.grade || getGrade(percentage),
          recognition:
            attempt.recognition ||
            getRecognition(percentage),
          issueDate:
            now.toLocaleDateString(),
          issueTime:
            now.toLocaleTimeString(),
          issuedAt:
            now.toLocaleString(),
        };

        newCertificates.push(certificate);
      });

      if (newCertificates.length === 0) {
        alert(
          "ℹ️ Your certificate has already been generated for the available passed assessment."
        );

        loadCertificates();
        return;
      }

      const updatedCertificates = [
        ...existingCertificates,
        ...newCertificates,
      ];

      localStorage.setItem(
        "techverseCertificates",
        JSON.stringify(updatedCertificates)
      );

      setCertificates(updatedCertificates);

      alert(
        `🎉 Certificate generated successfully!\n\nCertificate ID: ${newCertificates[0].certificateId}`
      );
    } catch (error) {
      console.error(
        "Unable to generate certificate:",
        error
      );

      alert(
        "⚠️ Unable to generate the certificate. Please try again."
      );
    }
  };

  const handleViewCertificate = (certificate) => {
    setSelectedCertificate(certificate);
  };

  const handleCloseCertificate = () => {
    setSelectedCertificate(null);
  };

  const handlePrintCertificate = (certificate) => {
    const certificateWindow = window.open(
      "",
      "_blank",
      "width=1200,height=850"
    );

    if (!certificateWindow) {
      alert(
        "⚠️ Please allow pop-ups in your browser to print the certificate."
      );
      return;
    }

    certificateWindow.document.write(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>
            TechVerse Certificate - ${certificate.studentName}
          </title>

          <style>
            * {
              box-sizing: border-box;
            }

            body {
              margin: 0;
              padding: 30px;
              font-family: Arial, Helvetica, sans-serif;
              background: #f3f4f6;
            }

            .certificate {
              max-width: 1100px;
              margin: 0 auto;
              padding: 60px;
              background: white;
              border: 12px solid #1f2937;
              outline: 3px solid #d4af37;
              outline-offset: -25px;
              text-align: center;
              min-height: 720px;
              position: relative;
            }

            .brand {
              font-size: 34px;
              font-weight: 800;
              letter-spacing: 2px;
              margin-bottom: 25px;
            }

            .title {
              font-size: 48px;
              margin: 10px 0;
              letter-spacing: 4px;
            }

            .subtitle {
              font-size: 18px;
              color: #555;
              margin-bottom: 30px;
            }

            .student {
              font-size: 38px;
              font-weight: 700;
              margin: 25px 0;
              border-bottom: 2px solid #333;
              display: inline-block;
              padding: 0 40px 10px;
            }

            .course {
              font-size: 25px;
              font-weight: 600;
              margin: 20px 0;
            }

            .details {
              margin: 30px auto;
              display: flex;
              justify-content: center;
              gap: 50px;
              flex-wrap: wrap;
            }

            .detail {
              min-width: 130px;
            }

            .detail strong {
              display: block;
              font-size: 25px;
              margin-top: 7px;
            }

            .detail span {
              color: #666;
              font-size: 13px;
            }

            .recognition {
              font-size: 22px;
              font-weight: 700;
              margin: 25px 0;
            }

            .certificate-id {
              font-size: 13px;
              color: #555;
              margin-top: 35px;
            }

            .footer {
              margin-top: 35px;
              font-size: 13px;
              color: #666;
            }

            @media print {
              body {
                padding: 0;
                background: white;
              }

              .certificate {
                width: 100%;
                min-height: 100vh;
                max-width: none;
                margin: 0;
              }
            }
          </style>
        </head>

        <body>
          <div class="certificate">
            <div class="brand">
              TECHVERSE
            </div>

            <div class="title">
              CERTIFICATE
            </div>

            <div class="subtitle">
              OF SUCCESSFUL COURSE COMPLETION
            </div>

            <p>
              This certificate is proudly presented to
            </p>

            <div class="student">
              ${certificate.studentName}
            </div>

            <p>
              for successfully completing the course
            </p>

            <div class="course">
              ${certificate.course}
            </div>

            <div class="details">
              <div class="detail">
                <span>Score</span>
                <strong>${certificate.score}</strong>
              </div>

              <div class="detail">
                <span>Percentage</span>
                <strong>${certificate.percentage}%</strong>
              </div>

              <div class="detail">
                <span>Grade</span>
                <strong>${certificate.grade}</strong>
              </div>
            </div>

            <div class="recognition">
              Recognition Level: ${certificate.recognition}
            </div>

            <div class="certificate-id">
              Certificate ID:
              <strong>
                ${certificate.certificateId}
              </strong>
            </div>

            <div class="footer">
              Issued on ${certificate.issueDate}
              <br />
              TechVerse Learning & Online Assessment Platform
            </div>
          </div>
        </body>
      </html>
    `);

    certificateWindow.document.close();

    setTimeout(() => {
      certificateWindow.focus();
      certificateWindow.print();
    }, 500);
  };

  const handleGenerateAndView = () => {
    createCertificate();

    setTimeout(() => {
      loadCertificates();
    }, 300);
  };

  return (
    <section
      className="my-certificates"
      id="my-certificates"
    >
      <div className="certificates-header">
        <div>
          <span className="course-category">
            ACHIEVEMENTS
          </span>

          <h2>🏆 My Certificates</h2>

          <p>
            View your earned TechVerse certificates and
            download a print-ready copy.
          </p>
        </div>

        <div className="certificate-count">
          <span>🏆</span>
          <strong>{certificates.length}</strong>
          <small>
            {certificates.length === 1
              ? "Certificate"
              : "Certificates"}
          </small>
        </div>
      </div>

      <div className="certificate-action-card">
        <div>
          <h3>🎓 Certificate Eligibility</h3>

          <p>
            Successfully complete an assessment with a
            minimum score of <strong>60%</strong> to become
            eligible for a TechVerse course certificate.
          </p>
        </div>

        <button
          className="continue-btn"
          onClick={handleGenerateAndView}
        >
          🎓 Generate Certificate
        </button>
      </div>

      {certificates.length === 0 ? (
        <div className="certificates-empty-state">
          <div className="certificate-empty-icon">
            🏅
          </div>

          <h3>No Certificates Yet</h3>

          <p>
            Complete a course assessment successfully to
            earn your first TechVerse certificate.
          </p>

          <div className="certificate-requirement">
            <span>✓</span>
            <strong>Minimum passing score: 60%</strong>
          </div>
        </div>
      ) : (
        <div className="certificates-list">
          {certificates.map((certificate) => (
            <article
              className="certificate-card"
              key={certificate.id}
            >
              <div className="certificate-card-top">
                <div className="certificate-mini-logo">
                  TV
                </div>

                <div>
                  <span>
                    TECHVERSE
                  </span>

                  <h3>
                    Course Completion Certificate
                  </h3>
                </div>

                <div className="certificate-recognition">
                  {certificate.recognition}
                </div>
              </div>

              <div className="certificate-card-body">
                <p>Certificate awarded to</p>

                <h3>
                  {certificate.studentName}
                </h3>

                <h4>
                  {certificate.course}
                </h4>

                <div className="certificate-stats">
                  <div>
                    <small>Score</small>
                    <strong>
                      {certificate.score}
                    </strong>
                  </div>

                  <div>
                    <small>Percentage</small>
                    <strong>
                      {certificate.percentage}%
                    </strong>
                  </div>

                  <div>
                    <small>Grade</small>
                    <strong>
                      {certificate.grade}
                    </strong>
                  </div>
                </div>
              </div>

              <div className="certificate-card-footer">
                <div>
                  <small>Certificate ID</small>

                  <strong>
                    {certificate.certificateId}
                  </strong>
                </div>

                <div>
                  <small>Issue Date</small>

                  <strong>
                    {certificate.issueDate}
                  </strong>
                </div>
              </div>

              <div className="certificate-card-actions">
                <button
                  className="continue-btn"
                  onClick={() =>
                    handleViewCertificate(
                      certificate
                    )
                  }
                >
                  👁️ View Certificate
                </button>

                <button
                  className="continue-btn"
                  onClick={() =>
                    handlePrintCertificate(
                      certificate
                    )
                  }
                >
                  🖨️ Download / Print
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      {selectedCertificate && (
        <div className="certificate-modal-overlay">
          <div className="certificate-modal">
            <button
              className="certificate-modal-close"
              onClick={handleCloseCertificate}
              aria-label="Close certificate"
            >
              ✕
            </button>

            <div className="certificate-preview">
              <div className="certificate-preview-brand">
                TECHVERSE
              </div>

              <p className="certificate-preview-small">
                CERTIFICATE OF SUCCESSFUL COURSE COMPLETION
              </p>

              <p>This certificate is proudly presented to</p>

              <h2>
                {selectedCertificate.studentName}
              </h2>

              <p>
                for successfully completing the course
              </p>

              <h3>
                {selectedCertificate.course}
              </h3>

              <div className="certificate-preview-stats">
                <div>
                  <span>Score</span>
                  <strong>
                    {selectedCertificate.score}
                  </strong>
                </div>

                <div>
                  <span>Percentage</span>
                  <strong>
                    {selectedCertificate.percentage}%
                  </strong>
                </div>

                <div>
                  <span>Grade</span>
                  <strong>
                    {selectedCertificate.grade}
                  </strong>
                </div>

                <div>
                  <span>Recognition</span>
                  <strong>
                    {selectedCertificate.recognition}
                  </strong>
                </div>
              </div>

              <p className="certificate-preview-id">
                Certificate ID:{" "}
                <strong>
                  {selectedCertificate.certificateId}
                </strong>
              </p>

              <p className="certificate-preview-date">
                Issued on{" "}
                {selectedCertificate.issueDate}
              </p>
            </div>

            <div className="certificate-modal-actions">
              <button
                className="continue-btn"
                onClick={() =>
                  handlePrintCertificate(
                    selectedCertificate
                  )
                }
              >
                🖨️ Download / Print Certificate
              </button>

              <button
                className="continue-btn"
                onClick={handleCloseCertificate}
              >
                ✕ Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default MyCertificates;
