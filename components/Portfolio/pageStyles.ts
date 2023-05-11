import { SxProps, Theme } from "@mui/material";

const styles = (theme: Theme) =>
  ({
    pageTitle: {
      display: "flex",
      justifyContent: "space-between",
      "& .MuiTypography-root": {
        color: theme.palette.mode === "light" ? "#3a3a3a" : "white",
        lineHeight: 1.28,
        fontWeight: 700,
        fontSize: "43px",
        ["@media (max-width: 480px)"]: {
          fontSize: "28px",
        },
        mt: 2.5,
        mb: 9.5,
      },
    },
    pageContent: {
      display: "flex",
      columnGap: "30px",
    },
    projectInfoWrapper: {
      maxWidth: "863px",
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: "16px",
      lineHeight: "27px",
      ["@media (max-width: 1259px)"]: {
        maxWidth: "700px",
      },
      ["@media (max-width: 767px)"]: {
        maxWidth: "100%",
      },
      "& > div": {
        "&:not(:first-child)": {
          mt: 9,
        },
      },
    },
    projectListWrapper: {
      position: "sticky",
      top: "50px",
      height: "100%",
      mt: -12,
      boxShadow: "0px 4px 41px rgba(0, 0, 0, 0.06)",
    },
    projectItem: {
      width: "277px",
      height: "73px",
      backgroundColor: theme.palette.mode === "light" ? "white" : "#33393F",
      display: "flex",
      alignItems: "center",
      pl: 6.25,
      borderBottom: "1px solid",
      borderColor: theme.palette.mode === "light" ? "#ececec" : "#4B4B4B",
      cursor: "pointer",
      "& .MuiTypography-root": {
        ml: 2.5,
        fontWeight: "700",
        fontSize: "18px",
        lineHeight: "129.4%",
      },
      ["@media (max-width: 1019px)"]: {
        display: "none",
      },
    },
    projectInfo: {
      position: "relative",
      pl: 6,
      display: "flex",
      alignItems: "center",
      mb: 3.75,
      ["@media (max-width: 767px)"]: {
        pl: 4,
      },
    },
    leftSideLine: {
      position: "absolute",
      left: 0,
      top: 0,
      bottom: 0,
      width: 4,
      backgroundColor: "#fe6C0a",
    },
    flexDiresction: {
      display: "flex",
      flexDirection: "column",
    },
    projectNameStyle: {
      display: "flex",
      alignItems: "center",
      mb: 4,
      "& .MuiTypography-root": {
        ml: 1,
        fontWeight: "700",
        fontSize: "18px",
        lineHeight: "129.4%",
        color: theme.palette.mode === "light" ? "black" : "white",
      },
    },
    projectDescriptionStyle: {
      px: 8,
      py: 7,
      backgroundColor: theme.palette.mode === "light" ? "#f7f9fb" : "#33393f",
      display: "flex",
      justifyContent: "space-between",
      columnGap: "30px",
      "& > *": {
        width: "33.33%",
      },
      "& .MuiTypography-root": {
        mb: 2.5,
        fontWeight: 700,
        fontSize: "20px",
        lineHeight: "31px",
      },
      "& .MuiBox-root": {
        fontWeight: "400",
        fontSize: "14px",
        lineHeight: "22px",
        color: theme.palette.mode === "light" ? "#1e1e1e" : "white",
      },
      ["@media (max-width: 767px)"]: {
        px: 4,
        "& > *": {
          width: "100%",
          "&:not(:last-child)": {
            mb: 4,
          },
        },
        display: "block",
      },
    },
    projectNameColor: {
      color: theme.palette.mode === "light" ? "#3a3a3a" : "white",
    },
  } satisfies SxProps<Theme>);

export default styles;
