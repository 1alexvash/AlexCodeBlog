import { PostDocumentWithoutBody } from "interfaces";

import PostCard from "./PostCard";

interface Props {
  posts: PostDocumentWithoutBody[];
}

const Posts = ({ posts }: Props) => (
  <ul className="posts-list">
    {posts.map((post) => (
      <PostCard key={post.title} post={post} />
    ))}
  </ul>
);

export default Posts;
