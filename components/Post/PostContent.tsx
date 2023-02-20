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
      <div ref={document} dangerouslySetInnerHTML={{ __html: post.content }} />

      {/* <Reactions /> This future might be added later */}
    </article>
  );
};

export default PostContent;
