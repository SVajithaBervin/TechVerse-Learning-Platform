import { useEffect } from "react";

function Welcome() {
  useEffect(() => {
    document.title = "TechVerse - Learning & Online Assessment Platform";
  }, []);

  return null;
}

export default Welcome;
