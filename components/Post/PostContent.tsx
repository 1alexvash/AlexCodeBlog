import config from 'config';
import { toHumanReadableDate } from 'helpers';
import Head from 'next/head';
import { PostInterfaceWithContent } from 'pages/post/[slug]';
interface Props {
  post: PostInterfaceWithContent;
}

const PostContent = ({ post }: Props) => (
  <article className='blogpost-content'>
    <Head>
      <title>{post.title}</title>
      <meta name='description' content={config.site_description} />
      <meta property='og:title' content={config.page_content[0]} />
    </Head>
    <div className='blogpost-image'>
      <img src={post.featuredImage} alt='post' />
    </div>
    <div className='blogpost-date'>
      <span>{toHumanReadableDate(post.date)}</span>
    </div>
    <h1>{post.title}</h1>

    <div className='tags'>
      {post.tags.map((tag) => (
        <a href='' key={tag}>
          #{tag}
        </a>
      ))}
    </div>

    <div dangerouslySetInnerHTML={{ __html: post.content }} />

    {/* <Reactions /> This future might be added later */}
  </article>
);

export default PostContent;
