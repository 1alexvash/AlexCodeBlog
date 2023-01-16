import { PostDocumentWithoutContent } from "interfaces";

import PostCard from "./PostCard";

interface Props {
  posts: PostDocumentWithoutContent[];
}

const UpcomingPosts = ({ posts }: Props) => (
  <div className="upcoming-posts-block">
    <div className="upcoming-posts-title">
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
