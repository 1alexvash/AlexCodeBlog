import config from "config";
import toHumanReadableDate from "helpers/toHumanReadableDate";
import { PostDocument } from "interfaces";
import Head from "next/head";
import Image from "next/image";
interface Props {
  post: PostDocument;
}

const getFirstParagraph = (str: string) => {
  const openedElement = str.indexOf("<p>") + 3;
  const closedElement = str.indexOf("</p>");

  return str.slice(openedElement, closedElement);
};

const PostContent = ({ post }: Props) => {
  const description = getFirstParagraph(post.content);

  return (
    <article className="blogpost-content">
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={config.site_description} />
        <meta property="og:title" content={config.site_keywords[0]} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={config.host_url} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content={config.site_title} />
        <meta property="og:image" content={post.featuredImage} />
      </Head>

      <div className="blogpost-image">
        <img
          src={post.featuredImage ?? "/post-images/placeholder.png"}
          alt="blog post image"
          width="100%"
          height="100%"
        />
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
};

export default PostContent;
