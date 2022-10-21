import { PostDocumentWithoutContent } from "interfaces";
import Image from "next/image";
import Link from "next/link";
import { useAppDispatch } from "redux/typesHooks";

import { setTags } from "../redux/slices/selectedTags";
interface Props {
  post: PostDocumentWithoutContent;
}

const DraftPost = () => {
  return (
    <div className="draft-post">
      <div className="triangle-draft triangle triangle-item">
        <span className="triangle-text-draft triangle-text">DRAFT</span>
      </div>
      <div className="small-triagles-draft">
        <div className="small-triagles-item-draft1 triangle small-triagles-item-draft small-triagles-item"></div>
        <div className="small-triagles-item-draft2 triangle small-triagles-item-draft small-triagles-item"></div>
      </div>
    </div>
  );
};

const FuturePost = () => {
  return (
    <div className="future-post">
      <div className="triangle-future triangle triangle-item">
        <span className="triangle-text-future triangle-text">FUTURE</span>
        <span className="triangle-text-future-post triangle-text"> POST</span>
      </div>
      <div className="small-triagles-future">
        <div className="small-triagles-item-future1 triangle small-triagles-item-future small-triagles-item"></div>
        <div className="small-triagles-item-future2 triangle small-triagles-item-future small-triagles-item"></div>
      </div>
    </div>
  );
};

const today = new Date();
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

  const isFuturePost = today.toISOString() > post.date ? false : true;
  const classNameOfPost =
    post.draft === true || isFuturePost === true
      ? "posts-list-block posts-list-block-draft-or-future"
      : "posts-list-block";
  return (
    <li>
      {post.draft ? <DraftPost /> : null}
      {isFuturePost ? <FuturePost /> : null}
      <div className={classNameOfPost}>
        <div className="content">
          <Link href={`/post/${post.slug}`}>
            <a className="post-img">
              <Image
                src={post.featuredImage ?? "/post-images/placeholder.png"}
                alt="blog post image"
                layout="fill"
                objectFit="cover"
                placeholder="blur"
                blurDataURL={`data:image/svg+xml;base64,${toBase64(
                  shimmer(378, 378)
                )}`}
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
