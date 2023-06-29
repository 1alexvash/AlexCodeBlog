import { Box, useTheme } from "@mui/material";
import { Theme } from "redux/slices/theme";

import { ProjectData } from "./projectDataTypes";
import ProjectInfo from "./ProjectInfo";

export interface ProjectInfoItemProps {
  readonly projectData: ProjectData;
  readonly isActive: boolean;
  readonly enableScrollObservation: boolean;
  readonly onActivated: (projectId: string) => void;
}

const calculatePathToImageLogo = (
  projectData: ProjectData,
  theme: Theme
): string => {
  if (projectData.darkImage && theme === "light") {
    return projectData.lightImage;
  }

  if (projectData.darkImage && theme === "dark") {
    return projectData.darkImage;
  }
  return projectData.lightImage;
};

export const ProjectInfoItem = ({
  projectData,
  isActive,
  enableScrollObservation,
  onActivated,
}: ProjectInfoItemProps): JSX.Element => {
  const theme = useTheme();

  return (
    <Box>
      <ProjectInfo
        onActivated={onActivated}
        enableScrollObservation={enableScrollObservation}
        isActive={isActive}
        nameOfProject={projectData.title}
        pathToImageLogo={calculatePathToImageLogo(
          projectData,
          theme.palette.mode
        )}
        id={projectData.id}
      />
    </Box>
  );
};
