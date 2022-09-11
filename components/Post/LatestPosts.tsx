import Link from "next/link";
import { Post } from "pages";

interface Props {
  latestPosts: Post[];
}

const LatestPosts = ({ latestPosts }: Props) => (
  <div className="related-posts">
    <h2>Latest posts</h2>
    {latestPosts.map((post) => (
      <div className="related-posts-block" key={post.title}>
        <Link href={post.slug}>
          <a className="image">
            <img src={post.featuredImage} alt="" />
          </a>
        </Link>
        <div className="inner">
          <Link href={post.slug}>
            <a className="name">{post.title}</a>
          </Link>
          <div className="tags">
            {post.tags.map((tag) => (
              <a href="" key={tag}>
                #{tag}
              </a>
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

export default LatestPosts;
