import {
  queriesToArrayOfDocuments,
  queryToDocument,
} from "helpers/tinaHelpers";
import { PostFromQuery } from "interfaces";
import Head from "next/head";
import { useAppSelector } from "redux/typesHooks";
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
import { PostQuery, PostQueryVariables } from ".tina/__generated__/types";

const latest_posts_per_page = 10;

interface Props {
  data: PostQuery;
  query: string;
  variables: PostQueryVariables;
  latestPosts: PostFromQuery[];
}

const Post = ({ latestPosts, ...props }: Props) => {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const config = useAppSelector((state) => state.tinaData.main_config);

  return (
    <>
      <Head>
        <title>{data.post.title}</title>
        <meta name="description" content={config.site_description} />
        <meta property="og:description" content={config.site_description} />
        <meta property="og:url" content={config.host_url} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={config.site_title} />
        <meta property="og:image" content={config.default_image} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <StandWithUkraine />
      <Header />
      <BreadCrumbs title={data.post.title} />
      <PageProgress />
      <BlogPostSectionWrapper>
        <PostContent post={queryToDocument(data)} />
        <LatestPosts latestPosts={queriesToArrayOfDocuments(latestPosts)} />
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
  const relativePath = params.filename + ".mdx";

  const postResponse = await client.queries.post({ relativePath });

  const latestPosts = await client.queries.postConnection({
    last: latest_posts_per_page, // TODO: search about this one
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
