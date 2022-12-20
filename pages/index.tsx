import config from "config";
import { getCookie } from "cookies-next";
import {
  isPostADraft,
  isPostInTheFuture,
} from "helpers/checkOfDraftOrFuturePost";
import { getAllPostDocuments } from "helpers/markdownDocumentsReader";
import { PostDocumentWithoutContent } from "interfaces";
import type { NextPage } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useAppSelector } from "redux/typesHooks";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Intro from "@/components/Intro";
import Pagination from "@/components/Pagination";
import Posts from "@/components/Posts";
import StandWithUkraine from "@/components/StandWithUkraine";
import Tags from "@/components/Tags";

const UpcomingPosts = dynamic(() => import("@/components/UpcomingPosts"), {
  ssr: false,
});

const admin = getCookie("admin");

const Home: NextPage<{ posts: PostDocumentWithoutContent[] }> = ({ posts }) => {
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
  const filteredUpcomingPosts = posts.filter((post) => {
    if (isPostADraft(post) || isPostInTheFuture(post)) {
      return true;
    }
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
        <meta property="og:image" content={config.defaultImage} />
        <meta name="description" content={config.site_description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <StandWithUkraine />
      <Header />
      <Intro />
      <section className="simple-section">
        <div className="container">
          {admin ? <UpcomingPosts posts={filteredUpcomingPosts} /> : null}
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
  const posts = getAllPostDocuments();

  return {
    props: {
      posts,
    },
  };
};

export default Home;
