import { Theme } from "@mui/material";

const styles = (theme: Theme) => ({
  pageTitle: {
    fontSize: "50px",
    fontWeight: "700",
    lineHeight: "64px",
    color:
      theme.palette.mode === "light"
        ? theme.palette.main.darkGrey
        : theme.palette.main.white,
    mb: "36px",
  },
  pageControlsAlign: {
    display: "flex",
    gap: "5px",
    mb: "36px",
    "& div": {
      display: "flex",
      height: "27px",
      justifyContent: "center",
      alignItems: "center",
      cursor: "pointer",
    },
  },
  yearButton: {
    width: "57px",
  },
  monthButton: {
    width: "80px",
  },
  monthlyDiagramWrapper: {
    display: "flex",
    alignItems: "end",
    gap: "10px",
    width: "100%",
    height: "385px",
    px: "10px",
    backgroundColor:
      theme.palette.mode === "light"
        ? theme.palette.main.lightGrey
        : theme.palette.main.grey,
  },
  monthlyDiagramColumn: {
    width: "100%",
    maxWidth: "90px",
    textAlign: "center",
    "& .MuiTypography-root": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.main.black
          : theme.palette.main.white,
    },
    "& .MuiPaper-root": {
      display: "flex",
      justifyContent: "center",
      alignItems: "end",
      width: "100%",
      background: theme.palette.main.orange,
      "& img": {
        mb: "3px",
        "@media (max-width: 1019px)": {
          width: "100%",
          height: "100%",
          maxHeight: "30px",
          minHeight: "30px",
        },
      },
    },
  },
  monthTitlesStyle: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    px: "10px",
    gap: "10px",
    mt: "10px",
    "& .MuiBox-root": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.main.black
          : theme.palette.main.white,
      fontSize: "14px",
      width: "100%",
      maxWidth: "90px",
      textAlign: "center",
      "@media (max-width: 1200px)": {
        overflow: "hidden",
      },
    },
  },
});

export default styles;
