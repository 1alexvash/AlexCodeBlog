import config from "config";
import {
  isPostADraft,
  isPostInTheFuture,
} from "helpers/checkOfDraftOrFuturePost";
import getFirstParagraph from "helpers/getFirstParagraph";
import toHumanReadableDate from "helpers/toHumanReadableDate";
import { PostDocument } from "interfaces";
import Head from "next/head";
import { useEffect, useRef } from "react";
import { TinaMarkdown } from "tinacms/dist/rich-text";

import renderCopyButtons from "../../helpers/renderCopyButtons";
import { DraftPostMark, FuturePostMark } from "../PostCard";

interface Props {
  post: PostDocument;
}

const PostContent = ({ post }: Props) => {
  console.log("post:", post);
  const description = getFirstParagraph("");
  const document = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return renderCopyButtons(document);
  }, [post.body]);

  return (
    <article className="blogpost-content">
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={config.site_description} />
        <meta property="og:title" content={post.title} />
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
          src={post.featuredImage ?? "/post-images/draft.webp"}
          alt="blog post image"
          width={790}
          height={394}
          style={{
            filter:
              isPostADraft(post) || isPostInTheFuture(post)
                ? "grayscale(50%)"
                : "none",
            borderRadius: "3px",
          }}
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
      {/* <div ref={document} dangerouslySetInnerHTML={{ __html: post.content }} /> */}

      {/* <Reactions /> This future might be added later */}
      <TinaMarkdown content={post.body} />
    </article>
  );
};

export default PostContent;
