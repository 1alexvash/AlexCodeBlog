import config from "config";
import { convertTypesAndGetEdges } from "helpers/getEdgeNodesHelpers";
import { PostDocumentWithoutBody } from "interfaces";
import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useAppSelector } from "redux/typesHooks";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Intro from "@/components/Intro";
import Pagination from "@/components/Pagination";
import Posts from "@/components/Posts";
import StandWithUkraine from "@/components/StandWithUkraine";
import Tags from "@/components/Tags";
import UpcomingPosts from "@/components/UpcomingPosts";

import client from ".tina/__generated__/client";

const Home: NextPage<{
  mainPagePosts: PostDocumentWithoutBody[];
  upcomingDraftPosts: PostDocumentWithoutBody[];
  upcomingFuturePosts: PostDocumentWithoutBody[];
  isEditorMode: boolean;
}> = ({
  mainPagePosts,
  isEditorMode,
  upcomingDraftPosts,
  upcomingFuturePosts,
}) => {
  const tags = mainPagePosts.map((mainPagePost) => mainPagePost.tags).flat();

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
  const filteredPosts = mainPagePosts.filter((mainPagePost) => {
    if (selectedTags.length === 0) {
      return true;
    }

    return selectedTags.some((tag) => mainPagePost.tags.includes(tag));
  });

  const pagesCount = Math.ceil(filteredPosts.length / config.posts_per_page);
  const currentPage = useAppSelector((state) => state.pagination.currentPage);
  const postsToRender = filteredPosts.slice(
    currentPage * config.posts_per_page,
    (currentPage + 1) * config.posts_per_page
  );
  const upcomingPosts: PostDocumentWithoutBody[] = Array.prototype
    .concat(upcomingDraftPosts, upcomingFuturePosts)
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));

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
  const isEditorMode = context.preview || false;

  const mainPagePosts = await client.queries.postsWithoutBody({
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

  return {
    props: {
      mainPagePosts: convertTypesAndGetEdges(mainPagePosts),
      isEditorMode,
      upcomingDraftPosts: convertTypesAndGetEdges(upcomingDraftPosts),
      upcomingFuturePosts: convertTypesAndGetEdges(upcomingFuturePosts),
    },
  };
};

export default Home;
