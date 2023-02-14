import { useEffect, useRef } from "react";

const PageProgress = () => {
  const progressBarRef = useRef() as React.MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    const { innerWidth } = window;

    const calculateScrollProgress = () => {
      let percentage =
        ((document.body.scrollTop || document.documentElement.scrollTop) /
          (document.documentElement.scrollHeight -
            document.documentElement.clientHeight -
            (innerWidth > 828 ? 81 : 181))) *
        100;

      progressBarRef.current.style.setProperty(
        "width",
        percentage > 100 ? "100" : percentage + "%"
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
          transition: "100ms",
        }}
      />
    </div>
  );
};

export default PageProgress;
