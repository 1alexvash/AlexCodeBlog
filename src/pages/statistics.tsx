import { Box } from "@mui/material";
import { PostDocumentWithoutBody } from "interfaces";
import Head from "next/head";
import Footer from "src/components/Footer";
import Header from "src/components/Header";
import Intro from "src/components/Intro";
import StandWithUkraine from "src/components/StandWithUkraine";
import StatisticPage from "src/components/Statistics";
import { useTina } from "tinacms/dist/react";

import { convertTypesAndGetEdges } from "../../helpers/getEdgeNodesHelpers";
import { postsPerRequestThreshold } from "./index";
import client from ".tina/__generated__/client";
import {
  MainConfigQuery,
  MainConfigQueryVariables,
} from ".tina/__generated__/types";

interface Props {
  posts: PostDocumentWithoutBody[];
  tinaData: MainConfigQuery;
  query: string;
  variables: MainConfigQueryVariables;
}

const containterStyles = {
  mx: "auto",
  px: "15px",
  ["@media (min-width: 768px)"]: {
    width: "750px",
  },
  ["@media (min-width: 1020px)"]: {
    width: "1000px",
  },
  ["@media (min-width: 1260px)"]: {
    width: "1230px",
  },
};

const Statistics = ({ posts, query, tinaData, variables }: Props) => {
  const { data } = useTina({
    query,
    variables,
    data: tinaData,
  });

  return (
    <>
      <Head>
        <title>{data.mainConfig.siteTitle}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <StandWithUkraine />
      <Header />
      <Intro
        authorName={data.mainConfig.authorName}
        authorPosition={data.mainConfig.authorPosition}
        siteDescription={data.mainConfig.siteDescription}
      />
      <Box sx={{ padding: "36px 0" }}>
        <Box sx={containterStyles}>
          <StatisticPage posts={posts} />
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export const getStaticProps = async () => {
  const posts = await client.queries.postsWithoutBody({
    filter: {
      draft: { eq: false },
    },
    first: postsPerRequestThreshold,
  });

  console.log(convertTypesAndGetEdges(posts));

  const mainConfig = await client.queries.mainConfig({
    relativePath: "mainConfig.json",
  });

  return {
    props: {
      posts: convertTypesAndGetEdges(posts),
      tinaData: mainConfig.data,
      query: mainConfig.query,
      variables: mainConfig.variables,
    },
  };
};

export default Statistics;
