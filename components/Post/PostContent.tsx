import { toHumanReadableDate } from "helpers";
import { PostInterfaceWithContent } from "pages/post/[slug]";

interface Props {
  post: PostInterfaceWithContent;
}

const PostContent = ({ post }: Props) => (
  <article className="blogpost-content">
    <div className="blogpost-image">
      <img src="/images/blogpost-pic.jpg" alt="" />
    </div>
    <div className="blogpost-date">
      <span>{toHumanReadableDate(post.date)}</span>
    </div>
    <h1>{post.title}</h1>

    <div className="tags">
      {post.tags.map((tag) => (
        <a href="" key={tag}>
          #{tag}
        </a>
      ))}
    </div>

    <div className="max-w-2xl mx-auto">
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>

    {/* <Reactions /> This future might be added later */}
  </article>
);

export default PostContent;
