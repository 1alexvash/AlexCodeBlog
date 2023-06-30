import { Box, Typography, useTheme } from "@mui/material";

import styles from "./pageStyles";

export interface Props {
  onClick: () => void;
  isActive: boolean;
  lightImage: string;
  darkImage?: string;
  title: string;
}

export const ProjectItem = ({
  isActive,
  lightImage,
  darkImage,
  title,
  onClick,
}: Props): JSX.Element => {
  const theme = useTheme();

  const { projectItem } = styles(theme);

  const activeProjectStyles = {
    backgroundColor: theme.palette.mode === "light" ? "#3a3a3a" : "#fe6C0a",
    color: "white",
  };

  let src = lightImage;

  if (darkImage) {
    if (theme.palette.mode === "dark" || isActive) {
      src = darkImage;
    } else {
      src = lightImage;
    }
  }

  return (
    <Box
      onClick={onClick}
      sx={{
        ...projectItem,
        backgroundColor: theme.palette.mode === "light" ? "white" : "#33393F",
        ...(isActive && activeProjectStyles),
      }}
    >
      <img src={src} alt="Woodland" height={33} width={36} />
      <Typography>{title}</Typography>
    </Box>
  );
};
