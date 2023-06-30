import { PostDocumentWithoutBody } from "interfaces";
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
import Tags, { Tag } from "@/components/Tags";
import UpcomingPosts from "@/components/UpcomingPosts";
import useIsomorphicLayoutEffect from "@/components/useIsomorphicLayoutEffect";

import {
  MainConfigQuery,
  MainConfigQueryVariables,
} from ".tina/__generated__/types";

interface Props {
  homePagePosts: PostDocumentWithoutBody[];
  tinaData: MainConfigQuery;
  query: string;
  variables: MainConfigQueryVariables;
  upcomingPosts?: PostDocumentWithoutBody[];
  isEditorMode?: boolean;
}

const initialTagCount: Record<string, number> = {};

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

const HomePage = ({
  homePagePosts,
  tinaData,
  query,
  variables,
  upcomingPosts,
  isEditorMode,
}: Props) => {
  const dispatch = useAppDispatch();

  const { data } = useTina({
    query,
    variables,
    data: tinaData,
  });
  const tags = calculateSortedTags(homePagePosts);

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
        <meta property="og:title" content={data.mainConfig.ogSiteTitle} />
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
          {isEditorMode && <UpcomingPosts posts={upcomingPosts ?? []} />}
          <Tags tags={tags} />
          <Posts posts={postsToRender} />
          <Pagination pagesCount={pagesCount} />
        </div>
      </section>
      <Footer />
    </>
  );
};

export default HomePage;
