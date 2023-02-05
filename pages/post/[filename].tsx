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

import { client } from "../../.tina/__generated__/client";

const Post: NextPage<{
  post: PostDocument;
  tinaPost: any;
  latestPosts: PostDocumentWithoutContent[];
}> = ({ post, tinaPost, latestPosts }) => {
  // TODO: Might need to reimplement code to TinaMarkdown component
  console.log("post:", post);
  console.log("tinaPost:", tinaPost);
  return (
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
      <BreadCrumbs title={post.title} />
      <PageProgress />
      <section className="blogpost-section">
        <div className="container">
          <div className="blogpost-outer">
            <PostContent post={post} />
            <LatestPosts latestPosts={latestPosts} />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

type Params = {
  params: {
    filename: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const tinaPost = await client.queries.post({
    relativePath: params.filename + ".md",
  });

  const postDocument = getPostDocumentBySlug(params.filename);

  const content = await markdownToHtml(postDocument.content || "");
  const post = {
    ...postDocument,
    content,
  };
  const tenLatestPosts = getAllPostDocuments().slice(0, 10);

  return {
    props: {
      post,
      tinaPost: tinaPost.data.post,
      latestPosts: tenLatestPosts,
    },
  };
}

export async function getStaticPaths() {
  const postListResponse = await client.queries.postConnection();

  const paths = postListResponse.data.postConnection.edges?.map((page) => ({
    params: {
      filename: page?.node?._sys.filename,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
}

export default Post;
