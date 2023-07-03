import { Box, Divider, List, Skeleton, Typography } from "@mui/material";
import { UpcomingPostsType } from "pages";

import PostCard from "./PostCard";

interface Props {
  posts: UpcomingPostsType;
}

interface SkeletonsListProps {
  listsToRender: number;
}

const SkeletonsList = ({ listsToRender }: SkeletonsListProps) => {
  return (
    <>
      {Array(listsToRender)
        .fill(1)
        .map((_, index) => (
          <Skeleton
            variant="rectangular"
            width={378}
            height={378}
            sx={{ margin: "0 10px 30px" }}
            key={index}
          />
        ))}
    </>
  );
};

const PostsList = ({ posts }: Props): JSX.Element => {
  if (!posts) {
    return <SkeletonsList listsToRender={3} />;
  }

  if (posts.length === 0) {
    return (
      <Typography variant="h6" sx={{ display: "block", margin: "0 auto" }}>
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
      <PostsList posts={posts} />
    </List>
    <Divider sx={{ position: "absolute", width: "100%", left: 0 }} />
  </Box>
);

export default UpcomingPosts;
