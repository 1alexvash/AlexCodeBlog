import { Box, Divider, Typography } from "@mui/material";
import Image from "next/image";
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

const UpcomingPostsTemplate = ({
  posts,
  sectionName,
  showStatisticsButton: statisticsButtonState = true,
}: UpcomingPostsTemplateProps) => {
  const { resolvedTheme } = useTheme();

  if (!resolvedTheme) {
    return null;
  }

  const lightIconPath =
    sectionName === "Scheduled"
      ? "/images/future-light.png"
      : "/images/draft-light.png";

  const darkIconPath =
    sectionName === "Scheduled"
      ? "/images/future-dark.png"
      : "/images/draft-dark.png";

  return (
    <Box sx={{ mb: "50px" }}>
      <Typography
        sx={(theme) => ({
          color: theme.palette.mode === "light" ? "#3a3a3a" : "white",
          lineHeight: 1.28,
          fontWeight: 700,
          fontSize: "43px",
          display: "flex",
          gap: "5px",
          mb: sectionName === "Scheduled" ? 0 : 4.5,
          ["@media (max-width: 480px)"]: {
            fontSize: "28px",
          },
        })}
      >
        <Image
          src={resolvedTheme === "light" ? darkIconPath : lightIconPath}
          alt="icon"
          width={48}
          height={48}
        />
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
