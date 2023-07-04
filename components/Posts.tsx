import { PostDocumentWithoutBody } from "interfaces";
import SkeletonsList from "./UpcomingPosts/Skeletons";
import { List, Typography } from "@mui/material";
import PostCard from "./PostCard";
import EmptyPostsMessage from "./UpcomingPosts/EmptyPosts";
import { UpcomingPostsType } from "pages";

interface Props {
  posts: UpcomingPostsType;
  skeletonsToRender?: number;
}

const Posts = ({ posts, skeletonsToRender = 0 }: Props) => {
  if (!posts) {
    return <SkeletonsList skeletonsToRender={skeletonsToRender} />;
  }

  if (posts.length === 0) {
    return <EmptyPostsMessage />;
  }

  return (
    <List className="posts-list">
      {posts.map((post, index) => (
        <PostCard key={index} post={post} />
      ))}
    </List>
  );
};

export default Posts;
