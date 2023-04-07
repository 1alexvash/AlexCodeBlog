import {
  isPostADraft,
  isPostInTheFuture,
} from "helpers/checkOfDraftOrFuturePost";
import { PostDocumentWithoutBody } from "interfaces";
import Image from "next/image";
import Link from "next/link";
import { useAppDispatch } from "redux/typesHooks";

import { setTags } from "../redux/slices/selectedTags";

interface Props {
  post: PostDocumentWithoutBody;
}

export const DraftPostMark = () => (
  <div className="draft-post">
    <div className="triangle triangle-draft  triangle-item">
      <span className="triangle-draft-text triangle-text">draft</span>
    </div>
  </div>
);

export const FuturePostMark = () => (
  <div className="future-post">
    <div className="triangle triangle-future  triangle-item">
      <span className="triangle-text-future triangle-text">future</span>
      <span className="triangle-text-future-post triangle-text"> post</span>
    </div>
  </div>
);

const shimmer = (width: number, height: number) => `
  <svg width="${width}" height="${height}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
      <linearGradient id="g">
        <stop stop-color="#444" offset="20%" />
        <stop stop-color="#333" offset="50%" />
        <stop stop-color="#444" offset="70%" />
      </linearGradient>
    </defs>
    <rect width="${width}" height="${height}" fill="#444" />
    <rect id="r" width="${width}" height="${height}" fill="url(#g)" />
    <animate xlink:href="#r" attributeName="x" from="-${width}" to="${width}" dur="3s" repeatCount="indefinite"  />
  </svg>
`;

const toBase64 = (str: string) => Buffer.from(str).toString("base64");

const PostCard = ({ post }: Props) => {
  const dispatch = useAppDispatch();

  return (
    <li>
      {isPostADraft(post) && <DraftPostMark />}
      {isPostInTheFuture(post) && <FuturePostMark />}

      <div
        className={`posts-list-block ${
          isPostADraft(post) || isPostInTheFuture(post)
            ? "posts-list-block-draft-or-future"
            : ""
        }`}
      >
        <div className="content">
          <Link href={`/post/${post._sys.filename}`} className="post-img">
            <Image
              src={post.heroImage ?? "/post-images/draft.webp"}
              alt="blog post image"
              placeholder="blur"
              blurDataURL={`data:image/svg+xml;base64,${toBase64(
                shimmer(378, 378)
              )}`}
              width="378"
              height="378"
              sizes="100vw"
              style={{
                filter:
                  isPostADraft(post) || isPostInTheFuture(post)
                    ? "grayscale(50%)"
                    : "none",

                objectFit: "cover",
              }}
            />
          </Link>
          <div className="tags">
            {post.tags.map((tag) => (
              <Link
                href="/"
                key={tag}
                onClick={(event) => {
                  event.preventDefault();
                  dispatch(setTags([tag]));
                }}
              >
                #{tag}
              </Link>
            ))}
          </div>
          <Link href={`/post/${post._sys.filename}`} className="link">
            {post.title}
          </Link>
        </div>
      </div>
    </li>
  );
};

export default PostCard;
