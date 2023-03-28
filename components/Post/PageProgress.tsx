import { Box } from "@mui/material";
import useWindowDimensions from "helpers/useWindowDimensions";
import { useCallback, useEffect, useRef } from "react";

const chromeZoomPixelGapBugFix = -0.25;
const heightOfProgressBar = 10;

interface Props {
  blogPostSectionRef: React.RefObject<HTMLDivElement>;
}

const PageProgress = ({ blogPostSectionRef }: Props) => {
  const progressBarRef = useRef() as React.MutableRefObject<HTMLDivElement>;

  const calculateScrollProgress = useCallback(() => {
    const blogPostSection = blogPostSectionRef.current;

    if (!blogPostSection) return;

    const offsetHeight = blogPostSection.offsetHeight || 0;
    const offsetTop = blogPostSection.offsetTop || 0;
    const scrollHeight = offsetHeight - window.innerHeight;
    const scrollTop =
      (document.documentElement.scrollTop || document.body.scrollTop) -
      (offsetTop - heightOfProgressBar);
    const percentage = Math.round((scrollTop / scrollHeight) * 100);

    let width = percentage + "%";

    if (percentage > 100) {
      width = "100%";
    }

    if (percentage < 0) {
      width = "0%";
    }

    progressBarRef.current?.style.setProperty("width", width);
  }, [blogPostSectionRef]);

  useEffect(() => {
    document.addEventListener("scroll", calculateScrollProgress);

    return () => {
      document.removeEventListener("scroll", calculateScrollProgress);
    };
  }, [calculateScrollProgress]);

  useWindowDimensions(calculateScrollProgress);

  return (
    <Box
      sx={(theme) => ({
        position: "sticky",
        top: chromeZoomPixelGapBugFix,
        zIndex: 29,
        height: heightOfProgressBar,
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
