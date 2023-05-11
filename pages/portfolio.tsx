import { Box } from "@mui/material";
import config from "config";
import type { NextPage } from "next";
import Head from "next/head";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PortfolioPage from "@/components/Portfolio";
import BreadCrumbs from "@/components/Post/BreadCrumbs";
import PageProgress from "@/components/Post/PageProgress";
import StandWithUkraine from "@/components/StandWithUkraine";

const containterStyles = {
  mr: "auto",
  ml: "auto",
  pl: "15px",
  pr: "15px",
  ["@media(min-width: 768px)"]: {
    width: "750px",
  },
  ["@media(min-width: 1020px)"]: {
    width: "1000px",
  },
  ["@media(min-width: 1260px)"]: {
    width: "1230px",
  },
};

const Home: NextPage = () => (
  <>
    <Head>
      <title>{config.site_title}</title>
      <meta property="og:title" content={config.site_keywords[1]} />
      <meta property="og:description" content={config.site_description} />
      <meta property="og:url" content={config.host_url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={config.site_title} />
      <meta name="description" content={config.site_description} />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <StandWithUkraine />
    <Header />
    <BreadCrumbs title="Projects" />
    <PageProgress />
    <Box sx={{ p: "36px 0" }}>
      <Box sx={containterStyles}>
        <PortfolioPage />
      </Box>
    </Box>
    <Footer />
  </>
);

export default Home;
