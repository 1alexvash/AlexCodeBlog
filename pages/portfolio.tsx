import { Box } from "@mui/material";
import type { NextPage } from "next";
import dynamic from "next/dynamic";
import { useRef } from "react";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { PortfolioPage } from "@/components/Portfolio";
import { ProjectData } from "@/components/Portfolio/projectDataTypes";
import BreadCrumbs from "@/components/Post/BreadCrumbs";
import StandWithUkraine from "@/components/StandWithUkraine";

const PageProgress = dynamic(() => import("@/components/Post/PageProgress"), {
  ssr: false,
});

const projectsDataStub: readonly ProjectData[] = [
  {
    id: "1",
    title: "AiScout",
    lightImage: "/images/aiscout-dark-logo.svg",
    darkImage: "/images/aiscout-logo.svg",
  },
  {
    id: "2",
    title: "Gaffer",
    lightImage: "/images/gaffer-logo.svg",
  },
  {
    id: "3",
    title: "Woodland (NDA)",
    lightImage: "/images/woodland-dark-logo.svg",
    darkImage: "/images/woodland-logo.svg",
  },
  {
    id: "4",
    title: "GoVirtual (NDA)",
    lightImage: "/images/goVirtual-logo.svg",
  },
];

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

const Home: NextPage = () => {
  const blogPostSectionRef = useRef() as React.MutableRefObject<HTMLDivElement>;

  return (
    <>
      <StandWithUkraine />
      <Header />
      <BreadCrumbs title="Projects" />
      <PageProgress blogPostSectionRef={blogPostSectionRef} />
      <Box ref={blogPostSectionRef} sx={{ padding: "36px 0" }}>
        <Box sx={containterStyles}>
          <PortfolioPage projects={projectsDataStub} />
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default Home;
