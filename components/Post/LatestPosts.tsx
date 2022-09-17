import Link from "next/link";
import { Post } from "pages";
import { useAppDispatch } from "redux/typesHooks";

import { updateTags } from "../../redux/slices/selectedTags";
interface Props {
  latestPosts: Post[];
}

const LatestPosts = ({ latestPosts }: Props) => {
  const dispatch = useAppDispatch();

  return (
    <div className="related-posts">
      <h2>Latest posts</h2>
      {latestPosts.map((post) => (
        <div className="related-posts-block" key={post.title}>
          <Link href={post.slug}>
            <a className="image">
              <img src={post.featuredImage} alt="feature" />
            </a>
          </Link>
          <div className="inner">
            <Link href={post.slug}>
              <a className="name">{post.title}</a>
            </Link>
            <div className="tags">
              {post.tags.map((tag) => (
                <Link href={"/"} key={tag}>
                  <a
                    href=""
                    key={tag}
                    onClick={() => dispatch(updateTags([tag]))}
                  >
                    #{tag}
                  </a>
                </Link>
              ))}
            </div>
          </div>
        </div>
      ))}

      <Link href="/">
        <a className="btn">See all posts</a>
      </Link>
    </div>
  );
};

export default LatestPosts;
