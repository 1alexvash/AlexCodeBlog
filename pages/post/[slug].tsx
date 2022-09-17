import config from "config";
import {
  getAllPosts,
  getPostBySlug,
  markdownToHtml,
} from "helpers/contentRender";
import type { NextPage } from "next";
import Head from "next/head";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import BreadCrumbs from "@/components/Post/BreadCrumbs";
import LatestPosts from "@/components/Post/LatestPosts";
import PageProgress from "@/components/Post/PageProgress";
import PostContent from "@/components/Post/PostContent";
import StandWithUkraine from "@/components/StandWithUkraine";

import { Post as PostI } from "../index";

export interface PostInterfaceWithContent extends PostI {
  content: string;
}

interface Props {
  post: PostInterfaceWithContent;
  latestPosts: PostI[];
}

const Post: NextPage<Props> = ({ latestPosts, post }: Props) => (
  <>
    <Head>
      <title>{post.title}</title>
      <meta name="description" content={config.site_description} />
      <meta property="og:description" content={config.site_description} />
      <meta property="og:url" content={config.site_url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={config.site_title} />
      <meta property="og:image" content={config.defaultImage} />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <StandWithUkraine />
    <Header />
    <BreadCrumbs />
    <PageProgress />
    <section className="blogpost-section">
      <div className="container">
        <div className="blogpost-outer">
          <PostContent post={post} />
          <LatestPosts latestPosts={latestPosts} />
        </div>
      </div>
      {/* <CommentsSection /> This feature not used, and needed for the time being */}
    </section>
    <Footer />
  </>
);

type Params = {
  params: {
    slug: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const latestPosts = getAllPosts([
    "slug",
    "title",
    "featuredImage",
    "date",
    "draft",
    "tags",
  ])
    .filter((post: PostI) => post.draft === false && post.slug !== params.slug)
    .slice(0, 10);

  const post = getPostBySlug(params.slug, [
    "slug",
    "title",
    "featuredImage",
    "date",
    "draft",
    "tags",
    "content",
  ]);
  const content = await markdownToHtml(post.content || "");

  return {
    props: {
      latestPosts,
      post: {
        ...post,
        content,
      },
    },
  };
}

export async function getStaticPaths() {
  const posts: {
    slug: string;
  }[] = getAllPosts(["slug"]);

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}

export default Post;
