import { Box } from "@mui/material";
import useWindowDimensions from "helpers/useWindowDimensions";
import { useCallback, useEffect, useRef } from "react";

export const chromeZoomPixelGapBugFix = -0.25;
export const progressBarHeight = 10;
const minDocumentHeight = 1030;
const minScrollHeightValue = 1;

interface PageProgressWrapperProps {
  children?: React.ReactNode;
}

interface PageProgressProps {
  blogPostSectionRef: React.RefObject<HTMLDivElement>;
}

export const PageProgressWrapper = ({ children }: PageProgressWrapperProps) => (
  <Box
    sx={(theme) => ({
      position: "sticky",
      top: chromeZoomPixelGapBugFix,
      zIndex: 29,
      height: progressBarHeight,
      backgroundColor: theme.palette.mode === "light" ? "#f2f5f7" : "#33393f",
    })}
  >
    {children}
  </Box>
);

const PageProgress = ({ blogPostSectionRef }: PageProgressProps) => {
  const progressBarRef = useRef() as React.MutableRefObject<HTMLDivElement>;

  const { width, height } = useWindowDimensions();

  const calculateScrollProgress = useCallback(() => {
    const blogPostSection = blogPostSectionRef.current;

    if (!blogPostSection) return;

    const offsetHeight = blogPostSection.offsetHeight || 0;
    const offsetTop = blogPostSection.offsetTop || 0;
    const scrollHeight =
      offsetHeight - window.innerHeight < 0
        ? minScrollHeightValue
        : offsetHeight - window.innerHeight;

    const minHeightThreshold =
      document.documentElement.offsetHeight > minDocumentHeight
        ? offsetTop - progressBarHeight
        : 0;

    const scrollTop =
      (document.documentElement.scrollTop || document.body.scrollTop) -
      minHeightThreshold;
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
    calculateScrollProgress();
  }, [calculateScrollProgress, width, height]);

  useEffect(() => {
    document.addEventListener("scroll", calculateScrollProgress);

    return () => {
      document.removeEventListener("scroll", calculateScrollProgress);
    };
  }, [calculateScrollProgress]);

  return (
    <PageProgressWrapper>
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
    </PageProgressWrapper>
  );
};

export default PageProgress;
