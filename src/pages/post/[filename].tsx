import { convertTypesAndGetEdges } from "helpers/getEdgeNodesHelpers";
import { postToDocument, queriesToArrayOfDocuments } from "helpers/tinaHelpers";
import { PostFromQuery } from "interfaces";
import { GetStaticPaths, GetStaticProps } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRef } from "react";
import { useAppSelector } from "redux/typesHooks";
import Footer from "src/components/Footer";
import Header from "src/components/Header";
import BlogPostSectionWrapper from "src/components/Post/BlogPostSectionWrapper";
import BreadCrumbs from "src/components/Post/BreadCrumbs";
import LatestPosts from "src/components/Post/LatestPosts";
import PageProgressWrapper from "src/components/Post/PageProgressWrapper";
import PostContent from "src/components/Post/PostContent";
import StandWithUkraine from "src/components/StandWithUkraine";
import { useTina } from "tinacms/dist/react";

import { client } from ".tina/__generated__/client";
import { PostQuery, PostQueryVariables } from ".tina/__generated__/types";

interface Props {
  data: PostQuery;
  query: string;
  variables: PostQueryVariables;
  latestPosts: PostFromQuery[];
}

const latestPostsPerPage = 10;

const PageProgress = dynamic(() => import("src/components/Post/PageProgress"), {
  ssr: false,
  loading: () => <PageProgressWrapper />,
});

const Post = ({ latestPosts, ...props }: Props) => {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const config = useAppSelector((state) => state.tinaData.mainConfig);
  const hostURLLink = useAppSelector((state) => state.hostUrl);

  const blogPostSectionRef = useRef() as React.MutableRefObject<HTMLDivElement>;

  return (
    <>
      <Head>
        <title>{data.post.title}</title>
        <meta name="description" content={config.siteDescription} />
        <meta property="og:description" content={config.siteDescription} />
        <meta property="og:url" content={hostURLLink} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={config.siteTitle} />
        <meta property="og:image" content={config.defaultImage} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <StandWithUkraine />
      <Header />
      <BreadCrumbs title={data.post.title} />
      <PageProgress blogPostSectionRef={blogPostSectionRef} />
      <BlogPostSectionWrapper ref={blogPostSectionRef}>
        <PostContent post={postToDocument(data.post)} />
        <LatestPosts latestPosts={queriesToArrayOfDocuments(latestPosts)} />
      </BlogPostSectionWrapper>
      <Footer />
    </>
  );
};

type Params = {
  params?: {
    filename?: string;
  };
};

export const getStaticProps: GetStaticProps = async ({ params }: Params) => {
  if (!params) {
    return { props: {} };
  }

  const relativePath = params.filename + ".mdx";

  const postResponse = await client.queries.post({ relativePath });

  const latestPosts = await client.queries.postsWithoutBody({
    last: latestPostsPerPage,
    filter: {
      draft: { eq: false },
      date: { before: new Date(Date.now()).toString() },
    },
  });

  return {
    props: {
      post: postResponse.data.post,
      latestPosts: convertTypesAndGetEdges(latestPosts).reverse(),
      data: postResponse.data,
      query: postResponse.query,
      variables: postResponse.variables,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const postListResponse = await client.queries.postConnection();

  const paths =
    postListResponse.data.postConnection.edges?.map((page) => ({
      params: {
        filename: page?.node?._sys.filename.toString(),
      },
    })) ?? [];

  return {
    paths,
    fallback: "blocking",
  };
};

export default Post;
