import Image from "next/image";
import Link from "next/link";

interface Props {
  post: {
    title: string;
    image: string;
    tags: string[];
  };
}

const PostCard = ({ post }: Props) => (
  <li>
    <div className="posts-list-block">
      <div className="content">
        <Link href="/post">
          <a className="post-img">
            <Image src={post.image} layout="fill" alt="" priority />
          </a>
        </Link>
        <div className="tags">
          {post.tags.map((tag) => (
            <a href="" key={tag}>
              #{tag}
            </a>
          ))}
        </div>
        <Link href="/post">
          <a className="link">{post.title}</a>
        </Link>
      </div>
    </div>
  </li>
);

export default PostCard;
