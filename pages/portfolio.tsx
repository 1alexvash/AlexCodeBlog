import { Box } from "@mui/material";
import type { GetStaticProps, NextPage } from "next";
import dynamic from "next/dynamic";
import { useRef } from "react";
import { useTina } from "tinacms/dist/react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PortfolioPage from "@/components/Portfolio";
import BreadCrumbs from "@/components/Post/BreadCrumbs";
import StandWithUkraine from "@/components/StandWithUkraine";
import client from ".tina/__generated__/client";
import {
  PortfolioConnectionQuery,
  PortfolioConnectionQueryVariables,
} from ".tina/__generated__/types";
import { nodeProjectsArrayToProjects } from "helpers/tinaHelpers";

interface Props {
  tinaData: PortfolioConnectionQuery;
  variables: PortfolioConnectionQueryVariables;
  query: string;
}

const PageProgress = dynamic(() => import("@/components/Post/PageProgress"), {
  ssr: false,
});

const containterStyles = {
  mx: "auto",
  px: "15px",
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

const Home: NextPage<Props> = ({ tinaData, query, variables }) => {
  const blogPostSectionRef = useRef<HTMLDivElement>(null);
  const { data } = useTina({ query, data: tinaData, variables });

  return (
    <>
      <StandWithUkraine />
      <Header />
      <BreadCrumbs title="Projects" />
      <PageProgress blogPostSectionRef={blogPostSectionRef} />
      <Box ref={blogPostSectionRef} sx={{ padding: "36px 0" }}>
        <Box sx={containterStyles}>
          <PortfolioPage projectsData={nodeProjectsArrayToProjects(data)} />
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const portfolio = await client.queries.portfolioConnection();

  return {
    props: {
      tinaData: portfolio.data,
      query: portfolio.query,
      variables: portfolio.variables,
    },
  };
};

export default Home;
