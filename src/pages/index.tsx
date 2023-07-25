import getFirstParagraph from "helpers/getFirstParagraph";
import { PostDocumentWithoutBody } from "interfaces";
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { setHostUrl } from "redux/slices/hostUrl";
import { setTinaData } from "redux/slices/tinaData";
import { useAppDispatch, useAppSelector } from "redux/typesHooks";
import Footer from "src/components/Footer";
import Header from "src/components/Header";
import Intro from "src/components/Intro";
import Pagination from "src/components/Pagination";
import Posts from "src/components/Posts";
import StandWithUkraine from "src/components/StandWithUkraine";
import Tags, { Tag } from "src/components/Tags";
import UpcomingPosts from "src/components/UpcomingPosts";
import useIsomorphicLayoutEffect from "src/components/useIsomorphicLayoutEffect";
import { useEditState, useTina } from "tinacms/dist/react";

import client from ".tina/__generated__/client";
import {
  MainConfigQuery,
  MainConfigQueryVariables,
} from ".tina/__generated__/types";

interface Props {
  posts: PostDocumentWithoutBody[];
  tinaData: MainConfigQuery;
  query: string;
  variables: MainConfigQueryVariables;
}

export type UpcomingPostsType = PostDocumentWithoutBody[] | undefined;

const initialTagCount: Record<string, number> = {};
const postsPerRequestThreshold = 999;

const calculateSortedTags = (posts: PostDocumentWithoutBody[]): Tag[] => {
  const tags = posts.map((post) => post.tags).flat();

  const tagsFrequency = tags.reduce((acc, tag) => {
    if (acc[tag]) {
      return { ...acc, [tag]: acc[tag] + 1 };
    }

    return { ...acc, [tag]: 1 };
  }, initialTagCount);

  return Object.entries(tagsFrequency)
    .map(([name, postsCount]) => ({
      name,
      postsCount,
    }))
    .sort((a, b) => b.postsCount - a.postsCount);
};

const fetchUpcomingPosts = async (): Promise<UpcomingPostsType> => {
  const upcomingPostsResponse = await fetch("/api/getUpcomingPosts");

  if (!upcomingPostsResponse.ok) {
    throw new Error(`HTTP error! status: ${upcomingPostsResponse.status}`);
  }

  return await upcomingPostsResponse.json();
};

const Home: NextPage<Props> = ({ posts, query, tinaData, variables }) => {
  const dispatch = useAppDispatch();
  const [upcomingPosts, setUpcomingPosts] = useState<UpcomingPostsType>();

  const { edit } = useEditState();

  const { data } = useTina({
    query,
    variables,
    data: tinaData,
  });

  useEffect(() => {
    if (!edit) {
      return;
    }

    fetchUpcomingPosts()
      .then(setUpcomingPosts)
      .catch((error) => {
        console.error(
          "An error occurred while fetching the upcoming posts: ",
          error
        );
      });
  }, [edit]);

  const siteDescription = getFirstParagraph(data.mainConfig.siteDescription);

  const selectedTags = useAppSelector((state) => state.selectedTags);
  const currentPage = useAppSelector((state) => state.pagination.currentPage);
  const nextPage = currentPage + 1;

  const tags = calculateSortedTags(posts);

  const filteredPosts = posts.filter((post) => {
    if (selectedTags.length === 0) {
      return true;
    }

    return selectedTags.some((tag) => post.tags.includes(tag));
  });

  const pagesCount = Math.ceil(
    filteredPosts.length / data.mainConfig.postsPerPage
  );

  const postsToRender = filteredPosts.slice(
    currentPage * data.mainConfig.postsPerPage,
    nextPage * data.mainConfig.postsPerPage
  );

  useIsomorphicLayoutEffect(() => {
    dispatch(setHostUrl(window.location.origin));
    dispatch(setTinaData(data));
  }, []);

  const hostURLLink = useAppSelector((state) => state.hostUrl);

  return (
    <>
      <Head>
        <title>{data.mainConfig.siteTitle}</title>
        <meta property="og:title" content={data.mainConfig.ogSiteTitle} />
        <meta property="og:description" content={siteDescription} />
        <meta property="og:url" content={hostURLLink} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={data.mainConfig.siteTitle} />
        <meta property="og:image" content={data.mainConfig.defaultImage} />
        <meta name="description" content={siteDescription} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <StandWithUkraine />
      <Header />
      <Intro
        authorName={data.mainConfig.authorName}
        authorPosition={data.mainConfig.authorPosition}
        siteDescription={data.mainConfig.siteDescription}
      />
      <section className="simple-section">
        <div className="container">
          {edit && <UpcomingPosts posts={upcomingPosts} />}
          <Tags tags={tags} />
          <Posts posts={postsToRender} />
          <Pagination pagesCount={pagesCount} />
        </div>
      </section>
      <Footer />
    </>
  );
};

export const getStaticProps = async () => {
  const posts = await client.queries.postsWithoutBody({
    filter: {
      draft: { eq: false },
      date: { before: new Date(Date.now()).toString() },
    },
    first: postsPerRequestThreshold,
  });

  const mainConfig = await client.queries.mainConfig({
    relativePath: "mainConfig.json",
  });

  return {
    props: {
      posts: posts.data.postConnection.edges
        ?.map((edge) => edge?.node)
        .reverse(),
      tinaData: mainConfig.data,
      query: mainConfig.query,
      variables: mainConfig.variables,
    },
  };
};

export default Home;
