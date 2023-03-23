import { Box } from "@mui/material";
import { useEffect, useRef } from "react";

const chromeZoomPixelGapBugFix = -0.25;

interface PageProgressProp {
  blogPostSectionRef: React.RefObject<HTMLDivElement>;
}

const PageProgress = ({ blogPostSectionRef }: PageProgressProp) => {
  const progressBarRef = useRef() as React.MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    const blogPostSection = blogPostSectionRef.current;

    const { height } = blogPostSection!.getBoundingClientRect();
    const offsetTop = blogPostSection?.offsetTop || 0;

    console.log(height);
    console.log(offsetTop);

    const calculateScrollProgress = () => {
      const scrollHeight = height + offsetTop - window.innerHeight;
      const scrollTop =
        (document.documentElement.scrollTop || document.body.scrollTop) /
        scrollHeight;
      const percentage = Math.round(scrollTop * 100);

      progressBarRef.current?.style.setProperty(
        "width",
        percentage > 100 ? "100%" : percentage + "%"
      );
    };

    document.addEventListener("scroll", calculateScrollProgress);

    return () => {
      document.removeEventListener("scroll", calculateScrollProgress);
    };
  }, [blogPostSectionRef]);

  return (
    <Box
      sx={(theme) => ({
        position: "sticky",
        top: chromeZoomPixelGapBugFix,
        zIndex: 29,
        height: "10px",
        backgroundColor: theme.palette.mode === "light" ? "#f2f5f7" : "#33393f",
      })}
    >
      <Box
        ref={progressBarRef}
        sx={(theme) => ({
          display: "block",
          borderRadius: "1px",
          height: "100%",
          width: 0,
          transition: "width 200ms",
          backgroundColor:
            theme.palette.mode === "light" ? "#3a3a3a" : "#fe6c0a",
        })}
      />
    </Box>
  );
};

export default PageProgress;
