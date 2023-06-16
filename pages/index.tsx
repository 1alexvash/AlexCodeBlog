import { convertTypesAndGetEdges } from "helpers/getEdgeNodesHelpers";

import { PostDocumentWithoutBody } from "interfaces";
import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
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

import UpcomingPosts from "@/components/UpcomingPosts";

import client from ".tina/__generated__/client";
import {
  MainConfigQuery,
  MainConfigQueryVariables,
} from ".tina/__generated__/types";

const Home: NextPage<{
  homePagePosts: PostDocumentWithoutBody[];
  upcomingPosts: PostDocumentWithoutBody[];
  isEditorMode: boolean;
  tinaData: MainConfigQuery;
  query: string;
  variables: MainConfigQueryVariables;
}> = ({
  homePagePosts,
  isEditorMode,
  upcomingPosts,
  tinaData,
  query,
  variables,
}) => {
  const dispatch = useAppDispatch();

  const { data } = useTina({
    query,
    variables,
    data: tinaData,
  });

  const tags = homePagePosts.map((homePagePost) => homePagePost.tags).flat();

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
  const filteredPosts = homePagePosts.filter((homePagePost) => {
    if (selectedTags.length === 0) {
      return true;
    }

    return selectedTags.some((tag) => homePagePost.tags.includes(tag));
  });

  const pagesCount = Math.ceil(
    filteredPosts.length / data.mainConfig.postsPerPage
  );
  const currentPage = useAppSelector((state) => state.pagination.currentPage);
  const nextPage = currentPage + 1;

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
        <meta property="og:title" content={data.mainConfig.siteKeywords[0]} />
        <meta
          property="og:description"
          content={data.mainConfig.siteDescription}
        />
        <meta property="og:url" content={hostURLLink} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={data.mainConfig.siteTitle} />
        <meta property="og:image" content={data.mainConfig.defaultImage} />
        <meta name="description" content={data.mainConfig.siteDescription} />
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
          {/* TODO: Implement tags count for the admin user */}
          {isEditorMode && <UpcomingPosts posts={upcomingPosts} />}
          <Tags uniqueTags={uniqueSortedTags} />
          <Posts posts={postsToRender} />
          <Pagination pagesCount={pagesCount} />
        </div>
      </section>
      <Footer />
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const isEditorMode = context.draftMode || false;

  const homePagePosts = await client.queries.postsWithoutBody({
    filter: {
      draft: { eq: false },
    },
  });

  const upcomingDraftPosts = isEditorMode
    ? await client.queries.postsWithoutBody({
        filter: {
          draft: { eq: true },
        },
      })
    : [];

  const upcomingFuturePosts = isEditorMode
    ? await client.queries.postsWithoutBody({
        filter: {
          date: { after: new Date(Date.now()).toString() },
          draft: { eq: false },
        },
      })
    : [];

  const upcomingPosts: PostDocumentWithoutBody[] = Array.prototype
    .concat(
      convertTypesAndGetEdges(upcomingDraftPosts),
      convertTypesAndGetEdges(upcomingFuturePosts)
    )
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));

  const { data, query, variables } = await client.queries.mainConfig({
    relativePath: "mainConfig.json",
  });

  const mainConfig = await client.queries.mainConfig({
    relativePath: "mainConfig.json",
  });

  return {
    props: {
      homePagePosts: convertTypesAndGetEdges(homePagePosts),
      isEditorMode,
      upcomingPosts,
      tinaData: data,
      query,
      variables,
    },
  };
};

export default Home;
