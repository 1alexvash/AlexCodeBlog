import { Box, Typography, useTheme } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";

import styles from "./pageStyles";
import { ProjectData } from "./projectDataTypes";
import { ProjectList } from "./ProjectList";
import { ProjectsInfo } from "./ProjectsInfo";

export interface PortfolioPageProps {
  projects: ProjectData[];
}

export const PortfolioPage = ({
  projects,
}: PortfolioPageProps): JSX.Element => {
  const theme = useTheme();

  const [activeProjectId, setActiveProjectId] = useState<number | undefined>(
    projects[0].id
  );

  const [enableScrollObservation, setEnableScrollObservation] =
    useState<boolean>(false);

  const { pageTitle, pageContent, projectInfoWrapper, projectListWrapper } =
    styles(theme);

  const enableObservation = useCallback(() => {
    setEnableScrollObservation(true);
  }, [setEnableScrollObservation]);

  useEffect(() => {
    if (enableScrollObservation) {
      return;
    }

    document.addEventListener("scroll", enableObservation);

    return () => {
      document.removeEventListener("scroll", enableObservation);
    };
  }, [enableScrollObservation, enableObservation]);

  const handleProjectActivatedByScroll = useCallback(
    (id: number) => {
      if (id === activeProjectId) {
        return;
      }
      setEnableScrollObservation(false);
      setActiveProjectId(id);
    },
    [setEnableScrollObservation, setActiveProjectId, activeProjectId]
  );

  const handleProjectSelectClick = useCallback(
    (id: number) => {
      if (id === activeProjectId) {
        return;
      }
      setEnableScrollObservation(false);
      setActiveProjectId(id);
    },
    [setEnableScrollObservation, setActiveProjectId, activeProjectId]
  );

  return (
    <Box>
      <Box sx={pageTitle} maxHeight={110}>
        <Typography>My projects</Typography>
      </Box>
      <Box sx={pageContent}>
        <Box sx={projectInfoWrapper}>
          <ProjectsInfo
            projects={projects}
            enableScrollObservation={enableScrollObservation}
            activeProjectId={activeProjectId}
            onProjectActivated={handleProjectActivatedByScroll}
          />
        </Box>
        <Box sx={projectListWrapper}>
          <ProjectList
            projects={projects}
            activeProjectId={activeProjectId}
            onProjectClick={handleProjectSelectClick}
          />
        </Box>
      </Box>
    </Box>
  );
};
