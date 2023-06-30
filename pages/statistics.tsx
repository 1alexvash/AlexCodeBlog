import { Box } from "@mui/material";
import config from "config";
import { PostDocumentWithoutBody } from "interfaces";
import Head from "next/head";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Intro from "@/components/Intro";
import StandWithUkraine from "@/components/StandWithUkraine";
import StatisticPage from "@/components/Statistic";

import client from ".tina/__generated__/client";

interface Props {
  posts: PostDocumentWithoutBody[];
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

const Statistics = ({ posts }: Props) => (
  <>
    <Head>
      <title>{config.site_title}</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <StandWithUkraine />
    <Header />
    <Intro />
    <Box sx={{ p: "36px 0" }}>
      <Box sx={containterStyles}>
        <StatisticPage posts={posts} />
      </Box>
    </Box>
    <Footer />
  </>
);

export const getStaticProps = async () => {
  const posts = await client.queries.postConnection({});

  return {
    props: {
      posts: posts.data.postConnection.edges
        ?.map((edge) => edge?.node)
        .reverse(),
    },
  };
};

export default Statistics;
