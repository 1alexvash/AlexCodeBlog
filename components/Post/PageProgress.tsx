import { useEffect, useRef } from "react";

const PageProgress = () => {
  const progressBarRef = useRef() as React.MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    const calculateScrollProgress = () => {
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollTop =
        (document.documentElement.scrollTop || document.body.scrollTop) /
        scrollHeight;
      const percentage = Math.round(scrollTop * 100);

      progressBarRef.current.style.setProperty(
        "width",
        percentage > 100 ? "100%" : percentage + "%"
      );
    };

    document.addEventListener("scroll", calculateScrollProgress);

    return () => {
      document.removeEventListener("scroll", calculateScrollProgress);
    };
  }, []);

  return (
    <div
      className="page-progress"
      style={{
        position: "sticky",
        top: -0.25, // Fix for gap pixel on Chrome with slight zoom
      }}
    >
      <div
        ref={progressBarRef}
        className="progress-bar"
        style={{
          width: 0,
          transition: "width 200ms",
        }}
      />
    </div>
  );
};

export default PageProgress;
