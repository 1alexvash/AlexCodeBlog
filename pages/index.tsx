import config from 'config';
import { getAllPosts } from 'helpers/contentRender';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useAppSelector } from 'redux/typesHooks';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Intro from '@/components/Intro';
import Pagination from '@/components/Pagination';
import Posts from '@/components/Posts';
import StandWithUkraine from '@/components/StandWithUkraine';
import Tags from '@/components/Tags';

export type Post = {
  slug: string;
  title: string;
  date: string;
  featuredImage: string;
  draft: boolean;
  tags: string[];
};

type Props = {
  posts: Post[];
};

const Home: NextPage<Props> = ({ posts }: Props) => {
  const uniqueTags = Array.from(
    new Set([...posts.map((post) => post.tags).flat()]),
  );

  const selectedTags = useAppSelector((state) => state.selectedTags);
  const filteredPosts = posts.filter((post) => {
    if (selectedTags.length === 0) {
      return true;
    }

    return selectedTags.some((tag) => post.tags.includes(tag));
  });

  const pagesCount = Math.ceil(filteredPosts.length / config.posts_per_page);
  const currentPage = useAppSelector((state) => state.pagination.currentPage);
  const postsToRender = filteredPosts.slice(
    currentPage * config.posts_per_page,
    (currentPage + 1) * config.posts_per_page,
  );

  return (
    <>
      <Head>
        <title>{config.site_title}</title>
        <meta name='description' content={config.site_description} />
        <meta property='og:title' content={config.page_content[1]} />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <StandWithUkraine />
      <Header />
      <Intro />
      <section className='simple-section'>
        <div className='container'>
          <Tags uniqueTags={uniqueTags} />
          <Posts posts={postsToRender} />
          <Pagination pagesCount={pagesCount} />
        </div>
      </section>
      <Footer />
    </>
  );
};

export const getStaticProps = async () => {
  const posts = getAllPosts([
    'slug',
    'title',
    'featuredImage',
    'date',
    'draft',
    'tags',
  ]).filter((post: Post) => post.draft === false);

  return {
    props: { posts },
  };
};

export default Home;
