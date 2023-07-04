import { Box, Divider, List, Typography } from "@mui/material";
import { UpcomingPostsType } from "pages";

import PostCard from "../PostCard";
import SkeletonsList from "./Skeletons";

interface Props {
  posts: UpcomingPostsType;
}

const skeletonsCount = 3;

const PostsList = ({ posts }: Props): JSX.Element => {
  if (!posts) {
    return <SkeletonsList skeletonsToRender={skeletonsCount} />;
  }

  if (posts.length === 0) {
    return (
      <Typography
        variant="h6"
        sx={{ display: "block", margin: "0 auto", mb: "30px" }}
      >
        There are no Upcoming posts yet...
      </Typography>
    );
  }

  return (
    <>
      {posts.map((post, index) => (
        <PostCard key={index} post={post} />
      ))}
    </>
  );
};

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
    <List className="posts-list">
      <PostsList posts={posts} />
    </List>
    <Divider sx={{ position: "absolute", width: "100%", left: 0 }} />
  </Box>
);

export default UpcomingPosts;
