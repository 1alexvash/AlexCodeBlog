import config from "config";
import { PostDocumentWithoutContent } from "interfaces";
import type { NextPage } from "next";
import Head from "next/head";
import { useAppSelector } from "redux/typesHooks";
import { useTina } from "tinacms/dist/react";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Intro from "@/components/Intro";
import Pagination from "@/components/Pagination";
import Posts from "@/components/Posts";
import StandWithUkraine from "@/components/StandWithUkraine";
import Tags from "@/components/Tags";

import client from ".tina/__generated__/client";
import { PostQuery, PostQueryVariables } from ".tina/__generated__/types";

const Home: NextPage<{
  posts: PostDocumentWithoutContent[];
  tinaData: PostQuery;
  query: string;
  variables: PostQueryVariables;
}> = ({ posts, tinaData, query, variables }) => {
  const { data } = useTina({
    query: query,
    variables: variables,
    data: tinaData,
  });

  console.log(data);
  const tags = posts.map((post) => post.tags).flat();

  const tagsFrequency = tags.reduce((acc, tag) => {
    if (acc[tag]) {
      acc[tag] += 1;
    } else {
      acc[tag] = 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const sortedTags = Object.entries(tagsFrequency).sort((a, b) => b[1] - a[1]);

  const uniqueSortedTags = sortedTags.map((tag) => tag[0]);

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
        <meta name="description" content={config.site_description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <StandWithUkraine />
      <Header />
      <Intro />
      <section className="simple-section">
        <div className="container">
          {/* TODO: Implement tags count for the admin user */}
          <Tags uniqueTags={uniqueSortedTags} />
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
  const pageResponse = await client.queries.main_page({
    relativePath: "mainPage.md",
  });

  return {
    props: {
      posts: posts.data.postConnection.edges
        ?.map((edge) => edge?.node)
        .reverse(),
      tinaData: pageResponse.data,
      query: pageResponse.query,
      variables: pageResponse.variables,
    },
  };
};

export default Home;
