import Image from "next/image";
import Link from "next/link";
import { Post } from "pages";
import { useAppDispatch } from "redux/typesHooks";

import { updateTags } from "../redux/slices/selectedTags";
interface Props {
  post: Post;
}

const PostCard = ({ post }: Props) => {
  const dispatch = useAppDispatch();
  const dispatchTags = (event: React.MouseEvent, tag: string) => {
    event.preventDefault();
    dispatch(updateTags([tag]));
  };

  return (
    <li>
      <div className="posts-list-block">
        <div className="content">
          <Link href={`/post/${post.slug}`} as={undefined}>
            <a className="post-img">
              <Image
                src={post.featuredImage}
                layout="fill"
                alt="blog post image"
                priority
              />
            </a>
          </Link>
          <div className="tags">
            {post.tags.map((tag) => (
              <a
                href=""
                key={tag}
                onClick={(event) => dispatchTags(event, tag)}
              >
                #{tag}
              </a>
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
