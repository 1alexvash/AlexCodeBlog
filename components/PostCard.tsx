import Image from 'next/image';
import Link from 'next/link';
import { Post } from 'pages';

interface Props {
  post: Post;
}

const PostCard = ({ post }: Props) => (
  <li>
    <div className='posts-list-block'>
      <div className='content'>
        <Link href={`/post/${post.slug}`} as={undefined}>
          <a className='post-img'>
            <Image
              src={post.featuredImage}
              layout='fill'
              alt='post-image'
              loading='lazy'
            />
          </a>
        </Link>
        <div className='tags'>
          {post.tags.map((tag) => (
            <a href='' key={tag}>
              #{tag}
            </a>
          ))}
        </div>
        <Link href={`/post/${post.slug}`}>
          <a className='link'>{post.title}</a>
        </Link>
      </div>
    </div>
  </li>
);

export default PostCard;
