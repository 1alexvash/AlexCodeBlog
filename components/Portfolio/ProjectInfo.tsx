import { Box, Typography, useTheme } from "@mui/material";
import { useEffect, useRef } from "react";
import { useIsScrolling } from "react-use-is-scrolling";
import { TinaMarkdown } from "tinacms/dist/rich-text";

import styles from "./pageStyles";

interface Props {
  id: number;
  nameOfProject: string;
  pathToImageLogo: string;
  isActive: boolean;
  enableScrollObservation: boolean;
  onActivated: (projectId: number) => void;
  clientDescription: any;
  projectDescription: any;
  resultDescription: any;
  mainDescription: any;
}

const ProjectInfo = ({
  nameOfProject,
  pathToImageLogo,
  isActive,
  enableScrollObservation,
  onActivated,
  id,
  clientDescription,
  projectDescription,
  resultDescription,
  mainDescription,
}: Props) => {
  const theme = useTheme();

  const ref = useRef<HTMLDivElement>();

  const { isScrollingY } = useIsScrolling();

  useEffect(() => {
    if (
      !isActive ||
      ref.current === undefined ||
      enableScrollObservation ||
      isScrollingY
    ) {
      return;
    }

    ref.current.scrollIntoView({
      behavior: "auto",
      block: "start",
      inline: "center",
    });
  }, [isActive, id, enableScrollObservation, isScrollingY]);

  useEffect(() => {
    const element = ref.current;
    if (!element || isActive || !enableScrollObservation) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleElement = entries.find(
          (entry) => entry.isIntersecting
        )?.target;

        if (visibleElement) {
          onActivated(id);
        }
      },
      {
        rootMargin: "0px 0px -80% 0px",
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [isActive, enableScrollObservation, onActivated, id]);

  const {
    projectInfo,
    leftSideLine,
    flexDiresction,
    projectNameStyle,
    projectNameColor,
    projectDescriptionStyle,
  } = styles(theme);

  const projectDescriptionComponent = (
    <Box sx={flexDiresction}>
      <Box sx={projectNameStyle} ref={ref}>
        <img src={pathToImageLogo} alt={nameOfProject} height={33} width={36} />
        <Typography>{nameOfProject}</Typography>
      </Box>
      <Box sx={projectDescriptionStyle}>
        <Box>
          <Typography sx={projectNameColor}>Client</Typography>
          <Box>
            <TinaMarkdown content={clientDescription} />
          </Box>
        </Box>

        <Box>
          <Typography>Project</Typography>
          <Box>
            <TinaMarkdown content={projectDescription} />
          </Box>
        </Box>

        <Box>
          <Typography>Result</Typography>
          <Box>
            <TinaMarkdown content={resultDescription} />
          </Box>
        </Box>
      </Box>
    </Box>
  );

  return (
    <Box>
      <Box sx={projectInfo}>
        <Box sx={leftSideLine} />
        {projectDescriptionComponent}
      </Box>
      <TinaMarkdown content={mainDescription} />
    </Box>
  );
};

export default ProjectInfo;
