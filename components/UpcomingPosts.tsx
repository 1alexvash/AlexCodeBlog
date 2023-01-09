import { PostDocumentWithoutContent } from "interfaces";

import PostCard from "./PostCard";

interface Props {
  posts: PostDocumentWithoutContent[];
}

const UpcomingPosts = ({ posts }: Props) => (
  <div style={{ marginBottom: "70px" }}>
    <div className="intro-text" style={{ marginBottom: "36px" }}>
      <h1>Upcoming Posts</h1>
    </div>
    <ul className="posts-list">
      {posts.map((post, index) => (
        <PostCard key={index} post={post} />
      ))}
    </ul>
    <hr />
  </div>
);

export default UpcomingPosts;
