import config from "config";
import { PostDocument } from "interfaces";
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
  post: any | PostDocument;
  latestPosts: any[]; // The interface is broken by graphql
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

type Params = {
  params: {
    filename: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const relativePath = params.filename + ".md";

  const post = await client.queries.post({ relativePath });

  const latestPosts = await client.queries.postConnection({
    last: config.latest_posts_per_page,
  });

  return {
    props: {
      post: post.data.post,
      latestPosts: latestPosts.data.postConnection.edges?.map(
        (edge) => edge?.node
      ),
    },
  };
}

export async function getStaticPaths() {
  const postListResponse = await client.queries.postConnection();

  const paths = postListResponse.data.postConnection.edges?.map((page) => ({
    params: {
      filename: page?.node?._sys.filename.toString(),
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
}

export default Post;
