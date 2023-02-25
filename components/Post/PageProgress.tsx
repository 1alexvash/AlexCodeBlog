import { useEffect, useRef } from "react";

const PageProgress = () => {
  const progressBarRef = useRef() as React.MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    // get scroll progres percentage
    const getScrollPercentage = () => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      return (scrollTop / (scrollHeight - clientHeight)) * 100;
    };

    // track in react
    const handleScroll = () => {
      const scrollPercentage = getScrollPercentage();
      progressBarRef.current.style.width = `${scrollPercentage}%`;
    };

    // add event listener
    document.addEventListener("scroll", handleScroll);

    // remove event listener
    return () => document.removeEventListener("scroll", handleScroll);
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
          transition: "100ms",
        }}
      />
    </div>
  );
};

export default PageProgress;
