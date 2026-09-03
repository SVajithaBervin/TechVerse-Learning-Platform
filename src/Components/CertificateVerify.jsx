import { useState } from "react";

function CertificateVerify() {
  const [certificateId, setCertificateId] = useState("");
  const [certificate, setCertificate] = useState(null);
  const [message, setMessage] = useState("");

  const handleVerify = (e) => {
    e.preventDefault();

    const enteredId = certificateId.trim();

    if (!enteredId) {
      setCertificate(null);
      setMessage("Please enter your certificate ID");
      return;
    }

    const savedCertificates = JSON.parse(
      localStorage.getItem("techverseCertificates") || "[]"
    );

    const foundCertificate = savedCertificates.find(
      (item) =>
        item.certificateId?.toLowerCase() === enteredId.toLowerCase()
    );

    if (foundCertificate) {
      setCertificate(foundCertificate);
      setMessage("");
    } else {
      setCertificate(null);
      setMessage("Certificate Not Found");
    }
  };

  const handleClear = () => {
    setCertificateId("");
    setCertificate(null);
    setMessage("");
  };

  return (
    <section className="certificate-verify" id="certificate-verification">
      <div className="certificate-verify-container">
        <div className="certificate-verify-header">
          <span className="section-badge">Certificate Verification</span>

          <h2>Verify Your TechVerse Certificate</h2>

          <p>
            Enter a TechVerse certificate ID to verify the certificate
            details and authenticity.
          </p>
        </div>

        <form className="certificate-search-box" onSubmit={handleVerify}>
          <label htmlFor="certificateId">Certificate ID</label>

          <div className="certificate-input-row">
            <input
              id="certificateId"
              type="text"
              placeholder="Enter certificate ID"
              value={certificateId}
              onChange={(e) => {
                setCertificateId(e.target.value);
                setCertificate(null);
                setMessage("");
              }}
            />

            <button type="submit" className="verify-btn">
              Verify Certificate
            </button>
          </div>
        </form>

        {message && (
          <div
            className={`verification-message ${
              message === "Certificate Not Found"
                ? "verification-error"
                : "verification-warning"
            }`}
          >
            {message}
          </div>
        )}

        {certificate && (
          <div className="verification-success">
            <div className="verification-title">
              <span className="verification-check">✓</span>

              <div>
                <h3>Certificate Verified</h3>
                <p>This certificate is successfully verified.</p>
              </div>
            </div>

            <div className="verification-details">
              <div className="verification-detail">
                <span>Student Name</span>
                <strong>{certificate.studentName}</strong>
              </div>

              {certificate.email && (
                <div className="verification-detail">
                  <span>Email</span>
                  <strong>{certificate.email}</strong>
                </div>
              )}

              <div className="verification-detail">
                <span>Course</span>
                <strong>{certificate.course}</strong>
              </div>

              <div className="verification-detail">
                <span>Certificate ID</span>
                <strong>{certificate.certificateId}</strong>
              </div>

              <div className="verification-detail">
                <span>Score</span>
                <strong>{certificate.score}</strong>
              </div>

              <div className="verification-detail">
                <span>Percentage</span>
                <strong>{certificate.percentage}%</strong>
              </div>

              <div className="verification-detail">
                <span>Grade</span>
                <strong>{certificate.grade}</strong>
              </div>

              {certificate.recognition && (
                <div className="verification-detail">
                  <span>Recognition</span>
                  <strong>{certificate.recognition}</strong>
                </div>
              )}

              <div className="verification-detail">
                <span>Issue Date</span>
                <strong>{certificate.issueDate}</strong>
              </div>
            </div>

            <div className="verification-status">
              <span>✓</span>
              <p>
                This certificate has been issued by TechVerse based on
                the recorded assessment result.
              </p>
            </div>
          </div>
        )}

        {(certificate || message) && (
          <button
            type="button"
            className="clear-verification-btn"
            onClick={handleClear}
          >
            Clear
          </button>
        )}

        <div className="verification-note">
          <strong>Note:</strong> Certificate verification currently uses
          the TechVerse browser-based certificate records stored in
          localStorage. A secure backend verification system can be
          added in a future version.
        </div>
      </div>
    </section>
  );
}

export default CertificateVerify;
