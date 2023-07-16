import { Box, Divider, Typography } from "@mui/material";
import { UpcomingPostsType } from "src/pages";

import Posts from "../Posts";
import StatisticsReferenceButton from "../StatisticsReferenceButton";

interface Props {
  posts: UpcomingPostsType;
}

const skeletonsCount = 3;

const UpcomingPosts = ({ posts }: Props) => (
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
      Upcoming Posts
    </Typography>
    <Posts posts={posts} skeletonsToRender={skeletonsCount} />
    <Box sx={{ display: "flex", justifyContent: "end" }}>
      <StatisticsReferenceButton />
    </Box>
    <Divider sx={{ position: "absolute", width: "100%", left: 0 }} />
  </Box>
);

export default UpcomingPosts;
