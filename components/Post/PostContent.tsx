import config from "config";
import toHumanReadableDate from "helpers/toHumanReadableDate";
import Head from "next/head";
import { PostInterfaceWithContent } from "pages/post/[slug]";
interface Props {
  post: PostInterfaceWithContent;
}

const PostContent = ({ post }: Props) => (
  <article className="blogpost-content">
    <Head>
      <title>{post.title}</title>
      <meta name="description" content={config.site_description} />
      <meta property="og:title" content={config.site_keywords[0]} />
      <meta property="og:description" content={config.site_description} />
      <meta property="og:url" content={config.host_url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={config.site_title} />
      <meta property="og:image" content={config.defaultImage} />
    </Head>
    <div className="blogpost-image">
      <img src={post.featuredImage} alt="blog post image" />
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

    <div dangerouslySetInnerHTML={{ __html: post.content }} />

    {/* <Reactions /> This future might be added later */}
  </article>
);

export default PostContent;
