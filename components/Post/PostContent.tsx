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
      <span>12/12/2021 14:45</span>
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
      <div
        // className={markdownStyles['markdown']}
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </div>

    <div className="blogpost-options">
      <a href="" className="share">
        <img width={20} height={20} src="/images/share.png" alt="" />
        Share
      </a>
      <div className="viewed">
        <img width={20} height={20} src="/images/eye.png" alt="" />
        12587
      </div>
      <div className="blogpost-liked">
        <a href="" className="like active">
          <img width={20} height={20} src="/images/like.png" alt="" />
          874
        </a>
        <a href="" className="dislike">
          <img width={20} height={20} src="/images/dislike.png" alt="" />3
        </a>
      </div>
    </div>
  </article>
);

export default PostContent;
