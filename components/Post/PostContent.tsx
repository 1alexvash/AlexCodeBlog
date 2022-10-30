import config from "config";
import {
  isPostADraft,
  isPostInTheFuture,
} from "helpers/checkOfDraftOrFuturePost";
import toHumanReadableDate from "helpers/toHumanReadableDate";
import { PostDocument } from "interfaces";
import Head from "next/head";
import { useEffect, useRef } from "react";

import renderCopyButtons from "../../helpers/renderCopyButtons";

import { DraftPostMark, FuturePostMark } from "../PostCard";
interface Props {
  post: PostDocument;
}

const getFirstParagraph = (string: string) => {
  const openedElement = string.indexOf("<p>") + 3;
  const closedElement = string.indexOf("</p>");

  return string.slice(openedElement, closedElement);
};

const PostContent = ({ post }: Props) => {
  const description = getFirstParagraph(post.content);
  const document = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return renderCopyButtons(document);
  }, [post.content]);

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
        {isPostADraft(post) && <DraftPostMark />}
        {isPostInTheFuture(post) && <FuturePostMark />}

        <img
          src={
            post.featuredImage ? post.featuredImage : "/post-images/draft.webp"
          }
          alt="blog post image"
          width={790}
          height={394}
          style={
            isPostADraft(post) || isPostInTheFuture(post)
              ? { filter: "grayscale(50%)", borderRadius: "3px" }
              : //Added borderRadius, because it haven't been working
                {}
          }
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
      <div ref={document} dangerouslySetInnerHTML={{ __html: post.content }} />

      {/* <Reactions /> This future might be added later */}
    </article>
  );
};

export default PostContent;
