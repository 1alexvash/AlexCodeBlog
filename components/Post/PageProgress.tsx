import { useEffect, useRef } from "react";

const PageProgress = () => {
  const progressBarRef = useRef() as React.MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    const { innerWidth } = window;
    const heightOfMobileBar = 90;

    const footerHeight =
      document.getElementsByTagName("footer")[0].clientHeight;

    const calculateScrollProgress = () => {
      let percentage =
        ((document.body.scrollTop || document.documentElement.scrollTop) /
          (document.documentElement.scrollHeight -
            document.documentElement.clientHeight -
            (footerHeight + (innerWidth < 768 ? heightOfMobileBar : 0)))) *
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
