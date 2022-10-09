import config from "config";
import {
  getAllPostDocuments,
  getPostDocumentBySlug,
} from "helpers/markdownDocumentsReader";
import markdownToHtml from "helpers/markdownToHtml";
import { PostDocument, PostDocumentWithoutContent } from "interfaces";
import type { NextPage } from "next";
import Head from "next/head";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import BreadCrumbs from "@/components/Post/BreadCrumbs";
import LatestPosts from "@/components/Post/LatestPosts";
import PageProgress from "@/components/Post/PageProgress";
import PostContent from "@/components/Post/PostContent";
import StandWithUkraine from "@/components/StandWithUkraine";

const Post: NextPage<{
  post: PostDocument;
  latestPosts: PostDocumentWithoutContent[];
}> = ({ post, latestPosts }) => (
  <>
    <Head>
      <title>{post.title}</title>
      <meta name="description" content={config.site_description} />
      <meta property="og:description" content={config.site_description} />
      <meta property="og:url" content={config.host_url} />
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

const today = new Date();

export async function getStaticProps({ params }: Params) {
  const postDocument = getPostDocumentBySlug(params.slug);
  const content = await markdownToHtml(postDocument.content || "");
  const post = {
    ...postDocument,
    content,
  };
  const tenLatestPosts = getAllPostDocuments()
    .slice(0, 10)
    .filter((item) => today.toISOString() >= item.date);

  return {
    props: {
      post,
      latestPosts: tenLatestPosts,
    },
  };
}

export async function getStaticPaths() {
  const postDocuments = getAllPostDocuments();

  return {
    paths: postDocuments.map(({ slug }) => {
      return {
        params: {
          slug,
        },
      };
    }),
    fallback: "blocking",
  };
}

export default Post;
