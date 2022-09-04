import { Post } from "pages";

import PostCard from "./PostCard";

interface Props {
  posts: Post[];
}

const Posts = ({ posts }: Props) => (
  <ul className="posts-list">
    {posts.map((post, index) => (
      <PostCard key={index} post={post} />
    ))}
  </ul>
);

export default Posts;
