import getFirstParagraph from "helpers/getFirstParagraph";
import { PostDocumentWithoutBody } from "interfaces";
import type { NextPage } from "next";
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

const Home: NextPage<Props> = ({ posts, query, tinaData, variables }) => {
  const dispatch = useAppDispatch();

  const { data } = useTina({
    query,
    variables,
    data: tinaData,
  });

  const siteDescription = getFirstParagraph(data.mainConfig.siteDescription);

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
        <meta property="og:title" content={data.mainConfig.ogTitle} />
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
