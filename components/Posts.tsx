import { PostDocumentWithoutContent } from "interfaces";

import PostCard from "./PostCard";

interface Props {
  posts: PostDocumentWithoutContent[];
}

const date = new Date();

const Posts = ({ posts }: Props) => {
  const sortedPostsByDate = (
    posts: PostDocumentWithoutContent[]
  ): PostDocumentWithoutContent[] => {
    const sortedPosts = posts.reduce(
      (previousValue = [], item: PostDocumentWithoutContent) => {
        if (date.toISOString() >= item.date) {
          previousValue.push(item);
        }
        return previousValue;
      },
      []
    );
    return sortedPosts;
  };

  const sortedPosts = sortedPostsByDate(posts);

  return (
    <ul className="posts-list">
      {sortedPosts.map((post, index) => (
        <PostCard key={index} post={post} />
      ))}
    </ul>
  );
};

export default Posts;
