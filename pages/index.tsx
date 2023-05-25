import { PostDocumentWithoutBody } from "interfaces";
import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { setHostUrl } from "redux/slices/hostUrl";
import { setTinaData } from "redux/slices/tinaData";
import { useAppDispatch, useAppSelector } from "redux/typesHooks";
import { useTina } from "tinacms/dist/react";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Intro from "@/components/Intro";
import Pagination from "@/components/Pagination";
import Posts from "@/components/Posts";
import StandWithUkraine from "@/components/StandWithUkraine";
import Tags from "@/components/Tags";
import useIsomorphicLayoutEffect from "@/components/useIsomorphicLayoutEffect";

import client from ".tina/__generated__/client";
import {
  Main_ConfigQuery,
  Main_ConfigQueryVariables,
} from ".tina/__generated__/types";

interface HomeProps {
  posts: PostDocumentWithoutBody[];
  tinaData: Main_ConfigQuery;
  query: string;
  variables: Main_ConfigQueryVariables;
}

const Home: NextPage<HomeProps> = ({ posts, query, tinaData, variables }) => {
  const dispatch = useAppDispatch();

  const { data } = useTina({
    query: query,
    variables: variables,
    data: tinaData,
  });

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

  const pagesCount = Math.ceil(
    filteredPosts.length / data.main_config.posts_per_page
  );
  const currentPage = useAppSelector((state) => state.pagination.currentPage);
  const postsToRender = filteredPosts.slice(
    currentPage * data.main_config.posts_per_page,
    (currentPage + 1) * data.main_config.posts_per_page
  );

  useIsomorphicLayoutEffect(() => {
    dispatch(setHostUrl(window.location.origin));
    dispatch(setTinaData(data));
  }, []);

  const hostUrl = useAppSelector((state) => state.hostUrl.link);
  return (
    <>
      <Head>
        <title>{data.main_config.site_title}</title>
        <meta property="og:title" content={data.main_config.site_keywords[1]} />
        <meta
          property="og:description"
          content={data.main_config.site_description}
        />
        <meta property="og:url" content={hostUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={data.main_config.site_title} />
        <meta property="og:image" content={data.main_config.default_image} />
        <meta name="description" content={data.main_config.site_description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <StandWithUkraine />
      <Header />
      <Intro
        author_name={data.main_config.author_name}
        author_position={data.main_config.author_position}
        site_description={data.main_config.site_description}
      />
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

  const pageResponse = await client.queries.main_config({
    relativePath: "main-config.json",
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
