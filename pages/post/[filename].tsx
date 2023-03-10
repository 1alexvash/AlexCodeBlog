import config from "config";
import Head from "next/head";
import { useTina } from "tinacms/dist/react";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import BlogPostSectionWrapper from "@/components/Post/BlogPostSectionWrapper";
import BreadCrumbs from "@/components/Post/BreadCrumbs";
import LatestPosts from "@/components/Post/LatestPosts";
import PageProgress from "@/components/Post/PageProgress";
import PostContent from "@/components/Post/PostContent";
import StandWithUkraine from "@/components/StandWithUkraine";

import { client } from "../../.tina/__generated__/client";

interface Props {
  data: any;
  query: any;
  variables: any;
  latestPosts: any[]; // The interface is broken by graphql
}

const Post = ({ latestPosts, ...props }: Props) => {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  return (
    <>
      <Head>
        <title>{data.post.title}</title>
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
      <BreadCrumbs title={data.post.title} />
      <PageProgress />
      <BlogPostSectionWrapper>
        <PostContent post={data.post} />
        <LatestPosts latestPosts={latestPosts} />
      </BlogPostSectionWrapper>
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
  const relativePath = params.filename + ".md";

  const postResponse = await client.queries.post({ relativePath });

  const latestPosts = await client.queries.postConnection({
    last: config.latest_posts_per_page,
  });

  return {
    props: {
      post: postResponse.data.post,
      latestPosts: latestPosts.data.postConnection.edges?.map(
        (edge) => edge?.node
      ),

      data: postResponse.data,
      query: postResponse.query,
      variables: postResponse.variables,
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
