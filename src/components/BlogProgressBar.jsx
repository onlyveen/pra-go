import { useEffect, useState } from "react";

const BlogProgressBar = ({ targetRef }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const target = targetRef.current;
      if (!target) return;

      const { top, height } = target.getBoundingClientRect();
      const scrolled = window.scrollY - (top + window.scrollY) + window.innerHeight * 0.5;
      const total = height - window.innerHeight * 0.5;
      const pct = total > 0 ? (scrolled / total) * 100 : 0;

      setProgress(Math.min(100, Math.max(0, pct)));
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, [targetRef]);

  return (
    <div className="blog-progress-bar">
      <div className="blog-progress-bar-fill" style={{ width: `${progress}%` }} />
    </div>
  );
};

export default BlogProgressBar;
