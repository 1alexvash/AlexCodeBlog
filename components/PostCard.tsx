import { PostDocumentWithoutContent } from "interfaces";
import Link from "next/link";
import { useAppDispatch } from "redux/typesHooks";

import { setTags } from "../redux/slices/selectedTags";
import DraftImg from "./DraftImg";
interface Props {
  post: PostDocumentWithoutContent;
}

export const DraftPostMark = () => {
  return (
    <div className="draft-post">
      <div className="triangle-draft triangle triangle-item">
        <span className="triangle-text-draft triangle-text">draft</span>
      </div>
      <div className="small-triangles-draft">
        <div className="small-triangles-item-draft-first triangle small-triangles-item-draft small-triangles-item"></div>
        <div className="small-triangles-item-draft-second triangle small-triangles-item-draft small-triangles-item"></div>
      </div>
    </div>
  );
};

export const FuturePostMark = () => {
  return (
    <div className="future-post">
      <div className="triangle-future triangle triangle-item">
        <span className="triangle-text-future triangle-text">future</span>
        <span className="triangle-text-future-post triangle-text"> post</span>
      </div>
      <div className="small-triangles-future">
        <div className="small-triangles-item-future-first triangle small-triangles-item-future small-triangles-item"></div>
        <div className="small-triangles-item-future-second triangle small-triangles-item-future small-triangles-item"></div>
      </div>
    </div>
  );
};

const PostCard = ({ post }: Props) => {
  const dispatch = useAppDispatch();

  return (
    <li>
      <DraftPostMark />
      <FuturePostMark />
      <div className="posts-list-block posts-list-block-draft-or-future">
        <div className="content">
          <Link href={`/post/${post.slug}`} as={undefined}>
            <a className="post-img">
              {post.featuredImage ? (
                <img
                  src={post.featuredImage}
                  alt="blog post image"
                  className="gray-filter-for-img"
                />
              ) : (
                <DraftImg height="100%" />
              )}
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
