import { List } from "@mui/material";
import { UpcomingPostsType } from "pages";

import PostCard from "./PostCard";
import EmptyPostsMessage from "./UpcomingPosts/EmptyPosts";
import SkeletonsList from "./UpcomingPosts/Skeletons";

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
