import { Box, Typography } from "@mui/material";
import config from "config";
import {
  isPostADraft,
  isPostInTheFuture,
} from "helpers/checkOfDraftOrFuturePost";
import getFirstParagraph from "helpers/getFirstParagraph";
import isUpcomingPost from "helpers/isUpcomingPost";
import toHumanReadableDate from "helpers/toHumanReadableDate";
import { PostDocument } from "interfaces";
import Head from "next/head";
import { useEffect, useRef } from "react";
import { Components, TinaMarkdown } from "tinacms/dist/rich-text";

import renderCopyButtons from "../../helpers/renderCopyButtons";
import Codeblock from "../Codeblock";
import { DraftPostMark, FuturePostMark } from "../PostCard";

interface Props {
  post: PostDocument;
}

interface CodeBlockTinaProps {
  lang: string;
  value: string;
}

interface ListItemTinaProps {
  children: JSX.Element;
}

interface ImgTinaProps {
  url: string;
  caption?: string;
  alt?: string;
}

interface CodeTinaProps {
  children: JSX.Element;
}

const codeBlockASTNodeName = "code_block";
const listItemASTNodeName = "li";
const imgASTNodeName = "img";
const codeASTNodeName = "code";

const components: Components<{
  [codeBlockASTNodeName]: CodeBlockTinaProps;
  [listItemASTNodeName]: ListItemTinaProps;
  [imgASTNodeName]: ImgTinaProps;
  [codeASTNodeName]: CodeTinaProps;
}> = {
  [codeBlockASTNodeName]: (props) => {
    if (!props) {
      return <></>;
    }

    return <Codeblock language={props.lang || ""} codeLines={props.value} />;
  },
  [listItemASTNodeName]: (props) => {
    if (!props) {
      return <></>;
    }

    return <li className="tina-list-item">{props.children}</li>;
  },
  [imgASTNodeName]: (props) => {
    if (!props) {
      return <></>;
    }

    return (
      <Box>
        <img src={props.url} alt={props.alt} />
        <Typography
          variant="caption"
          component="p"
          sx={(theme) => ({
            color: theme.palette.mode === "dark" ? "#dadada" : "#999999",

            textAlign: "center",
          })}
        >
          {props.caption}
        </Typography>
      </Box>
    );
  },
  [codeASTNodeName]: (props) => {
    if (!props) {
      return <></>;
    }

    return (
      <Box
        component="code"
        sx={(theme) => ({
          fontFamily: "monospace",
          backgroundColor:
            theme.palette.mode === "light"
              ? "rgba(9, 30, 66, 0.08)"
              : "rgba(161, 189, 217, 0.08)",
          borderRadius: "3px",
          padding: "4px",
          overflowWrap: "break-word",
          whiteSpace: "pre-wrap",
        })}
      >
        {props.children}
      </Box>
    );
  },
};

const PostContent = ({ post }: Props) => {
  const description = getFirstParagraph(post.body);
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
        <meta property="og:image" content={post.heroImage} />
      </Head>

      <div className="blogpost-image">
        {isPostADraft(post) && <DraftPostMark />}
        {isPostInTheFuture(post) && <FuturePostMark />}

        <img
          src={post.heroImage ?? "/post-images/draft.webp"}
          alt="blog post image"
          width={790}
          height={394}
          style={{
            filter: isUpcomingPost(post) ? "grayscale(50%)" : "none",
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
      {/* <Reactions /> This future might be added later */}
      <Box component="div" ref={document}>
        <TinaMarkdown content={post.body} components={components} />
      </Box>
    </article>
  );
};

export default PostContent;
