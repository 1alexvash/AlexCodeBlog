import { Box, LinearProgress } from "@mui/material";
import { useEffect, useState } from "react";

const PageProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const calculateScrollProgress = () => {
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollTop =
        (document.documentElement.scrollTop || document.body.scrollTop) /
        scrollHeight;
      const percentage = Math.round(scrollTop * 100);

      setProgress(percentage);
    };

    document.addEventListener("scroll", calculateScrollProgress);

    return () => {
      document.removeEventListener("scroll", calculateScrollProgress);
    };
  }, []);

  return (
    <Box
      sx={{
        position: "sticky",
        top: -0.25, // Fix for gap pixel on Chrome with slight zoom
        zIndex: 29,
      }}
    >
      <LinearProgress variant="determinate" value={progress} />
    </Box>
  );
};

export default PageProgress;
