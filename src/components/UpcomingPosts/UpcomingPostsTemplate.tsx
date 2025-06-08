import { Box, Divider, Typography } from "@mui/material";
import { useTheme } from "next-themes";
import { UpcomingPostsType } from "src/pages";

import Posts from "../Posts";
import StatisticsReferenceButton from "../StatisticsReferenceButton";
import { skeletonsCount } from ".";

interface UpcomingPostsTemplateProps {
  posts: UpcomingPostsType;
  sectionName: "Drafts" | "Scheduled";
  showStatisticsButton?: boolean;
}

const icons = {
  clockLight: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      fill="#000000"
      width="36"
      height="36"
    >
      <path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120l0 136c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2 280 120c0-13.3-10.7-24-24-24s-24 10.7-24 24z" />
    </svg>
  ),
  clockDark: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      fill="#FFFFFF"
      width="36"
      height="36"
    >
      <path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120l0 136c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2 280 120c0-13.3-10.7-24-24-24s-24 10.7-24 24z" />
    </svg>
  ),
  notesLight: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
      fill="#000000"
      width="36"
      height="36"
    >
      <path d="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l224 0 0-112c0-26.5 21.5-48 48-48l112 0 0-224c0-35.3-28.7-64-64-64L64 32zM448 352l-45.3 0L336 352c-8.8 0-16 7.2-16 16l0 66.7 0 45.3 32-32 64-64 32-32z" />
    </svg>
  ),
  notesDark: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
      fill="#FFFFFF"
      width="36"
      height="36"
    >
      <path d="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l224 0 0-112c0-26.5 21.5-48 48-48l112 0 0-224c0-35.3-28.7-64-64-64L64 32zM448 352l-45.3 0L336 352c-8.8 0-16 7.2-16 16l0 66.7 0 45.3 32-32 64-64 32-32z" />
    </svg>
  ),
};

const UpcomingPostsTemplate = ({
  posts,
  sectionName,
  showStatisticsButton: statisticsButtonState = true,
}: UpcomingPostsTemplateProps) => {
  const { resolvedTheme } = useTheme();

  if (!resolvedTheme) {
    return null;
  }

  const isLight = resolvedTheme === "light";

  const IconComponent =
    sectionName === "Scheduled"
      ? isLight
        ? icons.clockLight
        : icons.clockDark
      : isLight
      ? icons.notesLight
      : icons.notesDark;

  return (
    <Box sx={{ mb: "50px" }}>
      <Typography
        sx={(theme) => ({
          color: theme.palette.mode === "light" ? "#3a3a3a" : "white",
          lineHeight: 1.28,
          fontWeight: 700,
          fontSize: "43px",
          display: "flex",
          gap: "8px",
          alignItems: "center",
          mb: sectionName === "Scheduled" ? 0 : 4.5,
          ["@media (max-width: 480px)"]: {
            fontSize: "28px",
          },
        })}
      >
        <IconComponent />
        {sectionName}
      </Typography>
      <Posts posts={posts} skeletonsToRender={skeletonsCount} />
      <Box
        sx={{
          display: statisticsButtonState ? "flex" : "none",
          justifyContent: "end",
        }}
      >
        <StatisticsReferenceButton />
      </Box>
      <Divider sx={{ position: "absolute", width: "100%", left: 0 }} />
    </Box>
  );
};

export default UpcomingPostsTemplate;
