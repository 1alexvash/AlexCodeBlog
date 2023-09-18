import { Box, Divider, Typography } from "@mui/material";
import Posts from "../Posts";
import StatisticsReferenceButton from "../StatisticsReferenceButton";
import { UpcomingPostsTemplateProps, skeletonsCount } from ".";

export const UpcomingPostsTemplate = ({
  posts,
  sectionName,
}: UpcomingPostsTemplateProps) => {
  <Box sx={{ mb: "50px" }}>
    <Typography
      sx={(theme) => ({
        color: theme.palette.mode === "light" ? "#3a3a3a" : "white",
        lineHeight: 1.28,
        fontWeight: 700,
        fontSize: "43px",
        mb: 9,
        ["@media (max-width: 480px)"]: {
          fontSize: "28px",
        },
      })}
    >
      {sectionName}
    </Typography>
    <Posts posts={posts} skeletonsToRender={skeletonsCount} />
    <Box sx={{ display: "flex", justifyContent: "end" }}>
      <StatisticsReferenceButton />
    </Box>
    <Divider sx={{ position: "absolute", width: "100%", left: 0 }} />
  </Box>;
};
