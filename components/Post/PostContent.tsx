import config from "config";
import toHumanReadableDate from "helpers/toHumanReadableDate";
import { PostDocument } from "interfaces";
import Head from "next/head";
import { useEffect, useRef } from "react";

interface Props {
  post: PostDocument;
}

const getFirstParagraph = (str: string) => {
  const openedElement = str.indexOf("<p>") + 3;
  const closedElement = str.indexOf("</p>");

  return str.slice(openedElement, closedElement);
};

{
  /* <button class="btn" type="button">
<div class="btn_squares_div">
  <div class="btn_square1 btn_squares"></div>
  <div class="btn_square2 btn_squares"></div>
</div>
<span class="btn_text">Copy</span>
</button>; */
}

const createCopyButton = (): HTMLButtonElement => {
  const button = document.createElement("button");
  const buttonSquaresDiv = document.createElement("div");
  const buttonSquare1 = document.createElement("div");
  const buttonSquare2 = document.createElement("div");
  const buttonText = document.createElement("span");

  button.classList.add("btn_copy");
  button.setAttribute("type", "button");
  buttonSquaresDiv.classList.add("btn_copy_squares_div");
  buttonSquare1.classList.add("btn_copy_square1", "btn_copy_squares");
  buttonSquare2.classList.add("btn_copy_square2", "btn_copy_squares");
  buttonText.classList.add("btn_copy_text");
  buttonText.innerHTML = "Copy";

  button.appendChild(buttonSquaresDiv);
  buttonSquaresDiv.append(buttonSquare1, buttonSquare2);
  button.append(buttonText);

  return button;
};

const PostContent = ({ post }: Props) => {
  const description = getFirstParagraph(post.content);
  const doc = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const codeBlocks = doc.current?.querySelectorAll("div.remark-highlight");

    if (codeBlocks === undefined) {
      return;
    }

    codeBlocks.forEach((item) => {
      if (item.childNodes.length === 2) {
        return;
      }

      item.prepend(createCopyButton());
    });
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
        <img
          src={post.featuredImage}
          alt="blog post image"
          width={790}
          height={394}
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
      <div
        ref={doc}
        onClick={(e) => {
          const target = e.target;

          if (
            target instanceof HTMLButtonElement ||
            target instanceof HTMLSpanElement
          ) {
            navigator.clipboard.writeText(
              target.parentElement?.childNodes[1].textContent ?? " "
            );
          } else if (target instanceof HTMLDivElement) {
            navigator.clipboard.writeText(
              target.parentElement?.parentElement?.childNodes[1].textContent ??
                " "
            );
          }
        }}
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* <Reactions /> This future might be added later */}
    </article>
  );
};

export default PostContent;
