import { Box, Divider, List, Typography } from "@mui/material";
import { PostDocumentWithoutBody } from "interfaces";

import PostCard from "./PostCard";

interface Props {
  posts: PostDocumentWithoutBody[];
}

const UpcomingPosts = ({ posts }: Props) => (
  <Box sx={{ mb: 17.5 }}>
    <Box>
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
    </Box>
    <List className="posts-list">
      {posts.map((post, index) => (
        <PostCard key={index} post={post} />
      ))}
    </List>
    <Divider sx={{ position: "absolute", width: "100%", left: 0 }} />
  </Box>
);

export default UpcomingPosts;
