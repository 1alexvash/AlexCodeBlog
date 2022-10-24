import config from "config";
import {
  isPostADraft,
  isPostInTheFuture,
} from "helpers/checkOfDraftOrFuturePost";
import toHumanReadableDate from "helpers/toHumanReadableDate";
import { PostDocument } from "interfaces";
import Head from "next/head";

import { DraftPostMark, FuturePostMark } from "../PostCard";

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
        {isPostADraft(post) ? <DraftPostMark /> : null}
        {isPostInTheFuture(post) === false ? <FuturePostMark /> : null}
        {post.featuredImage ? (
          <img
            src={post.featuredImage}
            alt="blog post image"
            className="gray-filter-for-img"
            width={790}
            height={394}
          />
        ) : (
          <div className="draft-img" style={{ height: "394px" }}>
            <h1 className="draft-img-text">draft</h1>
          </div>
        )}
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
