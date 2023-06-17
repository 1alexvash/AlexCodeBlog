import config from "config";
import { PostDocumentWithoutBody } from "interfaces";
import type { NextPage } from "next";
import Head from "next/head";
import { useAppSelector } from "redux/typesHooks";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Intro from "@/components/Intro";
import Pagination from "@/components/Pagination";
import Posts from "@/components/Posts";
import StandWithUkraine from "@/components/StandWithUkraine";
import Tags, { TagData } from "@/components/Tags";

import client from ".tina/__generated__/client";

const initialTagsFrequency: Readonly<Record<string, number>> = {};

const calculateSortedTags = (
  posts: PostDocumentWithoutBody[]
): readonly TagData[] => {
  const tagsFrequency = posts
    .map((post) => post.tags)
    .flat()
    .reduce((acc, tag) => {
      if (acc[tag]) {
        return { ...acc, [tag]: acc[tag] + 1 };
      }

      return { ...acc, [tag]: 1 };
    }, initialTagsFrequency);

  return Object.entries(tagsFrequency)
    .sort((a, b) => b[1] - a[1])
    .map(([tagName, postsCount]) => ({ tagName, postsCount }));
};

const Home: NextPage<{
  posts: PostDocumentWithoutBody[];
}> = ({ posts }) => {
  const selectedTags = useAppSelector((state) => state.selectedTags);
  const currentPage = useAppSelector((state) => state.pagination.currentPage);

  const sortedTags = calculateSortedTags(posts);

  const filteredPosts = posts.filter((post) => {
    if (selectedTags.length === 0) {
      return true;
    }

    return selectedTags.some((tag) => post.tags.includes(tag));
  });

  const pagesCount = Math.ceil(filteredPosts.length / config.posts_per_page);
  const postsToRender = filteredPosts.slice(
    currentPage * config.posts_per_page,
    (currentPage + 1) * config.posts_per_page
  );

  return (
    <>
      <Head>
        <title>{config.site_title}</title>
        <meta property="og:title" content={config.site_keywords[1]} />
        <meta property="og:description" content={config.site_description} />
        <meta property="og:url" content={config.host_url} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={config.site_title} />
        <meta property="og:image" content={config.defaultImage} />
        <meta name="description" content={config.site_description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <StandWithUkraine />
      <Header />
      <Intro />
      <section className="simple-section">
        <div className="container">
          <Tags sortedTags={sortedTags} />
          <Posts posts={postsToRender} />
          <Pagination pagesCount={pagesCount} />
        </div>
      </section>
      <Footer />
    </>
  );
};

export const getStaticProps = async () => {
  const posts = await client.queries.postConnection({});

  return {
    props: {
      posts: posts.data.postConnection.edges
        ?.map((edge) => edge?.node)
        .reverse(),
    },
  };
};

export default Home;
