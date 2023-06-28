import { Box, Typography, useTheme } from "@mui/material";

import styles from "./pageStyles";

interface Props {
  activeProject: string;
  scrollToRef: (ref: React.MutableRefObject<HTMLDivElement>) => void;
  projectRef: React.MutableRefObject<HTMLDivElement>;
  lightIcon: string;
  darkIcon?: string;
  title: string;
}

const ProjectItem = ({
  activeProject,
  scrollToRef,
  projectRef,
  lightIcon,
  darkIcon,
  title,
}: Props) => {
  const theme = useTheme();

  const { projectItem } = styles(theme);

  const activeProjectStyles = {
    backgroundColor: theme.palette.mode === "light" ? "#3a3a3a" : "#fe6C0a",
    color: "white",
  };

  let src = lightIcon;

  if (darkIcon) {
    if (
      theme.palette.mode === "dark" ||
      activeProject === projectRef.current.id
    ) {
      src = darkIcon;
    } else {
      src = lightIcon;
    }
  }

  return (
    <Box
      onClick={() => scrollToRef(projectRef)}
      sx={{
        ...projectItem,
        backgroundColor: theme.palette.mode === "light" ? "white" : "#33393F",
        ...(activeProject === title && activeProjectStyles),
      }}
    >
      <img src={src} alt="Woodland" height={33} width={36} />
      <Typography>{title}</Typography>
    </Box>
  );
};

export default ProjectItem;
