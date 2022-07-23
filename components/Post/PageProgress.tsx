import { useEffect, useState } from "react";

const PageProgress = () => {
  const [width, setWidth] = useState(0);

  const scrollHeight = () => {
    const element = document.documentElement,
      ScrollTop = element.scrollTop || document.body.scrollTop,
      ScrollHeight = element.scrollHeight || document.body.scrollHeight;
    const percent = (ScrollTop / (ScrollHeight - element.clientHeight)) * 100;
    setWidth(percent);
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollHeight);
    return () => window.removeEventListener("scroll", scrollHeight);
  });

  return (
    <div
      className="page-progress"
      style={{
        position: "sticky",
        top: -0.5, // Fix for gap pixel on Chrome with slight zoom
        transition: "300ms",
      }}
    >
      <div
        className="progress-bar"
        style={{ width: width + "%", transition: "0.3s" }}
      />
    </div>
  );
};

export default PageProgress;
