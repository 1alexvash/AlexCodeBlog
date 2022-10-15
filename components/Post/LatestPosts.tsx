import { PostDocumentWithoutContent } from "interfaces";
import Link from "next/link";
import { useAppDispatch } from "redux/typesHooks";

import { setTags } from "../../redux/slices/selectedTags";
interface Props {
  latestPosts: PostDocumentWithoutContent[];
}

const LatestPosts = ({ latestPosts }: Props) => {
  const dispatch = useAppDispatch();

  const resetTags = () => {
    dispatch(setTags([]));
  };

  return (
    <div className="related-posts">
      <h2>Latest posts</h2>
      {latestPosts.map((post) => (
        <div className="related-posts-block" key={post.title}>
          <Link href={post.slug}>
            <a className="image">
              <img
                src={post.featuredImage}
                alt="blog post image"
                width={102}
                height={102}
              />
            </a>
          </Link>
          <div className="inner">
            <Link href={post.slug}>
              <a className="name">{post.title}</a>
            </Link>
            <div className="tags">
              {post.tags.map((tag) => (
                <Link href="/" key={tag}>
                  <a href="" key={tag} onClick={() => dispatch(setTags([tag]))}>
                    #{tag}
                  </a>
                </Link>
              ))}
            </div>
          </div>
        </div>
      ))}

      <Link href="/">
        <a className="btn" onClick={resetTags}>
          See all posts
        </a>
      </Link>
    </div>
  );
};

export default LatestPosts;
