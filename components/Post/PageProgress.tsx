import { useEffect, useRef } from "react";

const PageProgress = () => {
  const progressBarRef = useRef() as React.MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    const calculateScrollProgress = () => {
      let percentage = (
        ((document.body.scrollTop || document.documentElement.scrollTop) /
          (document.documentElement.scrollHeight -
            document.documentElement.clientHeight)) *
        100
      ).toPrecision(3);

      progressBarRef.current.style.setProperty("width", percentage + "%");
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
