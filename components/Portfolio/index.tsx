import { Box, Typography, useTheme } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

import styles from "./pageStyles";

import { Project } from "interfaces";
import ProjectInfo from "./ProjectInfo";
import ProjectItem from "./ProjectItem";

interface Props {
  projectsData: Project[];
}

const PortfolioPage = ({ projectsData }: Props) => {
  console.log(projectsData);
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

  const projectsInfo = projectsData.map((project, index) => {
    let pathToImageLogo = project.lightIcon;

    if (project.darkIcon && theme.palette.mode === "light") {
      pathToImageLogo = project.lightIcon;
    }

    if (project.darkIcon && theme.palette.mode === "dark") {
      pathToImageLogo = project.darkIcon;
    }

    return (
      <Box key={index} ref={projectsRefArray[index]} id={project.title}>
        <ProjectInfo
          nameOfProject={project.title}
          pathToImageLogo={pathToImageLogo}
        />
      </Box>
    );
  });

  const projectsList = projectsData.map((project, index) => (
    <ProjectItem
      key={index}
      activeProject={activeProject}
      scrollToRef={scrollToRef}
      projectRef={projectsRefArray[index]}
      lightIcon={project.lightIcon}
      darkIcon={project.darkIcon ?? ""}
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
        {/* <Box sx={projectInfoWrapper}>{projectsInfo}</Box> */}
        {/* <Box sx={projectListWrapper}>{projectsList}</Box> */}
      </Box>
    </Box>
  );
};

export default PortfolioPage;
