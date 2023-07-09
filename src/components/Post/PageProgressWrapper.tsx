import { Box } from "@mui/material";

const chromeZoomPixelGapBugFix = -0.25;
export const progressBarHeight = 10;

interface Props {
  children?: React.ReactNode;
}

const PageProgressWrapper = ({ children }: Props) => (
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

export default PageProgressWrapper;
