import {
  isPostADraft,
  isPostInTheFuture,
} from "helpers/checkOfDraftOrFuturePost";
import { PostDocumentWithoutContent } from "interfaces";
import Image from "next/image";
import Link from "next/link";
import { useAppDispatch } from "redux/typesHooks";

import { setTags } from "../redux/slices/selectedTags";

interface Props {
  post: PostDocumentWithoutContent;
}

export const DraftPostMark = () => (
  <div className="drt-post">
    <div className="trn-drt trn trn-i">
      <span className="trn-txt-drt trn-txt">draft</span>
    </div>
    <div className="sm-trns-drt">
      <div className="sm-trns-i-drt-first trn sm-trns-i-drt sm-trns-i"></div>
      <div className="sm-trns-i-drt-sec trn sm-trns-i-drt sm-trns-i"></div>
    </div>
  </div>
);

export const FuturePostMark = () => (
  <div className="fut-post">
    <div className="trn-fut trn trn-i">
      <span className="trn-txt-fut trn-txt">future</span>
      <span className="trn-txt-fut-post trn-txt"> post</span>
    </div>
    <div className="sm-trns-fut">
      <div className="sm-trns-i-fut-first trn sm-trns-i-fut sm-trns-i"></div>
      <div className="sm-trns-i-fut-sec trn sm-trns-i-fut sm-trns-i"></div>
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

  const classNameOfPost =
    isPostADraft(post) === true || isPostInTheFuture(post) === true
      ? "posts-list-block posts-list-block-drt-or-fut"
      : "posts-list-block";

  return (
    <li>
      {isPostADraft(post) && <DraftPostMark />}
      {isPostInTheFuture(post) && <FuturePostMark />}

      <div className={classNameOfPost}>
        <div className="content">
          <Link href={`/post/${post.slug}`}>
            <a className="post-img">
              <Image
                src={
                  post.featuredImage
                    ? post.featuredImage
                    : "/post-images/draft.webp"
                }
                alt="blog post image"
                layout="fill"
                objectFit="cover"
                placeholder="blur"
                blurDataURL={`data:image/svg+xml;base64,${toBase64(
                  shimmer(378, 378)
                )}`}
                style={
                  isPostADraft(post) || isPostInTheFuture(post)
                    ? { filter: "grayscale(50%)" }
                    : {}
                }
              />
            </a>
          </Link>
          <div className="tags">
            {post.tags.map((tag) => (
              <Link href="/" key={tag}>
                <a
                  href=""
                  key={tag}
                  onClick={(event) => {
                    event.preventDefault();
                    dispatch(setTags([tag]));
                  }}
                >
                  #{tag}
                </a>
              </Link>
            ))}
          </div>
          <Link href={`/post/${post.slug}`}>
            <a className="link">{post.title}</a>
          </Link>
        </div>
      </div>
    </li>
  );
};

export default PostCard;
