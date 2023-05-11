import { Box, Typography, useTheme } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

import styles from "./pageStyles";
import ProjectInfo from "./ProjectInfo";
import ProjectItem from "./ProjectItem";

const projectsData = [
  {
    title: "AiScout",
    lightImage: "/images/aiscout-dark-logo.svg",
    darkImage: "/images/aiscout-logo.svg",
  },
  {
    title: "Gaffer",
    lightImage: "/images/gaffer-logo.svg",
  },
  {
    title: "Woodland (NDA)",
    lightImage: "/images/woodland-dark-logo.svg",
    darkImage: "/images/woodland-logo.svg",
  },
  {
    title: "GoVirtual (NDA)",
    lightImage: "/images/goVirtual-logo.svg",
  },
];

const PortfolioPage = () => {
  const [activeProject, setActiveProject] = useState("AiScout");

  const theme = useTheme();

  const { pageTitle, pageContent, projectInfoWrapper, projectListWrapper } =
    styles(theme);

  const AiScoutRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const GafferRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const WoodlandRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const GoVirtualRef = useRef() as React.MutableRefObject<HTMLDivElement>;

  const projectsRefArray = [AiScoutRef, GafferRef, WoodlandRef, GoVirtualRef];

  const observer = useRef<IntersectionObserver | null>(null);

  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setActiveProject(entry.target.id);
      }
    });
  };

  const scrollToRef = (ref: React.MutableRefObject<HTMLDivElement>) => {
    ref.current.scrollIntoView({
      behavior: "auto",
      block: "center",
      inline: "center",
    });

    setActiveProject(ref.current.id);
  };

  const projectsInfo = projectsData.map((project, index) => (
    <Box key={index} ref={projectsRefArray[index]} id={project.title}>
      <ProjectInfo
        nameOfProject={project.title}
        pathToImageLogo={
          project.darkImage
            ? theme.palette.mode === "light"
              ? project.lightImage
              : project.darkImage
            : project.lightImage
        }
      />
    </Box>
  ));

  const projectsList = projectsData.map((project, index) => (
    <ProjectItem
      key={index}
      activeProject={activeProject}
      scrollToRef={scrollToRef}
      projectRef={projectsRefArray[index]}
      lightImage={project.lightImage}
      darkImage={project.darkImage}
      title={project.title}
    />
  ));

  useEffect(() => {
    observer.current = new IntersectionObserver(handleIntersection, {
      threshold: 0.9,
    });

    observer.current.observe(AiScoutRef.current);
    observer.current.observe(GafferRef.current);
    observer.current.observe(WoodlandRef.current);
    observer.current.observe(GoVirtualRef.current);

    return () => {
      observer.current?.disconnect();
    };
  }, [activeProject]);

  return (
    <Box>
      <Box sx={pageTitle} maxHeight={110}>
        <Typography>My projects</Typography>
      </Box>
      <Box sx={pageContent}>
        <Box sx={projectInfoWrapper}>{projectsInfo}</Box>
        <Box sx={projectListWrapper}>{projectsList}</Box>
      </Box>
    </Box>
  );
};

export default PortfolioPage;
